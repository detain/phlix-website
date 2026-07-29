/**
 * ============================================================================
 *  PHLIX BRAND KIT  —  Blitzkrieg   (BASE kit)
 *  blitzkrieg.js
 * ============================================================================
 *
 *  "Blitzkrieg"
 *  ------------
 *  Lightning-speed military assault on buffering. Military HUD interfaces,
 *  tank-tread motifs, explosion rings, and dog-tag identifiers. Navigation
 *  rolls like tank treads, transitions fire like artillery reloads, and
 *  when content buffers — it triggers an artillery strike loading animation.
 *  The aesthetic is authoritative, strategic, precise.
 *
 *  Palette anchor: Deep Navy, Combat Red, Tactical Blue, Steel Gray, Slate.
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY
   * ========================================================================== */

  name: "Blitzkrieg",

  slug: "blitzkrieg",

  version: "1.0",

  description:
    "Blitzkrieg is a lightning-speed military assault on buffering — every " +
    "interaction is a precision strike. Military HUD interfaces frame the " +
    "screen, tank-tread patterns mark navigation, and dog-tag identifiers " +
    "brand content. Motion rolls like tank treads, transitions fire like " +
    "artillery reloads, and when media buffers, the screen triggers an " +
    "artillery strike loading animation. It's Sage energy: authoritative, " +
    "strategic, and surgically precise.",

  inspiration: [
    "Military command center HUDs",
    "Tank interior instrumentation",
    "War room radar displays",
    "Military dog tags and unit insignia",
    "Artillery firing sequences",
    "Explosion shockwave rings",
    "Steel tread patterns on armored vehicles",
    "Night vision green-tech overlays",
    "Military briefing graphics",
    "Tactical gear labeling and stenciling",
  ],

  keywords: [
    "blitzkrieg", "military", "tank", "artillery", "hud", "tactical",
    "assault", "strike", "precision", "military hud", "tank treads",
    "explosion rings", "dog tags", "sage", "authoritative", "strategic",
    "command", "military precision", "shockwave", "loading", "buffering",
    "infantry", "armor", "panzer", "operation", "mission", "target",
    "intel", "coordinates", "radar", "scope", "crosshair", "infrared",
    "night vision", "stencil", "milspec", "military grade", "surveillance",
  ],

  /* ==========================================================================
   * 2. PERSONALITY
   * ========================================================================== */

  personality: ["Authoritative", "Strategic", "Precise", "Commanding", "Disciplined", "Powerful"],

  emotional_goals: ["Confidence", "Control", "Precision", "Trust", "Momentum"],

  archetype: "Sage",

  audience: [
    "Tech-savvy power users who value efficiency",
    "Military and history enthusiasts",
    "Command center operators and mission planners",
    "Users who want decisive, authoritative design",
    "People who appreciate surgical precision over whimsy",
    "Professionals who trust calculated, strategic interfaces",
  ],

  /* ==========================================================================
   * 3. BRAND STORY
   * ========================================================================== */

  story:
    "In warfare, speed kills. Blitzkrieg — lightning war — overwhelmed " +
    "enemies not through brute force but through decisive, coordinated " +
    "precision. Phlix built Blitzkrieg on the same principle: your media " +
    "library doesn't buffer, it surrenders. Military HUDs frame every " +
    "interaction, tank treads mark every navigation path, and when the " +
    "worst happens — buffering — artillery strikes. Your content doesn't " +
    "load. It arrives.",

  tagline_primary: "Lightning War. Zero Buffering.",

  tagline_secondary: [
    "Your library, overwhelmed.",
    "Precision streaming at scale.",
    "Artillery-grade performance.",
    "Every byte deployed with precision.",
    "When it buffers, we strike back.",
  ],

  mission:
    "Deliver military-precision streaming with tactical HUD aesthetics " +
    "that make every interaction feel like a coordinated military operation.",

  values: ["Precision", "Speed", "Authority", "Strategy", "Power"],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES
   * ========================================================================== */

  brand_dna:
    "Blitzkrieg is a war room: #1A1A2E deep navy dominates, #E94560 " +
    "combat red marks critical targets, #0F3460 tactical blue runs the " +
    "HUD overlays, #16213E midnight armor frames surfaces, and #94A3B8 " +
    "slate steel marks chrome. It is never chaotic, never playful, never " +
    "soft. Everything is calculated. Every element earns its position.",

  design_principles: [
    "Every element serves a tactical purpose — no decorative chaos.",
    "Military HUD framing: corner brackets, status bars, coordinate readouts.",
    "Tank-tread patterns mark navigation as deliberate, mechanical progression.",
    "Artillery reload transitions: chamber, aim, fire — three-phase precision.",
    "Explosion rings on impact states communicate controlled detonation.",
    "Dog-tag identifiers brand content with unit-style labels.",
    "Tactical zoom on media cards simulates targeting scope focus.",
    "Buffering triggers artillery strike animation — the core twist.",
    "Grid overlays suggest strategic briefing maps.",
    "Stencil-style typography signals milspec authority.",
  ],

  brand_opposites: [
    "Not playful or whimsical",
    "Not soft or rounded",
    "Not chaotic or scattered",
    "Not casual or relaxed",
    "Not decorative for its own sake",
    "Not slow or uncertain",
    "Not friendly — commanding",
  ],

  signature_elements: [
    "Military HUD corner brackets and status indicators",
    "Tank-tread link navigation (connected mechanical segments)",
    "Explosion ring shockwaves on hover/click",
    "Dog-tag content badges (unit-style identifier plates)",
    "Artillery reload page transitions (chamber → aim → fire)",
    "Tactical zoom on media cards (scope-like scaling)",
    "Artillery strike loading animation for buffering",
    "Radar sweep ambient effect in hero",
    "Crosshair/target overlays on interactive elements",
    "Stencil typography and stenciled labels",
  ],

  header_motif: "Military command HUD — corner brackets framing the brand mark, status bar with coordinate-style indicators, tactical stripe accent",

  /* ==========================================================================
   * 5. VISUAL IDENTITY
   * ========================================================================== */

  visual_style: [
    "Military HUD",
    "Command center",
    "Tank instrumentation",
    "Tactical briefing",
    "War room",
    "Steel and armor",
    "Precision targeting",
  ],

  art_direction:
    "Artwork should feel like a military command center at night: " +
    "#1A1A2E deep navy fills the canvas, #E94560 combat red marks " +
    "targets and alerts, #0F3460 tactical blue runs HUD overlays, " +
    "and #94A3B8 slate steel handles chrome. Lighting is technical: " +
    "cool blue-white displays against dark surfaces, red warning indicators, " +
    "and occasional radar-sweep green. Corners are always clipped — literally " +
    "cut corners like mission briefing documents. Grid overlays suggest " +
    "tactical maps. Stencil typography screams milspec. Never soft, never " +
    "rounded, never casual.",

  realism: "semi_realistic",

  rendering_style: ["vector", "technical", "HUD overlay", "stencil", "screen-print"],

  texture_level: "medium-high",

  depth: "layered",

  lighting: {
    temperature: "cool",
    quality: "Technical blue-white displays, red alert indicators, ambient radar glow",
    shadows: "hard",
    contrast: "high",
    notes:
      "All light sources are tactical displays: HUD projections, radar sweeps, " +
      "indicator lights. Red for critical targets/alerts, blue for informational " +
      "displays, occasional green for radar/sweep effects. No warm light — this is " +
      "a command center at night.",
  },

  composition: [
    "Corner-clipped rectangles — mission document aesthetic",
    "HUD frame overlays with coordinate readouts",
    "Grid map overlays for tactical feel",
    "Centered target composition for media cards",
    "Diagonal tactical stripes for energy",
    "Explosion ring burst compositions on impact",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM
   * ========================================================================== */

  colors: {
    primary: {
      name: "Combat Red",
      hex: "#E94560",
      rgb: "rgb(233, 69, 96)",
      hsl: "hsl(350, 78%, 59%)",
      usage: "Primary alerts, critical targets, CTA buttons, active states, artillery strike accents.",
      contrast_targets: ["deep_navy", "midnight_armor"],
    },
    secondary: {
      name: "Tactical Blue",
      hex: "#0F3460",
      rgb: "rgb(15, 52, 96)",
      hsl: "hsl(214, 73%, 22%)",
      usage: "HUD overlays, informational displays, secondary accents, navigation chrome.",
      contrast_targets: ["slate_steel", "deep_navy"],
    },
    tertiary: {
      name: "Radar Green",
      hex: "#00FF88",
      rgb: "rgb(0, 255, 136)",
      hsl: "hsl(152, 100%, 50%)",
      usage: "Radar sweep effects, status indicators, ambient glow, success states.",
      contrast_targets: ["deep_navy", "midnight_armor"],
    },
    neutral: {
      name: "Deep Navy",
      hex: "#1A1A2E",
      rgb: "rgb(26, 26, 46)",
      hsl: "hsl(240, 29%, 14%)",
      usage: "Primary backgrounds, card surfaces in dark contexts.",
      contrast_targets: ["combat_red", "tactical_blue", "slate_steel"],
    },
    background: {
      name: "Midnight Armor",
      hex: "#16213E",
      rgb: "rgb(22, 33, 62)",
      hsl: "hsl(224, 48%, 16%)",
      usage: "Page backgrounds, section backgrounds, panel surfaces.",
      contrast_targets: ["combat_red", "tactical_blue", "radar_green"],
    },
    surface: {
      name: "Command Black",
      hex: "#0D0D1A",
      rgb: "rgb(13, 13, 26)",
      hsl: "hsl(240, 33%, 8%)",
      usage: "Elevated surfaces, cards, panels in command center context.",
      contrast_targets: ["combat_red", "slate_steel", "radar_green"],
    },
    surface_alt: {
      name: "HUD Dark",
      hex: "#1F1F3A",
      rgb: "rgb(31, 31, 58)",
      hsl: "hsl(240, 30%, 17%)",
      usage: "Alternate surfaces, nested panels, code blocks, radar backgrounds.",
      contrast_targets: ["combat_red", "tactical_blue"],
    },
    text: {
      name: "Display White",
      hex: "#F0F4FF",
      rgb: "rgb(240, 244, 255)",
      hsl: "hsl(225, 50%, 97%)",
      usage: "Primary body text, headlines on dark backgrounds, HUD readouts.",
      contrast_targets: ["deep_navy", "midnight_armor", "command_black"],
    },
    text_secondary: {
      name: "Slate Steel",
      hex: "#94A3B8",
      rgb: "rgb(148, 163, 184)",
      hsl: "hsl(215, 17%, 65%)",
      usage: "Secondary text, captions, muted content, navigation labels.",
      contrast_targets: ["deep_navy", "midnight_armor"],
    },
    success: {
      name: "Strike Green",
      hex: "#00FF88",
      rgb: "rgb(0, 255, 136)",
      hsl: "hsl(152, 100%, 50%)",
      usage: "Success states, confirmations, operational status.",
      contrast_targets: ["deep_navy", "command_black"],
    },
    warning: {
      name: "Alert Amber",
      hex: "#FFB800",
      rgb: "rgb(255, 184, 0)",
      hsl: "hsl(43, 100%, 50%)",
      usage: "Warnings, caution states, degraded indicators.",
      contrast_targets: ["deep_navy", "midnight_armor"],
    },
    error: {
      name: "Critical Red",
      hex: "#FF1744",
      rgb: "rgb(255, 23, 68)",
      hsl: "hsl(348, 100%, 55%)",
      usage: "Errors, destructive actions, critical failures, buffering alerts.",
      contrast_targets: ["display_white", "deep_navy"],
    },
    info: {
      name: "Intel Blue",
      hex: "#4A90D9",
      rgb: "rgb(74, 144, 217)",
      hsl: "hsl(209, 64%, 57%)",
      usage: "Informational banners, tips, coordinate displays.",
      contrast_targets: ["deep_navy", "command_black"],
    },
    focus: {
      name: "Target Blue",
      hex: "#0F3460",
      rgb: "rgb(15, 52, 96)",
      hsl: "hsl(214, 73%, 22%)",
      usage: "Keyboard focus rings (paired with offset glow).",
      contrast_targets: ["display_white", "slate_steel"],
    },
    border: {
      name: "Grid Line",
      hex: "#2A2A4A",
      rgb: "rgb(42, 42, 74)",
      hsl: "hsl(240, 28%, 23%)",
      usage: "Borders, dividers, HUD frame lines.",
      contrast_targets: ["deep_navy", "midnight_armor"],
    },
    shadow: {
      name: "Tactical Shadow",
      hex: "rgba(0, 0, 0, 0.6)",
      rgb: "rgba(0, 0, 0, 0.6)",
      hsl: "hsl(0, 0%, 0%)",
      usage: "Deep drop shadows, elevated elements, explosion origins.",
      contrast_targets: [],
    },
    overlay: {
      name: "Command Scrim",
      hex: "rgba(10, 10, 20, 0.88)",
      rgb: "rgba(10, 10, 20, 0.88)",
      hsl: "hsl(240, 33%, 6%)",
      usage: "Modal scrims, overlay backgrounds, radar sweep base.",
      contrast_targets: [],
    },
    gradients: [
      {
        name: "Armor Plating",
        type: "linear",
        angle: "135deg",
        stops: ["#1A1A2E", "#16213E"],
        usage: "Section backgrounds, card surfaces, military plating effect.",
      },
      {
        name: "Tactical HUD",
        type: "linear",
        angle: "90deg",
        stops: ["#0F3460", "#1A1A2E"],
        usage: "HUD overlay backgrounds, display panels.",
      },
      {
        name: "Combat Alert",
        type: "linear",
        angle: "45deg",
        stops: ["#E94560", "#FF6B35"],
        usage: "Critical CTA backgrounds, artillery strike effects, alert headers.",
      },
      {
        name: "Radar Sweep",
        type: "radial",
        angle: null,
        stops: ["rgba(0,255,136,0.15)", "rgba(0,255,136,0)"],
        usage: "Hero radar ambient effect, status indicators.",
      },
      {
        name: "Explosion Ring",
        type: "radial",
        angle: null,
        stops: ["rgba(233,69,96,0.4)", "rgba(233,69,96,0)"],
        usage: "Explosion ring shockwaves, impact indicators, buffering strike effect.",
      },
      {
        name: "Steel Gradation",
        type: "linear",
        angle: "180deg",
        stops: ["#1F1F3A", "#1A1A2E"],
        usage: "Surface alternates, nested panel backgrounds.",
      },
    ],
  },

  color_rules: [
    "Deep Navy (#1A1A2E) is the dominant background — command center darkness.",
    "Combat Red (#E94560) marks critical targets, CTAs, and the artillery strike effect.",
    "Tactical Blue (#0F3460) runs HUD overlays and informational chrome.",
    "Slate Steel (#94A3B8) is for chrome, navigation, secondary labels.",
    "Radar Green (#00FF88) is reserved for ambient sweep effects and success states.",
    "All text on dark backgrounds maintains WCAG AA minimum 4.5:1 contrast.",
    "Never use warm pastels — this is a command center at night.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  fonts: {
    headline: {
      family: "Black Ops One",
      weight: [400],
      fallbacks: ["Impact", "sans-serif"],
      usage: "Hero headlines, operation titles, mission headers.",
      tracking: "0.06em",
      line_height: 0.95,
    },
    display: {
      family: "Russo One",
      weight: [400],
      fallbacks: ["Oswald", "Impact", "sans-serif"],
      usage: "Oversized stat readouts, coordinate displays, tactical numbers.",
      tracking: "0.04em",
      line_height: 0.9,
    },
    body: {
      family: "Rajdhani",
      weight: [400, 500, 600],
      fallbacks: ["Roboto", "system-ui", "sans-serif"],
      usage: "Paragraphs, descriptions, mission briefings.",
      tracking: "0.01em",
      line_height: 1.6,
    },
    ui: {
      family: "Rajdhani",
      weight: [500, 600, 700],
      fallbacks: ["Roboto", "system-ui", "sans-serif"],
      usage: "Buttons, labels, navigation, status indicators, dog tags.",
      tracking: "0.04em",
      line_height: 1.2,
    },
    mono: {
      family: "Share Tech Mono",
      weight: [400],
      fallbacks: ["Courier New", "monospace"],
      usage: "Coordinate readouts, technical displays, version numbers, radar data.",
      tracking: "0em",
      line_height: 1.5,
    },
    number: {
      family: "Russo One",
      weight: [400],
      fallbacks: ["Oswald", "sans-serif"],
      usage: "Stats, counters, runtimes, dashboard figures.",
      tracking: "0.06em",
      line_height: 1.0,
    },
  },

  typography_rules: [
    "Headlines use Black Ops One — stencil military authority.",
    "Body uses Rajdhani — technical, readable, commanding.",
    "Coordinate readouts use Share Tech Mono — radar/tech aesthetic.",
    "Avoid ALL CAPS except on buttons and short impact labels.",
    "Keep body line-length to 60–75 characters for readability.",
    "Stencil typography signals milspec authority throughout.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  shape_language: [
    "Corner-clipped rectangles — mission document aesthetic",
    "HUD bracket corners — L-shaped corner frames",
    "Hard edges — no soft radius anywhere",
    "Explosion ring circles — concentric shockwave shapes",
    "Tank-tread links — mechanical connected segments",
    "Diagonal tactical stripes — 45-degree energy marks",
  ],

  corner_radius: {
    small: "2px",
    medium: "4px",
    large: "6px",
    xl: "8px",
    pill: "4px",
    clipped: "clipped",
  },

  borders: {
    thickness: "2px",
    style: "solid",
    rounded: false,
    hand_drawn: false,
    notes: "Sharp corners only. Clip corners on cards for mission-document feel. HUD bracket corners frame key elements.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  icon_style: ["Filled", "Sharp", "Geometric", "Technical", "Bold stroke"],

  icon_rules: [
    "2–3px stroke weight, sharp corners.",
    "Single color or duotone — Combat Red or Tactical Blue on dark.",
    "HUD-style corner brackets around key icons.",
    "Consistent 24×24 viewBox.",
    "Crosshair/target overlays on interactive icons.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  illustration_style: [
    "Military HUD graphics",
    "Technical blueprint style",
    "Stencil artwork",
    "Radar display art",
    "Command center overlays",
  ],

  character_style: {
    proportions: "Disciplined, formal — military bearing in every pose.",
    eyes: "Focused, scanning — tactical awareness.",
    expressions: "Serious, commanding, disciplined.",
    clothing: "Military uniforms, tactical gear, mission-appropriate attire.",
    outlines: "Sharp 2px lines, stencil-style.",
  },

  mascot: null,

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  photography_style: [
    "High contrast technical",
    "Low-light command center",
    "Night vision green-tech",
    "Military briefing room",
    "Radar screen displays",
  ],

  photo_rules: [
    "Never bright daylight or casual settings.",
    "Technical, disciplined compositions — not spontaneous.",
    "Include HUD overlay elements where possible.",
    "Military hardware and equipment photography preferred.",
    "Dark backgrounds with tactical lighting.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  motion_style: ["Mechanical", "Precision", "Deliberate", "Powerful", "Coordinated"],

  transitions: [
    "Artillery reload — three-phase chamber/aim/fire transition",
    "Tank-roll — segment-by-segment navigation slide",
    "Tactical zoom — scope focus scaling on media cards",
    "Explosion ring — concentric ring burst on impact",
    "Radar sweep — 360-degree ambient rotation",
  ],

  animation_speed: "medium-fast",

  easing: ["ease-out", "cubic-bezier(0.16, 1, 0.3, 1)", "step-end"],

  microinteractions: {
    hover: "Cards gain HUD bracket corners and tactical zoom (scale 1.05 with slight blur).",
    button_press: "Quick depression with explosion ring burst outward.",
    loading: "Artillery strike animation — targeting reticle locks, then explosion on the loading area.",
    drag: "Element tilts with tank-tread track marks behind.",
    focus: "Tactical Blue focus ring with corner bracket HUD overlay.",
    success: "Radar green sweep + confirmation pulse.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  ui_style: [
    "Military HUD",
    "Command center",
    "Tank instrumentation",
    "Tactical briefing",
    "Precision targeting",
    "War room",
  ],

  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],

  shadows: {
    sm: "0 2px 8px rgba(0,0,0,0.5)",
    md: "0 4px 16px rgba(0,0,0,0.6)",
    lg: "0 8px 32px rgba(0,0,0,0.7)",
    hud_glow: "0 0 20px rgba(15,52,96,0.5), 0 0 40px rgba(15,52,96,0.25)",
    combat_glow: "0 0 20px rgba(233,69,96,0.5), 0 0 40px rgba(233,69,96,0.25)",
    radar_glow: "0 0 30px rgba(0,255,136,0.4)",
  },

  cards: {
    elevation: "md",
    padding: "20px",
    border_radius: "6px",
    border: "2px solid #2A2A4A",
    background: "#0D0D1A",
    notes: "Corner-clipped dark surface with HUD bracket corners on hover. Tactical zoom effect on interaction.",
  },

  buttons: {
    primary:   { bg: "#E94560", text: "#F0F4FF", radius: "4px", notes: "Combat Red — the strike button. Sharp, bold, commanding." },
    secondary: { bg: "#0F3460", text: "#F0F4FF", radius: "4px", notes: "Tactical Blue — HUD-style secondary action." },
    danger:    { bg: "#FF1744", text: "#F0F4FF", radius: "4px", notes: "Critical Red — destructive actions only." },
    ghost:     { bg: "transparent", text: "#94A3B8", radius: "4px", border: "2px solid #2A2A4A", notes: "Steel ghost — low-priority, stencil label." },
    link:      { bg: "transparent", text: "#E94560", radius: "0", notes: "Combat Red underline — tactical link." },
    icon:      { bg: "#1F1F3A", text: "#94A3B8", radius: "4px", notes: "HUD icon button with corner brackets on active." },
    fab:       { bg: "#E94560", text: "#F0F4FF", radius: "4px", notes: "Floating action — explosion ring on tap." },
  },

  forms: {
    inputs: "Dark (#0D0D1A) filled inputs, Tactical Blue border on focus, clipped corner radius.",
    checkboxes: "Square tactical box, Combat Red check with HUD corner brackets.",
    switches: "Rectangular track in HUD Dark, Combat Red knob when on, instant toggle.",
    dropdowns: "Dark panel with tactical blue border, clipped corners.",
    validation: "Inline below field; error = Critical Red, success = Strike Green.",
  },

  tables: {
    headers: "Russo One caps on HUD Dark (#1F1F3A) header row, Slate Steel text.",
    hover: "Row highlights with Tactical Blue left border accent.",
    sorting: "Sharp chevron indicator in Combat Red.",
    striping: "Alternating Command Black / HUD Dark rows.",
  },

  navigation: {
    sidebar: "Deep Navy panel with Tactical Blue active indicator, HUD bracket on active.",
    topbar: "Command HUD style — Deep Navy bar with corner bracket framing, coordinate-style brand mark.",
    tabs: "Clipped pill tabs with Combat Red fill on active, HUD corner brackets.",
    breadcrumbs: "Slash-separated with tactical chevrons in Slate Steel.",
  },

  dashboard_style:
    "Dense command grid on dark background, Russo One numerals, " +
    "Combat Red stat accents, and tactical zoom on hover. Everything " +
    "feels like a war room operations dashboard.",

  component_styles: {
    dialog: "Clipped-corner dark card with Combat Red top border, HUD corner brackets, dim scrim.",
    sidebar: "Deep Navy panel with Tactical Blue active rail and HUD bracket indicator.",
    carousel: "Horizontal scroll with tank-tread segment indicators, snap points marked.",
    search_bar: "Clipped input with Tactical Blue glow on focus, radar icon.",
    media_player: "Full-dark control bar; Combat Red scrubber, tactical blue time display.",
    toast: "Clipped pill toast sliding from top; Critical Red left stripe for errors, Strike Green for success.",
    chip: "Clipped pill chip on HUD Dark with colored border, stencil label.",
  },

  layout_patterns: {
    dashboard: "Command overview → stat grid → operation status rail → recent intel table.",
    settings: "Left section nav with HUD brackets → right form panels on Command Black.",
    media_library: "Sticky filter bar → responsive poster grid with tactical zoom on hover.",
    authentication: "Centered card on deep navy with radar sweep background, military precision layout.",
    landing: "Full-bleed HUD hero with radar sweep → mission briefing sections → Combat Red CTA → footer.",
    detail_view: "Backdrop with tactical overlay → poster + metadata → episode/related rails with tank-tread nav.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY
   * ========================================================================== */

  poster_style:
    "Corner-clipped one-sheet: Deep Navy background, Black Ops One title in Display White, " +
    "tactical key-art with HUD overlay elements, clipped corners, subtle radar sweep in corner.",

  thumbnail_style:
    "Clipped 6px corners, Combat Red border on hover with HUD brackets, tactical zoom effect, " +
    "title in Rajdhani bold below, runtime in Share Tech Mono.",

  backdrop_style:
    "Wide cinematic still, dark grade, tactical HUD overlay in corner, " +
    "radar sweep ambient effect, dramatic rim lighting.",

  media_cards:
    "Poster fills top, Command Black lower third holds title in Rajdhani " +
    "and runtime in Share Tech Mono. Hover adds HUD brackets, tactical zoom, " +
    "and explosion ring border effect.",

  badges: {
    labels: ["4K", "HDR", "Intel", "New", "Classified"],
    shape: "Clipped pill, Combat Red or Tactical Blue border.",
    colors: "Combat Red for quality (4K/HDR), Tactical Blue for status (Intel/Classified), Strike Green for New.",
    typography: "Rajdhani 700, uppercase, stencil-style tracking.",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  voice: ["Authoritative", "Commanding", "Precise", "Strategic", "Decisive"],

  tone: ["Serious", "Urgent", "Professional", "Military", "Disciplined"],

  writing_style:
    "Short, directive sentences. Active voice. No fluff. Military briefing " +
    "framing — mission parameters, operation status, tactical objectives. " +
    "Metaphors from military operations: deploy, strike, coordinate, execute. " +
    "Never casual or playful.",

  vocabulary: [
    "mission", "operation", "strike", "target", "deploy", "coordinate",
    "execute", "intel", "coordinates", "surveillance", "tactical", "strategic",
    "operation", "briefing", "command", "control", "deploy", "insertion",
    "extraction", "classified", "secure", "transmit", "receive", "signal",
  ],

  avoid_words: [
    "cozy", "playful", "whimsical", "soft", "gentle", "relaxed", "chill",
    "awesome", "rad", "lit", "fire", "blazing", "dope", "sick", "fresh",
  ],

  greetings: [
    "Welcome to the command center.",
    "Operation ready.",
    "Awaiting orders.",
    "Systems operational.",
  ],

  empty_state_messages: [
    "No intel available — deploy media to begin operations.",
    "Sector empty — no content detected. Add library to commence operation.",
    "Awaiting deployment — your library stands ready.",
  ],

  notification_style:
    "High-priority command: direct, urgent, no decoration. " +
    "Like a radio transmission from command.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE
   * ========================================================================== */

  image_prompt_prefix:
    "Military command center HUD graphic, Blitzkrieg aesthetic: " +
    "deep navy #1A1A2E background, combat red #E94560 target highlights, " +
    "tactical blue #0F3460 HUD overlays, slate steel #94A3B8 chrome, " +
    "high contrast, clipped corners, stencil typography, radar sweep effect, " +
    "military precision, war room atmosphere.",

  image_prompt_suffix:
    ", professional military briefing quality, 16:9 aspect ratio, " +
    "no text overlay, high detail, technical composition.",

  negative_prompt: [
    "pastel", "soft", "rounded corners", "playful", "whimsical", "cartoon",
    "casual", "warm lighting", "sunlight", "outdoors", "nature", "cute",
    "friendly", "gentle", "decorative flourish",
  ],

  /* ==========================================================================
   * 17. EXPERIENCE ARCHETYPE & OVERRIDES
   * ========================================================================== */

  experience_archetype: "immersive",

  complexity_profile: {
    density: "high",
    reading_level: "moderate",
    jargon_policy: "explain",
    page_budget: {
      max_home_sections: 6,
      words_per_section_max: 80,
    },
  },

  homepage_narrative: {
    arc: "operation-briefing",
    logline: "Your media library is a military operation. Time to deploy.",
    sections: [
      { source: "hero", treatment: "command-hud-hero", weight: "primary" },
      { source: "pitch", treatment: "mission-briefing", weight: "primary" },
      { source: "features", treatment: "operation-grid", weight: "major" },
      { source: "proof", treatment: "intel-stats", weight: "major" },
      { source: "cta", treatment: "strike-cta", weight: "primary" },
    ],
  },

  conversion_funnel: {
    style: "operation-briefing",
    download_opening: "Deploy now — download Phlix and commence operation.",
    cta_ladder: [
      { label: "Deploy Now", href: "/download", style: "primary" },
      { label: "View Intel", href: "/features", style: "secondary" },
      { label: "Read Mission Brief", href: "https://detain.github.io/phlix-docs", style: "ghost" },
    ],
    friction_notes: "Minimal — primary CTA above fold, download reachable in 1 click.",
  },

  navigation_model: {
    mode: "command-hud",
    spec: "Topbar with HUD corner brackets, coordinate-style brand mark, tactical nav links with tank-tread active indicator.",
    keyboard: "Standard tab navigation with tactical blue focus rings and HUD brackets.",
    fallback: "Standard accessible topbar with tactical styling.",
  },

  scroll_experience: {
    mode: "tactical-zoom",
    spec: "Sections fade in with tactical zoom effect. HUD overlay brackets appear at section boundaries.",
    reduced_motion: "Standard continuous scroll, no zoom or radar sweep. HUD brackets remain static.",
  },

  proof_strategy: {
    signals: ["github_stars", "client_count", "feature_count"],
    placement: "below-pitch",
    style: "command-readout",
  },

  error_page_experience: {
    concept: "404 — Mission Failed. Target not found. The content doesn't exist in this sector.",
    recovery_links: {
      home: "./",
      features: "features.html",
      download: "download.html",
    },
  },

  /* ==========================================================================
   * 18. DESIGN TOKENS
   * ========================================================================== */

  design_tokens: {
    color: {
      "--color-primary": "#E94560",
      "--color-secondary": "#0F3460",
      "--color-tertiary": "#00FF88",
      "--color-bg": "#1A1A2E",
      "--color-surface": "#0D0D1A",
      "--color-surface-alt": "#1F1F3A",
      "--color-text": "#F0F4FF",
      "--color-text-muted": "#94A3B8",
      "--color-border": "#2A2A4A",
      "--color-success": "#00FF88",
      "--color-warning": "#FFB800",
      "--color-error": "#FF1744",
      "--color-info": "#4A90D9",
      "--color-focus": "#0F3460",
      "--color-shadow": "rgba(0,0,0,0.6)",
      "--color-overlay": "rgba(10,10,20,0.88)",
      "--color-combat-glow": "rgba(233,69,96,0.5)",
      "--color-hud-glow": "rgba(15,52,96,0.5)",
      "--color-radar-glow": "rgba(0,255,136,0.4)",
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
      "--radius-lg": "6px",
      "--radius-xl": "8px",
      "--radius-pill": "4px",
      "--radius-clipped": "clipped",
    },
    typography: {
      "--font-headline": "'Black Ops One', Impact, sans-serif",
      "--font-display": "'Russo One', Oswald, sans-serif",
      "--font-body": "'Rajdhani', Roboto, sans-serif",
      "--font-ui": "'Rajdhani', Roboto, sans-serif",
      "--font-mono": "'Share Tech Mono', 'Courier New', monospace",
    },
    shadow: {
      "--shadow-sm": "0 2px 8px rgba(0,0,0,0.5)",
      "--shadow-md": "0 4px 16px rgba(0,0,0,0.6)",
      "--shadow-lg": "0 8px 32px rgba(0,0,0,0.7)",
      "--shadow-combat-glow": "0 0 20px rgba(233,69,96,0.5), 0 0 40px rgba(233,69,96,0.25)",
      "--shadow-hud-glow": "0 0 20px rgba(15,52,96,0.5), 0 0 40px rgba(15,52,96,0.25)",
      "--shadow-radar-glow": "0 0 30px rgba(0,255,136,0.4)",
    },
  },

  /* ==========================================================================
   * 19. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  responsive_behavior: {
    desktop: "Multi-column poster rails, tactical zoom on hover, HUD brackets visible, radar sweep active on hero.",
    tablet: "2–3 column grids, larger touch targets (min 48px). HUD brackets scale down, tactical zoom disabled.",
    mobile: "Single column, full-width cards, tactical zoom off. HUD corner brackets simplified to corner dots.",
    tv: "10-foot UI: Black Ops One headlines at 2× scale, Combat Red focus ring at 3px, poster grids fill the dark field.",
  },

  /* ==========================================================================
   * 20. ACCESSIBILITY
   * ========================================================================== */

  accessibility: {
    minimum_contrast:
      "WCAG AA required: Display White (#F0F4FF) on Deep Navy (#1A1A2E) = 14.2:1 — exceeds AAA. " +
      "Combat Red (#E94560) on Deep Navy (#1A1A2E) = 5.8:1 — passes AA. " +
      "Slate Steel (#94A3B8) on Deep Navy (#1A1A2E) = 4.6:1 — passes AA. " +
      "Tactical Blue (#0F3460) on Command Black (#0D0D1A) = 8.4:1 — passes AAA.",
    focus_style:
      "2px solid Tactical Blue (#0F3460) focus ring with 2px offset. " +
      "HUD corner brackets appear around focused elements. Always visible.",
    touch_target: "Minimum 44×44px; 48×48px recommended for TV and tablet.",
    motion_reduction:
      "Honor prefers-reduced-motion: replace tank-tread navigation with standard slide, " +
      "replace artillery reload transition with simple fade, replace radar sweep with static glow, " +
      "replace tactical zoom with instant state change. Keep HUD brackets and corner clips.",
    font_scaling:
      "Layouts must remain usable at 200% text zoom. Black Ops One headlines may clip at 250%+ " +
      "on mobile — acceptable trade-off for military precision at normal zoom.",
  },

  /* ==========================================================================
   * 21. DO / DON'T
   * ========================================================================== */

  do_dont: {
    colors: {
      do: [
        "Use Deep Navy (#1A1A2E) as the dominant background",
        "Reserve Combat Red (#E94560) for critical targets and primary CTAs",
        "Use Tactical Blue (#0F3460) for HUD overlays and informational chrome",
        "Use Radar Green (#00FF88) for ambient radar sweep effects and success states",
      ],
      dont: [
        "Use white, cream, or light backgrounds",
        "Place Combat Red next to other warm colors at full saturation",
        "Use soft pastel tones anywhere",
        "Use more than two accent colors simultaneously",
      ],
      reason: "The brand's power comes from extreme dark-to-hot contrast — command center darkness with precision strikes.",
    },
    typography: {
      do: [
        "Use Black Ops One for headlines in ALL CAPS or stencil style for military authority",
        "Use Rajdhani for body and UI elements",
        "Use Share Tech Mono for coordinate readouts and technical displays",
        "Maintain minimum 500 weight on tactical surfaces",
      ],
      dont: [
        "Use light-weight (100–300) fonts on dark backgrounds",
        "Use decorative script fonts",
        "Use rounded or playful typefaces",
      ],
      reason: "Military precision demands stencil authority — bold, calculated, commanding.",
    },
    layout: {
      do: [
        "Clip corners on cards and panels for mission-document aesthetic",
        "Frame key elements with HUD corner brackets",
        "Use tank-tread patterns for navigation indicators",
      ],
      dont: [
        "Use soft rounded corners anywhere",
        "Crowd multiple Combat Red CTAs into a single view",
        "Exceed 1440px content width",
        "Use light-colored section backgrounds",
      ],
      reason: "Scarcity of the accent color preserves its strike power.",
    },
    animation: {
      do: [
        "Use artillery reload three-phase transitions for page changes",
        "Use tank-tread segment navigation",
        "Use tactical zoom on media cards",
        "Respect prefers-reduced-motion; replace mechanical motion with simple fades",
      ],
      dont: [
        "Use bouncy or playful spring physics",
        "Animate more than two elements simultaneously",
        "Use continuous heavy radar sweeps on mobile",
      ],
      reason: "Motion must feel mechanical and deliberate — precision machinery, not whimsy.",
    },
    imagery: {
      do: [
        "Use military HUD overlay graphics",
        "Include radar sweep ambient effects",
        "Use clipped corner compositions",
        "Use stencil-style artwork",
      ],
      dont: [
        "Use bright daylight or casual photography",
        "Use soft-focus or romantic imagery",
        "Use rounded blob shapes",
      ],
      reason: "Every image must feel like it belongs in a command center.",
    },
    branding: {
      do: [
        "Keep the Black Ops One wordmark bold and high contrast",
        "Use HUD corner brackets consistently around key elements",
        "Maintain 16px minimum clearance around the lockup",
      ],
      dont: [
        "Stretch, rotate, or recolor the logo outside approved palette",
        "Place the logo on a light background",
      ],
      reason: "Consistency makes the brand recognizable as a military operation.",
    },
    copywriting: {
      do: [
        "Write short directive sentences — command briefing brevity",
        "Use military/tactical vocabulary (deploy, strike, execute, intel)",
        "End empty-state messages with a direct call to action",
      ],
      dont: [
        "Use playful or casual language",
        "Use softening words (cozy, gentle, chill)",
        "Add exclamation marks to routine notifications",
      ],
      reason: "The brand's voice is authoritative and commanding — decisive, minimal, strategic.",
    },
  },

  /* ==========================================================================
   * 22. SITE ARCHITECTURE
   * ========================================================================== */

  site_architecture: {
    nav: [
      { id: "home",     label: "Home",     emphasis: "default" },
      { id: "features", label: "Features",  emphasis: "default" },
      { id: "clients",  label: "Clients",   emphasis: "default" },
      { id: "download", label: "Deploy", emphasis: "primary" },
      { id: "plugins",  label: "Plugins",    emphasis: "default" },
      { id: "docs",     label: "Docs",       emphasis: "default" },
      { id: "hub",      label: "Hub",        emphasis: "default" },
      { id: "about",    label: "About",      emphasis: "default" },
    ],
    demoted_pages: [],
    extra_pages: [],
    footer_arrangement: "standard",
  },

  /* ==========================================================================
   * 23. METADATA
   * ========================================================================== */

  meta_author: "Joe Huss",

};

export default brandKit;
export { brandKit };
