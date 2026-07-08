/**
 * ============================================================================
 *  PHLIX BRAND KIT  —  Abstract Canvas   (BASE kit)
 *  abstract-canvas.js
 * ============================================================================
 *
 *  Abstract expressionism and gestural painting — Rothko's color field
 *  meditations, Pollock's drip paintings, de Kooning's energetic brushwork,
 *  the raw physicality of paint on canvas. Gallery white walls, linseed oil,
 *  paint-streaked palettes, bold gestural marks. The interface itself feels
 *  like a painted canvas — textured, layered, contemplative yet energetic.
 *
 *  Usage:
 *      import brandKit from './brand-kits/abstract-canvas.js'
 *      import { brandKit } from './brand-kits/abstract-canvas.js'
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY
   * ========================================================================== */

  name: "Abstract Canvas",

  slug: "abstract-canvas",

  version: "1.0",

  description:
    "Abstract Canvas is the contemplative energy of a painter's studio at golden hour — " +
    "linen canvas primed with gesso, tubes of cadmium red and ultramarine squeezed " +
    "onto a paint-streaked palette, the smell of linseed oil hanging in the air. " +
    "It translates the gestural freedom of abstract expressionism into a digital " +
    "interface: warm gallery-linen backgrounds carry bold carbon-black type, " +
    "cadmium red and ultramarine accents echo the painter's primary pigments, and " +
    "every transition moves with the organic spread of paint across canvas. " +
    "Watching Phlix here feels like stepping into a MoMA gallery — hushed, " +
    "purposeful, and quietly electric with creative possibility.",

  inspiration: [
    "Mark Rothko color field paintings — luminous floating rectangles of saturated color",
    "Jackson Pollock drip and pour paintings — raw gestural energy, line and accident",
    "Willem de Kooning brushwork — aggressive, searching, painterly mark-making",
    "Franz Kline black-and-white calligraphic abstractions",
    "Lee Krasner mosaic collage paintings",
    "Helen Frankenthaler poured color stain paintings",
    "Cy Twombly scrawl, graffiti, and mythological notation",
    "Joan Mitchell gestural landscape abstraction",
    "MoMA white cube galleries — the reverence of art presentation",
    "Gagosian Gallery and Pace Gallery aesthetic",
    "Artist's studio with paint-streaked floors and stacked canvases",
    "Tubes of oil paint, sable brushes, linseed oil, turpentine",
  ],

  keywords: [
    "abstract", "expressionism", "gestural", "painterly", "canvas", "gallery",
    "fine-art", "brushstroke", "pigment", "cadmium", "ultramarine", "carbon-black",
    "raw-umber", "linen", "gesso", "oil-paint", "palette", "texture", "mark-making",
    "color-field", "drip", "pour", "scrape", "impasto", "layered", "contemplative",
    "energetic", "bold", "authentic", "searching", "creator", "studio", "atelier",
    "MoMA", "Gagosian", "Rothko", "Pollock", "de-Kooning", "Kline", "Frankenthaler",
    "Twombly", "Mitchell", "linseed", "turpentine", "sable", "bristle", "stain",
    "saturated", "earthy", "warm-ground", "gallery-white", "high-contrast",
    "editorial", "fine-arts", "serif", "Cormorant", "Bebas", "Lora", "expressive",
    "organic", "imperfect", "handmade", "physical", "tactile", "depth", "layering",
  ],

  /* ==========================================================================
   * 2. PERSONALITY
   * ========================================================================== */

  personality: ["Expressive", "Contemplative", "Bold", "Authentic", "Searching", "Painterly"],

  emotional_goals: ["Awe", "Contemplation", "Authenticity", "Creative excitement", "Beauty"],

  archetype: "Creator",

  audience: [
    "Fine art and museum enthusiasts",
    "Collectors and gallery-goers",
    "Design-conscious viewers who value craft and beauty",
    "Artists, photographers, and creative professionals",
    "Adults 30–55 who appreciate cultural depth and aesthetic intention",
    "Film viewers drawn to arthouse, documentary, and international cinema",
  ],

  /* ==========================================================================
   * 3. BRAND STORY
   * ========================================================================== */

  story:
    "Every great work begins with a blank canvas. A stretch of linen, primed white, " +
    "waiting. The painter approaches with nothing but paint and intention — and what " +
    "emerges is entirely their own. Abstract Canvas was built in that spirit. " +
    "It asks: what if a media interface could feel as alive and present as a " +
    "painting? Not a passive container for content, but a surface that carries " +
    "meaning through texture, color, and mark. Phlix built Abstract Canvas for " +
    "the viewer who believes that how you watch is as important as what you watch — " +
    "that the frame around the image shapes the experience of the image itself. " +
    "Every screen here is a canvas. Every choice is a brushstroke. Every session " +
    "is a new painting.",

  tagline_primary: "Every Frame Is a Brushstroke.",

  tagline_secondary: [
    "The canvas is always waiting.",
    "Paint the screen. Find the story.",
    "Art is what you make of it.",
    "See it. Feel it. Keep watching.",
  ],

  mission:
    "Make watching an act of creation — giving every film and series the contemplative " +
    "gallery space it deserves, where the interface itself becomes part of the experience.",

  values: ["Craft", "Authenticity", "Beauty", "Expression", "Contemplation"],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES
   * ========================================================================== */

  brand_dna:
    "Abstract Canvas lives at the intersection of fine art reverence and gestural " +
    "energy. It is warm gallery-linen ground carrying carbon-black type and " +
    "cadmium-red accents — the painter's primary pigments applied with intention. " +
    "It is never sterile, never cold, never flat-digital. Every surface has " +
    "implied texture. Every element feels like it was placed by a hand, not a grid.",

  design_principles: [
    "The canvas is always warm — linen ground, never clinical white.",
    "Carbon black is the painter's most honest line; use it for what matters most.",
    "Cadmium red is precious — reserve it for the single most important action.",
    "Ultramarine blue anchors and deepens; use it for structural emphasis.",
    "Raw umber neutrals ground the palette, preventing any element from floating unmoored.",
    "Typography is a mark — every headline should have the weight of a brushstroke.",
    "Texture implies depth; a flat surface is a missed opportunity.",
    "Motion should feel organic and imperfect, like paint spreading rather than pixels snapping.",
  ],

  brand_opposites: [
    "Not cold, sterile, or clinical",
    "Not purely minimal and white (that is a different gallery)",
    "Not digital-neon or screen-bright",
    "Not corporate or utilitarian",
    "Not playful or cartoon-adjacent",
    "Not dark or brooding — this is a lit gallery, not a cave",
    "Not rushed or frenetic — the painter is deliberate",
  ],

  signature_elements: [
    "Gestural brushstroke marks as decorative dividers or section breaks",
    "Paint-streak texture overlays on card surfaces (subtle, CSS-driven)",
    "Palette knife scrape lines as horizontal rules",
    "Color field rectangular blocks as background accents (Rothko-inspired)",
    "Drip and pour marks as loading or progress indicators",
    "Handwritten-style annotation typography for captions (Cy Twombly reference)",
    "Linen canvas grain texture on backgrounds",
  ],

  header_motif: "Slow gestural brushstroke animation revealing the hero wordmark left-to-right",

  /* ==========================================================================
   * 5. VISUAL IDENTITY
   * ========================================================================== */

  visual_style: [
    "Abstract expressionism",
    "Gestural painting",
    "Color field",
    "Fine art gallery",
    "Painterly texture",
  ],

  art_direction:
    "Artwork should feel like a study in a fine arts painter's studio: warm linen " +
    "grounds with bold gestural marks in carbon black, cadmium red, and ultramarine. " +
    "Compositions are asymmetric and searching — a Kline-like calligraphic slash " +
    "across the field, a Rothko-like floating rectangle of saturated color, a " +
    "Pollock-like web of dripped line. Illustration is gestural and physical: " +
    "visible brush bristle marks, paint-drag textures, impasto buildup at edges. " +
    "The quality of the mark matters as much as the composition. Everything should " +
    "look as though it was made by a hand that knows what it's doing — confident, " +
    "free, and utterly intentional. Avoid anything that looks generated or perfect.",

  realism: "abstract",

  rendering_style: ["gestural", "painterly", "mixed-media", "collage"],

  texture_level: "high",

  depth: "layered",

  lighting: {
    temperature: "warm",
    quality: "gallery — soft, even, north-light studio illumination with warm secondary fill",
    shadows: "soft",
    contrast: "medium-high",
    notes:
      "All light is gallery or studio north-light: soft, directional, warm-white. " +
      "Shadows are soft and diffuse, never harsh. The canvas itself is a light source — " +
      "paint reflects and holds light. No neon, no cold blue, no nighttime mood.",
  },

  composition: [
    "Asymmetric with strong gestural diagonals",
    "Color field blocks anchoring the composition",
    "Negative space held in warm linen ground",
    "Overlapping layered mark-making",
    "Off-center subject with generous breathing room",
    "Implied motion from brush direction",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM
   * ========================================================================== */

  colors: {
    primary: {
      name: "Carbon Black",
      hex: "#1A1A1A",
      rgb: "rgb(26, 26, 26)",
      hsl: "hsl(0, 0%, 10%)",
      usage: "Primary CTAs, headlines, dominant marks — the artist's charcoal and paint black.",
      contrast_targets: ["gallery_linen", "canvas_cream"],
    },
    secondary: {
      name: "Cadmium Red",
      hex: "#CC2200",
      rgb: "rgb(204, 34, 0)",
      hsl: "hsl(10, 100%, 40%)",
      usage: "Secondary actions, links, emphasis highlights — classic oil paint pigment.",
      contrast_targets: ["gallery_linen", "canvas_cream"],
    },
    tertiary: {
      name: "Ultramarine",
      hex: "#0055AA",
      rgb: "rgb(0, 85, 170)",
      hsl: "hsl(210, 100%, 33%)",
      usage: "Tertiary accents, structural highlights, depth elements — painter's blue.",
      contrast_targets: ["gallery_linen", "canvas_cream"],
    },
    neutral: {
      name: "Raw Umber",
      hex: "#8A8070",
      rgb: "rgb(138, 128, 112)",
      hsl: "hsl(36, 10%, 49%)",
      usage: "Muted UI chrome, dividers, secondary text — classic painter's earth tone.",
      contrast_targets: ["gallery_linen"],
    },
    background: {
      name: "Gallery Linen",
      hex: "#F0EDE4",
      rgb: "rgb(240, 237, 228)",
      hsl: "hsl(42, 24%, 92%)",
      usage: "Default page background — warm gallery wall white, like linen canvas primed for painting.",
      contrast_targets: ["carbon_black", "cadmium_red", "ultramarine"],
    },
    surface: {
      name: "Canvas Cream",
      hex: "#E8E4D8",
      rgb: "rgb(232, 228, 216)",
      hsl: "hsl(42, 21%, 88%)",
      usage: "Card and panel surfaces — one visible step above background, like a prepared canvas.",
      contrast_targets: ["carbon_black", "cadmium_red"],
    },
    surface_alt: {
      name: "Aged Ground",
      hex: "#DDD8C8",
      rgb: "rgb(221, 216, 200)",
      hsl: "hsl(41, 18%, 83%)",
      usage: "Alternate surface for striped rows, nested panels, hover states — aged, worked canvas.",
      contrast_targets: ["carbon_black"],
    },
    text: {
      name: "Paint Ink",
      hex: "#141210",
      rgb: "rgb(20, 18, 16)",
      hsl: "hsl(30, 11%, 7%)",
      usage: "Primary body and headline text — near-black like freshly mixed dark paint.",
      contrast_targets: ["gallery_linen", "canvas_cream", "aged_ground"],
    },
    success: {
      name: "Viridian",
      hex: "#1A7A4A",
      rgb: "rgb(26, 122, 74)",
      hsl: "hsl(148, 65%, 29%)",
      usage: "Success toasts, confirmations, completed states — painter's viridian green.",
      contrast_targets: ["gallery_linen"],
    },
    warning: {
      name: "Yellow Ochre",
      hex: "#C8900A",
      rgb: "rgb(200, 144, 10)",
      hsl: "hsl(43, 91%, 41%)",
      usage: "Warnings, caution states, degraded quality indicators — classic ochre pigment.",
      contrast_targets: ["gallery_linen", "canvas_cream"],
    },
    error: {
      name: "Alizarin",
      hex: "#B8001C",
      rgb: "rgb(184, 0, 28)",
      hsl: "hsl(351, 100%, 36%)",
      usage: "Errors, destructive actions, failed states — deep alizarin crimson.",
      contrast_targets: ["gallery_linen", "canvas_cream"],
    },
    info: {
      name: "Cerulean",
      hex: "#1A6BA8",
      rgb: "rgb(26, 107, 168)",
      hsl: "hsl(208, 73%, 38%)",
      usage: "Informational banners, tips, system notices — cerulean blue pigment.",
      contrast_targets: ["gallery_linen"],
    },
    focus: {
      name: "Focus Ultramarine",
      hex: "#0055AA",
      rgb: "rgb(0, 85, 170)",
      hsl: "hsl(210, 100%, 33%)",
      usage: "Keyboard-focus ring (2px, paired with 2px gallery-linen offset).",
      contrast_targets: ["gallery_linen", "canvas_cream"],
    },
    border: {
      name: "Sizing Ground",
      hex: "#C8C2B0",
      rgb: "rgb(200, 194, 176)",
      hsl: "hsl(41, 15%, 74%)",
      usage: "Card borders, dividers — visible against linen and cream but not dominant.",
      contrast_targets: [],
    },
    shadow: {
      name: "Umber Shadow",
      hex: "#8A8070",
      rgb: "rgba(138, 128, 112, 0.18)",
      hsl: "hsl(36, 10%, 49%)",
      usage: "Soft earth-tone drop shadows on cards and key UI elements.",
      contrast_targets: [],
    },
    overlay: {
      name: "Gesso Scrim",
      hex: "#F0EDE4",
      rgb: "rgba(240, 237, 228, 0.88)",
      hsl: "hsl(42, 24%, 92%)",
      usage: "Modal/scrim overlays — near-opaque linen to dim content behind dialogs.",
      contrast_targets: [],
    },
    gradients: [
      {
        name: "Color Field Dusk",
        type: "linear",
        angle: "170deg",
        stops: ["#CC2200", "#0055AA"],
        usage: "Hero backdrops, splash screens, dramatic section breaks — Rothko-inspired.",
      },
      {
        name: "Studio Light",
        type: "radial",
        angle: null,
        stops: ["rgba(240,237,228,1.0)", "rgba(221,216,200,0.0)"],
        usage: "Soft gallery light effect behind hero subjects — north-light studio glow.",
      },
      {
        name: "Canvas Depth",
        type: "linear",
        angle: "180deg",
        stops: ["#E8E4D8", "#DDD8C8"],
        usage: "Subtle surface-to-surface-alt fade for layered depth in panels.",
      },
    ],
  },

  color_rules: [
    "Backgrounds are always warm — gallery linen, canvas cream, or aged ground. Never cold white.",
    "Carbon black is the primary text and CTA color; it carries the visual weight of paint.",
    "Cadmium red is reserved for the single most important CTA per screen.",
    "Ultramarine supports structure and depth; never use it for primary actions.",
    "Raw umber neutralizes and grounds — use it for secondary text and quiet UI chrome.",
    "All text must meet WCAG AA against its light background; Paint Ink on Gallery Linen = ~18:1.",
    "Avoid pure digital colors — every color should feel like it came from a tube of pigment.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  fonts: {
    headline: {
      family: "Cormorant Garamond",
      weight: [600, 700],
      fallbacks: ["Garamond", "Georgia", "Times New Roman", "serif"],
      usage: "Dramatic page titles, hero headlines — fine arts editorial elegance.",
      tracking: "-0.01em",
      line_height: 1.08,
    },
    display: {
      family: "Bebas Neue",
      weight: [400],
      fallbacks: ["Impact", "Haettenschweiler", "sans-serif"],
      usage: "Oversized display stats, title cards, poster numerals — the graphic weight of a painting label.",
      tracking: "0.05em",
      line_height: 0.9,
    },
    body: {
      family: "Lora",
      weight: [400, 500],
      fallbacks: ["Palatino", "Georgia", "serif"],
      usage: "Descriptions, synopses, long-form reading — warm, cultured, literary.",
      tracking: "0em",
      line_height: 1.7,
    },
    ui: {
      family: "Inter",
      weight: [400, 500, 600],
      fallbacks: ["system-ui", "Helvetica Neue", "sans-serif"],
      usage: "Buttons, labels, navigation, chips — clean and contemporary against the painterly backdrop.",
      tracking: "0.01em",
      line_height: 1.35,
    },
    mono: {
      family: "JetBrains Mono",
      weight: [400, 500],
      fallbacks: ["Courier New", "Courier", "monospace"],
      usage: "Code, tokens, runtime counters, technical readouts, catalogue numbers.",
      tracking: "0.02em",
      line_height: 1.5,
    },
    number: {
      family: "Cormorant Garamond",
      weight: [600],
      fallbacks: ["Garamond", "Georgia", "serif"],
      usage: "Stats, runtime durations, episode numbers — editorial figures in the fine arts tradition.",
      tracking: "0.01em",
      line_height: 1.0,
    },
  },

  typography_rules: [
    "Cormorant Garamond headlines must be semibold (600+); never light weight on linen.",
    "Bebas Neue display type is always uppercase — it has no lowercase.",
    "Body copy (Lora) must never be set in all-caps; let the letterforms breathe.",
    "Headline tracking is slightly tight (-0.01em) — painterly type is composed, not loose.",
    "Left-align body copy for readability; centered blocks only for short display phrases.",
    "Use Cormorant Garamond italic for captions, artist names, and fine-print asides.",
    "Avoid geometric sans-serif headlines — they break the fine-arts register.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  shape_language: [
    "Slightly imperfect rectangles (canvas-frame proportions)",
    "Soft but not bubbly corners — medium radius",
    "Gestural rule lines (not perfectly even, implied brushstroke)",
    "Horizontal color-field band dividers",
    "Organic asymmetric blobs for illustration elements only",
  ],

  corner_radius: {
    small: "3px",
    medium: "6px",
    large: "12px",
    xl: "18px",
    pill: "999px",
  },

  borders: {
    thickness: "1px",
    style: "solid",
    rounded: false,
    hand_drawn: false,
    notes:
      "Borders reference the edges of a stretched canvas — honest, structural, not decorative. " +
      "Use 1px sizing-ground borders on cards. Accent borders use 2px cadmium red or ultramarine " +
      "for emphasis. Avoid hairline borders on light surfaces — they disappear against linen.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  icon_style: ["Outlined", "Slightly weighted", "Organic", "Editorial"],

  icon_rules: [
    "1.5px–2px stroke weight with slightly rounded caps — like a fine sable brush line.",
    "Corners at medium radius (4–6px) — not sharp, not bubbly.",
    "Carbon black for default; cadmium red for active/featured state.",
    "Avoid mechanical icon sets — choose libraries with warmth and craft (e.g. Phosphor, Feather).",
    "Never use filled solid icons as the default state — outline is the painter's vocabulary.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  illustration_style: [
    "Abstract expressionist gestural painting",
    "Color field composition",
    "Painterly mixed-media collage",
    "Gestural ink and wash",
    "Studio-process visual language",
  ],

  character_style: {
    proportions: "Loose, gestural figuration — not photorealistic; form implied through mark rather than line.",
    eyes: "Suggestive, not literal — the eyes are implied through placement and expression of mark.",
    expressions: "Open, searching, absorbed, joyful in process, quietly intense.",
    clothing:
      "Paint-spattered studio clothing, aprons, rolled sleeves — or formal gallery attire. " +
      "Color pulled from the pigment palette: carbon, cadmium, ultramarine, umber.",
    outlines: "Gestural, not clean — varying-weight brush lines, visible bristle marks, intentional imperfection.",
  },

  mascot: {
    name: "Palette",
    species: "Stylized painter's palette rendered in gestural brushstroke marks",
    personality: "The creative guide — endlessly curious, generous with ideas, a little paint-stained.",
    description:
      "A painter's palette shape brought to life through gestural brushstroke marks — its " +
      "form suggested by thick paint strokes rather than clean outlines. It carries color " +
      "field rectangles of cadmium red and ultramarine on its surface, and a sable brush " +
      "tucked behind it like a quill. Palette appears in loading screens and empty states, " +
      "always in the middle of making something.",
    poses: [
      "Held aloft, dripping with fresh cadmium red and ultramarine",
      "Flat on a paint-streaked studio table with brushes arranged beside it",
      "Being lifted off a canvas with a fresh wet mark just made",
      "Tilted at an angle, studying the viewer the way a painter studies a subject",
    ],
    expressions: ["Curious and open", "Absorbed in the work", "Satisfied after a mark well made", "Inviting — come look at this"],
  },

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  photography_style: [
    "Gallery and museum documentation photography",
    "Natural studio north-light",
    "Fine art print-quality still life",
    "Process documentation — paint, tools, hands at work",
    "Warm film-stock color grade (Kodak Portra / Fuji Pro aesthetic)",
  ],

  photo_rules: [
    "Always warm-toned: Kodak Portra film grade, never cold or blue-tinted.",
    "Prefer natural north-light studio photography — no harsh artificial flash.",
    "Textures are welcome: close-up of paint surface, canvas grain, brushstroke detail.",
    "Composition should feel like a painting — asymmetric, intentional, with breathing room.",
    "Avoid generic stock photography — every image should feel handpicked or made.",
    "Smiling lifestyle is acceptable if contextually natural; mood over performance.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  motion_style: ["Organic", "Painterly", "Deliberate", "Imperfect"],

  transitions: [
    "Cross-dissolve (paint wash)",
    "Gestural wipe — brushstroke reveal from left",
    "Color field fade — saturated rectangle expands then dissolves to content",
    "Slow pour — content floods in from the top like poured paint",
    "Organic ease — nothing snaps; everything spreads",
  ],

  animation_speed: "medium",

  easing: ["cubic-bezier(0.25, 0.1, 0.25, 1.0)", "ease-in-out", "cubic-bezier(0.4, 0, 0.6, 1)"],

  microinteractions: {
    hover:
      "Cards gain a 2px cadmium-red top border and lift 2px with an umber soft shadow " +
      "(0 6px 24px rgba(138,128,112,0.22)) over 250ms ease-in-out.",
    button_press:
      "Carbon black button deepens slightly and yields 1px downward — like pressing " +
      "a brush into wet paint — then recovers over 180ms.",
    loading:
      "A gestural brushstroke mark sweeps left to right across the surface in cadmium " +
      "red at 30% opacity, repeating with organic timing variation.",
    drag:
      "Item lifts with a soft umber shadow and gains a cadmium-red 1px border — " +
      "like lifting a canvas off a stack.",
    focus:
      "2px ultramarine focus ring fades in over 150ms with a soft outer umber " +
      "halo (0 0 0 4px rgba(0,85,170,0.15)).",
    success:
      "Brief viridian-green brushstroke mark radiates outward from the success element, " +
      "then resolves to a static check mark in the same color.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  ui_style: [
    "Warm linen surfaces",
    "Carbon-black edge accents",
    "Gallery grid clarity",
    "Painterly texture depth",
    "Editorial fine-art chrome",
  ],

  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],

  shadows: {
    sm: "0 1px 4px rgba(138,128,112,0.15)",
    md: "0 4px 16px rgba(138,128,112,0.18), 0 1px 4px rgba(20,18,16,0.06)",
    lg: "0 10px 36px rgba(138,128,112,0.22), 0 2px 8px rgba(20,18,16,0.08)",
    cadmium_accent: "0 0 0 2px rgba(204,34,0,0.25), 0 4px 16px rgba(204,34,0,0.1)",
    ultramarine_accent: "0 0 0 2px rgba(0,85,170,0.2), 0 4px 16px rgba(0,85,170,0.08)",
    gallery: "0 2px 12px rgba(138,128,112,0.12), 0 1px 2px rgba(20,18,16,0.05)",
    notes:
      "Shadows are warm earth-tone, never cold or blue. They mimic the soft ambient shadow " +
      "of gallery north-light — diffuse, directional, never harsh.",
  },

  cards: {
    elevation: "md",
    padding: "16px",
    border_radius: "6px",
    border: "1px solid #C8C2B0",
    background: "#E8E4D8",
    notes:
      "Canvas-cream cards with sizing-ground borders. Featured cards gain a 2px cadmium-red " +
      "top border on hover. The card surface should feel like a prepared canvas — warm, ready.",
  },

  buttons: {
    primary: {
      bg: "#1A1A1A",
      text: "#F0EDE4",
      radius: "4px",
      notes: "Carbon black, gallery-linen text — the painter's confident mark as action.",
    },
    secondary: {
      bg: "transparent",
      text: "#CC2200",
      radius: "4px",
      notes: "1px cadmium-red border, cadmium-red text — gestural outline, not filled.",
    },
    danger: {
      bg: "#B8001C",
      text: "#F0EDE4",
      radius: "4px",
      notes: "Alizarin crimson — destructive actions only.",
    },
    ghost: {
      bg: "transparent",
      text: "#141210",
      radius: "4px",
      notes: "1px sizing-ground border, paint-ink text. Quiet non-primary action.",
    },
    link: {
      bg: "transparent",
      text: "#CC2200",
      radius: "0",
      notes: "Cadmium red, underline on hover. Inline text actions, references.",
    },
    icon: {
      bg: "#DDD8C8",
      text: "#141210",
      radius: "4px",
      notes: "Aged-ground icon button; active state uses cadmium-red icon color.",
    },
    fab: {
      bg: "#CC2200",
      text: "#F0EDE4",
      radius: "6px",
      notes: "Cadmium-red floating action button — the boldest mark on the canvas.",
    },
  },

  forms: {
    inputs:
      "Canvas-cream fill, 1px sizing-ground border, 4px radius, 12px padding. " +
      "Focus state: 1px ultramarine border + ultramarine outer ring (rgba(0,85,170,0.15)).",
    checkboxes: "Slightly rounded square (3px), carbon-black check mark — clean and deliberate.",
    switches: "Rounded-rect track, canvas-cream knob, cadmium red when on.",
    dropdowns: "Canvas-cream surface, 1px sizing-ground border, paint-ink options, umber hover.",
    validation:
      "Inline; error = alizarin text, success = viridian text. One sentence. No icons.",
  },

  tables: {
    headers: "Inter caps on aged-ground header row, sizing-ground border, raw-umber text.",
    hover: "Row gains canvas-cream background and 2px left-edge cadmium-red accent.",
    sorting: "Small chevron in ultramarine.",
    striping: "Alternate rows use aged-ground (#DDD8C8), subtle 5% lightness difference.",
  },

  navigation: {
    sidebar:
      "Gallery-linen panel, 1px sizing-ground right border, active indicator bar " +
      "(3px left cadmium-red), paint-ink icon + label.",
    topbar:
      "Canvas-cream bar with 1px bottom sizing-ground border; brand wordmark in " +
      "Cormorant Garamond with a faint cadmium-red text-shadow on hover.",
    tabs: "Underline tabs; active tab has 2px cadmium-red bottom line.",
    breadcrumbs: "Lora small, separated by a single right chevron in raw umber.",
  },

  dashboard_style:
    "Editorial grid on gallery linen — Cormorant Garamond stat figures in carbon black, " +
    "canvas-cream cards with soft umber shadow, cadmium-red accent bars on featured metrics. " +
    "Information-rich but spacious; every panel breathes like a gallery wall.",

  component_styles: {
    dialog:
      "Centered canvas-cream card on a near-opaque gesso scrim; 2px cadmium-red top " +
      "border on the dialog frame; Cormorant Garamond title.",
    sidebar: "See navigation.sidebar; collapses to icon-only rail with cadmium-red active dot.",
    carousel:
      "Horizontal poster rail; left/right edge gradients fade to gallery linen; " +
      "carbon-black arrow controls with cadmium-red hover state.",
    search_bar:
      "Full-width rectangular input on canvas-cream; magnifier icon in raw umber; " +
      "placeholder: 'Search the collection…'",
    media_player:
      "Canvas-cream control bar with cadmium-red scrubber; elapsed time in Cormorant " +
      "Garamond; controls in paint-ink, active in cadmium red.",
    toast:
      "Slightly rounded toast anchored bottom-right; 2px left-edge color bar (ultramarine " +
      "= info, yellow ochre = warning, alizarin = error); slides in from right.",
    chip:
      "Rounded-rect chip on aged-ground with 1px sizing-ground border; active chip " +
      "gets 1px cadmium-red border + cadmium-red text.",
  },

  layout_patterns: {
    dashboard:
      "Full gallery-linen background; top stat bar with carbon-black figures → " +
      "3-column canvas-cream card grid → recent-activity rail with cadmium-red accent.",
    settings:
      "Left vertical tab nav with cadmium-red active indicator + right form panels; " +
      "max-width 800px content zone, generous whitespace.",
    media_library:
      "Sticky filter/sort bar on canvas-cream → responsive poster grid " +
      "(auto-fill, 180px min) on gallery linen.",
    authentication:
      "Full-bleed gallery-linen background with ambient color-field radial; " +
      "centered canvas-cream form card with cadmium-red top border.",
    landing:
      "Full-bleed gestural hero composition with Cormorant Garamond headline over " +
      "color-field gradient → feature sections alternating linen/cream → carbon CTA.",
    detail_view:
      "Full-bleed warm-graded backdrop still → left: poster with carbon-black play button → " +
      "right: metadata in Lora → episodes/related rails below.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY
   * ========================================================================== */

  poster_style:
    "Fine-art gallery one-sheet: Cormorant Garamond title in paint-ink or cadmium red, " +
    "high-quality key art, 1px sizing-ground border, medium corners, warm film-grade texture.",

  thumbnail_style:
    "Medium 6px corners, 1px sizing-ground border, warm film grade, cadmium-red " +
    "title overlay in Inter on a soft canvas-cream scrim.",

  backdrop_style:
    "Full-bleed warm-graded cinematic still, shadows pulled to soft warm-black, " +
    "Portra-film color grade, subtle canvas-grain overlay, 70% darkening vignette at bottom.",

  media_cards:
    "Poster over canvas-cream card; title + year in Inter below; hover reveals " +
    "2px cadmium-red top border + carbon-black play button centered on poster.",

  badges: {
    labels: ["4K", "HDR", "Dolby Vision", "Continue Watching", "New", "Favorite", "Unrated"],
    shape: "Slightly rounded rectangle (4px radius), 1px border.",
    colors:
      "Carbon black for quality (4K/HDR/Dolby), ultramarine for status (New, Continue " +
      "Watching), cadmium red for Favorite.",
    typography: "Inter, 600 weight, uppercase, 10–11px.",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  voice: ["Thoughtful", "Cultivated", "Direct", "Honest"],

  tone: [
    "Warm but not sentimental",
    "Confident without being cold",
    "Literary and precise",
    "Occasionally poetic — never purple",
  ],

  writing_style:
    "Clear, considered sentences. Active voice. A literary register without pretension. " +
    "Copy should feel like catalogue wall text — informed, welcoming, never condescending. " +
    "Never breathless, never corporate, never glib. The voice is a curator who loves the work " +
    "and trusts the viewer to meet it.",

  vocabulary: ["canvas", "mark", "field", "studio", "work", "collection", "form", "ground", "frame", "view"],

  avoid_words: [
    "binge", "content", "consume", "algorithm", "awesome", "amazing", "exciting",
    "leverage", "synergy", "utilize", "robust", "seamless", "game-changing",
  ],

  greetings: [
    "Welcome back to the collection.",
    "The canvas is ready.",
    "Good to see you. There's new work to look at.",
  ],

  empty_state_messages: [
    "Nothing here yet. Every collection begins somewhere.",
    "The wall is empty — add something to change that.",
    "No results. Try a different search, or browse the collection.",
    "Nothing watched yet. Palette is waiting.",
  ],

  notification_style:
    "Warm, brief, and considered — like a gallery assistant's quiet word. " +
    "One or two sentences, no exclamation marks, no urgency. Delivered as though " +
    "it matters, because it does.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE
   * ========================================================================== */

  image_prompt_prefix:
    "Fine art abstract expressionist painting, gestural brushwork, warm gallery light, " +
    "oil on linen canvas, cadmium red and ultramarine pigments, carbon black marks,",

  image_prompt_suffix:
    ", warm gallery-linen ground (hex #F0EDE4), painterly texture, visible brushstrokes, " +
    "fine art quality, museum-print composition, no text overlays.",

  negative_prompt: [
    "cold", "neon", "digital", "dark background", "night", "fluorescent",
    "corporate", "cartoonish", "vector flat", "emoji", "cheerful stock photo",
    "bright white clinical", "pastel candy", "glowing UI", "chrome metal",
  ],

  ui_generation_rules: [
    "Background is always gallery linen (#F0EDE4) or canvas cream (#E8E4D8). Never cold or dark.",
    "Carbon black (#1A1A1A) is the primary text and CTA color.",
    "Cadmium red (#CC2200) is the accent and secondary action color — use sparingly.",
    "Medium corners (4–6px) throughout; never sharp like noir, never bubbly like consumer apps.",
    "Use the spacing scale; generous spacing reads as gallery breathing room.",
    "Max content width 1400px.",
    "All text must meet WCAG AA against its light background.",
  ],

  logo_rules: {
    shape:
      "Wordmark in Cormorant Garamond or Bebas Neue, optionally inside a medium-radius " +
      "rectangle with a 1px cadmium-red or sizing-ground border.",
    complexity: "Simple and high-contrast — must read on gallery linen at all sizes.",
    negative_space: "Generous — the warm linen around the wordmark is intentional, like a gallery wall.",
    colors: "Carbon-black wordmark on gallery linen. Cadmium-red accent for a single element.",
    allowed_symbols: [
      "gestural brushstroke mark",
      "palette shape",
      "color field rectangle",
      "canvas stretcher frame",
    ],
    forbidden_symbols: [
      "play-button triangle cliché",
      "gear or circuit icons",
      "neon glows",
      "photorealistic imagery",
    ],
  },

  illustration_prompt_template:
    "{prefix} {subject}, in the Abstract Canvas style, {mood}, on a warm gallery-linen " +
    "ground with gestural cadmium and ultramarine marks {suffix}",

  page_generation_rules: [
    "Background is always gallery linen — every page begins in warm light.",
    "Hero sections feature a bold gestural painting or color-field composition.",
    "CTA buttons are carbon black with gallery-linen text.",
    "Reveal content with slow organic entrance animations (painterly dissolve, not bounce).",
    "Maximum page width 1400px; content left-aligned on wider viewports.",
    "Every page should have at least one cadmium-red accent element that anchors the palette.",
  ],

  prompt_library: {
    logo:
      "Design an Abstract Canvas logo: Cormorant Garamond wordmark in carbon black on " +
      "gallery linen (#F0EDE4), optional 1px cadmium-red rectangular border, medium " +
      "corners, no cold colors, no harsh edges.",
    illustration:
      "{image_prompt_prefix} {subject} {image_prompt_suffix}",
    icon:
      "Outlined editorial icon of {subject}, 1.5px stroke, carbon black, slightly rounded " +
      "caps (sable-brush quality), cadmium-red active state, fine-art aesthetic.",
    background:
      "Gallery-linen warm background (#F0EDE4) with subtle canvas-grain texture and a " +
      "soft cadmium-red color-field rectangle in one quadrant at 15% opacity. No text.",
    landing_page:
      "A fine-art media landing page: full-bleed warm gestural hero with Cormorant " +
      "Garamond headline, carbon-black CTA button, canvas-cream card sections, " +
      "cadmium-red and ultramarine accent elements, gallery breathing room.",
    dashboard:
      "A warm editorial media dashboard on gallery linen with Cormorant Garamond " +
      "carbon-black stats, canvas-cream cards with soft umber shadows, cadmium-red " +
      "accent bars, Bebas Neue for large numerals.",
    marketing:
      "A fine-art poster-style social graphic for {topic}: Cormorant Garamond headline " +
      "in carbon black or cadmium red, warm gallery-linen background, gestural painting " +
      "key art, museum-quality composition.",
  },

  /* ==========================================================================
   * 17. DESIGN TOKENS
   * ========================================================================== */

  design_tokens: {
    color: {
      "--color-primary": "#1A1A1A",
      "--color-secondary": "#CC2200",
      "--color-tertiary": "#0055AA",
      "--color-bg": "#F0EDE4",
      "--color-surface": "#E8E4D8",
      "--color-surface-alt": "#DDD8C8",
      "--color-text": "#141210",
      "--color-neutral": "#8A8070",
      "--color-success": "#1A7A4A",
      "--color-warning": "#C8900A",
      "--color-error": "#B8001C",
      "--color-info": "#1A6BA8",
      "--color-border": "#C8C2B0",
      "--color-focus": "#0055AA",
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
      "--radius-sm": "3px",
      "--radius-md": "6px",
      "--radius-lg": "12px",
      "--radius-xl": "18px",
      "--radius-pill": "999px",
    },
    typography: {
      "--font-headline": "'Cormorant Garamond', Garamond, Georgia, serif",
      "--font-display": "'Bebas Neue', Impact, sans-serif",
      "--font-body": "'Lora', Palatino, Georgia, serif",
      "--font-ui": "'Inter', system-ui, 'Helvetica Neue', sans-serif",
      "--font-mono": "'JetBrains Mono', 'Courier New', monospace",
    },
    shadow: {
      "--shadow-sm": "0 1px 4px rgba(138,128,112,0.15)",
      "--shadow-md": "0 4px 16px rgba(138,128,112,0.18), 0 1px 4px rgba(20,18,16,0.06)",
      "--shadow-lg": "0 10px 36px rgba(138,128,112,0.22), 0 2px 8px rgba(20,18,16,0.08)",
      "--shadow-cadmium": "0 0 0 2px rgba(204,34,0,0.25), 0 4px 16px rgba(204,34,0,0.1)",
      "--shadow-ultramarine": "0 0 0 2px rgba(0,85,170,0.2), 0 4px 16px rgba(0,85,170,0.08)",
      "--shadow-gallery": "0 2px 12px rgba(138,128,112,0.12), 0 1px 2px rgba(20,18,16,0.05)",
    },
  },

  /* ==========================================================================
   * 18. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  responsive_behavior: {
    desktop:
      "Multi-column poster rails, hover cadmium-red border affordances, editorial sidebar, " +
      "max 1400px content width. Full shadow depth and texture effects.",
    tablet:
      "2–3 column grids, enlarged touch targets (48px min), collapsible sidebar to icon rail. " +
      "Reduce shadow intensity by 30% for performance on mid-range devices.",
    tv:
      "10-foot UI: Bebas Neue numerals at 2× scale, bold 4px cadmium-red focus ring, " +
      "D-pad spatial navigation, poster grids fill the gallery-linen field.",
    mobile:
      "Single column, bottom tab bar on canvas cream, full-width portrait posters, " +
      "sticky carbon-black play bar at bottom. Touch-optimized; no hover states.",
  },

  /* ==========================================================================
   * 19. SOUND IDENTITY
   * ========================================================================== */

  sound_identity: {
    startup_chime:
      "A single sustained cello note rising gently from silence, then resolving to a " +
      "warm piano chord. Gallery quiet transformed to open invitation.",
    notification:
      "Soft single wood-block tap — like a painter setting a brush down on a palette tray. Brief.",
    ui_click:
      "Quiet, clean mid-weight click — not mechanical, not digital. The sound of paper on wood.",
    success:
      "A warm ascending two-note piano tone. Understated satisfaction — like stepping back " +
      "from a canvas and knowing the mark is right.",
    error:
      "A low, brief string mute — the sound of a wrong note caught quickly. Not alarming.",
  },

  /* ==========================================================================
   * 20. SEASONAL VARIANTS
   * ========================================================================== */

  seasonal_variants: [
    {
      name: "Autumn Study",
      active_range: "10-01..11-15",
      overrides: {
        "--color-primary": "#8B3A00",
        "--color-secondary": "#CC6600",
        "--color-bg": "#F2EBD8",
      },
      motif:
        "Burnt sienna and raw-sienna palette; fallen-leaf shapes as decorative marks; " +
        "warm amber field replaces the cadmium-red accent.",
    },
    {
      name: "Winter White",
      active_range: "12-01..01-15",
      overrides: {
        "--color-bg": "#F8F6F2",
        "--color-surface": "#EFECE4",
        "--color-secondary": "#003399",
      },
      motif:
        "Cooler, paler linen ground — like a fresh-gessoed canvas; ultramarine deepens " +
        "to Prussian blue; sparse winter composition, more negative space.",
    },
    {
      name: "Spring Opening",
      active_range: "03-15..05-15",
      overrides: {
        "--color-secondary": "#AA2288",
        "--color-tertiary": "#007744",
      },
      motif:
        "Warm cerulean and viridian join the palette; gestural flower-form marks in " +
        "magenta; the composition becomes lighter and more open.",
    },
  ],

  /* ==========================================================================
   * 21. ACCESSIBILITY
   * ========================================================================== */

  accessibility: {
    minimum_contrast:
      "WCAG AA required (4.5:1 body text, 3:1 large text/UI). " +
      "Paint Ink (#141210) on Gallery Linen (#F0EDE4) = ~18:1 — exceeds AAA. " +
      "Carbon Black (#1A1A1A) on Gallery Linen = ~16.8:1 — exceeds AAA. " +
      "Cadmium Red (#CC2200) on Gallery Linen = ~5.8:1 — passes AA. " +
      "Raw Umber (#8A8070) on Gallery Linen: check individually — may require larger text.",
    focus_style:
      "2px ultramarine focus ring with 2px gallery-linen offset; an additional " +
      "4px ultramarine outer glow (rgba(0,85,170,0.15)) for visibility on light surfaces. " +
      "Always visible — never hidden by overflow or surface color.",
    touch_target: "Minimum 48×48px on mobile and TV. 44×44px minimum on desktop.",
    motion_reduction:
      "Honor prefers-reduced-motion: replace gestural brushstroke loaders with static " +
      "skeleton shimmer on canvas-cream; replace paint-pour transitions with cross-fades; " +
      "retain only opacity-based entrance animations. No motion as default for vestibular users.",
    font_scaling:
      "All layouts must survive 200% browser text zoom without clipping or horizontal " +
      "scroll. Cormorant Garamond degrades gracefully to Georgia; Bebas Neue to Impact. " +
      "Test Lora body text at 200% — long-form descriptions need reflow room.",
  },

  /* ==========================================================================
   * 22. DO / DON'T
   * ========================================================================== */

  do_dont: {
    colors: {
      do: [
        "Use gallery linen or canvas cream for every background — keep the ground warm",
        "Apply cadmium red exclusively to the primary CTA or the single most important accent",
        "Use carbon black for headlines and primary actions — it has the weight of paint",
        "Let raw umber carry secondary UI chrome — it grounds without dominating",
      ],
      dont: [
        "Use cold white, pure #FFFFFF, or blue-tinted backgrounds",
        "Scatter cadmium red across multiple elements indiscriminately",
        "Use neon or highly saturated digital colors — they break the pigment palette",
        "Make the interface dark — this is a lit gallery, not a cinema",
      ],
      reason:
        "The Abstract Canvas atmosphere depends on the warmth and physicality of painter's " +
        "pigments. Cold or digital colors destroy the sense that the interface was painted, not generated.",
    },
    typography: {
      do: [
        "Use Cormorant Garamond semibold for dramatic hero headlines",
        "Use Lora for body copy — it is warm, literary, and made for reading",
        "Set Bebas Neue display text in uppercase for numerals and title cards only",
        "Use Cormorant Garamond italic for captions, artist attributions, and asides",
      ],
      dont: [
        "Use geometric sans-serif (e.g. Helvetica, Futura) for headlines — too cold",
        "Set body copy in Cormorant Garamond at small sizes — it needs room to breathe",
        "Use light font weights for headlines on linen — contrast drops unacceptably",
        "Center long body copy blocks — left-align for legibility",
      ],
      reason:
        "Typography carries the fine-arts register — Cormorant's editorial authority, " +
        "Lora's warmth, and Bebas's graphic weight all reinforce the sense that this " +
        "interface was designed by someone who cares about craft.",
    },
    layout: {
      do: [
        "Give every element generous breathing room — white space is the gallery wall",
        "Align to a clear editorial grid with clear hierarchy",
        "Create asymmetric compositions that feel curated, not templated",
        "Use horizontal color-field band dividers as section breaks",
      ],
      dont: [
        "Fill all linen space with UI chrome — empty space is intentional",
        "Use chaotic asymmetry without underlying structure — the grid is the canvas stretcher",
        "Exceed 1400px content width",
        "Make the layout feel dense or crowded — that is not a gallery",
      ],
      reason:
        "Gallery space is intentional — generous empty areas create contemplation and focus, " +
        "just as white wall space focuses attention on the artwork. The layout should feel curated.",
    },
    animation: {
      do: [
        "Use slow, organic transitions (250–450ms) that feel like paint spreading",
        "Animate with smooth ease-in-out curves — nothing mechanical or abrupt",
        "Use gestural brushstroke reveals for hero content entrances",
        "Respect prefers-reduced-motion unconditionally",
      ],
      dont: [
        "Use spring, bounce, or elastic easing — paint does not bounce",
        "Use rapid snap transitions — the pace should be contemplative",
        "Use playful or cartoonish animations — this is a fine-arts context",
        "Run continuous looping animations without pause",
      ],
      reason:
        "Motion in Abstract Canvas is like watching paint spread or a brushstroke complete — " +
        "organic, deliberate, never mechanical. Any hint of 'digital bounce' breaks the aesthetic.",
    },
    imagery: {
      do: [
        "Use warm-toned gallery and studio photography with Portra-film grade",
        "Use gestural painting and color-field composition as hero imagery",
        "Show process: paint, brushes, palette, hands at work, canvas surfaces",
        "Use high-quality fine-art prints and museum photography",
      ],
      dont: [
        "Use cold, neon-lit, or blue-tinted photography",
        "Use cheerful generic stock imagery",
        "Use photorealistic CGI or 3D renders — they lack the hand-made quality",
        "Use imagery that looks digitally over-processed or filtered",
      ],
      reason:
        "Every image should feel as though it could hang in the same gallery as the content " +
        "it surrounds — warm, intentional, and made with care.",
    },
    branding: {
      do: [
        "Keep the wordmark on warm linen or canvas-cream grounds",
        "Use approved signature elements (brushstrokes, palette shapes, color fields)",
        "Maintain the warm-pigment palette across all brand touchpoints",
      ],
      dont: [
        "Place the wordmark on cold, dark, or neon backgrounds without an approved variant",
        "Use the brand mark at sizes below 24px — the Garamond forms need room",
        "Introduce non-brand colors: no lime, no purple, no digital cyan",
      ],
      reason:
        "Brand recognition in Abstract Canvas comes from warmth, weight, and the sense of " +
        "physicality — consistency across touchpoints is what makes the identity feel like a " +
        "coherent body of work rather than a collection of separate pieces.",
    },
    icons: {
      do: [
        "Use 1.5–2px outlined icons with slightly rounded caps",
        "Apply cadmium red for active icon states",
        "Keep icon forms editorial and restrained — these are catalogue symbols",
      ],
      dont: [
        "Use excessively rounded or bubbly icon libraries",
        "Use filled solid icons as the default state",
        "Mix icon stroke weights within a single view",
      ],
      reason:
        "Icons should feel like marks in a fine-arts catalogue — precise, intentional, " +
        "with the warmth of a drawn line rather than a mechanical stamp.",
    },
    copywriting: {
      do: [
        "Write with the register of a thoughtful gallery catalogue",
        "Use warm, considered language that respects the viewer's intelligence",
        "Let the work speak — copy supports, not dominates",
      ],
      dont: [
        "Use exclamation marks or breathless enthusiasm",
        "Use streaming-industry jargon (binge, content, algorithm)",
        "Write more than two sentences for any toast or notification",
        "Use corporate filler phrases — every word should earn its place",
      ],
      reason:
        "The voice is a knowledgeable curator — confident, warm, economical, and always " +
        "in service of the work and the viewer, never performing excitement.",
    },
    ux: {
      do: [
        "Make the play action immediately accessible on every media card",
        "Provide a single dominant carbon-black CTA per screen",
        "Use cadmium-red accent color to guide attention to the next action",
      ],
      dont: [
        "Hide critical actions behind menus or progressive disclosure",
        "Use multiple equally prominent CTAs that compete for attention",
        "Add friction to the path from collection to playback",
      ],
      reason:
        "The product is a media server — the fine-arts aesthetic should serve the " +
        "experience, never make it feel precious or difficult to use.",
    },
    performance: {
      do: [
        "Lazy-load poster images with a canvas-cream placeholder",
        "Use CSS box-shadow for depth effects — do not use glow images",
        "Compress all canvas-texture overlays aggressively before serving",
        "Prefer CSS transitions over JS-driven animation libraries",
      ],
      dont: [
        "Ship unoptimized high-resolution texture backgrounds",
        "Use SVG paint-filter effects on large areas without performance profiling",
        "Block render on web font load — use font-display: swap for Cormorant and Lora",
      ],
      reason:
        "A warm, contemplative experience should feel effortless — slow load breaks " +
        "the gallery atmosphere as effectively as the wrong color palette.",
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
      "Base/parent kit. Variations (e.g. 'Abstract Canvas: Ink Study', 'Abstract Canvas: Color Field') " +
      "should reference this via base_kit.slug = 'abstract-canvas' and override only diverging fields. " +
      "This is a LIGHT BACKGROUND kit — do not use on dark surfaces without an approved dark variant.",
  },
};

export default brandKit;
export { brandKit };
