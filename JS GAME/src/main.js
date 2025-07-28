import { k } from "./loader.js";
import { lvl_1 } from "./scenes/lvl_1.js";
import { lvl_2 } from "./scenes/lvl_2.js";
import { lvl_3 } from "./scenes/lvl_3.js";
import { lvl_4 } from "./scenes/lvl_4.js";
import { lvl_5 } from "./scenes/lvl_5.js";
import { setBackgroundColor } from "./scenes/roomUtils.js";
import { makeNotificationBox } from "./ui/notificationBox.js";
import { state, statePropsEnum } from "./state/globalStateManager.js";

async function main() {
  const lvl_1Data = await (await fetch("./maps/lvl_1.json")).json();
  const lvl_2Data = await (await fetch("./maps/lvl_2.json")).json();
  const lvl_3Data = await (await fetch("./maps/lvl_3.json")).json();
  const lvl_4Data = await (await fetch("./maps/lvl_4.json")).json();
  const lvl_5Data = await (await fetch("./maps/lvl_5.json")).json();

  k.scene("lvl_1", () => {
    lvl_1(k, lvl_1Data);
  });

  k.scene("lvl_2", () => {
    lvl_2(k, lvl_2Data);
    state.set(statePropsEnum.playerHp, state.current().maxPlayerHp);
  });

  k.scene("lvl_3", () => {
    lvl_3(k, lvl_3Data);
    state.set(statePropsEnum.playerHp, state.current().maxPLayerHp);
  });

  k.scene("lvl_4", () => {
    lvl_4(k, lvl_4Data);
    state.set(statePropsEnum.playerHp, state.current().maxPLayerHp);
  });

  k.scene("lvl_5", () => {
    lvl_5(k, lvl_5Data);
    state.set(statePropsEnum.playerHp, state.current().maxPLayerHp);
  });
}

let backgroundMusic = null;

k.scene("intro", () => {
  setBackgroundColor(k, "#000000");
  k.add(
    makeNotificationBox(
      k,
      "WASD or Arrow Keys To Move, Click To Attack\nCollect Fragments and beat the final boss! \nPress Enter to start!"
    )
  );
  k.onKeyPress("enter", () => {
    if (!backgroundMusic) {
      backgroundMusic = k.play("music", { volume: 0.3, loop: true });
    }
    const context = new AudioContext();
    context.resume();
    k.go("lvl_1", { exitName: null });
  });
});

k.scene("win", () => {
  if (backgroundMusic) backgroundMusic.stop();
  setBackgroundColor(k, "#000000");
  k.add(makeNotificationBox(k, "uh... you won?\nnice job!"));
});

k.scene("gameOver", () => {
  if (backgroundMusic) backgroundMusic.stop();
  setBackgroundColor(k, "#000000");
  k.add(makeNotificationBox(k, "haha you died\nskill issue"));
});

k.go("intro");

main();
