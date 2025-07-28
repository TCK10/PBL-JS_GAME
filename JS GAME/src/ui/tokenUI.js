import { state, statePropsEnum } from "../state/globalStateManager.js";

export function createTokenUI(k) {
  const tokenSlots = [];
  const tokens = [];

  const fragmentToToken = {
    wall_glitch: "wall_token",
    firewall_shield: "firewall_token",
    glitch_pulse: "glitch_token",
    error_clone: "error_token",
    phase_dash: "phase_token",
    memory_leak: "memory_token",
    glitch_step: "glitch_step_token",
    anti_gravity_node: "anti_gravity_token",
    system_reboot: "system_reboot_token",
    quantum_duplication: "quantum_duplication_token",
    skull: "skull_token",
  };

  const startX = 75;
  const startY = 50;
  const spacing = 25;

  for (let i = 0; i < 5; i++) {
    const emptySlot = k.add([
      k.sprite("token"),
      k.pos(startX + i * spacing, startY),
      k.scale(1.5),
      k.fixed(),
      k.z(100),
      "token-slot",
    ]);
    tokenSlots.push(emptySlot);
    tokens.push(null);
  }

  let currentFragments = [];

  return {
    // 🆕 This now uses global state directly
    updateTokensFromState() {
      currentFragments = [...state.current().fragmentUnlocked].slice(0, 5);

      for (let i = 0; i < 5; i++) {
        if (tokens[i]) {
          tokens[i].destroy();
          tokens[i] = null;
        }

        if (currentFragments[i]) {
          const tokenSprite = fragmentToToken[currentFragments[i]] ?? "token";
          tokens[i] = k.add([
            k.sprite(tokenSprite),
            k.pos(startX + i * spacing, startY),
            k.scale(1.5),
            k.fixed(),
            k.z(101),
            "token",
          ]);
        }
      }
    },

    hasSpace() {
      return state.fragmentUnlocked.size < 5;
    },

    getCurrentFragments() {
      return currentFragments;
    },
  };
}
