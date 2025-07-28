import { state } from "../state/globalStateManager.js";
import { k } from "../loader.js";

function makeHealthBar(k) {
  return k.make([
    k.sprite("healthBar", { frame: 0 }),
    k.pos(-10, -10),
    k.fixed(),
    k.scale(1.7),
    k.z(100),
    {
      hpMapping: {
        10: 0,
        9: 1,
        8: 2,
        7: 3,
        6: 4,
        5: 5,
        4: 6,
        3: 7,
        2: 8,
        1: 9,
        0: 10,
      },
      setEvents() {
        this.on("update", () => {
          const currentHp = state.current().playerHp;
          this.frame = this.hpMapping[currentHp];
          if (currentHp === 0) {
            k.destroy(this);
          }
        });
      },
    },
  ]);
}

function createCurrencyUI(k) {
  return k.make([
    k.pos(125, 20),
    k.fixed(),
    k.z(100),
    {
      setEvents() {
        this.on("update", () => {
          const currentMoney = `${state.current().moneyState}$`;
          this.label.text = currentMoney.toString();
        });
      },
      addChildren() {
        this.add([k.sprite("coin"), k.pos(0, 0), k.scale(1.7)]);

        this.label = this.add([
          k.text("0$", { font: "Font", size: 23 }),
          k.pos(30, 3),
        ]);
      },
    },
  ]);
}

export const healthBar = makeHealthBar(k);
export const currencyUI = createCurrencyUI(k);
