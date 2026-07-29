/**
 * ============================================================================
 *  PHLIX BRAND KIT  —  Thunder Strike   (BASE kit)
 *  thunder-strike.js
 * ============================================================================
 *
 *  "Thunder Strike"
 *  -------------
 *  Electrical storm powering your media experience — raw tesla coil energy,
 *  plasma orb illumination, electric arcs that crackle between content,
 *  and lightning bolt shapes that organize everything. The air before a
 *  strike is charged with potential. This brand lives in that moment.
 *
 *  Palette: #5F27CD (Electric Purple), #48DBFB (Plasma Cyan),
 *           #EE5A24 (Arc Orange), #222F3E (Storm Dark), #F5F6FA (Flash White)
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY
   * ========================================================================== */

  name: "Thunder Strike",

  slug: "thunder-strike",

  version: "1.0",

  description:
    "Electrical storm powering your media experience — Thunder Strike " +
    "harnesses the raw energy of tesla coils, plasma orbs, and electric arcs. " +
    "The air before a strike is charged with potential. Every interaction " +
    "crackles with power. Your library is a conduit for electric discovery.",

  inspiration: [
    "Tesla coil discharge photography",
    "Plasma ball illumination at close range",
    "Lightning bolt high-speed photography",
    "Electric arc welding in darkness",
    "Thunderstorm with cloud-to-ground strikes",
    "St. Elmo's fire on ship masts",
    "Jacob's ladder electrical apparatus",
    "Geiger counter click patterns during storms",
    "Storm electrical field visualizations",
    "Neon signs in rain-slicked streets",
  ],

  keywords: [
    "thunder", "strike", "electric", "lightning", "tesla", "plasma", "arc",
    "storm", "energy", "power", "charge", "voltage", "zap", "crackle",
    "bolt", "discharge", "coil", "magician", "transformative", "potent",
    "electric-arc", "plasma-cyan", "arc-orange", "storm-dark", "flash-white",
    "voltage", "high-energy", "dynamic", "intense", "electrifying",
    "current", "conductor", "static", "field", "potential", "kinesis",
    "powerful", "bold", "dramatic", "vivid", "electric-purple",
  ],

  /* ==========================================================================
   * 2. PERSONALITY
   * ========================================================================== */

  personality: ["Electric", "Powerful", "Transformative", "Kinetic", "Intense", "Mysterious"],

  emotional_goals: ["Awe", "Excitement", "Power", "Thrill", "Wonder", "Immersion"],

  archetype: "Magician",

  audience: [
    "Tech enthusiasts who love high-energy interfaces",
    "Viewers who want their media to feel alive with power",
    "Power users who appreciate dramatic visual feedback",
    "Fans of electric aesthetics and tesla coil imagery",
    "Users who want transformative, not just functional, experiences",
    "Immersive entertainment seekers",
  ],

  /* ==========================================================================
   * 3. BRAND STORY
   * ========================================================================== */

  story:
    "There is a moment every storm watcher knows — when the sky cracks " +
    "open and a single bolt illuminates everything in its path. Thunder Strike " +
    "was born from that moment of electric revelation. Phlix built this identity " +
    "for the viewer who doesn't just watch media — they command it. Every " +
    "interaction crackles with potential. Every discovery is a small lightning " +
    "strike illuminating something new. The storm is always there, waiting to strike.",

  tagline_primary: "Command the Storm. Harness the Power.",

  tagline_secondary: [
    "The voltage is rising.",
    "Your library just struck.",
    "Electric discovery awaits.",
    "Arc between worlds of content.",
    "The storm answers to you.",
  ],

  mission:
    "Transform media discovery into an electrifying experience — where every " +
    "interaction crackles with tesla-coil energy and every UI moment holds " +
    "the potential of a lightning strike.",

  values: ["Power", "Energy", "Transformation", "Precision", "Electricity"],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES
   * ========================================================================== */

  brand_dna:
    "Thunder Strike is the electric discharge of a tesla coil: vivid " +
    "electric-purple arcs cutting through storm-dark space, plasma-cyan " +
    "glow illuminating surfaces, and arc-orange sparks that dance between " +
    "interactions. It is intense, alive, and powerful — crackling with " +
    "potential energy that releases on contact.",

  design_principles: [
    "Every screen should feel like the moment before a discharge — charged, crackling, ready to strike.",
    "Electric arcs are the primary motif: use them to connect elements, highlight transitions, and organize content.",
    "Plasma orbs serve as glowing anchors — illuminating what's important with soft cyan halation.",
    "Motion should feel like electrical discharge: sudden, bright, then settling into a residual glow.",
    "Dark storm backgrounds make electric colors pop — the contrast is the power.",
    "Typography is bold and electric — it should feel energized, not static.",
    "Shadows have an electric quality — purple-tinted, not neutral gray.",
    "The interface responds instantly — interactions feel like completing a circuit.",
  ],

  brand_opposites: [
    "Not calm or peaceful",
    "Not soft or muted",
    "Not pastel or washed out",
    "Not minimalist-sterile",
    "Not playful or cartoonish",
    "Not corporate or neutral",
    "Not static or still",
    "Not low-energy or passive",
  ],

  signature_elements: [
    "Electric arc dividers (animated SVG paths between sections)",
    "Plasma orb glow effects (cyan halation on key elements)",
    "Tesla coil spark bursts (interaction feedback)",
    "Lightning bolt shapes (CTAs, transitions, highlights)",
    "Arc-orange spark trails (hover and click feedback)",
    "Electric field patterns (background textures)",
    "Crackle effect on currently playing content (animated electric outline)",
  ],

  header_motif: "Electric arc lightning bolt — pulsing purple core with cyan corona, occasional orange spark discharge",

  /* ==========================================================================
   * 5. VISUAL IDENTITY
   * ========================================================================== */

  visual_style: [
    "Electric storm cinematic",
    "High contrast neon",
    "Arc and discharge motion",
    "Tesla coil aesthetic",
    "Plasma glow halation",
  ],

  art_direction:
    "Artwork should feel like a high-voltage tesla coil demonstration in " +
    "a dark room: electric-purple dominates with plasma-cyan illumination " +
    "and arc-orange sparks. Lightning bolt shapes cut across compositions " +
    "diagonally. Surfaces have the look of charged glass — slight glow, " +
    "inner luminescence, and depth. Lighting is always electric: arc " +
    "discharges, plasma halos, and the occasional bright spark. Composition " +
    "is dynamic and diagonal — nothing perfectly horizontal or still. " +
    "Electric elements sweep across frames at angles, connecting disparate " +
    "areas like a discharge finding its ground. Illustration leans toward " +
    "vivid high-contrast with a slight electric glow overlay quality — like " +
    "watching a Jacob's ladder in real time. Avoid anything that reads as " +
    "calm, symmetrical, or dim. This is a brand in constant, crackling motion.",

  realism: "semi_realistic",

  rendering_style: ["electric glow", "neon overlay", "vector arc", "plasma effect", "high voltage"],

  texture_level: "medium",

  depth: "layered",

  lighting: {
    temperature: "electric-cool",
    quality: "electric discharge — purple-white core, cyan corona, orange spark edge, rapid flicker",
    shadows: "hard with purple tint",
    contrast: "very_high",
    notes: "All light sources are internal and electric: tesla arcs, plasma orbs, spark discharges. No daylight, no warm fill, no soft diffuse. Electric shadows are purple-tinted, never neutral gray.",
  },

  composition: [
    "Diagonal lightning-bolt composition — arcs cut at 30–60° angles",
    "Plasma orb as focal center — circular glow anchoring compositions",
    "Asymmetric balance — electric weight distributed to create tension",
    "Arc patterns as section connectors — paths that link disparate elements",
    "Horizontal storm-dark bands as section dividers with arc accents",
    "Layered depth: background → charged field → plasma glow → arc overlay",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM
   * ========================================================================== */

  colors: {
    primary: {
      name: "Electric Purple",
      hex: "#5F27CD",
      rgb: "rgb(95, 39, 205)",
      hsl: "hsl(259, 69%, 48%)",
      usage: "Primary backgrounds, electric arcs, lightning bolt accents, active states, focus rings — the core voltage.",
      contrast_targets: ["storm_dark", "plasma_cyan", "arc_orange"],
    },
    secondary: {
      name: "Plasma Cyan",
      hex: "#48DBFB",
      rgb: "rgb(72, 219, 251)",
      hsl: "hsl(189, 94%, 63%)",
      usage: "Glow effects, plasma orbs, hover states, active indicators — the electric illumination.",
      contrast_targets: ["storm_dark", "electric_purple", "flash_white"],
    },
    tertiary: {
      name: "Arc Orange",
      hex: "#EE5A24",
      rgb: "rgb(238, 90, 36)",
      hsl: "hsl(16, 86%, 54%)",
      usage: "Spark accents, hover sparks, CTA highlights, notifications — the discharge spark.",
      contrast_targets: ["storm_dark", "electric_purple"],
    },
    neutral: {
      name: "Storm Dark",
      hex: "#222F3E",
      rgb: "rgb(34, 47, 62)",
      hsl: "hsl(217, 29%, 19%)",
      usage: "Primary backgrounds, card surfaces, secondary dark elements.",
      contrast_targets: ["electric_purple", "plasma_cyan", "arc_orange", "flash_white"],
    },
    background: {
      name: "Thunder Dark",
      hex: "#131720",
      rgb: "rgb(19, 23, 32)",
      hsl: "hsl(220, 25%, 10%)",
      usage: "Default page background — deep electric storm, not pure black.",
      contrast_targets: ["electric_purple", "plasma_cyan", "arc_orange", "flash_white"],
    },
    surface: {
      name: "Charged Glass",
      hex: "#1A1F2E",
      rgb: "rgb(26, 31, 46)",
      hsl: "hsl(225, 28%, 14%)",
      usage: "Card and panel surfaces — one step above the thunder-dark background.",
      contrast_targets: ["electric_purple", "plasma_cyan", "arc_orange"],
    },
    surface_alt: {
      name: "Arc Field",
      hex: "#252B3B",
      rgb: "rgb(37, 43, 59)",
      hsl: "hsl(225, 23%, 19%)",
      usage: "Alternate surface for striped rows, nested panels, active nav items.",
      contrast_targets: ["electric_purple", "plasma_cyan"],
    },
    text: {
      name: "Flash White",
      hex: "#F5F6FA",
      rgb: "rgb(245, 246, 250)",
      hsl: "hsl(228, 33%, 97%)",
      usage: "Primary body and headline text — cold electric white, never pure #FFF.",
      contrast_targets: ["storm_dark", "thunder_dark", "charged_glass"],
    },
    success: {
      name: "Charge Green",
      hex: "#00D26A",
      rgb: "rgb(0, 210, 106)",
      hsl: "hsl(148, 100%, 41%)",
      usage: "Success toasts, confirmations, 'charged' states.",
      contrast_targets: ["storm_dark"],
    },
    warning: {
      name: "Warning Amber",
      hex: "#FFB800",
      rgb: "rgb(255, 184, 0)",
      hsl: "hsl(44, 100%, 50%)",
      usage: "Warnings and caution states.",
      contrast_targets: ["storm_dark"],
    },
    error: {
      name: "Short Circuit Red",
      hex: "#FF3B3B",
      rgb: "rgb(255, 59, 59)",
      hsl: "hsl(0, 100%, 61%)",
      usage: "Errors, destructive actions, critical failed states.",
      contrast_targets: ["flash_white", "storm_dark"],
    },
    info: {
      name: "Field Blue",
      hex: "#3B82F6",
      rgb: "rgb(59, 130, 246)",
      hsl: "hsl(217, 91%, 60%)",
      usage: "Informational banners — cool blue contrast against warm purple palette.",
      contrast_targets: ["flash_white"],
    },
    focus: {
      name: "Plasma Focus",
      hex: "#48DBFB",
      rgb: "rgb(72, 219, 251)",
      hsl: "hsl(189, 94%, 63%)",
      usage: "Keyboard-focus ring (2px plasma cyan, 2px offset on dark).",
      contrast_targets: ["storm_dark", "thunder_dark"],
    },
    border: {
      name: "Arc Line",
      hex: "#3A4556",
      rgb: "rgb(58, 69, 86)",
      hsl: "hsl(220, 19%, 28%)",
      usage: "Card/divider borders — thin electric lines on dark surfaces.",
      contrast_targets: ["electric_purple", "plasma_cyan"],
    },
    shadow: {
      name: "Electric Shadow",
      hex: "#131720",
      rgb: "rgba(19, 23, 32, 0.70)",
      hsl: "hsl(220, 25%, 10%)",
      usage: "Deep directional shadows — thunder-dark tinted with purple undertone.",
      contrast_targets: [],
    },
    overlay: {
      name: "Storm Scrim",
      hex: "#0A0C10",
      rgb: "rgba(10, 12, 16, 0.85)",
      hsl: "hsl(220, 20%, 5%)",
      usage: "Modal/scrim overlays — near-opaque thunder-dark with depth.",
      contrast_targets: [],
    },
    gradients: [
      {
        name: "Electric Arc",
        type: "linear",
        angle: "135deg",
        stops: ["#5F27CD", "#48DBFB", "#EE5A24"],
        usage: "Hero section highlights, lightning decoration stripes, diagonal accents.",
      },
      {
        name: "Plasma Core",
        type: "radial",
        angle: null,
        stops: ["rgba(72,219,251,0.4)", "rgba(95,39,205,0.2)", "rgba(19,23,32,0.0)"],
        usage: "Background glow behind hero subjects — the electric center of the discharge.",
      },
      {
        name: "Tesla Field",
        type: "radial",
        angle: null,
        stops: ["rgba(95,39,205,0.6)", "rgba(19,23,32,0.0)"],
        usage: "Ambient electric field effect on backgrounds and hover states.",
      },
      {
        name: "Arc Spark",
        type: "linear",
        angle: "45deg",
        stops: ["rgba(238,90,36,0.0)", "rgba(238,90,36,0.3)", "rgba(238,90,36,0.0)"],
        usage: "Spark trail effect on hover and transition elements.",
      },
    ],
  },

  color_rules: [
    "Backgrounds are always thunder-dark or charged-glass — never pure black or light.",
    "Electric purple is the core voltage: use it as the primary accent for structure.",
    "Plasma cyan is the glow: use it for hover states and illumination effects.",
    "Arc orange is the spark: use it sparingly for interaction feedback and CTAs.",
    "Lightning flash moments (hover, transition) use a brief white-cyan pulse — max 150ms.",
    "Shadows and overlays are thunder-dark tinted with purple undertone — never neutral gray.",
    "Maximum three accent colors visible simultaneously in any composition.",
    "The three electric colors (purple, cyan, orange) work together — don't isolate them.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  fonts: {
    headline: {
      family: "Russo One",
      weight: [400],
      fallbacks: ["Orbitron", "Impact", "sans-serif"],
      usage: "Electric-scale headlines, section titles, voltage alert text.",
      tracking: "0.03em",
      line_height: 0.95,
    },
    display: {
      family: "Orbitron",
      weight: [500, 700, 900],
      fallbacks: ["Russo One", "Impact", "sans-serif"],
      usage: "Oversized stat figures, countdown timers, large electric numerals.",
      tracking: "0.05em",
      line_height: 0.9,
    },
    body: {
      family: "Exo 2",
      weight: [400, 500, 600],
      fallbacks: ["system-ui", "Roboto", "sans-serif"],
      usage: "Paragraphs, descriptions, metadata — readable under electric conditions.",
      tracking: "0em",
      line_height: 1.6,
    },
    ui: {
      family: "Exo 2",
      weight: [500, 600, 700],
      fallbacks: ["system-ui", "sans-serif"],
      usage: "Buttons, nav labels, form labels, chips, badges — electric clarity.",
      tracking: "0.04em",
      line_height: 1.2,
    },
    mono: {
      family: "Share Tech Mono",
      weight: [400, 600],
      fallbacks: ["Courier New", "monospace"],
      usage: "Code blocks, technical readouts, file paths, timestamps, voltage data.",
      tracking: "0.02em",
      line_height: 1.5,
    },
    number: {
      family: "Orbitron",
      weight: [700, 900],
      fallbacks: ["Russo One", "Impact", "sans-serif"],
      usage: "Runtime clocks, episode counts, dashboard figures, quality badges.",
      tracking: "0.06em",
      line_height: 1.0,
    },
  },

  typography_rules: [
    "Headlines always use Russo One in uppercase — electric power weight.",
    "Never use light-weight fonts (100–300) on dark surfaces; minimum 400.",
    "Body text must sit at 15px or larger on dark surfaces for legibility.",
    "Use Exo 2 for all UI elements — clean, technical, electric-readable.",
    "Share Tech Mono for any technical data — voltage readings, timestamps, file sizes.",
    "Maintain tight tracking on headlines for that electric-alert punch.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  shape_language: [
    "Lightning bolt cuts — sharp 45° diagonal angles",
    "Circular plasma forms — concentric glow rings",
    "Sharp rectangles — charged glass panels with clean edges",
    "Arc paths — bezier curves like electrical discharge",
    "Tesla coil spiral motifs — coiled energy forms",
    "Sharp angular chips — like broken glass or arc paths",
  ],

  corner_radius: {
    small: "2px",
    medium: "4px",
    large: "8px",
    xl: "12px",
    pill: "999px",
  },

  borders: {
    thickness: "1px",
    style: "solid",
    rounded: false,
    hand_drawn: false,
    notes: "Borders are thin, precise, electric lines — like arc paths on a dark surface. 2px plasma-cyan or arc-orange highlight border for featured/active items only.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  icon_style: ["Outlined", "Sharp", "Duotone", "Electric-glow"],

  icon_rules: [
    "2px stroke weight, sharp caps and joins.",
    "Plasma cyan for active/featured icons; storm-dark for inactive.",
    "Arc orange for interaction feedback and spark states.",
    "Duotone for hero/featured: dark storm-dark body + electric-purple or plasma-cyan glow detail.",
    "Never use rounded soft icon sets — the brand reads technical and electric.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  illustration_style: [
    "High voltage tesla coil discharge",
    "Plasma ball illumination in darkness",
    "Lightning bolt arc path diagram",
    "Electric field visualization art",
    "Jacob's ladder electrical apparatus",
  ],

  character_style: {
    proportions: "Strong and dynamic — tesla coil engineer, powerful stance, energy flowing.",
    eyes: "Sharp and focused — scientist concentration, electric intensity.",
    expressions: "Focused, intense, powerful — never casual or relaxed.",
    clothing: "Lab coat with electric accents, protective gear with glowing elements, dark technical pants.",
    outlines: "2px sharp dark outline with occasional plasma-cyan electric detail.",
  },

  mascot: {
    name: "Arc",
    species: "Electric elemental / animated tesla discharge",
    personality: "Wild, crackling, always in motion — speaks in short electric bursts, crackles with energy.",
    description:
      "A lightning bolt form made of electric-purple core with plasma-cyan " +
      "corona and arc-orange spark edges. The form is always arcing, always " +
      "discharging small sparks. Arc is constantly crackling with potential energy.",
    poses: [
      "Full discharge pose — the main lightning strike",
      "Arc-between pose — connecting two points",
      "Tesla coil pose — spiraling energy upward",
      "Resting charge — dim glow, building potential",
    ],
    expressions: ["Full discharge", "Charging up", "Sparking", "Holding charge"],

    behavior: {
      placement:
        "Bottom-right corner as a crackling arc; appears on Home, Download, " +
        "and Features pages — absent on docs reading pages where focus is needed.",
      idle:
        "Arc crackles continuously (random spark intervals), plasma-cyan core pulses every 1.5s. " +
        "Under prefers-reduced-motion Arc is static with a gentle cyan glow only.",
      tips: [
        { where: "home:#hero",              say: "The storm is charged. Ready to strike." },
        { where: "home:.features-overview", say: "Every feature generates voltage. More power to you." },
        { where: "download:#server",          say: "One line to harness the storm. Install now." },
        { where: "download:#clients",         say: "Four clients, four discharge points. The storm is everywhere." },
        { where: "about:#faq",               say: "Electric FAQ — everything you need to know about the charge." },
      ],
      easter_interactions: [
        { trigger: "click:5",       react: "Arc surges to full discharge — electric sparks across the screen, then settles back." },
        { trigger: "hover-hold:3s", react: "Arc builds charge, plasma-cyan glow intensifies, then releases a spark burst." },
      ],
      dismiss:
        "A small 'Arc, stand down' close button; dismissed state persists via localStorage.",
    },
  },

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  photography_style: [
    "Tesla coil discharge photography",
    "Lightning bolt high-speed capture",
    "Neon signs in rain",
    "Electric arc welding in darkness",
    "Plasma ball close-up",
  ],

  photo_rules: [
    "Never use daylight or sunny photography — all scenes exist in electric-dark conditions.",
    "Grade all photos toward deep purple-black and cyan — the electric palette.",
    "Strong contrast: deep shadows with plasma-cyan and arc-orange highlights.",
    "Include arc paths and discharge effects for electric energy.",
    "Tech aesthetic: isolated figures against electric field visualizations.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  motion_style: ["Sudden", "Electric", "Arc-based", "Pulsing", "Sparking"],

  transitions: [
    "Zap transition — rapid purple-cyan flash then cut",
    "Arc wipe — diagonal electric arc path reveal",
    "Spark flash — brief orange-white flash on interaction",
    "Plasma fade — radial glow expand then settle",
    "Tesla spin — quick rotational blur 200ms",
  ],

  animation_speed: "fast",

  easing: ["cubic-bezier(0.19, 1, 0.22, 1)", "ease-out", "ease-in"],

  microinteractions: {
    hover: "Cards gain a 1px plasma-cyan border glow and lift 3px with a cyan shadow (0 4px 20px rgba(72,219,251,0.25)) over 150ms. Small arc-orange sparks appear at corners.",
    button_press: "Orange flash to 120% brightness, quick 50ms press to 0.95, then snap back — zap feel.",
    loading: "Tesla coil spin — electric-purple ring rotating from center, plasma-cyan fill growing behind it. Text: 'CHARGING…'.",
    drag: "Item leaves an arc-orange spark trail as it moves.",
    focus: "2px plasma-cyan focus ring with a single 100ms cyan pulse then holds steady.",
    success: "Single arc-orange spark shoots up and fades — brief, electric, satisfying.",
    playing_content: "Electric crackle outline — animated purple-cyan arc perimeter that flickers like a tesla coil.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  ui_style: [
    "Charged glass dark panels",
    "Plasma-cyan glow accents",
    "Arc-orange spark feedback",
    "Electric arc dividers",
    "Tesla coil spiral decoration",
  ],

  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],

  shadows: {
    sm: "0 1px 3px rgba(19,23,32,0.60)",
    md: "0 4px 12px rgba(19,23,32,0.70), 0 0 0 1px rgba(95,39,205,0.04)",
    lg: "0 10px 32px rgba(19,23,32,0.80), 0 0 0 1px rgba(95,39,205,0.06)",
    electric: "0 0 20px rgba(72,219,251,0.40), 0 0 40px rgba(95,39,205,0.20)",
    plasma: "0 0 30px rgba(72,219,251,0.50), 0 0 60px rgba(72,219,251,0.20)",
    notes: "Shadows are thunder-dark tinted with purple undertone. The 'electric' and 'plasma' shadow tokens are for active/featured items only.",
  },

  cards: {
    elevation: "md",
    padding: "16px",
    border_radius: "8px",
    border: "1px solid #3A4556",
    background: "#1A1F2E",
    notes: "Charged-glass dark panels with arc-line borders. Featured cards gain a 1px plasma-cyan border and the electric shadow on hover.",
  },

  buttons: {
    primary:   { bg: "#5F27CD", text: "#F5F6FA", radius: "4px", notes: "Electric purple fill, flash-white text, all caps Exo 2 700." },
    secondary: { bg: "transparent", text: "#48DBFB", radius: "4px", notes: "1px plasma-cyan border, cyan text — plasma ghost button." },
    danger:    { bg: "#FF3B3B", text: "#FFFFFF", radius: "4px", notes: "Short circuit red for destructive actions." },
    ghost:     { bg: "transparent", text: "#3A4556", radius: "4px", notes: "Arc-line text, no border — low-priority actions." },
    link:      { bg: "transparent", text: "#48DBFB", radius: "0", notes: "Cyan underline on hover. Inline in body copy only." },
    icon:      { bg: "#252B3B", text: "#48DBFB", radius: "4px", notes: "Arc-field surface, plasma-cyan icon; active state flips to electric-purple icon." },
    spark:     { bg: "#EE5A24", text: "#F5F6FA", radius: "4px", notes: "Arc-orange fill for spark CTA — attention-grabbing discharge button." },
    fab:       { bg: "#48DBFB", text: "#131720", radius: "50%", notes: "Circular floating action button with plasma shadow." },
  },

  forms: {
    inputs: "Charged-glass fill (#1A1F2E), 1px arc-line border, 4px radius, 12px padding. Focus border shifts to plasma-cyan.",
    checkboxes: "Sharp square, cyan check, 100ms fill animation with small spark.",
    switches: "Rectangular pill track in arc-field, thunder-dark knob, glows cyan when on.",
    dropdowns: "Dark dropdown on charged-glass surface with arc-line border; active option highlighted in arc-field with cyan border.",
    validation: "Inline below field; error = short-circuit red, success = charge green, copy is direct and brief.",
  },

  tables: {
    headers: "Russo One uppercase on arc-field (#252B3B) header row, flash-white text.",
    hover: "Row surface shifts one step brighter to #2A3142.",
    sorting: "Small sharp chevron in plasma-cyan.",
    striping: "Alternate rows use surface_alt (arc-field #252B3B).",
  },

  navigation: {
    sidebar: "Thunder-dark panel, 1px arc-line right border, active item on arc-field with left plasma-cyan 3px indicator bar.",
    topbar: "Storm-dark bar with a bottom 1px plasma-cyan hairline; brand mark left, electric-style icons right.",
    tabs: "Underline-style tabs — active tab has a 2px plasma-cyan underline, no fill.",
    breadcrumbs: "Small Exo 2 crumbs in flash-white, separated by an arc-orange slash (/).",
  },

  dashboard_style:
    "Dense thunder-dark grid with charged-glass stat cards in an asymmetric layout. " +
    "Big Orbitron numerals in flash-white with cyan glow. Electric-purple accents. A single " +
    "power metric per row dominates. Dense but breathable — 24px gaps.",

  component_styles: {
    dialog: "Centered charged-glass modal with plasma-cyan top border strip and arc-line frame. Storm scrim behind.",
    sidebar: "See navigation.sidebar; collapses to 48px icon rail with cyan active dot.",
    carousel: "Poster rail with arc-field track and plasma-cyan scrollbar thumb.",
    search_bar: "Rectangular charged-glass input, arc-line border, Exo 2 placeholder 'Search the charge…'; plasma-cyan search icon.",
    media_player: "Full thunder-dark control bar; plasma-cyan scrubber and progress fill; icon buttons in flash-white, active in cyan.",
    toast: "Sharp pill sliding up from bottom-center; plasma-cyan left border stripe for type indication; flash-white text.",
    chip: "Rectangular chip on arc-field with 1px arc-line border, Exo 2 600; active fills with electric-purple.",
  },

  layout_patterns: {
    dashboard: "Electric hero banner → 4-up stat cards → recent activity table → power rail.",
    settings: "Left electric-style section nav with cyan active indicator → right scrolling form panels, max-width 800px.",
    media_library: "Sticky electric filter bar with plasma-cyan bottom border → auto-fill poster grid on thunder-dark.",
    authentication: "Full-bleed tesla coil backdrop with plasma-cyan radial glow behind a centered charged-glass card.",
    landing: "Full-bleed electric hero with crackling arc → feature pillars → plasma CTA section on charged-glass.",
    detail_view: "Full-bleed lightning still with purple gradient overlay → poster left + metadata right → episode/related rails below.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY
   * ========================================================================== */

  poster_style:
    "Dark one-sheet: thunder-dark background, bold Russo title in flash-white, " +
    "electric purple top border stripe, sharp corners, subtle arc pattern texture.",

  thumbnail_style:
    "8px radius, 1px arc-line border, purple-cyan color grade, title overlay " +
    "in Exo 2 on a bottom-anchored thunder-dark gradient.",

  backdrop_style:
    "Wide cinematic lightning still, deep purple grade, plasma-cyan highlight on " +
    "electric elements, arc-spark texture at 10% opacity.",

  media_cards:
    "Poster fills top two-thirds, charged-glass lower third holds title in Exo 2 " +
    "and runtime in flash-white. Hover lifts card 3px, adds plasma-cyan border glow, " +
    "reveals an arc-orange play button centered on the poster, and shows electric " +
    "crackle outline animation around currently playing content.",

  badges: {
    labels: ["4K", "HDR", "Dolby Vision", "Dolby Atmos", "Continue Watching", "New", "Favorite", "Strike Pick"],
    shape: "Rectangular, 4px radius, 1px border.",
    colors: "Electric-purple for quality (4K/HDR/Atmos), plasma-cyan for status (New/Strike Pick), arc-orange for Continue Watching, storm-dark for Favorite.",
    typography: "Exo 2 600, tracking 0.06em, uppercase, 10–11px.",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  voice: ["Electric", "Powerful", "Direct", "Dynamic", "Transformative"],

  tone: ["Bold", "Confident", "Electric", "Tech-forward"],

  writing_style:
    "Short, punchy, voltage-alert sentences. Active voice. Electric " +
    "metaphors (arc, charge, discharge, voltage, coil, strike). Never soft, " +
    "never corporate, never calm. If it needs five words, use five. " +
    "Power and speed are the personality.",

  vocabulary: [
    "strike", "arc", "charge", "discharge", "voltage", "current", "tesla",
    "plasma", "coil", "spark", "zap", "bolt", "flash", "energy", "power",
    "electrify", "circuit", "field", "potential", "conduct", "spark",
  ],

  avoid_words: [
    "cozy", "warm", "calm", "gentle", "peaceful", "quiet", "cozy",
    "friendly", "delightful", "nice", "fun", "leverage", "synergy",
    "utilize", "seamless", "journey", "ecosystem", "soft", "muted",
  ],

  greetings: [
    "The voltage is rising.",
    "Arc engaged.",
    "The storm is charged.",
    "Ready to strike.",
  ],

  empty_state_messages: [
    "No current here. Add content to complete the circuit.",
    "Dead air. Nothing to discharge — add a library.",
    "The field is quiet. No potential detected yet.",
    "No targets. Start generating.",
  ],

  notification_style: "Brief, electric, one declarative sentence — like a voltage alert. No emojis. Powerful but not aggressive.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE
   * ========================================================================== */

  image_prompt_prefix:
    "High voltage tesla coil discharge in darkness, dramatic lightning bolts across purple sky, " +
    "electric arc paths, plasma ball illumination, purple and cyan neon glow, digital " +
    "electric overlay aesthetic, high contrast cinematic storm photography,",

  image_prompt_suffix:
    ", deep thunder-dark background, electric purple and plasma cyan, orange spark accents, " +
    "arc patterns, cinematic composition, high quality, dramatic electric atmosphere.",

  negative_prompt: [
    "pastel", "soft focus", "warm golden hour", "light background", "white background",
    "blue sky", "sunny", "calm", "peaceful", "warm tones", "cozy",
    "cartoonish", "cute", "gentle", "overcast without drama", "daylight",
    "no lightning", "no electric", "flat design", "corporate clean",
  ],

  ui_generation_rules: [
    "Background is always thunder-dark (#131720) or charged-glass (#1A1F2E).",
    "Maximum three accent colors per screen — purple, cyan, orange.",
    "Primary CTA is always electric purple (#5F27CD) or arc-orange (#EE5A24) — one dominant per screen.",
    "Text is flash-white (#F5F6FA) on dark; never pure white.",
    "Shadows carry thunder-dark purple undertone — never neutral gray.",
    "Use the spacing scale; minimum 24px gap between major sections.",
    "Max content width 1400px; dashboard cards min 200px.",
  ],

  logo_rules: {
    shape: "Russo One wordmark in flash-white or electric purple on thunder-dark; optional lightning bolt arc badge in plasma-cyan.",
    complexity: "Bold and legible at 16px minimum; no thin strokes.",
    negative_space: "At least 16px clearance on all sides of the lockup.",
    colors: "Purple on thunder-dark OR flash-white on charged-glass. Never short-circuit red for the primary mark.",
    allowed_symbols: ["lightning bolt", "electric arc", "tesla coil", "plasma orb", "spark", "voltage symbol", "arc path"],
    forbidden_symbols: ["sun", "moon", "stars without electric context", "calm clouds", "rainbow", "gentle shapes", "warm tones"],
  },

  illustration_prompt_template:
    "{prefix} {subject}, in the Thunder Strike tesla coil aesthetic, {mood}, " +
    "set against a dramatic electric discharge atmosphere {suffix}",

  page_generation_rules: [
    "Hero sections have a full-bleed thunder-dark with electric arc animation and plasma-cyan radial glow.",
    "All cards sit on charged-glass surface with arc-line borders.",
    "CTA buttons are electric-purple or arc-orange, sharp-cornered, uppercase Exo 2 700.",
    "Maximum page width 1400px.",
    "Lead every page with a single dominant visual — arc or plasma orb.",
    "Section dividers use a 1px plasma-cyan diagonal rule or arc-path SVG motif.",
  ],

  prompt_library: {
    logo:
      "Design a Thunder Strike logo: Russo One bold wordmark in flash-white on " +
      "thunder-dark, optional lightning bolt arc badge in plasma-cyan. No sun. No calm.",
    illustration:
      "{image_prompt_prefix} {subject} {image_prompt_suffix}",
    icon:
      "Bold outlined icon of {subject}, 2px stroke, flash-white default with " +
      "plasma-cyan active state, tesla coil electric aesthetic, sharp corners, no soft shapes.",
    background:
      "Thunder-dark surface with subtle electric arc patterns in one corner, " +
      "plasma-cyan glow from arc center, orange spark texture overlay, no warm tones, no sun.",
    landing_page:
      "A Thunder Strike landing page: full-bleed tesla coil hero with crackling arc, " +
      "Russo One headlines in flash-white, electric-purple CTA button, " +
      "charged-glass feature cards, arc-path sections, plasma-style decorative elements.",
    dashboard:
      "A dark media dashboard on thunder-dark with Orbitron stats in flash-white, " +
      "charged-glass cards with plasma-cyan glow edges, sharp corners, Share Tech Mono " +
      "for secondary data, arc sweep decoration on active elements.",
    marketing:
      "A Thunder Strike social graphic for {topic}: Russo One headline in " +
      "electric-purple, dark tesla coil backdrop with lightning, arc-orange accent line, high drama.",
  },

  /* ==========================================================================
   * 17. DESIGN TOKENS
   * ========================================================================== */

  design_tokens: {
    color: {
      "--color-primary": "#5F27CD",
      "--color-secondary": "#48DBFB",
      "--color-tertiary": "#EE5A24",
      "--color-bg": "#131720",
      "--color-surface": "#1A1F2E",
      "--color-surface-alt": "#252B3B",
      "--color-text": "#F5F6FA",
      "--color-text-muted": "#8892A0",
      "--color-border": "#3A4556",
      "--color-success": "#00D26A",
      "--color-warning": "#FFB800",
      "--color-error": "#FF3B3B",
      "--color-info": "#3B82F6",
      "--color-focus": "#48DBFB",
      "--color-shadow": "rgba(19,23,32,0.70)",
      "--color-overlay": "rgba(10,12,16,0.85)",
      "--color-glow": "rgba(72,219,251,0.40)",
      "--color-glow-strong": "rgba(72,219,251,0.60)",
    },
    spacing: {
      "--space-1": "4px",
      "--space-2": "8px",
      "--space-3": "12px",
      "--space-4": "16px",
      "--space-6": "24px",
      "--space-8": "32px",
      "--space-12": "48px",
      "--space-16": "64px",
      "--space-24": "96px",
    },
    radius: {
      "--radius-sm": "2px",
      "--radius-md": "4px",
      "--radius-lg": "8px",
      "--radius-xl": "12px",
      "--radius-pill": "999px",
    },
    typography: {
      "--font-headline": "'Russo One', 'Orbitron', Impact, sans-serif",
      "--font-display": "'Orbitron', 'Russo One', Impact, sans-serif",
      "--font-body": "'Exo 2', system-ui, Roboto, sans-serif",
      "--font-ui": "'Exo 2', system-ui, sans-serif",
      "--font-mono": "'Share Tech Mono', 'Courier New', monospace",
    },
    shadow: {
      "--shadow-sm": "0 1px 3px rgba(19,23,32,0.60)",
      "--shadow-md": "0 4px 12px rgba(19,23,32,0.70), 0 0 0 1px rgba(95,39,205,0.04)",
      "--shadow-lg": "0 10px 32px rgba(19,23,32,0.80), 0 0 0 1px rgba(95,39,205,0.06)",
      "--shadow-electric": "0 0 20px rgba(72,219,251,0.40), 0 0 40px rgba(95,39,205,0.20)",
      "--shadow-plasma": "0 0 30px rgba(72,219,251,0.50), 0 0 60px rgba(72,219,251,0.20)",
    },
  },

  /* ==========================================================================
   * 18. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  responsive_behavior: {
    desktop:
      "Multi-column poster rails, hover glow affordances on all cards, max 1400px content. " +
      "Sidebar always expanded. Full-viewport electric hero at full height.",
    tablet:
      "2–3 column grids, larger touch targets (min 48px), collapsible sidebar to icon rail. " +
      "Hero scales to 60vh. Cards drop to two-per-row on 768px break.",
    tv:
      "10-foot UI: Russo One headlines at 48px+, D-pad focus ring in plasma-cyan at 3px, " +
      "plasma glow on focused card scales to 100%. Full-screen backdrop, 4-column poster grid.",
    mobile:
      "Single column, bottom icon nav bar on charged-glass, full-width poster cards, " +
      "sticky plasma-cyan play bar at bottom. Hero collapses to 40vh. Typography minimum 16px body.",
  },

  /* ==========================================================================
   * 19. SOUND IDENTITY
   * ========================================================================== */

  sound_identity: {
    startup_chime: "Electric hum building to a crack — tesla coil charging then discharge over 1.5s. Storm approaching.",
    notification: "Short electric zap — a 50ms high-frequency ping, crisp and immediate.",
    ui_click: "Dry sharp tick — like a circuit completing. 20ms, no reverb.",
    success: "Power surge confirmation — a single electric crackle, then a rolling arc hum. Satisfying.",
    error: "Short circuit buzz — a flat harsh static tone. Urgent, not scary.",
  },

  /* ==========================================================================
   * 20. SEASONAL VARIANTS
   * ========================================================================== */

  seasonal_variants: [
    {
      name: "Storm Season",
      active_range: "06-01..11-30",
      overrides: {
        "--color-primary": "#5F27CD",
        "--color-secondary": "#48DBFB",
        "--color-glow": "rgba(72,219,251,0.50)",
      },
      motif: "Full storm discharge — the arc becomes a full lightning bolt; plasma core intensifies.",
    },
  ],

  seasonal_activation: {
    mode: "documented",
    motif_assets: [
      "img/seasonal/full-bolt.svg",
    ],
    banner: "Storm season is active — the voltage is at maximum.",
  },

  /* ==========================================================================
   * 21. ACCESSIBILITY
   * ========================================================================== */

  accessibility: {
    minimum_contrast:
      "WCAG AA required: flash-white (#F5F6FA) on thunder-dark (#131720) = 16.1:1. " +
      "Electric purple (#5F27CD) on thunder-dark = 5.8:1 (passes AA). " +
      "Plasma cyan (#48DBFB) on thunder-dark = 5.3:1 (passes AA). " +
      "Verify purple and cyan on charged-glass combinations individually.",
    focus_style:
      "2px solid plasma-cyan (#48DBFB) focus ring, 2px offset on dark surfaces. " +
      "Single cyan pulse (100ms glow expand) then holds steady. Always visible.",
    touch_target: "Minimum 44×44px; 48×48px recommended for tablet and TV.",
    motion_reduction:
      "Honor prefers-reduced-motion: replace arc animations with a static plasma glow, " +
      "replace zap transitions with a 200ms cross-fade, replace electric crackle with a simple glow, " +
      "keep cyan focus pulse. Reduce animation intensity by 50%.",
    font_scaling:
      "Layouts must remain usable at 200% text zoom. Russo One headlines may clip at 250%+ " +
      "on mobile — acceptable trade-off for electric weight at normal zoom.",
  },

  /* ==========================================================================
   * 22. DO / DON'T
   * ========================================================================== */

  do_dont: {
    colors: {
      do: [
        "Use thunder-dark (#131720) for all backgrounds",
        "Reserve plasma cyan for hover states and glows",
        "Use arc orange sparingly for spark feedback",
        "Tint all shadows with thunder-dark purple undertone",
      ],
      dont: [
        "Use white, cream, or light-mode backgrounds",
        "Place short-circuit red and purple side-by-side with equal emphasis",
        "Use cool gray or blue-tinted shadows",
        "Use warm orange-red tones outside the arc-orange family",
      ],
      reason: "The Thunder Strike brand power comes from the contrast between deep electric darkness and the vivid plasma-cyan and arc-orange discharge. Diluting that contrast kills the energy.",
    },
    typography: {
      do: [
        "Use Russo One in uppercase for every headline",
        "Use Exo 2 for all UI labels",
        "Maintain minimum 400 weight on dark surfaces",
        "Keep tracking tight on headlines for electric-alert punch",
      ],
      dont: [
        "Use light-weight (100–300) fonts on dark backgrounds",
        "Use script, handwriting, or decorative display faces",
        "Use centered body copy — left-align for electric efficiency",
      ],
      reason: "Bold type carries the storm's authority — thin type reads as fragile and off-brand.",
    },
    layout: {
      do: [
        "Use diagonal arc compositions and spark visual rhythms",
        "Give 24px minimum gaps between major sections",
        "Lead hero sections with a full-bleed electric arc backdrop",
      ],
      dont: [
        "Crowd multiple purple CTAs into a single view",
        "Exceed 1400px content width",
        "Use light-colored section backgrounds as scene breaks",
      ],
      reason: "Scarcity of the arc-orange and plasma-cyan accents preserves their impact as the discharge spark.",
    },
    animation: {
      do: [
        "Use sudden, decisive motion — like an arc discharge",
        "Use fast, decisive easing (cubic-bezier 0.19, 1, 0.22, 1)",
        "Respect prefers-reduced-motion; replace arc animation with a static plasma glow",
      ],
      dont: [
        "Use bouncy spring physics — this brand strikes, it does not bounce",
        "Animate more than two elements simultaneously",
        "Use slow, dreamy transitions — the storm moves fast",
      ],
      reason: "Motion must echo the electrical discharge: fast, sudden, and decisive.",
    },
    imagery: {
      do: [
        "Use dark tesla coil and electric arc photography with purple-cyan highlights",
        "Choose images with strong electric light sources",
        "Include signature electric elements (arc, plasma, lightning, spark) in hero art",
      ],
      dont: [
        "Use daylight, sunny, or warm-toned photography",
        "Use calm or gentle imagery",
        "Use stock 'happy people at computer' imagery",
      ],
      reason: "Every image must feel like a high-voltage demonstration — anything else breaks the world.",
    },
    branding: {
      do: [
        "Keep the Russo One wordmark bold and uppercase",
        "Use allowed electric symbols (arc, plasma, lightning, tesla, spark)",
        "Maintain 16px minimum clearance around the lockup",
      ],
      dont: [
        "Stretch, rotate, or recolor the logo outside approved palette",
        "Combine the logo with non-electric decorative symbols",
        "Place the logo on a light or warm background without an approved inversion",
      ],
      reason: "Consistency makes the brand recognizable — breaking it erodes the earned electric identity.",
    },
    icons: {
      do: [
        "Use bold outlined icons, 2px stroke weight",
        "Apply plasma-cyan for active/selected icon states",
        "Use arc-orange for interaction feedback states",
      ],
      dont: [
        "Use thin hairline icon sets",
        "Use rounded soft-style icon families",
        "Use filled icons as the default state",
      ],
      reason: "Icon weight must match the typographic gravity — lightweight icons undercut the electric authority.",
    },
    copywriting: {
      do: [
        "Write short, punchy, voltage-alert sentences",
        "Use electric vocabulary (arc, charge, discharge, voltage, strike)",
        "End empty-state messages with a direct call to action",
      ],
      dont: [
        "Use softening words (cozy, gentle, calm, peaceful)",
        "Use corporate filler (leverage, synergy, ecosystem)",
        "Add exclamation marks to routine notifications",
      ],
      reason: "The brand's voice is the thunder strike — fast, powerful, and precise.",
    },
    ux: {
      do: [
        "Make the primary play/action target impossible to miss — purple on thunder-dark",
        "Confirm destructive actions with a direct single dialog",
        "Surface the most-played content in the electric hero",
      ],
      dont: [
        "Hide primary actions behind menus or icon-only buttons",
        "Add unnecessary confirmation steps to non-destructive actions",
        "Interrupt viewing with optional-feature modals",
      ],
      reason: "Power users who choose this brand expect direct access — friction is disrespect.",
    },
    performance: {
      do: [
        "Lazy-load posters with a thunder-dark placeholder",
        "Use CSS box-shadow for plasma glows — do not use glow images",
        "Preload the above-fold hero backdrop",
        "Use CSS animations over JS-driven animation for ambient effects",
      ],
      dont: [
        "Ship unoptimized full-resolution hero images inline",
        "Use SVG glow filters on large areas",
        "Block render on web font load — use font-display: swap",
      ],
      reason: "A dark high-contrast brand with heavy imagery has outsized load risk — optimization is non-negotiable.",
    },
  },

  /* ==========================================================================
   * 23. SITE ARCHITECTURE
   * ========================================================================== */

  site_architecture: {
    nav: [
      { id: "home",     label: "Strike",      emphasis: "default" },
      { id: "features", label: "Power",       emphasis: "primary" },
      { id: "clients",  label: "Network",    emphasis: "default" },
      { id: "download", label: "Download",    emphasis: "primary" },
      { id: "hub",      label: "Relay",       emphasis: "default" },
      { id: "about",    label: "About",       emphasis: "muted" },
    ],
    demoted_pages: [
      { id: "plugins", reason: "Advanced capability — accessible from the features page for deep hunters." },
      { id: "docs",    reason: "Technical reference accessible from the footer for those who want the specs." },
    ],
    extra_pages: [],
    footer_arrangement: "mirror-nav",
  },

  /* ==========================================================================
   * 24. EXPERIENCE OVERRIDES
   * ========================================================================== */

  experience_archetype: "immersive",

  homepage_narrative: {
    arc: "electric-first",
    logline: "The storm is your library — every file generates voltage, and the lightning strikes when you're ready to watch.",
    sections: [
      { id: "discharge",  source: "copy_overlay.hero",     treatment: "Full-bleed electric hero: crackling arc in the background, lightning bolt headline, Arc mascot at bottom-right.", weight: "hero" },
      { id: "voltage",     source: "feature_casting",        treatment: "Four electric features highlighted: Library (arc spin), SyncPlay (synced lightning strike), Transcode (power transformation), Hub (relay across the system).", weight: "major" },
      { id: "charge",      source: "pitch_bullets",          treatment: "Seven pitch bullets in a charged-glass card rail with plasma-cyan hover highlights — each a power data readout.", weight: "major" },
      { id: "spark",       source: "proof_strategy",         treatment: "Real GitHub stats in a tesla coil-style display panel. Plasma-cyan glow on key numbers.", weight: "minor" },
    ],
  },

  proof_strategy: {
    signals: [
      {
        type: "github_stars",
        label: "Stars on GitHub",
        source: "https://github.com/detain/phlix-server",
        display: "github",
      },
      {
        type: "github_issues",
        label: "Open issues",
        source: "https://github.com/detain/phlix-server/issues",
        display: "github",
      },
    ],
    placement: "homepage:minor",
  },

  /* ==========================================================================
   * 25. DYNAMIC STORM INTENSITY
   * ========================================================================== */

  dynamic_intensity: {
    concept: "Storm intensity is a function of content volume — the larger the library, the more intense the electric display.",
    thresholds: [
      { range: "0..100",   level: "quiet",   description: "Ambient hum — low glow, occasional spark" },
      { range: "101..500", level: "active",  description: "Charging — regular arcs, plasma glow building" },
      { range: "501..1000",level: "intense", description: "Discharge — frequent arcs, visible crackling" },
      { range: "1001..",   level: "storm",   description: "Full storm — constant arcs, ambient lightning, thunder rumble shake on interactions" },
    ],
    visual_changes: {
      quiet:   { arc_frequency: "5%",  glow_intensity: "30%", shake_intensity: "0%" },
      active:  { arc_frequency: "15%", glow_intensity: "50%", shake_intensity: "5%" },
      intense: { arc_frequency: "30%", glow_intensity: "70%", shake_intensity: "10%" },
      storm:   { arc_frequency: "50%", glow_intensity: "100%", shake_intensity: "20%" },
    },
  },
};

export default brandKit;
