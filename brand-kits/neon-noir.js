/**
 * ============================================================================
 *  PHLIX BRAND KIT  —  Neon Noir   (BASE kit)
 *  neon-noir.js
 * ============================================================================
 *
 *  Dark film noir aesthetics fused with neon city lights — rain-slicked
 *  streets, moody shadows, electric pink/cyan/yellow neon signs, 1940s
 *  detective fiction meets modern city night. Cinematic, mysterious,
 *  sophisticated, urban.
 *
 *  Usage:
 *      import brandKit from './brand-kits/neon-noir.js'
 *      import { brandKit } from './brand-kits/neon-noir.js'
 * ============================================================================
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY
   * ========================================================================== */

  name: "Neon Noir",

  slug: "neon-noir",

  version: "1.0",

  description:
    "Neon Noir is the electric romance of rain-soaked city streets at 2 a.m. — " +
    "deep shadows cut by razor-thin neon light, the hum of a detective's typewriter " +
    "beneath the glow of a pink marquee. It pairs 1940s noir atmosphere with the " +
    "electric palette of a modern city night to make watching feel like stepping " +
    "into a cinematic underworld.",

  inspiration: [
    "1940s film noir detective films",
    "Rain-slicked city streets at night",
    "Neon signs reflected in wet asphalt",
    "Mid-century pulp fiction cover art",
    "Neo-noir films (Blade Runner, Drive, Sin City)",
    "Jazz clubs and smoky lounges",
    "Venetian blind shadow patterns",
    "Art deco architecture at night",
    "Neon-lit Tokyo back alleys",
    "Hard-boiled detective novels",
  ],

  keywords: [
    "noir", "neon", "dark", "cinematic", "mysterious", "urban", "electric",
    "cyan", "magenta", "amber", "shadow", "rain", "city", "night", "moody",
    "sophisticated", "stylish", "detective", "pulp", "deco", "glitch",
    "silhouette", "smoke", "jazz", "velvet", "chrome", "wet-street",
    "contrast", "dramatic", "atmospheric", "glow", "halation", "low-key",
    "venetian-blind", "fedora", "alley", "typewriter", "underworld",
    "midnight", "streetlamp", "flicker", "voltage", "electric-pink",
    "neon-cyan", "neon-amber", "ink-black", "deep-navy", "steel",
    "expressionist", "high-contrast", "tension", "intrigue", "glamour",
  ],

  /* ==========================================================================
   * 2. PERSONALITY
   * ========================================================================== */

  personality: ["Mysterious", "Sophisticated", "Cinematic", "Bold", "Atmospheric", "Intriguing"],

  emotional_goals: ["Intrigue", "Immersion", "Excitement", "Awe", "Tension"],

  archetype: "Outlaw",

  audience: [
    "Film enthusiasts and cinephiles",
    "Noir and thriller fans",
    "Design-savvy streamers",
    "Urban night owls",
    "Collectors of cult and classic cinema",
    "Adults 25–45 who value aesthetic depth",
  ],

  /* ==========================================================================
   * 3. BRAND STORY
   * ========================================================================== */

  story:
    "Every great city has a side that only comes alive after dark. Down rain-slicked " +
    "alleys and beneath flickering neon signs, stories unfold that the daylight would " +
    "rather forget. Neon Noir was born in that half-light — the electric glow on wet " +
    "pavement, a saxophone drifting from an open window, a silhouette pausing under a " +
    "pink marquee. Phlix built Neon Noir for the viewer who wants more than content: " +
    "they want atmosphere. Every interface, every card, every transition is a scene " +
    "from a film that hasn't been made yet — taut, cinematic, unforgettable.",

  tagline_primary: "Every Frame, a Mystery.",

  tagline_secondary: [
    "The city never sleeps. Neither do you.",
    "Press play. Enter the night.",
    "Cinema lives in the dark.",
    "See the shadows. Find the story.",
  ],

  mission:
    "Transform watching into an experience — giving every film and series the " +
    "atmospheric weight it deserves.",

  values: ["Atmosphere", "Craft", "Immersion", "Authenticity", "Restraint"],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES
   * ========================================================================== */

  brand_dna:
    "Neon Noir is the intersection of 1940s shadow and electric city light. " +
    "It is ink-black backgrounds sliced by neon cyan, magenta, and amber — " +
    "every element serves mood before decoration. It is never pastoral, " +
    "never warm, never bright-cheerful.",

  design_principles: [
    "Darkness is canvas, not absence — use it deliberately.",
    "Neon glows draw the eye; never waste them on the trivial.",
    "Every composition should imply a story happening just off-screen.",
    "Typography is architectural — it defines the scene.",
    "Reserve warm amber for the most critical actions; cyan and magenta support.",
    "Shadows are hard and directional, like venetian-blind light.",
    "Restraint over excess — two glowing accents beat five.",
    "Motion should feel like a camera move, not a widget bounce.",
  ],

  brand_opposites: [
    "Not warm or cozy",
    "Not pastel or soft",
    "Not playful or cartoonish",
    "Not corporate clean",
    "Not bright daylight aesthetics",
    "Not cheerful or family-friendly",
    "Not flat and colorless",
  ],

  signature_elements: [
    "Venetian-blind shadow bars across surfaces",
    "Rain-drop texture on dark backgrounds",
    "Neon sign halos and bleed glows",
    "Hard-edged silhouettes against neon",
    "Cigarette-smoke wisps in illustration",
    "Art deco geometric grid lines",
    "Typewriter-style monospace accents",
  ],

  header_motif: "Slow-scan neon flicker animation on the hero wordmark",

  /* ==========================================================================
   * 5. VISUAL IDENTITY
   * ========================================================================== */

  visual_style: [
    "Neo-noir cinematic",
    "High contrast dark",
    "Neon glow halation",
    "Hard shadow expressionism",
    "Art deco geometry",
  ],

  art_direction:
    "Artwork should feel like a one-sheet for a neo-noir thriller: near-total darkness " +
    "broken by vivid neon cyan, magenta, and amber. Compositions are dramatically " +
    "asymmetric — a lone figure under a buzzing street sign, venetian-blind shadows " +
    "slicing across a face, reflections shimmering in rain-pooled asphalt. Lighting is " +
    "low-key with extreme contrast: hard-edged shadows, single-source neon practicals, " +
    "and thin halos of colored light bleeding at every edge. Illustration line work is " +
    "confident and angular, ink-black, with neon spot color applied in flat planes. " +
    "Avoid any warm, golden, or sunrise imagery. The world exists entirely at night.",

  realism: "semi_realistic",

  rendering_style: ["comic", "linocut", "vector", "cel shading"],

  texture_level: "medium",

  depth: "layered",

  lighting: {
    temperature: "cool",
    quality: "neon practical — harsh point sources of cyan, magenta, and amber",
    shadows: "hard",
    contrast: "high",
    notes:
      "All light sources are neon practicals at night. No fill light — shadows fall " +
      "completely black. Colored light should bleed and halate at edges. Never warm, " +
      "golden, or diffuse.",
  },

  composition: [
    "Asymmetric and tension-filled",
    "Dutch angles for disorientation",
    "Single neon-lit figure against deep black",
    "Foreground silhouette framing mid-ground subject",
    "Strong diagonal shadow lines",
    "Negative space held in pure black",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM
   * ========================================================================== */

  colors: {
    primary: {
      name: "Neon Amber",
      hex: "#F5A623",
      rgb: "rgb(245, 166, 35)",
      hsl: "hsl(37, 91%, 55%)",
      usage: "Primary CTAs, active states, the single most important glow accent.",
      contrast_targets: ["void_black", "deep_navy"],
    },
    secondary: {
      name: "Electric Cyan",
      hex: "#00E5FF",
      rgb: "rgb(0, 229, 255)",
      hsl: "hsl(187, 100%, 50%)",
      usage: "Secondary actions, links, highlights, neon sign details.",
      contrast_targets: ["void_black", "deep_navy"],
    },
    tertiary: {
      name: "Neon Magenta",
      hex: "#FF2D78",
      rgb: "rgb(255, 45, 120)",
      hsl: "hsl(338, 100%, 59%)",
      usage: "Badges, ratings, emphasis accents, emotional highlights.",
      contrast_targets: ["void_black", "deep_navy"],
    },
    neutral: {
      name: "Steel Mist",
      hex: "#7A8FA6",
      rgb: "rgb(122, 143, 166)",
      hsl: "hsl(210, 20%, 56%)",
      usage: "Muted UI chrome, dividers, secondary text on dark surfaces.",
      contrast_targets: ["void_black"],
    },
    background: {
      name: "Void Black",
      hex: "#0A0C10",
      rgb: "rgb(10, 12, 16)",
      hsl: "hsl(225, 23%, 5%)",
      usage: "Default page background. Always near-black, never pure #000000.",
      contrast_targets: ["neon_amber", "electric_cyan", "neon_magenta"],
    },
    surface: {
      name: "Deep Navy",
      hex: "#111827",
      rgb: "rgb(17, 24, 39)",
      hsl: "hsl(222, 39%, 11%)",
      usage: "Card and panel surfaces, one visible step above background.",
      contrast_targets: ["electric_cyan", "neon_amber"],
    },
    surface_alt: {
      name: "Charcoal Slate",
      hex: "#1C2333",
      rgb: "rgb(28, 35, 51)",
      hsl: "hsl(224, 29%, 15%)",
      usage: "Alternate surface for striped rows, nested panels, hover states.",
      contrast_targets: ["electric_cyan"],
    },
    text: {
      name: "Ghost White",
      hex: "#E8EDF5",
      rgb: "rgb(232, 237, 245)",
      hsl: "hsl(220, 33%, 93%)",
      usage: "Primary body and headline text on dark backgrounds.",
      contrast_targets: ["void_black", "deep_navy"],
    },
    success: {
      name: "Cyan Spark",
      hex: "#00C9A7",
      rgb: "rgb(0, 201, 167)",
      hsl: "hsl(170, 100%, 39%)",
      usage: "Success toasts, confirmations, completed states.",
      contrast_targets: ["void_black"],
    },
    warning: {
      name: "Flicker Amber",
      hex: "#FFB300",
      rgb: "rgb(255, 179, 0)",
      hsl: "hsl(42, 100%, 50%)",
      usage: "Warnings, caution states, degraded quality indicators.",
      contrast_targets: ["void_black"],
    },
    error: {
      name: "Danger Magenta",
      hex: "#E5154E",
      rgb: "rgb(229, 21, 78)",
      hsl: "hsl(343, 83%, 49%)",
      usage: "Errors, destructive actions, failed states.",
      contrast_targets: ["void_black", "deep_navy"],
    },
    info: {
      name: "Cold Blue",
      hex: "#29ABE2",
      rgb: "rgb(41, 171, 226)",
      hsl: "hsl(201, 74%, 52%)",
      usage: "Informational banners, tips, system notices.",
      contrast_targets: ["void_black"],
    },
    focus: {
      name: "Focus Cyan Pulse",
      hex: "#00E5FF",
      rgb: "rgb(0, 229, 255)",
      hsl: "hsl(187, 100%, 50%)",
      usage: "Keyboard-focus ring (2px, paired with 2px void-black offset).",
      contrast_targets: ["void_black", "deep_navy"],
    },
    border: {
      name: "Dim Steel",
      hex: "#2A3650",
      rgb: "rgb(42, 54, 80)",
      hsl: "hsl(220, 31%, 24%)",
      usage: "Card borders, dividers — barely visible against deep navy.",
      contrast_targets: [],
    },
    shadow: {
      name: "Neon Shadow Cyan",
      hex: "#00E5FF",
      rgb: "rgba(0, 229, 255, 0.15)",
      hsl: "hsl(187, 100%, 50%)",
      usage: "Colored neon drop-glow on cards and key UI elements.",
      contrast_targets: [],
    },
    overlay: {
      name: "Blackout",
      hex: "#000000",
      rgb: "rgba(0, 0, 0, 0.78)",
      hsl: "hsl(0, 0%, 0%)",
      usage: "Modal/scrim overlays — near-opaque pure black.",
      contrast_targets: [],
    },
    gradients: [
      {
        name: "Neon Horizon",
        type: "linear",
        angle: "160deg",
        stops: ["#FF2D78", "#00E5FF"],
        usage: "Hero backdrops, splash screens, dramatic section breaks.",
      },
      {
        name: "Amber Interrogation",
        type: "radial",
        angle: null,
        stops: ["rgba(245,166,35,0.35)", "rgba(10,12,16,0.0)"],
        usage: "Single overhead light effect behind hero subjects.",
      },
      {
        name: "City Depth",
        type: "linear",
        angle: "180deg",
        stops: ["#111827", "#0A0C10"],
        usage: "Subtle surface-to-background fade for depth in panels.",
      },
    ],
  },

  color_rules: [
    "Backgrounds are always near-black (void-black or deep-navy). Never light.",
    "At most two neon accent colors in one view — cyan and amber, or magenta and amber.",
    "Neon amber is reserved for the single most important CTA per screen.",
    "Colored glow/shadow should feel intentional, not scattered.",
    "Never use warm golden or cream tones — they break the night atmosphere.",
    "Text on dark must always meet WCAG AA at minimum.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  fonts: {
    headline: {
      family: "Playfair Display",
      weight: [700, 900],
      fallbacks: ["Georgia", "Times New Roman", "serif"],
      usage: "Dramatic page titles, hero headlines — high-contrast noir elegance.",
      tracking: "-0.02em",
      line_height: 1.05,
    },
    display: {
      family: "Bebas Neue",
      weight: [400],
      fallbacks: ["Impact", "Haettenschweiler", "sans-serif"],
      usage: "Oversized cinematic display numerals, splash title cards.",
      tracking: "0.06em",
      line_height: 0.9,
    },
    body: {
      family: "IBM Plex Serif",
      weight: [400, 500],
      fallbacks: ["Palatino", "Georgia", "serif"],
      usage: "Descriptions, synopses, long-form reading — editorial noir tone.",
      tracking: "0em",
      line_height: 1.65,
    },
    ui: {
      family: "IBM Plex Sans",
      weight: [400, 500, 600],
      fallbacks: ["system-ui", "Helvetica Neue", "sans-serif"],
      usage: "Buttons, labels, navigation, chips — crisp, modern, legible.",
      tracking: "0.01em",
      line_height: 1.3,
    },
    mono: {
      family: "IBM Plex Mono",
      weight: [400, 600],
      fallbacks: ["Courier New", "Courier", "monospace"],
      usage: "Code, tokens, runtime counters, technical readouts, typewriter effects.",
      tracking: "0.02em",
      line_height: 1.5,
    },
    number: {
      family: "Bebas Neue",
      weight: [400],
      fallbacks: ["Impact", "sans-serif"],
      usage: "Stats, watch counts, runtimes, episode numbers, dashboard figures.",
      tracking: "0.04em",
      line_height: 1.0,
    },
  },

  typography_rules: [
    "Playfair Display headlines must be bold (700+); never light weight.",
    "Bebas Neue display type is always uppercase — it has no lowercase.",
    "Body copy (IBM Plex Serif) must never be set in all-caps.",
    "Headline tracking is tight (-0.02em) — noir type is compressed.",
    "Avoid centered body copy blocks; left-align for readability.",
    "Use monospace (IBM Plex Mono) only for typewriter/code moments — not general UI.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  shape_language: [
    "Sharp-to-medium rectangles",
    "Art deco geometric panels",
    "Angled cuts (parallelogram badges)",
    "Thin rule lines (1px–2px borders)",
    "Hard-edged silhouettes",
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
    notes:
      "Borders are thin, precise, and sharp-cornered — the geometry of venetian blinds " +
      "and art deco facades. Neon accents use 1px glow-border with colored box-shadow.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  icon_style: ["Outlined", "Sharp", "Duotone", "Minimal"],

  icon_rules: [
    "1.5px–2px stroke weight, sharp caps and joins.",
    "Square or slightly sharp corners (2px radius max).",
    "Single neon accent color for active/featured state; ghost-white otherwise.",
    "Duotone only for hero/featured icons — neon fill with dark void-black base.",
    "Never use rounded playful icon sets — the brand reads architectural.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  illustration_style: [
    "Pulp noir paperback cover",
    "Mid-century detective fiction poster",
    "Ink wash with neon spot color",
    "Hard-shadow expressionism",
    "Linocut-style vector",
  ],

  character_style: {
    proportions: "Lean, stylized realism — elongated figures, angular features.",
    eyes: "Sharp, half-lidded, world-weary. Catch neon glints.",
    expressions: "Determined, suspicious, guarded, seductive, brooding.",
    clothing:
      "Trench coats, high-collar suits, sleek noir-modern attire — muted dark " +
      "tones with one neon-lit highlight.",
    outlines: "Razor-clean 2px black ink with neon spot-color fills, no gradients.",
  },

  mascot: {
    name: "Lux",
    species: "Anthropomorphic neon sign letter (glowing 'X')",
    personality: "The all-knowing night-owl archivist — seen everything, judges nothing.",
    description:
      "A sleek silhouetted figure wearing a long trench coat and a fedora whose brim " +
      "casts a neon-cyan glow. Their eyes are two points of amber light in the darkness. " +
      "Lux appears in loading screens and empty states, always leaning against something, " +
      "always watching.",
    poses: [
      "Leaning against a rain-slicked wall, arms crossed",
      "Looking over shoulder at a flickering neon sign",
      "Silhouette in a lit doorway",
      "Crouching with magnifier, tracing a neon reflection",
    ],
    expressions: ["Stoic", "Knowing half-smile", "Eyebrow raised", "Deep in thought"],
  },

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  photography_style: [
    "Night photography, long exposure",
    "Wet-street reflections",
    "Neon color grade (cyan/magenta split toning)",
    "Low-key single practical light source",
    "High-contrast film grain (pushed ISO)",
  ],

  photo_rules: [
    "Never use daylight, golden hour, or warm-toned photography.",
    "Always city night or interior low-light — no outdoor natural light.",
    "Color grade must preserve neon colors; avoid orange-teal LUT clichés.",
    "Strong contrast: blacks crushed to near-void, highlights restrained.",
    "Grain is a feature — film-pushed grain adds authenticity.",
    "Avoid smiling lifestyle photography; mood over approachability.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  motion_style: ["Cinematic", "Deliberate", "Tense", "Precise"],

  transitions: [
    "Hard cut",
    "Iris wipe (circular close/open)",
    "Horizontal venetian-blind reveal",
    "Neon flicker dissolve",
    "Slow push-in zoom",
  ],

  animation_speed: "slow",

  easing: ["ease-in-out", "cubic-bezier(0.4, 0, 0.2, 1)", "steps(8, end)"],

  microinteractions: {
    hover:
      "Cards gain a 1px neon-cyan border glow and lift 3px with a cyan box-shadow " +
      "(0 4px 20px rgba(0,229,255,0.25)) over 200ms ease-out.",
    button_press:
      "Neon amber button pulses briefly brighter (saturate 120%) then returns — " +
      "like a buzzing sign spiking voltage.",
    loading:
      "Horizontal neon scan-line sweep across the surface, left to right, repeating.",
    drag:
      "Item dims to 60% opacity and gains a magenta glow trail as it's dragged.",
    focus:
      "2px electric-cyan focus ring fades in over 150ms with a faint outer cyan " +
      "halo (0 0 0 4px rgba(0,229,255,0.2)).",
    success:
      "Brief cyan pulse radiating outward from the success element, then settling " +
      "to a static cyan check icon.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  ui_style: [
    "Dark-glass surfaces",
    "Neon-lit edge accents",
    "Architectural grid lines",
    "Sharp contained geometry",
    "Cinematic chrome details",
  ],

  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],

  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.6)",
    md: "0 4px 12px rgba(0,0,0,0.7), 0 0 8px rgba(0,229,255,0.08)",
    lg: "0 10px 32px rgba(0,0,0,0.8), 0 0 20px rgba(0,229,255,0.12)",
    neon_cyan: "0 0 12px rgba(0,229,255,0.5), 0 0 30px rgba(0,229,255,0.2)",
    neon_amber: "0 0 12px rgba(245,166,35,0.6), 0 0 30px rgba(245,166,35,0.2)",
    neon_magenta: "0 0 12px rgba(255,45,120,0.5), 0 0 30px rgba(255,45,120,0.2)",
    notes:
      "Primary shadows are deep black. Neon glow shadows are applied to cards, " +
      "buttons, and featured UI elements to simulate practical neon lighting.",
  },

  cards: {
    elevation: "md",
    padding: "16px",
    border_radius: "4px",
    border: "1px solid #2A3650",
    background: "#111827",
    notes:
      "Sharp-cornered deep-navy cards. Featured cards gain a 1px neon-cyan border " +
      "and the neon_cyan box-shadow on hover.",
  },

  buttons: {
    primary: {
      bg: "#F5A623",
      text: "#0A0C10",
      radius: "2px",
      notes: "Neon amber, sharp-cornered, near-black text for contrast.",
    },
    secondary: {
      bg: "transparent",
      text: "#00E5FF",
      radius: "2px",
      notes: "1px cyan border, cyan text — ghost with neon edge.",
    },
    danger: {
      bg: "#E5154E",
      text: "#E8EDF5",
      radius: "2px",
      notes: "Danger magenta — destructive actions only.",
    },
    ghost: {
      bg: "transparent",
      text: "#E8EDF5",
      radius: "2px",
      notes: "1px dim-steel border, ghost-white text. Subtle non-primary action.",
    },
    link: {
      bg: "transparent",
      text: "#00E5FF",
      radius: "0",
      notes: "Cyan underline on hover. Inline text actions.",
    },
    icon: {
      bg: "#1C2333",
      text: "#E8EDF5",
      radius: "2px",
      notes: "Charcoal-slate icon button; active state uses cyan icon color.",
    },
    fab: {
      bg: "#F5A623",
      text: "#0A0C10",
      radius: "2px",
      notes: "Floating neon-amber action button with amber glow shadow.",
    },
  },

  forms: {
    inputs:
      "Deep-navy fill, 1px dim-steel border, 2px radius, 12px padding. " +
      "Focus state: 1px cyan border + cyan outer glow.",
    checkboxes: "Sharp square, cyan check mark, no spring — clean and mechanical.",
    switches: "Rectangular track, void-black knob, neon amber when on.",
    dropdowns: "Deep-navy surface, 1px steel border, ghost-white options, cyan hover.",
    validation:
      "Inline, minimal copy; error = danger-magenta text, success = cyan-spark text.",
  },

  tables: {
    headers: "IBM Plex Sans caps on charcoal-slate header row, dim-steel border.",
    hover: "Row gains charcoal-slate background and 1px left-edge cyan accent.",
    sorting: "Small sharp chevron in electric cyan.",
    striping: "Alternate rows use surface_alt (charcoal slate), 1px opacity difference.",
  },

  navigation: {
    sidebar:
      "Void-black panel, 1px dim-steel right border, sharp active indicator bar " +
      "(3px left neon-amber), ghost-white icon + label.",
    topbar:
      "Deep-navy bar with 1px bottom dim-steel border; brand wordmark in Playfair " +
      "Display with a faint cyan text-shadow.",
    tabs: "Underline tabs; active tab has 2px neon-amber bottom line.",
    breadcrumbs: "IBM Plex Sans small caps, separated by a single right chevron in steel-mist.",
  },

  dashboard_style:
    "Dense dark grid on void-black — Bebas Neue stat numerals lit by neon accent " +
    "colors, deep-navy cards with subtle cyan glow edges, venetian-blind-style dividers. " +
    "Information-rich but legible; every metric highlighted by its own neon color.",

  component_styles: {
    dialog:
      "Centered deep-navy card on a near-opaque blackout scrim; 1px cyan border on " +
      "the dialog frame; Playfair Display title.",
    sidebar: "See navigation.sidebar; collapses to icon-only rail with cyan active dot.",
    carousel:
      "Horizontal poster rail; left/right edge gradients fade to void-black; " +
      "neon-amber arrow controls.",
    search_bar:
      "Full-width rectangular input on charcoal-slate; magnifier icon in electric cyan; " +
      "placeholder: 'Search the city…'",
    media_player:
      "Void-black control bar with neon-amber scrubber; elapsed time in IBM Plex Mono; " +
      "controls in ghost-white, active in cyan.",
    toast:
      "Sharp-edged pill toast anchored bottom-right; 1px left-edge color bar (cyan " +
      "= info, amber = warning, magenta = error); slides in from right.",
    chip:
      "Rectangular chip on charcoal-slate with 1px dim-steel border; active chip " +
      "gets 1px cyan border + cyan text.",
  },

  layout_patterns: {
    dashboard:
      "Full-bleed void-black; top stat bar with neon-accented numerals → " +
      "3-column card grid → recent-activity rail.",
    settings:
      "Left vertical tab nav with amber active indicator + right form panels; " +
      "max-width 800px content zone.",
    media_library:
      "Sticky filter/sort bar on charcoal-slate → responsive poster grid " +
      "(auto-fill, 180px min) on void-black.",
    authentication:
      "Full-bleed void-black background with ambient neon radial glow; " +
      "centered deep-navy form card with cyan border.",
    landing:
      "Full-bleed noir hero illustration with Playfair Display headline over neon " +
      "horizon gradient → feature sections alternating void/navy → amber CTA.",
    detail_view:
      "Full-bleed darkened backdrop still → left: poster with amber play button → " +
      "right: metadata in IBM Plex Serif → episodes/related rails below.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY
   * ========================================================================== */

  poster_style:
    "Neo-noir one-sheet: Playfair Display title in ghost-white or neon-amber, " +
    "high-contrast key art, 1px dim-steel border, sharp corners, pushed-grain texture.",

  thumbnail_style:
    "Sharp 2px corners, 1px dim-steel border, high-contrast grade, neon-amber " +
    "title overlay in IBM Plex Sans on a dark-gradient scrim.",

  backdrop_style:
    "Full-bleed city-night cinematic still, deep shadows crushed to void-black, " +
    "neon color grade, subtle film grain, 80% darkening vignette at bottom.",

  media_cards:
    "Poster over deep-navy card; title + year in IBM Plex Sans below; hover reveals " +
    "1px cyan border glow + neon-amber play button centered on poster.",

  badges: {
    labels: ["4K", "HDR", "Dolby Vision", "Continue Watching", "New", "Favorite", "Unrated"],
    shape: "Sharp rectangle (2px radius), 1px border.",
    colors:
      "Neon amber for quality (4K/HDR/Dolby), electric cyan for status (New, Continue " +
      "Watching), neon magenta for Favorite.",
    typography: "IBM Plex Sans, 600 weight, uppercase, 10–11px.",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  voice: ["Terse", "Atmospheric", "Cinematic", "Wry"],

  tone: [
    "Understated",
    "Evocative",
    "Confident",
    "Occasionally sardonic",
  ],

  writing_style:
    "Short, punchy sentences. Declarative. Active voice. Occasional noir idiom " +
    "(shadows, streets, city, night, case). Never exclamatory, never corporate, " +
    "never warm-fuzzy. Copy should feel like a voiceover narration — lean, loaded, assured.",

  vocabulary: ["the city", "night", "case", "signal", "static", "scene", "frame", "cut", "noir", "shadow"],

  avoid_words: [
    "cozy", "warm", "fun", "friendly", "robust", "synergy", "leverage",
    "utilize", "exciting", "awesome", "amazing", "pop",
  ],

  greetings: [
    "Good to have you back.",
    "The city is dark. Time to watch.",
    "You know where to find what you came for.",
  ],

  empty_state_messages: [
    "Nothing here. Yet.",
    "The library is dark — add something to change that.",
    "No results. The city keeps its secrets tonight.",
    "Nothing's been watched here. Start a case.",
  ],

  notification_style:
    "Brief, precise, dry — like a detective's field note. No exclamation marks. " +
    "Never pushy or cheerful. One sentence, delivered flat.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE
   * ========================================================================== */

  image_prompt_prefix:
    "Neo-noir cinematic illustration, high contrast, deep black shadows, neon city " +
    "night, electric cyan and magenta neon signs, rain-slicked streets, 1940s noir " +
    "meets modern neon city,",

  image_prompt_suffix:
    ", dark atmospheric palette (void black, electric cyan, neon magenta, amber), " +
    "sharp hard shadows, film grain, cinematic composition, high quality.",

  negative_prompt: [
    "warm", "golden hour", "daylight", "sunshine", "cozy", "cheerful",
    "pastel", "soft", "cream background", "family friendly", "cartoonish",
    "rounded bubbles", "corporate clean", "flat bright colors",
  ],

  ui_generation_rules: [
    "Background is always void-black (#0A0C10) or deep-navy (#111827).",
    "Maximum two neon accent colors per screen.",
    "Primary CTA is always neon amber with void-black text.",
    "Sharp corners (2px radius) except pill for badge shapes.",
    "Use the spacing scale; prefer generous spacing on dark — it reads as depth.",
    "Max content width 1400px.",
    "All text must meet WCAG AA against its dark background.",
  ],

  logo_rules: {
    shape:
      "Wordmark in Playfair Display italic or Bebas Neue, optionally inside a " +
      "sharp-edged rectangular badge with a 1px neon accent border.",
    complexity: "Simple and high-contrast — must read on void-black at all sizes.",
    negative_space: "Generous — the darkness around the wordmark is intentional.",
    colors: "Ghost-white or neon-amber wordmark on void-black. Inverted for light use.",
    allowed_symbols: [
      "neon sign letter forms",
      "venetian blind graphic device",
      "film frame border",
      "city skyline silhouette",
    ],
    forbidden_symbols: [
      "play-button triangle cliché",
      "gears or circuits",
      "sunbursts",
      "warm illustrations",
    ],
  },

  illustration_prompt_template:
    "{prefix} {subject}, in the Neon Noir style, {mood}, set in a rain-soaked " +
    "neon-lit city night {suffix}",

  page_generation_rules: [
    "Background is always void-black — every page begins in darkness.",
    "Hero sections feature a dramatic noir illustration or city-night photograph.",
    "CTA buttons are neon amber, sharp-cornered.",
    "Reveal content progressively with subtle entrance animations (no bounces).",
    "Maximum page width 1400px; content left-aligned on wider viewports.",
    "Every page should have at least one neon accent element that grounds the identity.",
  ],

  prompt_library: {
    logo:
      "Design a Neon Noir logo: Playfair Display italic wordmark in ghost-white on " +
      "void-black, optional 1px electric-cyan rectangular border, sharp corners, " +
      "no warm colors, no rounded shapes.",
    illustration:
      "{image_prompt_prefix} {subject} {image_prompt_suffix}",
    icon:
      "Sharp outlined minimal icon of {subject}, 1.5px stroke, ghost-white, " +
      "no rounded joins, neon-cyan active state, noir aesthetic.",
    background:
      "Void-black background with subtle rain-texture and faint neon-cyan radial " +
      "glow in one corner. No warm light. No text.",
    landing_page:
      "A neo-noir media landing page: full-bleed dark cinematic hero with Playfair " +
      "Display headline, neon-amber CTA button, deep-navy card sections, venetian-blind " +
      "dividers, electric-cyan and magenta accent lights.",
    dashboard:
      "A dark media dashboard on void-black with Bebas Neue neon-amber stats, " +
      "deep-navy cards with subtle cyan glow edges, sharp corners, IBM Plex Mono " +
      "for secondary data.",
    marketing:
      "A neo-noir poster-style social graphic for {topic}: Playfair Display headline " +
      "in neon amber, dark atmospheric key art, city night, rain reflections, " +
      "high-contrast noir composition.",
  },

  /* ==========================================================================
   * 17. DESIGN TOKENS
   * ========================================================================== */

  design_tokens: {
    color: {
      "--color-primary": "#F5A623",
      "--color-secondary": "#00E5FF",
      "--color-tertiary": "#FF2D78",
      "--color-bg": "#0A0C10",
      "--color-surface": "#111827",
      "--color-surface-alt": "#1C2333",
      "--color-text": "#E8EDF5",
      "--color-neutral": "#7A8FA6",
      "--color-success": "#00C9A7",
      "--color-warning": "#FFB300",
      "--color-error": "#E5154E",
      "--color-info": "#29ABE2",
      "--color-border": "#2A3650",
      "--color-focus": "#00E5FF",
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
      "--font-headline": "'Playfair Display', Georgia, serif",
      "--font-display": "'Bebas Neue', Impact, sans-serif",
      "--font-body": "'IBM Plex Serif', Palatino, serif",
      "--font-ui": "'IBM Plex Sans', system-ui, sans-serif",
      "--font-mono": "'IBM Plex Mono', 'Courier New', monospace",
    },
    shadow: {
      "--shadow-sm": "0 1px 3px rgba(0,0,0,0.6)",
      "--shadow-md": "0 4px 12px rgba(0,0,0,0.7), 0 0 8px rgba(0,229,255,0.08)",
      "--shadow-lg": "0 10px 32px rgba(0,0,0,0.8), 0 0 20px rgba(0,229,255,0.12)",
      "--shadow-neon-cyan": "0 0 12px rgba(0,229,255,0.5), 0 0 30px rgba(0,229,255,0.2)",
      "--shadow-neon-amber": "0 0 12px rgba(245,166,35,0.6), 0 0 30px rgba(245,166,35,0.2)",
      "--shadow-neon-magenta": "0 0 12px rgba(255,45,120,0.5), 0 0 30px rgba(255,45,120,0.2)",
    },
  },

  /* ==========================================================================
   * 18. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  responsive_behavior: {
    desktop:
      "Multi-column poster rails, hover glow affordances, venetian-blind sidebar, " +
      "max 1400px content width. Rich neon glow effects.",
    tablet:
      "2–3 column grids, enlarged touch targets (48px min), collapsible sidebar " +
      "to icon rail. Reduce neon box-shadow intensity by 40% for performance.",
    tv:
      "10-foot UI: Bebas Neue numerals at 2× scale, bold 4px neon-amber focus ring, " +
      "D-pad spatial navigation, poster grids fill the void-black field.",
    mobile:
      "Single column, bottom tab bar on deep-navy, full-width portrait posters, " +
      "sticky neon-amber play bar at bottom. No hover states — use press animations.",
  },

  /* ==========================================================================
   * 19. SOUND IDENTITY
   * ========================================================================== */

  sound_identity: {
    startup_chime:
      "A distant jazz trumpet note fading in from silence, followed by a low vinyl " +
      "crackle resolving to a clean chord. Cold and atmospheric.",
    notification:
      "Soft single-tone neon-flicker click — like a sign turning on. Brief, subtle.",
    ui_click:
      "Dry, tight mechanical click — typewriter key or camera shutter. No reverb.",
    success:
      "Short clean ascending two-note bell tone. Understated satisfaction, not fanfare.",
    error:
      "Low, flat electric buzz — the sound of a neon sign shorting out. Non-alarming.",
  },

  /* ==========================================================================
   * 20. SEASONAL VARIANTS
   * ========================================================================== */

  seasonal_variants: [
    {
      name: "Midnight New Year",
      active_range: "12-28..01-03",
      overrides: {
        "--color-primary": "#F5A623",
        "--color-secondary": "#FF2D78",
        "--color-tertiary": "#00E5FF",
      },
      motif:
        "Champagne flute silhouette against magenta neon countdown clock; " +
        "slow-falling confetti particles styled as film-frame perforations.",
    },
    {
      name: "Blood Moon October",
      active_range: "10-01..10-31",
      overrides: {
        "--color-primary": "#E5154E",
        "--color-secondary": "#FF6B00",
        "--color-surface": "#170810",
      },
      motif:
        "Deep crimson neon palette; crescent moon silhouette over rainy rooftops; " +
        "spider-web geometry in the venetian-blind shadow device.",
    },
    {
      name: "Valentine's Neon",
      active_range: "02-10..02-14",
      overrides: {
        "--color-primary": "#FF2D78",
        "--color-secondary": "#F5A623",
      },
      motif:
        "Magenta dominates; stylized neon heart sign flickers above the city " +
        "roofline; rain puddles reflect pink.",
    },
  ],

  /* ==========================================================================
   * 21. ACCESSIBILITY
   * ========================================================================== */

  accessibility: {
    minimum_contrast:
      "WCAG AA required (4.5:1 body text, 3:1 large text/UI). " +
      "Ghost-white (#E8EDF5) on void-black (#0A0C10) = 17.5:1 — exceeds AAA. " +
      "Neon amber (#F5A623) on void-black = 7.2:1 — passes AAA. " +
      "Verify neon-on-surface combinations individually — cyan on deep-navy is tight.",
    focus_style:
      "2px electric-cyan focus ring with 2px void-black offset; an additional " +
      "4px cyan outer glow (rgba(0,229,255,0.2)) for visibility on dark surfaces. " +
      "Always visible — never hidden by overflow.",
    touch_target: "Minimum 48×48px on mobile and TV. 44×44px minimum on desktop.",
    motion_reduction:
      "Honor prefers-reduced-motion: replace neon-scan-line loaders with static " +
      "skeleton shimmer; replace camera-push transitions with cross-fades; " +
      "retain only opacity-based entrance animations.",
    font_scaling:
      "All layouts must survive 200% browser text zoom without clipping or " +
      "horizontal scroll. Bebas Neue display text degrades gracefully to fallback " +
      "Impact if the web font is unavailable.",
  },

  /* ==========================================================================
   * 22. DO / DON'T
   * ========================================================================== */

  do_dont: {
    colors: {
      do: [
        "Use void-black or deep-navy for every background",
        "Apply neon amber exclusively to the primary CTA",
        "Use at most two neon accent colors per view",
        "Crush blacks to near-void for depth and atmosphere",
      ],
      dont: [
        "Use warm, cream, or light backgrounds anywhere",
        "Scatter multiple neon colors indiscriminately",
        "Use neon amber for secondary/tertiary UI elements",
        "Add warm-golden gradients or sunrise tones",
      ],
      reason:
        "The Neon Noir atmosphere depends entirely on the tension between deep " +
        "darkness and precisely placed neon light. Diluting that contrast destroys the identity.",
    },
    typography: {
      do: [
        "Use Playfair Display bold for dramatic hero headlines",
        "Use IBM Plex Serif for editorial body copy",
        "Set Bebas Neue display text in uppercase only",
        "Keep tracking tight on headlines (-0.02em)",
      ],
      dont: [
        "Use geometric sans-serif headlines (too modern-minimal)",
        "Set body copy in Bebas Neue or Playfair Display",
        "Use light font weights for headlines",
        "Center long body copy blocks",
      ],
      reason:
        "Typography carries the noir character — the serif drama of Playfair, " +
        "the architectural weight of Bebas, and the editorial clarity of IBM Plex " +
        "all reinforce the cinematic intelligence of the brand.",
    },
    layout: {
      do: [
        "Use deep negative space — darkness is structural",
        "Align to sharp geometric grids",
        "Create strong asymmetric compositions with clear focal points",
        "Apply venetian-blind-style horizontal rule dividers",
      ],
      dont: [
        "Fill all dark space with UI chrome",
        "Use symmetrical, centered hero layouts",
        "Add rounded bubbly card layouts",
        "Exceed 1400px content width",
      ],
      reason:
        "Noir space is intentional — blank dark areas create tension and depth, " +
        "not absence. The layout should feel like a cinematographer framed it.",
    },
    animation: {
      do: [
        "Use slow, deliberate transitions (300–500ms)",
        "Animate with cinematic easing (ease-in-out, push/pull curves)",
        "Use neon flicker for loading and state-change moments",
        "Respect prefers-reduced-motion unconditionally",
      ],
      dont: [
        "Use spring, bounce, or elastic easing",
        "Animate more than one element simultaneously",
        "Use playful transitions (pop, scale-bounce)",
        "Run continuous looping animations without pause",
      ],
      reason:
        "Motion in Neon Noir is like a camera move — purposeful, weighted, " +
        "never frivolous. Bouncy animation destroys the tension the brand builds.",
    },
    imagery: {
      do: [
        "Use night city photography with neon color grades",
        "Use high-contrast noir illustration with neon spot color",
        "Show rain, reflections, silhouettes, and shadows",
        "Apply pushed film grain to photography",
      ],
      dont: [
        "Use daylight, warm-toned, or golden-hour photography",
        "Use cheerful illustration styles",
        "Use pastel, soft, or airy imagery",
        "Show sunny or nature settings",
      ],
      reason:
        "Every image should feel like a still from a noir film — the world exists " +
        "at night, under neon, in shadow.",
    },
    branding: {
      do: [
        "Keep the wordmark sharp-cornered and high-contrast",
        "Use approved signature elements (venetian blinds, neon forms, rain)",
        "Maintain the darkness-and-neon contrast in all brand touchpoints",
      ],
      dont: [
        "Add rounded or playful logo treatments",
        "Use the logo on light or warm backgrounds without an approved inversion",
        "Introduce non-brand neon colors (lime, purple, orange-red)",
      ],
      reason:
        "Brand recognition in Neon Noir comes from the feeling of its light-in-darkness " +
        "aesthetic — consistency is what makes the identity feel cinematic.",
    },
    icons: {
      do: [
        "Use sharp 1.5–2px outlined icons",
        "Apply electric-cyan for active icon states",
        "Keep icon forms minimal and angular",
      ],
      dont: [
        "Use rounded, playful icon libraries",
        "Use filled icons as the default state",
        "Mix icon stroke weights within a single view",
      ],
      reason:
        "Icons should feel like architectural line drawings — precise, no softness.",
    },
    copywriting: {
      do: [
        "Write short, terse, declarative sentences",
        "Use noir idiom sparingly and precisely",
        "Let silence do work — don't over-explain",
      ],
      dont: [
        "Use exclamation marks in UI copy",
        "Use warm, playful, or energetic language",
        "Use corporate filler phrases",
        "Write more than two sentences for any toast/notification",
      ],
      reason:
        "The voice is a film narrator — confident, cinematic, economical. " +
        "Every extra word weakens the noir register.",
    },
    ux: {
      do: [
        "Make the play action immediately accessible on every media card",
        "Provide a single dominant CTA per screen in neon amber",
        "Use neon accent color to guide attention through the page",
      ],
      dont: [
        "Hide critical actions in menus",
        "Use multiple equally prominent CTAs",
        "Add friction to the path from library to playback",
      ],
      reason:
        "The product is a media server — the noir aesthetic should serve the " +
        "experience, never obstruct the path to play.",
    },
    performance: {
      do: [
        "Lazy-load poster images with a void-black placeholder",
        "Use CSS box-shadow for neon glows — do not use glow images",
        "Compress all background textures (rain/grain) aggressively",
        "Prefer CSS transitions over JS-driven animation libraries",
      ],
      dont: [
        "Ship multiple high-resolution background textures unoptimized",
        "Use SVG glow filters on large areas",
        "Block render on web font load — use font-display: swap",
      ],
      reason:
        "A dark, atmospheric experience should feel instant — slow load breaks " +
        "immersion as effectively as the wrong color palette.",
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
      "Base/parent kit. Variations (e.g. 'Neon Noir: Deep Ocean', 'Neon Noir: Rust City') " +
      "should reference this via base_kit.slug = 'neon-noir' and override only diverging fields.",
  },
};

export default brandKit;
export { brandKit };
