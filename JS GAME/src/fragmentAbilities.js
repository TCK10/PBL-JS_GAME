export const abilityUsesThisLevel = {};

export const fragmentAbilities = {
  wall_glitch: {
    name: "Wall Glitch",
    usesPerLevel: 2,
    chanceToFail: 0.1,
    duration: 0.5,

    use(player, k) {
      const abilityKey = "wall_glitch";
      const currentUses = abilityUsesThisLevel[abilityKey] || 0;

      if (currentUses >= this.usesPerLevel) {
        return;
      }

      if (Math.random() < this.chanceToFail) {
        return;
      }

      abilityUsesThisLevel[abilityKey] = currentUses + 1;

      player.use(
        k.area({
          shape: new k.Rect(k.vec2(0, 0), 15, 17),
          collisionIgnore: ["pass_through"],
        })
      );

      player.color = k.rgb(142, 142, 211);

      k.wait(this.duration, () => {
        player.use(
          k.area({
            shape: new k.Rect(k.vec2(0, 0), 15, 17),
          })
        );
        player.color = k.rgb(255, 255, 255);
      });
    },
  },

  firewall_shield: {
    name: "Firewall Shield",
    usesPerLevel: 10,
    duration: 5,

    use(player, k) {
      const abilityKey = "firewall_shield";
      const currentUses = abilityUsesThisLevel[abilityKey] || 0;

      if (currentUses >= this.usesPerLevel) {
        return;
      }

      abilityUsesThisLevel[abilityKey] = currentUses + 1;

      const shield = k.add([
        k.sprite("Glitch-shield"),
        k.pos(player.pos),
        k.scale(1),
        k.anchor("center"),
        k.z(1),
        k.area({
          shape: new k.Rect(k.vec2(0, 0), 22, 25),
        }),
        "immunity",
      ]);

      shield.play("shield");

      shield.onUpdate(() => {
        shield.pos = player.pos;
        shield.flipX = player.flipX;
      });

      shield.onCollide("Ransom", () => {
        shield.play("shield_hit");
      });

      shield.onCollide("boss-swipe", () => {
        shield.play("shield_hit");
      });

      shield.onCollide("RAT", () => {
        shield.play("shield_hit");
      });

      shield.onAnimEnd((anim) => {
        if (anim !== "shield_hit") return;
        k.wait(0.2);
        shield.play("shield");
      });

      k.wait(this.duration, () => {
        shield.destroy();
      });
    },
  },

  error_clone: {
    name: "Error Clone",
    usesPerLevel: 3,
    duration: 10,
    use(player, k) {
      const abilityKey = "error_clone";
      const currentUses = abilityUsesThisLevel[abilityKey] || 0;

      if (currentUses >= this.usesPerLevel) {
        return;
      }

      abilityUsesThisLevel[abilityKey] = currentUses + 1;

      const clone = k.add([
        k.sprite("Glitch", { anim: player.curAnim() }),
        k.pos(player.pos),
        k.anchor("center"),
        k.z(5),
        k.area({ shape: new k.Rect(k.vec2(0, 0), 20, 17) }),
        k.health(10),
        "clone",
      ]);

      clone.flipX = player.flipX;

      k.loop(0.1, () => {
        if (clone.exists()) {
          clone.play(player.curAnim());
          clone.flipX = player.flipX;
        }
      });

      clone.on("hurt", () => {
        if (clone.hp() <= 0) {
          clone.play("die");
          clone.destroy();
        }
      });

      k.wait(this.duration, () => {
        if (clone.exists()) {
          clone.play("die");
          clone.destroy();
        }
      });

      return clone;
    },
  },

  glitch_step: {
    name: "Glitch Step",
    chanceToFail: 0.3,
    usesPerLevel: 2,
    use(player) {
      if (Math.random() < player.chanceToFail) {
        console.log("Glitch Step failed!");
        return;
      }
      console.log("Teleport triggered!");
      // Short teleport logic here
    },
  },

  phase_dash: {
    name: "Phase Dash",
    duration: 1.5,
    use(player, k) {
      const abilityKey = "phase_dash";
      const currentUses = abilityUsesThisLevel[abilityKey] || 0;

      if (currentUses >= this.usesPerLevel) {
        return;
      }

      abilityUsesThisLevel[abilityKey] = currentUses + 1;

      if (player.isDashing || !player.canDash) return;

      player.isDashing = true;
      player.canDash = false;

      player.play("dash");

      const dashSpeed = 50000;
      const dashTime = 0.2;
      const steps = 15;
      const stepTime = dashTime / steps;
      const stepDistance = (dashSpeed * stepTime) / steps;
      const direction = player.flipX ? -1 : 1;

      let currentStep = 0;

      const dashLoop = k.loop(stepTime, () => {
        player.move(direction * stepDistance * steps, 0);
        currentStep++;
        if (currentStep >= steps) {
          dashLoop.cancel();
          player.isDashing = false;
        }
      });

      setTimeout(() => {
        player.canDash = true;
      }, this.duration * 1000);
    },
  },

  low_gravity: {
    name: "Anti Gravity Node",
    uses: 3,
    duration: 5,
    use(player, k) {
      const abilityKey = "anti_gravity_node";
      const currentUses = abilityUsesThisLevel[abilityKey] || 0;

      if (currentUses >= this.uses) return;

      abilityUsesThisLevel[abilityKey] = currentUses + 1;

      player.gravityMultiplier = 0.3;

      // optional VFX or sound
      const fx = k.add([
        k.text("🌀", { size: 16 }),
        k.pos(player.pos),
        k.anchor("center"),
        k.follow(player),
        k.z(10),
        k.lifespan(this.duration),
      ]);

      player.use(k.color());
      player.color = k.rgb(158, 255, 123);

      k.wait(this.duration, () => {
        player.gravityMultiplier = 1;
      });
    },
  },
};
