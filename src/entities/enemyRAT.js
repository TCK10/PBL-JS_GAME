import { state, statePropsEnum } from "../state/globalStateManager.js";

export function makeRAT(k, initialPos) {
  return k.make([
    k.pos(initialPos),
    k.sprite("RAT", { anim: "idle" }),
    k.area({ shape: new k.Rect(k.vec2(0), 36, 12) }),
    k.anchor("center"),
    k.offscreen({ distance: 400 }),
    k.state("patrol-right", [
      "patrol-right",
      "patrol-left",
      "alert",
      "attack",
      "retreat",
    ]),
    k.health(2),
    k.body(),
    "RAT",
    "Enemy",
    {
      speed: 50,
      pursuitSpeed: 75,
      range: 75,
      setBehavior() {
        let attackAnimPlayed = false;

        const getTarget = () => {
          const clone = k.get("clone", { recursive: true })[0];
          return clone ?? k.get("player", { recursive: true })[0];
        };

        this.onStateEnter("patrol-right", async () => {
          await k.wait(1);
          if (this.state === "patrol-right") this.enterState("patrol-left");
        });

        this.onStateUpdate("patrol-right", () => {
          const target = getTarget();
          if (!target) return;

          if (this.pos.dist(target.pos) < this.range) {
            this.enterState("alert");
            return;
          }

          this.flipX = false;
          this.move(this.speed, 0);
          if (this.curAnim() !== "idle") this.play("idle");
        });

        this.onStateEnter("patrol-left", async () => {
          await k.wait(1);
          if (this.state === "patrol-left") this.enterState("patrol-right");
        });

        this.onStateUpdate("patrol-left", () => {
          const target = getTarget();
          if (!target) return;

          if (this.pos.dist(target.pos) < this.range) {
            this.enterState("alert");
            return;
          }

          this.flipX = true;
          this.move(-this.speed, 0);
          if (this.curAnim() !== "idle") this.play("idle");
        });

        this.onStateEnter("alert", async () => {
          const target = getTarget();
          if (!target) {
            this.enterState("patrol-right");
            return;
          }

          await k.wait(0.3);

          if (this.pos.dist(target.pos) < this.range) {
            attackAnimPlayed = false;
            this.enterState("attack");
          } else {
            this.enterState("patrol-right");
          }
        });

        this.onStateUpdate("attack", () => {
          const target = getTarget();
          if (!target) {
            this.enterState("patrol-right");
            return;
          }

          if (this.pos.dist(target.pos) > this.range) {
            this.enterState("alert");
            return;
          }

          this.flipX = target.pos.x <= this.pos.x;

          this.onAnimEnd((anim) => {
            if (anim === "attack") {
              attackAnimPlayed = false;
              this.play("idle");
            }

            if (anim === "die") {
              k.destroy(this);
            }
          });

          const dir = k
            .vec2(target.pos.x + 12, target.pos.y)
            .sub(this.pos)
            .unit();
          this.move(dir.scale(this.pursuitSpeed));
        });
      },

      setEvents() {
        const getTarget = () => {
          const clone = k.get("clone", { recursive: true })[0];
          return clone ?? k.get("player", { recursive: true })[0];
        };

        this.onCollide("player", () => {
          const player = k.get("player", { recursive: true })[0];
          if (!player || player.isAttacking) return;
          player.hurt(1);
        });

        this.onCollide("clone", () => {
          const clone = k.get("clone", { recursive: true })[0];
          if (clone) clone.hurt(1);
        });

        this.onCollide("sword-hitbox", () => {
          this.hurt(1);
        });

        this.onCollide("immunity", () => {
          this.hurt(2);
        });

        this.on("hurt", () => {
          if (this.hp() > 0) {
            this.play("hurt");
          } else {
            this.trigger("die");
          }
        });

        this.on("die", () => {
          this.collisionIgnore = ["player"];
          this.unuse("body");
          this.play("die");
          k.play("boom", { volume: 0.5 });
          const currentMoney = state.current().moneyState;
          state.set(statePropsEnum.moneyState, currentMoney + 2);
        });

        this.onAnimEnd((anim) => {
          if (anim === "die") {
            k.destroy(this);
          }
        });

        this.onExitScreen(() => {
          if (this.pos.dist(initialPos) > 400) {
            this.pos = initialPos;
          }
        });
      },
    },
  ]);
}
