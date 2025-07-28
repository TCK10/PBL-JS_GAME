export const statePropsEnum = {
  playerHp: "playerHp",
  maxPLayerHp: "maxPlayerHp",
  moneyState: "moneyState",
  fragmentUnlocked: "fragmentUnlocked",
  isSkullUnlocked: "isSkullUnlocked",
};

function initStateManager() {
  const state = {
    playerHp: 10,
    maxPlayerHp: 10,
    moneyState: 10,
    fragmentUnlocked: new Set(),
    isSkullUnlocked: false,
  };

  return {
    current() {
      return { ...state };
    },
    set(property, value) {
      state[property] = value;
    },
  };
}

export const state = initStateManager();
