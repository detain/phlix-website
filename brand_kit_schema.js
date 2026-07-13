/**
 * ============================================================================
 *  PHLIX BRAND KIT SCHEMA  —  brand_kit_schema.js   (BASE / PARENT kit)
 * ============================================================================
 *
 *  WHAT THIS IS
 *  ------------
 *  This is the *base* (parent) brand kit. It is the single source of truth for
 *  a brand's complete creative identity — colors, type, voice, motion, UI,
 *  illustration, AI-generation guidance, the works. It is intentionally far
 *  richer than a normal style guide: it is a "creative operating manual" that
 *  contains enough information for a human OR an LLM to consistently generate an
 *  entire coherent product ecosystem (marketing copy, page layouts, UI
 *  components, illustrations, iconography, animations, loading screens,
 *  onboarding, screenshots, logos, backgrounds, empty states, error pages,
 *  social graphics, documentation, dashboards, and mobile layouts).
 *
 *  BASE vs VARIATION
 *  -----------------
 *  A BASE kit (this file) defines the full identity and is complete on its own.
 *  A VARIATION kit (see brand_kit_variation_schema.js) does NOT redefine the
 *  whole brand — it points at a base kit via `base_kit`, then layers a small
 *  number of distinguishing fields plus an `overrides` block to set itself
 *  apart from sibling variations that share the same base.
 *
 *  Two fields live ONLY on variations and are deliberately absent here:
 *      • sub_name   — the variation's subtitle (e.g. "Sunday Matinee")
 *      • variation  — one sentence describing what makes a variation unique
 *
 *  HOW TO READ THE FIELD COMMENTS
 *  ------------------------------
 *  Every field is documented with a uniform header:
 *      Label : human-readable name shown in a UI / picker
 *      Type  : JS/JSON data type (string | number | boolean | array<T> | object | enum)
 *      About : what the field means and how it is used
 *      Values: allowed/enum values where applicable
 *      e.g.  : example value(s)
 *
 *  The object below is BOTH the schema (documented via comments) AND a fully
 *  populated reference example (the "Retro Film Reel" brand). Copy it, rename
 *  the slug, and overwrite the values to mint a new base kit.
 *
 *  USAGE
 *  -----
 *      import baseKit from './brand_kit_schema.js'
 *      // or:  const baseKit = require('./brand_kit_schema.js')
 * ============================================================================
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY  — the top-level "who is this brand" block
   * ========================================================================== */

  // ── name ──────────────────────────────────────────────────────────────────
  // Label : Brand Name
  // Type  : string
  // About : Human-readable display name of the brand (the parent identity).
  // e.g.  : "Retro Film Reel", "Neon Nights", "Paper & Ink"
  name: "Retro Film Reel",

  // ── slug ──────────────────────────────────────────────────────────────────
  // Label : Slug
  // Type  : string  (kebab-case, unique, machine identifier)
  // About : Stable machine id for the BASE kit. Variations reference this value
  //         in their `base_kit.slug`. Keep it free of the sub_name.
  // e.g.  : "retro-film-reel"
  slug: "retro-film-reel",

  // ── version ───────────────────────────────────────────────────────────────
  // Label : Kit Version
  // Type  : string  (semver-ish)
  // About : Content version of THIS kit's values (bump when you change brand
  //         values). Distinct from `metadata.schema_version`, which versions
  //         the *shape* of the schema itself.
  // e.g.  : "1.2"
  version: "1.2",

  // ── description ────────────────────────────────────────────────────────────
  // Label : Description
  // Type  : string  (1 short paragraph)
  // About : A concise paragraph describing the brand at a glance.
  description:
    "Warm nostalgic cinema inspired by 1950s neighborhood theaters — popcorn, " +
    "marquee bulbs, ticket stubs, and the gentle hum of a film projector.",

  // ── inspiration ────────────────────────────────────────────────────────────
  // Label : Inspirations
  // Type  : array<string>
  // About : Major real-world references the brand draws from. Used to anchor
  //         illustration and photography prompts.
  // e.g.  : ["1950s movie theaters", "Drive-in cinemas", "Kodachrome"]
  inspiration: [
    "1950s movie theaters",
    "Drive-in cinemas",
    "Kodachrome film stock",
    "Film reels and projectors",
    "Classic Saturday-morning cartoons",
    "Polaroid photography",
    "Vintage ticket stubs",
  ],

  // ── keywords ───────────────────────────────────────────────────────────────
  // Label : Keywords
  // Type  : array<string>  (recommended 30–100 entries)
  // About : Dense descriptive vocabulary. Great as prompt seasoning and for
  //         tagging/search. The longer and more specific, the more consistent
  //         AI output becomes.
  keywords: [
    "nostalgic", "analog", "film", "warm", "cozy", "cinema", "projector",
    "family", "vintage", "friendly", "playful", "popcorn", "marquee", "reel",
    "matinee", "ticket", "cream", "retro-red", "teal", "mustard", "halftone",
    "paper-grain", "rounded", "approachable", "comforting", "wholesome",
    "celluloid", "drive-in", "neon-free", "soft-shadow", "hand-painted",
  ],

  /* ==========================================================================
   * 2. PERSONALITY  — the brand as if it were a person
   * ========================================================================== */

  // ── personality ────────────────────────────────────────────────────────────
  // Label : Personality Traits
  // Type  : array<string>
  // About : Core personality adjectives that drive tone of voice and visuals.
  personality: ["Playful", "Warm", "Welcoming", "Classic", "Comfortable", "Nostalgic"],

  // ── emotional_goals ────────────────────────────────────────────────────────
  // Label : Emotional Goals
  // Type  : array<string>
  // About : What users should FEEL when interacting with the brand.
  emotional_goals: ["Comfort", "Excitement", "Curiosity", "Relaxation", "Joy"],

  // ── archetype ──────────────────────────────────────────────────────────────
  // Label : Brand Archetype
  // Type  : enum<string>
  // Values: "Explorer" | "Creator" | "Hero" | "Magician" | "Everyman" |
  //         "Caregiver" | "Jester" | "Sage" | "Innocent" | "Ruler" |
  //         "Lover" | "Outlaw"
  // About : Single Jungian archetype that summarizes the brand's role.
  archetype: "Everyman",

  // ── audience ───────────────────────────────────────────────────────────────
  // Label : Primary Audiences
  // Type  : array<string>
  // About : Who the brand is for. Informs copy reading-level and imagery casting.
  audience: [
    "Families",
    "Movie collectors",
    "Home theater owners",
    "Casual streamers",
    "Nostalgia lovers",
  ],

  /* ==========================================================================
   * 3. BRAND STORY  — narrative + mission + values
   * ========================================================================== */

  // ── story ──────────────────────────────────────────────────────────────────
  // Label : Brand Story
  // Type  : string  (long paragraph; the imagined history)
  // About : A founding myth the brand "remembers". Gives generators a coherent
  //         world to pull details from.
  story:
    "Long before glowing rectangles ruled the living room, the Retro Film Reel " +
    "was a corner cinema with a buzzing marquee and a popcorn machine that never " +
    "stopped. Families lined up on Sunday afternoons, ushers tore tickets, and the " +
    "projector clattered to life. Phlix carries that same warmth into the home: a " +
    "place where pressing play feels like the lights dimming and the curtain rising.",

  // ── tagline_primary ────────────────────────────────────────────────────────
  // Label : Primary Tagline
  // Type  : string
  // About : The single headline tagline used in hero sections and the logo lockup.
  tagline_primary: "Home Theater, Upgraded.",

  // ── tagline_secondary ──────────────────────────────────────────────────────
  // Label : Alternative Taglines
  // Type  : array<string>
  // About : Rotating/secondary taglines for ads, social, and empty pages.
  tagline_secondary: [
    "Every night is movie night.",
    "Grab the popcorn.",
    "Your living room, now showing.",
  ],

  // ── mission ────────────────────────────────────────────────────────────────
  // Label : Mission
  // Type  : string
  // About : One-sentence statement of why the brand exists.
  mission:
    "Make watching what you love at home feel as special as a night at the movies.",

  // ── values ─────────────────────────────────────────────────────────────────
  // Label : Values
  // Type  : array<string>
  // About : Guiding principles the brand optimizes for.
  values: ["Accessibility", "Fun", "Discovery", "Comfort", "Quality"],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES  — high-leverage prompt anchors
   * ========================================================================== */

  // ── brand_dna ──────────────────────────────────────────────────────────────
  // Label : Brand DNA
  // Type  : string  (2–3 sentences)
  // About : The brand's essence, distilled. Designed to be prepended verbatim to
  //         prompts as a compact identity primer.
  brand_dna:
    "Retro Film Reel is the warmth of a 1950s neighborhood cinema, brought home. " +
    "It is cozy, nostalgic, and family-friendly — cream paper, soft retro red, and " +
    "a gentle projector glow. It is never cold, neon, or corporate.",

  // ── design_principles ──────────────────────────────────────────────────────
  // Label : Design Principles
  // Type  : array<string>  (5–10 immutable rules)
  // About : Non-negotiable rules every design must satisfy. Treat as hard
  //         constraints during generation.
  design_principles: [
    "Every screen should feel spacious and inviting.",
    "Warmth over slickness — choose cozy before modern.",
    "Round every corner; nothing should feel sharp.",
    "Lead with a large nostalgic illustration on key pages.",
    "Keep it family-friendly and legible for all ages.",
    "Use color with restraint — at most three accent colors per view.",
  ],

  // ── brand_opposites ────────────────────────────────────────────────────────
  // Label : Brand Opposites (Anti-brand)
  // Type  : array<string>
  // About : Explicitly what the brand is NOT. Doubles as a soft negative prompt.
  brand_opposites: [
    "Not corporate",
    "Not minimalist-cold",
    "Not cyberpunk or neon",
    "Not futuristic / sci-fi",
    "Not dark or moody",
    "Not high-fashion or luxury-austere",
  ],

  // ── signature_elements ─────────────────────────────────────────────────────
  // Label : Signature Elements
  // Type  : array<string>
  // About : Recurring motifs that should appear throughout the product so it
  //         reads instantly as "this brand".
  signature_elements: [
    "Popcorn",
    "Film reels & strips",
    "Projector light beams",
    "Ticket stubs",
    "Marquee bulbs",
    "Scalloped theater curtains",
  ],

  // ── header_motif ───────────────────────────────────────────────────────────
  // Label : Header Motif
  // Type  : string
  // About : The signature animated/visual motif used in page headers/heroes.
  header_motif: "Popcorn pop animation",

  /* ==========================================================================
   * 5. VISUAL IDENTITY  — overall artistic direction
   * ========================================================================== */

  // ── visual_style ───────────────────────────────────────────────────────────
  // Label : Visual Style
  // Type  : array<string>
  // About : Short tags describing the overall artistic direction.
  visual_style: [
    "Retro illustration",
    "Hand painted",
    "Soft gradients",
    "Paper textures",
    "Rounded edges",
  ],

  // ── art_direction ──────────────────────────────────────────────────────────
  // Label : Art Direction
  // Type  : string  (several sentences/paragraphs)
  // About : Detailed prose on exactly how artwork should look. The most
  //         influential single field for illustration/image generation.
  art_direction:
    "Artwork should feel like a lovingly printed 1950s cinema poster: warm cream " +
    "paper with subtle grain, soft hand-painted gradients, and confident black " +
    "outlines. Lighting is golden and diffuse, never harsh. Compositions are " +
    "generous and centered with a single clear hero subject. Avoid gloss, chrome, " +
    "lens flares, and anything that reads as digital or futuristic.",

  // ── realism ────────────────────────────────────────────────────────────────
  // Label : Realism Level
  // Type  : enum<string>
  // Values: "photorealistic" | "semi_realistic" | "illustrated" | "cartoon" |
  //         "flat" | "pixel_art" | "vector" | "paper_cutout"
  realism: "illustrated",

  // ── rendering_style ────────────────────────────────────────────────────────
  // Label : Rendering Styles
  // Type  : array<string>
  // Values (suggested): "vector" | "cel shading" | "watercolor" | "paper grain" |
  //         "linocut" | "halftone" | "comic"
  rendering_style: ["paper grain", "halftone", "watercolor", "cel shading"],

  // ── texture_level ──────────────────────────────────────────────────────────
  // Label : Texture Level
  // Type  : enum<string>
  // Values: "none" | "subtle" | "medium" | "heavy"
  texture_level: "subtle",

  // ── depth ──────────────────────────────────────────────────────────────────
  // Label : Depth
  // Type  : enum<string>
  // Values: "flat" | "slightly_layered" | "layered" | "3d"
  depth: "slightly_layered",

  // ── lighting ───────────────────────────────────────────────────────────────
  // Label : Lighting
  // Type  : object
  // About : Structured lighting direction for imagery.
  lighting: {
    temperature: "warm",        // string  — "warm" | "neutral" | "cool"
    quality: "golden",          // string  — descriptive quality of the light
    shadows: "soft",            // string  — "soft" | "hard" | "none"
    contrast: "low",            // string  — "low" | "medium" | "high"
    notes: "No harsh contrast, no blue light, no dramatic rim lighting.",
  },

  // ── composition ────────────────────────────────────────────────────────────
  // Label : Composition Rules
  // Type  : array<string>
  // About : Preferred framing/layout tendencies for imagery.
  composition: [
    "Centered",
    "Symmetrical",
    "Lots of breathing room",
    "Large hero illustrations",
    "Single clear focal subject",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM  — semantic, token-ready palette
   * ========================================================================== */

  // ── colors ─────────────────────────────────────────────────────────────────
  // Label : Color System
  // Type  : object  (semantic roles → swatch objects)
  // About : Semantic color roles rather than raw brand colors. Each swatch may
  //         carry name/hex/rgb/hsl/usage/contrast info so it can map straight
  //         into CSS variables or a design-token pipeline.
  //         Each swatch object shape:
  //           {
  //             name            : string  — human label
  //             hex             : string  — "#RRGGBB"
  //             rgb             : string  — "rgb(r, g, b)"
  //             hsl             : string  — "hsl(h, s%, l%)"
  //             usage           : string  — where/how to use it
  //             contrast_targets: array<string> — roles it must contrast against
  //           }
  colors: {
    primary: {
      name: "Retro Red",
      hex: "#C0392B",
      rgb: "rgb(192, 57, 43)",
      hsl: "hsl(6, 64%, 46%)",
      usage: "Primary CTAs, active states, marquee accents.",
      contrast_targets: ["cream", "white"],
    },
    secondary: {
      name: "Theater Teal",
      hex: "#1ABC9C",
      rgb: "rgb(26, 188, 156)",
      hsl: "hsl(168, 76%, 42%)",
      usage: "Secondary actions, highlights, links.",
      contrast_targets: ["cream", "black_outline"],
    },
    tertiary: {
      name: "Mustard",
      hex: "#D4A017",
      rgb: "rgb(212, 160, 23)",
      hsl: "hsl(44, 80%, 46%)",
      usage: "Badges, ratings, small emphasis accents.",
      contrast_targets: ["black_outline"],
    },
    neutral: {
      name: "Soft Brown",
      hex: "#8C5E3C",
      rgb: "rgb(140, 94, 60)",
      hsl: "hsl(26, 40%, 39%)",
      usage: "Muted UI chrome, dividers, secondary text on cream.",
      contrast_targets: ["cream"],
    },
    background: {
      name: "Cream",
      hex: "#F5E9D4",
      rgb: "rgb(245, 233, 212)",
      hsl: "hsl(39, 64%, 90%)",
      usage: "Default page background. Brand backgrounds are always cream.",
      contrast_targets: ["black_outline", "retro_red"],
    },
    surface: {
      name: "Warm Paper",
      hex: "#FBF4E6",
      rgb: "rgb(251, 244, 230)",
      hsl: "hsl(40, 71%, 94%)",
      usage: "Card and panel surfaces, one step lighter than background.",
      contrast_targets: ["black_outline"],
    },
    surface_alt: {
      name: "Toasted Cream",
      hex: "#EADBBE",
      rgb: "rgb(234, 219, 190)",
      hsl: "hsl(40, 50%, 83%)",
      usage: "Alternate surface for striped rows / nested panels.",
      contrast_targets: ["black_outline"],
    },
    text: {
      name: "Ink Black",
      hex: "#111111",
      rgb: "rgb(17, 17, 17)",
      hsl: "hsl(0, 0%, 7%)",
      usage: "Primary body and headline text; outline color.",
      contrast_targets: ["cream", "surface"],
    },
    success: {
      name: "Mint",
      hex: "#A3E4D7",
      rgb: "rgb(163, 228, 215)",
      hsl: "hsl(168, 56%, 77%)",
      usage: "Success toasts, confirmations, 'added' states.",
      contrast_targets: ["black_outline"],
    },
    warning: {
      name: "Marquee Gold",
      hex: "#E6B422",
      rgb: "rgb(230, 180, 34)",
      hsl: "hsl(45, 79%, 52%)",
      usage: "Warnings and caution states.",
      contrast_targets: ["black_outline"],
    },
    error: {
      name: "Curtain Red",
      hex: "#A93226",
      rgb: "rgb(169, 50, 38)",
      hsl: "hsl(6, 63%, 41%)",
      usage: "Errors, destructive actions, failed states.",
      contrast_targets: ["cream", "white"],
    },
    info: {
      name: "Reel Teal",
      hex: "#16A085",
      rgb: "rgb(22, 160, 133)",
      hsl: "hsl(168, 76%, 36%)",
      usage: "Informational banners and tips.",
      contrast_targets: ["cream", "white"],
    },
    focus: {
      name: "Focus Teal Glow",
      hex: "#1ABC9C",
      rgb: "rgb(26, 188, 156)",
      hsl: "hsl(168, 76%, 42%)",
      usage: "Keyboard-focus ring color (paired with offset).",
      contrast_targets: ["cream", "surface"],
    },
    border: {
      name: "Outline Black",
      hex: "#111111",
      rgb: "rgb(17, 17, 17)",
      hsl: "hsl(0, 0%, 7%)",
      usage: "Card/borders/dividers — confident hand-inked lines.",
      contrast_targets: ["cream"],
    },
    shadow: {
      name: "Warm Shadow",
      hex: "#8C5E3C",
      rgb: "rgba(140, 94, 60, 0.25)",
      hsl: "hsl(26, 40%, 39%)",
      usage: "Soft drop shadows tinted warm, never cool grey/black.",
      contrast_targets: [],
    },
    overlay: {
      name: "Dim Curtain",
      hex: "#1A0F0A",
      rgb: "rgba(26, 15, 10, 0.6)",
      hsl: "hsl(19, 44%, 7%)",
      usage: "Modal/scrim overlays — warm near-black, never pure black.",
      contrast_targets: [],
    },
    // gradients — array<object>: named multi-stop gradients ready for CSS.
    gradients: [
      {
        name: "Sunset Marquee",
        type: "linear",                 // "linear" | "radial" | "conic"
        angle: "135deg",
        stops: ["#D4A017", "#C0392B"],
        usage: "Hero backdrops, marquee glows.",
      },
      {
        name: "Projector Beam",
        type: "radial",
        angle: null,
        stops: ["rgba(245,233,212,0.0)", "rgba(255,247,224,0.8)"],
        usage: "Soft light-beam highlights behind hero subjects.",
      },
    ],
  },

  // ── color_rules ────────────────────────────────────────────────────────────
  // Label : Color Rules
  // Type  : array<string>
  // About : Hard rules the palette must obey during generation.
  color_rules: [
    "Never use more than 3 accent colors in a single view.",
    "Backgrounds should always be cream (or a cream-tinted surface).",
    "Avoid fully saturated, neon, or electric colors.",
    "Shadows and overlays are warm-tinted, never cool grey or pure black.",
    "Retro red is reserved for primary CTAs and key emphasis.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  // ── fonts ──────────────────────────────────────────────────────────────────
  // Label : Fonts
  // Type  : object  (role → font spec)
  // About : Type roles. Each font spec shape:
  //           {
  //             family      : string         — font family name
  //             weight      : array<number>  — available weights to use
  //             fallbacks   : array<string>  — CSS fallback stack
  //             usage       : string         — where it is used
  //             tracking    : string         — letter-spacing guidance
  //             line_height : string|number  — preferred line-height
  //           }
  fonts: {
    headline: {
      family: "Bebas Neue",
      weight: [400],
      fallbacks: ["Oswald", "Impact", "sans-serif"],
      usage: "Big marquee headlines and hero titles.",
      tracking: "0.02em",
      line_height: 1.0,
    },
    display: {
      family: "Bebas Neue",
      weight: [400],
      fallbacks: ["Oswald", "sans-serif"],
      usage: "Oversized display numerals and splash text.",
      tracking: "0.04em",
      line_height: 0.95,
    },
    body: {
      family: "Open Sans",
      weight: [400, 600],
      fallbacks: ["Segoe UI", "Helvetica", "Arial", "sans-serif"],
      usage: "Paragraphs, descriptions, long-form reading.",
      tracking: "0em",
      line_height: 1.6,
    },
    ui: {
      family: "Nunito",
      weight: [400, 600, 700],
      fallbacks: ["Open Sans", "system-ui", "sans-serif"],
      usage: "Buttons, labels, navigation, chips — friendly rounded UI text.",
      tracking: "0.01em",
      line_height: 1.3,
    },
    mono: {
      family: "Cousine",
      weight: [400, 700],
      fallbacks: ["Courier New", "monospace"],
      usage: "Code, tokens, technical readouts.",
      tracking: "0em",
      line_height: 1.5,
    },
    number: {
      family: "Bebas Neue",
      weight: [400],
      fallbacks: ["Oswald", "sans-serif"],
      usage: "Stats, counters, runtimes, and dashboard figures.",
      tracking: "0.03em",
      line_height: 1.0,
    },
  },

  // ── typography_rules ───────────────────────────────────────────────────────
  // Label : Typography Rules
  // Type  : array<string>
  typography_rules: [
    "Never use italic headlines.",
    "Avoid ALL CAPS except on buttons and short labels.",
    "Headlines use Bebas Neue; body never does.",
    "Keep body line-length to ~60–75 characters.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  // ── shape_language ─────────────────────────────────────────────────────────
  // Label : Shape Language
  // Type  : array<string>
  // About : The vocabulary of shapes used across the product.
  shape_language: [
    "Rounded rectangles",
    "Soft circles",
    "Ticket stubs (scalloped notches)",
    "Film strips",
    "Scalloped borders",
  ],

  // ── corner_radius ──────────────────────────────────────────────────────────
  // Label : Corner Radius Scale
  // Type  : object  (token → CSS length)
  corner_radius: {
    small: "6px",
    medium: "12px",
    large: "20px",
    xl: "32px",
    pill: "999px",
  },

  // ── borders ────────────────────────────────────────────────────────────────
  // Label : Borders
  // Type  : object
  borders: {
    thickness: "2px",             // string — default stroke width
    style: "solid",               // string — "solid" | "double" | "dashed"
    rounded: true,                // boolean — borders follow corner_radius
    hand_drawn: true,             // boolean — prefer slightly imperfect, inked lines
    notes: "Confident black hand-inked outlines; double-line accents on tickets.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  // ── icon_style ─────────────────────────────────────────────────────────────
  // Label : Icon Style
  // Type  : array<string>
  // Values (suggested): "Outlined" | "Hand drawn" | "Filled" | "Duotone" |
  //         "Rounded" | "Retro"
  icon_style: ["Outlined", "Rounded", "Hand drawn", "Retro"],

  // ── icon_rules ─────────────────────────────────────────────────────────────
  // Label : Icon Rules
  // Type  : array<string>
  icon_rules: [
    "2px stroke weight.",
    "Rounded caps and joins.",
    "Never use sharp corners.",
    "Single-color by default; duotone only for featured icons.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  // ── illustration_style ─────────────────────────────────────────────────────
  // Label : Illustration Style
  // Type  : array<string>
  illustration_style: [
    "1950s advertisements",
    "Children's book",
    "Comic strip",
    "Flat vector with paper grain",
  ],

  // ── character_style ────────────────────────────────────────────────────────
  // Label : Character Style
  // Type  : object
  // About : How illustrated characters should be drawn (proportions, eyes,
  //         expressions, clothing, outlines).
  character_style: {
    proportions: "Friendly, slightly stylized — large heads, soft round bodies.",
    eyes: "Simple, warm, expressive ovals; no sharp anime detail.",
    expressions: "Cheerful, relaxed, welcoming.",
    clothing: "Mid-century casual — cardigans, ushers' uniforms, sundresses.",
    outlines: "Confident 2px black ink outline with rounded corners.",
  },

  // ── mascot ─────────────────────────────────────────────────────────────────
  // Label : Mascot
  // Type  : object | null   (optional)
  // About : Optional brand mascot definition.
  mascot: {
    name: "Reelo",
    species: "Anthropomorphic film reel",
    personality: "Cheerful usher, eager to show you to your seat.",
    description:
      "A friendly film-reel character with a popcorn-box body and little white " +
      "gloves, wearing a vintage usher's cap.",
    poses: ["Waving hello", "Holding popcorn", "Pointing to the screen", "Napping in a seat"],
    expressions: ["Happy", "Excited", "Sleepy", "Surprised"],

    // ── mascot.behavior ──────────────────────────────────────────────────────
    // Label : Mascot Behavior (interactive companion)
    // Type  : object | null   (optional — `behavior: null` = imagery-only mascot)
    // About : Turns the mascot from static art into a lightweight, on-page
    //         companion: where it sits, how it idles, contextual tips keyed to a
    //         page/section anchor, playful easter interactions, and how it is
    //         dismissed. `behavior: null` is equally valid — a mascot may remain
    //         purely decorative imagery with no interactive layer at all.
    // Shape :
    //         {
    //           placement          : string  — screen position + which pages it appears on
    //           idle               : string  — idle animation (MUST disable under prefers-reduced-motion)
    //           tips               : array<{ where, say }>   — contextual tips keyed to a page/section anchor
    //           easter_interactions: array<{ trigger, react }>
    //           dismiss            : string  — dismissal behavior (persists via localStorage)
    //         }
    // e.g.  : see below
    behavior: {
      placement:
        "Bottom-right corner as a small seated usher; appears on Home, Download, " +
        "and About — never on the FAQ/docs reading pages.",
      idle:
        "Gently rocks and blinks, occasionally tossing a single popcorn kernel; " +
        "idle motion is disabled under prefers-reduced-motion (Reelo simply sits).",
      tips: [
        { where: "home:#hero",              say: "Grab a seat — the show's about to start!" },
        { where: "home:.features-overview", say: "Psst… SyncPlay keeps movie night in step across every room." },
        { where: "download:#server",        say: "One line and you're the projectionist. I'll hold the popcorn." },
        { where: "about:.faq-list",         say: "Curtain questions? I've got answers right here." },
      ],
      easter_interactions: [
        { trigger: "click:5",       react: "Reelo juggles popcorn and tips his usher's cap." },
        { trigger: "hover-hold:2s", react: "Offers you a fresh popcorn box with a wink." },
      ],
      dismiss:
        "A small 'Reelo, take five' close button tucks him behind the ticket " +
        "booth; the dismissed state persists via localStorage so he stays put.",
    },
  },

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  // ── photography_style ──────────────────────────────────────────────────────
  // Label : Photography Style
  // Type  : array<string>
  photography_style: [
    "Golden hour",
    "Warm film grain",
    "Kodak colors",
    "Soft focus",
  ],

  // ── photo_rules ────────────────────────────────────────────────────────────
  // Label : Photo Rules
  // Type  : array<string>
  photo_rules: [
    "Never use HDR.",
    "Never use blue/cool lighting.",
    "Always include warm tones and, where people appear, genuine smiles.",
    "Prefer slight film grain over clinical sharpness.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  // ── motion_style ───────────────────────────────────────────────────────────
  // Label : Motion Style
  // Type  : array<string>
  motion_style: ["Playful", "Bouncy", "Gentle", "Warm"],

  // ── transitions ────────────────────────────────────────────────────────────
  // Label : Transitions
  // Type  : array<string>
  transitions: ["Fade", "Film burn", "Projector flicker", "Slide", "Scale"],

  // ── animation_speed ────────────────────────────────────────────────────────
  // Label : Animation Speed
  // Type  : enum<string>
  // Values: "slow" | "medium" | "fast"
  animation_speed: "medium",

  // ── easing ─────────────────────────────────────────────────────────────────
  // Label : Easing
  // Type  : array<string>
  // About : Preferred easing curves; spring/elastic reinforce the playful feel.
  easing: ["ease-out", "spring", "elastic"],

  // ── microinteractions ──────────────────────────────────────────────────────
  // Label : Microinteractions
  // Type  : object
  // About : Small, specific feedback behaviors for common interactions.
  microinteractions: {
    hover: "Cards lift 2px with a soft warm shadow and a 1.02 scale.",
    button_press: "Quick squash to 0.97 then spring back.",
    loading: "Spinning film reel or popping popcorn loader.",
    drag: "Item tilts slightly like a ticket being pulled.",
    focus: "Teal focus ring fades in over 120ms.",
    success: "Tiny popcorn burst + mint check.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  // ── ui_style ───────────────────────────────────────────────────────────────
  // Label : UI Style
  // Type  : array<string>
  ui_style: [
    "Soft warm tones",
    "Popcorn bucket motifs",
    "Family-friendly feel",
    "Rounded everything",
    "Cozy theater ambiance",
  ],

  // ── spacing_scale ──────────────────────────────────────────────────────────
  // Label : Spacing Scale
  // Type  : array<number>  (px steps)
  // About : The allowed spacing increments; layouts should only use these.
  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64],

  // ── shadows ────────────────────────────────────────────────────────────────
  // Label : Shadow System
  // Type  : object  (token → CSS box-shadow)
  shadows: {
    sm: "0 1px 2px rgba(140, 94, 60, 0.18)",
    md: "0 4px 10px rgba(140, 94, 60, 0.22)",
    lg: "0 10px 24px rgba(140, 94, 60, 0.28)",
    notes: "Shadows are warm-tinted (soft brown), soft, and never harsh black.",
  },

  // ── cards ──────────────────────────────────────────────────────────────────
  // Label : Cards
  // Type  : object
  cards: {
    elevation: "md",              // references shadows token
    padding: "16px",              // from spacing_scale
    border_radius: "20px",        // from corner_radius (large)
    border: "2px solid #111111",
    background: "#FBF4E6",
    notes: "Rounded, warm paper surface with a confident ink border.",
  },

  // ── buttons ────────────────────────────────────────────────────────────────
  // Label : Buttons
  // Type  : object  (variant → spec)
  buttons: {
    primary:   { bg: "#C0392B", text: "#F5E9D4", radius: "999px", notes: "Warm red, pill, bold." },
    secondary: { bg: "#1ABC9C", text: "#111111", radius: "999px", notes: "Teal, pill." },
    danger:    { bg: "#A93226", text: "#FFFFFF", radius: "999px", notes: "Destructive actions only." },
    ghost:     { bg: "transparent", text: "#111111", radius: "999px", notes: "2px outline, no fill." },
    link:      { bg: "transparent", text: "#16A085", radius: "0", notes: "Underline on hover." },
    icon:      { bg: "#FBF4E6", text: "#111111", radius: "999px", notes: "Circular icon button." },
    fab:       { bg: "#C0392B", text: "#F5E9D4", radius: "999px", notes: "Floating popcorn-red action button." },
  },

  // ── forms ──────────────────────────────────────────────────────────────────
  // Label : Forms
  // Type  : object
  forms: {
    inputs: "Cream-filled, 2px ink border, 12px radius, generous 12px padding.",
    checkboxes: "Rounded square, teal check, springy toggle.",
    switches: "Pill track, cream knob, retro-red when on.",
    dropdowns: "Rounded menu on warm paper with soft shadow.",
    validation: "Inline, friendly copy; error = curtain red, success = mint.",
  },

  // ── tables ─────────────────────────────────────────────────────────────────
  // Label : Tables
  // Type  : object
  tables: {
    headers: "Bebas Neue caps on toasted-cream header row.",
    hover: "Row tints to warm paper on hover.",
    sorting: "Small rounded chevron in teal.",
    striping: "Alternate rows use surface_alt (toasted cream).",
  },

  // ── navigation ─────────────────────────────────────────────────────────────
  // Label : Navigation
  // Type  : object
  navigation: {
    sidebar: "Cream panel, rounded active pill in retro red, icon + label.",
    topbar: "Marquee-style header with subtle bulb dots and brand lockup.",
    tabs: "Pill tabs; active tab filled teal.",
    breadcrumbs: "Small ui-font crumbs separated by a film-sprocket dot.",
  },

  // ── dashboard_style ────────────────────────────────────────────────────────
  // Label : Dashboard Style
  // Type  : string
  dashboard_style:
    "Spacious card grid on cream, big Bebas Neue numerals, warm pastel stat " +
    "accents, and a single hero metric per row. Calm, never dense.",

  // ── component_styles ───────────────────────────────────────────────────────
  // Label : Component Styles
  // Type  : object  (component → spec string/object)
  // About : Detailed specs for common, brand-specific components beyond the basics.
  component_styles: {
    dialog: "Centered warm-paper card, dim-curtain scrim, scalloped top edge.",
    sidebar: "See navigation.sidebar; collapsible to icon rail.",
    carousel: "Poster rail with film-strip top/bottom perforation accents.",
    search_bar: "Pill input with a magnifier icon and 'Search the marquee…' hint.",
    media_player: "Cinema-dark control bar that fades in; retro-red scrubber.",
    toast: "Rounded pill toast sliding up from bottom with a small motif icon.",
    chip: "Pill chip on surface_alt with 2px outline.",
  },

  // ── layout_patterns ────────────────────────────────────────────────────────
  // Label : Layout Patterns
  // Type  : object  (page type → guidance)
  // About : Preferred page structures so generated pages feel consistent.
  layout_patterns: {
    dashboard: "Hero metric row → 3-up stat cards → recent activity rail.",
    settings: "Left section nav + right form panels, max-width 760px content.",
    media_library: "Sticky filter bar → responsive poster grid (auto-fill).",
    authentication: "Centered card on a soft projector-beam background.",
    landing: "Full-bleed hero illustration → features → social proof → CTA.",
    detail_view: "Backdrop hero → poster + metadata → episodes/related rails.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY  — domain-specific (it's a media server)
   * ========================================================================== */

  // ── poster_style ───────────────────────────────────────────────────────────
  // Label : Poster Style
  // Type  : string
  poster_style:
    "Vintage one-sheet feel: bold Bebas title, painted key art, cream border, " +
    "rounded corners, subtle paper grain.",

  // ── thumbnail_style ────────────────────────────────────────────────────────
  // Label : Thumbnail Style
  // Type  : string
  thumbnail_style:
    "Rounded 12px corners, 2px ink border, warm color grade, title overlay in ui font.",

  // ── backdrop_style ─────────────────────────────────────────────────────────
  // Label : Backdrop Style
  // Type  : string
  backdrop_style:
    "Wide cinematic still, warm grade, soft vignette, gentle projector-beam light.",

  // ── media_cards ────────────────────────────────────────────────────────────
  // Label : Media Cards
  // Type  : string
  media_cards:
    "Poster on top, title + year in ui font below, hover lifts with warm shadow " +
    "and reveals a retro-red play pill.",

  // ── badges ─────────────────────────────────────────────────────────────────
  // Label : Badges
  // Type  : object
  // About : Styling for media badges. `labels` lists the supported badge texts.
  badges: {
    labels: ["4K", "HDR", "Dolby Vision", "Continue Watching", "New", "Favorite"],
    shape: "Pill, 2px ink outline.",
    colors: "Mustard for quality (4K/HDR), teal for status (New), red for Favorite.",
    typography: "ui font, 700 weight, small caps.",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  // ── voice ──────────────────────────────────────────────────────────────────
  // Label : Voice
  // Type  : array<string>
  // About : Enduring personality of the writing (who is speaking).
  voice: ["Playful", "Approachable", "Warm", "Slightly quirky"],

  // ── tone ───────────────────────────────────────────────────────────────────
  // Label : Tone
  // Type  : array<string>
  // About : Situational modulation of the voice (how it shifts by context).
  tone: ["Friendly", "Encouraging", "Lighthearted", "Reassuring"],

  // ── writing_style ──────────────────────────────────────────────────────────
  // Label : Writing Style
  // Type  : string
  // About : Grammar/structure guidance for copy.
  writing_style:
    "Short, warm sentences. Active voice. Contractions welcome. Occasional cinema " +
    "metaphors (curtain, popcorn, matinee). Never jargon-heavy or corporate.",

  // ── vocabulary ─────────────────────────────────────────────────────────────
  // Label : Preferred Vocabulary
  // Type  : array<string>
  vocabulary: ["showtime", "matinee", "marquee", "popcorn", "curtain", "feature", "encore", "reel"],

  // ── avoid_words ────────────────────────────────────────────────────────────
  // Label : Avoid Words
  // Type  : array<string>
  avoid_words: ["leverage", "synergy", "utilize", "robust", "cutting-edge", "disrupt"],

  // ── greetings ──────────────────────────────────────────────────────────────
  // Label : Greetings
  // Type  : array<string>
  greetings: ["Welcome back to your seat!", "Ready for showtime?", "Grab the popcorn 🍿"],

  // ── empty_state_messages ───────────────────────────────────────────────────
  // Label : Empty State Messages
  // Type  : array<string>
  empty_state_messages: [
    "Nothing showing here yet — let's find your next feature.",
    "The marquee's empty. Add something to get the show going!",
    "No favorites yet. Tap the heart to save a seat for one.",
  ],

  // ── notification_style ─────────────────────────────────────────────────────
  // Label : Notification Style
  // Type  : string
  // About : The personality of notifications (friendly / professional / funny?).
  notification_style: "Friendly and lightly playful — like a kind usher, never pushy.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE  — direct levers for generators
   * ========================================================================== */

  // ── image_prompt_prefix ────────────────────────────────────────────────────
  // Label : Image Prompt Prefix
  // Type  : string
  // About : Prepended to EVERY image prompt to lock the visual identity.
  image_prompt_prefix:
    "Warm nostalgic 1950s cinema illustration, hand-painted with soft gradients " +
    "and subtle paper grain, cream background, confident black ink outlines, " +
    "golden diffuse lighting,",

  // ── image_prompt_suffix ────────────────────────────────────────────────────
  // Label : Image Prompt Suffix
  // Type  : string
  // About : Common quality instructions appended to image prompts.
  image_prompt_suffix:
    ", cohesive retro color palette (retro red, cream, teal, mustard), rounded " +
    "shapes, family-friendly, high quality, balanced composition.",

  // ── negative_prompt ────────────────────────────────────────────────────────
  // Label : Negative Prompt
  // Type  : array<string>
  // About : Things generators must avoid.
  negative_prompt: [
    "neon", "cyberpunk", "futuristic HUD", "harsh lighting", "lens flare",
    "blue/cool color grade", "HDR", "chrome/glossy", "dark moody", "horror",
  ],

  // ── ui_generation_rules ────────────────────────────────────────────────────
  // Label : UI Generation Rules
  // Type  : array<string>
  // About : Instructions specifically for AI UI generators.
  ui_generation_rules: [
    "Cream background, warm-paper surfaces.",
    "Round all corners (≥12px); pills for buttons.",
    "Primary CTA is always retro red.",
    "Max 3 accent colors per screen.",
    "Use the spacing scale; keep generous whitespace.",
    "Max content width 1400px.",
  ],

  // ── logo_rules ─────────────────────────────────────────────────────────────
  // Label : Logo Rules
  // Type  : object
  logo_rules: {
    shape: "Wordmark in Bebas Neue, optionally inside a rounded marquee badge.",
    complexity: "Simple and legible at small sizes.",
    negative_space: "Generous; never crowd the lockup.",
    colors: "Retro red on cream, or cream on retro red.",
    allowed_symbols: ["film reel", "popcorn", "marquee bulb", "ticket stub"],
    forbidden_symbols: ["gears", "circuits", "neon", "play-button cliché alone"],
  },

  // ── illustration_prompt_template ───────────────────────────────────────────
  // Label : Illustration Prompt Template
  // Type  : string  (template with {placeholders})
  illustration_prompt_template:
    "{prefix} {subject}, in the Retro Film Reel style, {mood}, set in a cozy " +
    "vintage cinema context {suffix}",

  // ── page_generation_rules ──────────────────────────────────────────────────
  // Label : Page Generation Rules
  // Type  : array<string>
  // About : Rules for auto-generating whole pages.
  page_generation_rules: [
    "Hero sections always contain a large nostalgic illustration.",
    "Cards are rounded and on warm paper.",
    "CTA buttons are always warm red pills.",
    "Maximum page width 1400px.",
    "Lead every page with a clear single focal point.",
  ],

  // ── prompt_library ─────────────────────────────────────────────────────────
  // Label : Prompt Library
  // Type  : object  (asset type → reusable prompt template)
  // About : Ready-to-use prompt templates that bake in the brand for each asset.
  prompt_library: {
    logo:
      "Design a Retro Film Reel logo: Bebas Neue wordmark in retro red on cream, " +
      "optional rounded marquee badge, simple, legible, no neon.",
    illustration:
      "{image_prompt_prefix} {subject} {image_prompt_suffix}",
    icon:
      "Outlined rounded retro icon of {subject}, 2px stroke, single color, " +
      "no sharp corners, friendly.",
    background:
      "Soft cream background with subtle paper grain and a faint projector beam, " +
      "no neon, no harsh light.",
    landing_page:
      "A warm nostalgic cinema landing page: full-bleed hero illustration, retro-red " +
      "CTA pill, cream sections, rounded cards, generous whitespace.",
    dashboard:
      "A spacious media dashboard on cream with big Bebas numerals, warm pastel " +
      "stat cards, rounded everything.",
    marketing:
      "A vintage matinee-poster social graphic for {topic}: bold Bebas headline, " +
      "painted key art, cream border, family-friendly.",
  },

  /* ==========================================================================
   * 17. DESIGN TOKENS  — semantic tokens ready to compile to CSS vars
   * ========================================================================== */

  // ── design_tokens ──────────────────────────────────────────────────────────
  // Label : Design Tokens
  // Type  : object  (category → token map)
  // About : Flat, semantic tokens that map directly into CSS custom properties
  //         or a design-system pipeline. Mirrors the richer blocks above in a
  //         build-friendly shape.
  design_tokens: {
    color: {
      "--color-primary": "#C0392B",
      "--color-secondary": "#1ABC9C",
      "--color-bg": "#F5E9D4",
      "--color-surface": "#FBF4E6",
      "--color-text": "#111111",
      "--color-success": "#A3E4D7",
      "--color-warning": "#E6B422",
      "--color-error": "#A93226",
    },
    spacing: {
      "--space-1": "4px",
      "--space-2": "8px",
      "--space-3": "12px",
      "--space-4": "16px",
      "--space-6": "24px",
      "--space-8": "32px",
    },
    radius: {
      "--radius-sm": "6px",
      "--radius-md": "12px",
      "--radius-lg": "20px",
      "--radius-pill": "999px",
    },
    typography: {
      "--font-headline": "'Bebas Neue', sans-serif",
      "--font-body": "'Open Sans', sans-serif",
      "--font-ui": "'Nunito', sans-serif",
      "--font-mono": "'Cousine', monospace",
    },
    shadow: {
      "--shadow-sm": "0 1px 2px rgba(140,94,60,0.18)",
      "--shadow-md": "0 4px 10px rgba(140,94,60,0.22)",
      "--shadow-lg": "0 10px 24px rgba(140,94,60,0.28)",
    },
  },

  /* ==========================================================================
   * 18. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  // ── responsive_behavior ────────────────────────────────────────────────────
  // Label : Responsive Behavior
  // Type  : object  (breakpoint/device → guidance)
  // About : Layout guidance per device — important for a media server that runs
  //         on desktop, tablet, TV, and mobile.
  responsive_behavior: {
    desktop: "Multi-column rails, hover affordances, max 1400px content.",
    tablet: "2–3 column grids, larger touch targets, collapsible sidebar.",
    tv: "10-foot UI: huge type, focus-driven navigation, bold focus rings.",
    mobile: "Single column, bottom tab bar, full-width posters, sticky play bar.",
  },

  /* ==========================================================================
   * 19. SOUND IDENTITY  (optional)
   * ========================================================================== */

  // ── sound_identity ─────────────────────────────────────────────────────────
  // Label : Sound Identity
  // Type  : object  (cue → description)
  // About : Optional guidance for audio cues so even sound feels on-brand.
  sound_identity: {
    startup_chime: "Soft projector whir resolving into a warm major chord.",
    notification: "Gentle popcorn 'pop'.",
    ui_click: "Muted ticket-punch click.",
    success: "Short cheerful 'ta-da' with light reverb.",
    error: "Soft, non-alarming low 'thunk' — never harsh.",
  },

  /* ==========================================================================
   * 20. SEASONAL VARIANTS  (in-kit theming overrides)
   * ==========================================================================
   *  NOTE: This is for lightweight calendar theming WITHIN a single kit
   *  (holidays/seasons). It is different from a VARIATION kit, which is a
   *  separately authored child identity (see brand_kit_variation_schema.js).
   */

  // ── seasonal_variants ──────────────────────────────────────────────────────
  // Label : Seasonal Variants
  // Type  : array<object>
  // About : Each entry overrides a few tokens for a season/holiday while keeping
  //         the core identity. Shape:
  //           { name, active_range, overrides: { ...partial tokens... }, motif }
  seasonal_variants: [
    {
      name: "Holiday Matinee",
      active_range: "12-01..12-31",
      overrides: { "--color-primary": "#B83227", "--color-secondary": "#2E8B57" },
      motif: "Marquee bulbs styled as string lights; snow on the ticket booth.",
    },
    {
      name: "Summer Drive-In",
      active_range: "06-15..08-31",
      overrides: { "--color-bg": "#FBF1DA" },
      motif: "Sunset gradient sky and a parked convertible silhouette.",
    },
  ],

  // ── seasonal_activation ─────────────────────────────────────────────────────
  // Label : Seasonal Activation
  // Type  : object
  // About : Declares whether the `seasonal_variants` above actually SHIP live, or
  //         stay documentation-only. `"documented"` is today's behavior — the data
  //         exists but is never applied. `"live-js"` means a tiny, self-contained
  //         date-gate flips the override tokens and enables the motif while today
  //         falls inside a variant's `active_range`, with no rebuild needed.
  // Shape :
  //         {
  //           mode        : enum   — "documented" | "live-js"
  //           motif_assets: array<string>  — asset paths the live motif needs
  //           banner      : string | null  — optional one-line seasonal greeting
  //         }
  // Values: mode → "documented" | "live-js"
  // e.g.  : see below
  seasonal_activation: {
    mode: "live-js",
    motif_assets: [
      "img/seasonal/holiday-string-lights.svg",
      "img/seasonal/summer-drivein-sky.svg",
    ],
    banner: "Holiday Matinee is now showing — pull up a warm seat.",
  },

  /* ==========================================================================
   * 21. ACCESSIBILITY
   * ========================================================================== */

  // ── accessibility ──────────────────────────────────────────────────────────
  // Label : Accessibility
  // Type  : object
  // About : Hard accessibility commitments generators must honor.
  accessibility: {
    minimum_contrast: "WCAG AA (4.5:1 body text, 3:1 large text/UI).",
    focus_style: "2px teal focus ring with 2px cream offset; always visible.",
    touch_target: "Minimum 44×44px.",
    motion_reduction: "Honor prefers-reduced-motion; replace bounces with fades.",
    font_scaling: "Layouts must survive 200% text zoom without clipping.",
  },

  /* ==========================================================================
   * 22. SITE ARCHITECTURE  — information architecture & page composition
   * ==========================================================================
   *  The fields in §22–§26 exist to make a brand kit drive a genuinely different
   *  USER EXPERIENCE — how the site is structured, what it emphasizes, how a
   *  visitor moves through it, converts, and is reassured — not just visual
   *  reskinning. When a field is ABSENT, the site keeps today's shared default
   *  structure/copy; when PRESENT, it OVERRIDES that default for its concern only.
   */

  // ── site_architecture ───────────────────────────────────────────────────────
  // Label : Site Architecture
  // Type  : object
  // About : The kit's information architecture. The canonical page ids stay stable
  //         ("home","features","clients","download","plugins","docs","hub",
  //         "about") — only the LABEL, ORDER, and PRESENCE are kit-owned. Pages may
  //         be demoted into the footer, and bespoke pages may be added so long as
  //         their content DERIVES FROM REAL facts in content.json (never invented).
  // Shape :
  //         {
  //           nav               : array<{ id, label, emphasis }>  emphasis: "primary"|"default"|"muted"
  //           demoted_pages     : array<{ id, reason, fold_into? }>  pushed out of primary nav into the footer
  //           extra_pages       : array<{ id, title, purpose, facts_from: [content.json fact paths] }>
  //           footer_arrangement: enum  — "mirror-nav" | "full-directory" | "minimal-single-line"
  //         }
  // e.g.  : see below
  site_architecture: {
    nav: [
      { id: "home",     label: "Lobby",       emphasis: "default" },
      { id: "features", label: "Now Showing", emphasis: "primary" },
      { id: "clients",  label: "Box Office",  emphasis: "default" },
      { id: "download", label: "Get Tickets", emphasis: "primary" },
      { id: "hub",      label: "The Marquee", emphasis: "default" },
      { id: "about",    label: "Our Story",   emphasis: "muted" },
    ],
    demoted_pages: [
      { id: "plugins", reason: "Concessions-stand extra — nice to have, not the main draw for a family audience.", fold_into: "features" },
      { id: "docs",    reason: "Reference material lives one click away in the footer, off the cozy main path." },
    ],
    extra_pages: [
      {
        id: "movie-night",
        title: "How to Host Movie Night",
        purpose: "A warm walkthrough that turns the product facts into a Sunday-matinee setup guide.",
        facts_from: ["pitch_bullets", "features", "clients"],
      },
    ],
    footer_arrangement: "full-directory",
  },

  // ── homepage_narrative ──────────────────────────────────────────────────────
  // Label : Homepage Narrative
  // Type  : object
  // About : The landing page's story structure — the ORDER and treatment of the
  //         homepage's sections, so two kits can tell the same product's story in
  //         genuinely different ways.
  // Shape :
  //         {
  //           arc     : enum  — "feature-first"|"problem-first"|"story-first"|
  //                             "proof-first"|"demo-first"|"manifesto-first"|"quest"
  //           logline : string  — one-sentence framing of the whole page
  //           sections: array<{ id, source, treatment, weight }>
  //                     source    = another schema field this section pulls from
  //                                 (e.g. "copy_overlay.hero", "story",
  //                                 "feature_casting", "proof_strategy",
  //                                 "conversion_funnel")
  //                     treatment = short prose describing how it is rendered
  //                     weight    = "hero" | "major" | "minor"
  //         }
  // Values: arc → see enum above ; weight → "hero" | "major" | "minor"
  // e.g.  : see below
  homepage_narrative: {
    arc: "story-first",
    logline: "The lights dim, the marquee glows, and your living room becomes the neighborhood cinema.",
    sections: [
      { id: "curtain-rise", source: "copy_overlay.hero", treatment: "Full-bleed marquee hero: bulbs warm up and the curtain parts to reveal the headline.", weight: "hero" },
      { id: "the-feature",  source: "feature_casting",   treatment: "Two 'now showing' features cast as painted one-sheet posters on the lobby wall.",      weight: "major" },
      { id: "why-phlix",    source: "story",             treatment: "Value props styled as a torn strip of matinee ticket stubs.",                          weight: "major" },
      { id: "good-seats",   source: "proof_strategy",    treatment: "Trust signals rendered as a house-count and repo-stars placard in the lobby.",         weight: "minor" },
      { id: "get-tickets",  source: "conversion_funnel", treatment: "Closing box-office CTA banner: 'Get your tickets' beside the install one-liner.",      weight: "major" },
    ],
  },

  // ── page_blueprints ─────────────────────────────────────────────────────────
  // Label : Page Blueprints
  // Type  : object  (page id → blueprint)
  // About : The STRUCTURAL template per sub-page — what the page IS (its DOM
  //         composition), not how it looks. (Contrast §13 `layout_patterns`, which
  //         says how a page *looks*; this says what it *is*.) Each blueprint is
  //         { template, spec } where `spec` is a 1–2 sentence literal build
  //         instruction for the authoring agent.
  // Values: template (adapt per page type) — e.g. "comic-panels" | "spec-sheet" |
  //         "timeline" | "man-page" | "gallery-plaques" | "chapter-scroll" |
  //         "one-sheet-wall" | "marquee-board" | "ticket-counter" | "standard"
  // e.g.  : see below
  page_blueprints: {
    features: {
      template: "one-sheet-wall",
      spec: "Lay the features out as framed one-sheet posters on a lobby wall — each a painted key-art tile with a Bebas title and a one-line synopsis.",
    },
    clients: {
      template: "marquee-board",
      spec: "Present each client as a bulb-lit marquee title card with a 'Now Playing on…' header and its highlights as a torn-ticket list.",
    },
    download: {
      template: "ticket-counter",
      spec: "Frame the page as a box-office counter: the server install snippet is the 'admission' ticket, client cards are the seat choices, ecosystem links are the concessions menu.",
    },
    about: {
      template: "chapter-scroll",
      spec: "Tell the founding-cinema story as a scrolling reel of chapters (Philosophy, License, Contributing) ending in the FAQ styled as an usher's Q&A.",
    },
  },

  /* ==========================================================================
   * 23. CONTENT CASTING & COPY  — how shared facts are weighted & voiced
   * ========================================================================== */

  // ── feature_casting ─────────────────────────────────────────────────────────
  // Label : Feature Casting
  // Type  : object
  // About : How this kit CASTS the canonical product features (ids match
  //         content.json `features[]`). This re-weights emphasis ONLY — every
  //         feature must still exist SOMEWHERE on the site; this field never
  //         deletes a fact, it only decides what gets the spotlight.
  // Shape :
  //         {
  //           hero          : array<{ id, angle }>  angle = a kit-voiced one-line headline (factual, just voiced)
  //           support       : array<id>   shown in the standard feature grid
  //           footnote      : array<id>   appear only on the dedicated Features page
  //           omit_from_home: array<id>   never shown on the homepage (still elsewhere)
  //         }
  // e.g.  : see below
  feature_casting: {
    hero: [
      { id: "syncplay", angle: "Movie night stays in sync — every seat, every room, the same frame." },
      { id: "library",  angle: "Drop a film in and watch it take its place on the marquee." },
    ],
    support: ["transcode", "livetv", "hub", "auth"],
    footnote: ["dlna", "plugins"],
    omit_from_home: [],
  },

  // ── copy_overlay ────────────────────────────────────────────────────────────
  // Label : Copy Overlay
  // Type  : object
  // About : Kit-authored replacements for PRESENTATION copy only, keyed to mirror
  //         content.json paths. FACTS stay locked to content.json (spec claims,
  //         numbers, licenses, repo links, FAQ answer substance) — only the
  //         presentation copy may be overlaid. Anything ABSENT here inherits the
  //         content.json value verbatim.
  // Shape :
  //         {
  //           hero: { eyebrow, headline, subheadline,
  //                   primary_cta: { label }, secondary_cta: { label } }
  //           section_headings: { pitch, features, cta_banner, ... }
  //           footer_tagline: string
  //         }
  // e.g.  : see below
  copy_overlay: {
    hero: {
      eyebrow: "Now showing at your place",
      headline: "Home Theater, Upgraded.",
      subheadline: "Dim the lights and press play — your whole library, streaming to every screen in the house like it's opening night.",
      primary_cta: { label: "Get Your Tickets" },
      secondary_cta: { label: "Peek Behind the Curtain" },
    },
    section_headings: {
      pitch: "Why pull up a seat?",
      features: "Now Showing",
      cta_banner: "The curtain's up — grab the popcorn.",
    },
    footer_tagline: "Every night is movie night.",
  },

  // ── copy_treatments ─────────────────────────────────────────────────────────
  // Label : Copy Treatments
  // Type  : object  (content block → rendering treatment)
  // About : HOW shared content blocks get rendered as markup/components — same
  //         facts, brand-native container. This re-skins the container, never the
  //         claims inside it.
  // Values (suggested per block):
  //         pitch_bullets → "terminal-output" | "checklist" | "marquee-lines" |
  //                         "spec-rows" | "banner-pennants" | "haiku-cards" | "quest-log"
  //         faq           → "man-page" | "letters-column" | "standard-accordion" | ...
  //         clients       → "device-rack" | "app-store-tiles" | "family-of-devices" | "spec-table"
  //         ecosystem     → "network-diagram" | "repo-list" | "constellation" | "bookshelf"
  // e.g.  : see below
  copy_treatments: {
    pitch_bullets: "marquee-lines",   // each value prop lit up as a line on the marquee board
    faq: "letters-column",            // FAQ as a friendly "Ask the Usher" letters column
    clients: "family-of-devices",     // clients drawn as a family of screens around one cozy living room
    ecosystem: "repo-list",           // ecosystem repos as a tidy list of reels on a shelf
  },

  // ── faq_experience ──────────────────────────────────────────────────────────
  // Label : FAQ Experience
  // Type  : object
  // About : The presentation frame for the FAQ. `question_order` re-sequences the
  //         canonical content.json faq[] entries for this audience; `extra_questions`
  //         are kit-flavored phrasings that MAP TO existing canonical answers —
  //         they never invent new facts. (content.json faq[] items carry no ids;
  //         reference them by a stable slug of the question, e.g. "like-plex".)
  // Shape :
  //         {
  //           frame          : enum — "bartender-chat"|"man-page"|"docent-tour"|
  //                                    "letters-column"|"oracle"|"standard-accordion"
  //           persona        : string  — the answering character, if any
  //           question_order : array<faq id>
  //           extra_questions: array<{ q, maps_to }>
  //         }
  // e.g.  : see below
  faq_experience: {
    frame: "letters-column",
    persona: "Reelo the usher, answering the audience's notes from the lobby suggestion box.",
    question_order: ["like-plex", "expose-internet", "formats", "mobile-app", "plugins", "license"],
    extra_questions: [
      { q: "Will this play on the old TV in the den?", maps_to: "formats" },
      { q: "Do I have to open my house up to the whole internet?", maps_to: "expose-internet" },
    ],
  },

  // ── persona_vignettes ───────────────────────────────────────────────────────
  // Label : Persona Vignettes
  // Type  : array<object>
  // About : 2–4 concrete usage scenes for this kit's audience. Drives which product
  //         surfaces get mocked up / depicted in imagery and worked copy examples.
  // Shape : { name, scene, surfaces: [UI surfaces depicted], features_shown: [feature ids] }
  // e.g.  : see below
  persona_vignettes: [
    {
      name: "The Sunday Matinee",
      scene: "Grandpa and the grandkids pile onto the couch; one tap dims the room and the family library fills the big screen.",
      surfaces: ["home hero", "media library grid", "media player"],
      features_shown: ["library", "transcode", "auth"],
    },
    {
      name: "Long-Distance Movie Night",
      scene: "Two households, three time zones, one film — everyone hits play and stays locked to the same frame.",
      surfaces: ["SyncPlay lobby", "media player", "hub connect screen"],
      features_shown: ["syncplay", "hub"],
    },
    {
      name: "Saturday-Morning Cartoons",
      scene: "The kids' profile opens straight to their own shelf with the rating filter on, the old smart TV picking it up over DLNA.",
      surfaces: ["profile picker", "media library grid"],
      features_shown: ["auth", "dlna", "livetv"],
    },
  ],

  /* ==========================================================================
   * 24. INTERACTIVE SURFACES  — interaction models (with required fallbacks)
   * ==========================================================================
   *  Any per-site JS these fields imply must be self-contained, hand-written
   *  vanilla JS with NO dependencies, must respect prefers-reduced-motion, and
   *  must always ship the declared no-JS fallback carrying the same information.
   */

  // ── hero_experience ─────────────────────────────────────────────────────────
  // Label : Hero Experience
  // Type  : object
  // About : The landing hero's interaction model. `fallback` is REQUIRED — the
  //         static / no-JS / reduced-motion equivalent, and it MUST carry the same
  //         copy. `js_budget_kb` is a hard perf gate (self-contained vanilla JS
  //         only, no dependencies).
  // Shape :
  //         {
  //           mode            : enum — "static"|"terminal"|"node-network"|
  //                                     "carousel-marquee"|"diorama-parallax"|
  //                                     "playable-vignette"|"guided-reveal"
  //           spec            : string  — literal build instruction
  //           suggested_inputs: array<string>  — if interactive
  //           fallback        : string  — REQUIRED static/no-JS equivalent (same copy)
  //           js_budget_kb    : number  — hard perf ceiling for this hero's JS
  //         }
  // e.g.  : see below
  hero_experience: {
    mode: "diorama-parallax",
    spec: "A layered cinema diorama — marquee, curtain, projector beam, and Reelo — parallaxes gently on scroll/pointer, the bulbs warming up as the curtain parts to reveal the headline.",
    suggested_inputs: ["pointer position", "scroll offset"],
    fallback: "A single flat painted marquee illustration with the curtain already open and the identical headline, subheadline, and both CTAs baked into the static markup.",
    js_budget_kb: 6,
  },

  // ── navigation_model ────────────────────────────────────────────────────────
  // Label : Navigation Model
  // Type  : object
  // About : The site's navigation paradigm. `fallback` is REQUIRED: any non-topbar
  //         mode MUST also render a standard accessible topbar/menu — the exotic
  //         mode is an ENHANCEMENT layer, never the only path.
  // Shape :
  //         {
  //           mode    : enum — "topbar"|"command-palette"|"table-of-contents"|"map"|"chapter-dots"
  //           spec    : string
  //           keyboard: string | null  — optional keyboard-triggered behavior
  //           fallback: string         — REQUIRED accessible standard nav that always renders
  //         }
  // e.g.  : see below
  navigation_model: {
    mode: "topbar",
    spec: "A marquee-styled top bar with warm bulb dots between the links and the brand lockup at left; the active link glows like a lit bulb.",
    keyboard: null,
    fallback: "The topbar IS the standard accessible nav — a plain <nav> list of the same links, fully keyboard reachable, collapsing to a labeled hamburger menu on mobile.",
  },

  // ── scroll_experience ───────────────────────────────────────────────────────
  // Label : Scroll Experience
  // Type  : object
  // About : The page's reading rhythm. `reduced_motion` is REQUIRED and always
  //         resolves to plain continuous scroll under prefers-reduced-motion.
  // Shape :
  //         {
  //           mode          : enum — "continuous"|"chaptered"|"panel-sequence"|"long-take"
  //           spec          : string
  //           reduced_motion: string  — REQUIRED reduced-motion fallback description
  //         }
  // e.g.  : see below
  scroll_experience: {
    mode: "chaptered",
    spec: "Each homepage section arrives like a reel change — a soft film-burn wipe and a faint projector flicker as the next 'chapter' scrolls into frame.",
    reduced_motion: "Under prefers-reduced-motion the reel-change wipes and flickers are dropped entirely; the page becomes a plain continuous scroll with instant section boundaries.",
  },

  // ── easter_eggs ─────────────────────────────────────────────────────────────
  // Label : Easter Eggs
  // Type  : array<object>
  // About : Hidden, harmless, discoverable interactions. Each MUST be inert for
  //         non-discoverers, keyboard triggers MUST NOT shadow browser / assistive-
  //         tech shortcuts, and every effect needs an explicit `exit` (e.g. Esc).
  // Shape : { trigger, effect, reward_copy, exit }
  // Values: trigger examples — "konami-code" | "logo-clicks:5" | "typed-word:<word>" |
  //         "hover-hold:<selector>" | "time-of-day:<range>" | "scroll-past-footer"
  // e.g.  : see below
  easter_eggs: [
    {
      trigger: "logo-clicks:5",
      effect: "A little reel of popcorn pops across the top of the screen and Reelo tips his cap.",
      reward_copy: "Intermission! Enjoy the popcorn.",
      exit: "The popcorn settles on its own after ~4s, or press Esc to clear it immediately.",
    },
    {
      trigger: "typed-word:popcorn",
      effect: "The cursor briefly becomes a tiny popcorn box and the marquee bulbs do one warm chase.",
      reward_copy: "You found the concession stand!",
      exit: "Press Esc (or type any other key) to restore the normal cursor.",
    },
  ],

  /* ==========================================================================
   * 25. CONVERSION & PROOF  — the download journey & trust signals
   * ========================================================================== */

  // ── conversion_funnel ───────────────────────────────────────────────────────
  // Label : Conversion Funnel
  // Type  : object
  // About : The kit's download journey — how a visitor is walked toward getting
  //         Phlix, and how much friction this audience tolerates.
  // Shape :
  //         {
  //           style           : enum — "instant-command"|"guided-steps"|
  //                                     "compare-first"|"showcase-first"|"docs-first"
  //           primary_goal    : string
  //           cta_ladder      : array<{ step, cta, target }>   ordered
  //           download_opening: string  — literal description of the Download page's opening move
  //           friction_notes  : string  — how much friction this audience tolerates
  //         }
  // e.g.  : see below
  conversion_funnel: {
    style: "guided-steps",
    primary_goal: "Get a first-time host to run the server and open the lobby.",
    cta_ladder: [
      { step: 1, cta: "Get Your Tickets",         target: "download" },
      { step: 2, cta: "Pick Your Screen",         target: "clients" },
      { step: 3, cta: "Dim the Lights (install)", target: "download#server" },
    ],
    download_opening: "The Download page opens like a box-office window: a friendly 'Two steps to showtime' header over the one-line server install, then the client seat-picker below.",
    friction_notes: "A warm, non-technical family audience — keep the steps few and reassuring, no jargon walls; the install one-liner is framed as 'the easy part'.",
  },

  // ── proof_strategy ──────────────────────────────────────────────────────────
  // Label : Proof Strategy
  // Type  : object
  // About : Ordered trust signals and their format. ONLY VERIFIABLE proof is
  //         allowed — real numbers/links/quotes from content.json or the actual
  //         repos. NEVER invented testimonials or fabricated counts.
  // Shape :
  //         {
  //           signals  : array<{ type, format }>
  //                      type examples: "spec-numbers"|"github"|"architecture"|"quotes-from-docs"
  //                      format = literal rendering instruction
  //           placement: string  — where on the page the proof sits
  //         }
  // e.g.  : see below
  proof_strategy: {
    signals: [
      { type: "spec-numbers",     format: "A lobby placard of real capabilities pulled from content.json — 5 native clients, SyncPlay over NTP-synced devices, HLS + FFmpeg transcoding." },
      { type: "github",           format: "A modest 'from the projection booth' row linking the real phlix-server repo with its live star / issue counts (never a hard-coded number)." },
      { type: "quotes-from-docs", format: "One short, true line lifted from the docs about self-hosting, set as a framed lobby-card quote." },
    ],
    placement: "A single calm 'good seats, honest house' band between the features and the closing box-office CTA.",
  },

  // ── visitor_paths ───────────────────────────────────────────────────────────
  // Label : Visitor Paths
  // Type  : object | null
  // About : An optional self-select audience fork near the hero. `null` means a
  //         single curated path (no fork) — an equally valid, deliberate choice.
  // Shape :
  //         {
  //           prompt: string  — the fork's framing line
  //           paths : array<{ id, label, target, emphasis: [feature ids] }>
  //         }
  // e.g.  : see below
  visitor_paths: {
    prompt: "What kind of showing are you here for?",
    paths: [
      { id: "family-night", label: "Family movie night",         target: "features#syncplay", emphasis: ["syncplay", "auth"] },
      { id: "collector",    label: "I've got a big collection",  target: "features#library",  emphasis: ["library", "transcode"] },
      { id: "tinkerer",     label: "I like to tinker",           target: "plugins",           emphasis: ["plugins", "hub"] },
    ],
  },

  /* ==========================================================================
   * 26. EXPERIENCE PROFILE  — the site's declared experience contract
   * ========================================================================== */

  // ── experience_archetype ────────────────────────────────────────────────────
  // Label : Experience Archetype
  // Type  : enum<string>
  // About : The overall declared site experience model — replaces the authoring
  //         agent's old implicit, derived guess with an explicit choice.
  // Values: "grid" | "immersive" | "editorial" | "card" | "asymmetric" |
  //         "minimal" | "showcase" | "narrative-scroll" | "interactive-demo" |
  //         "zine" | "exhibition"
  // e.g.  : "narrative-scroll"
  experience_archetype: "narrative-scroll",

  // ── complexity_profile ──────────────────────────────────────────────────────
  // Label : Complexity Profile
  // Type  : object
  // About : The information-density contract for the whole site.
  // Shape :
  //         {
  //           density      : enum — "minimal" | "standard" | "dense"
  //           reading_level: enum — "plain-language" | "general" | "technical"
  //           jargon_policy: enum — "foreground" | "allow" | "translate"
  //                          ("translate" = surface the plain-language term up front
  //                          and preserve the precise term in a <details> expander —
  //                          nothing invented or lost)
  //           page_budget  : { home_sections_max, words_per_section_max }
  //         }
  // e.g.  : see below
  complexity_profile: {
    density: "minimal",
    reading_level: "plain-language",
    jargon_policy: "translate",
    page_budget: { home_sections_max: 5, words_per_section_max: 90 },
  },

  // ── intensity_toggle ────────────────────────────────────────────────────────
  // Label : Intensity Toggle
  // Type  : object | null
  // About : An optional visitor-facing "calm mode" beyond prefers-reduced-motion.
  //         `null` means the kit has nothing loud enough to need taming.
  // Shape :
  //         {
  //           label    : string  — the toggle's button text
  //           affects  : array<string>  — what it tones down
  //           default  : enum — "full" | "calm"
  //           placement: string
  //         }
  // e.g.  : see below
  intensity_toggle: {
    label: "House lights up",
    affects: ["animation", "texture", "hero_experience→static", "scroll_experience→continuous"],
    default: "full",
    placement: "A small toggle in the footer utility row, beside the reduced-motion note.",
  },

  // ── error_page_experience ───────────────────────────────────────────────────
  // Label : Error Page Experience (404)
  // Type  : object
  // About : The kit's bespoke 404 concept. NOTE: GitHub Pages serves ONE root
  //         404.html per Pages site, so actually shipping per-kit 404s requires a
  //         small FUTURE build-tooling addition (a path-sniffing root 404 shim).
  //         This field documents the CONCEPT now; wiring it up is intentionally
  //         OUT OF SCOPE for this schema pass.
  // Shape : { concept, recovery_links: [page ids] }
  // e.g.  : see below
  error_page_experience: {
    concept: "A 'wrong theater' gag: Reelo stands under an empty marquee reading 'This showing sold out (or never existed)', holding a torn ticket stub and pointing the way back to the lobby.",
    recovery_links: ["home", "features", "download"],
  },

  /* ==========================================================================
   * 27. DO / DON'T  — categorized, with reasons
   * ========================================================================== */

  // ── do_dont ────────────────────────────────────────────────────────────────
  // Label : Do / Don't
  // Type  : object  (category → { do: array<string>, dont: array<string>, reason: string })
  // About : Categorized guardrails. Categories: colors, typography, layout,
  //         animation, imagery, branding, icons, copywriting, ux, performance.
  do_dont: {
    colors: {
      do: ["Use warm cream backgrounds", "Reserve retro red for key CTAs"],
      dont: ["Use neon or cyberpunk colors", "Use cool grey/black shadows"],
      reason: "Warmth and restraint are central to the cozy cinema feel.",
    },
    typography: {
      do: ["Use Bebas Neue for headlines", "Keep body in Open Sans"],
      dont: ["Use italic headlines", "Use ultra-modern geometric fonts"],
      reason: "Type carries the vintage marquee character.",
    },
    layout: {
      do: ["Give generous whitespace", "Center a single focal point"],
      dont: ["Cram dense dashboards", "Exceed 1400px content width"],
      reason: "Spaciousness reads as inviting and unhurried.",
    },
    animation: {
      do: ["Use springy, playful motion", "Respect reduced-motion"],
      dont: ["Use abrupt linear motion", "Animate everything at once"],
      reason: "Motion should feel joyful, not jittery.",
    },
    imagery: {
      do: ["Use warm hand-painted illustration", "Add film/popcorn motifs"],
      dont: ["Use dark moody photos", "Use dramatic or horror lighting"],
      reason: "Imagery sets the family-friendly nostalgic tone.",
    },
    branding: {
      do: ["Keep the wordmark simple", "Use approved signature elements"],
      dont: ["Add gears/circuits", "Stretch or recolor the logo"],
      reason: "Consistency keeps the brand instantly recognizable.",
    },
    icons: {
      do: ["Use 2px rounded outlined icons"],
      dont: ["Use sharp-cornered or thin hairline icons"],
      reason: "Rounded icons match the soft shape language.",
    },
    copywriting: {
      do: ["Be warm and playful", "Use cinema metaphors sparingly"],
      dont: ["Use corporate jargon", "Be pushy in notifications"],
      reason: "Voice should feel like a friendly usher.",
    },
    ux: {
      do: ["Make primary actions obvious", "Keep flows short"],
      dont: ["Hide key actions", "Add friction to play"],
      reason: "Getting to 'play' should feel effortless.",
    },
    performance: {
      do: ["Lazy-load posters", "Compress textures/grain assets"],
      dont: ["Ship huge unoptimized hero images"],
      reason: "Warm visuals shouldn't cost a slow experience.",
    },
  },

  /* ==========================================================================
   * 28. METADATA
   * ========================================================================== */

  // ── metadata ───────────────────────────────────────────────────────────────
  // Label : Metadata
  // Type  : object
  // About : Bookkeeping about the kit file itself.
  metadata: {
    author: "Phlix Design",                         // string
    created: "2026-06-30",                           // string (ISO date)
    updated: "2026-06-30",                           // string (ISO date)
    license: "Proprietary — Phlix internal use.",    // string
    compatible_models: [                             // array<string> — generators this kit is tuned for
      "claude-opus-4-8",
      "claude-sonnet-4-6",
      "sdxl",
      "flux.1",
    ],
    schema_version: "2.1",                           // string — version of THIS schema shape
    kit_type: "base",                                // string — "base" (parent). Variations use "variation".
    notes: "Base/parent kit. Author variations against this via base_kit.slug.",
  },
};

// Export (ESM). Consumers:
//   import baseKit from './brand_kit_schema.js'
//   import { brandKit } from './brand_kit_schema.js'
// CommonJS consumers on Node 22+ can use:  const baseKit = require('./brand_kit_schema.js').default
export default brandKit;
export { brandKit };
