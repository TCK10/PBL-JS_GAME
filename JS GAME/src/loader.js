import kaplay from "../libs/kaplay.mjs";

export const scale = 2;
export const k = kaplay({
  width: 320 * scale,
  height: 180 * scale,
  scale,
  letterbox: true,
  global: false,
  root: document.body, // ⬅ force it directly into body
});

k.loadFont("Font", "./assets/Jersey10-Regular.ttf");

k.loadSpriteAtlas("./assets/DFs.png", {
  wall_glitch: { x: 0, y: 0, width: 80, height: 96 },
  firewall_shield: { x: 80, y: 0, width: 80, height: 96 },
  glitch_pulse: { x: 160, y: 0, width: 80, height: 96 },
  error_clone: { x: 240, y: 0, width: 80, height: 96 },
  phase_dash: { x: 320, y: 0, width: 80, height: 96 },
  memory_leak: { x: 0, y: 96, width: 80, height: 96 },
  glitch_step: { x: 80, y: 96, width: 80, height: 96 },
  anti_gravity_node: { x: 160, y: 96, width: 80, height: 96 },
  system_reboot: { x: 240, y: 96, width: 80, height: 96 },
  quantum_duplication: { x: 320, y: 96, width: 80, height: 96 },
  skull: { x: 0, y: 192, width: 80, height: 96 },
});

k.loadSpriteAtlas("./assets/tokens.png", {
  wall_token: { x: 0, y: 0, width: 16, height: 16 },
  firewall_token: { x: 16, y: 0, width: 16, height: 16 },
  glitch_token: { x: 32, y: 0, width: 16, height: 16 },
  error_token: { x: 0, y: 16, width: 16, height: 16 },
  phase_token: { x: 16, y: 16, width: 16, height: 16 },
  memory_token: { x: 32, y: 16, width: 16, height: 16 },
  glitch_step_token: { x: 0, y: 32, width: 16, height: 16 },
  anti_gravity_token: { x: 16, y: 32, width: 16, height: 16 },
  system_reboot_token: { x: 32, y: 32, width: 16, height: 16 },
  quantum_duplication_token: { x: 0, y: 48, width: 16, height: 16 },
  skull_token: { x: 16, y: 48, width: 16, height: 16 },
  token: { x: 32, y: 48, width: 16, height: 16 },
});

k.loadSpriteAtlas("./assets/healthbar.png", {
  healthBar: { x: 0, y: 0, width: 80, height: 528, sliceY: 11 },
});

k.loadSprite("Reroll-btn", "./assets/reroll-button.png", {
  sliceX: 2,
  anims: {
    press: { from: 0, to: 1 },
  },
});

k.loadSprite("Exit-btn", "./assets/exit-button.png", {
  sliceX: 2,
  anims: {
    press: { from: 0, to: 1 },
  },
});

k.loadSprite("Glitch", "./assets/glitch.png", {
  sliceX: 5,
  sliceY: 11,
  anims: {
    idle: { from: 0, to: 4, loop: true },
    run: { from: 5, to: 9, loop: true },
    dash: { from: 10, to: 14, speed: 15 },
    attack: { from: 15, to: 17, speed: 10 },
    jump: { from: 20, to: 23, loop: true },
    fall: { from: 25, to: 29, loop: true },
    hurt: { from: 30, to: 33 },
    die: { from: 35, to: 39 },
  },
});

k.loadSprite("Glitch-shield", "./assets/glitch.png", {
  sliceX: 5,
  sliceY: 11,
  anims: {
    shield: { from: 40, to: 41 },
    shield_hit: { from: 42, to: 43 },
  },
});

k.loadSprite("Glitch-teleport", "./assets/glitch-tele.png", {
  sliceX: 7,
  sliceY: 1,
  anims: {
    teleport: { from: 0, to: 6, speed: 10 },
  },
});

k.loadSprite("RAT", "./assets/RAT.png", {
  sliceX: 7,
  sliceY: 5,
  anims: {
    idle: { from: 0, to: 4, loop: true },
    run: { from: 7, to: 11, loop: true },
    attack: { from: 12, to: 15, speed: 10 },
    hurt: { from: 19, to: 22 },
    die: { from: 26, to: 32 },
  },
});

k.loadSprite("RansomWare", "./assets/cawcaw.png", {
  sliceX: 4,
  sliceY: 3,
  anims: {
    flying: { from: 0, to: 3, loop: true },
    attack: { from: 4, to: 6, speed: 15 },
    die: { from: 8, to: 11 },
  },
});

k.loadSprite("coin", "./assets/byte.png");

k.loadSprite("boss", "./assets/sillylilguy.png", {
  sliceX: 4,
  sliceY: 5,
  anims: {
    idle: { from: 0, to: 3, loop: true },
    attack: { from: 4, to: 7, speed: 15 },
    ball_attack: { from: 8, to: 11, speed: 15 },
    hurt: { from: 12, to: 15 },
    die: { from: 16, to: 19 },
  },
});

k.loadSprite("bullet", "./assets/bigballs.png", {
  sliceX: 3,
  anims: {
    idle: { from: 0, to: 2, loop: true },
  },
});

k.loadSound("boom", "./assets/sounds/boom.wav");
k.loadSound("music", "./assets/sounds/music.mp3");

k.loadSprite("shop-ui", "./maps/shop.png");
k.loadSprite("lvl_1", "./maps/lvl_1.png");
k.loadSprite("lvl_2", "./maps/lvl_2.png");
k.loadSprite("lvl_3", "./maps/lvl_3.png");
k.loadSprite("lvl_4", "./maps/lvl_4.png");
k.loadSprite("lvl_5", "./maps/lvl_5.png");
