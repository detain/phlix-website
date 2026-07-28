/**
 * ============================================================================
 *  PHLIX BRAND KIT  —  Velocity Rush   (BASE kit)
 *  velocity-rush.js
 * ============================================================================
 *
 *  Speed lines and motion blur conveying fast, responsive streaming across
 *  devices. Racing light trails, aerodynamic shapes, blur-to-focus on scroll,
 *  elastic snap-back on hover, parallax racing stripes. The twist: device
 *  sync status shown as a "lap time" counter.
 *
 *  Palette: #00F5FF (cyan) · #FF2D55 (hot pink) · #1C1C1E (dark) · #FF9500 (orange) · #30D158 (green)
 *
 *  Usage:
 *      import brandKit from './brand-kits/velocity-rush.js'
 *      import { brandKit } from './brand-kits/velocity-rush.js'
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY
   * ========================================================================== */

  name: "Velocity Rush",

  slug: "velocity-rush",

  version: "1.0",

  description:
    "Velocity Rush is the pure sensation of motion translated into a media " +
    "identity — electric cyan cutting through darkness, hot pink energy trails " +
    "streaking across the screen, and the precision of a racing HUD. It feels " +
    "fast before you press play: a blur-to-focus reveal on scroll, elastic " +
    "snap-back on hover, and a lap-time counter telling you exactly how fast " +
    "your library syncs. This is media that keeps up.",

  inspiration: [
    "Motion blur photography at race tracks",
    "Neon city streets at night with car light trails",
    "Aerodynamic supercar design language",
    "Racing game HUD overlays and telemetry",
    "Long-exposure speed photography",
    "Sports broadcast motion graphics",
    "Night highway light streaks",
    "Formula 1 DRS zone overtakes",
    "Esports player overlays and stat counters",
    "Action camera POV footage",
  ],

  keywords: [
    "speed", "velocity", "fast", "rush", "motion", "blur", "streak", "trail",
    "racing", "cyan", "electric", "neon", "hot-pink", "dynamic", "kinetic",
    "aerodynamic", "streamlined", "responsive", "lightning", "nitro",
    "boost", "sprint", "launch", "dash", "blur-to-focus", "elastic",
    "snap-back", "lap-time", "hud", "telemetry", "racing-stripes",
    "speed-lines", "light-trails", "night-ride", "dark", "cinematic",
    "immersive", "full-bleed", "glow", "pulse", "heartbeat", "sync",
    "device-sync", "twitchy", "snappy", "instant", "zero-lag",
  ],

  /* ==========================================================================
   * 2. PERSONALITY
   * ========================================================================== */

  personality: ["Electric", "Fast", "Precise", "Kinetic", "Responsive", "Rebellious"],

  emotional_goals: ["Excitement", "Adrenaline", "Confidence", "Flow State", "Impatience with slow"],

  archetype: "Outlaw",

  audience: [
    "Gamers and esports fans who expect zero lag",
    "Tech-savvy streamers who demand responsiveness",
    "Users with large libraries who want instant access",
    "Action and sports fans who watch at speed",
    "Performance-minded users who optimize everything",
    "Viewers who hate buffering and love fast UI",
  ],

  /* ==========================================================================
   * 3. BRAND STORY
   * ========================================================================== */

  story:
    "It starts the moment you press play. No loading screen, no spinner, no " +
    "buffering wheel. Your library appears in a blur-to-focus reveal — like a " +
    "camera panning to catch a moving subject, sharp the instant it arrives. " +
    "Velocity Rush was born from that demand: media that matches your pace, " +
    "not one that makes you wait for it. Phlix wearing Velocity Rush is a " +
    "racing driver at the grid — every millisecond accounted for, every frame " +
    "ready to go. Your sync status isn't a progress bar; it's a lap time. " +
    "How fast can your library get from your server to your screen? Let's find out.",

  tagline_primary: "Zero to Play. Zero Wait.",

  tagline_secondary: [
    "Your library doesn't wait. Neither do we.",
    "Speed is the feature.",
    "Fast access. Full throttle. No brakes.",
    "Lap time: synced.",
  ],

  mission:
    "Make every media experience feel instant and kinetic — a blur-to-focus " +
    "reveal that respects that your time is worth not waiting.",

  values: ["Speed", "Responsiveness", "Precision", "Flow", "Performance"],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES
   * ========================================================================== */

  brand_dna:
    "Velocity Rush is the sensation of speed made visual. Electric cyan is the " +
    "primary energy color — like a nitrous flare through darkness. Hot pink " +
    "provides the adrenaline punch. The experience is always dark, cinematic, " +
    "and glowing — never flat, never slow, never soft.",

  design_principles: [
    "Speed is the first feature — every interaction must feel instantaneous.",
    "Blur-to-focus is the signature reveal — content sharpens into existence.",
    "Elastic snap-back on hover creates a responsive, snappy feel.",
    "Racing stripes and speed lines create motion context without animation.",
    "Dark backgrounds make the glowing accents pop like a night race.",
    "Lap-time counters replace progress bars — precision over percentage.",
    "Full-bleed immersive sections — no borders, no limits, just velocity.",
    "Parallax racing stripes add depth and motion on scroll.",
  ],

  brand_opposites: [
    "Not soft or gentle",
    "Not slow or loading-prone",
    "Not warm or cozy",
    "Not rounded or playful",
    "Not retro or nostalgic",
    "Not minimal or sparse — kinetic, not empty",
    "Not pastel",
  ],

  signature_elements: [
    "Speed streak lines cutting across dark backgrounds",
    "Light trails from racing vehicles",
    "Blur-to-focus reveal effect on content entry",
    "Elastic snap-back microinteractions",
    "Racing stripe parallax layers",
    "Lap-time counter readouts for sync status",
    "Glowing cyan accent pulses",
    "Hot pink energy bursts on interaction",
  ],

  header_motif: "Animated speed/racing HUD with parallax racing stripes — cyan streaks accelerate past on scroll entry, HUD-style telemetry readouts frame the edges",

  /* ==========================================================================
   * 5. VISUAL IDENTITY
   * ========================================================================== */

  visual_style: [
    "Motion-blur kinetics",
    "High-contrast dark cinema",
    "Neon glow on black",
    "Speed-line vector art",
    "Aerodynamic geometry",
  ],

  art_direction:
    "Artwork should feel like a night street race: deep dark backgrounds split " +
    "by streaks of electric cyan light and hot pink energy. Motion blur is " +
    "the dominant visual language — everything moves or implies movement. " +
    "Speed lines radiate from focal points. Light trails streak horizontally " +
    "across compositions. Lighting is dramatic: neon glow against absolute " +
    "darkness, like city lights reflected on wet asphalt. Typography is " +
    "condensed and bold, treated with a slight glow or bloom effect. " +
    "Geometry is aerodynamic and angular — no soft curves. Compositions are " +
    "dynamic, often diagonal or with strong horizontal motion lines. " +
    "Avoid anything that reads as calm, slow, or domestic.",

  realism: "semi_realistic",

  rendering_style: ["vector", "glow effects", "motion-blur", "neon bloom", "photographic composite"],

  texture_level: "subtle",

  depth: "layered",

  lighting: {
    temperature: "cool",
    quality: "Neon glow — electric, directional, high-intensity against deep black.",
    shadows: "hard",
    contrast: "very high",
    notes: "Neon signs and car light trails are the light sources. No warm ambient light. Everything glows or sits in darkness.",
  },

  composition: [
    "Strong horizontal motion lines — speed implied by direction",
    "Dynamic diagonal compositions",
    "Single dominant focal point with speed streaks converging on it",
    "Negative space used as dark road ahead",
    "Parallax depth layers add motion context",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM
   * ========================================================================== */

  colors: {
    primary: {
      name: "Electric Cyan",
      hex: "#00F5FF",
      rgb: "rgb(0, 245, 255)",
      hsl: "hsl(183, 100%, 50%)",
      usage: "Primary CTAs, speed streaks, active states, key accents — the nitrous flare.",
      contrast_targets: ["dark", "surface"],
    },
    secondary: {
      name: "Hot Pink",
      hex: "#FF2D55",
      rgb: "rgb(255, 45, 85)",
      hsl: "hsl(350, 100%, 59%)",
      usage: "Energy accents, hover states, racing highlights, alerts — the adrenaline hit.",
      contrast_targets: ["dark"],
    },
    tertiary: {
      name: "Racing Orange",
      hex: "#FF9500",
      rgb: "rgb(255, 149, 0)",
      hsl: "hsl(36, 100%, 50%)",
      usage: "Secondary energy accent, lap-time counters, warmth in the dark palette.",
      contrast_targets: ["dark"],
    },
    neutral: {
      name: "Night Asphalt",
      hex: "#2C2C34",
      rgb: "rgb(44, 44, 52)",
      hsl: "hsl(240, 8%, 19%)",
      usage: "Muted UI chrome, dividers, secondary text, disabled states.",
      contrast_targets: ["cyan", "text"],
    },
    background: {
      name: "Dark",
      hex: "#1C1C1E",
      rgb: "rgb(28, 28, 30)",
      hsl: "hsl(240, 3%, 11%)",
      usage: "Default page background. The void everything launches from.",
      contrast_targets: ["cyan", "hot-pink", "text"],
    },
    surface: {
      name: "Dark Surface",
      hex: "#2A2A30",
      rgb: "rgb(42, 42, 48)",
      hsl: "hsl(240, 7%, 18%)",
      usage: "Card and panel surfaces — one step lighter than background.",
      contrast_targets: ["text", "cyan"],
    },
    surface_alt: {
      name: "Dark Alt",
      hex: "#363640",
      rgb: "rgb(54, 54, 64)",
      hsl: "hsl(240, 8%, 23%)",
      usage: "Alternate surface for striped rows, nested panels, hover states.",
      contrast_targets: ["text"],
    },
    text: {
      name: "Pure White",
      hex: "#FFFFFF",
      rgb: "rgb(255, 255, 255)",
      hsl: "hsl(0, 0%, 100%)",
      usage: "Primary body and headline text — must pop against dark backgrounds.",
      contrast_targets: ["dark", "surface"],
    },
    success: {
      name: "Sync Green",
      hex: "#30D158",
      rgb: "rgb(48, 209, 88)",
      hsl: "hsl(142, 72%, 50%)",
      usage: "Success states, synced indicators, lap-time achieved — the finish line.",
      contrast_targets: ["dark"],
    },
    warning: {
      name: "Caution Orange",
      hex: "#FF9500",
      rgb: "rgb(255, 149, 0)",
      hsl: "hsl(36, 100%, 50%)",
      usage: "Warnings, caution states — amber, not yet red.",
      contrast_targets: ["dark"],
    },
    error: {
      name: "Alert Red",
      hex: "#FF2D55",
      rgb: "rgb(255, 45, 85)",
      hsl: "hsl(350, 100%, 59%)",
      usage: "Errors, destructive actions — hot pink danger, not cool red.",
      contrast_targets: ["dark"],
    },
    info: {
      name: "Cyan Info",
      hex: "#00B4D8",
      rgb: "rgb(0, 180, 216)",
      hsl: "hsl(189, 100%, 42%)",
      usage: "Informational messages — cooler cyan for context.",
      contrast_targets: ["dark"],
    },
    focus: {
      name: "Focus Cyan",
      hex: "#00F5FF",
      rgb: "rgb(0, 245, 255)",
      hsl: "hsl(183, 100%, 50%)",
      usage: "Keyboard-focus ring — high-visibility electric cyan glow.",
      contrast_targets: ["dark", "surface"],
    },
    border: {
      name: "Subtle Edge",
      hex: "#3A3A44",
      rgb: "rgb(58, 58, 68)",
      hsl: "hsl(240, 8%, 25%)",
      usage: "Default borders and dividers — barely there, never decorative.",
      contrast_targets: ["dark"],
    },
    shadow: {
      name: "Deep Black",
      hex: "#000000",
      rgb: "rgba(0, 0, 0, 0.7)",
      hsl: "hsl(0, 0%, 0%)",
      usage: "Hard drop shadows — deep black, never tinted.",
      contrast_targets: [],
    },
    overlay: {
      name: "Night Scrim",
      hex: "#000000",
      rgb: "rgba(0, 0, 0, 0.85)",
      hsl: "hsl(0, 0%, 0%)",
      usage: "Modal/scrim overlays — near-opaque darkness.",
      contrast_targets: [],
    },
    gradients: [
      {
        name: "Speed Streak",
        type: "linear",
        angle: "135deg",
        stops: ["#00F5FF", "#FF2D55"],
        usage: "Hero section backdrops, CTA button hover glow, accent streaks.",
      },
      {
        name: "Night Road",
        type: "linear",
        angle: "180deg",
        stops: ["#1C1C1E", "#2A2A30", "#1C1C1E"],
        usage: "Background depth layering — dark with subtle surface lift.",
      },
      {
        name: "Cyan Glow",
        type: "radial",
        angle: null,
        stops: ["rgba(0,245,255,0.25)", "rgba(0,0,0,0.0)"],
        usage: "Glow halo behind cyan accents on dark backgrounds.",
      },
      {
        name: "Pink Burst",
        type: "radial",
        angle: null,
        stops: ["rgba(255,45,85,0.3)", "rgba(0,0,0,0.0)"],
        usage: "Energy burst behind hot pink interactive elements.",
      },
    ],
  },

  color_rules: [
    "Backgrounds are always dark (#1C1C1E) or a dark surface — never light.",
    "Electric cyan is the primary accent — use it where the eye must land first.",
    "Hot pink provides energy on hover/interaction — the snap-back color.",
    "Never use more than three accent colors in a single view.",
    "Cyan for primary CTAs, pink for hover states, orange for data readouts.",
    "All shadows are pure black — never tinted, never warm.",
    "Glow effects are welcome — neon bloom reinforces the identity.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  fonts: {
    headline: {
      family: "Barlow Condensed",
      weight: [700, 800],
      fallbacks: ["Oswald", "Impact", "Arial Narrow", "sans-serif"],
      usage: "Primary headlines, hero titles, section headers — bold and condensed for speed.",
      tracking: "-0.01em",
      line_height: 0.95,
    },
    display: {
      family: "Barlow Condensed",
      weight: [800],
      fallbacks: ["Oswald", "Impact", "sans-serif"],
      usage: "Oversized lap-time display numerals, splash hero text, countdown timers.",
      tracking: "-0.02em",
      line_height: 0.88,
    },
    body: {
      family: "Barlow",
      weight: [400, 500],
      fallbacks: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
      usage: "Paragraphs, descriptions, metadata — clean and neutral.",
      tracking: "0em",
      line_height: 1.55,
    },
    ui: {
      family: "Barlow",
      weight: [500, 600],
      fallbacks: ["Inter", "system-ui", "sans-serif"],
      usage: "Buttons, labels, navigation items, chips — precise and functional.",
      tracking: "0.02em",
      line_height: 1.25,
    },
    mono: {
      family: "JetBrains Mono",
      weight: [400, 600],
      fallbacks: ["Fira Code", "Cascadia Code", "Courier New", "monospace"],
      usage: "Lap-time counters, sync status readouts, telemetry data, code.",
      tracking: "0em",
      line_height: 1.5,
    },
    number: {
      family: "Barlow Condensed",
      weight: [700],
      fallbacks: ["Oswald", "Impact", "sans-serif"],
      usage: "Stat counters, bitrate displays, sync numbers.",
      tracking: "0.01em",
      line_height: 1.0,
    },
  },

  typography_rules: [
    "Headlines must be condensed and bold — thin weights are never used for headlines.",
    "ALL CAPS is standard for section headers and short labels.",
    "Body text is never condensed; keep Barlow regular for comfortable reading.",
    "Monospace is the data voice — use JetBrains Mono for all numerical live data.",
    "Maximum line length for body copy is 70 characters.",
    "Never use decorative script or serif fonts.",
    "Glow/bloom effect on large display text is encouraged — like neon signage.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  shape_language: [
    "Sharp parallelograms (racing wedge shape, 6-12 degree slant)",
    "Horizontal speed streaks",
    "Angular badge cutouts",
    "Razor-thin divider lines",
    "Minimal rounded rectangles (tight 4px radius)",
  ],

  corner_radius: {
    small: "2px",
    medium: "4px",
    large: "6px",
    xl: "8px",
    pill: "4px",
  },

  borders: {
    thickness: "1px",
    style: "solid",
    rounded: false,
    hand_drawn: false,
    notes: "Borders are razor-thin. Angular corners, no softness. Use 2px cyan borders for active/selected states, hot pink for hover states.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  icon_style: ["Outlined", "Sharp corners", "Glow effect for active state", "Speed-inspired"],

  icon_rules: [
    "1.5px stroke weight on outlined icons.",
    "Square or angular corners — no rounded icon style.",
    "Single-color: white by default; cyan for active state with glow effect.",
    "Duotone allowed for featured icons using cyan + hot pink.",
    "Avoid any icon that reads as organic, natural, or handcrafted.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  illustration_style: [
    "Speed-line vector art",
    "Motion-blur photography treatment",
    "Neon glow composite",
    "High-contrast halftone on dark",
  ],

  character_style: {
    proportions: "Athletic and dynamic — figures in motion, never static.",
    eyes: "Obscured or intense — focused forward, never distracted.",
    expressions: "Determined, energetic, moving — no hesitation.",
    clothing: "Sporty, active, modern — racing aesthetic, modern athletic wear.",
    outlines: "Hard 1.5px cyan or white outline on dark backgrounds with glow.",
  },

  mascot: {
    name: "Rush",
    species: "Anthropomorphic bolt of electricity / speed streak",
    personality: "Kinetic, impatient, always moving — speaks in split-second timings.",
    description:
      "Rush is a lightning-bolt figure made of speed lines and cyan energy — " +
      "part electrical surge, part racing streak. Rush doesn't walk, Rush " +
      "blurs into position. Every appearance is a motion event.",
    poses: [
      "Zooming into frame from the side",
      "Leaving a light trail as they move",
      "Electric crackle at rest pose",
      "Pointing forward at full speed",
    ],
    expressions: ["Energetic", "Focused", "Electric", "Moving"],
    behavior: {
      placement: "Bottom-right corner as a slim, speed-line figure; appears on Home, Download, and About.",
      idle: "Rush pulses with cyan energy and occasionally crackles — a subtle glow heartbeat. Idle disables under prefers-reduced-motion (Rush simply stands charged but still).",
      tips: [
        { where: "home:#hero",              say: "Zero to play — let's go! Your library's already warmed up." },
        { where: "home:.features-overview", say: "SyncPlay syncs every frame across every device. No more 'wait, what timestamp are you on?'" },
        { where: "download:#server",        say: "One command to rule them all. You're the driver now." },
        { where: "about:.faq-list",         say: "Questions? Fast answers, no pit stops." },
      ],
      easter_interactions: [
        { trigger: "click:5",       react: "Rush leaves a blazing hot-pink speed trail across the entire page and returns with a cyan burst." },
        { trigger: "hover-hold:2s", react: "Rush zooms off and the lap-time counter appears — showing how long you held." },
      ],
      dismiss: "A small 'Rush, cool down' close button tucks them away; dismissal persists via localStorage.",
    },
  },

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  photography_style: [
    "Night street racing with light trails",
    "Long-exposure speed photography",
    "Neon city reflections on wet asphalt",
    "Motion blur panning shots",
    "High-contrast dark with single color pop",
  ],

  photo_rules: [
    "Never use warm, golden-hour tones — all light here is cool or neon.",
    "Motion blur is welcome and encouraged — stillness is not a speed value.",
    "Never use casual lifestyle settings — every context is kinetic and fast.",
    "Convert to high-contrast when saturation would muddy the brand palette.",
    "Crop tight and dynamic — no static symmetrical shots.",
    "Prefer low angle or forward-motion perspectives.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  motion_style: ["Fast", "Kinetic", "Elastic", "Glowing"],

  transitions: [
    "Blur-to-focus reveal (sharpening in)",
    "Speed-line wipe left-to-right",
    "Elastic snap-back on hover (cubic-bezier overshoot)",
    "Parallax racing stripes on scroll",
    "Glow pulse on interaction",
  ],

  animation_speed: "fast",

  easing: [
    "cubic-bezier(0.34, 1.56, 0.64, 1)",  // elastic overshoot for snap-back
    "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // smooth ease-out
    "ease-out",
  ],

  microinteractions: {
    hover: "Cards shift 4px up with a cyan left-border flash and elastic snap-back; shadow intensifies.",
    button_press: "Quick elastic squash to 0.95 then spring back with overshoot.",
    loading: "Lap-timer countdown or speed-line sweep left-to-right with cyan trail.",
    drag: "Item gains a cyan motion-blur trail as it moves; snaps to position with elastic settle.",
    focus: "2px electric cyan focus ring with subtle glow — instant, 60ms max.",
    success: "Green sync checkmark with a lap-time achieved flash and cyan speed-line burst.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  ui_style: [
    "Dark cinematic surfaces",
    "Electric cyan primary accents",
    "Hot pink energy on interaction",
    "Neon glow effects",
    "Speed-inspired angular geometry",
  ],

  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],

  shadows: {
    sm: "0 1px 3px rgba(0, 0, 0, 0.65)",
    md: "0 4px 12px rgba(0, 0, 0, 0.75)",
    lg: "0 12px 32px rgba(0, 0, 0, 0.85)",
    notes: "Shadows are deep black — pure, never tinted. The darkness makes the neon glow pop.",
  },

  cards: {
    elevation: "md",
    padding: "16px",
    border_radius: "4px",
    border: "1px solid #3A3A44",
    background: "#2A2A30",
    notes: "Dark surface with subtle border. Hover state adds a 2px cyan left-border accent, 4px upward translate with elastic snap-back.",
  },

  buttons: {
    primary:   { bg: "#00F5FF", text: "#1C1C1E", radius: "4px", notes: "Electric cyan, sharp corners, bold text — the race-start button." },
    secondary: { bg: "transparent", text: "#00F5FF", radius: "4px", notes: "Cyan border, dark text — functional, glowing." },
    danger:    { bg: "#FF2D55", text: "#FFFFFF", radius: "4px", notes: "Hot pink for destructive actions." },
    ghost:     { bg: "transparent", text: "#FFFFFF", radius: "4px", notes: "1px white border, white text." },
    link:      { bg: "transparent", text: "#00F5FF", radius: "0", notes: "Cyan underline on hover with glow." },
    icon:      { bg: "#2A2A30", text: "#FFFFFF", radius: "4px", notes: "Dark fill, icon turns cyan on hover." },
    fab:       { bg: "#FF2D55", text: "#FFFFFF", radius: "4px", notes: "Floating hot pink action — electric, not soft." },
  },

  forms: {
    inputs: "Dark surface fill, 1px subtle border, 4px radius, 12px padding. Focus ring: cyan with glow. Placeholder text in night asphalt.",
    checkboxes: "Sharp square, cyan check mark with glow, no rounding.",
    switches: "Rectangular track, dark knob, cyan fill when on — like a nitrous switch.",
    dropdowns: "Dark panel menu, subtle separator lines, white text, active item highlighted in cyan.",
    validation: "Inline; error = hot pink, success = sync green, always with a glow prefix.",
  },

  tables: {
    headers: "Barlow Condensed 700, ALL CAPS, night asphalt header row with white text.",
    hover: "Row highlight in dark alt (#363640) — a subtle speed-line trace.",
    sorting: "Sharp angular chevron in cyan.",
    striping: "Alternate rows use surface_alt (dark alt). No warm tones.",
  },

  navigation: {
    sidebar: "Dark panel, razor-thin cyan left-border on active item. Icon + uppercase label.",
    topbar: "Full-width dark bar with racing stripe accent and lap-counter session timer on the right.",
    tabs: "Sharp rectangular tabs; active tab has a cyan bottom bar with glow.",
    breadcrumbs: "Small monospace crumbs separated by a right-chevron in night asphalt.",
  },

  dashboard_style:
    "Dark cinematic grid of stat panels with Barlow Condensed numerals in cyan or white. " +
    "Each panel reads like a HUD overlay: label above, big number center, lap-time subtext. " +
    "Dense but organized — a racing HUD at full speed.",

  component_styles: {
    dialog: "Dark panel centered, night scrim, sharp 4px-radius border. Cyan header accent line with glow.",
    sidebar: "See navigation.sidebar; collapses to icon-only rail.",
    carousel: "Speed-line accent rails. Horizontal scroll at snap points.",
    search_bar: "Full-width dark input with cyan focus glow and search icon. Hint text: 'Find your next speed run...'",
    media_player: "Full-dark control overlay, cyan scrubber with live timestamp and lap-time progress.",
    toast: "Sharp rectangular toast sliding in from top-right with a cyan left-border glow. Never rounded.",
    chip: "2px border chip on dark surface, white text, cyan border on active with glow.",
  },

  layout_patterns: {
    dashboard: "Full-width HUD header → 4-up stat panels → live activity feed → recent content rail.",
    settings: "Left sharp-tab nav + right form panels. Max-width 800px content.",
    media_library: "Sticky filter bar with angular chips → responsive poster grid with speed-line top accent.",
    authentication: "Centered dark card on pure black. Single cyan CTA with glow.",
    landing: "Full-bleed blur-to-focus hero → speed-line feature grid → lap-time stats → cyan CTA strip.",
    detail_view: "Full-bleed dark backdrop → overlaid poster + metadata column → episode grid below.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY
   * ========================================================================== */

  poster_style:
    "Speed-livery treatment: bold condensed title in white, high-contrast dark key art, " +
    "cyan top accent stripe with glow, angular corner crop with no rounding.",

  thumbnail_style:
    "2px radius, 1px subtle border, cool-grade color treatment, " +
    "title overlay in Barlow Condensed 700 on a translucent dark scrim.",

  backdrop_style:
    "Wide cinematic still, cool dark grade, hard vignette to black at edges, " +
    "motion-blur streak effect to suggest speed.",

  media_cards:
    "Poster fills the card, title + year in mono below on a dark panel strip. " +
    "Hover: 4px upward elastic snap-back, cyan left-border flash, play button glows cyan.",

  badges: {
    labels: ["4K", "HDR", "Continue Watching", "New", "Synced", "Fast Access"],
    shape: "Sharp rectangular, 1px border — no rounding.",
    colors: "Cyan for quality (4K/HDR). Hot pink for active states (Continue Watching). Green for Synced.",
    typography: "Barlow Condensed 700, ALL CAPS, tight tracking.",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  voice: ["Electric", "Fast", "Confident", "Kinetic", "Precise"],

  tone: ["Urgent", "Energetic", "Confident", "Technical when needed"],

  writing_style:
    "Short, punchy sentences. Active voice, always. Imperative mood for CTAs. " +
    "Speed and racing metaphors are native vocabulary. " +
    "Numbers and precision are prized — '0.3s sync', 'instant', 'zero wait'. " +
    "Never slow, never vague, never apologetic about demanding speed.",

  vocabulary: [
    "launch", "boost", "nitro", "sync", "lap-time", "zero-to", "flat-out",
    "full-throttle", "top-speed", "redline", "overtake", "racing", "velocity",
    "streak", "trail", "blur", "snap", "elastic", "fast-access", "instant",
  ],

  avoid_words: [
    "cozy", "warm", "gentle", "playful", "nostalgic", "relaxed",
    "leverage", "synergy", "utilize", "seamless", "robust", "journey",
  ],

  greetings: [
    "Launch sequence initiated.",
    "Zero to play in 0.3 seconds.",
    "Velocity engaged. Let's roll.",
  ],

  empty_state_messages: [
    "Nothing in the queue — drop something in and hit the gas.",
    "Library empty — time to fuel up.",
    "No results on this run. New search line.",
  ],

  notification_style:
    "Fast and factual — like a race engineer. State the fact, give the action. No filler.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE
   * ========================================================================== */

  image_prompt_prefix:
    "Velocity Rush night racing aesthetic — dark asphalt background, " +
    "electric cyan and hot pink neon light trails, motion blur speed streaks, " +
    "sharp angular geometry, high contrast, dramatic neon glow against darkness,",

  image_prompt_suffix:
    ", dramatic night racing atmosphere, cool color grade, dynamic horizontal composition, " +
    "cinematic quality, high detail, no warm tones, kinetic energy.",

  negative_prompt: [
    "warm tones", "golden hour", "cozy", "soft", "pastel", "rounded corners",
    "organic", "nature", "watercolor", "hand-drawn", "cartoon", "childish",
    "slow", "calm", "static", "minimal motion", "lifestyle casual",
  ],

  ui_generation_rules: [
    "Background is always dark (#1C1C1E) or dark surface (#2A2A30).",
    "All corners are sharp — maximum 4px radius.",
    "Primary actions are electric cyan; use hot pink for hover states.",
    "Typography is Barlow Condensed for headers, Barlow for body, JetBrains Mono for data.",
    "Maintain minimum 4.5:1 contrast ratio for body text — performance environment.",
    "Spacing is from the scale; no arbitrary values.",
    "Speed-line or neon glow motifs are welcome as subtle background elements.",
    "Blur-to-focus is the signature animation — content sharpens into existence.",
  ],

  logo_rules: {
    shape: "Wordmark in Barlow Condensed 800, optionally inside an angular parallelogram badge with neon glow.",
    complexity: "Two-weight wordmark — 'VELOCITY' heavy, 'RUSH' slightly lighter, or single-weight all caps.",
    negative_space: "The angular cut and glow effects do the visual work — do not crowd it.",
    colors: "Electric cyan on dark black, or white on dark. Hot pink for accent/glow version.",
    allowed_symbols: ["speed line", "lightning bolt", "angular wedge", "racing stripe", "motion blur"],
    forbidden_symbols: ["organic shapes", "film reels", "circular emblems", "gears", "warm tones"],
  },

  illustration_prompt_template:
    "{prefix} {subject}, in the Velocity Rush night racing style, {mood}, set against a " +
    "dark kinetic racing environment with neon cyan and pink light trails {suffix}",

  page_generation_rules: [
    "Every hero section features a full-bleed dark composition with blur-to-focus reveal.",
    "Speed-line accents and racing stripes add motion context to every section.",
    "All cards are dark surfaces with subtle borders.",
    "Data and statistics are presented in monospace type on dark surfaces.",
    "Maximum page width 1440px; content columns at 1200px.",
    "Lap-time counters replace progress bars for sync status.",
  ],

  prompt_library: {
    logo:
      "Velocity Rush logo: 'VELOCITY RUSH' wordmark in Barlow Condensed 800, all caps, " +
      "electric cyan on dark black, inside an angular parallelogram badge with neon glow. Sharp, no rounding. " +
      "Optional speed-line undercut.",
    illustration:
      "{image_prompt_prefix} {subject} {image_prompt_suffix}",
    icon:
      "Sharp speed-inspired icon of {subject}, 1.5px stroke, white or cyan color, " +
      "square corners, no rounding, night racing aesthetic.",
    background:
      "Dark asphalt background with subtle speed-line streaks in the lower third, cyan and pink neon accents, cool and kinetic.",
    landing_page:
      "A night-racing dark landing page: full-bleed hero with motion-blur reveal, " +
      "electric cyan CTA button, angular panel dividers, Barlow Condensed headlines, " +
      "dark surfaces throughout with neon glow.",
    dashboard:
      "A dark cinematic HUD dashboard with Barlow Condensed stat numerals in cyan, " +
      "hot pink accents on active panels, monospace data feeds, sharp grid layout, lap-time readouts.",
    marketing:
      "A night-racing social graphic for {topic}: bold Barlow Condensed headline in white, " +
      "dark background, cyan accent stripe with glow, angular badge design.",
  },

  /* ==========================================================================
   * 17. DESIGN TOKENS
   * ========================================================================== */

  design_tokens: {
    color: {
      "--color-primary": "#00F5FF",
      "--color-secondary": "#FF2D55",
      "--color-tertiary": "#FF9500",
      "--color-bg": "#1C1C1E",
      "--color-surface": "#2A2A30",
      "--color-surface-alt": "#363640",
      "--color-text": "#FFFFFF",
      "--color-text-muted": "#888899",
      "--color-border": "#3A3A44",
      "--color-focus": "#00F5FF",
      "--color-success": "#30D158",
      "--color-warning": "#FF9500",
      "--color-error": "#FF2D55",
      "--color-info": "#00B4D8",
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
    },
    typography: {
      "--font-headline": "'Barlow Condensed', 'Oswald', 'Impact', sans-serif",
      "--font-body": "'Barlow', 'Inter', 'Arial', sans-serif",
      "--font-ui": "'Barlow', 'Inter', system-ui, sans-serif",
      "--font-mono": "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      "--font-weight-headline": "700",
      "--font-weight-display": "800",
    },
    shadow: {
      "--shadow-sm": "0 1px 3px rgba(0,0,0,0.65)",
      "--shadow-md": "0 4px 12px rgba(0,0,0,0.75)",
      "--shadow-lg": "0 12px 32px rgba(0,0,0,0.85)",
    },
    motion: {
      "--duration-fast": "80ms",
      "--duration-base": "150ms",
      "--duration-slow": "300ms",
      "--easing-elastic": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      "--easing-out": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
  },

  /* ==========================================================================
   * 18. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  responsive_behavior: {
    desktop: "Multi-column HUD grid, hover states active, max 1440px content. Full sidebar nav.",
    tablet: "2-column poster grid, collapsible sidebar to icon rail, touch targets min 44px.",
    tv: "10-foot UI: massive Barlow Condensed type, focus-ring navigation prominent in cyan glow, minimal text labels.",
    mobile: "Single column, bottom angular tab bar, full-width poster tiles, cyan sticky play bar.",
  },

  /* ==========================================================================
   * 19. SOUND IDENTITY
   * ========================================================================== */

  sound_identity: {
    startup_chime: "A sharp electric surge — like nitrous arming.",
    notification: "A crisp electronic ping — like a lap-time beep.",
    ui_click: "A quick snap — like a gear shift.",
    success: "A fast ascending three-note tone — lap achieved.",
    error: "A low warning buzz — caution, not alarm.",
  },

  /* ==========================================================================
   * 20. SEASONAL VARIANTS
   * ========================================================================== */

  seasonal_variants: [
    {
      name: "Night Circuit",
      active_range: "09-01..10-31",
      overrides: {
        "--color-primary": "#00FFFF",
        "--color-secondary": "#FF00FF",
      },
      motif: "Deeper neon palette — like Singapore night racing with full neon saturation.",
    },
    {
      name: "Championship Lap",
      active_range: "11-01..11-30",
      overrides: {
        "--color-tertiary": "#FFD700",
        "--color-primary": "#00F5FF",
      },
      motif: "Gold accents as championship highlights. Season finale energy with podium celebration colors.",
    },
  ],

  seasonal_activation: {
    mode: "documented",
    motif_assets: [
      "img/seasonal/night-circuit-glow.svg",
      "img/seasonal/championship-gold.svg",
    ],
    banner: "Championship season active — new lap records available.",
  },

  /* ==========================================================================
   * 21. ACCESSIBILITY
   * ========================================================================== */

  accessibility: {
    minimum_contrast: "WCAG AA (4.5:1 body text, 3:1 large text/UI). Measure actual values — don't trust prose claims.",
    focus_style: "2px electric cyan (#00F5FF) focus ring with glow effect. Never hidden, never animated away.",
    touch_target: "Minimum 44×44px. Prefer 48×48px for primary race-critical actions.",
    motion_reduction: "Honor prefers-reduced-motion: replace blur-to-focus with instant sharp, remove elastic overshoot, keep speed-line accents as static decoration.",
    font_scaling: "Barlow Condensed reflows gracefully to 200% zoom. Monospace data panels must not clip at 150% zoom.",
  },

  /* ==========================================================================
   * 22. SITE ARCHITECTURE
   * ========================================================================== */

  site_architecture: {
    nav: [
      { id: "home",     label: "LAUNCH",     emphasis: "default" },
      { id: "features", label: "SPEED GRID", emphasis: "primary" },
      { id: "clients",  label: "PIT CREW",   emphasis: "primary" },
      { id: "download", label: "GET IN",      emphasis: "primary" },
      { id: "hub",      label: "RELAY",      emphasis: "default" },
      { id: "about",    label: "DATA",        emphasis: "muted" },
    ],
    demoted_pages: [
      { id: "plugins", reason: "Specialist tool — essential but not the main race line.", fold_into: "features" },
      { id: "docs",    reason: "Technical reference lives in the footer, off the fast path." },
    ],
    extra_pages: [],
    footer_arrangement: "mirror-nav",
  },

  homepage_narrative: {
    arc: "feature-first",
    logline: "Zero to play in milliseconds — Phlix is the nitrous for your media library.",
    sections: [
      { id: "launch",       source: "copy_overlay.hero",    treatment: "Full-bleed blur-to-focus hero: speed lines streak across dark, cyan CTA blazes like a race start.", weight: "hero" },
      { id: "speed-grid",   source: "feature_casting",      treatment: "Features as lap-time readouts in mono — SyncPlay and Library as live speed data.", weight: "major" },
      { id: "why-fast",     source: "story",                treatment: "Value props as a 'Performance Specs' grid: sync speed, load time, transcode rate.", weight: "major" },
      { id: "lap-records",   source: "proof_strategy",      treatment: "Trust signals as a HUD telemetry placard: real stats, GitHub activity, architecture highlights.", weight: "minor" },
      { id: "full-throttle", source: "conversion_funnel",    treatment: "Closing CTA banner: 'Hit the gas — get Phlix.' The install one-liner follows.", weight: "major" },
    ],
  },

  page_blueprints: {
    features: {
      template: "speed-dashboard",
      spec: "Eight features as live lap-time readouts — each a monospace stat card with icon, spec, and description. SyncPlay and Library at the top as lead indicators.",
    },
    clients: {
      template: "pit-crew",
      spec: "Each client as a pit-crew member: platform, role, highlights. Focus on the fast ones — Roku, Tizen, Windows.",
    },
    download: {
      template: "race-start",
      spec: "The Download page opens like a race start: 'One command to launch' (server install), then 'Pick your cockpit' (client selector), then ecosystem as support crew.",
    },
    about: {
      template: "telemetry",
      spec: "Philosophy, License, Contributing, and FAQ as telemetry log sections — precise and data-focused.",
    },
  },

  /* ==========================================================================
   * 23. CONTENT CASTING & COPY
   * ========================================================================== */

  feature_casting: {
    hero: [
      { id: "syncplay", angle: "Synced across every device — same frame, same timestamp, zero drift." },
      { id: "library",  angle: "Your library loads before you finish pressing play." },
    ],
    support: ["transcode", "auth", "livetv", "hub"],
    footnote: ["dlna", "plugins"],
    omit_from_home: [],
  },

  copy_overlay: {
    hero: {
      eyebrow: "Zero to play. Zero wait.",
      headline: "Your media. Your library. Your Phlix.",
      subheadline: "An open-source PHP media server that streams to your Roku, Samsung TV, Windows desktop, phone, and any DLNA device — with SyncPlay, Live TV, transcoding, and a hub that follows you anywhere.",
      primary_cta: { label: "Hit the Gas" },
      secondary_cta: { label: "Read the Specs" },
    },
    section_headings: {
      pitch: "Why wait?",
      features: "Speed Grid",
      cta_banner: "Ready to launch?",
    },
    footer_tagline: "Open-source media, full throttle.",
  },

  copy_treatments: {
    pitch_bullets: "spec-rows",
    faq: "telemetry-log",
    clients: "pit-crew",
    ecosystem: "racing-network",
  },

  faq_experience: {
    frame: "telemetry-log",
    persona: "Rush the speed analyst, answering with lap times and sync specs.",
    question_order: ["like-plex", "expose-internet", "formats", "mobile-app", "plugins", "license"],
    extra_questions: [
      { q: "Will this play on my old smart TV?", maps_to: "formats" },
      { q: "Do I need to expose my network?", maps_to: "expose-internet" },
    ],
  },

  persona_vignettes: [
    {
      name: "Sunday Speed Run",
      scene: "The gang's coming over. One tap and the library is live across every screen in the house — synced, no arguments about timestamps.",
      surfaces: ["home hero", "media library grid", "sync status"],
      features_shown: ["library", "syncplay", "hub"],
    },
    {
      name: "Late Night Replay",
      scene: "Phone, tablet, big screen — everyone's rewatching the race replay. The lap-time counter shows everyone's within 0.2 seconds.",
      surfaces: ["media player", "sync status display", "hub connect"],
      features_shown: ["syncplay", "hub", "transcode"],
    },
    {
      name: "Tinkerer's Garage",
      scene: "Plugin goes in, loader picks it up. The telemetry log shows it activated in 0.04 seconds.",
      surfaces: ["plugins panel", "telemetry readout"],
      features_shown: ["plugins", "hub"],
    },
  ],

  /* ==========================================================================
   * 24. INTERACTIVE SURFACES
   * ========================================================================== */

  hero_experience: {
    mode: "blur-reveal",
    spec: "Hero content starts blurred and out of focus. On load/scroll-into-view, content sharpens into focus over 400ms with a subtle cyan glow bloom. Speed lines streak across the background.",
    suggested_inputs: ["scroll position", "page load"],
    fallback: "A static hero with speed-line background decoration and the same headline/CTAs baked in. Sharp, not blurred.",
    js_budget_kb: 5,
  },

  navigation_model: {
    mode: "topbar",
    spec: "A dark topbar with racing stripe accent and the brand lockup. Active link glows cyan.",
    keyboard: null,
    fallback: "The topbar IS the standard accessible nav — a plain <nav> list of the same links, fully keyboard reachable, collapsing to a labeled hamburger menu on mobile.",
  },

  scroll_experience: {
    mode: "continuous",
    spec: "Blur-to-focus on section entry — each section sharpens in as it enters the viewport. Racing stripe parallax in the background creates depth.",
    reduced_motion: "Under prefers-reduced-motion all blur effects are instant sharp. Parallax is disabled. Sections appear immediately without animation.",
  },

  easter_eggs: [
    {
      trigger: "logo-clicks:5",
      effect: "Rush zooms across the screen leaving cyan and pink speed trails. A lap-time badge appears: '5 clicks: 0.00s'.",
      reward_copy: "Zero lag detected. Nice reflexes!",
      exit: "The trails fade after 3s or press Esc.",
    },
    {
      trigger: "typed-word:velocity",
      effect: "The cursor becomes a speed streak and Rush does a fast lap around the viewport.",
      reward_copy: "Velocity confirmed. Top speed engaged.",
      exit: "Press Esc or type any other key.",
    },
  ],

  /* ==========================================================================
   * 25. CONVERSION & PROOF
   * ========================================================================== */

  conversion_funnel: {
    style: "instant-command",
    primary_goal: "Get a first-time user to run the server and see their library.",
    cta_ladder: [
      { step: 1, cta: "Hit the Gas",      target: "download" },
      { step: 2, cta: "Choose Your Ride", target: "clients" },
      { step: 3, cta: "Launch",           target: "download#server" },
    ],
    download_opening: "The Download page opens fast: 'One command to launch' over the install line, then client selector below.",
    friction_notes: "Performance audience — minimal friction. Show the command, show it works, let them go.",
  },

  proof_strategy: {
    signals: [
      { type: "spec-numbers",     format: "A HUD-style placard: 0.3s avg sync time, 4 native clients, HLS + FFmpeg, NTP-style time sync." },
      { type: "github",           format: "A 'from the garage' row linking the real phlix-server repo with live activity links." },
      { type: "architecture",     format: "One-line architecture truth from the docs as a telemetry readout." },
    ],
    placement: "A single 'Lap Records' band between speed grid and the closing CTA.",
  },

  visitor_paths: null,

  /* ==========================================================================
   * 26. EXPERIENCE PROFILE
   * ========================================================================== */

  experience_archetype: "immersive",

  complexity_profile: {
    density: "standard",
    reading_level: "general",
    jargon_policy: "allow",
    page_budget: { home_sections_max: 5, words_per_section_max: 100 },
  },

  intensity_toggle: null,

  error_page_experience: {
    concept: "A 'wrong turn' gag: Rush stands on a dark highway at night, speed lines streaking past, with a 'Wrong exit — this route doesn't exist' message and quick links back to launch.",
    recovery_links: ["home", "features", "download"],
  },

  /* ==========================================================================
   * 27. DO / DON'T
   * ========================================================================== */

  do_dont: {
    colors: {
      do: [
        "Use dark backgrounds throughout",
        "Reserve electric cyan for primary CTAs and key accents",
        "Use hot pink for hover states and energy accents",
        "Add neon glow to cyan and pink elements",
      ],
      dont: [
        "Use warm or golden palettes",
        "Place two cyan CTAs in the same viewport",
        "Use light backgrounds",
        "Use warm-tinted shadows",
      ],
      reason: "Dark and neon is the night-racing identity — warmth breaks the speed illusion.",
    },
    typography: {
      do: [
        "Use Barlow Condensed 700-800 for all headlines",
        "ALL CAPS for section headers and short labels",
        "Use JetBrains Mono for all numerical data and lap-time readouts",
      ],
      dont: [
        "Use thin or light font weights for headlines",
        "Use decorative, script, or serif typefaces",
        "Mix more than two type families",
      ],
      reason: "Condensed bold reads speed; thin reads hesitation.",
    },
    layout: {
      do: [
        "Apply diagonal angular panel cuts",
        "Maintain sharp corners (≤4px radius)",
        "Use speed lines and racing stripes as background elements",
      ],
      dont: [
        "Round corners beyond 4px",
        "Use organic or curved layout dividers",
        "Exceed 1440px content width",
      ],
      reason: "Angular geometry is aerodynamic — everything should feel fast.",
    },
    animation: {
      do: [
        "Keep animations fast: 80-150ms for micro, 300ms max for reveals",
        "Use blur-to-focus for content reveals",
        "Use elastic snap-back for hover interactions",
      ],
      dont: [
        "Use slow dissolves or gentle fades",
        "Use bouncy cartoon easing — elastic is sharp and precise",
        "Animate more than two elements simultaneously",
      ],
      reason: "Motion here is decisive — racing cars don't bounce, they accelerate.",
    },
    imagery: {
      do: [
        "Use dark high-contrast photography with neon accents",
        "Welcome motion blur and speed-line techniques",
        "Use neon glow and light trail composites",
      ],
      dont: [
        "Use warm-toned or golden-hour photography",
        "Use lifestyle or casual imagery",
        "Use soft-focus or low-contrast photography",
      ],
      reason: "Every image must feel like it belongs on a night race track.",
    },
    branding: {
      do: [
        "Keep the angular badge lockup or clean wordmark with glow",
        "Use approved signature elements: speed lines, light trails, blur",
      ],
      dont: [
        "Combine the logo with organic symbols",
        "Recolor outside approved variants (cyan/dark, white/dark, pink/dark)",
        "Soften the geometry with rounding",
      ],
      reason: "The brand must feel fast at any speed.",
    },
    icons: {
      do: [
        "Use 1.5px sharp-cornered outlined icons in white or cyan with glow",
        "Switch to pink filled for active/selected states",
      ],
      dont: [
        "Use rounded-cap or organic icon styles",
        "Use decorative icons in functional UI",
      ],
      reason: "Icons are HUD indicators — they must read instantly.",
    },
    copywriting: {
      do: [
        "Write in short, punchy, active sentences",
        "Use speed/racing vocabulary: launch, sync, lap-time, full-throttle",
        "Lead with the number or the result — '0.3s sync', 'instant load'",
      ],
      dont: [
        "Use warm or cozy language",
        "Use passive voice or hedging",
        "Use corporate filler: leverage, synergy, seamless journey",
      ],
      reason: "Racing doesn't wait — neither does this copy.",
    },
    ux: {
      do: [
        "Make play accessible in one action",
        "Surface lap-time and sync data for advanced users",
        "Keep navigation paths short — maximum two taps to content",
      ],
      dont: [
        "Add confirmation dialogs to fast-path actions",
        "Hide primary content behind deep navigation",
        "Show loading states without speed feedback",
      ],
      reason: "Speed is the promise — every extra tap is a penalty.",
    },
    performance: {
      do: [
        "Lazy-load below-fold imagery",
        "Serve speed-line backgrounds as CSS gradients",
        "Keep JS under 15KB",
      ],
      dont: [
        "Ship large unoptimized hero images",
        "Block the main thread with synchronous fetches",
        "Use heavy blur effects without GPU compositing",
      ],
      reason: "Velocity Rush is a performance identity — the UI must be fast.",
    },
  },

  /* ==========================================================================
   * 28. METADATA
   * ========================================================================== */

  metadata: {
    author: "Phlix Design",
    created: "2026-07-28",
    updated: "2026-07-28",
    license: "Proprietary — Phlix internal use.",
    compatible_models: [
      "claude-opus-4-8",
      "claude-sonnet-4-6",
      "sdxl",
      "flux.1",
    ],
    schema_version: "2.1",
    kit_type: "base",
    notes: "Velocity Rush: speed-first brand kit with motion blur, lap-time counters, and night-racing aesthetics.",
  },
};

// Export (ESM)
export default brandKit;
export { brandKit };
