import { setBackgroundColor } from "./roomUtils.js";

export function intro(k, roomData) {
  setBackgroundColor(k, "#10063c");

  const roomLayers = roomData.layers;

  const map = k.add([k.pos(), k.sprite("intro")]);
}
