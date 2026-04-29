import type { ServerConfigFile } from '@/lib/server-settings'

export const DEFAULT_SERVER_CONFIG_TEMPLATES: Record<ServerConfigFile, string> = {
  'server.properties': `#Minecraft server properties
#Template defaults for editor
accepts-transfers=false
allow-flight=true
allow-nether=true
broadcast-console-to-ops=true
broadcast-rcon-to-ops=true
bug-report-link=
debug=false
difficulty=hard
enable-code-of-conduct=false
enable-command-block=true
enable-jmx-monitoring=false
enable-query=false
enable-rcon=false
enable-status=true
enforce-secure-profile=true
enforce-whitelist=false
entity-broadcast-range-percentage=100
force-gamemode=false
function-permission-level=2
gamemode=survival
generate-structures=true
generator-settings={}
hardcore=false
hide-online-players=false
initial-disabled-packs=
initial-enabled-packs=vanilla
level-name=world
level-seed=
level-type=minecraft\\:normal
log-ips=true
management-server-allowed-origins=
management-server-enabled=false
management-server-host=localhost
management-server-port=0
management-server-secret=change-me
management-server-tls-enabled=true
management-server-tls-keystore=
management-server-tls-keystore-password=
max-chained-neighbor-updates=1000000
max-players=20
max-tick-time=60000
max-world-size=29999984
motd=A Minecraft Server
network-compression-threshold=256
online-mode=true
op-permission-level=4
pause-when-empty-seconds=-1
player-idle-timeout=0
prevent-proxy-connections=false
pvp=true
query.port=25565
rate-limit=0
rcon.password=change-me
rcon.port=25575
region-file-compression=deflate
require-resource-pack=false
resource-pack=
resource-pack-id=
resource-pack-prompt=
resource-pack-sha1=
server-ip=
server-port=25565
simulation-distance=10
spawn-monsters=true
spawn-protection=16
status-heartbeat-interval=0
sync-chunk-writes=true
text-filtering-config=
text-filtering-version=0
use-native-transport=true
view-distance=10
white-list=false
`,
  'bukkit.yml': `settings:
  allow-end: true
  warn-on-overload: true
  permissions-file: permissions.yml
  update-folder: update
  plugin-profiling: false
  connection-throttle: 0
  query-plugins: true
  deprecated-verbose: default
  shutdown-message: Server closed
  minimum-api: none
  use-map-color-cache: true
spawn-limits:
  monsters: 40
  animals: 10
  water-animals: 5
  water-ambient: 5
  water-underground-creature: 5
  axolotls: 5
  ambient: 15
chunk-gc:
  period-in-ticks: 600
ticks-per:
  animal-spawns: 400
  monster-spawns: 4
  water-spawns: 1
  water-ambient-spawns: 1
  water-underground-creature-spawns: 1
  axolotl-spawns: 1
  ambient-spawns: 1
  autosave: 6000
aliases: now-in-commands.yml
`,
  'spigot.yml': `settings:
  bungeecord: false
  save-user-cache-on-stop-only: true
  sample-count: 12
  player-shuffle: 0
  user-cache-size: 1000
  moved-wrongly-threshold: 0.0625
  moved-too-quickly-multiplier: 10.0
  timeout-time: 60
  restart-on-crash: false
  restart-script: ./start.sh
  netty-threads: 4
  attribute:
    maxAbsorption:
      max: 2048.0
    maxHealth:
      max: 1024.0
    movementSpeed:
      max: 1024.0
    attackDamage:
      max: 2048.0
  log-villager-deaths: false
  log-named-deaths: false
  debug: false
messages:
  whitelist: You are not whitelisted on this server.
  unknown-command: Unknown command. Type "/help" for help.
  server-full: The server is full.
  outdated-client: Outdated client. Please use {0}
  outdated-server: Outdated server. I'm still on {0}
  restart: Server is restarting
advancements:
  disable-saving: false
  disabled:
  - minecraft:story/disabled
players:
  disable-saving: false
config-version: 13
stats:
  disable-saving: false
  forced-stats: {}
commands:
  tab-complete: 0
  send-namespaced: true
  spam-exclusions:
  - /skill
  silent-commandblock-console: false
  replace-commands:
  - setblock
  - summon
  - testforblock
  - tellraw
  log: true
  enable-spam-exclusions: false
world-settings:
  default:
    below-zero-generation-in-existing-chunks: true
    view-distance: default
    simulation-distance: default
    merge-radius:
      item: 4.0
      exp: 6.0
    mob-spawn-range: 4
    item-despawn-rate: 6000
    thunder-chance: 100000
    arrow-despawn-rate: 1200
    trident-despawn-rate: 1200
    zombie-aggressive-towards-villager: true
    nerf-spawner-mobs: false
    enable-zombie-pigmen-portal-spawns: true
    wither-spawn-sound-radius: 0
    end-portal-sound-radius: 0
    hanging-tick-frequency: 100
    unload-frozen-chunks: false
    growth:
      cactus-modifier: 100
      cane-modifier: 100
      melon-modifier: 100
      mushroom-modifier: 100
      pumpkin-modifier: 100
      sapling-modifier: 100
      beetroot-modifier: 100
      carrot-modifier: 100
      potato-modifier: 100
      torchflower-modifier: 100
      wheat-modifier: 100
      netherwart-modifier: 100
      vine-modifier: 100
      cocoa-modifier: 100
      bamboo-modifier: 100
      sweetberry-modifier: 100
      kelp-modifier: 100
      twistingvines-modifier: 100
      weepingvines-modifier: 100
      cavevines-modifier: 100
      glowberry-modifier: 100
      pitcherplant-modifier: 100
    entity-activation-range:
      animals: 16
      monsters: 24
      raiders: 32
      misc: 8
      water: 16
      villagers: 16
      flying-monsters: 8
      villagers-work-immunity-after: 100
      villagers-work-immunity-for: 20
      villagers-active-for-panic: true
      tick-inactive-villagers: false
      ignore-spectators: false
    entity-tracking-range:
      players: 64
      animals: 48
      monsters: 48
      misc: 32
      display: 64
      other: 32
    ticks-per:
      hopper-transfer: 8
      hopper-check: 8
    hopper-amount: 1
    hopper-can-load-chunks: false
    dragon-death-sound-radius: 0
    hunger:
      jump-walk-exhaustion: 0.05
      jump-sprint-exhaustion: 0.2
      combat-exhaustion: 0.1
      regen-exhaustion: 6.0
      swim-multiplier: 0.01
      sprint-multiplier: 0.1
      other-multiplier: 0.0
    max-tnt-per-tick: 100
    max-tick-time:
      tile: 50
      entity: 50
    verbose: false
`,
  'paper-global.yml': `_version: 31
anticheat:
  obfuscation:
    items:
      all-models:
        also-obfuscate: []
        dont-obfuscate:
        - minecraft:lodestone_tracker
        sanitize-count: true
      enable-item-obfuscation: false
      model-overrides:
        minecraft:elytra:
          also-obfuscate: []
          dont-obfuscate:
          - minecraft:damage
          sanitize-count: true
block-updates:
  disable-chorus-plant-updates: false
  disable-mushroom-block-updates: false
  disable-noteblock-updates: false
  disable-tripwire-updates: false
chunk-loading-advanced:
  auto-config-send-distance: true
  player-max-concurrent-chunk-generates: 0
  player-max-concurrent-chunk-loads: 0
chunk-loading-basic:
  player-max-chunk-generate-rate: -1.0
  player-max-chunk-load-rate: 100.0
  player-max-chunk-send-rate: 75.0
chunk-system:
  io-threads: -1
  worker-threads: -1
collisions:
  enable-player-collisions: true
  send-full-pos-for-hard-colliding-entities: true
commands:
  ride-command-allow-player-as-vehicle: false
  suggest-player-names-when-null-tab-completions: true
console:
  enable-brigadier-completions: true
  enable-brigadier-highlighting: true
  has-all-permissions: false
item-validation:
  book:
    author: 8192
    page: 16384
    title: 8192
  book-size:
    page-max: 2560
    total-multiplier: 0.98
  display-name: 8192
  lore-line: 8192
  resolve-selectors-in-books: false
messages:
  kick:
    authentication-servers-down: <lang:multiplayer.disconnect.authservers_down>
    connection-throttle: Connection throttled! Please wait before reconnecting.
    flying-player: <lang:multiplayer.disconnect.flying>
    flying-vehicle: <lang:multiplayer.disconnect.flying>
  no-permission: <red>I'm sorry, but you do not have permission to perform this command.
    Please contact the server administrators if you believe that this is in error.
  use-display-name-in-quit-message: false
misc:
  chat-threads:
    chat-executor-core-size: -1
    chat-executor-max-size: -1
  client-interaction-leniency-distance: default
  compression-level: default
  enable-nether: true
  fix-far-end-terrain-generation: true
  load-permissions-yml-before-plugins: true
  max-joins-per-tick: 5
  max-tracking-combat-entries: 10240
  prevent-negative-villager-demand: false
  region-file-cache-size: 256
  send-full-pos-for-item-entities: false
  strict-advancement-dimension-check: false
  use-alternative-luck-formula: false
  use-dimension-type-for-custom-spawners: false
  xp-orb-groups-per-area: default
packet-limiter:
  all-packets:
    action: KICK
    interval: 7.0
    max-packet-rate: 500.0
  kick-message: <red><lang:disconnect.exceeded_packet_rate>
  overrides:
    minecraft:place_recipe:
      action: DROP
      interval: 4.0
      max-packet-rate: 5.0
player-auto-save:
  max-per-tick: -1
  rate: -1
proxies:
  bungee-cord:
    online-mode: true
  proxy-protocol: false
  velocity:
    enabled: false
    online-mode: true
    secret: ''
scoreboards:
  save-empty-scoreboard-teams: true
  track-plugin-scoreboards: false
spam-limiter:
  incoming-packet-threshold: 300
  recipe-spam-increment: 1
  recipe-spam-limit: 20
  tab-spam-increment: 1
  tab-spam-limit: 500
spark:
  enable-immediately: false
  enabled: true
time:
  affects-all-worlds: false
unsupported-settings:
  allow-headless-pistons: false
  allow-permanent-block-break-exploits: false
  allow-piston-duplication: false
  allow-unsafe-end-portal-teleportation: false
  oversized-item-component-sanitizer:
    dont-sanitize: []
  perform-username-validation: true
  skip-tripwire-hook-placement-validation: false
  skip-vanilla-damage-tick-when-shield-blocked: false
  update-equipment-on-player-actions: true
update-checker:
  enabled: true
watchdog:
  early-warning-delay: 10000
  early-warning-every: 5000
`,
  'paper-world-defaults.yml': `_version: 31
anticheat:
  anti-xray:
    enabled: false
    engine-mode: 1
    hidden-blocks:
    - copper_ore
    - deepslate_copper_ore
    - raw_copper_block
    - gold_ore
    - deepslate_gold_ore
    - iron_ore
    - deepslate_iron_ore
    - raw_iron_block
    - coal_ore
    - deepslate_coal_ore
    - lapis_ore
    - deepslate_lapis_ore
    - mossy_cobblestone
    - obsidian
    - chest
    - diamond_ore
    - deepslate_diamond_ore
    - redstone_ore
    - deepslate_redstone_ore
    - clay
    - emerald_ore
    - deepslate_emerald_ore
    - ender_chest
    lava-obscures: false
    max-block-height: 64
    replacement-blocks:
    - stone
    - oak_planks
    - deepslate
    update-radius: 2
    use-permission: false
chunks:
  auto-save-interval: default
  delay-chunk-unloads-by: 10s
  entity-per-chunk-save-limit:
    arrow: -1
    ender_pearl: -1
    experience_orb: -1
    fireball: -1
    small_fireball: -1
    snowball: -1
  fixed-chunk-inhabited-time: -1
  flush-regions-on-save: false
  max-auto-save-chunks-per-tick: 24
  prevent-moving-into-unloaded-chunks: false
collisions:
  allow-player-cramming-damage: false
  allow-vehicle-collisions: true
  fix-climbing-bypassing-cramming-rule: false
  max-entity-collisions: 8
  only-players-collide: false
command-blocks:
  force-follow-perm-level: true
  permissions-level: 2
entities:
  armor-stands:
    do-collision-entity-lookups: true
    tick: true
  behavior:
    allow-spider-world-border-climbing: true
    baby-zombie-movement-modifier: 0.5
    cooldown-failed-beehive-releases: true
    disable-chest-cat-detection: false
    disable-creeper-lingering-effect: false
    disable-player-crits: false
    ender-dragons-death-always-places-dragon-egg: false
    experience-merge-max-value: -1
    nerf-pigmen-from-nether-portals: false
    only-merge-items-horizontally: false
    parrots-are-unaffected-by-player-movement: false
    phantoms-do-not-spawn-on-creative-players: true
    phantoms-only-attack-insomniacs: true
    phantoms-spawn-attempt-max-seconds: 119
    phantoms-spawn-attempt-min-seconds: 60
    piglins-guard-chests: true
    player-insomnia-start-ticks: 72000
    should-remove-dragon: false
    spawner-nerfed-mobs-should-jump: false
    stuck-entity-poi-retry-delay: 200
    zombie-villager-infection-chance: default
    zombies-target-turtle-eggs: true
  markers:
    tick: true
  mob-effects:
    immune-to-wither-effect:
      wither: true
      wither-skeleton: true
    spiders-immune-to-poison-effect: true
  spawning:
    all-chunks-are-slime-chunks: false
    count-all-mobs-for-spawning: false
    creative-arrow-despawn-rate: default
    despawn-range-shape: ELLIPSOID
    max-arrow-despawn-invulnerability: 200
    monster-spawn-max-light-level: default
    non-player-arrow-despawn-rate: default
    per-player-mob-spawns: true
    scan-for-legacy-ender-dragon: true
    skeleton-horse-thunder-spawn-chance: default
    spawn-limits:
      ambient: -1
      axolotls: -1
      creature: -1
      monster: -1
      underground_water_creature: -1
      water_ambient: -1
      water_creature: -1
    ticks-per-spawn:
      ambient: -1
      axolotls: -1
      creature: -1
      monster: -1
      underground_water_creature: -1
      water_ambient: -1
      water_creature: -1
  tracking-range-y:
    animal: default
    display: default
    enabled: false
    misc: default
    monster: default
    other: default
    player: default
environment:
  disable-explosion-knockback: false
  disable-ice-and-snow: false
  disable-thunder: false
  fire-tick-delay: 30
  generate-flat-bedrock: false
  locate-structures-outside-world-border: false
  max-block-ticks: 65536
  max-fluid-ticks: 65536
  nether-ceiling-void-damage-height: disabled
  optimize-explosions: false
  portal-create-radius: 16
  portal-search-radius: 128
  portal-search-vanilla-dimension-scaling: true
  void-damage-amount: 4.0
  void-damage-min-build-height-offset: -64.0
  water-over-lava-flow-speed: 5
feature-seeds:
  generate-random-seeds-for-all: false
fishing-time-range:
  maximum: 600
  minimum: 100
fixes:
  disable-unloaded-chunk-enderpearl-exploit: false
  falling-block-height-nerf: disabled
  fix-items-merging-through-walls: false
  prevent-tnt-from-moving-in-water: false
  split-overstacked-loot: true
  tnt-entity-height-nerf: disabled
hopper:
  cooldown-when-full: true
  disable-move-event: false
  ignore-occluding-blocks: false
lootables:
  auto-replenish: false
  max-refills: -1
  refresh-max: 2d
  refresh-min: 12h
  reset-seed-on-fill: true
  restrict-player-reloot: true
  restrict-player-reloot-time: disabled
maps:
  item-frame-cursor-limit: 128
  item-frame-cursor-update-interval: 10
max-growth-height:
  bamboo:
    max: 16
    min: 11
  cactus: 3
  reeds: 3
misc:
  allow-remote-ender-dragon-respawning: false
  alternate-current-update-order: HORIZONTAL_FIRST_OUTWARD
  disable-end-credits: false
  disable-relative-projectile-velocity: false
  disable-sprint-interruption-on-attack: false
  legacy-ender-pearl-behavior: false
  max-leash-distance: default
  redstone-implementation: VANILLA
  show-sign-click-command-failure-msgs-to-player: false
  update-pathfinding-on-block-update: true
scoreboards:
  allow-non-player-entities-on-scoreboards: true
  use-vanilla-world-scoreboard-name-coloring: false
spawn:
  allow-using-signs-inside-spawn-protection: false
tick-rates:
  container-update: 1
  dry-farmland: 1
  grass-spread: 1
  mob-spawner: 1
  wet-farmland: 1
unsupported-settings:
  disable-world-ticking-when-empty: false
  fix-invulnerable-end-crystal-exploit: true
  ticking:
    block-entities: true
    chunks: true
`,
}

