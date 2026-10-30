/**
 * ============================================================================
 *  PHLIX BRAND KIT — cosmic-odyssey.js   (BASE kit)
 * ============================================================================
 *
 *  Name   : Cosmic Odyssey
 *  Slug   : cosmic-odyssey
 *  Theme  : Deep space exploration — vast nebulae in violet/magenta/indigo,
 *           distant star clusters, planetary rings, astronaut wonder.
 *           NASA golden-age posters meets modern astrophotography.
 *           Infinite deep space backgrounds, ethereal cosmic dust, star maps.
 *           Wondrous, expansive, curious, awe-inspiring.
 *
 *  Usage
 *  -----
 *      import brandKit from './cosmic-odyssey.js'
 *      import { brandKit } from './cosmic-odyssey.js'
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY
   * ========================================================================== */

  name: "Cosmic Odyssey",

  slug: "cosmic-odyssey",

  version: "1.0",

  description:
    "Cosmic Odyssey is an homage to the boundless wonder of deep space — " +
    "sweeping nebulae, ancient star fields, and the quiet awe of an astronaut " +
    "drifting against the infinite. Inspired by NASA's golden-age mission posters " +
    "and the saturated splendor of modern astrophotography, it brings a sense of " +
    "vast discovery to every frame of media on your server.",

  inspiration: [
    "NASA Voyager and Apollo mission posters (1960s–1980s)",
    "Hubble Space Telescope deep-field photography",
    "Carl Sagan's Cosmos television series",
    "Interstellar and 2001: A Space Odyssey production design",
    "Soviet space-age constructivist posters",
    "James Webb Space Telescope full-color imagery",
    "Vintage star-atlas cartography and celestial globes",
    "ESA and JAXA mission insignia design",
  ],

  keywords: [
    "deep space", "nebula", "violet", "magenta", "indigo", "stardust",
    "cosmic", "astronaut", "galaxy", "infinite", "awe-inspiring", "wonder",
    "astrophotography", "planetary", "stellar", "exploration", "odyssey",
    "mission", "orbit", "zero-gravity", "luminous", "ethereal", "expansive",
    "dark-background", "glow", "constellation", "warp", "spectrum",
    "cosmic-dust", "golden-age-poster", "star-map", "probe", "telescope",
    "futuristic", "scientific", "cinematic", "immersive", "mysterious",
    "interstellar", "void", "aurora", "pulsar", "supernova", "horizon",
  ],

  /* ==========================================================================
   * 2. PERSONALITY
   * ========================================================================== */

  personality: ["Wondrous", "Expansive", "Curious", "Awe-inspiring", "Serene", "Bold"],

  emotional_goals: ["Wonder", "Awe", "Curiosity", "Inspiration", "Tranquility"],

  archetype: "Explorer",

  audience: [
    "Science fiction enthusiasts",
    "Space and astronomy fans",
    "Cinephiles seeking epic scale",
    "Documentary streamers",
    "Gamers and techies",
    "Late-night ambient viewers",
  ],

  /* ==========================================================================
   * 3. BRAND STORY
   * ========================================================================== */

  story:
    "Before the first frame of footage ever played on a screen, humans had " +
    "already been projecting stories onto the night sky — drawing bears and " +
    "hunters and rivers of stars. Cosmic Odyssey is the heir to that oldest " +
    "tradition. It was conceived in the image-processing labs of orbital " +
    "telescopes, in the quiet hum of mission control, and in the breathless " +
    "silence of an astronaut watching the Earth rise. Every library you browse " +
    "is a sector of the galaxy to explore; every film is a new system to visit. " +
    "Phlix is your deep-space vessel — and the odyssey never ends.",

  tagline_primary: "Every Story, An Infinite Horizon.",

  tagline_secondary: [
    "Launch into your next watch.",
    "The universe of film, at your command.",
    "Your library. Your cosmos.",
    "Set course for something extraordinary.",
  ],

  mission:
    "Make every viewing session feel like a launch into the infinite — " +
    "expansive, wondrous, and impossible to resist.",

  values: ["Discovery", "Wonder", "Depth", "Clarity", "Exploration"],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES
   * ========================================================================== */

  brand_dna:
    "Cosmic Odyssey is the stillness of deep space made tangible — " +
    "deep obsidian backgrounds, nebula violets and cosmic magentas, " +
    "stardust gold highlights, and an astronaut's sense of limitless possibility. " +
    "It is never crowded, never harsh, and never earthbound.",

  design_principles: [
    "Every screen is a viewport into the infinite — keep it open and breathable.",
    "Dark backgrounds dominate; color exists as luminous light, never flat paint.",
    "Typography is crisp and legible against deep space — clarity above flourish.",
    "Use glow and bloom deliberately; a single light source per composition.",
    "Motion should feel like orbital mechanics — smooth, purposeful, weightless.",
    "Never crowd the void; negative space IS the design in deep space.",
    "Gold and magenta are precious — reserve them for the most important moments.",
  ],

  brand_opposites: [
    "Not warm or earthy",
    "Not cluttered or busy",
    "Not retro-cozy or nostalgic-domestic",
    "Not neon cyberpunk (glows are astral, not synthetic)",
    "Not cartoonish or whimsical",
    "Not corporate flat-minimal",
    "Not primary-color children's aesthetic",
  ],

  signature_elements: [
    "Star fields and nebula clouds",
    "Planetary rings and orbital arcs",
    "Astronaut silhouettes",
    "Star-atlas grid lines and celestial coordinates",
    "Lens-flare starburst from distant suns",
    "Glowing cosmic dust trails",
    "Mission patch / badge insignia",
  ],

  header_motif: "Slow parallax star field with drifting nebula wisps",

  /* ==========================================================================
   * 5. VISUAL IDENTITY
   * ========================================================================== */

  visual_style: [
    "Astrophotography-meets-poster art",
    "Luminous glow on deep black",
    "Painterly cosmic dust and gas clouds",
    "Scientific illustration linework",
    "Muted metallic surfaces",
  ],

  art_direction:
    "All artwork sits against a deep space void — near-black with faint blue-indigo " +
    "undertones. Nebulae bloom across the canvas in soft violet and magenta watercolor " +
    "washes, their edges dissolving into stardust gold motes. Key subjects — an " +
    "astronaut, a planet, a spacecraft — are lit by a single distant star: cool " +
    "blue-white illumination on the near side, deep shadow beyond. Compositions use " +
    "the scale of the cosmos deliberately: a tiny human figure against an immense " +
    "nebula says more than any text. Line art references 1960s NASA technical " +
    "illustration — precise, clean, with hairline celestial-grid overlays. " +
    "Avoid: warm tones, paper textures, lush greenery, busy textures, and anything " +
    "that anchors the viewer to a terrestrial environment.",

  realism: "semi_realistic",

  rendering_style: ["digital painting", "watercolor", "vector", "cel shading"],

  texture_level: "subtle",

  depth: "layered",

  lighting: {
    temperature: "cool",
    quality: "stellar — hard-edged on lit surfaces, absolute black in shadows",
    shadows: "hard",
    contrast: "high",
    notes:
      "Light sources are always distant stars or nebula cores. " +
      "Rim lighting in icy blue-white; ambient fill only from nebula glow. " +
      "No warm artificial light; no golden hour; no diffuse studio lighting.",
  },

  composition: [
    "Vast negative space — subjects occupy no more than one-third of frame",
    "Asymmetric balance: large void offset by a concentrated cluster of light",
    "Vertical depth layers: foreground stars, mid-ground subject, background nebula",
    "Horizon lines placed at extreme top or bottom thirds",
    "Single strong light source creates a clear luminous focal point",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM
   * ========================================================================== */

  colors: {
    primary: {
      name: "Nebula Violet",
      hex: "#7B3FBE",
      rgb: "rgb(123, 63, 190)",
      hsl: "hsl(272, 50%, 50%)",
      usage: "Primary CTAs, active states, highlight rings, primary badges.",
      contrast_targets: ["space_black", "star_white"],
    },
    secondary: {
      name: "Cosmic Magenta",
      hex: "#C0399A",
      rgb: "rgb(192, 57, 154)",
      hsl: "hsl(316, 54%, 49%)",
      usage: "Secondary actions, hover states, gradient anchors, featured labels.",
      contrast_targets: ["space_black", "star_white"],
    },
    tertiary: {
      name: "Stardust Gold",
      hex: "#E8C44A",
      rgb: "rgb(232, 196, 74)",
      hsl: "hsl(46, 77%, 60%)",
      usage: "Ratings, star indicators, mission-critical accents, key data points.",
      contrast_targets: ["space_black"],
    },
    neutral: {
      name: "Stellar Blue",
      hex: "#3A7FBF",
      rgb: "rgb(58, 127, 191)",
      hsl: "hsl(210, 54%, 49%)",
      usage:
        "Muted informational chrome, inactive UI controls, hyperlinks, subtle dividers.",
      contrast_targets: ["space_black"],
    },
    background: {
      name: "Deep Space Black",
      hex: "#080B14",
      rgb: "rgb(8, 11, 20)",
      hsl: "hsl(226, 43%, 6%)",
      usage:
        "Default page background. The void — always the darkest surface, with " +
        "barely perceptible blue-indigo undertone.",
      contrast_targets: ["star_white", "nebula_violet", "stardust_gold"],
    },
    surface: {
      name: "Void Panel",
      hex: "#111827",
      rgb: "rgb(17, 24, 39)",
      hsl: "hsl(222, 39%, 11%)",
      usage:
        "Card and panel surfaces — one luminous step lighter than background.",
      contrast_targets: ["star_white"],
    },
    surface_alt: {
      name: "Nebula Haze",
      hex: "#1E2640",
      rgb: "rgb(30, 38, 64)",
      hsl: "hsl(226, 36%, 18%)",
      usage:
        "Alternate surface for hover rows, nested panels, selected states.",
      contrast_targets: ["star_white"],
    },
    text: {
      name: "Star White",
      hex: "#E8EAF0",
      rgb: "rgb(232, 234, 240)",
      hsl: "hsl(228, 22%, 93%)",
      usage: "Primary body and headline text; must remain legible against all dark surfaces.",
      contrast_targets: ["space_black", "surface", "surface_alt"],
    },
    success: {
      name: "Aurora Green",
      hex: "#34D399",
      rgb: "rgb(52, 211, 153)",
      hsl: "hsl(160, 64%, 52%)",
      usage: "Success toasts, confirmed states, active orbital status.",
      contrast_targets: ["space_black"],
    },
    warning: {
      name: "Solar Flare",
      hex: "#FBBF24",
      rgb: "rgb(251, 191, 36)",
      hsl: "hsl(43, 96%, 56%)",
      usage: "Caution states, buffering indicators, threshold alerts.",
      contrast_targets: ["space_black"],
    },
    error: {
      name: "Red Dwarf",
      hex: "#EF4444",
      rgb: "rgb(239, 68, 68)",
      hsl: "hsl(0, 84%, 60%)",
      usage: "Error states, destructive actions, failed-scan indicators.",
      contrast_targets: ["space_black", "star_white"],
    },
    info: {
      name: "Pulsar Blue",
      hex: "#60A5FA",
      rgb: "rgb(96, 165, 250)",
      hsl: "hsl(213, 94%, 68%)",
      usage: "Informational banners, tooltip accents, scan-progress bars.",
      contrast_targets: ["space_black"],
    },
    focus: {
      name: "Cosmic Focus Ring",
      hex: "#A78BFA",
      rgb: "rgb(167, 139, 250)",
      hsl: "hsl(254, 92%, 76%)",
      usage: "Keyboard-focus ring — violet-spectrum glow with 2px offset on deep background.",
      contrast_targets: ["space_black", "surface"],
    },
    border: {
      name: "Constellation Line",
      hex: "#2D3A5E",
      rgb: "rgb(45, 58, 94)",
      hsl: "hsl(224, 35%, 27%)",
      usage:
        "Hairline card and panel borders — the faint grid lines of a star atlas.",
      contrast_targets: ["surface"],
    },
    shadow: {
      name: "Void Shadow",
      hex: "#000714",
      rgb: "rgba(0, 7, 20, 0.60)",
      hsl: "hsl(222, 100%, 4%)",
      usage: "Deep, cool-tinted drop shadows — the absolute absence of starlight.",
      contrast_targets: [],
    },
    overlay: {
      name: "Event Horizon",
      hex: "#000714",
      rgb: "rgba(0, 7, 20, 0.75)",
      hsl: "hsl(222, 100%, 4%)",
      usage: "Modal/scrim overlays — deep space absorbed, never warm.",
      contrast_targets: [],
    },
    gradients: [
      {
        name: "Nebula Bloom",
        type: "radial",
        angle: null,
        stops: ["#7B3FBE", "#C0399A", "#080B14"],
        usage:
          "Hero backdrops, onboarding screens, splash pages — the burst of a " +
          "nebula at its most luminous core.",
      },
      {
        name: "Starfield Sweep",
        type: "linear",
        angle: "135deg",
        stops: ["#080B14", "#111827", "#1E2640"],
        usage: "Subtle page background gradient to give the void gentle depth.",
      },
      {
        name: "Stardust Trail",
        type: "linear",
        angle: "90deg",
        stops: ["#E8C44A", "#C0399A"],
        usage:
          "Accent bars, progress fills, active-state underlines — the arc of a " +
          "meteor burning across the palette.",
      },
      {
        name: "Aurora Curtain",
        type: "linear",
        angle: "180deg",
        stops: ["#34D399", "#3A7FBF", "#7B3FBE"],
        usage: "Success banners, seasonal aurora effects.",
      },
    ],
  },

  color_rules: [
    "Backgrounds are always near-black with cool blue-indigo undertones — never warm.",
    "Color appears as luminous light emerging from darkness, never as opaque flat paint.",
    "Never use more than two accent hues in a single composition.",
    "Stardust Gold is precious — use it only for the single most important element per view.",
    "Shadows and overlays are deep space cool — never warm brown or grey.",
    "Ensure all text achieves WCAG AA against its dark background surface.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  fonts: {
    headline: {
      family: "Orbitron",
      weight: [700, 900],
      fallbacks: ["Exo 2", "Rajdhani", "sans-serif"],
      usage:
        "Mission-critical hero headlines, section titles, splash text. " +
        "The geometric precision of mission insignia.",
      tracking: "0.08em",
      line_height: 1.05,
    },
    display: {
      family: "Exo 2",
      weight: [300, 400],
      fallbacks: ["Orbitron", "Rajdhani", "sans-serif"],
      usage:
        "Oversized display stats, enormous background watermark text, " +
        "cinematic title cards with ultra-wide spacing.",
      tracking: "0.18em",
      line_height: 0.92,
    },
    body: {
      family: "Inter",
      weight: [400, 500],
      fallbacks: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
      usage:
        "All paragraph and descriptive text — maximum legibility against " +
        "the deep space backdrop.",
      tracking: "0.01em",
      line_height: 1.7,
    },
    ui: {
      family: "Rajdhani",
      weight: [400, 500, 600],
      fallbacks: ["Exo 2", "system-ui", "sans-serif"],
      usage:
        "Buttons, navigation labels, chips, badges, table headers — " +
        "technical yet approachable; reads fast at small sizes.",
      tracking: "0.05em",
      line_height: 1.25,
    },
    mono: {
      family: "Space Mono",
      weight: [400, 700],
      fallbacks: ["JetBrains Mono", "Courier New", "monospace"],
      usage:
        "Code blocks, coordinate readouts, technical metadata, countdown timers.",
      tracking: "0.03em",
      line_height: 1.6,
    },
    number: {
      family: "Orbitron",
      weight: [400, 700],
      fallbacks: ["Exo 2", "sans-serif"],
      usage:
        "Dashboard statistics, media counts, runtimes, progress percentages — " +
        "numbers that read like mission telemetry.",
      tracking: "0.04em",
      line_height: 1.0,
    },
  },

  typography_rules: [
    "Headlines in Orbitron; never use it for body or labels longer than 6 words.",
    "All-caps is encouraged for mission-style short labels in Rajdhani.",
    "Body copy maximum 65 characters per line for readability on dark screens.",
    "Avoid italic for headlines — use weight and tracking instead.",
    "Let Star White text breathe against the dark void; never use low-contrast grey.",
    "Display text may go ultra-wide tracking (0.2em+) only at headline sizes.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  shape_language: [
    "Rectangular with sharp or subtly clipped corners (mission-badge aesthetic)",
    "Orbital arcs and ellipses",
    "Hexagonal mission-patch outlines",
    "Thin hairline circles (celestial grid references)",
    "Star / starburst eight-point burst",
  ],

  corner_radius: {
    small: "4px",
    medium: "8px",
    large: "16px",
    xl: "24px",
    pill: "999px",
  },

  borders: {
    thickness: "1px",
    style: "solid",
    rounded: true,
    hand_drawn: false,
    notes:
      "Borders are precision hairlines in constellation-line blue — clean, " +
      "technical, like the grids on a star atlas. Double-rule only for " +
      "featured mission-badge frames.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  icon_style: ["Outlined", "Duotone", "Filled", "Rounded"],

  icon_rules: [
    "1.5px stroke weight — precise but not hairline-fragile.",
    "Rounded caps; joins may be sharp at 90° for technical/scientific feel.",
    "Single violet or gold fill for featured/status icons.",
    "Duotone: dark surface fill + violet or gold stroke for primary actions.",
    "Never use decorative texture inside icons — keep them map-precise.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  illustration_style: [
    "NASA golden-age mission poster",
    "Scientific astronomy illustration",
    "Painterly astrophotography composite",
    "Soviet constructivist space-age poster (restrained, not propagandist)",
  ],

  character_style: {
    proportions:
      "Heroic but grounded — realistic proportions with a slight poster-art " +
      "idealization. No exaggerated cartoon heads.",
    eyes: "Partially obscured by visors or silhouette — the person is dwarfed by the cosmos.",
    expressions:
      "Wonder, quiet determination, serene contemplation. Never cartoonish glee.",
    clothing:
      "Space suits, flight jackets, observatory attire — always mission-ready.",
    outlines:
      "Clean 1px vector lines or softly painted edges dissolving into the void. " +
      "No thick ink borders.",
  },

  mascot: {
    name: "Vela",
    species: "Cosmic AI navigator — an astronaut silhouette with a star-map visor",
    personality:
      "Quiet, knowledgeable, and awestruck — a seasoned explorer who still gasps " +
      "at every new nebula.",
    description:
      "A slender astronaut figure in a white EVA suit, helmet replaced by a " +
      "transparent dome through which a miniature star field is visible. " +
      "A stardust-gold mission patch on the left shoulder reads 'PHLIX'. " +
      "The suit's edges glow faintly violet from nearby nebula light.",
    poses: [
      "Floating in zero-g, arms extended toward a distant galaxy",
      "Studying a holographic star map",
      "Planting a Phlix flag on an alien planetoid",
      "Sitting on a crater rim, watching the stars",
    ],
    expressions: ["Wonder", "Focus", "Serenity", "Triumphant"],

    behavior: {
      placement:
        "Bottom-right corner as a small floating figure; appears on Home, Download, " +
        "and About pages — never on the docs or technical reference pages.",
      idle:
        "Vela floats gently in zero-g orbit, helmet tilt alternating side-to-side " +
        "as if scanning the stars. The visor's star-map briefly pulses violet. " +
        "Idle motion is disabled under prefers-reduced-motion (Vela simply drifts).",
      tips: [
        { where: "home:#hero",              say: "Signal acquired. Set course for your next discovery." },
        { where: "home:.features-overview", say: "Every orbit holds a different treasure — SyncPlay keeps everyone on the same trajectory." },
        { where: "download:#server",        say: "Launch sequence initiated. One line and you're the mission commander." },
        { where: "about:.faq-list",         say: "Transmission log: answers to the questions we receive from the void." },
      ],
      easter_interactions: [
        { trigger: "click:7",       react: "Vela extends an arm and traces a constellation in the air, then salutes." },
        { trigger: "hover-hold:3s", react: "Vela's visor flares with a brilliant star-map glow and a soft chime resonates." },
      ],
      dismiss:
        "A small 'Vela, return to base' close button tuchs Vela back into the star map; " +
        "the dismissed state persists via localStorage so Vela stays docked.",
    },
  },

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  photography_style: [
    "Long-exposure astrophotography",
    "NASA press-release image processing",
    "Dark high-contrast with color-graded nebula hues",
    "Silhouette subjects against luminous cosmic backgrounds",
  ],

  photo_rules: [
    "Always photograph against dark or night-sky backgrounds.",
    "Cool colour grading — deep blue or violet shadows, no warm amber.",
    "High contrast: subjects crisp against the void.",
    "Avoid lens flares from artificial sources; only natural stellar diffraction spikes.",
    "Human subjects should be small against vast backgrounds — emphasize scale.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  motion_style: ["Slow", "Weightless", "Orbital", "Purposeful"],

  transitions: [
    "Warp-speed zoom (brief, contained)",
    "Cross-fade through void black",
    "Slow parallax drift",
    "Star-trail sweep wipe",
    "Fade from absolute black",
  ],

  animation_speed: "slow",

  easing: ["cubic-bezier(0.22, 0.61, 0.36, 1)", "ease-out", "linear (for star drift)"],

  microinteractions: {
    hover:
      "Cards gain a soft violet-glow border and lift 3px with a deep void shadow. " +
      "Subtle star-particle emission at the card edge.",
    button_press:
      "Brief brighten flash (opacity 1→0.85→1 over 120ms) like a star pulse.",
    loading:
      "Slow rotating constellation ring loader in stardust gold, " +
      "with a counter in Space Mono beneath it.",
    drag:
      "Item trails a faint stardust-gold ghost at 60% opacity — meteor-like.",
    focus:
      "Violet focus ring pulses in softly at 150ms — a distant pulsar's rhythm.",
    success:
      "Starburst gold expansion animation from center, then settle to aurora check.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  ui_style: [
    "Deep space dark mode — exclusively dark backgrounds",
    "Luminous violet and gold accents on void panels",
    "Mission-control precision — clean grid, clear hierarchy",
    "Star-atlas hairline dividers",
    "Glow-on-hover elevated cards",
  ],

  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],

  shadows: {
    sm: "0 1px 3px rgba(0, 7, 20, 0.60)",
    md: "0 4px 14px rgba(0, 7, 20, 0.70), 0 0 8px rgba(123, 63, 190, 0.10)",
    lg:
      "0 12px 32px rgba(0, 7, 20, 0.80), 0 0 20px rgba(123, 63, 190, 0.18)",
    notes:
      "Shadows are deep, cool, near-black — the void behind the panel. " +
      "Larger shadows carry a faint violet ambient bloom from nebula glow.",
  },

  cards: {
    elevation: "md",
    padding: "24px",
    border_radius: "8px",
    border: "1px solid #2D3A5E",
    background: "#111827",
    notes:
      "Void-panel surface with constellation-line border. " +
      "On hover, border transitions to nebula-violet glow (box-shadow 0 0 12px #7B3FBE40).",
  },

  buttons: {
    primary: {
      bg: "#7B3FBE",
      text: "#E8EAF0",
      radius: "8px",
      notes: "Nebula violet fill, rounded mission-badge corners.",
    },
    secondary: {
      bg: "transparent",
      text: "#A78BFA",
      radius: "8px",
      notes: "1px violet border, no fill — the ghost of a star.",
    },
    danger: {
      bg: "#EF4444",
      text: "#E8EAF0",
      radius: "8px",
      notes: "Red dwarf — destructive actions only, never decorative.",
    },
    ghost: {
      bg: "transparent",
      text: "#E8EAF0",
      radius: "8px",
      notes: "1px constellation-line border, star-white text.",
    },
    link: {
      bg: "transparent",
      text: "#60A5FA",
      radius: "0",
      notes: "Pulsar blue underline on hover.",
    },
    icon: {
      bg: "#1E2640",
      text: "#E8EAF0",
      radius: "8px",
      notes: "Nebula-haze surface, subtle border, no label.",
    },
    fab: {
      bg: "#7B3FBE",
      text: "#E8EAF0",
      radius: "999px",
      notes:
        "Floating action — pill shape for the single most important action; " +
        "carries a violet glow shadow.",
    },
  },

  forms: {
    inputs:
      "Void-panel fill (#111827), 1px constellation-line border, 8px radius, " +
      "generous 14px padding. Focus state: violet glow ring.",
    checkboxes:
      "Square with 4px radius; checked = nebula-violet fill + star-white checkmark.",
    switches:
      "Pill track in surface_alt; thumb is star-white; active = violet track.",
    dropdowns:
      "Void-panel dropdown, constellation-line border, subtle violet hover rows.",
    validation:
      "Inline copy beneath the field; error = red-dwarf; success = aurora green.",
  },

  tables: {
    headers:
      "Rajdhani 600 all-caps on surface_alt, constellation-line bottom border.",
    hover: "Row tints to nebula-haze (#1E2640) on hover.",
    sorting: "Stardust-gold sort chevron, transitions smoothly on click.",
    striping: "Even rows on surface (#111827); odd on surface_alt (#1E2640).",
  },

  navigation: {
    sidebar:
      "Void-panel sidebar, constellation-line right border. Active item: " +
      "violet-left-bar + nebula-haze background fill. Icon + label in Rajdhani.",
    topbar:
      "Deep space black bar with a hairline constellation border at the bottom; " +
      "Phlix wordmark in Orbitron + a faint starfield pixel pattern behind it.",
    tabs:
      "Ghost tabs by default; active tab gains a stardust-gold underline and " +
      "star-white text.",
    breadcrumbs:
      "Small Rajdhani crumbs separated by a starburst › glyph in stellar-blue.",
  },

  dashboard_style:
    "Void-background grid of void-panel cards. Large Orbitron telemetry numerals " +
    "in stardust gold for key metrics. Constellation-line dividers, minimal chrome. " +
    "A faint nebula-bloom radial gradient anchors the hero metric. " +
    "Calm, scientific, never cluttered.",

  component_styles: {
    dialog:
      "Centered void-panel modal, event-horizon scrim, constellation-line border, " +
      "subtle violet glow at top edge. Orbitron title, Inter body.",
    sidebar:
      "See navigation.sidebar; collapses to 56px icon rail with Rajdhani tooltips.",
    carousel:
      "Poster rail with star-field parallax scroll; orbital arc decorative element " +
      "above the active card.",
    search_bar:
      "Pill input (#111827 fill, 1px violet border on focus), magnifier icon in " +
      "stellar-blue, placeholder 'Search the cosmos…'",
    media_player:
      "Full-bleed void control bar fades in; stardust-gold scrubber; " +
      "constellation-line chapter markers; Rajdhani time display in Space Mono.",
    toast:
      "Void-panel pill sliding up from bottom, constellation-line border, " +
      "left-accent bar in success/warning/error color, Rajdhani text.",
    chip:
      "Void-panel chip with 1px constellation-line border and Rajdhani label; " +
      "active/selected chips glow violet.",
  },

  layout_patterns: {
    dashboard:
      "Sparse hero metric banner → 3-up telemetry stat cards → activity rail " +
      "with poster thumbnails. Maximum 1440px content. Stars behind everything.",
    settings:
      "Left section nav (icon + label) + right form panels, max 800px content width.",
    media_library:
      "Sticky dark filter bar → responsive poster grid with void-panel cards " +
      "and stardust-gold rating badges.",
    authentication:
      "Centered void-panel card on a full-bleed nebula-bloom background. " +
      "Vela mascot silhouette bottom-right.",
    landing:
      "Full-bleed parallax star field hero with Orbitron headline + CTA pill → " +
      "feature cards on nebula-haze → mission-patch social proof → violet CTA footer.",
    detail_view:
      "Full-bleed space backdrop (low opacity) → poster + metadata left panel → " +
      "episodes/related rails on void panels.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY
   * ========================================================================== */

  poster_style:
    "Mission-poster aesthetic: Orbitron title in star-white or stardust-gold, " +
    "painted key art against deep space, thin constellation-line border, " +
    "subtle nebula bloom in the corners, 8px radius.",

  thumbnail_style:
    "8px radius, 1px constellation-line border, cool color grade, " +
    "Rajdhani title overlay with event-horizon scrim beneath.",

  backdrop_style:
    "Wide cinematic still, cool blue-violet grade, deep vignette at all edges, " +
    "very slight nebula bloom in one corner for depth. Never warm-graded.",

  media_cards:
    "Void-panel card: poster on top, Rajdhani title + year below, hover lifts " +
    "with violet-glow border and reveals a stardust-gold play pill.",

  badges: {
    labels: ["4K", "HDR", "Dolby Vision", "Continue Watching", "New", "Favorite", "Trending"],
    shape: "Rectangular pill, 4px radius, 1px constellation-line border.",
    colors:
      "Stardust Gold for quality marks (4K/HDR/Dolby); Nebula Violet for " +
      "status (New/Trending); Cosmic Magenta for personal (Favorite).",
    typography: "Rajdhani 600, all-caps, small size (10–11px).",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  voice: ["Wondrous", "Precise", "Inspiring", "Quietly epic"],

  tone: ["Contemplative", "Encouraging", "Scientific yet accessible", "Awe-struck"],

  writing_style:
    "Short, declarative sentences with the weight of mission briefings — " +
    "clear, purposeful, never chatty. Occasional cosmic metaphors (orbit, " +
    "horizon, launch, signal, navigation). Avoid breathless hyperbole; " +
    "let the scale of the cosmos speak for itself.",

  vocabulary: [
    "launch", "orbit", "signal", "navigate", "explore", "horizon",
    "coordinates", "mission", "transmission", "sector", "discovery", "vector",
  ],

  avoid_words: [
    "synergy", "leverage", "robust", "seamless", "game-changer",
    "disruptive", "cozy", "warm", "cute", "jolly",
  ],

  greetings: [
    "Mission ready. Where are we exploring tonight?",
    "Signal acquired. Your library awaits.",
    "Coordinates locked. Let's launch.",
  ],

  empty_state_messages: [
    "Nothing in this sector — yet. Add media to begin the mission.",
    "The void stretches out. Your library is ready to fill it.",
    "No transmissions detected. Import your first file to make contact.",
  ],

  notification_style:
    "Mission-briefing tone — clear, concise, never dramatic. " +
    "Alerts are status reports, not alarms. Successes are quiet triumphs.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE
   * ========================================================================== */

  image_prompt_prefix:
    "Deep space astrophotography-illustration hybrid, dark near-black background " +
    "with faint blue-indigo undertone, soft violet and magenta nebula clouds, " +
    "stardust-gold motes, NASA golden-age poster style, cool stellar lighting,",

  image_prompt_suffix:
    ", cohesive cosmic palette (nebula violet #7B3FBE, cosmic magenta #C0399A, " +
    "stardust gold #E8C44A, deep space black #080B14), crisp technical linework " +
    "overlays, high contrast, cinematic scale, 4K resolution.",

  negative_prompt: [
    "warm tones", "golden hour", "earthy browns", "paper textures",
    "neon cyberpunk", "cartoon", "chibi", "pastel", "white background",
    "busy clutter", "warm artificial light", "horror", "gore",
    "tropical", "lush greenery",
  ],

  ui_generation_rules: [
    "Background is always deep space black (#080B14) or void panel (#111827).",
    "All accent color appears as luminous glow, not flat paint.",
    "Primary CTA is always nebula violet (#7B3FBE).",
    "Stardust gold (#E8C44A) reserved for the single most important element per view.",
    "Use spacing scale; maintain vast negative space.",
    "Maximum content width 1440px; narrower (760px) for reading layouts.",
    "All text must pass WCAG AA against its dark surface.",
    "Never add warm gradients or amber/orange tones.",
  ],

  logo_rules: {
    shape:
      "Orbitron wordmark 'PHLIX' — optionally inside a hexagonal mission-patch " +
      "border or a circular orbital arc badge.",
    complexity: "Simple; the wordmark must be legible at 24px height.",
    negative_space: "Generous isolation zone = 1× cap height on all sides.",
    colors:
      "Star-white on deep-space-black; or nebula-violet on deep-space-black; " +
      "or stardust-gold for special editions.",
    allowed_symbols: [
      "orbital arc",
      "star cluster dots",
      "mission-patch hexagon",
      "astronaut silhouette",
    ],
    forbidden_symbols: [
      "play-button triangle in isolation",
      "film reel",
      "warm-color elements",
      "gears or circuits",
    ],
  },

  illustration_prompt_template:
    "{prefix} {subject}, in the Cosmic Odyssey style, {mood}, set against " +
    "the infinite deep space void with a distant nebula for context {suffix}",

  page_generation_rules: [
    "Hero sections always contain a full-bleed parallax starfield or nebula illustration.",
    "Cards are void-panel dark with constellation-line borders and violet glow on hover.",
    "CTA buttons are nebula-violet with rounded mission-badge corners.",
    "Maximum page width 1440px; 64px horizontal padding on desktop.",
    "Every page has a single primary luminous focal point — never scatter the light.",
    "Negative space is as important as content — the void is part of the design.",
  ],

  prompt_library: {
    logo:
      "Design a Cosmic Odyssey logo for Phlix: Orbitron wordmark in star-white " +
      "on deep-space-black, optional hexagonal mission-patch border in stardust-gold, " +
      "minimal, precise, legible at small sizes. No warm colors.",
    illustration:
      "{image_prompt_prefix} {subject} {image_prompt_suffix}",
    icon:
      "Outlined precision icon of {subject}, 1.5px stroke, single star-white or " +
      "nebula-violet color, rounded caps, technically clean, cosmic context.",
    background:
      "Deep space black background (#080B14) with a faint violet-magenta nebula " +
      "bloom in one corner, scattered star motes, subtle grid overlay — " +
      "no warm tones, no neon.",
    landing_page:
      "A cosmic media-server landing page: full-bleed parallax star field hero, " +
      "Orbitron headline in star-white, nebula-violet CTA, void-panel feature " +
      "cards, stardust-gold accent badges, vast dark negative space.",
    dashboard:
      "A mission-control media dashboard on deep-space-black: Orbitron telemetry " +
      "numerals in stardust-gold, void-panel stat cards, constellation-line dividers, " +
      "violet glow on active elements.",
    marketing:
      "A NASA golden-age mission-poster social graphic for {topic}: Orbitron " +
      "headline in star-white on deep-space-black, painted nebula key art, " +
      "stardust-gold mission-badge border, cinematic and awe-inspiring.",
  },

  /* ==========================================================================
   * 17. DESIGN TOKENS
   * ========================================================================== */

  design_tokens: {
    color: {
      "--color-primary":      "#7B3FBE",
      "--color-secondary":    "#C0399A",
      "--color-tertiary":     "#E8C44A",
      "--color-neutral":      "#3A7FBF",
      "--color-bg":           "#080B14",
      "--color-surface":      "#111827",
      "--color-surface-alt":  "#1E2640",
      "--color-text":         "#E8EAF0",
      "--color-success":      "#34D399",
      "--color-warning":      "#FBBF24",
      "--color-error":        "#EF4444",
      "--color-info":         "#60A5FA",
      "--color-focus":        "#A78BFA",
      "--color-border":       "#2D3A5E",
    },
    spacing: {
      "--space-1":  "4px",
      "--space-2":  "8px",
      "--space-3":  "12px",
      "--space-4":  "16px",
      "--space-6":  "24px",
      "--space-8":  "32px",
      "--space-12": "48px",
      "--space-16": "64px",
      "--space-24": "96px",
    },
    radius: {
      "--radius-sm":   "4px",
      "--radius-md":   "8px",
      "--radius-lg":   "16px",
      "--radius-xl":   "24px",
      "--radius-pill": "999px",
    },
    typography: {
      "--font-headline": "'Orbitron', 'Exo 2', sans-serif",
      "--font-display":  "'Exo 2', 'Orbitron', sans-serif",
      "--font-body":     "'Inter', 'Segoe UI', sans-serif",
      "--font-ui":       "'Rajdhani', 'Exo 2', sans-serif",
      "--font-mono":     "'Space Mono', 'JetBrains Mono', monospace",
    },
    shadow: {
      "--shadow-sm": "0 1px 3px rgba(0,7,20,0.60)",
      "--shadow-md": "0 4px 14px rgba(0,7,20,0.70), 0 0 8px rgba(123,63,190,0.10)",
      "--shadow-lg": "0 12px 32px rgba(0,7,20,0.80), 0 0 20px rgba(123,63,190,0.18)",
    },
  },

  /* ==========================================================================
   * 18. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  responsive_behavior: {
    desktop:
      "Multi-column poster rails, hover glow affordances, max 1440px content. " +
      "Sidebar visible; breadcrumbs prominent.",
    tablet:
      "2–3 column grids, larger 48px touch targets, collapsible sidebar to icon rail. " +
      "Constellation-line dividers replace full sidebar.",
    tv:
      "10-foot dark UI: huge Orbitron type (48px+), bold violet focus rings (4px), " +
      "D-pad spatial navigation, full-bleed backdrops, minimal chrome.",
    mobile:
      "Single column, bottom tab bar in void-panel, full-width poster cards, " +
      "sticky play bar with stardust-gold scrubber.",
  },

  /* ==========================================================================
   * 19. SOUND IDENTITY
   * ========================================================================== */

  sound_identity: {
    startup_chime:
      "Deep sub-bass pulse rising to a crystalline high-register sustain — " +
      "the sound of a spacecraft's reactor coming online.",
    notification:
      "A short, clear sonar-ping in a cool register — distant but precise.",
    ui_click:
      "Crisp, low-mass metallic tap — like a spacecraft panel button.",
    success:
      "Three ascending tones in a pure major chord — quiet mission-accomplished.",
    error:
      "A single low hollow tone, not alarming — like a soft proximity alert.",
  },

  /* ==========================================================================
   * 20. SEASONAL VARIANTS
   * ========================================================================== */

  seasonal_variants: [
    {
      name: "Perseid Meteor Shower",
      active_range: "08-10..08-14",
      overrides: {
        "--color-tertiary": "#FFD580",
        "--color-bg":       "#050810",
      },
      motif:
        "Animated meteor trails sweep diagonally across the background — " +
        "stardust-gold streaks fading to void.",
    },
    {
      name: "Winter Solstice — Aurora",
      active_range: "12-18..01-06",
      overrides: {
        "--color-primary":   "#34D399",
        "--color-secondary": "#60A5FA",
      },
      motif:
        "Aurora Curtain gradient undulates slowly across the hero backdrop — " +
        "green into blue into violet, a deep-winter aurora borealis.",
    },
    {
      name: "Galaxy Season",
      active_range: "03-01..05-31",
      overrides: {
        "--color-secondary": "#E056B2",
      },
      motif:
        "The Milky Way core rises behind content — a faint magenta-violet river " +
        "of stars as a background texture, low opacity.",
    },
  ],

  seasonal_activation: {
    mode: "live-js",
    motif_assets: [
      "img/seasonal/meteor-shower-trails.svg",
      "img/seasonal/aurora-borealis-curtain.svg",
      "img/seasonal/milky-way-river.svg",
    ],
    banner: "Perseid Meteor Shower — watch the cosmos blaze overhead. Every orbit tells a story.",
  },

  /* ==========================================================================
   * 21. ACCESSIBILITY
   * ========================================================================== */

  accessibility: {
    minimum_contrast:
      "WCAG AA minimum: 4.5:1 for body text (#E8EAF0 on #111827 = ~13:1; " +
      "all accent colors verified against their backgrounds before use).",
    focus_style:
      "2px violet (#A78BFA) focus ring with 2px deep-space-black offset; " +
      "always visible — never hidden on dark surfaces.",
    touch_target:
      "Minimum 44×44px; 48px preferred for TV remote/D-pad interactions.",
    motion_reduction:
      "Honor prefers-reduced-motion: replace parallax drift and particle " +
      "effects with simple cross-fades; retain static nebula background.",
    font_scaling:
      "Layouts survive 200% text zoom; Orbitron at large sizes remains " +
      "readable; no content clips at wider tracking.",
  },

  /* ==========================================================================
   * 22. DO / DON'T
   * ========================================================================== */

  do_dont: {
    colors: {
      do: [
        "Use deep space black as the universal background",
        "Let accent colors glow as light emerging from darkness",
        "Reserve stardust gold for the single most critical element per screen",
      ],
      dont: [
        "Introduce warm amber, orange, or earthy tones",
        "Use cool grey or warm brown shadows — use deep void black",
        "Apply more than two accent hues in a single composition",
      ],
      reason:
        "The entire palette is calibrated to read as deep-space luminosity. " +
        "Warm intruders immediately break the illusion of the cosmic void.",
    },
    typography: {
      do: [
        "Use Orbitron for mission-critical headlines and stats",
        "Set Rajdhani labels in all-caps for the technical mission aesthetic",
        "Keep Inter body copy at 65 characters maximum per line",
      ],
      dont: [
        "Use Orbitron for body copy or long labels",
        "Apply italic to any headline",
        "Use low-contrast grey text on dark surfaces",
      ],
      reason:
        "Type precision is as important as telemetry clarity — " +
        "every glyph must be instantly readable against the void.",
    },
    layout: {
      do: [
        "Embrace vast negative space — the void is a design element",
        "Anchor each view to a single luminous focal point",
        "Keep content within 1440px maximum width",
      ],
      dont: [
        "Crowd panels with too many elements",
        "Place competing focal points that scatter the eye",
        "Add decorative elements that read as terrestrial or warm",
      ],
      reason:
        "Scale and emptiness are what make the cosmos feel infinite. " +
        "Crowded layouts destroy that sense of expansiveness.",
    },
    animation: {
      do: [
        "Move elements with orbital slowness — 600ms+ transitions feel weightless",
        "Use parallax star drift behind content sections",
        "Respect prefers-reduced-motion by replacing drifts with fades",
      ],
      dont: [
        "Use bouncy spring animations — gravity doesn't exist here",
        "Flash or strobe effects — they read as cheap neon",
        "Animate multiple elements simultaneously without orchestration",
      ],
      reason:
        "Motion in zero gravity is smooth, continuous, and purposeful — " +
        "never jerky or earth-bound.",
    },
    imagery: {
      do: [
        "Use NASA-style painted illustration with cool stellar lighting",
        "Silhouette human figures against vast nebula backgrounds",
        "Include star-atlas grid overlays for technical flavor",
      ],
      dont: [
        "Use warm photography or golden-hour lighting",
        "Show lush greenery, beaches, or terrestrial landscapes",
        "Use busy photographic textures as backgrounds",
      ],
      reason:
        "Every image must reinforce that the viewer is in deep space — " +
        "one warm earthbound photo shatters the immersion.",
    },
    branding: {
      do: [
        "Use the Orbitron wordmark in approved colors",
        "Use mission-patch hexagon badge for secondary lockups",
        "Keep Vela's design consistent across appearances",
      ],
      dont: [
        "Stretch, rotate, or recolor the wordmark",
        "Use film-reel or popcorn motifs — wrong universe entirely",
        "Place the logo on warm or light backgrounds",
      ],
      reason:
        "Brand consistency makes the Phlix identity immediately recognizable " +
        "anywhere in the product ecosystem.",
    },
    icons: {
      do: [
        "Use 1.5px outlined icons with rounded caps",
        "Apply single nebula-violet or stardust-gold tint for featured icons",
      ],
      dont: [
        "Use thick filled icons that compete with UI content",
        "Mix icon styles within a single view",
      ],
      reason:
        "Icons should read like precision instrument symbols, " +
        "not decorative illustrations.",
    },
    copywriting: {
      do: [
        "Write with mission-briefing clarity — short, purposeful sentences",
        "Use cosmic vocabulary (launch, orbit, navigate, signal)",
        "Let quiet awe come through; avoid breathless hype",
      ],
      dont: [
        "Use warm domestic metaphors (cozy, popcorn, curtain)",
        "Write pushy marketing superlatives (revolutionary, game-changing)",
        "Use jargon without explanation",
      ],
      reason:
        "The voice is a seasoned explorer's — knowledgeable, awestruck, " +
        "never excitable or corporate.",
    },
    ux: {
      do: [
        "Make Play the clearest action on any media card",
        "Keep flows to three steps or fewer for critical paths",
        "Surface navigation as a persistent dark rail",
      ],
      dont: [
        "Hide the primary action behind a hover or secondary menu",
        "Add friction before playback begins",
        "Over-animate the interface during active playback",
      ],
      reason:
        "The mission is discovery and playback — every second of friction " +
        "delays the launch.",
    },
    performance: {
      do: [
        "Lazy-load nebula background images and star-field assets",
        "Use CSS gradients for simple nebula glows instead of images",
        "Compress all poster images; use WebP where supported",
      ],
      dont: [
        "Ship full-resolution nebula photographs as page backgrounds",
        "Run particle systems on low-power devices without a reduced-motion check",
      ],
      reason:
        "A slow launch is the only failure mode worse than no launch.",
    },
  },

  /* ==========================================================================
   * 22. SITE ARCHITECTURE  — information architecture & page composition
   * ========================================================================== */

  site_architecture: {
    nav: [
      { id: "home",     label: "Launch Pad",     emphasis: "default" },
      { id: "features", label: "Star Catalog",   emphasis: "primary" },
      { id: "clients",  label: "Fleet Status",   emphasis: "default" },
      { id: "download", label: "Set Coordinates", emphasis: "primary" },
      { id: "hub",      label: "Signal Relay",   emphasis: "default" },
      { id: "about",    label: "Mission Log",    emphasis: "muted" },
    ],
    demoted_pages: [
      { id: "plugins", reason: "Auxiliary systems — valuable to engineers, not the primary trajectory for explorers new to Phlix." },
      { id: "docs",    reason: "Technical reference lives one transmission away in the footer, for crews who need deep specs." },
    ],
    extra_pages: [],
    footer_arrangement: "full-directory",
  },

  /* ==========================================================================
   * 23. CONTENT CASTING & COPY  — how shared facts are weighted & voiced
   * ========================================================================== */

  homepage_narrative: {
    arc: "story-first",
    logline: "You are an explorer. Your library is the cosmos. Every film, a star system waiting to be visited.",
    sections: [
      { id: "void-opens",     source: "copy_overlay.hero", treatment: "Full-bleed star-field hero: the void parts to reveal Vela's silhouette and the mission headline.", weight: "hero" },
      { id: "stellar-catalog", source: "feature_casting",   treatment: "Four 'charted systems' (hero features) rendered as mission briefing cards with technical specs.",          weight: "major" },
      { id: "why-launch",     source: "story",             treatment: "Value props framed as a captain's log entry — why this expedition matters.",                       weight: "major" },
      { id: "past-missions",  source: "proof_strategy",    treatment: "Real star-counts and repo telemetry displayed as a mission-control readout.",                      weight: "minor" },
      { id: "ignition",       source: "conversion_funnel", treatment: "Closing launch-sequence CTA: 'Fire Main Engines' beside the download one-liner.",               weight: "major" },
    ],
  },

  page_blueprints: {
    features: {
      template: "star-catalog",
      spec: "Lay the features out as a scrolling star catalog — each entry a mission briefing card with a technical icon, headline, and discovery claim.",
    },
    clients: {
      template: "fleet-manifest",
      spec: "Present each client device as a vessel in the fleet, with native platform details and the systems it can reach (direct play, HLS, transcoding).",
    },
    download: {
      template: "mission-control",
      spec: "Frame the page as a mission-control center: the server install is the 'launch sequence', client cards are the 'available vessels', ecosystem links are the 'support systems'.",
    },
    about: {
      template: "captain-log",
      spec: "Tell the founding story as a scrolling mission log (Philosophy, License, Contributing) ending in the FAQ framed as 'Transmission Log — Common Queries'.",
    },
  },

  feature_casting: {
    hero: [
      { id: "syncplay", angle: "NTP time-sync keeps every explorer on the same trajectory — play, pause, seek — everyone moves together across the void." },
      { id: "library",  angle: "Drop a file and watch it take its place in your star catalog — metadata surfaces instantly from the void." },
    ],
    support: ["transcode", "auth", "hub", "livetv"],
    footnote: ["dlna", "plugins"],
    omit_from_home: [],
  },

  copy_overlay: {
    hero: {
      eyebrow: "Set Course",
      headline: "Every Story, An Infinite Horizon.",
      subheadline: "Your library awaits in the void. Stream to every screen, sync every viewer, explore without limits — Phlix is your vessel.",
      primary_cta: { label: "Fire Main Engines" },
      secondary_cta: { label: "Read Transmission" },
    },
    section_headings: {
      pitch: "Why launch with Phlix?",
      features: "Systems in the Catalog",
      cta_banner: "Ready for launch. Ignition sequence begins.",
    },
    footer_tagline: "The odyssey never ends.",
  },

  copy_treatments: {
    pitch_bullets: "mission-briefing",
    faq: "transmission-log",
    clients: "fleet-manifest",
    ecosystem: "star-chart",
  },

  faq_experience: {
    frame: "transmission-log",
    persona: "Vela, the cosmic navigator, answering queries from explorers in transmission form.",
    question_order: ["like-plex", "expose-internet", "formats", "mobile-app", "plugins", "license"],
    extra_questions: [
      { q: "Will this run on my old server?", maps_to: "formats" },
      { q: "Do I have to open my world to the void?", maps_to: "expose-internet" },
      { q: "Can I steer the ship myself — write my own systems?", maps_to: "plugins" },
    ],
  },

  persona_vignettes: [
    {
      name: "The Solo Expedition",
      scene: "One explorer, countless worlds — dimming the room, launching their library, and disappearing into the infinite.",
      surfaces: ["home hero", "media library grid", "media player"],
      features_shown: ["library", "transcode", "auth"],
    },
    {
      name: "Synchronized Voyage",
      scene: "Two crews, three time zones, one film — everyone hits play and stays locked to the same frame as if they were on the same bridge.",
      surfaces: ["SyncPlay lobby", "media player", "hub connect screen"],
      features_shown: ["syncplay", "hub"],
    },
    {
      name: "Fleet Coordination",
      scene: "The captain's profile opens to a curated channel manifest, the old DLNA vessel receiving the signal over its native protocol.",
      surfaces: ["profile picker", "media library grid", "device selector"],
      features_shown: ["auth", "dlna", "livetv"],
    },
  ],

  hero_experience: {
    mode: "diorama-parallax",
    spec: "A layered void diorama — star field, nebula backdrop, Vela floating mid-frame, orbital ring accent — parallaxes gently on scroll/pointer motion. The star map in Vela's visor pulses violet in sync.",
    suggested_inputs: ["pointer position", "scroll offset"],
    fallback: "A single flat illustration of Vela against a starfield nebula with the identical headline, subheadline, and both CTAs baked into the static markup. No motion required.",
    js_budget_kb: 8,
  },

  navigation_model: {
    mode: "topbar",
    spec: "A deep-space topbar with constellation dots between the links and the Phlix wordmark in Orbitron; the active link glows violet like a pulsar.",
    keyboard: null,
    fallback: "The topbar IS the standard accessible nav — a plain <nav> list with the same link structure, fully keyboard navigable via Tab and Enter, aria-current='page' on active link, collapsing to a labeled hamburger menu on mobile.",
  },

  scroll_experience: {
    mode: "chaptered",
    spec: "Each homepage section arrives like a new sector entering the scope — a slow warp-speed zoom and a faint star-trail sweep as content enters frame.",
    reduced_motion: "Under prefers-reduced-motion the warp effects are dropped entirely; the page becomes a plain continuous scroll with instant section boundaries.",
  },

  easter_eggs: [
    {
      trigger: "logo-clicks:7",
      effect: "Vela executes a perfect barrel-roll and traces a constellation in the air with one arm, then salutes.",
      reward_copy: "Course correction approved. You've got an explorer's touch.",
      exit: "The animation settles after ~5s, or press Esc to clear it immediately.",
    },
    {
      trigger: "typed-word:void",
      effect: "The background nebula briefly pulses from violet to gold, and Vela's visor flares with a brilliant star-map glow.",
      reward_copy: "You've found the heart of the void.",
      exit: "Press Esc (or type any other key) to restore normal visuals.",
    },
    {
      trigger: "scroll-past-footer",
      effect: "A distant spacecraft drifts across the lower-right corner, leaving a faint stardust trail, then disappears into the horizon.",
      reward_copy: "Safe travels, explorer.",
      exit: "The sprite fades after reaching the edge.",
    },
  ],

  conversion_funnel: {
    style: "guided-steps",
    primary_goal: "Get an explorer to launch the server and enter their first library sector.",
    cta_ladder: [
      { step: 1, cta: "Fire Main Engines",           target: "download" },
      { step: 2, cta: "Choose Your Vessel",          target: "clients" },
      { step: 3, cta: "Ignite (install server)",     target: "download#server" },
    ],
    download_opening: "The Download page opens like a mission-control briefing: 'Two transmissions to orbit' header over the one-line server ignition command, then the client fleet roster below.",
    friction_notes: "Technical explorers — keep the path direct and precise, no handholding; respect that they're building infrastructure, not just pressing play.",
  },

  proof_strategy: {
    signals: [
      { type: "spec-numbers",     format: "A mission-control readout of real capabilities: 8 core features, 5 native clients, NTP time-sync across devices, HLS + FFmpeg transcoding." },
      { type: "github",           format: "A 'from the bridge' row linking the real phlix-server repo with live star and issue counts (never a hard-coded number)." },
      { type: "quotes-from-docs", format: "One precise line from the docs (verbatim: 'BSD-3-Clause across the board') set as a mission-brief quote in a constellation-line frame." },
    ],
    placement: "A single calm 'telemetry verified' band between the features and the closing ignition CTA.",
  },

  visitor_paths: null,

  experience_archetype: "immersive",

  complexity_profile: {
    density: "standard",
    reading_level: "general",
    jargon_policy: "translate",
    page_budget: { home_sections_max: 5, words_per_section_max: 120 },
  },

  intensity_toggle: {
    label: "Reduce cosmic effects",
    affects: ["parallax", "animation", "particle-effects", "hero_experience→static", "scroll_experience→continuous"],
    default: "full",
    placement: "A small toggle in the footer utility row, below prefers-reduced-motion context.",
  },

  error_page_experience: {
    concept: "A 'signal lost' gag: Vela stands at the edge of a cliff on an alien moon, staring at a empty sector marked '404 — this coordinate does not exist', holding a star chart and looking contemplative.",
    recovery_links: ["home", "features", "download"],
  },

  /* ==========================================================================
   * 24. METADATA
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
      "Base/parent kit for the Cosmic Odyssey brand identity. " +
      "Author variations against this via base_kit.slug = 'cosmic-odyssey'. " +
      "Dark-mode only — no light-mode variant intended by default.",
  },
};

// Export (ESM)
export default brandKit;
export { brandKit };
