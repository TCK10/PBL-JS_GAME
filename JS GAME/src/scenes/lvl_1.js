import {
  setBackgroundColor,
  setCameraControls,
  setCameraZones,
  setMapColliders,
} from "./roomUtils.js";
import { makePlayer } from "../entities/player.js";
import { makeRansom } from "../entities/enemyRansom.js";
import { state, statePropsEnum } from "../state/globalStateManager.js";
import { healthBar, currencyUI } from "../ui/healthBar.js";
import {
  abilityUsesThisLevel,
  fragmentAbilities,
} from "../fragmentAbilities.js";

export function lvl_1(k, roomData) {
  setBackgroundColor(k, "#000000");

  k.setCamScale(1);
  k.setCamPos(100, 620);
  k.setGravity(1000);

  const roomLayers = roomData.layers;

  const map = k.add([k.pos(), k.sprite("lvl_1")]);
  const colliders = [];
  const positions = [];
  const cameras = [];
  for (const layer of roomLayers) {
    if (layer.name === "cameras") {
      cameras.push(...layer.objects);
    }

    if (layer.name === "positions") {
      positions.push(...layer.objects);
      continue;
    }

    if (layer.name === "colliders") {
      colliders.push(...layer.objects);
    }
  }

  setMapColliders(k, map, colliders);
  setCameraZones(k, map, cameras);

  const player = map.add(makePlayer(k));
  setCameraControls(k, player, map, roomData);
  state.set(statePropsEnum.playerHp, state.current().maxPlayerHp);

  for (const position of positions) {
    if (position.name === "player") {
      player.setPosition(position.x, position.y);
      player.setControls();
      player.setEvents();
      player.respawnIfOutOfBounds(1000, "lvl_1");
      continue;
    }

    if (position.type === "Ransom") {
      const Ransom = map.add(makeRansom(k, k.vec2(position.x, position.y)));
      Ransom.setBehavior();
      Ransom.setEvents();
    }
  }

  healthBar.setEvents();
  healthBar.trigger("update");
  k.add(healthBar);

  currencyUI.addChildren();
  currencyUI.setEvents();
  k.add(currencyUI);

  for (const abilityName in fragmentAbilities) {
    const ability = fragmentAbilities[abilityName];
    if (ability.usesPerLevel != null) {
      abilityUsesThisLevel[abilityName] = 0;
    }
  }
}
