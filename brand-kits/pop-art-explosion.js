/**
 * ============================================================================
 *  PHLIX BRAND KIT  —  "Pop Art Explosion"
 *  pop-art-explosion.js    (BASE / PARENT kit)
 * ============================================================================
 *
 *  Concept: Roy Lichtenstein meets Andy Warhol — Ben-Day dots screaming on
 *  white backgrounds, bold comic-panel speech bubbles, silk-screened celebrity
 *  portraits repeated in shocking primary blocks, thick black outlines
 *  containing every shape. Radical, democratic, ironic, loud, fun.
 *  Pure primaries: red, yellow, blue, white, black — occasional Campbell's
 *  soup-can orange for maximum discomfort.
 *
 *  BASE kit — not a variation.
 * ============================================================================
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY
   * ========================================================================== */

  name: "Pop Art Explosion",

  slug: "pop-art-explosion",

  version: "1.0",

  description:
    "Pure, screaming pop art energy straight off the gallery walls of 1960s " +
    "Manhattan — Ben-Day dot fields, primary-color silk screens, chunky comic " +
    "speech bubbles, and thick black outlines. Every screen is a canvas, every " +
    "interaction a happening. Bold, democratic, ironic, and unapologetically loud.",

  inspiration: [
    "Roy Lichtenstein comic-book paintings",
    "Andy Warhol Campbell's soup cans and Marilyn diptychs",
    "1960s LIFE Magazine photo-essays",
    "DC and Marvel Silver Age comics (1956–1970)",
    "Jasper Johns flag paintings",
    "Robert Rauschenberg combine prints",
    "Mass-produced consumer packaging of the Kennedy era",
    "NYC subway posters from the 1960s",
    "Halftone offset lithography printing artifacts",
  ],

  keywords: [
    "pop art", "bold", "primary", "comic", "Ben-Day dots", "halftone",
    "speech bubble", "silk screen", "Lichtenstein", "Warhol", "loud", "fun",
    "ironic", "retro", "graphic", "flat", "high-contrast", "red", "yellow",
    "blue", "black outline", "white", "orange", "repeat", "pattern", "grid",
    "portrait", "celebrity", "consumer culture", "democratic", "mass media",
    "thick stroke", "condensed", "comic sans antidote", "kapow", "pow",
    "zap", "bam", "thought bubble", "panel", "four-color printing", "offset",
    "inky", "poster", "stencil", "stamp", "silkscreen", "newsprint",
    "onomatopoeia", "exclamation", "radical", "60s", "counterculture",
    "gallery", "happening", "art world", "vibrant", "saturated",
  ],

  /* ==========================================================================
   * 2. PERSONALITY
   * ========================================================================== */

  personality: ["Bold", "Ironic", "Energetic", "Playful", "Radical", "Democratic"],

  emotional_goals: ["Excitement", "Delight", "Surprise", "Joy", "Energy"],

  archetype: "Jester",

  audience: [
    "Design-curious cinephiles",
    "Art lovers and gallery-goers",
    "Gen Z and Millennial power users",
    "Collectors of cult films and niche media",
    "Anyone who believes software can be a work of art",
  ],

  /* ==========================================================================
   * 3. BRAND STORY
   * ========================================================================== */

  story:
    "In 1962 Andy Warhol silkscreened a soup can and dared the world to call it " +
    "art. Sixty years later Phlix asks the same question about your media library. " +
    "Pop Art Explosion was born in an imaginary Factory loft — Campbell's cans " +
    "stacked floor to ceiling, a quartet of Marilyns staring from the wall, silver " +
    "foil everywhere. The brand channels that spirit: your home movies and streaming " +
    "picks are as worthy of a gallery wall as anything Roy Lichtenstein ever painted. " +
    "Press play and the dots start pulsing. WHAM!",

  tagline_primary: "WHAM! Your media, amplified.",

  tagline_secondary: [
    "Press play. Make a scene.",
    "Your library. Four-color glory.",
    "Dot dot dot... BOOM.",
    "Art is everywhere. So is your next binge.",
  ],

  mission:
    "Turn every media collection into a statement — loud, bold, and impossible to ignore.",

  values: ["Boldness", "Creativity", "Accessibility", "Individuality", "Fun"],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES
   * ========================================================================== */

  brand_dna:
    "Pop Art Explosion is primary-color fireworks set to the rhythm of a comic-book " +
    "panel. It is thick black outlines on blazing white, Ben-Day dots pulsing under " +
    "silk-screened portraits, and speech bubbles that shout from every corner. It is " +
    "never quiet, never grey, never corporate.",

  design_principles: [
    "Every element must earn its place — if it cannot shout, it should not exist.",
    "Thick black outlines on EVERYTHING: cards, buttons, illustrations, text.",
    "Primary colors only — red, yellow, blue, white, black, pop orange. No pastels.",
    "Ben-Day dot patterns are the brand's texture — use them as backgrounds and fills.",
    "Type is always condensed, bold, and aggressive — never thin or light.",
    "Speech bubbles and comic-panel gutters are legitimate layout tools.",
    "Repetition is a feature — Warhol-style grids of the same element create rhythm.",
    "White backgrounds are the canvas — color explodes FROM the white, not into it.",
  ],

  brand_opposites: [
    "Not pastel or muted",
    "Not minimalist white-space without graphic intent",
    "Not skeuomorphic or realistic textures",
    "Not soft-rounded or friendly-cozy",
    "Not corporate slate grey",
    "Not dark mode by default",
    "Not thin or hairline type",
    "Not gradient washes or glassmorphism",
  ],

  signature_elements: [
    "Ben-Day dot fields",
    "Comic speech and thought bubbles",
    "Thick 3px–6px black ink outlines",
    "Silk-screen repeated portrait grids",
    "Onomatopoeia bursts (KAPOW, ZAP, BAM, POW)",
    "Four-color panel compositions",
    "Campbell's soup-orange accent bands",
    "Halftone rosette patterns",
  ],

  header_motif: "Onomatopoeia starburst animation — POW! radiating from the logo",

  /* ==========================================================================
   * 5. VISUAL IDENTITY
   * ========================================================================== */

  visual_style: [
    "Pop art",
    "Comic-book graphic",
    "Silk screen print",
    "Halftone dot field",
    "Flat bold vector",
  ],

  art_direction:
    "Every piece of artwork should look like it was ripped from a 1965 DC Comics " +
    "panel, then blown up 10× on a photocopier and silkscreened in four-color " +
    "process. Outlines are thick and decisive — no tapers, no brush-strokes. " +
    "Fills are flat primary blocks of red (#FF1A1A), yellow (#FFE600), blue " +
    "(#0028DC), white (#FFFFFF), or pop orange (#FF6B00). Ben-Day dot overlays in " +
    "contrasting colors create the halftone illusion of shading. Speech bubbles cut " +
    "into compositions unexpectedly. Subjects are cropped dramatically — tight on a " +
    "face, half cut off by the frame edge — in Lichtenstein fashion. The only allowed " +
    "texture is the halftone dot grid; everything else is clean vector. Background is " +
    "always stark white unless a full-bleed primary block is called for. Never use " +
    "drop shadows, gradients, or blur. This is printing-press flat, and proud of it.",

  realism: "cartoon",

  rendering_style: ["comic", "halftone", "vector", "flat"],

  texture_level: "medium",

  depth: "flat",

  lighting: {
    temperature: "neutral",
    quality: "flat — no directional lighting; all shading is via Ben-Day dots",
    shadows: "none",
    contrast: "high",
    notes:
      "No real lighting simulation. 'Shadow' is achieved with halftone dot overlays " +
      "in yellow or blue on white. Never use actual drop shadows or gradients.",
  },

  composition: [
    "Tight dramatic crop — subject bleeds off the edge",
    "Comic panel gutters divide the canvas into bold zones",
    "Speech bubbles overlap the focal subject unexpectedly",
    "Repetition grids (Warhol 4×4 or 2×2 portrait tiles)",
    "Dominant single subject on stark white",
    "High contrast figure-to-ground",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM
   * ========================================================================== */

  colors: {
    primary: {
      name: "Kapow Red",
      hex: "#FF1A1A",
      rgb: "rgb(255, 26, 26)",
      hsl: "hsl(0, 100%, 55%)",
      usage: "Primary CTAs, active states, starburst accents, hero backgrounds.",
      contrast_targets: ["white", "yellow"],
    },
    secondary: {
      name: "Zap Yellow",
      hex: "#FFE600",
      rgb: "rgb(255, 230, 0)",
      hsl: "hsl(54, 100%, 50%)",
      usage: "Secondary CTAs, highlight bands, Ben-Day dot fills, badges.",
      contrast_targets: ["black_outline", "primary_red"],
    },
    tertiary: {
      name: "Pow Blue",
      hex: "#0028DC",
      rgb: "rgb(0, 40, 220)",
      hsl: "hsl(228, 100%, 43%)",
      usage: "Informational elements, links, selected states, dot-fill shading.",
      contrast_targets: ["white", "yellow"],
    },
    neutral: {
      name: "Newsprint Black",
      hex: "#0A0A0A",
      rgb: "rgb(10, 10, 10)",
      hsl: "hsl(0, 0%, 4%)",
      usage: "All outlines, body text, dividers, icon strokes. The backbone color.",
      contrast_targets: ["white", "yellow", "primary_red"],
    },
    background: {
      name: "Gallery White",
      hex: "#FFFFFF",
      rgb: "rgb(255, 255, 255)",
      hsl: "hsl(0, 0%, 100%)",
      usage: "Default page background — the canvas. Never dilute it to off-white.",
      contrast_targets: ["newsprint_black", "kapow_red", "pow_blue"],
    },
    surface: {
      name: "Panel White",
      hex: "#FAFAFA",
      rgb: "rgb(250, 250, 250)",
      hsl: "hsl(0, 0%, 98%)",
      usage: "Card surfaces — barely distinguishable from background, differentiated by the 3px black border.",
      contrast_targets: ["newsprint_black"],
    },
    surface_alt: {
      name: "Dot Field Yellow",
      hex: "#FFFBE0",
      rgb: "rgb(255, 251, 224)",
      hsl: "hsl(53, 100%, 94%)",
      usage: "Alternate panel backgrounds — evokes yellow Ben-Day dot fill.",
      contrast_targets: ["newsprint_black"],
    },
    text: {
      name: "Newsprint Black",
      hex: "#0A0A0A",
      rgb: "rgb(10, 10, 10)",
      hsl: "hsl(0, 0%, 4%)",
      usage: "All body and headline text. Never use a colour for body text.",
      contrast_targets: ["white", "yellow", "surface"],
    },
    success: {
      name: "Zap Yellow Bright",
      hex: "#FFE600",
      rgb: "rgb(255, 230, 0)",
      hsl: "hsl(54, 100%, 50%)",
      usage: "Success states — yellow burst with black check icon.",
      contrast_targets: ["newsprint_black"],
    },
    warning: {
      name: "Soup Can Orange",
      hex: "#FF6B00",
      rgb: "rgb(255, 107, 0)",
      hsl: "hsl(25, 100%, 50%)",
      usage: "Warnings — the brand's occasional Campbell's orange.",
      contrast_targets: ["newsprint_black", "white"],
    },
    error: {
      name: "Kapow Red Dark",
      hex: "#CC0000",
      rgb: "rgb(204, 0, 0)",
      hsl: "hsl(0, 100%, 40%)",
      usage: "Error states and destructive actions.",
      contrast_targets: ["white"],
    },
    info: {
      name: "Pow Blue",
      hex: "#0028DC",
      rgb: "rgb(0, 40, 220)",
      hsl: "hsl(228, 100%, 43%)",
      usage: "Informational banners, tips, tooltips.",
      contrast_targets: ["white"],
    },
    focus: {
      name: "Zap Yellow Focus",
      hex: "#FFE600",
      rgb: "rgb(255, 230, 0)",
      hsl: "hsl(54, 100%, 50%)",
      usage: "Keyboard focus ring — yellow with black offset, impossible to miss.",
      contrast_targets: ["newsprint_black"],
    },
    border: {
      name: "Newsprint Black",
      hex: "#0A0A0A",
      rgb: "rgb(10, 10, 10)",
      hsl: "hsl(0, 0%, 4%)",
      usage: "All card/border/divider strokes — thick, decisive, ink-press flat.",
      contrast_targets: ["white", "yellow"],
    },
    shadow: {
      name: "Offset Black",
      hex: "#0A0A0A",
      rgb: "rgba(10, 10, 10, 1)",
      hsl: "hsl(0, 0%, 4%)",
      usage:
        "Pop art uses a hard black OFFSET rather than a blur shadow — shift element " +
        "4px right + 4px down with a solid #0A0A0A fill for the 'shadow' shape.",
      contrast_targets: [],
    },
    overlay: {
      name: "Ben-Day Scrim",
      hex: "#0A0A0A",
      rgb: "rgba(10, 10, 10, 0.72)",
      hsl: "hsl(0, 0%, 4%)",
      usage: "Modal scrim — near-opaque black, never warm-tinted.",
      contrast_targets: [],
    },
    gradients: [
      {
        name: "Primary Stripe",
        type: "linear",
        angle: "90deg",
        stops: ["#FF1A1A", "#FFE600"],
        usage: "Hero accent band — used sparingly as a top or bottom border stripe.",
      },
      {
        name: "Silk Screen Trio",
        type: "linear",
        angle: "120deg",
        stops: ["#FF1A1A", "#0028DC", "#FFE600"],
        usage: "Marketing hero only — three-stop Andy Warhol silk-screen reference.",
      },
    ],
  },

  color_rules: [
    "Backgrounds must be stark white (#FFFFFF) or a full-bleed primary block — never off-white or grey.",
    "No gradients on UI elements — primaries only, flat blocks.",
    "Outlines are always #0A0A0A at minimum 3px on cards and buttons.",
    "Yellow (#FFE600) must always pair with the black outline to meet contrast.",
    "Soup can orange (#FF6B00) is a treat — use on warnings and accent bands only.",
    "Never combine all four primaries (red/yellow/blue/orange) in a single view; pick two or three.",
    "Hard black offset replaces blurred drop shadows everywhere.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  fonts: {
    headline: {
      family: "Bangers",
      weight: [400],
      fallbacks: ["Boogaloo", "Impact", "Arial Black", "sans-serif"],
      usage: "Hero headlines, onomatopoeia bursts, page titles — maximum impact.",
      tracking: "0.05em",
      line_height: 0.9,
    },
    display: {
      family: "Anton",
      weight: [400],
      fallbacks: ["Impact", "Arial Black", "Haettenschweiler", "sans-serif"],
      usage: "Very large display numerals, stat figures, countdown timers.",
      tracking: "0.02em",
      line_height: 0.85,
    },
    body: {
      family: "Barlow Condensed",
      weight: [400, 600],
      fallbacks: ["Oswald", "Roboto Condensed", "Arial Narrow", "sans-serif"],
      usage: "Paragraphs, descriptions, metadata labels — condensed for density.",
      tracking: "0.01em",
      line_height: 1.5,
    },
    ui: {
      family: "Barlow",
      weight: [600, 700],
      fallbacks: ["Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      usage: "Buttons, chips, nav labels, form inputs — punchy, legible UI text.",
      tracking: "0.03em",
      line_height: 1.2,
    },
    mono: {
      family: "Share Tech Mono",
      weight: [400],
      fallbacks: ["Courier New", "monospace"],
      usage: "Code blocks, tokens, timecodes — evokes a dot-matrix press.",
      tracking: "0em",
      line_height: 1.5,
    },
    number: {
      family: "Anton",
      weight: [400],
      fallbacks: ["Impact", "Arial Black", "sans-serif"],
      usage: "Stats, episode counts, library sizes, progress percentages.",
      tracking: "0.02em",
      line_height: 1.0,
    },
  },

  typography_rules: [
    "Headlines ALWAYS in Bangers; never use Bangers for body text.",
    "ALL CAPS is encouraged for headlines and short labels — this is pop art.",
    "Never use thin or light font weights — minimum 400, prefer 600/700 for UI.",
    "Tight tracking for display (0.05em); functional tracking for body.",
    "Body line-length: 55–70 characters; condensed type allows more per line.",
    "Outline text (CSS -webkit-text-stroke: 2px #0A0A0A) on yellow and red headlines.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  shape_language: [
    "Thick-bordered rectangles (the comic panel)",
    "Starburst / explosion polygons (KAPOW!)",
    "Speech bubbles (rounded rectangle with tail)",
    "Thought bubbles (chained circles)",
    "Hard-edged squares (Warhol portrait grid cells)",
    "Circles (Ben-Day dot individual units)",
  ],

  corner_radius: {
    small: "0px",
    medium: "4px",
    large: "8px",
    xl: "16px",
    pill: "999px",
  },

  borders: {
    thickness: "3px",
    style: "solid",
    rounded: false,
    hand_drawn: false,
    notes:
      "Borders are crisp, thick, mechanical — not hand-drawn. The default is 3px " +
      "solid #0A0A0A. Feature elements (cards, buttons, modals) use 4px. " +
      "Hard offset shadow = duplicate shape at +4px/+4px, no blur.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  icon_style: ["Filled", "Outlined", "Retro", "Comic"],

  icon_rules: [
    "3px stroke weight on outlined icons — thick and bold.",
    "Sharp 90° corners by default; round only the absolute minimum.",
    "Single flat color fill (red, yellow, blue, or black) — no gradients.",
    "Duotone only on featured icons: black outline + one primary fill.",
    "Icon sets should feel like they come from a 1960s instruction manual.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  illustration_style: [
    "Roy Lichtenstein comic-panel close-up",
    "Andy Warhol repeated silk-screen portrait",
    "Silver Age DC/Marvel comic art",
    "1960s Pop Art gallery painting",
    "Flat halftone print advertising",
  ],

  character_style: {
    proportions: "Slightly exaggerated — large expressive eyes, strong jaw, dramatic hair.",
    eyes: "Bold defined pupils with thick white highlight; Lichtenstein-style reflections.",
    expressions: "Dramatically emotive — shocked, determined, lovestruck, gleeful.",
    clothing: "Bold solid-color 1960s fashion: shift dresses, turtlenecks, mod prints.",
    outlines: "4px flat black — no variation in stroke weight, pure comic-book ink.",
  },

  mascot: {
    name: "Dotty",
    species: "Anthropomorphic Ben-Day dot circle",
    personality:
      "Irreverent, shout-y, always making a scene — the hype person you didn't know you needed.",
    description:
      "A perfect circle face made of Ben-Day dots, wearing oversized speech bubble " +
      "earrings, thick Lichtenstein-style black outline, alternating red and yellow " +
      "body panels. Dotty speaks entirely in onomatopoeia and exclamation marks.",
    poses: [
      "Arms wide — KAPOW! starburst behind",
      "Pointing at you — THIS one!",
      "Rolling eyes (Ben-Day dot pupils sliding sideways)",
      "Holding a clapperboard",
    ],
    expressions: ["SHOCKED", "THRILLED", "BORED (ironically)", "TRIUMPHANT"],
  },

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  photography_style: [
    "High-contrast duotone (red+white or blue+white)",
    "Halftone-filtered as if printed on newsprint",
    "Tight dramatic crop in the Lichtenstein style",
    "Flat primary color overlays (silk-screen effect)",
  ],

  photo_rules: [
    "All photos must be treated with a halftone or silk-screen filter — no raw photography.",
    "Use only two colors per treated photo (duotone): one primary + white.",
    "Crop dramatically — bleed the subject off at least one edge.",
    "Never use realistic photography unfiltered; always stylize to match the comic aesthetic.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  motion_style: ["Punchy", "Snappy", "Staccato", "Comic-book"],

  transitions: [
    "Panel wipe (left→right, like turning a comic page)",
    "Starburst zoom (KAPOW! radial)",
    "Hard cut (no easing — deliberate)",
    "Ink stamp reveal (fade from halftone dots)",
    "Snap scale",
  ],

  animation_speed: "fast",

  easing: ["ease-in-out", "steps(4, end)", "cubic-bezier(0.34, 1.56, 0.64, 1)"],

  microinteractions: {
    hover:
      "Cards shift 4px right + 4px down to reveal the hard black offset shadow (reverses on leave).",
    button_press:
      "Hard squash to 0.95 — no bounce, just a crisp 80ms press and release.",
    loading:
      "Ben-Day dots stamp onto screen one row at a time, left to right, like an old dot-matrix printer.",
    drag:
      "Element gets a thick red outline and a GRAB! thought bubble while dragging.",
    focus:
      "3px solid yellow (#FFE600) focus ring with 2px black offset — blazing and unmissable.",
    success:
      "Starburst burst: POW! text in Bangers, radiating from the confirmed element.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  ui_style: [
    "Hard black 3px outlines on every element",
    "Flat primary color fills — no gradients",
    "Ben-Day dot fields as panel backgrounds",
    "Speech bubble tooltips and callouts",
    "Comic-panel gutters between content blocks",
  ],

  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],

  shadows: {
    sm: "2px 2px 0px #0A0A0A",
    md: "4px 4px 0px #0A0A0A",
    lg: "6px 6px 0px #0A0A0A",
    notes:
      "ALL shadows are HARD OFFSET — zero blur, zero spread, solid black. This is the " +
      "defining pop-art shadow treatment. Never use Gaussian blur shadows.",
  },

  cards: {
    elevation: "md",
    padding: "16px",
    border_radius: "4px",
    border: "3px solid #0A0A0A",
    background: "#FAFAFA",
    notes:
      "Cards have the hard 3px ink border and a 4px/4px black offset shadow to the " +
      "bottom-right. On hover the card shifts 4px right+down so it sits on the shadow.",
  },

  buttons: {
    primary:   { bg: "#FF1A1A", text: "#FFFFFF", radius: "4px", notes: "Red, 3px black border, 4px offset shadow, Barlow 700 ALL CAPS." },
    secondary: { bg: "#FFE600", text: "#0A0A0A", radius: "4px", notes: "Yellow, 3px black border, 4px offset shadow. Always pair with black text." },
    danger:    { bg: "#CC0000", text: "#FFFFFF", radius: "4px", notes: "Darker red for destructive actions." },
    ghost:     { bg: "transparent", text: "#0A0A0A", radius: "4px", notes: "3px black border, no fill, offset shadow." },
    link:      { bg: "transparent", text: "#0028DC", radius: "0", notes: "Blue text, thick underline on hover." },
    icon:      { bg: "#FFE600", text: "#0A0A0A", radius: "4px", notes: "Yellow square icon button with 3px border." },
    fab:       { bg: "#FF1A1A", text: "#FFFFFF", radius: "4px", notes: "Red floating action button, square not pill, POW! label." },
  },

  forms: {
    inputs:
      "White fill, 3px black border, 4px offset shadow, 4px radius; focused = 3px yellow border with black offset.",
    checkboxes:
      "Square, 3px black border, fills solid red when checked — no checkmark, just a bold X.",
    switches:
      "Rectangular pill, 3px border; off = white/black; on = red/white, snaps with a hard click.",
    dropdowns:
      "White panel with 3px black border, 4px offset shadow; options have red hover state.",
    validation:
      "Inline message in a yellow speech bubble (error) or red starburst (error/destructive); never inline colour on the input text itself.",
  },

  tables: {
    headers: "Bangers ALL CAPS on a solid yellow (#FFE600) header row with 3px bottom black border.",
    hover: "Row turns red (#FF1A1A) with white text on hover — aggressive.",
    sorting: "Bold black up/down arrows — chunky, no fine hairlines.",
    striping: "Every other row gets the Dot Field Yellow (#FFFBE0) background.",
  },

  navigation: {
    sidebar:
      "White panel with 3px right-edge black border; active item = solid red block with white Barlow label.",
    topbar:
      "White bar, 3px bottom black border, Bangers logo in red, nav items in Barlow 700.",
    tabs:
      "Square tabs with 3px border; active tab fills solid blue (#0028DC) with white label.",
    breadcrumbs:
      "Barlow Condensed crumbs separated by a bold › glyph in red.",
  },

  dashboard_style:
    "Stark white canvas divided by thick black panel gutters into comic-panel zones. " +
    "Each zone owns one metric in massive Anton numerals. Accent bands of red or yellow " +
    "at the top of each panel. No decorative whitespace — if there is space, fill it " +
    "with a Ben-Day dot pattern.",

  component_styles: {
    dialog:
      "White card, 4px black border, 8px/8px black offset shadow; title in Bangers on red bar; " +
      "close button = red X in a yellow circle with black outline.",
    sidebar:
      "See navigation.sidebar; collapses to a 48px icon strip with red active indicator.",
    carousel:
      "Flat poster rail with comic-panel gutters (4px black) between posters; navigation arrows are bold black triangles in yellow boxes.",
    search_bar:
      "White pill input, 3px black border; placeholder 'SEARCH YOUR COLLECTION!' in Barlow 600.",
    media_player:
      "White control bar with 3px top black border; scrubber fills red; all icons in bold black 3px stroke.",
    toast:
      "Speech bubble toast anchored bottom-right, 3px black border, 4px offset shadow; POW!/YAY! prefix in Bangers.",
    chip:
      "Square chip with 2px black border and red or yellow fill; Barlow 700 label.",
  },

  layout_patterns: {
    dashboard:
      "Comic panel grid: thick black gutters divide the page into 4–6 panels; each panel = one KPI widget.",
    settings:
      "Left yellow sidebar nav (3px right border) + right white form panel; header in red band.",
    media_library:
      "Sticky filter strip (red background) → tight poster grid with 3px black gutters (Warhol tiled look).",
    authentication:
      "Centered white card on solid red full-bleed background, 4px black border, Bangers headline.",
    landing:
      "Full-bleed red hero with Bangers white headline + Ben-Day dot fill → yellow feature panels → white CTA.",
    detail_view:
      "Duotone hero backdrop (blue+white) → yellow metadata band → white episode/related rail with black gutters.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY
   * ========================================================================== */

  poster_style:
    "Comic book cover: bold Bangers title in white on a red band at the bottom, " +
    "key art treated as flat halftone illustration, thick black border, 4px radius corner, " +
    "no realistic photography.",

  thumbnail_style:
    "4px radius, 3px black border, 3px/3px black offset shadow, duotone halftone art filter.",

  backdrop_style:
    "Full-bleed duotone halftone (primary + white) or a Warhol-style 2×2 repeated portrait grid; " +
    "never a realistic photo.",

  media_cards:
    "Poster on top with 3px black border; below = white panel with title in Bangers + metadata in Barlow; " +
    "hover shifts the whole card onto the offset shadow; red POW! play-circle appears top-right on hover.",

  badges: {
    labels: ["4K", "HDR", "Dolby Vision", "Continue Watching", "New", "Favorite", "POW!"],
    shape: "Square with 3px black border — no pills.",
    colors:
      "4K/HDR = blue on white; New/Continue = red on white; Favorite = yellow on black; POW! = red on yellow.",
    typography: "Bangers, ALL CAPS, large.",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  voice: ["Loud", "Ironic", "Punchy", "Exclamatory", "Self-aware"],

  tone: ["Excited", "Irreverent", "Witty", "Direct"],

  writing_style:
    "SHORT SENTENCES. Often incomplete. Sometimes just one word: BOOM. " +
    "Active voice always. Exclamation marks are earned by the sentence, " +
    "not bolted on — but many sentences genuinely earn them here. " +
    "Occasional ironic understatement after a dramatic opener works brilliantly. " +
    "Never corporate. Never passive. Never hedge.",

  vocabulary: [
    "KAPOW", "ZAP", "BAM", "POW", "WHAM", "BOOM", "BANG",
    "explode", "blast", "scream", "splash", "stamp", "print", "bold",
    "panel", "frame", "dot", "primary", "amplified", "loud",
  ],

  avoid_words: [
    "synergy", "leverage", "robust", "ecosystem", "seamless", "innovative",
    "cutting-edge", "game-changer", "holistic", "empower", "utilize",
  ],

  greetings: [
    "POW! Good to see you.",
    "You're back. The dots approve.",
    "WHAM! Your library awaits.",
    "ZAP! Ready when you are.",
  ],

  empty_state_messages: [
    "Nothing here yet. But imagine the possibilities — POW!",
    "This panel is blank. That's your cue to add something BOLD.",
    "Empty? Add your first title and make a scene.",
    "BAM! Just kidding — nothing's here yet. Add something.",
  ],

  notification_style:
    "Brief, exclamatory, never whiny — like a text from a very enthusiastic friend. " +
    "One exclamation mark per notification, maximum.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE
   * ========================================================================== */

  image_prompt_prefix:
    "Pop art in the style of Roy Lichtenstein and Andy Warhol, bold flat primary colors " +
    "(red #FF1A1A, yellow #FFE600, blue #0028DC), stark white background, thick 4px black " +
    "ink outlines, Ben-Day halftone dot shading, no gradients, no shadows,",

  image_prompt_suffix:
    ", comic-book panel composition, flat vector rendering, high contrast, " +
    "1960s pop art gallery aesthetic, no photorealism, no pastel colors.",

  negative_prompt: [
    "gradients",
    "blur",
    "drop shadows",
    "pastel",
    "muted tones",
    "watercolor",
    "photorealistic",
    "dark moody",
    "minimalist",
    "glassmorphism",
    "skeuomorphic textures",
    "thin fonts",
    "serif body text",
    "cool grey",
  ],

  ui_generation_rules: [
    "White background; primary-color fills are accents, not backgrounds.",
    "ALL cards, buttons, and containers must have a 3px solid black border.",
    "Shadows are HARD OFFSET (4px/4px solid black) — never blurred.",
    "Fonts: Bangers for headlines, Barlow for body and UI.",
    "No border-radius over 8px on any non-pill element.",
    "Every screen must contain at least one Ben-Day dot accent area.",
    "Max content width 1280px.",
    "Use comic-panel gutter lines (4px black) to divide layout zones.",
  ],

  logo_rules: {
    shape:
      "Bangers wordmark 'PHLIX' in stark white inside a solid red rectangle, " +
      "3px black border all around, 4px/4px black offset shadow.",
    complexity: "One color block + one text treatment. Never more than two elements.",
    negative_space: "Minimal — pop art uses space aggressively. Tight margins are intentional.",
    colors: "White text on red, or black text on yellow. Never reversed onto a photo.",
    allowed_symbols: ["starburst", "speech bubble", "Ben-Day dot pattern", "clapperboard"],
    forbidden_symbols: [
      "gradients in or around the wordmark",
      "play-button triangle alone",
      "film reel (reserved for other kits)",
      "gears or tech icons",
    ],
  },

  illustration_prompt_template:
    "{prefix} {subject}, pop art panel composition, Ben-Day dot shading, " +
    "speech bubble callout, flat primary fills, {mood} {suffix}",

  page_generation_rules: [
    "Every page must have at least one full-bleed primary color band.",
    "Hero sections use a Bangers headline in white on red, full width.",
    "Card grids use 3px black gutters — no space between cards, just the gutter.",
    "CTAs are always red with white Barlow 700 ALL CAPS text.",
    "Ben-Day dot pattern fills at least 20% of every screen's visual area.",
    "Maximum page width 1280px; no centered-island layout on hero sections.",
  ],

  prompt_library: {
    logo:
      "Pop art logo: the word PHLIX in Bangers bold white type inside a solid red rectangle, " +
      "3px black border, 4px black offset shadow, stark white background, no gradients.",
    illustration:
      "{image_prompt_prefix} {subject} {image_prompt_suffix}",
    icon:
      "Pop art icon of {subject}: flat vector, single primary color fill, 3px black outline, " +
      "no gradients, no shadows, 1960s graphic design style.",
    background:
      "Repeating Ben-Day dot grid pattern on white in {color}, evenly spaced circles " +
      "like a Roy Lichtenstein canvas, no other elements.",
    landing_page:
      "Pop art landing page: full-bleed red hero with Bangers white headline, " +
      "yellow feature band below with Barlow 700 text, white CTA section with red button, " +
      "thick black panel gutters, Ben-Day dot accents, no gradients.",
    dashboard:
      "Pop art media dashboard: white background, comic-panel grid divided by 4px black gutters, " +
      "Anton numerals for stats, red and yellow accent bands on panel headers, " +
      "Ben-Day dot fills, bold type throughout.",
    marketing:
      "Pop art social graphic for {topic}: Bangers headline in white on red band, " +
      "key image duotone-treated in blue+white, Ben-Day dot fill behind headline, " +
      "4px black border frame, yellow call-to-action strip at bottom.",
  },

  /* ==========================================================================
   * 17. DESIGN TOKENS
   * ========================================================================== */

  design_tokens: {
    color: {
      "--color-primary":     "#FF1A1A",
      "--color-secondary":   "#FFE600",
      "--color-tertiary":    "#0028DC",
      "--color-orange":      "#FF6B00",
      "--color-bg":          "#FFFFFF",
      "--color-surface":     "#FAFAFA",
      "--color-surface-alt": "#FFFBE0",
      "--color-text":        "#0A0A0A",
      "--color-success":     "#FFE600",
      "--color-warning":     "#FF6B00",
      "--color-error":       "#CC0000",
      "--color-info":        "#0028DC",
      "--color-border":      "#0A0A0A",
      "--color-focus":       "#FFE600",
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
      "--radius-sm":   "0px",
      "--radius-md":   "4px",
      "--radius-lg":   "8px",
      "--radius-xl":   "16px",
      "--radius-pill": "999px",
    },
    typography: {
      "--font-headline": "'Bangers', 'Boogaloo', Impact, sans-serif",
      "--font-display":  "'Anton', Impact, 'Arial Black', sans-serif",
      "--font-body":     "'Barlow Condensed', 'Roboto Condensed', 'Arial Narrow', sans-serif",
      "--font-ui":       "'Barlow', 'Roboto', Helvetica, Arial, sans-serif",
      "--font-mono":     "'Share Tech Mono', 'Courier New', monospace",
    },
    shadow: {
      "--shadow-sm": "2px 2px 0px #0A0A0A",
      "--shadow-md": "4px 4px 0px #0A0A0A",
      "--shadow-lg": "6px 6px 0px #0A0A0A",
    },
    border: {
      "--border-default": "3px solid #0A0A0A",
      "--border-feature": "4px solid #0A0A0A",
      "--border-subtle":  "2px solid #0A0A0A",
    },
  },

  /* ==========================================================================
   * 18. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  responsive_behavior: {
    desktop:
      "Comic-panel grid at full width (max 1280px); gutters are visible thick black lines; " +
      "hover interactions shift cards onto offset shadows.",
    tablet:
      "2-column panel grid; sidebar collapses; touch targets minimum 48px; gutter width reduces to 3px.",
    tv:
      "10-foot UI: Bangers headlines at minimum 72px; focus ring is 6px yellow with 3px black offset; " +
      "remote-friendly large hit targets; Ben-Day dot fields removed to reduce visual noise at distance.",
    mobile:
      "Single-column full-bleed panels; bottom nav bar in red with white Bangers labels; " +
      "hard-edge comic-panel aesthetic maintained with 3px borders; no offset shadows (performance).",
  },

  /* ==========================================================================
   * 19. SOUND IDENTITY
   * ========================================================================== */

  sound_identity: {
    startup_chime:
      "Short punchy brass sting — four-bar jingle like a TV commercial jingle from 1965.",
    notification:
      "Single crisp typewriter 'clack' — like a rubber stamp hitting paper.",
    ui_click:
      "Inky 'thwack' — the sound of a commercial stamp press at low volume.",
    success:
      "Four ascending brass notes: BOM-BOM-BOM-BOMM — triumphant and brief.",
    error:
      "Single flat buzz — like a wrong-answer buzzer on a 1960s game show, never harsh.",
  },

  /* ==========================================================================
   * 20. SEASONAL VARIANTS
   * ========================================================================== */

  seasonal_variants: [
    {
      name: "Summer of Love",
      active_range: "06-21..09-21",
      overrides: {
        "--color-primary":   "#FF1A1A",
        "--color-secondary": "#FF6B00",
        "--color-bg":        "#FFFFFF",
      },
      motif:
        "Orange replaces yellow as the secondary during summer; sunburst patterns " +
        "replace generic starbursts; Dotty wears oversized sunglasses.",
    },
    {
      name: "Factory Winter",
      active_range: "12-01..01-06",
      overrides: {
        "--color-primary":   "#0028DC",
        "--color-secondary": "#FFE600",
        "--color-bg":        "#FFFFFF",
      },
      motif:
        "Blue takes over as the primary action color; snowflake Ben-Day dot pattern " +
        "replaces generic dots; silver foil accent stripe at page top.",
    },
  ],

  /* ==========================================================================
   * 21. ACCESSIBILITY
   * ========================================================================== */

  accessibility: {
    minimum_contrast:
      "WCAG AA mandatory (4.5:1 body text, 3:1 large/UI). " +
      "Yellow (#FFE600) is only used with black (#0A0A0A) text — never white. " +
      "Red (#FF1A1A) is only used with white or black text — check each combo.",
    focus_style:
      "3px solid yellow (#FFE600) ring with 2px black (#0A0A0A) offset; " +
      "always visible against both white and red backgrounds.",
    touch_target: "Minimum 48×48px on mobile and TV; 44×44px on desktop.",
    motion_reduction:
      "Honor prefers-reduced-motion: panel-wipe transitions become instant cuts; " +
      "KAPOW! animations collapse to static; offset-shadow hover suppressed.",
    font_scaling:
      "Bangers and Anton scale cleanly — verify layout does not break at 200% zoom. " +
      "Comic-panel gutters must not collapse below 2px.",
  },

  /* ==========================================================================
   * 22. DO / DON'T
   * ========================================================================== */

  do_dont: {
    colors: {
      do: [
        "Use flat primary colors (red, yellow, blue) in solid blocks",
        "Pair yellow fills with black text only",
        "Keep backgrounds stark white or full-bleed primary",
      ],
      dont: [
        "Use gradients anywhere in the UI",
        "Use pastel or muted variants of the primaries",
        "Place white text on yellow",
      ],
      reason:
        "Pop art derives its power from the maximum saturation contrast between " +
        "pure primaries and stark white — diluting either destroys the aesthetic.",
    },
    typography: {
      do: [
        "Use Bangers for all headlines, ALL CAPS",
        "Use Barlow 600/700 for UI labels",
        "Set Anton for large display numerals",
      ],
      dont: [
        "Use thin or light font weights",
        "Mix more than two type families on a single screen",
        "Use a serif font for anything other than intentional irony",
      ],
      reason:
        "Condensed bold type is inseparable from the comic-book and pop art visual language.",
    },
    layout: {
      do: [
        "Divide pages with thick black panel gutters",
        "Use Ben-Day dot fields to fill visual areas",
        "Embrace tight crops and bleeds",
      ],
      dont: [
        "Use generous empty whitespace without a dot or color fill",
        "Round corners beyond 8px on panel containers",
        "Exceed 1280px content width",
      ],
      reason:
        "Pop art is graphic and dense — whitespace exists as a contrast device, " +
        "not as breathing room.",
    },
    animation: {
      do: [
        "Use fast, snappy transitions (under 200ms)",
        "Use hard-cut panel wipes",
        "Animate with KAPOW! starburst effects for success states",
      ],
      dont: [
        "Use slow ease-in-out motion",
        "Blur or morph between states",
        "Animate more than two elements simultaneously",
      ],
      reason:
        "Pop art motion should feel like a comic page turning — instant and decisive.",
    },
    imagery: {
      do: [
        "Always apply a halftone or duotone treatment to photography",
        "Use tight Lichtenstein-style crops",
        "Repeat portrait motifs in Warhol-style grids",
      ],
      dont: [
        "Use unfiltered realistic photography",
        "Use dark moody imagery",
        "Use soft bokeh or shallow-depth-of-field photography",
      ],
      reason:
        "Raw photography breaks the pop art illusion entirely — every image must look printed.",
    },
    branding: {
      do: [
        "Keep the PHLIX wordmark in Bangers on a red block",
        "Use approved signature elements (dots, bubbles, starbursts)",
        "Maintain thick black outlines on the logo at all sizes",
      ],
      dont: [
        "Stretch or recolor the wordmark",
        "Place the logo on a gradient background",
        "Remove the border from the logo lockup",
      ],
      reason:
        "Consistency with the pop art visual language makes the brand instantly recognizable.",
    },
    icons: {
      do: [
        "Use 3px stroke weight icons",
        "Fill icons with a single flat primary color",
        "Prefer angular icons over overly rounded ones",
      ],
      dont: [
        "Use thin hairline icon sets",
        "Use gradient-filled icons",
        "Use skeuomorphic 3D icons",
      ],
      reason:
        "Icons must match the comic-panel aesthetic — bold, flat, and immediate.",
    },
    copywriting: {
      do: [
        "Write short, punchy, ALL CAPS headlines",
        "Use onomatopoeia sparingly for delight moments",
        "Be direct and exclamatory",
      ],
      dont: [
        "Use corporate jargon or passive voice",
        "Write long paragraphs for hero copy",
        "Overuse onomatopoeia until it loses impact",
      ],
      reason: "The voice is a shouted newspaper headline, not a press release.",
    },
    ux: {
      do: [
        "Make every primary action a large red button",
        "Reveal play/watch actions on the first tap/hover",
        "Use KAPOW! confirmation feedback for key actions",
      ],
      dont: [
        "Bury primary actions behind sub-menus",
        "Use small grey text for CTA labels",
        "Add friction to starting playback",
      ],
      reason:
        "Pop art is democratic — the most important action should be the most visible thing on screen.",
    },
    performance: {
      do: [
        "Use SVG for all Ben-Day dot patterns (scalable, small file size)",
        "Lazy-load halftone-treated poster images",
        "Use CSS for hard offset shadows (not images)",
      ],
      dont: [
        "Ship raster Ben-Day dot background images",
        "Use large unoptimized PNG hero art",
        "Animate dot patterns without a reduced-motion fallback",
      ],
      reason:
        "Bold visuals should not cost users load time — SVG and CSS deliver the aesthetic for free.",
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
      "Base/parent kit for the Pop Art Explosion identity. " +
      "Variations may branch into single-primary-dominant sub-themes " +
      "(e.g., 'Red Edition', 'Blue Factory') via the variation schema.",
  },
};

// Export (ESM)
export default brandKit;
export { brandKit };
