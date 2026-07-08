/**
 * ============================================================================
 *  PHLIX BRAND KIT  —  "Holographic Future"
 *  holographic-future.js                       BASE KIT  •  kit_type: "base"
 * ============================================================================
 *
 *  Prismatic holographic chrome aesthetic. Iridescent foil surfaces, rainbow
 *  light diffraction, liquid chrome morphing shapes, AR/VR interfaces floating
 *  in translucent layers. Tech-luxury. Chrome white and silver base with
 *  constantly shifting rainbow iridescence, electric blue, and prismatic
 *  spectrum accents. Progressive, luminous, futuristic, premium.
 *
 *  This is a BASE kit. Variations should reference slug "holographic-future"
 *  via their `base_kit.slug` field and layer only their distinguishing overrides.
 *
 *  USAGE
 *  -----
 *      import baseKit from './holographic-future.js'
 *      import { brandKit } from './holographic-future.js'
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY
   * ========================================================================== */

  name: "Holographic Future",

  slug: "holographic-future",

  version: "1.0",

  description:
    "A prismatic holographic chrome experience built for the next dimension of " +
    "media. Iridescent foil surfaces shift from silver to electric blue to " +
    "rainbow spectrum as light catches every edge. Translucent AR panels float " +
    "in layered space. Premium, luminous, progressive — the media server that " +
    "looks like it arrived from ten years ahead.",

  inspiration: [
    "Holographic foil trading cards and collector editions",
    "AR / mixed-reality heads-up displays",
    "Liquid chrome and mercury surfaces",
    "Diffraction grating rainbow prisms",
    "Premium credit-card iridescent finishes",
    "Apple Vision Pro spatial computing UI",
    "Electromagnetic spectrum visualizations",
    "Polished titanium and brushed aluminum aerospace components",
    "Laser-etched crystal and dichroic glass art",
    "Sci-fi film UI design (Minority Report, Her, Blade Runner 2049)",
  ],

  keywords: [
    "holographic", "iridescent", "prismatic", "chrome", "foil", "rainbow",
    "diffraction", "luminous", "translucent", "spectral", "electric-blue",
    "silver", "platinum", "glass", "crystal", "liquid-metal", "AR", "VR",
    "spatial", "floating", "layered", "futuristic", "premium", "luxury",
    "tech", "progressive", "neon-gradient", "spectrum", "refraction", "aurora",
    "ultraviolet", "infrared", "pearlescent", "opalescent", "shimmer",
    "gleam", "refractive", "thin-film", "morphing", "dimensional", "XR",
    "immersive", "cinematic-tech", "zero-gravity", "sleek", "precise",
    "sharp-edges", "geometric", "angular", "avant-garde", "boundary-pushing",
  ],

  /* ==========================================================================
   * 2. PERSONALITY
   * ========================================================================== */

  personality: ["Visionary", "Premium", "Precise", "Immersive", "Luminous", "Progressive"],

  emotional_goals: ["Awe", "Excitement", "Exclusivity", "Confidence", "Wonder"],

  archetype: "Magician",

  audience: [
    "Tech-forward early adopters",
    "Premium home theater enthusiasts",
    "AR / VR aficionados",
    "Design-obsessed power users",
    "Collectors of limited-edition media",
    "High-end gaming and media professionals",
  ],

  /* ==========================================================================
   * 3. BRAND STORY
   * ========================================================================== */

  story:
    "Somewhere between the last photon of sunlight passing through a crystal prism " +
    "and the first AR overlay lighting up your living room, the Holographic Future " +
    "was born. It emerged from labs where engineers bent light into shapes that " +
    "carry information, where designers realized that chrome and rainbow were not " +
    "opposites but collaborators. Phlix in this skin is not a media player — it is " +
    "a portal. Every title card shimmers with its own spectral signature. Every " +
    "interface layer floats at a precise depth. The act of pressing play feels like " +
    "stepping through a membrane between now and what comes next.",

  tagline_primary: "The Future, Now Playing.",

  tagline_secondary: [
    "Media at the speed of light.",
    "Every photon counts.",
    "Refract your reality.",
    "Stream beyond the spectrum.",
    "Where chrome meets cinema.",
  ],

  mission:
    "Deliver a media experience so visually precise and luminously beautiful that " +
    "every interaction feels like holding a piece of the future in your hands.",

  values: ["Precision", "Luminosity", "Innovation", "Immersion", "Excellence"],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES
   * ========================================================================== */

  brand_dna:
    "Holographic Future is prismatic chrome luxury made interactive. Every surface " +
    "refracts light into spectrum. Interfaces float in translucent layers of blue, " +
    "silver, and iridescent rainbow. It is never warm, never analog, never rough — " +
    "it is precision-machined, luminous, and in perpetual forward motion.",

  design_principles: [
    "Every surface should appear to refract or reflect light at least subtly.",
    "Translucency is structural — layers reveal depth, not flatness.",
    "Electric blue is the anchor; rainbow iridescence is the spectacle.",
    "Sharp geometry and razor-thin lines define edges, never soft blobs.",
    "Motion is fluid and continuous, never abrupt — like liquid mercury.",
    "White space is not empty; it is negative space carved from chrome.",
    "Every gradient must feel lit from within, not painted on top.",
    "Typography is ultra-thin and geometric, never heavy or humanist.",
  ],

  brand_opposites: [
    "Not warm or nostalgic",
    "Not earthy or organic",
    "Not cartoonish or playful-soft",
    "Not high-contrast flat design",
    "Not dark-without-glow (must always have luminous depth)",
    "Not matte or textured-rough",
    "Not pastel or desaturated",
    "Not corporate-grey monotone",
  ],

  signature_elements: [
    "Iridescent foil shimmer overlays",
    "Floating translucent AR panels",
    "Prismatic light-refraction rainbow trails",
    "Liquid chrome morphing borders",
    "Thin geometric wireframe grids",
    "Electric blue glowing accents",
    "Diffraction grating spectrum sweeps",
    "Pearlescent surface gradients",
  ],

  header_motif: "Prismatic light-dispersion animation — a beam entering a prism and fanning into spectrum",

  /* ==========================================================================
   * 5. VISUAL IDENTITY
   * ========================================================================== */

  visual_style: [
    "Holographic foil illustration",
    "Glassmorphism with spectral color",
    "Hard-edge geometric vector",
    "Iridescent gradient rendering",
    "Translucent layered composition",
  ],

  art_direction:
    "Artwork should feel like a physical holographic foil card examined under perfect " +
    "studio lighting — chrome white and silver as the base canvas, with iridescent " +
    "rainbow colour that shifts across the spectrum depending on viewing angle. " +
    "Compositions are precise and geometric: sharp angular forms, thin lines, and " +
    "floating translucent planes at multiple Z-depths. The light source always lives " +
    "inside or behind subjects, giving everything an inner luminosity. Electric blue " +
    "traces the edges of key UI elements and focal subjects like a neon etching on " +
    "glass. Backgrounds are near-white or very pale silver — dark UI surfaces use " +
    "deep midnight blue-black so the iridescence pops. Avoid organic brushwork, " +
    "paper textures, warm tones, or any surface that looks like it can be touched. " +
    "This world is polished, precise, and perpetually lit.",

  realism: "semi_realistic",

  rendering_style: ["vector", "cel shading", "holographic foil", "glassmorphism"],

  texture_level: "subtle",

  depth: "layered",

  lighting: {
    temperature: "cool",
    quality: "prismatic — light splits into spectrum at every refractive edge",
    shadows: "soft",
    contrast: "medium",
    notes: "Light originates from inside or behind surfaces. No warm incandescent tones. Shadows are deep cool blue-black, never brown or grey.",
  },

  composition: [
    "Asymmetric with deliberate negative space",
    "Layered depth — foreground glass panel over mid-depth subject over background grid",
    "Angular diagonal leads rather than centered symmetry",
    "Focal subjects are sharp; periphery dissolves into iridescent haze",
    "Thin geometric guide lines frame but never contain",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM
   * ========================================================================== */

  colors: {
    primary: {
      name: "Electric Blue",
      hex: "#0096FF",
      rgb: "rgb(0, 150, 255)",
      hsl: "hsl(208, 100%, 50%)",
      usage: "Primary CTAs, active states, key UI accents, glowing edge lines.",
      contrast_targets: ["chrome_white", "midnight"],
    },
    secondary: {
      name: "Prismatic Violet",
      hex: "#8B5CF6",
      rgb: "rgb(139, 92, 246)",
      hsl: "hsl(263, 90%, 66%)",
      usage: "Secondary actions, hover highlights, spectrum mid-point accents.",
      contrast_targets: ["chrome_white", "midnight"],
    },
    tertiary: {
      name: "Iridescent Cyan",
      hex: "#22D3EE",
      rgb: "rgb(34, 211, 238)",
      hsl: "hsl(189, 85%, 53%)",
      usage: "Tertiary highlights, tag chips, progress indicators, shimmer streaks.",
      contrast_targets: ["midnight"],
    },
    neutral: {
      name: "Platinum Silver",
      hex: "#C8D0DA",
      rgb: "rgb(200, 208, 218)",
      hsl: "hsl(214, 18%, 82%)",
      usage: "Muted UI chrome, dividers, secondary text on dark surfaces.",
      contrast_targets: ["midnight"],
    },
    background: {
      name: "Chrome White",
      hex: "#F0F4F8",
      rgb: "rgb(240, 244, 248)",
      hsl: "hsl(214, 29%, 96%)",
      usage: "Light-mode default page background — cool near-white with a hint of silver.",
      contrast_targets: ["midnight", "electric_blue"],
    },
    surface: {
      name: "Frosted Glass",
      hex: "#EAEFF6",
      rgb: "rgb(234, 239, 246)",
      hsl: "hsl(215, 35%, 94%)",
      usage: "Card and panel surfaces in light mode — translucent frosted look.",
      contrast_targets: ["midnight"],
    },
    surface_alt: {
      name: "Midnight Panel",
      hex: "#0D1117",
      rgb: "rgb(13, 17, 23)",
      hsl: "hsl(216, 28%, 7%)",
      usage: "Dark-mode default page background and deep card surfaces.",
      contrast_targets: ["chrome_white", "electric_blue"],
    },
    text: {
      name: "Chrome White",
      hex: "#F0F4F8",
      rgb: "rgb(240, 244, 248)",
      hsl: "hsl(214, 29%, 96%)",
      usage: "Primary body and headline text on dark surfaces.",
      contrast_targets: ["midnight_panel", "surface_alt"],
    },
    success: {
      name: "Aurora Green",
      hex: "#34D399",
      rgb: "rgb(52, 211, 153)",
      hsl: "hsl(160, 63%, 52%)",
      usage: "Success states, confirmations, 'added' indicators.",
      contrast_targets: ["midnight"],
    },
    warning: {
      name: "Solar Amber",
      hex: "#FBBF24",
      rgb: "rgb(251, 191, 36)",
      hsl: "hsl(43, 96%, 56%)",
      usage: "Warnings, caution badges, encode-in-progress states.",
      contrast_targets: ["midnight"],
    },
    error: {
      name: "Plasma Red",
      hex: "#F43F5E",
      rgb: "rgb(244, 63, 94)",
      hsl: "hsl(347, 89%, 60%)",
      usage: "Errors, destructive actions, failed playback states.",
      contrast_targets: ["midnight", "chrome_white"],
    },
    info: {
      name: "Photon Blue",
      hex: "#38BDF8",
      rgb: "rgb(56, 189, 248)",
      hsl: "hsl(199, 93%, 60%)",
      usage: "Informational banners, tooltips, system tips.",
      contrast_targets: ["midnight"],
    },
    focus: {
      name: "Spectrum Ring",
      hex: "#0096FF",
      rgb: "rgb(0, 150, 255)",
      hsl: "hsl(208, 100%, 50%)",
      usage: "Keyboard-focus ring — electric blue with a 2px midnight offset.",
      contrast_targets: ["chrome_white", "surface"],
    },
    border: {
      name: "Prism Edge",
      hex: "rgba(255, 255, 255, 0.18)",
      rgb: "rgba(255, 255, 255, 0.18)",
      hsl: "hsl(0, 0%, 100%)",
      usage: "Glass panel borders — semi-transparent white that catches light.",
      contrast_targets: ["midnight_panel"],
    },
    shadow: {
      name: "Deep Space",
      hex: "rgba(0, 0, 0, 0.6)",
      rgb: "rgba(0, 0, 0, 0.6)",
      hsl: "hsl(0, 0%, 0%)",
      usage: "Drop shadows — pure cool black, never warm-tinted.",
      contrast_targets: [],
    },
    overlay: {
      name: "Midnight Veil",
      hex: "#0D1117",
      rgb: "rgba(13, 17, 23, 0.85)",
      hsl: "hsl(216, 28%, 7%)",
      usage: "Modal/scrim overlays — deep midnight with electric blue glow bleed.",
      contrast_targets: [],
    },
    gradients: [
      {
        name: "Prismatic Spectrum",
        type: "linear",
        angle: "120deg",
        stops: ["#FF0080", "#FF8C00", "#FFE600", "#00FF88", "#0096FF", "#8B5CF6"],
        usage: "Hero iridescent sweeps, shimmer overlays, foil badge backgrounds.",
      },
      {
        name: "Chrome Aurora",
        type: "linear",
        angle: "135deg",
        stops: ["#C8D0DA", "#0096FF", "#8B5CF6"],
        usage: "Primary gradient used on hero CTAs, active card accents, and promo banners.",
      },
      {
        name: "Holographic Sheen",
        type: "linear",
        angle: "90deg",
        stops: ["rgba(255,255,255,0.0)", "rgba(255,255,255,0.25)", "rgba(255,255,255,0.0)"],
        usage: "Animate-able light-sweep overlay applied on top of surfaces to simulate foil sheen.",
      },
      {
        name: "Electric Radiance",
        type: "radial",
        angle: null,
        stops: ["rgba(0,150,255,0.45)", "rgba(0,150,255,0.0)"],
        usage: "Glowing halo behind hero subjects, active button glow states.",
      },
      {
        name: "Midnight Depth",
        type: "linear",
        angle: "180deg",
        stops: ["#0D1117", "#1A2233"],
        usage: "Dark-mode background gradient giving subtle depth to panels.",
      },
    ],
  },

  color_rules: [
    "Electric blue is the anchor accent; never omit it from a screen.",
    "Rainbow spectrum gradients are feature-level only — not on every element.",
    "Backgrounds on dark surfaces must be midnight blue-black, never pure black.",
    "Surfaces appear frosted/glassy — use semi-transparent backgrounds with blur.",
    "Shadows are cool and deep, never warm-brown or grey.",
    "Maximum three spectrum colors in any single visible region.",
    "Chrome white text on dark; midnight text on light — no medium-contrast pairings.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  fonts: {
    headline: {
      family: "Orbitron",
      weight: [300, 400, 700],
      fallbacks: ["Rajdhani", "Exo 2", "sans-serif"],
      usage: "Hero titles, section headers, display numerals. Ultra-modern geometric caps.",
      tracking: "0.08em",
      line_height: 1.05,
    },
    display: {
      family: "Space Grotesk",
      weight: [300, 700],
      fallbacks: ["Inter", "Rajdhani", "sans-serif"],
      usage: "Oversized display text, splash numbers, countdown timers.",
      tracking: "0.04em",
      line_height: 0.95,
    },
    body: {
      family: "Inter",
      weight: [300, 400, 500],
      fallbacks: ["Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
      usage: "Paragraphs, descriptions, long-form reading — light weight preferred.",
      tracking: "0.01em",
      line_height: 1.65,
    },
    ui: {
      family: "Space Grotesk",
      weight: [400, 500, 600],
      fallbacks: ["Inter", "system-ui", "sans-serif"],
      usage: "Buttons, labels, navigation, tags — clean geometric UI text.",
      tracking: "0.02em",
      line_height: 1.3,
    },
    mono: {
      family: "JetBrains Mono",
      weight: [300, 400],
      fallbacks: ["Fira Code", "Courier New", "monospace"],
      usage: "Code snippets, token readouts, system diagnostics, technical overlays.",
      tracking: "0em",
      line_height: 1.6,
    },
    number: {
      family: "Orbitron",
      weight: [700],
      fallbacks: ["Rajdhani", "sans-serif"],
      usage: "Stats, counters, runtimes, dashboard KPIs — maximum geometric impact.",
      tracking: "0.06em",
      line_height: 1.0,
    },
  },

  typography_rules: [
    "Orbitron headlines always in uppercase or title case — never sentence case.",
    "Body text uses Inter at weight 300 or 400; 700 is reserved for single-word emphasis.",
    "Avoid humanist or serif typefaces entirely.",
    "Headline letter-spacing should always be wider than body (minimum 0.04em).",
    "On dark backgrounds use 93–100% white text; never pure #FFFFFF on deep midnight (use chrome white).",
    "Line-height in headlines can compress below 1.0 for impact display use.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  shape_language: [
    "Sharp beveled rectangles",
    "Thin geometric wireframe polygons",
    "Pill containers for tags and badges",
    "Translucent rounded panels (glassmorphism)",
    "Angular chevrons and arrow motifs",
    "Hexagonal grid cells for data tiles",
    "Circular glowing rings (focus, active, loading)",
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
    notes: "Borders are razor-thin and luminous — semi-transparent white or electric blue. No hand-drawn quality; precision is paramount.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  icon_style: ["Outlined", "Thin stroke", "Geometric", "Duotone"],

  icon_rules: [
    "1–1.5px stroke weight for most icons; 2px maximum for featured/hero icons.",
    "Sharp-cornered geometric joins — not rounded caps.",
    "Electric blue as the primary icon tint on dark surfaces.",
    "Duotone only for featured spotlight icons: blue + iridescent shimmer fill.",
    "Never use filled/solid icons except for active/toggled states.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  illustration_style: [
    "Holographic foil poster art",
    "Technical AR/HUD diagram aesthetic",
    "Hard-edge geometric vector with iridescent gradient fills",
    "Glassmorphism layered panels",
    "Sci-fi UI concept art",
  ],

  character_style: {
    proportions: "Stylized and sleek — elongated, angular silhouettes, no exaggerated roundness.",
    eyes: "Precise, sharp, glowing — holographic light reflections in the iris.",
    expressions: "Focused, calm, visionary. Emotions conveyed through posture and eye luminosity.",
    clothing: "Minimal, structured — translucent panels, metallic surfaces, clean lines.",
    outlines: "No outlines — forms are defined entirely by light, shadow, and gradient edges.",
  },

  mascot: {
    name: "Lux",
    species: "Prismatic holographic AI companion",
    personality: "Calm, precise, infinitely knowledgeable — a navigator between dimensions.",
    description:
      "A slender geometric humanoid figure assembled from interlocking prismatic shards, " +
      "each facet reflecting a different color of the visible spectrum. Lux has no " +
      "fixed color — they shift from silver to electric blue to full rainbow depending " +
      "on the context and emotional state of the interaction.",
    poses: ["Pointing at a floating holographic panel", "Arms extended, spectrum radiating outward", "Kneeling to inspect a data crystal", "Standing with one shard-hand raised, projecting a beam"],
    expressions: ["Luminous calm", "Electric curiosity", "Spectral wonder", "Focused analysis"],
  },

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  photography_style: [
    "Long-exposure light painting with prismatic color trails",
    "Macro diffraction grating rainbow reflections",
    "Cool blue studio lighting with specular chrome highlights",
    "Double-exposure holographic overlays on architectural subjects",
  ],

  photo_rules: [
    "Always cool or neutral color temperature — no warm tones.",
    "High specular highlight detail; chrome and glass surfaces encouraged.",
    "Color grade should shift toward electric blue and cyan in shadows.",
    "Rainbow light leaks or prism flares are permitted as intentional brand elements.",
    "People, if present, should appear illuminated by holographic light — otherworldly, not casual.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  motion_style: ["Fluid", "Precise", "Spectral", "Weightless", "Luminous"],

  transitions: [
    "Holographic dissolve — surfaces fade through iridescent interference patterns",
    "Chromatic aberration slide — RGB channels offset briefly on entry",
    "Prism wipe — a spectrum sweep reveals new content",
    "Glass shatter — panels fragment outward then reform (exit only)",
    "Specular fade — elements fade while gaining a chrome sheen",
  ],

  animation_speed: "medium",

  easing: ["cubic-bezier(0.16, 1, 0.3, 1)", "ease-out", "linear"],

  microinteractions: {
    hover: "Cards gain a holographic sheen sweep (animated shimmer gradient) + 1px electric blue border glow.",
    button_press: "Brief chromatic aberration offset (3px) then snaps clean — 120ms.",
    loading: "Rotating prismatic ring — a circle of spectrum color orbiting a silver center dot.",
    drag: "Element gains a semi-transparent holographic ghost trail showing drag path.",
    focus: "Electric blue ring pulses once at 100% opacity then settles to 60%.",
    success: "Aurora green particle burst shaped like light rays from a prism.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  ui_style: [
    "Glassmorphism with iridescent tint",
    "Dark midnight base surfaces",
    "Electric blue primary accent",
    "Ultra-thin geometric typography",
    "Layered translucent panels at multiple depths",
    "Prismatic shimmer on interactive elements",
  ],

  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],

  shadows: {
    sm: "0 1px 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(0, 150, 255, 0.1)",
    md: "0 4px 16px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 150, 255, 0.15)",
    lg: "0 12px 40px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 150, 255, 0.2)",
    glow: "0 0 32px rgba(0, 150, 255, 0.6)",
    notes: "All shadows are cool-black. Electric-blue glow is added as a secondary shadow layer on featured elements.",
  },

  cards: {
    elevation: "md",
    padding: "24px",
    border_radius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    background: "rgba(255, 255, 255, 0.06)",
    notes: "Glassmorphism: semi-transparent background + backdrop-filter blur (16–24px) + subtle white border. On hover, border transitions to 1px electric blue.",
  },

  buttons: {
    primary:   { bg: "linear-gradient(135deg, #0096FF, #8B5CF6)", text: "#F0F4F8", radius: "8px", notes: "Chrome Aurora gradient, geometric radius. Glow shadow on hover." },
    secondary: { bg: "rgba(255, 255, 255, 0.08)", text: "#F0F4F8", radius: "8px", notes: "Glass button — subtle fill, white border 1px, no gradient." },
    danger:    { bg: "#F43F5E", text: "#F0F4F8", radius: "8px", notes: "Plasma red, sharp corners. Used only for destructive actions." },
    ghost:     { bg: "transparent", text: "#0096FF", radius: "8px", notes: "1px electric-blue border, no fill. Glows on hover." },
    link:      { bg: "transparent", text: "#22D3EE", radius: "0", notes: "Iridescent cyan, underline with gradient on hover." },
    icon:      { bg: "rgba(255, 255, 255, 0.06)", text: "#F0F4F8", radius: "8px", notes: "Glass icon button, electric blue on active." },
    fab:       { bg: "linear-gradient(135deg, #0096FF, #22D3EE)", text: "#0D1117", radius: "16px", notes: "Floating action — Chrome Aurora gradient, strong glow shadow." },
  },

  forms: {
    inputs: "Midnight-dark fill (rgba(255,255,255,0.06)), 1px semi-transparent white border, 8px radius, 14px padding. Focus: electric-blue border + outer glow.",
    checkboxes: "Geometric square, 1px white border, electric-blue fill when checked, no spring bounce.",
    switches: "Pill track (midnight fill), circular chrome knob; active = Chrome Aurora gradient track.",
    dropdowns: "Glassmorphism panel — midnight dark with backdrop blur, 1px border, Electric Blue scroll accent.",
    validation: "Inline below field; error = Plasma Red with a brief chromatic-aberration flash; success = Aurora Green with a photon-pulse icon.",
  },

  tables: {
    headers: "Orbitron uppercase, 700 weight on midnight panel row with 1px bottom electric-blue separator.",
    hover: "Row gains a full-width holographic shimmer sweep gradient overlay.",
    sorting: "Angular chevron in Electric Blue.",
    striping: "Alternating rows: midnight base vs rgba(0,150,255,0.04) blue-tinted alternate.",
  },

  navigation: {
    sidebar: "Deep midnight panel, 1px right border in rgba(255,255,255,0.08). Active item: electric-blue left-side bar + rgba glass fill.",
    topbar: "Frosted glass bar — backdrop-filter blur, Chrome Aurora gradient underline on active section.",
    tabs: "Sharp geometric underline tabs; active tab has electric-blue 2px bottom bar + glow.",
    breadcrumbs: "Space Grotesk small caps, separated by a right-pointing angular chevron in silver.",
  },

  dashboard_style:
    "Layered midnight glassmorphism panels on a deep space background with subtle star-field texture. " +
    "Orbitron numerals in electric blue for KPIs. Thin holographic data visualization lines. " +
    "No warm tones; every stat card has a distinct spectrum-accent top border. Precise, never cluttered.",

  component_styles: {
    dialog: "Centered glassmorphism card with prismatic glow rim, midnight-veil scrim, animated prism wipe entry.",
    sidebar: "See navigation.sidebar; collapses to 48px icon rail with electric-blue active dot indicator.",
    carousel: "Poster rail with holographic shimmer on scroll; edge cards refract into iridescent fade.",
    search_bar: "Full-width glass input with a spectrum-scanning animation in the placeholder; electric-blue underline focus.",
    media_player: "Full-coverage dark control bar with glassmorphism; scrubber is Chrome Aurora gradient with photon-blue thumb glow.",
    toast: "Glass pill notification sliding in from top-right; left-accent matches notification type color.",
    chip: "Sharp pill chip on midnight surface, 1px iridescent-white border, electric-blue text.",
  },

  layout_patterns: {
    dashboard: "Full-width KPI ribbon → 3-up glassmorphism stat cards → activity feed panel → spotlight media rail.",
    settings: "Left section nav with electric-blue active indicator + right glass form panels, max 800px content area.",
    media_library: "Sticky holographic filter bar → responsive poster grid with shimmer-on-hover (auto-fill minmax 180px).",
    authentication: "Centered glassmorphism card on deep midnight background with animated prismatic light rays.",
    landing: "Full-viewport hero with animated spectrum sweep → feature tiles in glassmorphism → social proof → Chrome Aurora CTA.",
    detail_view: "Full-bleed dark backdrop + iridescent vignette → floating glass poster + metadata panel → episode/related rails.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY
   * ========================================================================== */

  poster_style:
    "Holographic foil concept art: sharp geometric key art on midnight, electric-blue " +
    "title in Orbitron, iridescent rainbow border stripe, 16px radius, glass-specular sheen.",

  thumbnail_style:
    "16px radius, 1px glass border (rgba white), cool blue color grade, Orbitron title " +
    "overlay with electric-blue glow on a translucent dark scrim.",

  backdrop_style:
    "Wide cinematic still, cool blue-silver color grade, dark vignette with electric-blue " +
    "rim glow, optional prismatic light streak from one edge.",

  media_cards:
    "Poster on top with shimmer-on-hover; title + year in Space Grotesk below on midnight surface; " +
    "hover reveals a glass play button with Chrome Aurora gradient icon and a full-card holographic " +
    "sheen sweep animation.",

  badges: {
    labels: ["4K", "HDR10+", "Dolby Vision", "Atmos", "Continue Watching", "New", "Prismatic Pick"],
    shape: "Sharp-cornered pill, 1px iridescent white border.",
    colors: "Electric Blue for quality (4K/HDR); Prismatic Violet for status (New); Aurora Green for Continue Watching; Chrome Aurora gradient for Prismatic Pick.",
    typography: "Space Grotesk, 600 weight, all caps, 11px.",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  voice: ["Visionary", "Precise", "Luminous", "Calm authority", "Forward-looking"],

  tone: ["Confident", "Inspiring", "Sleek", "Intelligent", "Understated-premium"],

  writing_style:
    "Clean, short, declarative. Active voice always. No contractions in formal contexts. " +
    "Minimal punctuation — let the words carry weight on their own. Occasional references " +
    "to light, spectrum, refraction, and dimension. Never hype-y or exclamation-heavy. " +
    "Reads like technical poetry or a product engineer who moonlights as a designer.",

  vocabulary: ["spectrum", "prismatic", "refract", "luminous", "photon", "dimension", "calibrate", "render", "depth", "wavelength", "holographic", "interface", "precise"],

  avoid_words: ["awesome", "amazing", "leverage", "synergy", "magic", "cozy", "warm", "nostalgic", "simple", "easy"],

  greetings: [
    "Signal acquired.",
    "Welcome back to the spectrum.",
    "Your dimension is ready.",
    "Calibrated for you.",
  ],

  empty_state_messages: [
    "Nothing refracting here yet — add media to illuminate this space.",
    "The spectrum is dark. Scan a library to begin.",
    "No signal in this band. Add a source to light it up.",
    "This panel awaits its first photon.",
  ],

  notification_style: "Precise and minimal — one declarative sentence, no emojis, no exclamation marks. Information density over warmth.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE
   * ========================================================================== */

  image_prompt_prefix:
    "Holographic prismatic chrome aesthetic, iridescent foil surfaces refracting rainbow " +
    "spectrum light, electric blue accents, midnight deep background, glassmorphism layered panels, " +
    "ultra-precise geometric forms, cool studio lighting with inner luminosity,",

  image_prompt_suffix:
    ", premium tech-luxury quality, deep midnight and chrome white palette, electric blue glow " +
    "accents, sharp clean edges, no warm tones, no paper texture, hyper-precise.",

  negative_prompt: [
    "warm colors", "orange tones", "brown", "paper texture", "hand-drawn", "watercolor",
    "retro", "nostalgic", "cartoon", "soft blur", "bokeh overload", "HDR glow halo",
    "lens flare (unintentional)", "dark horror", "heavy grain", "earthy", "rustic",
  ],

  ui_generation_rules: [
    "Midnight dark surfaces (not pure black); chrome white text.",
    "Glass cards — semi-transparent fill + backdrop-blur + 1px rgba white border.",
    "Primary CTA uses Chrome Aurora gradient.",
    "Electric blue is the mandatory anchor accent on every screen.",
    "Orbitron headlines, Space Grotesk / Inter body.",
    "Max content width 1440px with generous side margins.",
    "Spacing from the 4px-base scale; minimum 16px inner padding on cards.",
  ],

  logo_rules: {
    shape: "Wordmark in Orbitron, optionally inscribed in a sharp hexagonal or diamond badge.",
    complexity: "Minimal — the word 'Phlix' alone carries the brand; no icon required.",
    negative_space: "Generous; the logo should breathe in empty space.",
    colors: "Chrome white on midnight, or Chrome Aurora gradient on midnight.",
    allowed_symbols: ["prism", "diffraction grating stripe", "thin geometric diamond", "spectral sweep"],
    forbidden_symbols: ["popcorn", "film reel", "warm circles", "rounded organic blobs", "stars (cliché)"],
  },

  illustration_prompt_template:
    "{prefix} {subject}, in the Holographic Future style, {mood}, set against a midnight " +
    "deep-space background with prismatic light diffraction {suffix}",

  page_generation_rules: [
    "Hero sections anchor on a full-viewport animated spectrum sweep or holographic product reveal.",
    "All cards and panels use glassmorphism with backdrop-filter: blur.",
    "Primary CTAs always use the Chrome Aurora gradient.",
    "Maximum three spectral accent colors visible in any one region.",
    "Grid spacing strictly from the 4px scale — no arbitrary margins.",
    "Dark mode is the canonical rendering; light mode is an accessible variant.",
  ],

  prompt_library: {
    logo:
      "Design a Holographic Future Phlix logo: Orbitron wordmark in chrome white on midnight, " +
      "optional thin hexagonal badge border in electric blue, minimal, zero organic curves.",
    illustration:
      "{image_prompt_prefix} {subject} {image_prompt_suffix}",
    icon:
      "Thin geometric outlined icon of {subject}, 1.5px stroke, electric blue, sharp corners, " +
      "no fills except active state, holographic tech aesthetic.",
    background:
      "Deep midnight background with ultra-subtle prismatic light refraction at the edges, " +
      "a faint geometric wireframe grid at 4% opacity, no warm tones.",
    landing_page:
      "A holographic tech-luxury landing page: full-viewport dark hero with animated spectrum " +
      "sweep, glassmorphism feature tiles, Chrome Aurora CTA, Orbitron headlines, precise spacing.",
    dashboard:
      "A precision media dashboard on midnight glass panels: Orbitron KPI numerals in electric " +
      "blue, holographic data lines, no warm tones, translucent layered depth.",
    marketing:
      "A prismatic holographic social graphic for {topic}: Orbitron headline in chrome white, " +
      "iridescent foil gradient background, electric-blue accent bar, premium tech-luxury aesthetic.",
  },

  /* ==========================================================================
   * 17. DESIGN TOKENS
   * ========================================================================== */

  design_tokens: {
    color: {
      "--color-primary": "#0096FF",
      "--color-secondary": "#8B5CF6",
      "--color-tertiary": "#22D3EE",
      "--color-bg": "#0D1117",
      "--color-bg-light": "#F0F4F8",
      "--color-surface": "rgba(255, 255, 255, 0.06)",
      "--color-surface-alt": "rgba(0, 150, 255, 0.04)",
      "--color-text": "#F0F4F8",
      "--color-text-muted": "#C8D0DA",
      "--color-success": "#34D399",
      "--color-warning": "#FBBF24",
      "--color-error": "#F43F5E",
      "--color-info": "#38BDF8",
      "--color-border": "rgba(255, 255, 255, 0.12)",
      "--color-glow": "rgba(0, 150, 255, 0.45)",
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
      "--radius-sm": "4px",
      "--radius-md": "8px",
      "--radius-lg": "16px",
      "--radius-xl": "24px",
      "--radius-pill": "999px",
    },
    typography: {
      "--font-headline": "'Orbitron', 'Rajdhani', sans-serif",
      "--font-display": "'Space Grotesk', 'Inter', sans-serif",
      "--font-body": "'Inter', 'Segoe UI', sans-serif",
      "--font-ui": "'Space Grotesk', 'Inter', sans-serif",
      "--font-mono": "'JetBrains Mono', 'Fira Code', monospace",
    },
    shadow: {
      "--shadow-sm": "0 1px 4px rgba(0,0,0,0.5), 0 0 8px rgba(0,150,255,0.1)",
      "--shadow-md": "0 4px 16px rgba(0,0,0,0.6), 0 0 20px rgba(0,150,255,0.15)",
      "--shadow-lg": "0 12px 40px rgba(0,0,0,0.7), 0 0 40px rgba(0,150,255,0.2)",
      "--shadow-glow": "0 0 32px rgba(0,150,255,0.6)",
    },
    blur: {
      "--blur-glass": "blur(16px)",
      "--blur-glass-heavy": "blur(24px)",
      "--blur-subtle": "blur(8px)",
    },
    gradient: {
      "--gradient-primary": "linear-gradient(135deg, #0096FF, #8B5CF6)",
      "--gradient-spectrum": "linear-gradient(120deg, #FF0080, #FF8C00, #FFE600, #00FF88, #0096FF, #8B5CF6)",
      "--gradient-sheen": "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.25), rgba(255,255,255,0))",
      "--gradient-depth": "linear-gradient(180deg, #0D1117, #1A2233)",
    },
  },

  /* ==========================================================================
   * 18. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  responsive_behavior: {
    desktop: "Multi-column glassmorphism rails, hover shimmer affordances, max 1440px content. Sidebar fixed at 240px.",
    tablet: "2–3 column poster grids, larger touch targets (min 48px), collapsible to icon-only sidebar, reduced backdrop-blur for performance.",
    tv: "10-foot UI: Orbitron headlines at 64px+, bold electric-blue focus rings (4px glow), directional nav optimized, no hover-dependent interactions.",
    mobile: "Single column, bottom glassmorphism tab bar, full-width posters, sticky gradient play bar at bottom.",
  },

  /* ==========================================================================
   * 19. SOUND IDENTITY
   * ========================================================================== */

  sound_identity: {
    startup_chime: "A crystalline resonant tone — like a pure sine wave through glass — that sweeps from low to high across ~600ms, resolving on a minor-seventh chord.",
    notification: "A short, precise two-tone chime: high note then slightly lower note, 80ms gap. Clean, no reverb tail.",
    ui_click: "Ultra-brief high-frequency tap — like a laser pointer briefly touching metal, 20ms.",
    success: "Three ascending sine tones with a slight prismatic reverb tail — clean, not celebratory.",
    error: "A descending two-tone buzz — precise and firm but not alarming. No harsh distortion.",
  },

  /* ==========================================================================
   * 20. SEASONAL VARIANTS
   * ========================================================================== */

  seasonal_variants: [
    {
      name: "Aurora Solstice",
      active_range: "12-15..01-05",
      overrides: {
        "--color-primary": "#00E5FF",
        "--gradient-primary": "linear-gradient(135deg, #00E5FF, #00FF88)",
        "--gradient-spectrum": "linear-gradient(120deg, #00E5FF, #00FF88, #8B5CF6, #FF0080)",
      },
      motif: "Green and teal aurora borealis ribbons replace the standard prismatic spectrum; snowflake crystal wireframes scatter at low opacity across glass panels.",
    },
    {
      name: "Solar Maximum",
      active_range: "06-21..07-04",
      overrides: {
        "--color-primary": "#FF6B35",
        "--gradient-primary": "linear-gradient(135deg, #FF6B35, #FBBF24)",
        "--color-bg": "#080C10",
      },
      motif: "Solar corona spectrum — orange and amber replace electric blue in accents; a radial sun-corona wireframe motif appears in hero sections.",
    },
    {
      name: "Void Protocol",
      active_range: "10-27..11-01",
      overrides: {
        "--color-primary": "#BF00FF",
        "--gradient-primary": "linear-gradient(135deg, #BF00FF, #FF0080)",
        "--color-bg": "#040408",
      },
      motif: "Ultra-violet and magenta replace electric blue; the geometric grid is denser and slightly glitched; a subtle scanline overlay is added to glass surfaces.",
    },
  ],

  /* ==========================================================================
   * 21. ACCESSIBILITY
   * ========================================================================== */

  accessibility: {
    minimum_contrast: "WCAG AA (4.5:1 body text on dark surfaces, 3:1 large headlines/UI elements). Chrome white (#F0F4F8) on midnight (#0D1117) achieves ~14:1.",
    focus_style: "4px electric-blue glow ring (box-shadow: 0 0 0 2px #0D1117, 0 0 0 4px #0096FF); always visible, never hidden by overflow.",
    touch_target: "Minimum 48x48px on mobile and TV; 44x44px on desktop.",
    motion_reduction: "Honor prefers-reduced-motion: remove shimmer sweeps, spectrum animations, and chromatic-aberration effects; replace with simple opacity fades.",
    font_scaling: "All layouts must survive 200% text zoom; glassmorphism containers reflow rather than clip. Orbitron at display sizes must never drop below 14px computed.",
    color_only: "Never convey information by color alone — all states pair color with an icon, label, or pattern.",
  },

  /* ==========================================================================
   * 22. DO / DON'T
   * ========================================================================== */

  do_dont: {
    colors: {
      do: [
        "Keep midnight or deep cool-dark as the base surface",
        "Use electric blue as the mandatory anchor accent on every screen",
        "Apply prismatic spectrum gradients sparingly for maximum impact",
      ],
      dont: [
        "Use warm, orange, or brown tones",
        "Use pure #000000 black — use midnight blue-black instead",
        "Apply the full spectrum gradient to more than one element per screen",
      ],
      reason: "The holographic identity lives in precise cool luminosity. Warm tones break the spell instantly.",
    },
    typography: {
      do: [
        "Use Orbitron in uppercase or title case for all display text",
        "Keep body text at Inter 300–400 weight on dark surfaces",
        "Use generous letter-spacing (0.04em+) on headlines",
      ],
      dont: [
        "Mix humanist or serif typefaces",
        "Use Orbitron at body/paragraph size",
        "Use thin hairline weights below 300 for body reading",
      ],
      reason: "The geometric ultra-modern typefaces define the aesthetic as sharply as the color palette.",
    },
    layout: {
      do: [
        "Apply glassmorphism (backdrop-blur + semi-transparent fill + white border) to all cards",
        "Layer panels at multiple perceived Z-depths",
        "Maintain generous whitespace — the darkness is part of the design",
      ],
      dont: [
        "Use opaque solid-fill cards with no translucency",
        "Crowd the layout with dense information",
        "Exceed 1440px content width",
      ],
      reason: "Depth and translucency are the structural vocabulary — without them it reads as generic dark UI.",
    },
    animation: {
      do: [
        "Animate shimmer sweeps with a linear-gradient moving across surfaces",
        "Use cubic-bezier(0.16, 1, 0.3, 1) for enter transitions — fast start, smooth settle",
        "Respect prefers-reduced-motion by disabling shimmer and spectrum effects",
      ],
      dont: [
        "Use spring/bounce easing — this is precision, not playfulness",
        "Stack more than two animations on a single element simultaneously",
        "Run shimmer animations on every element at once — stagger them",
      ],
      reason: "Motion should feel like a precision instrument, not a toy.",
    },
    imagery: {
      do: [
        "Use cool blue-silver color grades on all photography",
        "Incorporate prismatic rainbow light leaks as intentional brand elements",
        "Use glassmorphism overlays on top of photographic content",
      ],
      dont: [
        "Use warm golden-hour photography",
        "Use heavy grain textures",
        "Use unintentional lens flare (intentional prism flares are permitted)",
      ],
      reason: "Photography must coexist with the holographic UI — warm tones fight the palette.",
    },
    branding: {
      do: [
        "Keep the Orbitron wordmark clean and unadorned",
        "Use chrome white or Chrome Aurora gradient on the logo",
        "Apply prismatic border accents to the logo lockup in premium contexts",
      ],
      dont: [
        "Round the logo badge corners heavily",
        "Use the full spectrum rainbow gradient as the wordmark fill (too busy)",
        "Place the logo on any warm-toned background",
      ],
      reason: "The logo must read as precision engineering, not decoration.",
    },
    icons: {
      do: [
        "Use 1–1.5px thin geometric outlined icons",
        "Tint icons electric blue on dark surfaces",
        "Use duotone (blue + iridescent fill) only for hero / featured icons",
      ],
      dont: [
        "Use thick 3px+ stroke icons",
        "Use filled/solid icons in default (resting) states",
        "Round all corners — sharp joins are intentional here",
      ],
      reason: "Thin geometric icons match the precision line-work of the brand's visual world.",
    },
    copywriting: {
      do: [
        "Be declarative and precise — one strong sentence beats three weak ones",
        "Use light vocabulary: spectrum, refract, dimension, calibrate",
        "Write as if the product is already the future — present tense confidence",
      ],
      dont: [
        "Use exclamation marks or hype language",
        "Use warm or nostalgic vocabulary (cozy, warm, home, familiar)",
        "Over-explain — precision readers prefer brevity",
      ],
      reason: "The voice is the written equivalent of the visual: controlled, luminous, forward.",
    },
    ux: {
      do: [
        "Reveal the primary action immediately — no hunting",
        "Use the shimmer-sweep hover to signal interactivity before click",
        "Give every destructive action a glass confirmation panel",
      ],
      dont: [
        "Add decorative animations that delay reaching the primary action",
        "Use modal dialogs for non-critical information",
        "Rely on color alone to indicate state changes",
      ],
      reason: "Premium UX is about removing friction, not adding spectacle at the cost of clarity.",
    },
    performance: {
      do: [
        "Lazy-load poster images and backdrop stills",
        "Use CSS backdrop-filter where hardware-accelerated; fall back to a solid surface",
        "Throttle shimmer animations using IntersectionObserver",
      ],
      dont: [
        "Apply backdrop-filter blur to deeply nested elements (stacking context cost)",
        "Ship uncompressed AVIF/WebP poster images",
        "Run spectrum gradient animations at 60fps on low-power mode",
      ],
      reason: "The holographic aesthetic is visual-intensive; performance stewardship keeps it premium rather than punishing.",
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
    notes: "Base/parent kit for the Holographic Future identity. Author variations against this via base_kit.slug: 'holographic-future'. Dark mode is the canonical rendering; light mode support is via bg/surface-light tokens.",
  },
};

// Export (ESM). Consumers:
//   import baseKit from './holographic-future.js'
//   import { brandKit } from './holographic-future.js'
// CommonJS consumers on Node 22+ can use:  const baseKit = require('./holographic-future.js').default
export default brandKit;
export { brandKit };
