import { state, statePropsEnum } from "../state/globalStateManager.js";
import { makeBlink } from "./entitySharedLogic.js";
import { fragmentAbilities } from "../fragmentAbilities.js";
import { createTokenUI } from "../ui/tokenUI.js";

export function makePlayer(k) {
  const keyBindings = ["z", "x", "c", "v", "b"];
  return k.make([
    k.pos(),
    k.sprite("Glitch"),
    k.area({
      shape: new k.Rect(k.vec2(0, 0), 15, 17),
    }),
    k.anchor("center"),
    k.body({
      mass: 100,
      jumpForce: 450,
    }),
    k.z(10),
    k.doubleJump(1),
    k.color(),
    k.opacity(),
    k.health(state.current().playerHp),
    "player",
    {
      speed: 150,
      isAttacking: false,
      isDashing: false,
      canDash: true,
      gravityMultiplier: 1,

      setPosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;
      },
      setControls() {
        this.controlHandlers = [];

        this.controlHandlers.push(
          k.onKeyPress((key) => {
            if (key === "space") {
              if (this.curAnim() === "dash" && this.curAnim() !== "jump")
                this.play("jump");
              this.doubleJump();
            }
          }),
          k.onUpdate(() => {
            if (!this.isGrounded()) {
              this.vel.y = this.vel.y * this.gravityMultiplier;
            }
          })
        );

        this.controlHandlers.push(
          k.onClick(() => {
            if (this.curAnim() !== "attack" && this.isGrounded()) {
              this.isAttacking = true;

              this.add([
                k.pos(this.flipX ? -25 : 0, 10),
                k.area({
                  shape: new k.Rect(k.vec2(0, -17), 27, 14),
                }),
                "sword-hitbox",
              ]);

              this.play("attack");

              this.onAnimEnd((anim) => {
                if (anim === "attack") {
                  const swordHitbox = k.get("sword-hitbox", {
                    recursive: true,
                  })[0];
                  if (swordHitbox) k.destroy(swordHitbox);
                  this.isAttacking = false;
                  this.play("idle");
                }
              });
            }
          })
        );

        this.controlHandlers.push(
          k.onUpdate(() => {
            if (this.isAttacking || this.isDashing) return;

            const movingLeft = k.isKeyDown("a") || k.isKeyDown("left");
            const movingRight = k.isKeyDown("d") || k.isKeyDown("right");

            if (movingLeft) {
              this.flipX = true;
              this.move(-this.speed, 0);
              if (this.isGrounded() && this.curAnim() !== "run") {
                this.play("run");
              }
              return;
            }

            if (movingRight) {
              this.flipX = false;
              this.move(this.speed, 0);
              if (this.isGrounded() && this.curAnim() !== "run") {
                this.play("run");
              }
              return;
            }
          })
        );
        k.onUpdate(() => {
          if (!this.isGrounded()) {
            this.vel.y = this.vel.y * this.gravityMultiplier;
          }
        });
        const fragmentKeys = ["z", "x", "c", "v", "b"];
        const purchasedFragments = [];
        const tokenUI = createTokenUI(k);
        tokenUI.updateTokensFromState(purchasedFragments);
        fragmentKeys.forEach((key, index) => {
          k.onKeyPress(key, () => {
            const fragment = tokenUI.getCurrentFragments()[index];
            if (!fragment) return;

            const ability = fragmentAbilities[fragment];
            if (ability) {
              ability.use(this, k);
            }
          });
        });
      },

      disableControls() {
        for (const handler of this.controlHandlers) {
          handler.cancel();
        }
      },

      respawnIfOutOfBounds(boundValue, destinationName, previousSceneData) {
        k.onUpdate(() => {
          if (this.pos.y > boundValue) {
            k.go(destinationName, previousSceneData);
          }
        });
      },

      setEvents() {
        this.onFall(() => {
          k.wait(1);
          if (this.curAnim() !== "dash") this.play("fall");
        });

        this.onFallOff(() => {
          k.wait(1);
          if (this.curAnim() !== "dash") this.play("fall");
        });

        this.onGround(() => {
          k.wait(1);
          this.play("idle");
        });

        this.onHeadbutt(() => {
          k.wait(1);
          if (this.curAnim() !== "dash") this.play("fall");
        });

        this.on("hurt", () => {
          makeBlink(k, this);
          this.stop();
          this.play("hurt");
          if (this.hp() > 0) {
            state.set(statePropsEnum.playerHp, this.hp());
            return;
          }

          state.set(statePropsEnum.playerHp, state.current().maxPlayerHp);
          this.play("die");
          k.go("gameOver");
          k.play("boom");
        });

        this.onAnimEnd((anim) => {
          if (anim === "die") {
            return;
          }

          if (
            [
              "dash",
              "hurt",
              "fall",
              "jump",
              "attack",
              "run",
              "idle",
              "die",
            ].includes(anim) &&
            this.isGrounded() &&
            !this.isAttacking &&
            !this.isDashing
          ) {
            this.play("idle");
          }
        });
      },
    },
  ]);
}
