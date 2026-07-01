/**
 * ============================================================================
 *  PHLIX BRAND KIT  —  Pixel Dungeon   (BASE kit)
 *  pixel-dungeon.js
 * ============================================================================
 *
 *  Retro 8-bit pixel art gaming — NES cartridges, dungeon crawlers, chiptune
 *  soundtracks, life hearts, coin blocks, level-up screens, chunky pixel fonts,
 *  limited 4–16 color palettes, CRT scanlines, and the deeply satisfying sound
 *  of a coin collected. Not mere nostalgia — pixel art as a genuine, deliberate
 *  artistic aesthetic. Grid-based, chunky, minimal-palette, proudly lo-fi.
 *
 *  Usage:
 *      import brandKit from './brand-kits/pixel-dungeon.js'
 *      import { brandKit } from './brand-kits/pixel-dungeon.js'
 * ============================================================================
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY
   * ========================================================================== */

  name: "Pixel Dungeon",

  slug: "pixel-dungeon",

  version: "1.0",

  description:
    "Pixel Dungeon is the satisfying crunch of an 8-bit coin collected, the thrill " +
    "of a level-up fanfare, the glow of a CRT monitor in a dark bedroom at midnight. " +
    "It pairs the deliberately limited palette and chunky grid geometry of classic NES " +
    "and Atari-era games with the deep joy of dungeon-crawler achievement culture — " +
    "making every interaction feel like progress, every feature like a power-up, and " +
    "every piece of content like a world waiting to be explored.",

  inspiration: [
    "Original NES library — Super Mario Bros., The Legend of Zelda, Metroid, Mega Man, Castlevania, Contra",
    "Atari 2600 — the birthplace of home gaming palettes",
    "Game Boy — four shades of green, infinite worlds",
    "Dungeon crawlers — Nethack, Rogue, Angband, early Ultima",
    "8-bit chiptune composers — Koji Kondo, Hirokazu Tanaka, Manami Matsumae",
    "CRT TV scan-line glow and the phosphor burn of a paused game",
    "Famicom / Famicom Disk System aesthetic",
    "Pixel artists — Paul Robertson, eBoy, Mark Ferrari",
    "Indie retro revival — Shovel Knight, Cave Story, Celeste, Undertale",
    "Arcade cabinet marquee art and instruction cards",
    "NES cartridge label illustration style",
    "8-bit sprite sheets and animation frames",
  ],

  keywords: [
    "pixel", "8-bit", "retro", "gaming", "chiptune", "NES", "Atari", "dungeon",
    "crawler", "sprite", "tile", "tileset", "grid", "chunky", "lo-fi", "nostalgia",
    "achievement", "level-up", "coin", "power-up", "heart", "life", "CRT", "scanline",
    "phosphor", "cartridge", "famicom", "game-boy", "arcade", "bleep", "bloop",
    "limited-palette", "pixel-perfect", "stepped", "quantized", "block", "monospace",
    "playful", "fun", "satisfying", "collectible", "boss", "dungeon", "loot",
    "inventory", "quest", "adventure", "hero", "shield", "sword", "press-start",
    "insert-coin", "continue", "game-over", "high-score", "1up", "warp-pipe",
    "secret-room", "map", "overworld", "cave", "rogue-like", "turn-based",
    "bitwise", "low-res", "dithering", "indexed-color", "transparency",
  ],

  /* ==========================================================================
   * 2. PERSONALITY
   * ========================================================================== */

  personality: ["Playful", "Nostalgic", "Game-like", "Chunky", "Satisfying", "Retro"],

  emotional_goals: ["Fun", "Nostalgia", "Achievement", "Excitement", "Joy", "Playfulness"],

  archetype: "Jester",

  audience: [
    "Gamers who grew up on NES, SNES, and early PC gaming",
    "Indie game enthusiasts and pixel-art appreciators",
    "Retro collectors and preservation community members",
    "Younger audiences discovering the pixel-art aesthetic",
    "Streamers and content creators with gaming-adjacent libraries",
    "Adults 20–40 who associate gaming with memory and joy",
  ],

  /* ==========================================================================
   * 3. BRAND STORY
   * ========================================================================== */

  story:
    "Before streaming, before HD, before 4K — there was a cartridge. You blew on it, " +
    "slid it into the slot, and pressed Power. Eight bits were enough to build entire " +
    "worlds: dungeons to explore, coins to collect, bosses to defeat, princesses to rescue. " +
    "The constraints were the canvas. Three channels of sound composed symphonies. Sixteen " +
    "colors painted galaxies. Pixel Dungeon was born from that truth — that limitation " +
    "breeds invention, that a 16×16 sprite can carry more personality than a photorealistic " +
    "render, that the satisfying 'ding' of a collected coin is one of the most joyful sounds " +
    "humans have engineered. Phlix built Pixel Dungeon for the viewer who knows that great " +
    "stories don't need infinite resolution — just the right ones.",

  tagline_primary: "Insert Coin. Begin Story.",

  tagline_secondary: [
    "Press Start to Watch.",
    "Every title is a new dungeon.",
    "Your library awaits. +1 UP.",
    "No continues required.",
  ],

  mission:
    "Make every watch feel like the start of a new adventure — turning a media library " +
    "into a world of content to explore, collect, and conquer.",

  values: ["Play", "Joy", "Discovery", "Craft", "Nostalgia"],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES
   * ========================================================================== */

  brand_dna:
    "Pixel Dungeon is 8-bit precision applied to modern streaming. It is cartridge black " +
    "backgrounds, Mario Red primary actions, Game Blue secondary details, and Coin Yellow " +
    "rewards — every element on a strict pixel grid, every corner either 0px or a hard " +
    "2px block step. It is never smooth, never organic, never gradient-heavy. Motion moves " +
    "in steps, not curves. Typography is monospaced and chunky. The palette is ruthlessly " +
    "limited. Every constraint is intentional — the lo-fi aesthetic is the aesthetic.",

  design_principles: [
    "Everything lives on a pixel grid — align to 8px or 16px increments.",
    "Corners are 0px or 2px maximum — no organic rounding.",
    "Motion uses steps() easing — no smooth bezier curves.",
    "The palette is limited by design — resist adding new hues.",
    "Mario Red is the only color for the single most important action per screen.",
    "Typography is Press Start 2P or Silkscreen — no exceptions for decorative text.",
    "Empty states, loaders, and errors are opportunities for game references.",
    "Every success moment deserves a reward: coin collect, level up, achievement unlocked.",
  ],

  brand_opposites: [
    "Not smooth, organic, or rounded",
    "Not photorealistic or 3D-rendered",
    "Not corporate clean or minimal-white",
    "Not gradient-heavy or blurry",
    "Not sophisticated or serious",
    "Not high-DPI-obsessed — lo-fi is the goal",
    "Not warm editorial or cinematic",
  ],

  signature_elements: [
    "CRT scanline overlay (repeating 2px horizontal stripe, 5% black opacity)",
    "Dithering patterns at color boundaries instead of gradients",
    "Heart / coin / star icons rendered as pixel sprites",
    "Progress bars that fill in discrete 8px block increments",
    "Blinking cursor animations using steps(1) easing",
    "8×8 pixel checkerboard patterns as texture fills",
    "Retro badge labels styled like NES cartridge stickers",
  ],

  header_motif:
    "Animated pixel sprite of Blip the hero running across the masthead from left " +
    "to right in a loop, with coin sparkle particles trailing behind",

  /* ==========================================================================
   * 5. VISUAL IDENTITY
   * ========================================================================== */

  visual_style: [
    "8-bit pixel art",
    "Retro gaming / NES era",
    "CRT scanline aesthetic",
    "Limited indexed-color palette",
    "Chiptune / Famicom visual language",
  ],

  art_direction:
    "All artwork should feel like it came off an NES cartridge label or a 1980s arcade " +
    "flyer: bold flat colors from a strict 16-color palette, hard pixel edges with no " +
    "anti-aliasing, dithering where shading is needed, and chunky outlined sprites with " +
    "black outlines. Compositions are frontal and symmetric — dungeon rooms viewed from " +
    "above or side-scrolling environments viewed from the side. Characters are recognizable " +
    "at 16×16 pixels. Environmental depth is achieved through tiled repeating backgrounds " +
    "and a clear foreground/midground/background layer convention. Never use photography, " +
    "smooth gradients, or realistic rendering. The art style IS the identity.",

  realism: "stylized",

  rendering_style: ["pixel_art", "flat_color", "indexed_palette", "sprite_based"],

  texture_level: "low",

  depth: "layered_tiles",

  lighting: {
    temperature: "neutral",
    quality: "flat — no real light sources; shading via dithering and palette steps only",
    shadows: "pixel_drop_shadow",
    contrast: "high",
    notes:
      "Lighting is simulated through palette choice and dithering — no actual light " +
      "calculations. Dark areas use 2×2 dither patterns with the darker palette step. " +
      "No glow, no bloom, no ambient occlusion. The CRT scanline overlay provides the " +
      "only 'atmospheric' effect.",
  },

  composition: [
    "Grid-aligned, tile-based layouts",
    "Symmetric dungeon-room framing",
    "Side-scrolling environment layers (BG / MG / FG)",
    "Top-down overworld map perspective",
    "Chunky bordered panel compositions",
    "Sprite subject centered on pixel-grid background",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM
   * ========================================================================== */

  colors: {
    primary: {
      name: "Mario Red",
      hex: "#E8001A",
      rgb: "rgb(232, 0, 26)",
      hsl: "hsl(353, 100%, 45%)",
      usage: "Primary CTAs, active states, the single most important action color per screen.",
      contrast_targets: ["cartridge_black", "screen_black"],
    },
    secondary: {
      name: "Game Blue",
      hex: "#0055AA",
      rgb: "rgb(0, 85, 170)",
      hsl: "hsl(212, 100%, 33%)",
      usage: "Secondary actions, links, highlights, sky tiles, water bodies.",
      contrast_targets: ["cartridge_black", "screen_white"],
    },
    tertiary: {
      name: "Coin Yellow-Green",
      hex: "#88BB00",
      rgb: "rgb(136, 187, 0)",
      hsl: "hsl(75, 100%, 37%)",
      usage: "Coins, power-ups, achievements, rewards, success badges, XP indicators.",
      contrast_targets: ["cartridge_black", "screen_black"],
    },
    neutral: {
      name: "Pixel Gray",
      hex: "#666660",
      rgb: "rgb(102, 102, 96)",
      hsl: "hsl(60, 3%, 39%)",
      usage: "Controller gray — muted UI chrome, dividers, secondary text.",
      contrast_targets: ["cartridge_black"],
    },
    background: {
      name: "Cartridge Black",
      hex: "#0A0A0A",
      rgb: "rgb(10, 10, 10)",
      hsl: "hsl(0, 0%, 4%)",
      usage: "Default page background — the black of a NES cartridge shell.",
      contrast_targets: ["screen_white", "mario_red", "coin_yellow_green"],
    },
    surface: {
      name: "Screen Black",
      hex: "#151515",
      rgb: "rgb(21, 21, 21)",
      hsl: "hsl(0, 0%, 8%)",
      usage: "Card and panel surfaces — the black of a powered CRT screen.",
      contrast_targets: ["screen_white", "coin_yellow_green"],
    },
    surface_alt: {
      name: "Console Dark",
      hex: "#1E1E1E",
      rgb: "rgb(30, 30, 30)",
      hsl: "hsl(0, 0%, 12%)",
      usage: "Alternate surface for striped rows, nested panels, hover states.",
      contrast_targets: ["screen_white"],
    },
    text: {
      name: "Screen White",
      hex: "#F5F5F0",
      rgb: "rgb(245, 245, 240)",
      hsl: "hsl(60, 20%, 95%)",
      usage: "Primary body and headline text — the warm white of a phosphor screen.",
      contrast_targets: ["cartridge_black", "screen_black", "console_dark"],
    },
    success: {
      name: "1UP Green",
      hex: "#00AA44",
      rgb: "rgb(0, 170, 68)",
      hsl: "hsl(142, 100%, 33%)",
      usage: "1UP moments, success toasts, completed quests, saved-game confirmations.",
      contrast_targets: ["cartridge_black"],
    },
    warning: {
      name: "Low Health Yellow",
      hex: "#FFCC00",
      rgb: "rgb(255, 204, 0)",
      hsl: "hsl(48, 100%, 50%)",
      usage: "Warnings, low-health indicators, caution states, degraded quality.",
      contrast_targets: ["cartridge_black", "screen_black"],
    },
    error: {
      name: "Game Over Red",
      hex: "#CC0000",
      rgb: "rgb(204, 0, 0)",
      hsl: "hsl(0, 100%, 40%)",
      usage: "Errors, destructive actions, boss-fight danger, failed states.",
      contrast_targets: ["cartridge_black", "screen_black"],
    },
    info: {
      name: "Sky Blue",
      hex: "#5599FF",
      rgb: "rgb(85, 153, 255)",
      hsl: "hsl(218, 100%, 67%)",
      usage: "Informational banners, tips, dialogue boxes, system notices.",
      contrast_targets: ["cartridge_black", "screen_black"],
    },
    focus: {
      name: "Select Yellow",
      hex: "#FFCC00",
      rgb: "rgb(255, 204, 0)",
      hsl: "hsl(48, 100%, 50%)",
      usage: "Keyboard-focus ring (2px hard border, no offset blur — pixel crisp).",
      contrast_targets: ["cartridge_black", "screen_black"],
    },
    border: {
      name: "Dungeon Stone",
      hex: "#333333",
      rgb: "rgb(51, 51, 51)",
      hsl: "hsl(0, 0%, 20%)",
      usage: "Card borders, panel dividers, tile outlines — barely visible stone.",
      contrast_targets: [],
    },
    shadow: {
      name: "Pixel Drop",
      hex: "#000000",
      rgb: "rgba(0, 0, 0, 0.8)",
      hsl: "hsl(0, 0%, 0%)",
      usage: "Hard 2px pixel drop-shadows (offset right+down) — no blur, no spread.",
      contrast_targets: [],
    },
    overlay: {
      name: "Pause Screen",
      hex: "#000000",
      rgb: "rgba(0, 0, 0, 0.85)",
      hsl: "hsl(0, 0%, 0%)",
      usage: "Modal/scrim overlays — the pause-screen blackout.",
      contrast_targets: [],
    },
    gradients: [
      {
        name: "Dungeon Depth",
        type: "linear",
        angle: "180deg",
        stops: ["#151515", "#0A0A0A"],
        usage: "Subtle surface-to-background step for panel depth — nearly imperceptible.",
      },
      {
        name: "Coin Shimmer",
        type: "linear",
        angle: "135deg",
        stops: ["#FFCC00", "#88BB00"],
        usage: "Coin and achievement badge fills — the only gradient allowed, 2-stop.",
      },
      {
        name: "Hero Entrance",
        type: "linear",
        angle: "180deg",
        stops: ["#0055AA", "#0A0A0A"],
        usage: "Hero section fade from Game Blue to background — level intro backdrop.",
      },
    ],
  },

  color_rules: [
    "All backgrounds are near-black (Cartridge Black or Screen Black). Never light.",
    "Mario Red is exclusively for the single primary CTA per screen — one hero action.",
    "Coin Yellow-Green marks rewards, achievements, and success moments only.",
    "Game Blue is for secondary navigation, links, and informational tile backgrounds.",
    "Pixel Gray for all secondary text and inactive UI elements.",
    "Never introduce new hues — the limited palette IS the aesthetic.",
    "All text on dark must meet WCAG AA (4.5:1 body, 3:1 large text).",
    "Dither between palette colors instead of using gradients for shading.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  fonts: {
    headline: {
      family: "Press Start 2P",
      weight: [400],
      fallbacks: ["Courier New", "Courier", "monospace"],
      usage: "All page titles, hero headlines, section headers — the canonical arcade font.",
      tracking: "0.05em",
      line_height: 2.0,
    },
    display: {
      family: "Press Start 2P",
      weight: [400],
      fallbacks: ["Courier New", "Courier", "monospace"],
      usage: "Splash title cards, score displays, level announcements, boss-name reveals.",
      tracking: "0.08em",
      line_height: 1.8,
    },
    body: {
      family: "Silkscreen",
      weight: [400, 700],
      fallbacks: ["Courier New", "Courier", "monospace"],
      usage: "Descriptions, synopses, UI labels — pixel-feel at readable sizes.",
      tracking: "0.02em",
      line_height: 1.8,
    },
    ui: {
      family: "Silkscreen",
      weight: [400, 700],
      fallbacks: ["Courier New", "Courier", "monospace"],
      usage: "Buttons, navigation labels, chips, form fields — always pixel-legible.",
      tracking: "0.02em",
      line_height: 1.5,
    },
    mono: {
      family: "Press Start 2P",
      weight: [400],
      fallbacks: ["Courier New", "Courier", "monospace"],
      usage: "Counters, runtime numbers, debug readouts, cheat-code entry fields.",
      tracking: "0.05em",
      line_height: 2.0,
    },
    number: {
      family: "Press Start 2P",
      weight: [400],
      fallbacks: ["Courier New", "monospace"],
      usage: "Score displays, watch counts, episode numbers, dashboard stats — always pixel.",
      tracking: "0.04em",
      line_height: 1.0,
    },
  },

  typography_rules: [
    "Press Start 2P has only one weight — never attempt bold simulation.",
    "All Press Start 2P text renders at whole-pixel sizes (8px, 10px, 12px, 16px, 24px).",
    "Line-height must be at least 2× for Press Start 2P — descenders need room.",
    "Never use italic or oblique with Press Start 2P — the font has no slant.",
    "Silkscreen is used for body copy where Press Start 2P is too wide to fit.",
    "No system-ui or sans-serif fonts anywhere — every label must feel game-native.",
    "Center-aligned text is common and expected — game UIs center by default.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  shape_language: [
    "0px corners — hard pixel rectangles only",
    "8×8 and 16×16 grid-aligned blocks",
    "Stepped/notched corner cuts (pixel diagonal)",
    "Hard 2px drop shadows offset 2px right and 2px down",
    "Solid 2px borders, always #333333 or brighter",
  ],

  corner_radius: {
    small: "0px",
    medium: "0px",
    large: "0px",
    xl: "0px",
    pill: "0px",
  },

  borders: {
    thickness: "2px",
    style: "solid",
    rounded: false,
    hand_drawn: false,
    notes:
      "All borders are 2px solid, hard-cornered — no radius. Borders use Dungeon Stone " +
      "(#333333) for subtle panels, or the primary/secondary color for highlighted elements. " +
      "Active/focused borders use Select Yellow (#FFCC00) at 2px with no blur.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  icon_style: ["Pixel Sprite", "16x16 grid", "Flat Fill", "Hard Edge"],

  icon_rules: [
    "All icons rendered at 16×16 or 32×32 pixel grid — no fractional sizes.",
    "No anti-aliasing — hard pixel edges only.",
    "Fill-based, not stroke-based — pixel art uses solid fill shapes.",
    "Use a maximum of 4 colors per icon (black outline + 2 fill + 1 highlight).",
    "Active state: swap fill to Coin Yellow-Green or Mario Red.",
    "Never use modern icon libraries (Heroicons, Lucide) unmodified — pixelate or replace.",
    "Game symbols encouraged: sword, shield, heart, coin, star, key, chest, map, scroll.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  illustration_style: [
    "NES cartridge label art",
    "8-bit sprite sheet character",
    "Arcade marquee flat illustration",
    "Pixel-art isometric dungeon room",
    "Game Boy 4-shade greyscale",
  ],

  character_style: {
    proportions: "Chunky heroic proportions — 16px tall, 3-head-high, no neck, wide shoulders.",
    eyes: "2×2 pixel whites with 1×1 pixel pupil dots. Simple and expressive.",
    expressions: "Determined, surprised, happy, defeated — communicated through eyebrow pixels.",
    clothing:
      "Armor, tunics, robes, overalls — palette-limited to 3 colors per character: " +
      "shadow, mid, highlight. Black outline required on all character edges.",
    outlines: "Mandatory 1px black pixel outline on all sprite edges. No anti-aliasing.",
  },

  mascot: {
    name: "Blip",
    species: "16×16 pixel hero sprite with sword and shield",
    personality:
      "Brave, cheerful, eternally optimistic — the kind of hero who runs into every " +
      "dungeon headfirst and somehow always finds the coins.",
    description:
      "Blip is a 16×16 pixel sprite: red tunic, brown belt, blue shield with a white " +
      "star, short sword raised in the air. Two white 2×2 pixel eyes express everything " +
      "from excitement (wide open) to concentration (one-pixel squint). Blip runs across " +
      "loading screens with a two-frame walk cycle, pauses to discover coins and cheer, " +
      "and sits defeated with Xs for eyes on error/empty states.",
    poses: [
      "Running right — two-frame walk cycle (arms alternating)",
      "Sword raised overhead — victory / level-complete pose",
      "Shield raised forward — loading / waiting / buffering pose",
      "Sitting defeated, Xs for eyes — empty state / error pose",
      "Pointing right with sword — onboarding / CTA pointer",
    ],
    expressions: [
      "Excited (wide 3×3 white eyes)",
      "Determined (solid 2×2 eyes, brow pixel down)",
      "Victorious (one arm raised, eyes crescent-curved)",
      "Defeated (Xs for eyes, arms limp)",
    ],
  },

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  photography_style: [
    "Processed through 8-bit pixel-art filter (posterize + indexed color)",
    "CRT scanline overlay applied to all photography",
    "4-color or 8-color palette dithering effect",
    "Heavy pixelation to 64×48 or 128×96 then upscaled",
    "Optional green phosphor monochrome treatment (Game Boy mode)",
  ],

  photo_rules: [
    "No unprocessed photography — all images must be pixel-art filtered or dithered.",
    "Apply at minimum: posterize to 8 levels + reduce to brand palette colors.",
    "CRT scanline overlay (2px stripe, 10% black) must cover all processed imagery.",
    "Avoid any image that reads as modern or high-fidelity after processing.",
    "Game Boy mode (4 shades of #0F380F palette) is encouraged for editorial spreads.",
    "Upscaled low-res renders (bilinear off, nearest-neighbor) are always preferred.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  motion_style: ["Pixel-perfect", "Stepped / Quantized", "Frame-by-frame", "Snappy"],

  transitions: [
    "Hard cut (0ms — NES-style instant scene change)",
    "Horizontal wipe in 8px columns (vertical venetian-blind pixel style)",
    "Iris close/open in expanding pixel rings",
    "Fade through black in 4 discrete opacity steps (0% → 25% → 75% → 100%)",
    "Scroll by 8px per tick (stepped, not smooth)",
  ],

  animation_speed: "fast",

  easing: [
    "steps(4, end)",
    "steps(8, end)",
    "steps(1, start)",
    "linear (for discrete step animations only)",
  ],

  microinteractions: {
    hover:
      "Element gains a 2px Mario Red or Coin Yellow border and shifts 2px down + 2px " +
      "right (pixel press effect) in steps(1) — no smooth transition.",
    button_press:
      "Button shifts 2px down and 2px right (removing the 2px drop shadow) in steps(1) " +
      "to simulate a physical key press on a controller.",
    loading:
      "Blip sprite runs across a progress bar in a 2-frame walk-cycle loop using " +
      "steps(2) at 200ms per frame. Coins spawn and vanish behind him.",
    drag:
      "Element becomes a pixelated ghost (50% opacity, 2px dashed border) and " +
      "snaps to 8px grid increments while dragged.",
    focus:
      "2px Select Yellow (#FFCC00) border appears instantly (steps(1)) — " +
      "blinking at 500ms interval like a game cursor. No blur, no offset.",
    success:
      "Coin-collect animation: 3 gold coin sprites fly upward in steps(8) over 300ms, " +
      "then a '+1 UP' text badge flashes twice in Coin Yellow at 200ms interval.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  ui_style: [
    "Hard pixel grid surfaces",
    "2px border panels with drop shadows",
    "Game HUD elements (hearts, coins, scores)",
    "Dialog boxes with NES-style text reveal",
    "Menu cursor indicators (blinking right-arrow)",
  ],

  spacing_scale: [2, 4, 8, 16, 24, 32, 48, 64, 96],

  shadows: {
    sm: "2px 2px 0px rgba(0,0,0,1)",
    md: "3px 3px 0px rgba(0,0,0,1)",
    lg: "4px 4px 0px rgba(0,0,0,1)",
    pixel_red: "2px 2px 0px #CC0000",
    pixel_blue: "2px 2px 0px #003377",
    pixel_coin: "2px 2px 0px #558800",
    notes:
      "All shadows are hard offset (no blur, no spread) — the classic pixel art drop shadow. " +
      "Colored shadows are used on primary-colored elements to create a pressed-key depth illusion. " +
      "Never use box-shadow with blur-radius — it breaks the pixel aesthetic.",
  },

  cards: {
    elevation: "sm",
    padding: "16px",
    border_radius: "0px",
    border: "2px solid #333333",
    background: "#151515",
    notes:
      "Hard-cornered Screen Black cards with 2px Dungeon Stone border and a 2px black " +
      "hard drop shadow. Featured cards swap border to Mario Red or Coin Yellow-Green. " +
      "Hover: entire card shifts 2px down-right (shadow vanishes) in steps(1).",
  },

  buttons: {
    primary: {
      bg: "#E8001A",
      text: "#F5F5F0",
      radius: "0px",
      notes: "Mario Red fill, Screen White text, 2px black drop shadow. Press = shift 2px.",
    },
    secondary: {
      bg: "#0055AA",
      text: "#F5F5F0",
      radius: "0px",
      notes: "Game Blue fill, Screen White text, 2px deep-blue drop shadow.",
    },
    danger: {
      bg: "#CC0000",
      text: "#F5F5F0",
      radius: "0px",
      notes: "Game Over Red — destructive actions, delete, reset. 2px dark-red drop shadow.",
    },
    ghost: {
      bg: "transparent",
      text: "#F5F5F0",
      radius: "0px",
      notes: "2px #333333 border, Screen White text. Secondary/tertiary actions.",
    },
    link: {
      bg: "transparent",
      text: "#5599FF",
      radius: "0",
      notes: "Sky Blue text, 2px underline on hover. Inline text links only.",
    },
    icon: {
      bg: "#1E1E1E",
      text: "#F5F5F0",
      radius: "0px",
      notes: "Console Dark icon button; active state: Coin Yellow-Green icon + 2px yellow border.",
    },
    fab: {
      bg: "#E8001A",
      text: "#F5F5F0",
      radius: "0px",
      notes: "Mario Red floating action button — square, 48×48px, 2px black drop shadow.",
    },
  },

  forms: {
    inputs:
      "Screen Black fill, 2px Dungeon Stone border, 0px radius, 8px padding. " +
      "Focus: 2px Select Yellow border, blinking text cursor (steps(1), 500ms).",
    checkboxes: "16×16px hard square. Checked = Mario Red fill with white pixel checkmark.",
    switches: "32×16px rectangular track. Off = Pixel Gray. On = Coin Yellow-Green. Knob snaps.",
    dropdowns: "Screen Black surface, 2px border, Screen White options, Coin Yellow on hover.",
    validation:
      "Inline; error = Game Over Red text + Blip defeated sprite; success = 1UP Green text.",
  },

  tables: {
    headers: "Silkscreen all-caps on Console Dark header row, 2px bottom border in Mario Red.",
    hover: "Row shifts to Console Dark with 2px left-edge Coin Yellow accent.",
    sorting: "Pixel up/down arrow sprite in Coin Yellow-Green.",
    striping: "Alternate rows use surface_alt (#1E1E1E); 2px distinction.",
  },

  navigation: {
    sidebar:
      "Cartridge Black panel, 2px right border in Dungeon Stone. Active item: " +
      "Mario Red 3px left bar, Screen White label in Silkscreen. " +
      "Blinking right-arrow cursor (steps(1), 600ms) precedes the active item.",
    topbar:
      "Screen Black bar, 2px bottom border in Dungeon Stone. Wordmark in Press Start 2P " +
      "at 10px. Score-style counter for library size shown right-aligned in Coin Yellow-Green.",
    tabs:
      "Underline tabs with 2px Dungeon Stone border below all. Active tab: 2px Mario Red " +
      "bottom border, Screen White label. Tab switching is instant (steps(1)).",
    breadcrumbs:
      "Silkscreen small, separated by a '>' pixel character in Mario Red. " +
      "Home = pixel house icon. All caps.",
  },

  dashboard_style:
    "NES HUD grid on Cartridge Black — Press Start 2P stat numbers in Coin Yellow-Green " +
    "and Mario Red, Screen Black cards with 2px borders and pixel drop shadows, " +
    "heart-row health bars and coin counters for media stats. Information-dense, " +
    "every stat labeled like a game HUD. Score: total items. Lives: active streams.",

  component_styles: {
    dialog:
      "Centered Screen Black panel on Pause Screen scrim. 2px Mario Red border. " +
      "Press Start 2P title at top. Text reveal character-by-character at 30ms/char " +
      "using steps(1) — NES dialogue box style. Arrow indicator blinking at bottom.",
    sidebar: "See navigation.sidebar; collapses to 16px icon-only rail with red active dot.",
    carousel:
      "Horizontal media rail; left/right arrows are pixel-art sprites (8-bit chevron). " +
      "Edge fade uses hard 8px column mask (not gradient). Scrolls 1 item per d-pad press.",
    search_bar:
      "Full-width Screen Black input, 2px Dungeon Stone border, Silkscreen placeholder: " +
      "'SEARCH_'; blinking cursor at end. Magnifier = pixel sword icon.",
    media_player:
      "Cartridge Black control bar. Progress bar fills in 8px block increments. " +
      "Time counter in Press Start 2P. Controls are pixel-art sprite buttons.",
    toast:
      "Hard-edged rectangular toast anchored bottom-right, 2px border in state color, " +
      "2px drop shadow. Slides in 8px per tick from right (steps(8)). Auto-dismiss 3s.",
    chip:
      "Rectangular 0px-radius chip, 2px border, Silkscreen label. Active: Mario Red " +
      "fill + Screen White text. Inactive: Console Dark fill + Pixel Gray text.",
  },

  layout_patterns: {
    dashboard:
      "Full-bleed Cartridge Black; 3-column HUD-style stat grid at top " +
      "(hearts/coins/stars) → 3-column media card grid → activity log in monospace.",
    settings:
      "Left vertical tab nav (sidebar style) + right form panels. Form fields on " +
      "Screen Black cards, max-width 720px. All labels in Silkscreen all-caps.",
    media_library:
      "Sticky filter row on Console Dark → responsive poster grid (auto-fill, 160px min) " +
      "on Cartridge Black. Grid snaps to 8px gutter columns.",
    authentication:
      "Full-bleed Cartridge Black with animated starfield tile BG; centered Screen Black " +
      "form card, 2px Mario Red border, Press Start 2P title ('PLAYER 1 ENTER').",
    landing:
      "Hero section: Blip animation over Game Blue gradient backdrop → tagline in " +
      "Press Start 2P → feature tiles → Mario Red CTA → scrolling credit roll footer.",
    detail_view:
      "Full-bleed pixelated backdrop → left: poster with pixel-art play button → " +
      "right: metadata in Silkscreen → episode list styled as level-select screen below.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY
   * ========================================================================== */

  poster_style:
    "Posters receive a pixel-art dithering filter and CRT scanline overlay. " +
    "Title text is overlaid in Press Start 2P at 8px with a 1px black pixel-shadow. " +
    "Hard 2px Dungeon Stone border. 0px corners. Nearest-neighbor scaling only.",

  thumbnail_style:
    "0px corners, 2px Dungeon Stone border, CRT scanline overlay, nearest-neighbor scale. " +
    "Title overlay in Silkscreen on a solid Screen Black scrim (no gradient).",

  backdrop_style:
    "Full-bleed backdrop processed to 8-color palette dither. CRT scanline overlay " +
    "at 8% opacity. No smooth gradients — use the Dungeon Depth gradient only at edges.",

  media_cards:
    "Screen Black card, 0px radius, 2px border. Poster image (pixel-filtered) on top. " +
    "Title + year in Silkscreen below. Hover: card shifts 2px down-right + Mario Red " +
    "border + pixel play-button sprite appears centered on poster.",

  badges: {
    labels: ["4K", "HDR", "New Quest", "Continue", "Favorite", "Boss", "Side Quest", "Cleared"],
    shape: "Hard rectangle, 0px radius, 2px border.",
    colors:
      "Coin Yellow-Green for quality (4K/HDR). Mario Red for status (New Quest, Boss). " +
      "Game Blue for progress (Continue). 1UP Green for cleared/completed.",
    typography: "Press Start 2P, 400 weight, uppercase, 6–8px.",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  voice: ["Playful", "Game-like", "Encouraging", "Retro-flavored"],

  tone: [
    "Achievement-oriented",
    "Warmly nostalgic",
    "Direct and punchy",
    "Gently humorous",
  ],

  writing_style:
    "Short sentences. Game vocabulary. Encouragement through achievement framing — " +
    "not 'search' but 'explore the dungeon'; not 'error' but 'game over'; not 'loading' " +
    "but 'Loading...'. Reference game tropes naturally. Exclamation marks are earned — " +
    "reserve for genuine wins (1UP!, CLEARED!, LEVEL UP!). Never corporate, never cold.",

  vocabulary: [
    "dungeon", "quest", "loot", "power-up", "level", "boss", "coin", "heart",
    "scroll", "map", "adventure", "cleared", "continue", "high score", "insert coin",
  ],

  avoid_words: [
    "leverage", "synergy", "utilize", "robust", "seamless", "ecosystem",
    "paradigm", "disruption", "solution", "scalable", "bandwidth",
  ],

  greetings: [
    "Welcome back, adventurer.",
    "PLAYER 1 READY.",
    "Your quest awaits.",
    "The dungeon remembers you.",
  ],

  empty_state_messages: [
    "GAME OVER — Nothing here yet. Insert content to continue.",
    "This dungeon is empty. Time to add some loot.",
    "No results found. The map doesn't cover this area.",
    "Your inventory is empty. Start exploring to fill it.",
  ],

  notification_style:
    "Game achievement style — short, punchy, celebratory for wins and neutral-dry " +
    "for system notices. Errors are 'GAME OVER' not 'an error occurred'. " +
    "Successes earn an exclamation. One sentence maximum.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE
   * ========================================================================== */

  image_prompt_prefix:
    "8-bit pixel art in NES game style, limited 16-color palette, hard pixel edges, " +
    "no anti-aliasing, chunky sprites, CRT scanline aesthetic,",

  image_prompt_suffix:
    ", retro gaming aesthetic, Cartridge Black background (#0A0A0A), " +
    "Mario Red and Game Blue accents, Coin Yellow-Green highlights, " +
    "pixel-perfect, nearest-neighbor rendering, 8-bit chiptune era.",

  negative_prompt: [
    "smooth", "gradient", "anti-aliased", "photorealistic", "3D render", "blurry",
    "high resolution", "modern", "vector", "flat design", "material design",
    "rounded corners", "soft shadows", "glow effects", "film grain",
    "cinematic", "warm photograph", "lifestyle", "corporate",
  ],

  ui_generation_rules: [
    "Background is always Cartridge Black (#0A0A0A) or Screen Black (#151515).",
    "All corners are 0px — no border-radius anywhere.",
    "Shadows are 2px hard offset (no blur) — pixel drop shadow only.",
    "Typography is Press Start 2P or Silkscreen exclusively.",
    "Mario Red for one primary CTA per screen maximum.",
    "Coin Yellow-Green for rewards, achievements, and scores only.",
    "All motion uses steps() easing — no bezier curves.",
    "Max content width 1280px; grid aligned to 8px increments.",
    "All text must meet WCAG AA against Cartridge Black backgrounds.",
  ],

  logo_rules: {
    shape:
      "Wordmark in Press Start 2P, optionally inside a hard-cornered rectangular badge " +
      "with a 2px Mario Red border and 2px black drop shadow.",
    complexity: "Simple — must read at 16px height. Every letter on a clean pixel grid.",
    negative_space:
      "Minimum 16px clear zone on all sides (2× the font's cap height at base size).",
    colors: "Screen White wordmark on Cartridge Black. Mario Red border optional.",
    allowed_symbols: [
      "pixel sword or shield icon",
      "8-bit coin sprite",
      "pixel heart",
      "NES controller silhouette",
      "dungeon chest",
    ],
    forbidden_symbols: [
      "smooth curves or bezier shapes",
      "photographic elements",
      "drop shadows with blur",
      "gradients in the mark",
      "modern icon library symbols",
    ],
  },

  illustration_prompt_template:
    "{prefix} {subject}, in the Pixel Dungeon 8-bit style, {mood}, " +
    "pixel-art game scene {suffix}",

  page_generation_rules: [
    "Background is always Cartridge Black — every page starts in the dungeon.",
    "Hero sections use a pixelated game-scene illustration or Blip animation.",
    "CTA buttons are Mario Red, 0px radius, 2px drop shadow.",
    "Reveal content in 8px steps (no smooth scroll — stepped reveal).",
    "Maximum page width 1280px; content grid aligned to 8px columns.",
    "Every page must have at least one pixel-art sprite element (Blip, coin, heart).",
  ],

  prompt_library: {
    logo:
      "Design a Pixel Dungeon logo: Press Start 2P wordmark in Screen White on " +
      "Cartridge Black, 2px Mario Red rectangular border, 2px black drop shadow, " +
      "0px radius, no smooth gradients, optional pixel sword icon.",
    illustration:
      "{image_prompt_prefix} {subject} {image_prompt_suffix}",
    icon:
      "16×16 pixel art icon of {subject}, 4-color palette (black outline, dark fill, " +
      "mid fill, white highlight), no anti-aliasing, NES sprite style.",
    background:
      "Cartridge Black background with subtle 8×8 pixel tile pattern in #111111. " +
      "CRT scanline overlay (2px stripe, 5% black). No text. Tileable.",
    landing_page:
      "An 8-bit retro gaming media landing page: Cartridge Black background, " +
      "Press Start 2P headlines, pixel-art hero scene, Mario Red CTA button, " +
      "Screen Black card sections, Blip sprite running across the hero area.",
    dashboard:
      "A retro game HUD dashboard on Cartridge Black: Press Start 2P stat numerals " +
      "in Coin Yellow-Green, Screen Black cards with 2px borders, heart and coin " +
      "pixel sprites as stat icons, 2px drop shadows everywhere.",
    marketing:
      "A retro pixel-art social graphic for {topic}: Press Start 2P headline in " +
      "Screen White or Coin Yellow-Green, 8-bit illustration, Cartridge Black " +
      "background, NES game poster composition style.",
  },

  /* ==========================================================================
   * 17. DESIGN TOKENS
   * ========================================================================== */

  design_tokens: {
    color: {
      "--color-primary": "#E8001A",
      "--color-secondary": "#0055AA",
      "--color-tertiary": "#88BB00",
      "--color-bg": "#0A0A0A",
      "--color-surface": "#151515",
      "--color-surface-alt": "#1E1E1E",
      "--color-text": "#F5F5F0",
      "--color-neutral": "#666660",
      "--color-success": "#00AA44",
      "--color-warning": "#FFCC00",
      "--color-error": "#CC0000",
      "--color-info": "#5599FF",
      "--color-border": "#333333",
      "--color-focus": "#FFCC00",
    },
    spacing: {
      "--space-1": "4px",
      "--space-2": "8px",
      "--space-3": "16px",
      "--space-4": "24px",
      "--space-6": "32px",
      "--space-8": "48px",
      "--space-12": "64px",
      "--space-16": "96px",
      "--space-24": "128px",
    },
    radius: {
      "--radius-sm": "0px",
      "--radius-md": "0px",
      "--radius-lg": "0px",
      "--radius-xl": "0px",
      "--radius-pill": "0px",
    },
    typography: {
      "--font-headline": "'Press Start 2P', 'Courier New', monospace",
      "--font-display": "'Press Start 2P', 'Courier New', monospace",
      "--font-body": "'Silkscreen', 'Courier New', monospace",
      "--font-ui": "'Silkscreen', 'Courier New', monospace",
      "--font-mono": "'Press Start 2P', 'Courier New', monospace",
    },
    shadow: {
      "--shadow-sm": "2px 2px 0px rgba(0,0,0,1)",
      "--shadow-md": "3px 3px 0px rgba(0,0,0,1)",
      "--shadow-lg": "4px 4px 0px rgba(0,0,0,1)",
      "--shadow-pixel-red": "2px 2px 0px #CC0000",
      "--shadow-pixel-blue": "2px 2px 0px #003377",
      "--shadow-pixel-coin": "2px 2px 0px #558800",
    },
  },

  /* ==========================================================================
   * 18. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  responsive_behavior: {
    desktop:
      "Multi-column poster rails, 2px pixel drop shadows, full HUD-style sidebar, " +
      "max 1280px content width. All hover states active. CRT scanline overlay at 5%.",
    tablet:
      "2–3 column poster grids, enlarged touch targets (48px min), collapsible sidebar " +
      "to 48px icon rail. Reduce CRT overlay to 3% opacity for readability.",
    tv:
      "10-foot UI: Press Start 2P at 1.5× scale, 4px yellow focus border (not 2px), " +
      "D-pad navigation with blinking cursor, poster grids fill the Cartridge Black field. " +
      "Score display in corner at all times — the game never stops.",
    mobile:
      "Single column, bottom tab bar on Screen Black, full-width portrait posters. " +
      "Press = instant 2px shift (no hover). Tap to collect = coin animation. " +
      "No CRT overlay on mobile (performance). Steps() easing everywhere.",
  },

  /* ==========================================================================
   * 19. SOUND IDENTITY
   * ========================================================================== */

  sound_identity: {
    startup_chime:
      "A classic 8-bit power-on jingle — three ascending square-wave notes resolving " +
      "to a major chord, C-E-G, each 100ms. Clean, bright, instantly recognizable. " +
      "Evokes the moment the NES power LED turns red.",
    notification:
      "Single square-wave blip at 880Hz, 50ms — the classic NES menu-select sound. " +
      "Short, crisp, satisfying. No reverb.",
    ui_click:
      "NES cursor move sound — 220Hz square wave blip, 30ms. The sound of choosing " +
      "a menu option with the d-pad. Immediate.",
    success:
      "Classic coin-collect arpeggio — ascending C-E-G-C square wave, 40ms per note. " +
      "The most satisfying 160ms in gaming history.",
    error:
      "Low buzzer descending — two notes, G-D, square wave with a slight wobble " +
      "(vibrato), 100ms each. The classic 'you died' sound. Not alarming, just final.",
  },

  /* ==========================================================================
   * 20. SEASONAL VARIANTS
   * ========================================================================== */

  seasonal_variants: [
    {
      name: "Winter Dungeon",
      active_range: "12-15..01-05",
      overrides: {
        "--color-primary": "#5599FF",
        "--color-secondary": "#F5F5F0",
        "--color-tertiary": "#FFCC00",
      },
      motif:
        "Ice-cave tileset replaces dungeon-stone palette; snowflake pixel sprites " +
        "fall from the top of the hero area; Blip wears a tiny pixel scarf.",
    },
    {
      name: "Halloween Boss",
      active_range: "10-20..11-01",
      overrides: {
        "--color-primary": "#FF6600",
        "--color-secondary": "#660099",
        "--color-surface": "#0A0005",
      },
      motif:
        "Purple and orange Halloween palette; skull pixel sprites replace coins; " +
        "Blip wears a ghost sheet; tombstone icons mark the empty state.",
    },
    {
      name: "Spring Update",
      active_range: "03-21..04-30",
      overrides: {
        "--color-primary": "#E8001A",
        "--color-secondary": "#00AA44",
        "--color-tertiary": "#FFCC00",
      },
      motif:
        "Flower-field tileset; pixel butterflies cross the hero area; Blip runs " +
        "through tall grass — the overworld in springtime.",
    },
  ],

  /* ==========================================================================
   * 21. ACCESSIBILITY
   * ========================================================================== */

  accessibility: {
    minimum_contrast:
      "WCAG AA required (4.5:1 body text, 3:1 large/UI text). " +
      "Screen White (#F5F5F0) on Cartridge Black (#0A0A0A) = 18.8:1 — exceeds AAA. " +
      "Coin Yellow-Green (#88BB00) on Cartridge Black = 5.4:1 — passes AA. " +
      "Mario Red (#E8001A) on Cartridge Black = 4.1:1 — use only for large text/UI elements. " +
      "Verify Game Blue on dark surfaces — may need Screen White text overlay for body copy.",
    focus_style:
      "2px Select Yellow (#FFCC00) hard border, no border-radius, no blur, no offset. " +
      "The border blinks at 500ms intervals (steps(1)) like a game-selection cursor. " +
      "Must always be visible — never clipped by overflow:hidden.",
    touch_target: "Minimum 44×44px everywhere; 48×48px recommended for game-like tap targets.",
    motion_reduction:
      "Honor prefers-reduced-motion: disable Blip walking animation (show static sprite), " +
      "disable coin-collect particle animations, replace stepped-scroll with instant jump, " +
      "replace stepped-reveal transitions with single-frame cuts. " +
      "Retain only opacity fade-in for page-level transitions.",
    font_scaling:
      "Press Start 2P at 8px is the minimum — never smaller. At 200% zoom, layouts " +
      "must reflow to single column before horizontal overflow occurs. " +
      "Silkscreen degrades to Courier New if web font is unavailable — acceptable fallback.",
  },

  /* ==========================================================================
   * 22. DO / DON'T
   * ========================================================================== */

  do_dont: {
    colors: {
      do: [
        "Use Cartridge Black or Screen Black for every background",
        "Reserve Mario Red for the single primary CTA per screen",
        "Use Coin Yellow-Green only for rewards, scores, and achievements",
        "Keep the palette to 6 colors maximum in any one view",
      ],
      dont: [
        "Use warm, cream, or light backgrounds anywhere",
        "Apply Mario Red to more than one CTA per screen",
        "Introduce any color outside the defined brand palette",
        "Use smooth gradients — dither instead",
      ],
      reason:
        "The pixel-art identity depends on palette discipline. Unlimited color " +
        "immediately reads as 'modern' and destroys the 8-bit aesthetic. " +
        "Every pixel's color is a deliberate choice.",
    },
    typography: {
      do: [
        "Use Press Start 2P for all headlines, titles, and display text",
        "Use Silkscreen for body copy and UI labels where Press Start 2P is too wide",
        "Set line-height at 2.0 for Press Start 2P to ensure readability",
        "Keep all text in whole-pixel font sizes (8, 10, 12, 16, 24px)",
      ],
      dont: [
        "Use any sans-serif, serif, or modern typeface",
        "Use italic or oblique — Press Start 2P has no slant",
        "Set Press Start 2P at sizes below 8px",
        "Mix Press Start 2P with any non-monospace font",
      ],
      reason:
        "Press Start 2P IS the brand. Any other font breaks the pixel-art immersion " +
        "instantly — the typography is not decorative, it is foundational.",
    },
    layout: {
      do: [
        "Align everything to an 8px grid — no exceptions",
        "Use 0px border-radius everywhere",
        "Apply 2px hard drop shadows to all elevated elements",
        "Structure layouts like game screens: HUD top, content middle, controls bottom",
      ],
      dont: [
        "Use rounded corners anywhere in the layout",
        "Use blur-based shadows or elevation effects",
        "Allow elements to sit off the 8px grid",
        "Create dense, cluttered layouts — dungeon rooms have clear paths",
      ],
      reason:
        "The pixel grid is structural, not decorative. Off-grid elements and rounded " +
        "corners read as modern UI and destroy the cohesive game-screen illusion.",
    },
    animation: {
      do: [
        "Use steps() easing for all motion — quantized, never smooth",
        "Animate in 8px or 16px discrete increments",
        "Keep animations fast (100–300ms) and game-responsive",
        "Honor prefers-reduced-motion by removing all step animations",
      ],
      dont: [
        "Use ease, ease-in-out, or cubic-bezier curves",
        "Animate sub-pixel positions (fractional pixel movement)",
        "Use slow, cinematic transitions — this is a game, not a film",
        "Run infinite looping animations without a pause state",
      ],
      reason:
        "8-bit games move in integer pixel increments. Smooth bezier motion is the " +
        "single largest signal of 'modern UI' — steps() easing is non-negotiable.",
    },
    imagery: {
      do: [
        "Pixel-art filter (dither + indexed palette) all photography",
        "Apply CRT scanline overlay to all raster imagery",
        "Upscale low-res sprites with nearest-neighbor (no interpolation)",
        "Use pixel-art illustration for all decorative imagery",
      ],
      dont: [
        "Use unprocessed high-fidelity photography",
        "Use smooth SVG illustration styles",
        "Use 3D renders or photorealistic CGI",
        "Apply bilinear or bicubic scaling to pixel art (blurs the pixels)",
      ],
      reason:
        "Unprocessed modern photography or illustration breaks the 8-bit world instantly. " +
        "Every image must look like it belongs on a NES cartridge label.",
    },
    branding: {
      do: [
        "Keep the Press Start 2P wordmark on Cartridge Black always",
        "Use Blip (the mascot sprite) across all loading and empty states",
        "Maintain the limited-palette discipline across all brand touchpoints",
      ],
      dont: [
        "Place the wordmark on light or colorful backgrounds without approved treatment",
        "Modify Blip's sprite design or palette",
        "Introduce smooth, modern logo treatments for any sub-brand",
      ],
      reason:
        "Brand recognition comes from the combination of Press Start 2P + limited " +
        "palette + Blip sprite. Diluting any element dilutes the total identity.",
    },
    icons: {
      do: [
        "Use 16×16 or 32×32 pixel-art sprite icons",
        "Keep to 4 colors per icon: outline, shadow, fill, highlight",
        "Use game-metaphor icons: sword, shield, heart, coin, chest, key, scroll",
      ],
      dont: [
        "Use modern icon libraries (Heroicons, Lucide, Material Icons)",
        "Use stroke-based icons — pixel art is fill-based",
        "Anti-alias any icon at any size",
      ],
      reason:
        "Pixel-art icons at 16×16 are an entire art form. Modern icon sets look " +
        "completely alien in a pixel-art context — every icon must be purpose-drawn.",
    },
    copywriting: {
      do: [
        "Frame actions as game verbs: explore, collect, quest, level up",
        "Use 'GAME OVER' for errors, '1UP' for successes, 'CONTINUE?' for re-engagement",
        "Keep messages short — NES dialogue boxes fit ~20 characters per line",
        "Earn exclamation marks — save them for genuine achievement moments",
      ],
      dont: [
        "Use corporate or enterprise language",
        "Write long paragraphs — pixel UI has limited screen real estate",
        "Use modern tech vocabulary (leverage, ecosystem, scalable)",
        "Overuse exclamation marks — they lose power without restraint",
      ],
      reason:
        "The voice is an 8-bit game guide — encouraging, precise, game-flavored. " +
        "Corporate language breaks the playful register the entire brand depends on.",
    },
    ux: {
      do: [
        "Make the play action immediately visible on every media card (pixel play icon)",
        "Show progress as collectibles — coins, hearts, level bars",
        "Provide satisfying feedback on every action (sound + visual reward)",
        "Structure navigation like a game menu — clear levels of hierarchy",
      ],
      dont: [
        "Hide the primary action in a hover-only overlay on mobile",
        "Use abstract progress indicators — always use game-metaphor meters",
        "Skip the success/reward moment — every completion deserves a coin",
        "Allow the path from library to playback to exceed 2 taps",
      ],
      reason:
        "The pixel-dungeon product model is discovery → collection → completion. " +
        "Every UX pattern should reinforce the loop: explore, find, collect, play, reward.",
    },
    performance: {
      do: [
        "Pre-rasterize all pixel-art sprites at their target display sizes",
        "Use CSS box-shadow with 0 blur for pixel drop shadows — hardware-accelerated",
        "Implement the CRT scanline overlay as a single ::after CSS pseudo-element",
        "Lazy-load poster images with a Cartridge Black placeholder",
      ],
      dont: [
        "Use SVG filters for the CRT scanline effect — too slow on large surfaces",
        "Scale pixel-art sprites with the default bilinear browser interpolation",
        "Load full sprite sheet images where individual sprites suffice",
        "Block render on Press Start 2P font load — use font-display: swap with fallback",
      ],
      reason:
        "A lo-fi aesthetic should paradoxically feel snappy and instant — the pixel " +
        "game convention is zero loading time (everything fit on one cartridge). " +
        "The experience should feel as fast as pressing Start.",
    },
  },

  /* ==========================================================================
   * 23. METADATA
   * ========================================================================== */

  metadata: {
    author: "Phlix Design",
    created: "2026-06-30",
    updated: "2026-06-30",
    license: "Proprietary — Phlix internal use.",
    compatible_models: [
      "claude-opus-4-8",
      "claude-sonnet-4-6",
      "sdxl",
      "flux.1",
    ],
    schema_version: "2.0",
    kit_type: "base",
    notes:
      "Base/parent kit. Variations (e.g. 'Pixel Dungeon: Monochrome', " +
      "'Pixel Dungeon: Game Boy Green', 'Pixel Dungeon: Arcade Cabinet') " +
      "should reference this via base_kit.slug = 'pixel-dungeon' and override only " +
      "diverging fields. Press Start 2P font requires Google Fonts CDN or self-hosting. " +
      "Silkscreen font available via Google Fonts. All motion MUST use steps() easing — " +
      "this is enforced by brand principle, not just preference.",
  },
};

export default brandKit;
export { brandKit };
