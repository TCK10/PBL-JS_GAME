export function makeBoss(k, initialPos) {
  return k.make([
    k.pos(initialPos),
    k.sprite("boss", { anim: "idle" }),
    k.area({
      shape: new k.Rect(k.vec2(0), 110, 70),
      collisionIgnore: ["pass_through", "player"],
    }),
    k.anchor("center"),
    k.body({ gravityScale: 0 }),
    k.offscreen({ distance: 400 }),
    k.state("chase", ["chase", "swipe", "stunned"]),
    k.health(25),
    "Boss",
    "Enemy",
    {
      speed: 150,
      pursuitSpeed: 200,
      range: 100,
      canAttack: true,

      setBehavior() {
        const maxChaseY = 1000;

        const getTarget = () => {
          const clone = k.get("clone", { recursive: true })[0];
          return clone ?? k.get("player", { recursive: true })[0];
        };

        this.on("add", () => {
          this.enterState("chase");
        });

        // CHASE
        this.onStateUpdate("chase", () => {
          const target = getTarget();
          if (!target) return;

          const distance = target.pos.dist(this.pos);

          const dir = target.pos.sub(this.pos).unit();
          this.move(dir.scale(this.pursuitSpeed));

          this.flipX = target.pos.x < this.pos.x;

          if (distance <= this.range) {
            this.enterState("swipe");
          }
        });

        // SWIPE
        this.onStateEnter("swipe", async () => {
          this.play("attack");
          this.pos.y += 20;

          const offsetX = this.flipX ? -10 : 10;

          const swipeHitbox = k.add([
            k.pos(this.pos.x + offsetX, this.pos.y + 20),
            k.area({ shape: new k.Rect(k.vec2(0), 120, 50) }),
            k.anchor("center"),
            k.lifespan(0.2),
            k.opacity(0.3),
            k.z(10),
            "boss-swipe",
          ]);

          // When the attack animation ends, return to idle animation
          this.onAnimEnd((anim) => {
            if (anim === "attack" && this.curAnim() !== "idle") {
              this.play("idle");
            }
          });

          await k.wait(1);
          this.enterState("chase");
        });

        // STUNNED
        this.onStateEnter("stunned", async () => {
          this.unuse("body");
          this.body = undefined;
          await k.wait(1);
          this.use(k.body({ gravityScale: 0 }));
          this.enterState("idle");
        });
      },

      setEvents() {
        k.onCollide("boss-swipe", "player", (swipe, player) => {
          player.hurt(1);
        });

        this.onCollide("sword-hitbox", () => {
          this.hurt(1);
        });

        this.on("hurt", () => {
          this.canAttack = false;

          if (this.hp() > 0) {
            this.play("hurt");
            // Re-enable attack after a short delay
            k.wait(0.6, () => {
              this.canAttack = true;
            });
          } else {
            this.trigger("die");
          }
        });

        this.on("die", () => {
          this.collisionIgnore = ["player"];
          this.unuse("body");
          this.play("die");
          k.go("win");
          k.play("boom", { volume: 0.5 });
        });

        this.onAnimEnd((anim) => {
          if (anim === "die") {
            k.destroy(this);
          }
        });
      },
    },
  ]);
}
