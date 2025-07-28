import { state, statePropsEnum } from "../state/globalStateManager.js";
import { createTokenUI } from "../ui/tokenUI.js";
import { k } from "../loader.js";

export function setBackgroundColor(k, hexColorCode) {
  k.add([
    k.rect(k.width(), k.height()),
    k.color(k.Color.fromHex(hexColorCode)),
    k.fixed(),
  ]);
}

let tokenUI = createTokenUI(k);
export function setMapColliders(k, map, colliders) {
  for (const collider of colliders) {
    if (collider.polygon) {
      const coordinates = [];
      for (const point of collider.polygon) {
        coordinates.push(k.vec2(point.x, point.y));
      }

      map.add([
        k.pos(collider.x, collider.y),
        k.area({
          shape: new k.Polygon(coordinates),
          collisionIgnore: ["collider"],
        }),
        "collider",
        collider.type,
      ]);
      continue;
    }

    if (collider.type === "shop") {
      let purchasedFragments = [];
      const fragmentPrices = {
        wall_glitch: 7,
        firewall_shield: 7,
        error_clone: 9,
        phase_dash: 9,
      };

      const shopZone = map.add([
        k.rect(collider.width, collider.height),
        k.pos(collider.x, collider.y),
        k.area({
          collisionIgnore: ["collider"],
        }),
        k.opacity(0),
        "shop-trigger",
        {
          activated: false,
          nextScene: collider.nextScene,
        },
      ]);

      shopZone.onCollide("player", (player) => {
        if (shopZone.activated) return;
        shopZone.activated = true;

        const nextScene = collider.properties?.find(
          (p) => p.name === "nextScene"
        )?.value;

        player.disableControls();
        player.play("idle");

        const allFragments = [
          "wall_glitch",
          "firewall_shield",
          "error_clone",
          "phase_dash",
        ];

        function getRandomFragments(list, prev = [], count = 2) {
          const pool = [...list];

          // 2% chance to add skull fragment to the pool
          if (Math.random() < 0.05 && !state.current().isSkullUnlocked) {
            pool.push("skull");
          }

          // Remove previously shown fragments from the pool
          const filteredPool = pool.filter((frag) => !prev.includes(frag));

          const selected = [];
          for (let i = 0; i < count; i++) {
            if (filteredPool.length === 0) break; // safety check
            const index = Math.floor(Math.random() * filteredPool.length);
            selected.push(filteredPool.splice(index, 1)[0]);
          }

          return selected;
        }

        // Black background overlay
        const bgOverlay = k.add([
          k.rect(k.width(), k.height()),
          k.color(0, 0, 0),
          k.opacity(1),
          k.fixed(),
          k.z(0),
          "shop-overlay",
        ]);

        // Shop UI panel
        const shopUI = k.add([
          k.sprite("shop-ui"),
          k.fixed(),
          k.anchor("center"),
          k.pos(k.center()),
          k.scale(0.8),
          k.z(1),
          "shop-ui",
        ]);

        const center = k.center();
        let fragmentSprites = [];
        let currentFragmentNames = [];
        let priceTexts = [];

        function showFragments() {
          // Remove old fragments
          fragmentSprites.forEach((frag) => frag.destroy());
          fragmentSprites = [];

          // Remove old price texts
          priceTexts.forEach((txt) => txt.destroy());
          priceTexts = [];

          const unlocked = state.current().fragmentUnlocked;

          // Filter to only locked fragments
          const filteredList = allFragments.filter(
            (frag) => !unlocked.has(frag)
          );

          const newFragments = getRandomFragments(
            allFragments,
            currentFragmentNames
          );

          currentFragmentNames = newFragments;

          newFragments.forEach((name, index) => {
            const price = fragmentPrices[name] ?? 0;
            const isOwned = state.current().fragmentUnlocked.has(name);

            const frag = k.add([
              k.sprite(name),
              k.pos(center.x + 70 + index * 125, center.y + 50),
              k.scale(1),
              k.anchor("center"),
              k.area(),
              k.fixed(),
              k.z(2),
              "fragment",
              { name, price },
            ]);
            fragmentSprites.push(frag);

            // Price or label
            const label = isOwned ? "OWNED" : `${price}$`;

            const priceText = k.add([
              k.text(label, { font: "Font", size: 30 }),
              k.pos(center.x + 67 + index * 125, center.y + 110),
              k.anchor("center"),
              k.fixed(),
              k.z(2),
              k.color(isOwned ? 100 : 0, 0, 0), // gray for owned
            ]);
            priceTexts.push(priceText);
          });
        }

        let rerollCost = 3;

        showFragments();

        // Reroll Button
        const rerollBtn = k.add([
          k.sprite("Reroll-btn"),
          k.pos(center.x - 171, center.y + 27),
          k.anchor("center"),
          k.scale(1.5),
          k.area(),
          k.fixed(),
          k.z(3),
          "shop-reroll",
        ]);

        k.onClick("fragment", (frag) => {
          const currentMoney = state.current().moneyState;
          const unlocked = state.current().fragmentUnlocked;

          if (unlocked.has(frag.name)) {
            return;
          }

          if (currentMoney >= frag.price && purchasedFragments.length < 5) {
            unlocked.add(frag.name);
            tokenUI.updateTokensFromState();
            state.set(statePropsEnum.fragmentUnlocked, unlocked);

            purchasedFragments.push(frag.name);
            tokenUI.updateTokensFromState(purchasedFragments);
            state.set(statePropsEnum.moneyState, currentMoney - frag.price);

            console.log(state.current().fragmentUnlocked);

            // Remove the bought fragment from the screen
            frag.destroy();
            const priceIndex = fragmentSprites.indexOf(frag);
            if (priceIndex !== -1) {
              priceTexts[priceIndex].destroy();
              fragmentSprites.splice(priceIndex, 1);
              priceTexts.splice(priceIndex, 1);
            }
          }
        });

        k.onClick("shop-reroll", () => {
          const currentMoney = state.current().moneyState;

          if (currentMoney >= rerollCost) {
            state.set(statePropsEnum.moneyState, currentMoney - rerollCost);

            showFragments();
            rerollCost++;
            rerollCostText.text = `${rerollCost}$`;

            console.log(state.current().moneyState);
          }
        });

        let rerollCostText = k.add([
          k.text(`${rerollCost}$`, { font: "Font", size: 30 }),
          k.pos(center.x - 100, center.y + 27),
          k.anchor("center"),
          k.fixed(),
          k.z(2),
          k.color(0, 0, 0),
          "reroll-cost-label",
        ]);

        // Next Level Button
        const nextBtn = k.add([
          k.sprite("Exit-btn"),
          k.pos(center.x - 171, center.y + 97),
          k.anchor("center"),
          k.scale(1.5),
          k.area(),
          k.fixed(),
          k.z(3),
          "next-level",
        ]);

        k.onClick("next-level", () => {
          fragmentSprites.forEach((frag) => frag.destroy());

          k.destroyAll("shop-ui");
          k.destroyAll("shop-overlay");
          k.destroyAll("next-level");
          k.destroyAll("shop-reroll");

          shopZone.activated = false;

          if (nextScene) {
            k.go(nextScene);
          } else {
            console.warn("No nextScene property found on shop collider.");
          }

          player.setControls();
        });
      });

      continue;
    }

    const tags = ["collider"];

    if (collider.type) tags.push(collider.type);
    if (collider.properties)
      tags.push(...collider.properties.map((p) => p.name));

    map.add([
      k.pos(collider.x, collider.y),
      k.area({
        shape: new k.Rect(k.vec2(0), collider.width, collider.height),
        collisionIgnore: ["collider"],
      }),
      k.body({ isStatic: true }),
      ...tags,
    ]);
  }
}

export function setCameraControls(k, player, map, roomData) {
  k.onUpdate(() => {
    if (map.pos.x + 320 > player.pos.x) {
      k.camPos(map.pos.x + 320, k.camPos().y);
      return;
    }

    if (player.pos.x > map.pos.x + roomData.width * roomData.tilewidth - 320) {
      k.camPos(
        map.pos.x + roomData.width * roomData.tilewidth - 320,
        k.camPos().y
      );
      return;
    }

    k.camPos(player.pos.x, k.camPos().y);
  });
}

export function setCameraZones(k, map, cameras) {
  for (const camera of cameras) {
    const cameraZone = map.add([
      k.area({
        shape: new k.Rect(k.vec2(0), camera.width, camera.height),
        collisionIgnore: ["collider"],
      }),
      k.pos(camera.x, camera.y),
    ]);

    cameraZone.onCollide("player", () => {
      if (k.camPos().x !== camera.properties[0].value) {
        k.tween(
          k.camPos().y,
          camera.properties[0].value,
          0.5,
          (val) => k.camPos(k.camPos().x, val),
          k.easings.linear
        );
      }
    });
  }
}
