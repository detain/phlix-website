/**
 * ============================================================================
 *  PHLIX BRAND KIT  —  Obsidian Pulse   (BASE kit)
 * ============================================================================
 *
 *  Theme   : Dark premium tech — polished obsidian surfaces, precision-machined
 *            aluminum, subtle electric blue pulse lines, the aesthetic of
 *            high-end audio equipment and luxury electronics. Matte black on
 *            glossy black, ice electric blue, platinum silver, pure white
 *            accents. Premium, precise, minimal, sophisticated, powerful.
 *
 *  kit_type: "base"
 *  slug    : "obsidian-pulse"
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY
   * ========================================================================== */

  name: "Obsidian Pulse",

  slug: "obsidian-pulse",

  version: "1.0",

  description:
    "Obsidian Pulse is the visual language of precision luxury electronics — " +
    "matte obsidian planes broken by hairline electric-blue pulse lines, surfaces " +
    "that absorb light and reflect it back as pure form. It is the black monolith " +
    "of media servers: powerful, silent, effortlessly sophisticated. Every pixel " +
    "is machined, not decorated.",

  inspiration: [
    "High-end audiophile amplifiers and DACs",
    "Luxury Swiss watchmaking and precision movements",
    "Black anodised aerospace aluminium",
    "McLaren and Porsche interior cockpit design",
    "Leica camera industrial design",
    "Bang & Olufsen speaker minimalism",
    "Dark-mode operating systems at night",
    "Carbon fibre weave textures",
    "Oscilloscope pulse waveforms",
    "Obsidian volcanic glass formations",
    "CNC-machined heat sinks and processor dies",
  ],

  keywords: [
    "obsidian", "premium", "matte-black", "glossy-black", "electric-blue",
    "platinum", "silver", "precision", "minimal", "sophisticated", "powerful",
    "luxury", "dark", "tech", "machined", "anodised", "monolithic", "crisp",
    "pulse", "waveform", "audiophile", "high-end", "tactile", "refined",
    "controlled", "restrained", "deep-black", "charcoal", "ice-blue",
    "pure-white", "negative-space", "focused", "intentional", "cinematic-dark",
    "geometric", "rectilinear", "hairline-detail", "glow", "electrified",
    "silent-power", "understated", "authoritative", "immersive", "studio",
    "carbon", "aluminium", "titanium", "glass", "optical", "signal",
    "voltage", "bandwidth", "fidelity", "mono", "vector", "system",
  ],

  /* ==========================================================================
   * 2. PERSONALITY
   * ========================================================================== */

  personality: [
    "Sophisticated",
    "Precise",
    "Authoritative",
    "Reserved",
    "Powerful",
    "Refined",
  ],

  emotional_goals: [
    "Confidence",
    "Calm mastery",
    "Quiet pride",
    "Focused immersion",
    "Awe at capability",
  ],

  archetype: "Ruler",

  audience: [
    "Power users and technical enthusiasts",
    "Home cinema perfectionists",
    "Audio-video professionals",
    "Privacy-focused self-hosters",
    "Minimalist design aficionados",
    "Luxury electronics collectors",
  ],

  /* ==========================================================================
   * 3. BRAND STORY
   * ========================================================================== */

  story:
    "In a precision instrument facility in Switzerland, a media player was built " +
    "without compromise: obsidian-black enclosure, machined aluminium dials, and " +
    "a single blue LED pulse indicating readiness. No unnecessary surfaces, no " +
    "decorative flourishes — only the exact architecture of signal to screen. " +
    "Obsidian Pulse inherits that philosophy. It is Phlix for those who believe " +
    "that the best technology disappears into its own perfection, leaving only the " +
    "experience: dark room, flawless image, no distractions.",

  tagline_primary: "Signal. Refined.",

  tagline_secondary: [
    "Precision in every frame.",
    "Power that speaks in silence.",
    "Your library. Your standard.",
    "Nothing unnecessary. Nothing missing.",
  ],

  mission:
    "Deliver a media experience so controlled and precise that the technology " +
    "vanishes and only the content remains.",

  values: [
    "Precision",
    "Restraint",
    "Fidelity",
    "Mastery",
    "Silence as sophistication",
  ],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES
   * ========================================================================== */

  brand_dna:
    "Obsidian Pulse is the intersection of luxury electronics and pure cinema. " +
    "It is matte black and electric blue, machined not decorated, silent not " +
    "loud. It never shouts. It never begs for attention. It earns it.",

  design_principles: [
    "Black is the dominant surface — every other color earns its presence.",
    "Electric blue is reserved for live state, active signal, and single accent.",
    "Platinum silver marks precision details: dividers, hairlines, captions.",
    "Typography is geometric, monospaced where technical, never decorative.",
    "Negative space is structural — emptiness communicates premium quality.",
    "Every element must justify its existence; delete rather than decorate.",
    "Motion is deliberate and slow — luxury never rushes.",
    "Glow is used sparingly; each glow has one source and fades cleanly.",
  ],

  brand_opposites: [
    "Not playful or cartoonish",
    "Not warm or cozy",
    "Not colorful or vibrant",
    "Not rounded or bubbly",
    "Not corporate pastel",
    "Not skeuomorphic faux-texture",
    "Not neon or retro-futurist",
    "Not white-background clinical",
  ],

  signature_elements: [
    "Horizontal pulse waveform lines in electric blue",
    "Hairline silver dividers between sections",
    "Matte-to-gloss black surface transitions",
    "Single blue LED dot / indicator mark",
    "Precision grid overlay at 1px opacity",
    "Carbon fibre micro-texture on elevated surfaces",
    "Monospaced technical readouts for stats",
  ],

  header_motif: "Animated electric-blue pulse line scanning left-to-right on obsidian",

  /* ==========================================================================
   * 5. VISUAL IDENTITY
   * ========================================================================== */

  visual_style: [
    "Luxury industrial",
    "Dark mode precision",
    "Flat with sharp edges",
    "High-contrast minimal",
    "Technical vector",
  ],

  art_direction:
    "Artwork feels like a product render from a luxury electronics catalogue: " +
    "obsidian black backgrounds, surfaces rendered with barely-visible material " +
    "grain (matte vs gloss), objects lit by a single cool overhead point source " +
    "casting a tight specular highlight. Electric blue appears only as a glowing " +
    "edge, a pulse line, or an indicator dot — never as fill. Silver marks " +
    "precision joints and hairline details. Compositions are centered and " +
    "architectural. Human figures, if present, are silhouetted against lit screens. " +
    "No warmth, no noise, no decoration beyond what the material demands.",

  realism: "semi_realistic",

  rendering_style: ["vector", "flat", "cel shading"],

  texture_level: "subtle",

  depth: "layered",

  lighting: {
    temperature: "cool",
    quality: "precision — single overhead point source with tight specular highlight",
    shadows: "hard",
    contrast: "high",
    notes: "Cool white key light only. Deep blacks. Zero fill light. Specular on aluminium edges only.",
  },

  composition: [
    "Centered and architecturally balanced",
    "Strict grid alignment — nothing free-floated",
    "Extreme negative space on all four sides",
    "Hero subject isolated, never cluttered",
    "Horizontal orientation favored for cinematic feel",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM
   * ========================================================================== */

  colors: {
    primary: {
      name: "Pulse Blue",
      hex: "#00B4FF",
      rgb: "rgb(0, 180, 255)",
      hsl: "hsl(198, 100%, 50%)",
      usage: "Primary CTAs, active states, focus rings, signal indicators, pulse animations.",
      contrast_targets: ["obsidian", "deep_charcoal"],
    },
    secondary: {
      name: "Platinum Silver",
      hex: "#C8CDD6",
      rgb: "rgb(200, 205, 214)",
      hsl: "hsl(220, 8%, 81%)",
      usage: "Hairline dividers, secondary labels, caption text, precision detail accents.",
      contrast_targets: ["obsidian", "deep_charcoal"],
    },
    tertiary: {
      name: "Pure White",
      hex: "#F0F2F5",
      rgb: "rgb(240, 242, 245)",
      hsl: "hsl(220, 12%, 95%)",
      usage: "Primary headline text, primary body text on dark surfaces, logo lockup.",
      contrast_targets: ["obsidian", "gloss_black"],
    },
    neutral: {
      name: "Deep Charcoal",
      hex: "#1C1F26",
      rgb: "rgb(28, 31, 38)",
      hsl: "hsl(225, 15%, 13%)",
      usage: "Slightly elevated surfaces, card fills, secondary backgrounds.",
      contrast_targets: ["pure_white", "platinum_silver"],
    },
    background: {
      name: "Obsidian",
      hex: "#0A0B0E",
      rgb: "rgb(10, 11, 14)",
      hsl: "hsl(225, 17%, 5%)",
      usage: "Default page background. The absolute floor — near-true black with a cool undertone.",
      contrast_targets: ["pure_white", "pulse_blue", "platinum_silver"],
    },
    surface: {
      name: "Matte Black",
      hex: "#111317",
      rgb: "rgb(17, 19, 23)",
      hsl: "hsl(225, 15%, 8%)",
      usage: "Card and panel primary surfaces — one step lighter than obsidian background.",
      contrast_targets: ["pure_white", "pulse_blue"],
    },
    surface_alt: {
      name: "Gloss Black",
      hex: "#16191F",
      rgb: "rgb(22, 25, 31)",
      hsl: "hsl(225, 17%, 10%)",
      usage: "Alternate elevated surface — hover states, nested panels, selected rows.",
      contrast_targets: ["pure_white", "platinum_silver"],
    },
    text: {
      name: "Optical White",
      hex: "#F0F2F5",
      rgb: "rgb(240, 242, 245)",
      hsl: "hsl(220, 12%, 95%)",
      usage: "Primary headline and body text on all dark surfaces.",
      contrast_targets: ["obsidian", "matte_black", "deep_charcoal"],
    },
    success: {
      name: "Precision Green",
      hex: "#00C896",
      rgb: "rgb(0, 200, 150)",
      hsl: "hsl(163, 100%, 39%)",
      usage: "Success states, confirmed actions, healthy signal indicators.",
      contrast_targets: ["obsidian", "matte_black"],
    },
    warning: {
      name: "Amber Signal",
      hex: "#FFB020",
      rgb: "rgb(255, 176, 32)",
      hsl: "hsl(40, 100%, 56%)",
      usage: "Warnings, caution states, degraded signal indicators.",
      contrast_targets: ["obsidian", "matte_black"],
    },
    error: {
      name: "Critical Red",
      hex: "#FF3A3A",
      rgb: "rgb(255, 58, 58)",
      hsl: "hsl(0, 100%, 61%)",
      usage: "Errors, destructive actions, failed signal states.",
      contrast_targets: ["obsidian", "matte_black"],
    },
    info: {
      name: "Ice Blue",
      hex: "#4DC8F5",
      rgb: "rgb(77, 200, 245)",
      hsl: "hsl(198, 90%, 63%)",
      usage: "Informational banners, tips, help callouts.",
      contrast_targets: ["obsidian", "matte_black"],
    },
    focus: {
      name: "Blue Pulse Glow",
      hex: "#00B4FF",
      rgb: "rgb(0, 180, 255)",
      hsl: "hsl(198, 100%, 50%)",
      usage: "Keyboard-focus ring — 1px ring with 4px glow spread on dark surface.",
      contrast_targets: ["obsidian", "matte_black"],
    },
    border: {
      name: "Hairline Silver",
      hex: "#2A2E38",
      rgb: "rgb(42, 46, 56)",
      hsl: "hsl(225, 14%, 19%)",
      usage: "Card borders, dividers, table rules — near-invisible on dark, crisp in light.",
      contrast_targets: ["obsidian"],
    },
    shadow: {
      name: "Void Shadow",
      hex: "#000000",
      rgb: "rgba(0, 0, 0, 0.6)",
      hsl: "hsl(0, 0%, 0%)",
      usage: "Drop shadows are pure cool black at high opacity — no warmth.",
      contrast_targets: [],
    },
    overlay: {
      name: "Obsidian Scrim",
      hex: "#0A0B0E",
      rgb: "rgba(10, 11, 14, 0.85)",
      hsl: "hsl(225, 17%, 5%)",
      usage: "Modal/scrim overlays — near-black with cool undertone, heavy opacity.",
      contrast_targets: [],
    },
    gradients: [
      {
        name: "Pulse Horizon",
        type: "linear",
        angle: "90deg",
        stops: ["#0A0B0E", "#0D1520", "#0A0B0E"],
        usage: "Hero backdrop sweep — obsidian to deep-navy hint and back.",
      },
      {
        name: "Blue Edge Glow",
        type: "radial",
        angle: null,
        stops: ["rgba(0,180,255,0.18)", "rgba(0,180,255,0.0)"],
        usage: "Active element glow halos — tight radial behind icons and indicators.",
      },
      {
        name: "Surface Sheen",
        type: "linear",
        angle: "180deg",
        stops: ["#16191F", "#111317"],
        usage: "Subtle gloss-to-matte transition on elevated card surfaces.",
      },
    ],
  },

  color_rules: [
    "Electric blue (Pulse Blue) is the single accent — never use two saturated colors together.",
    "Backgrounds are always obsidian-black or one of the dark surface steps.",
    "White is for text only, never as a background or fill.",
    "Shadows are pure cool black — no warm tones, no colour-tinted shadows.",
    "Silver/platinum is reserved for structural details: dividers, captions, hairlines.",
    "Glow effects use Pulse Blue at ≤20% opacity maximum spread.",
    "Never use more than two colours per component: black + one accent.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  fonts: {
    headline: {
      family: "DM Sans",
      weight: [300, 400],
      fallbacks: ["Inter", "Helvetica Neue", "sans-serif"],
      usage: "Hero headlines and section titles — ultra-thin or light weight only.",
      tracking: "0.08em",
      line_height: 1.05,
    },
    display: {
      family: "Space Grotesk",
      weight: [300, 400],
      fallbacks: ["DM Sans", "Inter", "sans-serif"],
      usage: "Oversized display text, product name lockup, splash screen numerals.",
      tracking: "0.12em",
      line_height: 0.95,
    },
    body: {
      family: "DM Sans",
      weight: [400, 500],
      fallbacks: ["Inter", "system-ui", "sans-serif"],
      usage: "Paragraphs, descriptions, long-form reading.",
      tracking: "0.01em",
      line_height: 1.65,
    },
    ui: {
      family: "Inter",
      weight: [400, 500, 600],
      fallbacks: ["DM Sans", "system-ui", "sans-serif"],
      usage: "Buttons, labels, navigation, chips — precise, legible UI text.",
      tracking: "0.02em",
      line_height: 1.25,
    },
    mono: {
      family: "JetBrains Mono",
      weight: [400, 500],
      fallbacks: ["Fira Code", "Consolas", "monospace"],
      usage: "Technical readouts, stats, timestamps, resolution badges, code.",
      tracking: "0em",
      line_height: 1.5,
    },
    number: {
      family: "Space Grotesk",
      weight: [300, 400],
      fallbacks: ["DM Sans", "sans-serif"],
      usage: "Stats, counters, runtimes, dashboard figures — tabular numerals preferred.",
      tracking: "0.06em",
      line_height: 1.0,
    },
  },

  typography_rules: [
    "Headlines are always light weight (300) or regular (400) — never bold headlines.",
    "Letter-spacing is wide on headlines to reinforce luxury precision.",
    "Body text is optical white on all dark surfaces — never grey for long-form.",
    "Use monospaced font for all technical values: runtime, bitrate, resolution, timestamps.",
    "Avoid ALL CAPS except for short precision labels and badge text.",
    "Keep body line-length to 60–70 characters for comfortable dark-background reading.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  shape_language: [
    "Precise rectangles — nearly zero radius",
    "Sharp hairline dividers",
    "Thin horizontal pulse lines",
    "Rectilinear grid containers",
    "Chamfered corners (1–2px cut) on premium elements",
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
    notes: "Hairline 1px borders only. Color is hairline-silver (#2A2E38) on dark, near-invisible. Active state borders use Pulse Blue at full opacity.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  icon_style: ["Outlined", "Sharp corners", "Geometric", "Technical"],

  icon_rules: [
    "1px stroke weight — precision hairline.",
    "Right-angle joins; no rounded caps.",
    "Single-color only: optical white, platinum silver, or pulse blue.",
    "Icons at 16px must be pixel-perfect on grid — test at 1x.",
    "No decorative icons; every icon is functional and labelled.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  illustration_style: [
    "Technical blueprint",
    "Industrial product render",
    "Precision vector diagram",
    "Dark-field studio photography style",
  ],

  character_style: {
    proportions: "Silhouetted, precise — if present, faceless or in deep shadow.",
    eyes: "Not depicted; characters are implied by shadow or posture.",
    expressions: "None — emotion communicated through context and composition.",
    clothing: "Dark professional attire: all-black or monochrome.",
    outlines: "No outlines; shapes are defined by light and shadow transitions.",
  },

  mascot: null,

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  photography_style: [
    "Dark-field studio",
    "Single cool key light",
    "Macro precision details",
    "Long-exposure light trails",
  ],

  photo_rules: [
    "Never use warm-toned photography.",
    "Never use environmental or lifestyle photography with people in casual settings.",
    "Prefer product/object photography on pure black backgrounds.",
    "Human subjects, if used, are silhouetted or lit dramatically from one cool source.",
    "Allow subtle blue-black color grading — never orange-teal Hollywood grade.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  motion_style: ["Deliberate", "Slow", "Precise", "Cinematic"],

  transitions: ["Fade through black", "Horizontal slide", "Opacity dissolve", "Scale from center"],

  animation_speed: "slow",

  easing: ["cubic-bezier(0.25, 0.0, 0.0, 1.0)", "ease-out", "linear"],

  microinteractions: {
    hover: "Surface brightens by one step (matte-black to gloss-black); blue hairline border fades in over 200ms.",
    button_press: "Slight opacity drop to 0.85, then return over 150ms — no bounce.",
    loading: "Single Pulse Blue horizontal scan line traversing left-to-right on obsidian.",
    drag: "Item renders at 0.9 opacity with a blue glow halo; drops back instantly.",
    focus: "1px Pulse Blue ring with 4px electric-blue glow; fades in over 180ms.",
    success: "Pulse Blue indicator dot blinks once, then holds solid for 1.2s.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  ui_style: [
    "Obsidian dark panels",
    "Hairline silver structural lines",
    "Electric blue single accent",
    "Rectilinear precision layout",
    "Extreme restraint in decoration",
  ],

  spacing_scale: [2, 4, 8, 12, 16, 24, 32, 48, 64, 96],

  shadows: {
    sm: "0 1px 4px rgba(0, 0, 0, 0.5)",
    md: "0 4px 16px rgba(0, 0, 0, 0.65)",
    lg: "0 12px 40px rgba(0, 0, 0, 0.8)",
    notes: "Shadows are pure cool black — deep, high-opacity, tight. No color tinting.",
  },

  cards: {
    elevation: "md",
    padding: "24px",
    border_radius: "4px",
    border: "1px solid #2A2E38",
    background: "#111317",
    notes: "Matte-black surface, hairline silver border. Hover elevates to gloss-black with Pulse Blue hairline border.",
  },

  buttons: {
    primary:   { bg: "#00B4FF", text: "#0A0B0E", radius: "4px", notes: "Pulse Blue fill, obsidian text. Strong contrast. Reserve for single primary CTA per view." },
    secondary: { bg: "transparent", text: "#C8CDD6", radius: "4px", notes: "Ghost with platinum-silver 1px border and platinum text." },
    danger:    { bg: "transparent", text: "#FF3A3A", radius: "4px", notes: "Critical Red 1px border, critical red text. Never filled." },
    ghost:     { bg: "transparent", text: "#F0F2F5", radius: "4px", notes: "1px hairline-silver border, optical-white text, no fill." },
    link:      { bg: "transparent", text: "#00B4FF", radius: "0", notes: "Pulse Blue text, no border, underline on hover." },
    icon:      { bg: "#16191F", text: "#C8CDD6", radius: "4px", notes: "Gloss-black fill, silver icon. Blue glow on focus/hover." },
    fab:       { bg: "#00B4FF", text: "#0A0B0E", radius: "4px", notes: "Pulse Blue floating action; obsidian icon; subtle blue glow ring." },
  },

  forms: {
    inputs: "Obsidian-fill, 1px hairline-silver border, 2px radius, 14px mono font, 12px padding. Focus switches border to Pulse Blue with 4px glow.",
    checkboxes: "1px silver border, sharp square, Pulse Blue fill + check when active.",
    switches: "Rectangular track, matte-black off, Pulse Blue track on, silver pill knob.",
    dropdowns: "Obsidian menu panel, 1px silver border, Pulse Blue highlight on hover item.",
    validation: "Inline, concise; error = Critical Red with small warning icon; success = Precision Green dot.",
  },

  tables: {
    headers: "Space Grotesk 300 weight, wide tracking, platinum-silver text, no background fill.",
    hover: "Row tints to surface_alt (gloss-black) on hover; left hairline turns Pulse Blue.",
    sorting: "Small chevron in platinum silver; active sort shows Pulse Blue chevron.",
    striping: "No colour striping — use hairline dividers between rows only.",
  },

  navigation: {
    sidebar: "Obsidian panel, no border on active item — instead a 2px left Pulse Blue bar and gloss-black surface. Icon monochrome until active, then Pulse Blue.",
    topbar: "Matte-black bar, hairline silver bottom border, minimal wordmark left, search centre, controls right.",
    tabs: "Underline tab style — 1px Pulse Blue underline on active, no fill, no radius.",
    breadcrumbs: "Mono font, platinum-silver crumbs, separated by a right-angle chevron in hairline silver.",
  },

  dashboard_style:
    "Obsidian canvas, three-column precision grid, Space Grotesk 300-weight oversized " +
    "numerals in optical white, Pulse Blue for live/active metrics, platinum silver " +
    "for unit labels. Hairline dividers between stat blocks. No decorative graphics. " +
    "Information density is high — the dashboard is for power users who can read it.",

  component_styles: {
    dialog: "Centered matte-black panel, 1px silver border, obsidian scrim, no radius, Pulse Blue title bar hairline at top.",
    sidebar: "See navigation.sidebar; icon-only collapsed rail retains Pulse Blue active indicator.",
    carousel: "Full-bleed poster rail, no borders between items, Pulse Blue scroll indicator dot at bottom.",
    search_bar: "Full-width matte input, 1px silver border, mono font placeholder 'Search your library…', Pulse Blue focus state.",
    media_player: "Absolute black control bar — no background visible under controls; Pulse Blue scrubber and progress fill; monospace time display.",
    toast: "Matte-black pill, 1px silver border, Pulse Blue left border accent, short mono copy, no icon unless status indicator.",
    chip: "1px silver border, no fill, mono font, tight padding. Active chip gets Pulse Blue border and faint blue tint fill.",
  },

  layout_patterns: {
    dashboard: "Full-width obsidian canvas → oversized stat row (3 metrics) → precision grid sections below.",
    settings: "Left precision nav rail + right content area, max 840px content, hairline vertical divider.",
    media_library: "Fixed filter strip (1px bottom border) → full-bleed poster grid, no gutters between cards.",
    authentication: "Centered matte-black card on obsidian background with single Pulse Blue accent border at top.",
    landing: "Full-bleed dark hero with animated pulse line → three-column features → technical specs → CTA.",
    detail_view: "Immersive full-viewport backdrop (desaturated, darkened) → metadata overlay → episode rail.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY
   * ========================================================================== */

  poster_style:
    "Dark-bordered poster: matte black inner frame, 1px silver outer border, " +
    "slightly desaturated key art, DM Sans light-weight title overlay at bottom. " +
    "No warm grading — preserve or cool-shift the original palette.",

  thumbnail_style:
    "Sharp 2px corner radius, 1px hairline silver border, cool color grade, " +
    "monospaced resolution badge (4K / HDR / DV) in top-right corner.",

  backdrop_style:
    "Full-viewport cinematic still, desaturated -20% and darkened, heavy bottom " +
    "vignette fading to pure obsidian. No text directly on backdrop without scrim.",

  media_cards:
    "Poster fills card, no padding. Bottom overlay (gradient obsidian-to-transparent) " +
    "holds title in Inter 500 and year in platinum mono. Hover: Pulse Blue 1px border " +
    "fades in and a minimal play mark appears — not a button, just a centered icon.",

  badges: {
    labels: ["4K", "HDR10", "HDR10+", "Dolby Vision", "Atmos", "DTS-X", "Continue", "New", "Unwatched"],
    shape: "Sharp rectangle, 1px silver border, 2px radius.",
    colors: "Technical white on deep-charcoal fill for quality badges (4K/HDR/Atmos); Pulse Blue border for status badges (New/Continue).",
    typography: "JetBrains Mono 400, 10px, wide tracking — pure technical readout aesthetic.",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  voice: ["Precise", "Direct", "Authoritative", "Understated"],

  tone: ["Calm", "Confident", "Technical when helpful", "Never hyperbolic"],

  writing_style:
    "Short, declarative sentences. No filler. Active voice only. Technical " +
    "accuracy over marketing warmth. Numbers over adjectives. 'Zero buffering' " +
    "not 'lightning fast.' Never exclamation marks in UI. Copy should feel like " +
    "the product manual of a luxury device — clear, precise, trusted.",

  vocabulary: [
    "signal", "fidelity", "precision", "resolution", "bitrate", "frame",
    "latency", "direct", "native", "stream", "encode", "library", "index",
  ],

  avoid_words: [
    "amazing", "incredible", "magic", "seamless", "easy", "beautiful",
    "exciting", "awesome", "powerful" /* (show, don't say) */, "revolutionize",
    "cutting-edge", "next-generation", "industry-leading",
  ],

  greetings: [
    "Welcome back.",
    "Your library is ready.",
    "Signal acquired.",
  ],

  empty_state_messages: [
    "Nothing indexed here yet. Add a library path to begin scanning.",
    "No results match those filters. Adjust the parameters.",
    "This collection is empty. Import or match media to populate it.",
  ],

  notification_style:
    "Minimal and factual — like a system log entry, not a marketing push. " +
    "State the event, provide one action if needed. No emojis. No exclamation marks.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE
   * ========================================================================== */

  image_prompt_prefix:
    "Dark premium technology product render, obsidian black background, single " +
    "cool overhead key light, electric blue pulse accent, platinum silver precision " +
    "details, photorealistic studio quality, deep shadows, high contrast,",

  image_prompt_suffix:
    ", obsidian and electric blue color palette, near-black surfaces, hairline " +
    "silver details, zero warmth, luxury electronics aesthetic, sharp edges, " +
    "precise geometry, professional grade.",

  negative_prompt: [
    "warm tones", "orange", "yellow", "sunset", "cozy", "hand-drawn",
    "cartoon", "illustration", "rounded", "bubbly", "cheerful", "neon",
    "colorful", "pastel", "cluttered", "decorative", "ornamental",
    "vintage", "retro", "rustic", "film grain", "analog", "grunge",
  ],

  ui_generation_rules: [
    "Obsidian black (#0A0B0E) is the only permitted background.",
    "Use only one accent color per screen: Pulse Blue (#00B4FF).",
    "All borders are 1px hairline silver (#2A2E38) — never 2px or colored.",
    "Corner radius maximum 4px — no pill shapes, no rounded cards.",
    "Typography is DM Sans light or Inter regular — never bold headlines.",
    "Max content width 1400px; use extreme negative space aggressively.",
    "Primary CTA button is the only Pulse Blue filled element per screen.",
    "All text on dark backgrounds must be optical white or platinum silver.",
  ],

  logo_rules: {
    shape: "Wordmark in Space Grotesk 300 weight, all-lowercase or set-case, with a precision Pulse Blue horizontal bar beneath.",
    complexity: "Minimal — wordmark only, no icon required. If icon used: a single horizontal waveform pulse.",
    negative_space: "Extreme clear zone — minimum 2× cap-height on all sides.",
    colors: "Optical white on obsidian, or obsidian on Pulse Blue for reverse application.",
    allowed_symbols: ["horizontal pulse waveform", "single LED dot", "precision hairline bar"],
    forbidden_symbols: ["play button triangle", "film reel", "circles", "gear/cog", "lightning bolt cliché"],
  },

  illustration_prompt_template:
    "{prefix} {subject}, in the Obsidian Pulse style, {mood}, photographed or " +
    "rendered against obsidian black with electric blue precision accents {suffix}",

  page_generation_rules: [
    "Every page opens with an obsidian full-viewport section — no white flash.",
    "Primary CTA is one Pulse Blue button per page — singular, unmissable.",
    "Stats and numbers use Space Grotesk 300 in optical white at large scale.",
    "Avoid decorative illustrations — use precision diagrams or product renders.",
    "Maximum content width 1400px; minimum margin 48px on each side.",
    "Hairline horizontal dividers separate all major sections.",
  ],

  prompt_library: {
    logo:
      "Obsidian Pulse logo: Space Grotesk 300-weight wordmark 'phlix' in optical white, " +
      "a single 1px Pulse Blue horizontal bar beneath, on obsidian black. Minimal, precise, no icon.",
    illustration:
      "{image_prompt_prefix} {subject} {image_prompt_suffix}",
    icon:
      "1px stroke precision vector icon of {subject}, sharp right-angle joins, " +
      "single color optical white or Pulse Blue, 16px grid-perfect, no decoration.",
    background:
      "Pure obsidian black background (#0A0B0E), faint cool-grey micro-grid at 2% opacity, " +
      "no texture, no grain, no warmth.",
    landing_page:
      "Dark premium landing page: full-viewport obsidian hero with animated Pulse Blue scan line, " +
      "Space Grotesk 300 headline in optical white, single Pulse Blue CTA button, " +
      "hairline dividers, extreme whitespace.",
    dashboard:
      "Obsidian precision dashboard: three-column stat grid with Space Grotesk 300 oversized numerals, " +
      "Pulse Blue for live metrics, platinum silver unit labels, hairline dividers, no decoration.",
    marketing:
      "Dark luxury social graphic for {topic}: DM Sans light-weight headline in optical white, " +
      "obsidian background, single Pulse Blue accent bar, minimal — no clutter.",
  },

  /* ==========================================================================
   * 17. DESIGN TOKENS
   * ========================================================================== */

  design_tokens: {
    color: {
      "--color-primary": "#00B4FF",
      "--color-secondary": "#C8CDD6",
      "--color-tertiary": "#F0F2F5",
      "--color-bg": "#0A0B0E",
      "--color-surface": "#111317",
      "--color-surface-alt": "#16191F",
      "--color-text": "#F0F2F5",
      "--color-text-muted": "#C8CDD6",
      "--color-success": "#00C896",
      "--color-warning": "#FFB020",
      "--color-error": "#FF3A3A",
      "--color-info": "#4DC8F5",
      "--color-border": "#2A2E38",
      "--color-focus": "#00B4FF",
    },
    spacing: {
      "--space-1": "2px",
      "--space-2": "4px",
      "--space-3": "8px",
      "--space-4": "12px",
      "--space-5": "16px",
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
      "--font-headline": "'DM Sans', 'Inter', 'Helvetica Neue', sans-serif",
      "--font-display": "'Space Grotesk', 'DM Sans', 'Inter', sans-serif",
      "--font-body": "'DM Sans', 'Inter', system-ui, sans-serif",
      "--font-ui": "'Inter', 'DM Sans', system-ui, sans-serif",
      "--font-mono": "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    },
    shadow: {
      "--shadow-sm": "0 1px 4px rgba(0, 0, 0, 0.5)",
      "--shadow-md": "0 4px 16px rgba(0, 0, 0, 0.65)",
      "--shadow-lg": "0 12px 40px rgba(0, 0, 0, 0.8)",
      "--shadow-glow-blue": "0 0 12px rgba(0, 180, 255, 0.25)",
    },
  },

  /* ==========================================================================
   * 18. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  responsive_behavior: {
    desktop: "Full precision grid, 1400px content max, extreme negative space, hover states active.",
    tablet: "Two-column grid, touch targets minimum 48px, sidebar collapses to bottom sheet.",
    tv: "10-foot UI: Space Grotesk numerals at 80px+, Pulse Blue focus rings at 3px, spatial navigation, no hover states.",
    mobile: "Single column, bottom tab bar in matte black, full-bleed poster grid, minimal chrome, sticky obsidian play bar.",
  },

  /* ==========================================================================
   * 19. SOUND IDENTITY
   * ========================================================================== */

  sound_identity: {
    startup_chime: "A single low sine tone (220 Hz) with precise decay — like a precision instrument powering on.",
    notification: "One short clean click at 1kHz, 80ms, -12dB — mechanical and exact.",
    ui_click: "Near-silent tactile click: 40ms transient, no reverb, -20dB.",
    success: "Two-tone ascending interval (perfect fifth), clean sine, 0.6s fade — clinical confirmation.",
    error: "Single low 160Hz pulse, 0.4s — non-alarming but unmistakably wrong. No harsh buzz.",
  },

  /* ==========================================================================
   * 20. SEASONAL VARIANTS
   * ========================================================================== */

  seasonal_variants: [
    {
      name: "Winter Signal",
      active_range: "12-01..01-15",
      overrides: {
        "--color-primary": "#60CFFF",
        "--color-bg": "#07090D",
      },
      motif: "Ice-blue pulse lines intensify; hairline frost-crystal patterns trace card borders at 3% opacity.",
    },
    {
      name: "Midnight Edition",
      active_range: "07-01..07-31",
      overrides: {
        "--color-surface": "#0D0F14",
        "--color-primary": "#00A3FF",
      },
      motif: "Ultra-deep obsidian surfaces; slightly cooler and darker than base — the darkest version of the kit.",
    },
  ],

  seasonal_activation: {
    mode: "live-js",
    motif_assets: [
      "img/seasonal/ice-crystal-pattern.svg",
      "img/seasonal/midnight-vignette.svg",
    ],
    banner: null,
  },

  /* ==========================================================================
   * 21. ACCESSIBILITY
   * ========================================================================== */

  accessibility: {
    minimum_contrast: "WCAG AA (4.5:1 body text, 3:1 large text/UI). Optical white (#F0F2F5) on obsidian (#0A0B0E) = ~18:1 — well above target.",
    focus_style: "1px Pulse Blue border + 4px blue glow ring; always visible on dark surfaces; 2px clear offset from element edge.",
    touch_target: "Minimum 48×48px on mobile and TV; 44×44px on desktop.",
    motion_reduction: "Honor prefers-reduced-motion; replace scan-line animations with instant opacity transitions.",
    font_scaling: "Layouts tested at 200% text zoom; all content reflows, no horizontal scroll below 320px viewport.",
  },

  /* ==========================================================================
   * 22. SITE ARCHITECTURE  — information architecture & page composition
   * ========================================================================== */

  site_architecture: {
    nav: [
      { id: "home",     label: "Home",        emphasis: "primary" },
      { id: "features", label: "Features",    emphasis: "primary" },
      { id: "clients",  label: "Clients",     emphasis: "default" },
      { id: "download", label: "Download",    emphasis: "primary" },
      { id: "hub",      label: "Hub",         emphasis: "default" },
      { id: "about",    label: "About",       emphasis: "muted" },
    ],
    demoted_pages: [
      { id: "plugins", reason: "Plugin system is an advanced topic for power users; link to it from the Features page and footer.", fold_into: "features" },
      { id: "docs",    reason: "Documentation lives in an external VitePress site; linked in footer under Developers." },
    ],
    extra_pages: [],
    footer_arrangement: "full-directory",
  },

  /* ==========================================================================
   * 23. HOMEPAGE NARRATIVE  — landing page story structure
   * ========================================================================== */

  homepage_narrative: {
    arc: "proof-first",
    logline: "A precision instrument for your media: silent, powerful, built to vanish into the experience.",
    sections: [
      { id: "hero-signal",       source: "copy_overlay.hero",  treatment: "Full-bleed obsidian hero with animated electric-blue pulse scan line; headline and CTAs emerge as the line traverses.", weight: "hero" },
      { id: "core-features",     source: "feature_casting",     treatment: "Three hero features (library, syncplay, transcode) laid out as isolated technical diagrams on a precision grid.", weight: "major" },
      { id: "precision-proof",   source: "proof_strategy",      treatment: "Trust signals rendered as a horizontal 'specification band': real client count, GitHub activity, technical spec excerpt.", weight: "minor" },
      { id: "client-hardware",   source: "page_blueprints.clients", treatment: "Five native clients rendered as hardware device silhouettes, each showing its native playback capability.", weight: "major" },
      { id: "download-station",  source: "conversion_funnel",   treatment: "Download page opening as a precision 'workbench': server install snippet centered, client selector below.", weight: "major" },
    ],
  },

  /* ==========================================================================
   * 24. PAGE BLUEPRINTS  — structural templates per page
   * ========================================================================== */

  page_blueprints: {
    features: {
      template: "spec-sheet",
      spec: "Present each feature as a technical specification card: title, one-line technical description, icon, and a single key technical detail in monospaced font.",
    },
    clients: {
      template: "device-rack",
      spec: "Lay each client device as a precision hardware silhouette — Roku, Samsung Tizen, Windows, Mobile, DLNA — each showing its native codec/playback strengths in a technical detail band.",
    },
    download: {
      template: "workbench",
      spec: "Frame the download as a precision workbench: server install one-liner centered and copied to clipboard with one tap, then client device-picker below, then ecosystem repo links as a 'reference shelf'.",
    },
    about: {
      template: "technical-brief",
      spec: "Tell the project story in three sections (Philosophy, License, Contributing), then the FAQ as a precision Q&A section styled as technical documentation.",
    },
  },

  /* ==========================================================================
   * 25. CONTENT CASTING & COPY  — feature weighting & voice
   * ========================================================================== */

  feature_casting: {
    hero: [
      { id: "library",   angle: "Your library indexed once, streamed to every device without reinvention." },
      { id: "syncplay",  angle: "Every device locked to the same frame — precision time-sync, no drift, no compromise." },
      { id: "transcode", angle: "One file, infinite clients — quality picked by the device, bandwidth by the network." },
    ],
    support: ["auth", "livetv", "dlna"],
    footnote: ["hub", "plugins"],
    omit_from_home: [],
  },

  copy_overlay: {
    hero: {
      eyebrow: "Precision engineering.",
      headline: "Silent power.",
      subheadline: "A self-hosted media server so controlled and precise that the technology vanishes. Only the content remains.",
      primary_cta: { label: "Download Phlix" },
      secondary_cta: { label: "Read the docs" },
    },
    section_headings: {
      pitch: "Built not decorated.",
      features: "Core Capabilities",
      cta_banner: "One line. Full precision.",
    },
    footer_tagline: "Media server excellence.",
  },

  copy_treatments: {
    pitch_bullets: "spec-rows",
    faq: "man-page",
    clients: "device-rack",
    ecosystem: "repo-list",
  },

  /* ==========================================================================
   * 26. INTERACTIVE SURFACES & EXPERIENCE
   * ========================================================================== */

  faq_experience: {
    frame: "man-page",
    persona: "A precision technical reference voice — direct, accurate, no flourish.",
    question_order: ["like-plex", "expose-internet", "formats", "mobile-app", "plugins", "license"],
    extra_questions: [
      { q: "Can I self-host the Hub, or do I need your server?", maps_to: "expose-internet" },
      { q: "Does Phlix play EVERYTHING my clients support?", maps_to: "formats" },
    ],
  },

  persona_vignettes: [
    {
      name: "The Home Lab Architect",
      scene: "A power user with a dedicated server cabinet in the basement: running Phlix on bare metal, configuring per-device transcoding profiles, monitoring SyncPlay latency across five devices in real time.",
      surfaces: ["admin dashboard", "SyncPlay lobby", "media player with overlay stats"],
      features_shown: ["library", "transcode", "syncplay", "auth"],
    },
    {
      name: "The Privacy Perfectionist",
      scene: "A household that values data sovereignty: Phlix server on their own hardware, Hub self-hosted in their own colocation, every connection encrypted, no cloud dependency.",
      surfaces: ["Hub admin panel", "media library", "network settings detail page"],
      features_shown: ["hub", "auth", "library"],
    },
    {
      name: "The Multi-Room Enthusiast",
      scene: "Four rooms, five devices, SyncPlay enabled: movie starts in the living room, user walks to the kitchen mid-scene and continues seamlessly on the TV there, all devices locked to the same frame.",
      surfaces: ["media player", "device selector", "SyncPlay status indicator"],
      features_shown: ["syncplay", "transcode", "auth"],
    },
  ],

  hero_experience: {
    mode: "static",
    spec: "Obsidian hero: static full-bleed background with the Pulse Blue animated scan line that traverses left-to-right, revealing the headline and CTAs beneath as it passes. No parallax or complex interaction — restraint and precision.",
    suggested_inputs: [],
    fallback: "Static obsidian-black hero with the headline, subheadline, and both CTAs rendered in a single view — the scan-line animation is omitted and the full copy is immediately readable (no JS required).",
    js_budget_kb: 3,
  },

  navigation_model: {
    mode: "topbar",
    spec: "A minimal matte-black top navigation bar: Phlix logo/wordmark left (optical white, Space Grotesk 300), canonical nav links centered (Inter 400), utilities right. Active link underlined in Pulse Blue. Hairline silver bottom border.",
    keyboard: null,
    fallback: "Standard accessible HTML <nav> with the same link order, fully keyboard reachable via Tab. Collapses to a hamburger menu on mobile — the hamburger is always present and accessible, never hidden behind a breakpoint. <nav role='navigation' aria-label='Primary'> with full focus visibility.",
  },

  scroll_experience: {
    mode: "continuous",
    spec: "Plain continuous scroll with hairline silver dividers between sections. Each section begins instantly with no transition effect — the focus is on content density and precision, not flourish.",
    reduced_motion: "Continuous scroll with instant section boundaries. No animations, no transitions — pure content hierarchy via layout and spacing. Under prefers-reduced-motion, even hairline dividers are already minimal (they remain, but no animation draws them).",
  },

  easter_eggs: [
    {
      trigger: "logo-clicks:5",
      effect: "The pulse scan line on the hero animates a three-pass full-width traverse, then the logo glows with a subtle Pulse Blue halo for 2 seconds before fading.",
      reward_copy: "Signal acquired.",
      exit: "The glow auto-fades after 2s, or press Esc to clear it immediately.",
    },
  ],

  conversion_funnel: {
    style: "instant-command",
    primary_goal: "Get a power user to download the server, configure it, and open the web lobby in under 5 minutes.",
    cta_ladder: [
      { step: 1, cta: "Download Phlix",      target: "download" },
      { step: 2, cta: "Choose Your Clients", target: "clients" },
      { step: 3, cta: "Copy & Run",          target: "download#server" },
    ],
    download_opening: "The Download page opens with a precision workbench aesthetic: 'One line. Full precision.' above the server install one-liner (copyable, highlighted in Pulse Blue), then the five client device silhouettes below, then the ecosystem repo shelf.",
    friction_notes: "Power users and technical enthusiasts — expect no hand-holding. Show the install snippet verbatim, the Docker alternative, the Docker Compose option. Link to the full docs. Assume confidence in the command line. The faster we get out of the way, the better.",
  },

  proof_strategy: {
    signals: [
      { type: "spec-numbers",     format: "A horizontal 'spec band' in monospaced font: '5 native clients / SyncPlay precision time-sync / HLS + FFmpeg transcoding / DLNA ContentDirectory / Phlix Hub reverse-tunnel relay' — pure technical capabilities." },
      { type: "github",           format: "A single line linking to the phlix-server GitHub repo with live star count and issue tracker — 'From the source code:' followed by the link." },
      { type: "quotes-from-docs", format: "One short technical assertion from the official docs, set in a blockquote with a hairline left border, optical-white text: 'Anything FFmpeg can read. Direct play when the client supports it; transcoded HLS otherwise.'" },
    ],
    placement: "A single compact 'Specifications' section between the hero features and the client hardware showcase, rendered as three horizontally-stacked detail bands (spec numbers, repo link, technical quote).",
  },

  visitor_paths: null,

  experience_archetype: "minimal",

  complexity_profile: {
    density: "standard",
    reading_level: "technical",
    jargon_policy: "foreground",
    page_budget: { home_sections_max: 5, words_per_section_max: 80 },
  },

  intensity_toggle: null,

  error_page_experience: {
    concept: "A dark 404: 'Signal not found' in Space Grotesk 300 at large scale, with the Phlix wordmark and a single hairline silver divider. Below: 'Return to home,' a link styled as a Pulse Blue underline.",
    recovery_links: ["home", "features", "download"],
  },

  /* ==========================================================================
   * 27. DO / DON'T
   * ========================================================================== */

  do_dont: {
    colors: {
      do: [
        "Use obsidian black as the default background on every screen",
        "Reserve Pulse Blue exclusively for the single primary CTA or active state per view",
        "Use platinum silver for all secondary labels, captions, and structural dividers",
      ],
      dont: [
        "Use warm tones, browns, or orange anywhere in the product",
        "Apply Pulse Blue as a fill to more than one element per screen",
        "Use white as a background or large-area fill",
      ],
      reason: "Restraint with color communicates premium quality; diluting the single blue accent destroys hierarchy.",
    },
    typography: {
      do: [
        "Set all headlines at DM Sans 300 or 400 weight with wide tracking",
        "Use JetBrains Mono for all technical values: resolution, runtime, bitrate",
        "Keep body copy at optical white (#F0F2F5) for maximum legibility on dark",
      ],
      dont: [
        "Use bold or heavy headline weights — they read as aggressive, not premium",
        "Mix more than two typefaces in any single view",
        "Use italic or decorative type — precision requires upright, geometric forms",
      ],
      reason: "Light-weight geometric type on dark surfaces is the typographic signature of luxury electronics.",
    },
    layout: {
      do: [
        "Use extreme negative space — emptiness is not wasted space, it is premium",
        "Align everything to a precise grid; no free-floating elements",
        "Separate sections with 1px hairline silver dividers only",
      ],
      dont: [
        "Pack elements tightly or use dense dashboards without breathing room",
        "Exceed 1400px content width",
        "Use decorative separators, ornamental lines, or border patterns",
      ],
      reason: "Spatial precision and restraint are non-negotiable identifiers of this aesthetic.",
    },
    animation: {
      do: [
        "Keep all transitions slow (300–500ms) with deceleration easing",
        "Limit animated elements to one at a time — never parallel motion",
        "Honor prefers-reduced-motion with instant opacity toggles",
      ],
      dont: [
        "Use bouncy or springy animations — they break the precise character",
        "Use particle effects, sparkles, or playful motion",
        "Animate layout (position/size) — animate only opacity and transform",
      ],
      reason: "Motion should communicate precision and calm authority, not playfulness.",
    },
    imagery: {
      do: [
        "Use product renders, technical diagrams, and dark-studio photography",
        "Apply cool color grading: desaturate and shift toward blue-black",
        "Silhouette figures against bright screens or Pulse Blue light sources",
      ],
      dont: [
        "Use warm lifestyle photography with natural light",
        "Use illustrations, cartoons, or hand-drawn artwork",
        "Use stock photography with orange-teal Hollywood grading",
      ],
      reason: "Imagery must reinforce the dark-tech, precision-luxury aesthetic at every touchpoint.",
    },
    branding: {
      do: [
        "Use the wordmark in optical white on obsidian or obsidian on Pulse Blue only",
        "Maintain the pulse-bar under the wordmark as the sole logo accent",
        "Apply extreme clear zone: 2× cap-height on all sides of the lockup",
      ],
      dont: [
        "Add any icon, symbol, or device to the logo except the approved pulse bar",
        "Recolor the wordmark to any shade other than optical white or obsidian",
        "Use the logo on any background lighter than deep-charcoal (#1C1F26)",
      ],
      reason: "Brand consistency on dark surfaces is the primary recognition mechanism.",
    },
    icons: {
      do: [
        "Use 1px hairline stroke icons with right-angle joins",
        "Keep icons single-color: optical white, platinum silver, or Pulse Blue for active",
        "Design at 16px on a precise pixel grid — test at 1x before delivery",
      ],
      dont: [
        "Use rounded-corner icons or icons with 2px+ stroke weight",
        "Use filled or duotone icons in the main UI",
        "Use decorative or illustrative icons — every icon must be functional",
      ],
      reason: "Precision hairline icons align with the machined-aluminium visual language.",
    },
    copywriting: {
      do: [
        "State facts directly: numbers, specs, capabilities — not adjectives",
        "Write UI copy as system messages: clear, factual, minimal",
        "Use technical vocabulary that respects user intelligence",
      ],
      dont: [
        "Use superlatives, hype language, or marketing adjectives in UI",
        "Use exclamation marks anywhere in the product interface",
        "Anthropomorphize the product — it is a precision instrument, not a personality",
      ],
      reason: "The voice of precision technology earns trust through accuracy, not enthusiasm.",
    },
    ux: {
      do: [
        "Make the primary action unambiguous with a single Pulse Blue button",
        "Provide technical detail (codec, resolution, bitrate) where users need it",
        "Keep flows short and direct — every tap should feel intentional",
      ],
      dont: [
        "Add confirmation dialogs for reversible actions",
        "Use onboarding tooltips or coach marks — trust user intelligence",
        "Hide technical metadata behind extra taps for power users",
      ],
      reason: "Power users expect direct control and immediate access to technical information.",
    },
    performance: {
      do: [
        "Load poster images progressively — obsidian placeholder first, then sharp image",
        "Lazy-load all off-screen media assets",
        "Keep animation to GPU-composited properties only: opacity and transform",
      ],
      dont: [
        "Use unoptimised hero images or uncompressed textures",
        "Animate layout-triggering properties: width, height, top, left",
        "Block the main thread with non-deferred script for UI chrome",
      ],
      reason: "A premium experience must match its visual precision with technical performance.",
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
    notes: "Base/parent kit. Obsidian Pulse — dark premium tech aesthetic. Author variations against this via base_kit.slug = 'obsidian-pulse'.",
  },
};

// Export (ESM). Consumers:
//   import baseKit from './obsidian-pulse.js'
//   import { brandKit } from './obsidian-pulse.js'
// CommonJS consumers on Node 22+:  const baseKit = require('./obsidian-pulse.js').default
export default brandKit;
export { brandKit };
