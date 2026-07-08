/**
 * ============================================================================
 *  PHLIX BRAND KIT  —  midnight-jazz.js   (BASE kit)
 * ============================================================================
 *
 *  "Midnight Jazz"
 *  ---------------
 *  Late-night jazz club — smoky blue atmosphere, warm spotlight pools on dark
 *  stages, upright bass and trumpet silhouettes, brushed drum skins, worn piano
 *  keys. Deep navy/charcoal backgrounds, amber spotlights, cool blue-gray
 *  accents, muted gold. Soulful, intimate, improvisational, timeless.
 *
 *  Usage:
 *      import brandKit from './midnight-jazz.js'
 *      import { brandKit } from './midnight-jazz.js'
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY
   * ========================================================================== */

  name: "Midnight Jazz",

  slug: "midnight-jazz",

  version: "1.0",

  description:
    "A late-night jazz club atmosphere for your media library — deep navy stages, " +
    "warm amber spotlights, the glow of a single lamp over worn piano keys. " +
    "Phlix wrapped in cigarette smoke, brushed brass, and soul.",

  inspiration: [
    "1950s and 60s Blue Note Records album covers",
    "Harlem jazz clubs of the bebop era",
    "Reid Miles graphic design — stark, expressive, typographically bold",
    "Film noir cinematography — chiaroscuro, smoke, wet streets",
    "Miles Davis 'Kind of Blue' liner notes",
    "Coltrane quartet concert photography",
    "West Village basement clubs — low ceilings, candlelit tables",
    "The visual language of jazz festival posters",
  ],

  keywords: [
    "jazz", "midnight", "bebop", "soul", "intimate", "smoky", "atmospheric",
    "dark", "navy", "charcoal", "amber", "spotlight", "stage", "upright-bass",
    "trumpet", "brushed-cymbal", "piano-keys", "muted-gold", "blue-gray",
    "nocturnal", "timeless", "improvisational", "soulful", "late-night",
    "chiaroscuro", "high-contrast", "editorial", "bold-type", "condensed",
    "grain", "analog", "warm-glow", "cool-shadow", "candlelit", "velvet",
    "noir", "urban", "sophisticated", "organic", "unhurried", "expressive",
    "vinyl", "reverb", "resonant", "deep", "layered", "earned",
  ],

  /* ==========================================================================
   * 2. PERSONALITY
   * ========================================================================== */

  personality: ["Soulful", "Sophisticated", "Intimate", "Unhurried", "Expressive", "Timeless"],

  emotional_goals: [
    "Immersion",
    "Calm focus",
    "A sense of discovery",
    "Quiet excitement",
    "The feeling of a private, late-night world",
  ],

  archetype: "Creator",

  audience: [
    "Music and film enthusiasts who value atmosphere",
    "Night-owl cinephiles",
    "Audiophiles with media libraries",
    "Design-conscious streamers",
    "Anyone who owns a record collection and a bottle of something good",
  ],

  /* ==========================================================================
   * 3. BRAND STORY
   * ========================================================================== */

  story:
    "After last call the crowd thins, the bartender kills half the lights, and the " +
    "real music starts. That table in the back — the one with the low lamp and the " +
    "ashtray and a view of the stage — that is where Midnight Jazz lives. It is the " +
    "hour when the set list gets thrown away, when a sideman stretches a solo into " +
    "something nobody planned, when listening becomes a physical act. Phlix in " +
    "Midnight Jazz is that room: every title card a record sleeve, every browse " +
    "session a crate dig, every play button the needle finding its groove.",

  tagline_primary: "Press Play. The Night Starts Now.",

  tagline_secondary: [
    "Your library, after dark.",
    "Every session a different tune.",
    "No set list. Just play.",
    "Deep cuts, deeper atmosphere.",
  ],

  mission:
    "Give every piece of media in your library the stage it deserves — presented " +
    "with the care and atmosphere of a venue where sound truly matters.",

  values: [
    "Atmosphere over decoration",
    "Depth over breadth",
    "Warmth in unexpected places",
    "Earned sophistication",
    "The beauty of imperfection",
  ],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES
   * ========================================================================== */

  brand_dna:
    "Midnight Jazz is a late-night jazz club translated into a media interface. " +
    "It is dark, warm in the right places, and never loud — deep navy and charcoal " +
    "hold the stage, amber spotlights illuminate what matters, cool blue-gray recedes " +
    "into shadow. It is never sterile, never corporate, never cold for the sake of being modern.",

  design_principles: [
    "Darkness is the canvas — light is the message. Only illuminate what earns attention.",
    "Every surface should feel tactile: brushed metal, worn leather, linen stage curtain.",
    "Typography carries the emotional weight — bold, condensed, confident.",
    "Amber is precious: reserve spotlight color for exactly one focal point per view.",
    "Negative space is not emptiness — it is the silence between notes.",
    "The grid may bend; improvise layout like a musician reads the room.",
    "Nothing should feel mass-produced. Slight irregularity is authenticity.",
  ],

  brand_opposites: [
    "Not bright or pastel",
    "Not playful or child-friendly",
    "Not corporate SaaS blue",
    "Not minimalist-cold or clinical white",
    "Not skeuomorphic in a literal sense — evoke texture, do not simulate it",
    "Not loud or attention-demanding",
    "Not fast-food neon",
  ],

  signature_elements: [
    "Amber spotlight cones cutting through dark backgrounds",
    "Upright bass and trumpet silhouettes",
    "Brushed-metal or linen textures in UI surfaces",
    "Bold condensed lettering — like a club marquee",
    "Worn piano key motifs as decorative dividers",
    "Vinyl record label circles as avatar / emblem shapes",
    "Fine horizontal score-line rules between sections",
  ],

  header_motif: "Slow-drift smoke particle animation rising through an amber spotlight",

  /* ==========================================================================
   * 5. VISUAL IDENTITY
   * ========================================================================== */

  visual_style: [
    "Editorial poster design",
    "High-contrast chiaroscuro",
    "Grain and film noise",
    "Geometric type-forward composition",
    "Analog warmth in a dark environment",
  ],

  art_direction:
    "Artwork should feel like a Blue Note Records cover art directed by Reid Miles — " +
    "stark geometric compositions on near-black backgrounds, a single amber or " +
    "warm-gold spotlight illuminating a subject, cool blue-gray shadows filling the " +
    "void. Typography is large, condensed, and authoritative, never decorative. " +
    "Grain is always present — fine and filmic, not heavy. Silhouettes of musicians " +
    "or instruments appear as secondary decorative elements. No gradients for their " +
    "own sake; gradients only as light fall-off from a spotlight source. " +
    "Compositions are asymmetric but balanced — like a live performance capture. " +
    "Avoid anything that reads as digital illustration, flat vector, or cheery.",

  realism: "semi_realistic",

  rendering_style: ["paper grain", "linocut", "halftone", "vector"],

  texture_level: "medium",

  depth: "layered",

  lighting: {
    temperature: "warm",
    quality: "spotlight — pinpoint amber source, deep fall-off",
    shadows: "hard",
    contrast: "high",
    notes:
      "Single-source amber key light with no fill. Shadows are cool blue-gray, " +
      "never pure black. The world is dark; the subject is lit. Think: a trumpet " +
      "player under a club spot, everything else in soft shadow.",
  },

  composition: [
    "Asymmetric balance — weight held by type on one side, image on the other",
    "Strong vertical axis — tall cropped subjects like album cover portraits",
    "Deliberate negative space filled with dark atmosphere, not decoration",
    "Spotlight as compositional anchor — everything radiates from or falls toward it",
    "Foreground/background depth layers separated by value, not color",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM
   * ========================================================================== */

  colors: {
    primary: {
      name: "Amber Spotlight",
      hex: "#E8961F",
      rgb: "rgb(232, 150, 31)",
      hsl: "hsl(36, 82%, 52%)",
      usage:
        "Primary CTAs, active states, progress indicators, the single most " +
        "important element on any given screen. Use sparingly — this is the spotlight.",
      contrast_targets: ["midnight_navy", "stage_charcoal"],
    },
    secondary: {
      name: "Cool Slate",
      hex: "#7A9BB5",
      rgb: "rgb(122, 155, 181)",
      hsl: "hsl(208, 28%, 59%)",
      usage:
        "Secondary actions, links, informational highlights, hover states. " +
        "The blue that lives in the shadows of the club.",
      contrast_targets: ["midnight_navy", "stage_charcoal"],
    },
    tertiary: {
      name: "Muted Brass",
      hex: "#C4A45A",
      rgb: "rgb(196, 164, 90)",
      hsl: "hsl(41, 44%, 56%)",
      usage:
        "Badges, rating accents, star scores, muted decorative accents. " +
        "The worn gold of a trumpet bell under stage light.",
      contrast_targets: ["midnight_navy"],
    },
    neutral: {
      name: "Blue-Gray Smoke",
      hex: "#4A5A6B",
      rgb: "rgb(74, 90, 107)",
      hsl: "hsl(210, 18%, 35%)",
      usage:
        "Muted UI chrome, dividers, secondary text, inactive states, " +
        "the haze between the spotlight and the dark.",
      contrast_targets: ["midnight_navy"],
    },
    background: {
      name: "Midnight Navy",
      hex: "#0D1117",
      rgb: "rgb(13, 17, 23)",
      hsl: "hsl(216, 28%, 7%)",
      usage:
        "Default page background. The stage is always dark. " +
        "This is where everything begins.",
      contrast_targets: ["amber_spotlight", "cool_slate", "linen_white"],
    },
    surface: {
      name: "Stage Charcoal",
      hex: "#1A2230",
      rgb: "rgb(26, 34, 48)",
      hsl: "hsl(218, 30%, 15%)",
      usage:
        "Card and panel surfaces. One step above the void — the polished " +
        "wood of the bar top, the dark velvet of a booth.",
      contrast_targets: ["amber_spotlight", "cool_slate", "linen_white"],
    },
    surface_alt: {
      name: "Deep Indigo",
      hex: "#222E42",
      rgb: "rgb(34, 46, 66)",
      hsl: "hsl(219, 32%, 20%)",
      usage:
        "Alternate surfaces for hover rows, nested panels, table striping. " +
        "A slightly lighter shadow pocket.",
      contrast_targets: ["amber_spotlight", "linen_white"],
    },
    text: {
      name: "Linen White",
      hex: "#EDE8DF",
      rgb: "rgb(237, 232, 223)",
      hsl: "hsl(36, 22%, 90%)",
      usage:
        "Primary body and headline text. Not pure white — warm linen, " +
        "like the pages of old liner notes.",
      contrast_targets: ["midnight_navy", "stage_charcoal"],
    },
    success: {
      name: "Verdant Green",
      hex: "#4CAF82",
      rgb: "rgb(76, 175, 130)",
      hsl: "hsl(152, 40%, 49%)",
      usage: "Success toasts, confirmations, scan completed, track added.",
      contrast_targets: ["midnight_navy"],
    },
    warning: {
      name: "Burnt Ochre",
      hex: "#D4832A",
      rgb: "rgb(212, 131, 42)",
      hsl: "hsl(31, 67%, 50%)",
      usage:
        "Warnings and caution states — a slightly dimmer spotlight. " +
        "Something needs attention but nothing is broken.",
      contrast_targets: ["midnight_navy", "stage_charcoal"],
    },
    error: {
      name: "Crimson Mute",
      hex: "#B03A3A",
      rgb: "rgb(176, 58, 58)",
      hsl: "hsl(0, 50%, 46%)",
      usage:
        "Errors and destructive actions. Not alarm-red — a deep crimson, " +
        "like a 'do not disturb' sign under low light.",
      contrast_targets: ["midnight_navy", "linen_white"],
    },
    info: {
      name: "Cerulean Depth",
      hex: "#3A7BD5",
      rgb: "rgb(58, 123, 213)",
      hsl: "hsl(213, 62%, 53%)",
      usage: "Informational banners, tips, and contextual help callouts.",
      contrast_targets: ["midnight_navy", "linen_white"],
    },
    focus: {
      name: "Amber Focus Ring",
      hex: "#E8961F",
      rgb: "rgb(232, 150, 31)",
      hsl: "hsl(36, 82%, 52%)",
      usage:
        "Keyboard-focus ring — the same amber as the spotlight so focused " +
        "elements literally look lit from above.",
      contrast_targets: ["midnight_navy", "stage_charcoal"],
    },
    border: {
      name: "Slate Hairline",
      hex: "#2E3D52",
      rgb: "rgb(46, 61, 82)",
      hsl: "hsl(215, 28%, 25%)",
      usage:
        "Card borders and dividers. Barely visible against stage charcoal — " +
        "the faint seam between shadows.",
      contrast_targets: [],
    },
    shadow: {
      name: "Indigo Shadow",
      hex: "#080D14",
      rgb: "rgba(8, 13, 20, 0.6)",
      hsl: "hsl(218, 43%, 5%)",
      usage:
        "Drop shadows. Cool, almost-black indigo — never warm, " +
        "never pure black, always slightly blue.",
      contrast_targets: [],
    },
    overlay: {
      name: "Velvet Scrim",
      hex: "#070B12",
      rgb: "rgba(7, 11, 18, 0.75)",
      hsl: "hsl(220, 44%, 5%)",
      usage:
        "Modal scrims and overlay backdrops. The house lights going down " +
        "before the set begins.",
      contrast_targets: [],
    },
    gradients: [
      {
        name: "Spotlight Fall-Off",
        type: "radial",
        angle: null,
        stops: ["rgba(232, 150, 31, 0.22)", "rgba(13, 17, 23, 0.0)"],
        usage:
          "Hero and header backgrounds — a single amber glow fading into midnight. " +
          "Place the center at upper-left or upper-center like a stage spot.",
      },
      {
        name: "Stage Curtain Fade",
        type: "linear",
        angle: "180deg",
        stops: ["rgba(26, 34, 48, 0.0)", "#0D1117"],
        usage:
          "Fade cards and backdrops to the page background — " +
          "the image dissolving into the dark of the stage.",
      },
      {
        name: "Brass Sheen",
        type: "linear",
        angle: "120deg",
        stops: ["#C4A45A", "#8A6D30"],
        usage:
          "Decorative accent on featured elements — a gleam along a badge " +
          "or a trophy icon, like polished brass.",
      },
    ],
  },

  color_rules: [
    "Backgrounds are always deep navy or stage charcoal. Never light.",
    "Amber Spotlight is reserved for exactly one primary CTA or focal point per view.",
    "Never use more than two accent colors simultaneously in a single component.",
    "Shadows and overlays are cool indigo-tinted, never warm.",
    "White text should always be Linen White (#EDE8DF), never pure #FFFFFF.",
    "Muted Brass is for decorative accents only — not interactive elements.",
    "Gradients are light fall-off, not background decoration for its own sake.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  fonts: {
    headline: {
      family: "Barlow Condensed",
      weight: [700, 800],
      fallbacks: ["Oswald", "Franklin Gothic Medium", "Impact", "sans-serif"],
      usage:
        "Page and section headlines, hero titles, club-marquee display text. " +
        "Tall, tight, confident — like letters on a marquee board.",
      tracking: "0.03em",
      line_height: 0.95,
    },
    display: {
      family: "Playfair Display",
      weight: [700, 900],
      fallbacks: ["Georgia", "serif"],
      usage:
        "Oversized pull-quotes, splash text, editorial moments. " +
        "The italic serif of a jazz album's liner-note title.",
      tracking: "0.0em",
      line_height: 1.05,
    },
    body: {
      family: "Inter",
      weight: [400, 500],
      fallbacks: ["Segoe UI", "system-ui", "Helvetica", "sans-serif"],
      usage:
        "Paragraphs, descriptions, metadata, long-form reading. " +
        "Neutral and legible — the liner notes, not the cover.",
      tracking: "0.01em",
      line_height: 1.65,
    },
    ui: {
      family: "Barlow",
      weight: [400, 500, 600],
      fallbacks: ["Inter", "system-ui", "sans-serif"],
      usage:
        "Buttons, labels, navigation, chips, badges, form labels. " +
        "The workhorse sans — clean without being cold.",
      tracking: "0.02em",
      line_height: 1.3,
    },
    mono: {
      family: "JetBrains Mono",
      weight: [400, 600],
      fallbacks: ["Fira Code", "Consolas", "Courier New", "monospace"],
      usage:
        "File paths, technical metadata, codec readouts, timestamps. " +
        "Crisp and readable in low-light.",
      tracking: "0em",
      line_height: 1.55,
    },
    number: {
      family: "Barlow Condensed",
      weight: [700],
      fallbacks: ["Oswald", "Impact", "sans-serif"],
      usage:
        "Stats, counters, runtimes, play counts, dashboard figures. " +
        "Large condensed numerals like a set-list tempo marking.",
      tracking: "0.04em",
      line_height: 1.0,
    },
  },

  typography_rules: [
    "Headlines are always Barlow Condensed — never use body or UI font for headings.",
    "Playfair Display italic is for editorial/display moments only, not navigation.",
    "Avoid all-caps in body copy; ALL CAPS is permitted on short UI labels and buttons.",
    "Never use a font smaller than 13px on dark backgrounds.",
    "Headline tracking (0.03em) is a maximum — tighter is fine, looser is not.",
    "Line-height for dark-background body copy should be 1.6 or above for readability.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  shape_language: [
    "Rectangles with tight to medium radius — instruments and furniture are rectilinear",
    "Circle and oval: vinyl record labels, spotlight cones, avatar frames",
    "Pill shapes for action badges and status chips only",
    "Score-line horizontal rules — thin as a sheet music staff",
    "Angled/diagonal accents: rare, used like a stray spotlight angle",
  ],

  corner_radius: {
    small: "3px",
    medium: "6px",
    large: "12px",
    xl: "20px",
    pill: "999px",
  },

  borders: {
    thickness: "1px",
    style: "solid",
    rounded: true,
    hand_drawn: false,
    notes:
      "Thin, precise borders in Slate Hairline (#2E3D52). No heavy outlines — " +
      "borders should barely whisper. Double-line accents only on featured cards.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  icon_style: ["Outlined", "Duotone", "Filled"],

  icon_rules: [
    "1.5px stroke weight for outlined icons — precise, not chunky.",
    "Square caps and miter joins where natural; rounded joins for organic shapes.",
    "Default color is Cool Slate (#7A9BB5); active/selected state shifts to Amber Spotlight.",
    "Duotone icons only for feature-level icons (primary nav, media type indicators).",
    "Avoid overly literal icons — prefer abstract, clean glyphs over illustrative scenes.",
    "Size grid: 16px micro, 20px default, 24px large, 32px feature.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  illustration_style: [
    "Blue Note Records cover illustration — geometric, stark, expressionist",
    "Jazz festival silhouette poster art",
    "Mid-century editorial ink illustration",
    "High-contrast linocut with limited palette",
  ],

  character_style: {
    proportions:
      "Lean, elongated, stylized — the proportions of a Hirschfeld caricature or " +
      "a Steinberg New Yorker drawing. Not cartoonish; elegantly exaggerated.",
    eyes: "Minimal — a gleam, a shadow. Less is more. No anime detail.",
    expressions:
      "Focused, absorbed, in-the-moment — the face of someone deep in a solo, " +
      "not performing for the crowd.",
    clothing:
      "1950s–60s jazz era: slim lapels, turtlenecks, berets, shirtsleeves rolled " +
      "to the elbow, upright bass under an arm, horn at the lips.",
    outlines:
      "Strong single-weight ink lines, occasionally broken where light hits. " +
      "No fill gradients inside character forms — use flat tones from the palette.",
  },

  mascot: {
    name: "Miles",
    species: "Stylized trumpet silhouette made into a character",
    personality:
      "Cool, unhurried, says exactly what needs to be said and nothing more. " +
      "An old pro who has played every stage and still shows up because the music is worth it.",
    description:
      "A slim art-deco trumpet character with long valves for legs, a bell " +
      "that opens into a gentle knowing smile, and a mute tucked under one arm. " +
      "Rendered in Linen White on Midnight Navy. No eyes — the form is the expression.",
    poses: [
      "Standing at rest with the bell tilted down",
      "Mid-solo — bell raised, angled toward a spotlight",
      "Leaning against a music stand",
      "Taking a bow after the set",
    ],
    expressions: [
      "Resting cool",
      "Mid-phrase (valve engaged)",
      "Post-set exhaustion",
      "Crowd appreciation",
    ],
  },

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  photography_style: [
    "High-contrast black-and-white with selective amber toning",
    "Shallow depth of field — instrument in focus, stage in shadow",
    "Film grain — medium ISO, never digital smooth",
    "Available light only — no artificial studio fill",
    "Stage photography framing: candid performance capture",
  ],

  photo_rules: [
    "Never use bright, clean, studio-lit photography.",
    "Always grade toward the cool-shadow / amber-highlight split.",
    "Film grain should be present; remove digital noise reduction.",
    "Subject should occupy less than half the frame — negative space is key.",
    "No smiling-at-camera stock photography. Candid, absorbed, in-the-moment only.",
    "Avoid color photos unless they are strong enough to anchor the palette; prefer monochrome + amber tone.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  motion_style: ["Slow", "Deliberate", "Smoky", "Cinematic"],

  transitions: [
    "Cross-dissolve",
    "Fade to dark then fade in (like cutting the house lights)",
    "Vertical slide — pages rise from below like a curtain going up",
    "Opacity shift only — no aggressive translate for standard navigation",
  ],

  animation_speed: "slow",

  easing: ["cubic-bezier(0.4, 0, 0.2, 1)", "ease-in-out", "ease-out"],

  microinteractions: {
    hover:
      "Cards lift 1px with a deepened indigo shadow and a faint amber border " +
      "glow — like a spotlight barely touching an edge.",
    button_press:
      "Subtle press to 0.98 scale, no bounce. Deliberate, not playful.",
    loading:
      "Slow-pulse amber spotlight bloom on stage charcoal — the light warming " +
      "up before the musician walks on.",
    drag:
      "Item gains a very faint amber halo and floats at 1.02 scale. Minimal.",
    focus:
      "Amber focus ring fades in over 200ms with a 2px navy offset — " +
      "slow enough to feel intentional.",
    success:
      "Brief amber shimmer across the element, then settles to normal. " +
      "No confetti. No dramatic flourish. A nod.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  ui_style: [
    "Dark-first, always",
    "Spotlight accent — single amber emphasis per view",
    "Editorial type scale — bold condensed over clean sans",
    "Minimal chrome — let content own the screen",
    "Tactile textures: brushed, linen, grain — implied, not literal",
  ],

  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],

  shadows: {
    sm: "0 1px 3px rgba(8, 13, 20, 0.55)",
    md: "0 4px 12px rgba(8, 13, 20, 0.65)",
    lg: "0 12px 32px rgba(8, 13, 20, 0.75)",
    spotlight: "0 0 40px rgba(232, 150, 31, 0.15)",
    notes:
      "All shadows are cool indigo-black, never warm. The spotlight shadow is " +
      "the one warm exception — used for focused/active state glow only.",
  },

  cards: {
    elevation: "md",
    padding: "24px",
    border_radius: "12px",
    border: "1px solid #2E3D52",
    background: "#1A2230",
    notes:
      "Stage Charcoal surface with a hairline border. Hover adds a faint " +
      "amber border glow and a deeper indigo drop shadow.",
  },

  buttons: {
    primary: {
      bg: "#E8961F",
      text: "#0D1117",
      radius: "6px",
      notes:
        "Amber Spotlight on Midnight Navy text. Square-ish radius — " +
        "not a pill, not a rectangle. Confident.",
    },
    secondary: {
      bg: "transparent",
      text: "#7A9BB5",
      radius: "6px",
      notes: "Cool Slate text with 1px Cool Slate border. Ghost-like.",
    },
    danger: {
      bg: "#B03A3A",
      text: "#EDE8DF",
      radius: "6px",
      notes: "Crimson Mute — subdued, not alarming. For destructive actions.",
    },
    ghost: {
      bg: "transparent",
      text: "#EDE8DF",
      radius: "6px",
      notes: "1px Slate Hairline border, Linen White text. Minimal presence.",
    },
    link: {
      bg: "transparent",
      text: "#7A9BB5",
      radius: "0",
      notes: "Underline on hover only. Understated inline action.",
    },
    icon: {
      bg: "#222E42",
      text: "#7A9BB5",
      radius: "6px",
      notes:
        "Square icon button on Deep Indigo. Active state shifts icon to amber.",
    },
    fab: {
      bg: "#E8961F",
      text: "#0D1117",
      radius: "999px",
      notes:
        "The one pill in the system — floating action (play / add). " +
        "Amber spotlight, impossible to miss in the dark.",
    },
  },

  forms: {
    inputs:
      "Stage Charcoal fill, 1px Slate Hairline border, 6px radius, 12px padding. " +
      "Focus shifts border to Amber Spotlight with a faint spotlight glow.",
    checkboxes:
      "Dark fill, amber check when selected, square with 4px radius. Crisp tick.",
    switches:
      "Dark Indigo track, Linen White knob, Amber Spotlight track when on. " +
      "Smooth 200ms transition — not bouncy.",
    dropdowns:
      "Stage Charcoal panel, Slate Hairline borders, Cool Slate caret. " +
      "Selected item highlighted in amber text.",
    validation:
      "Inline, terse copy below the field. Error = Crimson Mute text. " +
      "Success = Verdant Green checkmark. No pop-up modals for validation.",
  },

  tables: {
    headers:
      "Barlow Condensed 700 in Cool Slate, all-caps, on a deep-indigo header row.",
    hover: "Row brightens to Deep Indigo (#222E42) on hover.",
    sorting: "Thin 1px Slate Hairline chevron, turns amber when sorted.",
    striping:
      "Odd rows on Stage Charcoal, even rows on Midnight Navy — barely perceptible.",
  },

  navigation: {
    sidebar:
      "Midnight Navy panel, Barlow 500 labels in Linen White, active item shows " +
      "1px amber left-border accent and Cool Slate text. Icons use duotone amber/slate.",
    topbar:
      "Stage Charcoal bar with the Midnight Jazz wordmark in Barlow Condensed 800, " +
      "no marquee bulbs — just the name and a thin amber underline rule.",
    tabs:
      "Inline tab set: underline style, amber underline on active tab. " +
      "No filled pill tabs — they read too bright.",
    breadcrumbs:
      "Small Barlow 400 in Blue-Gray Smoke, separated by a thin forward slash. " +
      "Current page in Linen White.",
  },

  dashboard_style:
    "Dark stage — Midnight Navy behind a grid of Stage Charcoal cards. " +
    "Large Barlow Condensed numerals in Amber Spotlight for primary metrics. " +
    "Secondary stats in Cool Slate. A single spotlight radial gradient behind " +
    "the hero metric. Sparse grid — never crowded.",

  component_styles: {
    dialog:
      "Stage Charcoal card floating on a Velvet Scrim. 20px radius, 1px Slate " +
      "Hairline border. Amber close button top-right. No drop shadow (the scrim provides depth).",
    sidebar:
      "See navigation.sidebar. Collapsible to 48px icon rail with amber active dot.",
    carousel:
      "Poster rail with thin score-line rules above and below. Navigation arrows " +
      "are amber on hover. No film-strip perforation — clean horizontal sweep.",
    search_bar:
      "Full-width Stage Charcoal bar with a magnifier in Cool Slate and hint text " +
      "'Search your library…' in Blue-Gray Smoke. Expands with amber focus ring.",
    media_player:
      "Near-black control bar (Midnight Navy at 92% opacity) with Amber Spotlight " +
      "scrubber, Linen White time readout in JetBrains Mono, and ghost icon buttons.",
    toast:
      "Small Stage Charcoal pill sliding up from the bottom-right. Left edge accent " +
      "in the semantic color (amber/green/crimson). Linen White text. Auto-dismiss 4s.",
    chip:
      "Tiny Barlow 500 chips on Deep Indigo background, 1px Slate Hairline border. " +
      "Active chip gets amber text and amber border.",
  },

  layout_patterns: {
    dashboard:
      "Single amber hero metric spanning full width → 3-column stat card row → " +
      "activity feed rail at bottom. Stage Charcoal cards on Midnight Navy.",
    settings:
      "Left navigation list (Barlow Condensed section labels) + right content panel, " +
      "max 720px content. Separator is a 1px Slate Hairline vertical rule.",
    media_library:
      "Sticky filter bar in Stage Charcoal → dark poster grid (auto-fill) → " +
      "deep-navy page background shows between cards like stage floor.",
    authentication:
      "Centered Stage Charcoal card on Midnight Navy with a faint spotlight radial " +
      "gradient behind it. Wordmark above. Single-column form.",
    landing:
      "Full-bleed dark hero with spotlight illustration and Barlow Condensed " +
      "headline → alternating dark/surface feature rows → CTA in amber.",
    detail_view:
      "Full-bleed Midnight Navy backdrop (faded still) → Stage Charcoal metadata " +
      "panel with poster, title, and amber play button → episode/related rails below.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY
   * ========================================================================== */

  poster_style:
    "Dark-ground posters: image bleeds to the edge, deep navy shadow at bottom " +
    "carries title in Barlow Condensed. Border is 1px Slate Hairline. Rounded 6px. " +
    "Hover reveals amber play button centered on the poster.",

  thumbnail_style:
    "6px rounded corners, 1px Slate Hairline border, dark-graded overlay at the " +
    "bottom carrying a truncated title in Barlow 600 / Linen White.",

  backdrop_style:
    "Cinematic 16:9 still, desaturated 40%, amber-toned in the spotlight zone. " +
    "Faded with a Stage Curtain Fade gradient at the bottom to blend into the page.",

  media_cards:
    "Poster thumbnail top, Barlow 600 title and Inter 400 year/genre below on " +
    "Stage Charcoal. Hover: 1px amber border glow + amber play pill centered on poster. " +
    "Active/playing state: amber left accent bar on the card.",

  badges: {
    labels: ["4K", "HDR10", "Dolby Vision", "DTS-X", "Atmos", "Continue Watching", "New", "Favorite", "Unplayed"],
    shape: "Tiny rounded rectangle, 3px radius.",
    colors:
      "Muted Brass for quality formats (4K/HDR/Dolby/Atmos); " +
      "Cool Slate for status (New/Unplayed); Amber Spotlight for Favorite; " +
      "Verdant Green for Continue Watching progress.",
    typography: "Barlow 600, 10px, all-caps, letter-spacing 0.05em.",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  voice: ["Cool", "Understated", "Knowing", "Intimate"],

  tone: [
    "Quiet confidence",
    "Never shouts — suggests",
    "Warm when it needs to be",
    "Dry wit at the edges",
  ],

  writing_style:
    "Short, unhurried sentences. More Hemingway than Dickens. Active voice. " +
    "No exclamation marks in UI copy. Occasional jazz metaphors (session, set, riff, " +
    "groove, tune, solo) — used once, not repeated. Never jargon, never corporate-speak, " +
    "never instructions that feel like a manual.",

  vocabulary: [
    "session", "set", "groove", "tune", "riff", "solo", "cue",
    "deep cut", "b-side", "liner notes", "encore", "downbeat", "bridge",
  ],

  avoid_words: [
    "leverage", "synergy", "utilize", "robust", "seamless", "cutting-edge",
    "disrupt", "amazing", "awesome", "simply", "just", "easy",
  ],

  greetings: [
    "Good evening.",
    "The session starts when you're ready.",
    "Your library is set up. Take a seat.",
    "Back again. Good.",
  ],

  empty_state_messages: [
    "Nothing here yet. Add some titles and let the set begin.",
    "This shelf is empty — it's waiting for something worth playing.",
    "No results found. Try a different tune.",
    "Your queue is clear. A blank set list is a rare thing — enjoy it.",
  ],

  notification_style:
    "Dry and minimal — like a stage manager's cue card. Tells you exactly what " +
    "happened, suggests what's next, then gets out of the way. No urgency theater.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE
   * ========================================================================== */

  image_prompt_prefix:
    "Late-night jazz club atmosphere, high-contrast chiaroscuro, deep midnight navy " +
    "background, single warm amber spotlight as the key light, cool blue-gray shadows, " +
    "fine film grain, editorial composition,",

  image_prompt_suffix:
    ", Blue Note Records aesthetic, bold condensed type, muted brass and cool slate " +
    "accent colors, linen-white on near-black, no bright backgrounds, analog warmth.",

  negative_prompt: [
    "bright background", "white background", "cheerful", "neon", "pastel",
    "flat vector illustration", "cartoon", "digital-clean", "corporate",
    "smiling at camera", "stock photo", "colorful", "warm overall grade",
    "lens flare", "HDR", "oversaturated", "soft-focus dreamy",
  ],

  ui_generation_rules: [
    "Background is always Midnight Navy (#0D1117) or Stage Charcoal (#1A2230). Never light.",
    "One amber accent per screen — the single most important interactive element.",
    "Text is Linen White (#EDE8DF), never pure white.",
    "Borders are thin Slate Hairline (#2E3D52), never bold.",
    "Cards use Stage Charcoal with 6–12px radius. No pill-shaped cards.",
    "Maximum content width 1440px. Generous padding 24–48px.",
    "Spacing scale is 4/8/12/16/24/32/48/64 — nothing else.",
  ],

  logo_rules: {
    shape:
      "Wordmark in Barlow Condensed 800, all-caps, with an amber underline rule " +
      "or an amber spotlight circle glyph to the left. No box, no badge shape.",
    complexity: "Extremely simple — legible at 24px with no detail loss.",
    negative_space: "The dark background does the work. Give the wordmark room.",
    colors: "Linen White on Midnight Navy, or Amber Spotlight on Midnight Navy.",
    allowed_symbols: [
      "trumpet bell",
      "vinyl record circle",
      "amber spotlight dot",
      "upright bass silhouette",
    ],
    forbidden_symbols: [
      "play-button triangle alone",
      "film reel",
      "popcorn",
      "streaming service lookalike",
      "gears",
      "neon outlines",
    ],
  },

  illustration_prompt_template:
    "{prefix} {subject}, in the Midnight Jazz style, {mood}, rendered as a " +
    "high-contrast jazz club scene with a single amber spotlight {suffix}",

  page_generation_rules: [
    "Hero sections have a dark background with a radial amber spotlight gradient — never light.",
    "Primary CTA button is always Amber Spotlight (#E8961F) with Midnight Navy text.",
    "One large Barlow Condensed headline per section, not multiple competing headings.",
    "Every card and panel sits on Stage Charcoal (#1A2230), not the page background.",
    "Score-line horizontal rules (1px Slate Hairline) separate major sections.",
    "No hero illustrations with white or cream backgrounds.",
  ],

  prompt_library: {
    logo:
      "Design a Midnight Jazz wordmark: 'PHLIX' in Barlow Condensed 800 all-caps, " +
      "Linen White on Midnight Navy, with a small amber spotlight circle glyph to the left. " +
      "Extremely simple, legible at all sizes, no ornamentation.",
    illustration:
      "{image_prompt_prefix} {subject} {image_prompt_suffix}",
    icon:
      "Minimalist outlined icon of {subject}, 1.5px stroke, Cool Slate (#7A9BB5) color, " +
      "square caps, miter joins, no fill, 24×24 grid, legible at 16px.",
    background:
      "Midnight Navy background with a subtle off-center amber radial glow fading " +
      "to nothing, fine film grain overlay, no subjects, no text.",
    landing_page:
      "Dark jazz-club landing page: Midnight Navy background, Barlow Condensed 800 hero " +
      "headline in Linen White, amber spotlight radial gradient, Stage Charcoal feature cards, " +
      "single amber CTA button. No bright elements.",
    dashboard:
      "A dark media dashboard on Midnight Navy: large Barlow Condensed amber stat numerals, " +
      "Stage Charcoal cards with hairline borders, Cool Slate secondary stats, " +
      "sparse layout with generous padding.",
    marketing:
      "A jazz festival poster for {topic}: near-black background, single amber spotlight, " +
      "bold Barlow Condensed headline in Linen White, silhouette of musician in foreground, " +
      "high contrast, film grain, Blue Note Records aesthetic.",
  },

  /* ==========================================================================
   * 17. DESIGN TOKENS
   * ========================================================================== */

  design_tokens: {
    color: {
      "--color-primary":    "#E8961F",
      "--color-secondary":  "#7A9BB5",
      "--color-tertiary":   "#C4A45A",
      "--color-neutral":    "#4A5A6B",
      "--color-bg":         "#0D1117",
      "--color-surface":    "#1A2230",
      "--color-surface-alt":"#222E42",
      "--color-text":       "#EDE8DF",
      "--color-success":    "#4CAF82",
      "--color-warning":    "#D4832A",
      "--color-error":      "#B03A3A",
      "--color-info":       "#3A7BD5",
      "--color-focus":      "#E8961F",
      "--color-border":     "#2E3D52",
      "--color-shadow":     "rgba(8, 13, 20, 0.6)",
      "--color-overlay":    "rgba(7, 11, 18, 0.75)",
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
      "--radius-sm":   "3px",
      "--radius-md":   "6px",
      "--radius-lg":   "12px",
      "--radius-xl":   "20px",
      "--radius-pill": "999px",
    },
    typography: {
      "--font-headline": "'Barlow Condensed', 'Oswald', Impact, sans-serif",
      "--font-display":  "'Playfair Display', Georgia, serif",
      "--font-body":     "'Inter', 'Segoe UI', system-ui, sans-serif",
      "--font-ui":       "'Barlow', 'Inter', system-ui, sans-serif",
      "--font-mono":     "'JetBrains Mono', 'Fira Code', Consolas, monospace",
      "--font-number":   "'Barlow Condensed', 'Oswald', Impact, sans-serif",
    },
    shadow: {
      "--shadow-sm":         "0 1px 3px rgba(8,13,20,0.55)",
      "--shadow-md":         "0 4px 12px rgba(8,13,20,0.65)",
      "--shadow-lg":         "0 12px 32px rgba(8,13,20,0.75)",
      "--shadow-spotlight":  "0 0 40px rgba(232,150,31,0.15)",
    },
  },

  /* ==========================================================================
   * 18. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  responsive_behavior: {
    desktop:
      "Multi-column poster grid, sidebar navigation, hover-state affordances, " +
      "max 1440px content width. Stage has room to breathe.",
    tablet:
      "2–3 column poster grid, collapsible sidebar becomes bottom sheet on demand, " +
      "48px touch targets, increased padding between cards.",
    tv:
      "10-foot UI: Barlow Condensed headlines at 2.5× scale, amber focus rings at 3px, " +
      "D-pad spatial navigation between poster rows, no hover-only affordances.",
    mobile:
      "Single column, bottom tab bar in Stage Charcoal, full-width posters, " +
      "sticky amber play bar above the tab bar. Swipe to dismiss. 44px minimum touch target.",
  },

  /* ==========================================================================
   * 19. SOUND IDENTITY
   * ========================================================================== */

  sound_identity: {
    startup_chime:
      "A solo upright bass pizzicato — two low notes, a pause, a third that resolves. " +
      "Dry room, minimal reverb. The club is opening.",
    notification:
      "A single soft vibraphone mallet strike — warm, metallic, decays gently.",
    ui_click:
      "A muted piano key press — not a click, a felt-hammer touch. Very quiet.",
    success:
      "A two-note ascending piano figure in Eb — the musician's knowing nod. " +
      "Short, complete, no reverb tail.",
    error:
      "A single muted bass string pluck — low, contained, non-alarming. " +
      "Not a buzzer. Never a buzzer.",
  },

  /* ==========================================================================
   * 20. SEASONAL VARIANTS
   * ========================================================================== */

  seasonal_variants: [
    {
      name: "Winter After Hours",
      active_range: "12-01..01-05",
      overrides: {
        "--color-primary": "#D4832A",
        "--color-bg": "#0A0E15",
        "--color-surface": "#141C28",
      },
      motif:
        "The amber spotlight shifts to a cooler, deeper burnt ochre. The stage " +
        "goes darker — a club on Christmas Eve, half the stools up, a pianist " +
        "playing for nobody in particular. Sparse falling snow particles at 5% opacity.",
    },
    {
      name: "Summer Session",
      active_range: "06-01..08-31",
      overrides: {
        "--color-secondary": "#5BA3C9",
        "--color-surface": "#1D2A3A",
      },
      motif:
        "The blue-gray shifts toward a warmer cerulean — an outdoor jazz festival " +
        "at dusk, the sky still holding the last of the day's color behind the stage. " +
        "A subtle warm gradient at the very top of hero sections.",
    },
  ],

  /* ==========================================================================
   * 21. ACCESSIBILITY
   * ========================================================================== */

  accessibility: {
    minimum_contrast:
      "WCAG AA on all dark surfaces. Linen White (#EDE8DF) on Midnight Navy (#0D1117) " +
      "achieves 15.6:1 — well above AA. Amber Spotlight on Midnight Navy achieves ~4.8:1 — " +
      "verified AA for large text and UI components. Always verify amber on surfaces.",
    focus_style:
      "2px Amber Spotlight (#E8961F) focus ring with 2px Midnight Navy offset. " +
      "Always visible against all dark surfaces. Never hidden, never reduced.",
    touch_target: "Minimum 44×44px on mobile and TV. 40×40px desktop minimum.",
    motion_reduction:
      "Honor prefers-reduced-motion. Replace slow spotlight pulse with instant " +
      "amber border appear. Disable smoke particle animation entirely. " +
      "Cross-dissolve transitions become instant cuts.",
    font_scaling:
      "All layouts must survive 200% text zoom. Dark surfaces must not clip " +
      "text when scaled. No overflow:hidden on text containers at scale.",
  },

  /* ==========================================================================
   * 22. DO / DON'T
   * ========================================================================== */

  do_dont: {
    colors: {
      do: [
        "Use deep navy or stage charcoal for every background",
        "Reserve amber for exactly one primary CTA or focal accent per view",
        "Use Cool Slate for secondary actions and informational elements",
        "Shadows are cool indigo-black — they live in the dark, not the warmth",
      ],
      dont: [
        "Use light or cream backgrounds anywhere",
        "Apply amber to more than one interactive element per screen",
        "Use warm or brown-tinted shadows",
        "Apply pure white (#FFFFFF) as text color — always use Linen White",
      ],
      reason:
        "The dark palette is the identity. Amber is the spotlight — it loses " +
        "all power if it appears everywhere. The warmth lives in the accent, " +
        "not the background.",
    },
    typography: {
      do: [
        "Use Barlow Condensed 700/800 for all headlines",
        "Use Playfair Display italic for editorial display moments",
        "Keep body text in Inter at 1.65 line-height on dark backgrounds",
        "ALL CAPS is permitted for short Barlow labels and button text",
      ],
      dont: [
        "Use Inter or Barlow for headlines — that is the condensed face's job",
        "Use Playfair Display for UI labels or navigation",
        "Set body text below 14px on dark backgrounds",
        "Apply tracking wider than 0.05em outside of all-caps micro-labels",
      ],
      reason:
        "The condensed headline is the voice of the marquee. Body type must be " +
        "as readable as possible on dark backgrounds — scale and line-height are not optional.",
    },
    layout: {
      do: [
        "Treat negative space as active design — the dark around a card matters",
        "Anchor each view with a single amber focal point",
        "Use score-line rules (1px hairline) to separate major sections",
        "Keep maximum content width at 1440px",
      ],
      dont: [
        "Fill every pixel — silence is part of the composition",
        "Use multiple amber accents competing for attention",
        "Add heavy borders or thick dividers — they belong to a different world",
        "Exceed 1440px or remove all padding on wide screens",
      ],
      reason:
        "Negative space is not wasted space in this kit — it is the darkness " +
        "that gives the spotlight its power.",
    },
    animation: {
      do: [
        "Use slow, deliberate transitions (300–500ms)",
        "Fade and cross-dissolve between page states",
        "Amber spotlight pulse for loading states — slow and warm",
        "Always respect prefers-reduced-motion",
      ],
      dont: [
        "Use bouncy spring animations",
        "Flash or strobe — ever",
        "Transition faster than 150ms for major state changes",
        "Animate decorative elements that serve no functional purpose",
      ],
      reason:
        "Motion in Midnight Jazz is like a musician phrasing a line — deliberate, " +
        "unhurried. Fast jitter destroys the atmosphere instantly.",
    },
    imagery: {
      do: [
        "Use high-contrast amber-lit subjects on dark backgrounds",
        "Include fine film grain on all photographs",
        "Prefer silhouettes, candid performance shots, and instrument close-ups",
        "Grade photos toward cool shadows and warm highlights",
      ],
      dont: [
        "Use bright, studio-lit, smiling-at-camera stock photography",
        "Place color photography with its own dominant palette in hero positions",
        "Use HDR, oversaturated, or digitally clean images",
        "Use illustration styles that are playful, cute, or cartoonish",
      ],
      reason:
        "Every image should feel like it was shot on 35mm in a dimly lit club. " +
        "Bright stock photography shatters the world immediately.",
    },
    branding: {
      do: [
        "Use the wordmark in Barlow Condensed 800 all-caps",
        "Use the mascot (Miles) for empty states and onboarding",
        "Apply signature elements (spotlight, vinyl circle, score-line rule) consistently",
      ],
      dont: [
        "Recolor the wordmark to anything other than Linen White or Amber Spotlight",
        "Add a play-button triangle as the primary logo symbol",
        "Use the mascot in error states — Miles is never embarrassed",
        "Mix in Retro Film Reel or other brand kit elements",
      ],
      reason:
        "Midnight Jazz occupies a specific tonal register. Cross-contamination " +
        "with brighter or more playful kits reads as inconsistency.",
    },
    icons: {
      do: [
        "Use 1.5px outlined icons in Cool Slate for default state",
        "Shift active/selected icons to Amber Spotlight",
        "Duotone treatment for primary navigation icons only",
      ],
      dont: [
        "Use thick, rounded-chunky icons — they belong to lighter kits",
        "Use filled icons for default state",
        "Mix icon weight families on the same screen",
      ],
      reason:
        "Thin, precise outlined icons read as sophisticated in a dark environment. " +
        "Chunky icons fight the refined atmosphere.",
    },
    copywriting: {
      do: [
        "Write short, dry, unhurried copy",
        "Use jazz vocabulary once and with precision",
        "Let silence carry weight — shorter is always better here",
      ],
      dont: [
        "Use exclamation marks in UI copy",
        "Overuse jazz metaphors — one per page maximum",
        "Write instructions that feel like a manual",
        "Be aggressive in push notifications",
      ],
      reason:
        "The voice is cool. It knows you know what you're doing. " +
        "Exclamation marks belong to a different club entirely.",
    },
    ux: {
      do: [
        "Surface the play action immediately — amber button, always visible",
        "Make browse feel like crate-digging — discovery over prescription",
        "Keep authentication and setup flows short and dry",
      ],
      dont: [
        "Gate the play button behind extra taps",
        "Add onboarding carousels with five slides",
        "Use congratulations screens for routine actions",
      ],
      reason:
        "The user came here to watch something. The UI is the stage crew — " +
        "invisible when the set is going well.",
    },
    performance: {
      do: [
        "Lazy-load poster images below the fold",
        "Compress grain textures to WebP — they are decorative, not photographic",
        "Preload the primary amber spotlight radial gradient as CSS",
      ],
      dont: [
        "Ship a full-size backdrop image without a low-res placeholder",
        "Run the smoke particle animation on battery-saver devices",
        "Load custom fonts before above-the-fold content is painted",
      ],
      reason:
        "A slow dark interface loses the atmosphere before it arrives. " +
        "Performance is part of the mood.",
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
      "Base/parent kit for the Midnight Jazz identity. Variations (e.g. 'Rainy Sunday', " +
      "'Latin Quarter') should reference base_kit.slug = 'midnight-jazz' and override " +
      "only what they change. Dark-first; amber is the single spotlight accent.",
  },
};

// Export (ESM). Consumers:
//   import brandKit from './midnight-jazz.js'
//   import { brandKit } from './midnight-jazz.js'
// CommonJS consumers on Node 22+ can use:  const brandKit = require('./midnight-jazz.js').default
export default brandKit;
export { brandKit };
