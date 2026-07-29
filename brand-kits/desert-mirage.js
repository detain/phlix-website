/**
 * ============================================================================
 *  PHLIX BRAND KIT  —  Desert Mirage
 * ============================================================================
 *
 *  Theme: Vast desert with heat shimmer and mirages. Sand dunes, ochre tones,
 *  scorched sun, cool oasis accents. The shimmering horizon where sky meets
 *  sand in an endless, dreamlike dance.
 *
 *  Colors: Sand (#D4A574), Tan (#C19A6B), Saddle Brown (#8B4513),
 *          Sky Blue (#87CEEB), Wheat (#F5DEB3)
 *
 *  Schema version: 2.0   Kit type: base
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY
   * ========================================================================== */

  name: "Desert Mirage",

  slug: "desert-mirage",

  version: "1.0",

  description:
    "Where the scorching sun meets an endless horizon of rippling dunes. Desert " +
    "Mirage is the shimmering illusion of water across hot sand — a warm, dreamy " +
    "identity built on the interplay of scorched earth ochres and the cool, " +
    "impossible promise of a distant oasis. The palette breathes with the land: " +
    "amber, tan, saddle brown, and that impossible sky-blue that only appears " +
    "where desert meets water.",

  inspiration: [
    "Sahara dunes at midday with heat shimmer",
    "Ancient caravanserai routes across sand seas",
    "Nomadic Berber textile patterns in earth tones",
    "The mirage — water that isn't there, beauty that is",
    "Tatooine desert vistas, Tatooine horizon",
    "Ancient Egyptian gold and lapis lazuli",
    "Desert rose selenite crystals",
    "Rippled sand patterns in the wind",
    "Empty quarter Arabian desert",
    "The shimmering heat distortion on blacktop",
  ],

  keywords: [
    "desert", "mirage", "ochre", "sand", "dunes", "oasis", "heat shimmer",
    "scorched", "nomadic", "berber", "caravan", "wheat", "tan", "saddle brown",
    "sky blue", "desert rose", "rippled", "vast", "horizon", "endless",
    "shimmer", "dreamlike", "illusion", "water", "cool", "contrast",
    "warm earth", "golden", "amber", "earth tones", "ancient", "nomad",
    "caravanserai", "sandstone", "arid", "sun-scorched", "wavelength",
  ],

  /* ==========================================================================
   * 2. PERSONALITY
   * ========================================================================== */

  personality: ["Vast", "Dreamlike", "Warm", "Illusive", "Calm", "Timeless"],

  emotional_goals: [
    "Wonder",
    "Serenity",
    "Longing",
    "Escape",
    "Possibility",
    "Stillness",
  ],

  archetype: "Innocent / Sage",

  audience: [
    "Film and series enthusiasts seeking escape",
    "Self-hosting enthusiasts who value privacy and freedom",
    "Users who appreciate beautiful, distinctive design",
    "Those who dream of distant horizons and quiet spaces",
    "Travelers and wanderers at heart",
  ],

  /* ==========================================================================
   * 3. BRAND STORY
   * ========================================================================== */

  story:
    "There is a place where the horizon bends, where hot air paints the " +
    "appearance of water across the sand, and for one shimmering moment, " +
    "everything seems possible. Desert Mirage is that moment — a media " +
    "server that does not compete with your life but becomes part of its " +
    "landscape, there when you need it, invisible when you don't. It is " +
    "built to feel like a cool oasis in a noisy streaming landscape: " +
    "honest, self-hosted, and always available — no mirage required. " +
    "Your library, your rules, your horizon.",

  tagline_primary: "Your media, on the horizon.",

  tagline_secondary: [
    "Stream from anywhere the sun touches.",
    "No clouds. No fees. Just your library.",
    "The oasis is real — and it's yours.",
    "Where your stories wait, always.",
  ],

  mission:
    "To give every home media library the timeless calm of a desert evening — " +
    "warm ochre tones, an endless horizon, and the cool promise of an oasis " +
    "that is always within reach.",

  values: [
    "Privacy",
    "Freedom",
    "Calm",
    "Reliability",
    "Self-sufficiency",
    "Wonder",
  ],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES
   * ========================================================================== */

  brand_dna:
    "Desert Mirage is the shimmering vastness of the open desert brought " +
    "to a media server. It is warm ochre and cool sky-blue — the contrast " +
    "between scorched earth and impossible water. It is never harsh, " +
    "never clinical; it is always warm, expansive, and quietly magical, " +
    "like a mirage that turns out to be real.",

  design_principles: [
    "Every screen should feel as open and vast as a desert horizon.",
    "The contrast of warm earth and cool sky is the soul of the palette.",
    "Use heat-shimmer and ripple patterns sparingly as ambient decoration.",
    "Typography is elegant and desert-carved — confident but not loud.",
    "Mirage effects (shimmer, glow, gradient distortion) for peak moments only.",
    "Generous whitespace — the desert has room, and so should every layout.",
    "Shadows are warm umber — never grey or cold.",
    "Sky blue is sacred — use it only where coolness and oasis are needed.",
  ],

  brand_opposites: [
    "Not neon or electric",
    "Not cold or clinical",
    "Not cramped or dense",
    "Not corporate or sterile",
    "Not rushed or loud",
    "Not high-gloss or chrome",
    "Not complex or overwhelming",
  ],

  signature_elements: [
    "Ripple-sand pattern dividers",
    "Heat shimmer gradient glow effects",
    "Desert dune silhouette horizon line",
    "Oasis blue accent inlay",
    "Wheat/sand gradient sky transitions",
    "Saddle brown geometric borders",
  ],

  header_motif: "Slow heat-shimmer wave animation behind a dune silhouette horizon line",

  /* ==========================================================================
   * 5. VISUAL IDENTITY
   * ========================================================================== */

  visual_style: [
    "Desert landscape minimalism",
    "Warm earth-tone illustration",
    "Ripple and shimmer texture effects",
    "Geometric desert patterns",
    "Soft ambient gradients",
  ],

  art_direction:
    "Artwork should feel like a dream of the open desert: soft ochre and amber " +
    "gradients, a rippling horizon line of dunes, the cool impossible blue of " +
    "a distant oasis. Compositions favor wide horizontal expanses: low horizon " +
    "lines, vast open sky, single silhouetted dunes. Lighting is warm but " +
    "diffuse — the midday sun, softened by heat shimmer. The palette stays " +
    "grounded — sand, tan, saddle brown, with sky blue reserved for oasis moments. " +
    "Avoid digital sheen, lens flares, gradients that feel synthetic, or anything " +
    "that could live on a tech startup landing page. The light comes from above, " +
    "always warm, always diffused through layers of hot air.",

  realism: "illustrated",

  rendering_style: ["gradient wash", "ripple texture", "soft geometric", "ambient glow"],

  texture_level: "light",

  depth: "layered_with_ambient_glow",

  lighting: {
    temperature: "warm-diffuse",
    quality: "soft midday with heat distortion",
    shadows: "soft and warm",
    contrast: "medium-low",
    notes: "Light always from above, warm and diffused through hot air layers. Heat shimmer distortion as ambient effect. No harsh shadows.",
  },

  composition: [
    "Wide horizontal panorama",
    "Low horizon line with vast sky above",
    "Single strong dune silhouette or ripple pattern",
    "Asymmetric balance with breathing room",
    "Sky blue appears as accent against warm earth tones",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM
   * ========================================================================== */

  colors: {
    primary: {
      name: "Desert Sand",
      hex: "#D4A574",
      rgb: "rgb(212, 165, 116)",
      hsl: "hsl(30, 53%, 64%)",
      usage: "Primary CTAs, active nav states, key emphasis accents.",
      contrast_targets: ["wheat", "saddle_brown"],
    },
    secondary: {
      name: "Oasis Sky",
      hex: "#87CEEB",
      rgb: "rgb(135, 206, 235)",
      hsl: "hsl(197, 71%, 73%)",
      usage: "Secondary actions, links, highlights, oasis accent inlay.",
      contrast_targets: ["wheat", "saddle_brown", "desert_sand"],
    },
    tertiary: {
      name: "Wheat Light",
      hex: "#F5DEB3",
      rgb: "rgb(245, 222, 179)",
      hsl: "hsl(39, 77%, 83%)",
      usage: "Peak-emphasis accents, hero gradients, badge highlights.",
      contrast_targets: ["saddle_brown"],
    },
    neutral: {
      name: "Tan Dust",
      hex: "#C19A6B",
      rgb: "rgb(193, 154, 107)",
      hsl: "hsl(33, 40%, 59%)",
      usage: "Muted UI chrome, dividers, subdued tags, secondary text on sand.",
      contrast_targets: ["wheat", "saddle_brown"],
    },
    background: {
      name: "Wheat",
      hex: "#F5DEB3",
      rgb: "rgb(245, 222, 179)",
      hsl: "hsl(39, 77%, 83%)",
      usage: "Default page background. All brand surfaces begin from wheat.",
      contrast_targets: ["saddle_brown", "desert_sand", "oasis_sky"],
    },
    surface: {
      name: "Pale Sand",
      hex: "#FAF4E8",
      rgb: "rgb(250, 244, 232)",
      hsl: "hsl(41, 62%, 94%)",
      usage: "Card and panel surfaces — one step lighter than wheat.",
      contrast_targets: ["saddle_brown", "desert_sand"],
    },
    surface_alt: {
      name: "Warm Sand",
      hex: "#EDD9B8",
      rgb: "rgb(237, 217, 184)",
      hsl: "hsl(37, 46%, 83%)",
      usage: "Alternate surface for striped rows, nested panels, sidebar rails.",
      contrast_targets: ["saddle_brown"],
    },
    text: {
      name: "Saddle Brown",
      hex: "#8B4513",
      rgb: "rgb(139, 69, 19)",
      hsl: "hsl(25, 76%, 31%)",
      usage: "Primary body and headline text — rich, warm earth tone.",
      contrast_targets: ["wheat", "surface", "surface_alt", "oasis_sky"],
    },
    success: {
      name: "Oasis Green",
      hex: "#4A9E6B",
      rgb: "rgb(74, 158, 107)",
      hsl: "hsl(142, 38%, 45%)",
      usage: "Success toasts, confirmed states, 'added' indicators.",
      contrast_targets: ["wheat", "surface"],
    },
    warning: {
      name: "Amber Dune",
      hex: "#C9872A",
      rgb: "rgb(201, 135, 42)",
      hsl: "hsl(35, 67%, 48%)",
      usage: "Warnings, caution states, attention-needed badges.",
      contrast_targets: ["wheat", "surface"],
    },
    error: {
      name: "Burnt Sienna",
      hex: "#9B3A1A",
      rgb: "rgb(155, 58, 26)",
      hsl: "hsl(17, 71%, 35%)",
      usage: "Errors, destructive actions, failed states.",
      contrast_targets: ["wheat", "surface", "oasis_sky"],
    },
    info: {
      name: "Mirage Blue",
      hex: "#5BA4C6",
      rgb: "rgb(91, 164, 198)",
      hsl: "hsl(199, 48%, 57%)",
      usage: "Informational banners, tips, neutral highlights.",
      contrast_targets: ["wheat", "surface"],
    },
    focus: {
      name: "Oasis Focus",
      hex: "#87CEEB",
      rgb: "rgb(135, 206, 235)",
      hsl: "hsl(197, 71%, 73%)",
      usage: "Keyboard-focus ring color — sky blue on warm surfaces.",
      contrast_targets: ["wheat", "surface"],
    },
    border: {
      name: "Saddle Border",
      hex: "#8B4513",
      rgb: "rgb(139, 69, 19)",
      hsl: "hsl(25, 76%, 31%)",
      usage: "Card outlines, dividers — rich saddle brown, like ink on sand.",
      contrast_targets: ["wheat"],
    },
    shadow: {
      name: "Desert Shadow",
      hex: "#5C2E14",
      rgb: "rgba(92, 46, 20, 0.18)",
      hsl: "hsl(22, 65%, 22%)",
      usage: "Drop shadows — warm terracotta-brown, never grey or black.",
      contrast_targets: [],
    },
    overlay: {
      name: "Night Dune",
      hex: "#1A0C04",
      rgb: "rgba(26, 12, 4, 0.60)",
      hsl: "hsl(22, 58%, 6%)",
      usage: "Modal/scrim overlays — warm near-black like a starless desert night.",
      contrast_targets: [],
    },
    gradients: [
      {
        name: "Heat Shimmer",
        type: "linear",
        angle: "160deg",
        stops: ["#D4A574", "#C19A6B", "#8B4513"],
        usage: "Hero backdrops, page headers, warm band backgrounds.",
      },
      {
        name: "Oasis Horizon",
        type: "linear",
        angle: "180deg",
        stops: ["#87CEEB", "#F5DEB3", "#D4A574"],
        usage: "Full-bleed hero sections, landing page sky-to-sand zones.",
      },
      {
        name: "Sky Sand Wash",
        type: "radial",
        angle: null,
        stops: ["rgba(135,206,235,0.12)", "rgba(135,206,235,0.0)"],
        usage: "Subtle oasis blue glow behind selected items or focus regions.",
      },
      {
        name: "Desert Dusk",
        type: "linear",
        angle: "180deg",
        stops: ["#EDD9B8", "#D4A574", "#8B4513"],
        usage: "Footer and closing section gradients.",
      },
    ],
  },

  color_rules: [
    "Wheat is the universal background — never swap it for white or cold grey.",
    "The contrast of warm earth and cool sky is sacred — never dilute it.",
    "Shadows and overlays are always warm-tinted umber or brown, never cool grey.",
    "Desert sand is reserved for primary CTAs and key structural emphasis.",
    "Oasis sky signals interactivity: links, focus rings, and cool oasis moments.",
    "Saddle brown anchors text and borders — the backbone of readability.",
    "Neon, electric, or fully-saturated colors are always forbidden.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  fonts: {
    headline: {
      family: "Cinzel",
      weight: [600, 700],
      fallbacks: ["Rockwell", "Georgia", "serif"],
      usage: "Page heroes, section titles, large display headlines.",
      tracking: "0.04em",
      line_height: 1.1,
    },
    display: {
      family: "Cinzel",
      weight: [600],
      fallbacks: ["Rockwell", "Courier New", "serif"],
      usage: "Oversized stat numbers, splash text, bold callouts.",
      tracking: "0.06em",
      line_height: 1.0,
    },
    body: {
      family: "Hind",
      weight: [400, 600],
      fallbacks: ["Source Sans Pro", "system-ui", "sans-serif"],
      usage: "Paragraphs, descriptions, metadata, long-form reading.",
      tracking: "0em",
      line_height: 1.7,
    },
    ui: {
      family: "Quicksand",
      weight: [500, 600],
      fallbacks: ["Quicksand", "Open Sans", "sans-serif"],
      usage: "Buttons, labels, navigation, chips, form inputs.",
      tracking: "0.02em",
      line_height: 1.3,
    },
    mono: {
      family: "IBM Plex Mono",
      weight: [400, 600],
      fallbacks: ["Courier New", "monospace"],
      usage: "Code, tokens, file paths, technical readouts.",
      tracking: "0em",
      line_height: 1.55,
    },
    number: {
      family: "Cinzel",
      weight: [600],
      fallbacks: ["Rockwell", "Georgia", "serif"],
      usage: "Stats, counters, runtimes, dashboard figures.",
      tracking: "0.04em",
      line_height: 1.0,
    },
  },

  typography_rules: [
    "Serif/slab fonts for display and headline — no harsh geometric sans in hero.",
    "Body text is always Hind for comfortable warm reading.",
    "Keep body line-length to 60–72 characters.",
    "Quicksand for UI gives warmth without heaviness.",
    "Avoid pure ALL CAPS except on small UI labels and short button text.",
    "Letter-spacing on display type should be open — the words breathe like desert air.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  shape_language: [
    "Soft rounded rectangles with subtle ripple edges",
    "Horizon-line geometric strip dividers",
    "Wavy dune-pattern border accents",
    "Gently curved oasis-blue inlay strips",
    "Pill tags with soft radius",
  ],

  corner_radius: {
    small: "4px",
    medium: "10px",
    large: "18px",
    xl: "32px",
    pill: "999px",
  },

  borders: {
    thickness: "2px",
    style: "solid",
    rounded: true,
    hand_drawn: false,
    notes:
      "Borders in saddle brown — clean, readable, warm. Subtle ripple-pattern " +
      "accents on featured cards echo dune wind patterns.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  icon_style: ["Outlined", "Soft", "Rounded", "Desert-geometric"],

  icon_rules: [
    "2px stroke weight, saddle brown default color.",
    "Rounded caps and joins — soft, approachable, never harsh.",
    "Single-color by default; oasis blue (sand/sky contrast) for featured icons.",
    "Icon subjects lean desert: dunes, sun, oasis, compass, ripple patterns.",
    "Avoid ultra-thin hairline weights or sharp geometric perfection.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  illustration_style: [
    "Desert landscape minimalism",
    "Soft gradient washes",
    "Ripple and dune pattern textures",
    "Warm ambient glow effects",
  ],

  character_style: {
    proportions: "Graceful, elongated figures — flowing, relaxed, at ease.",
    eyes: "Soft, direct, warm — gentle almond shapes with thin confident outlines.",
    expressions: "Calm confidence, gentle warmth, unhurried ease.",
    clothing: "Desert-inspired: flowing linen, warm earth tones, subtle geometric patterns.",
    outlines: "Confident 2px saddle brown outline; smooth gradient fills, no harsh strokes.",
  },

  mascot: null,

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  photography_style: [
    "Desert landscape photography",
    "Warm earthy color grade",
    "Soft diffused lighting",
    "Wide panoramic framing",
  ],

  photo_rules: [
    "Never use cold or desaturated tones.",
    "Always warm the shadows toward umber — lift the blacks with amber.",
    "Prefer wide landscape shots: low horizon, massive sky, single subject.",
    "Soft ambient glow and heat shimmer as ambient detail.",
    "Portraits should feel sun-warmed, relaxed, unhurried — no studio flash.",
    "Avoid HDR tone-mapping that feels synthetic or over-lit.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  motion_style: ["Smooth", "Dreamlike", "Warm", "Ambient"],

  transitions: [
    "Slow fade dissolve",
    "Heat shimmer wave reveal",
    "Ripple expand from center",
    "Gentle sand-drift slide",
    "Oasis shimmer in (sky blue glow bloom)",
  ],

  animation_speed: "medium-slow",

  easing: ["ease-out", "cubic-bezier(0.25, 0.8, 0.25, 1)", "ease-in-out"],

  microinteractions: {
    hover: "Cards lift 3px with warm umber shadow deepening — like a dune shifting in the wind.",
    button_press: "Subtle compress to 0.97 then smooth ease-out return, no bounce.",
    loading: "Slow-ripple animation with oasis blue shimmer pulse.",
    drag: "Item gains a slight warm amber glow and tilts 2° as it lifts from the sand.",
    focus: "Oasis blue focus ring blooms in over 150ms with a gentle opacity ramp.",
    success: "Brief oasis blue wash + quiet 'settled' scale.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  ui_style: [
    "Wheat surfaces with saddle brown borders",
    "Ripple-pattern desert dividers",
    "Oasis blue interactive elements",
    "Warm, soft rounded corners throughout",
    "Ambient glow effects on key moments",
  ],

  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],

  shadows: {
    sm: "0 1px 3px rgba(92,46,20,0.14)",
    md: "0 4px 12px rgba(92,46,20,0.18)",
    lg: "0 12px 28px rgba(92,46,20,0.22)",
    notes: "All shadows warm umber-tinted. No grey or black shadows anywhere.",
  },

  cards: {
    elevation: "md",
    padding: "20px",
    border_radius: "10px",
    border: "2px solid #8B4513",
    background: "#FAF4E8",
    notes:
      "Pale sand surface, saddle brown border. Optional ripple-pattern " +
      "strip accent along the card top edge at 4px height in oasis blue.",
  },

  buttons: {
    primary:   { bg: "#D4A574", text: "#FAF4E8", radius: "10px", notes: "Desert sand fill, pale sand text, saddle brown border." },
    secondary: { bg: "#87CEEB", text: "#8B4513", radius: "10px", notes: "Oasis sky fill, saddle brown text." },
    danger:    { bg: "#9B3A1A", text: "#FAF4E8", radius: "10px", notes: "Burnt sienna — destructive actions only." },
    ghost:     { bg: "transparent", text: "#8B4513", radius: "10px", notes: "2px saddle brown border, no fill." },
    link:      { bg: "transparent", text: "#87CEEB", radius: "0", notes: "Oasis blue, underline on hover." },
    icon:      { bg: "#FAF4E8", text: "#8B4513", radius: "999px", notes: "Circular pale sand icon button." },
    fab:       { bg: "#D4A574", text: "#FAF4E8", radius: "999px", notes: "Floating desert sand action button." },
  },

  forms: {
    inputs: "Pale sand fill, 2px saddle brown border, 10px radius, 14px padding, Hind text.",
    checkboxes: "Rounded square, oasis blue fill with saddle brown outline when checked.",
    switches: "Pill track in pale sand, oasis blue knob when on, tan dust when off.",
    dropdowns: "Pale sand menu panel, saddle brown border, 10px radius, Quicksand options.",
    validation: "Inline, warm copy; error = burnt sienna, success = oasis green.",
  },

  tables: {
    headers: "Cinzel bold caps on warm sand header row, saddle brown bottom border.",
    hover: "Row warms to warm sand (EDD9B8) on hover.",
    sorting: "Small saddle brown chevron with oasis blue active state.",
    striping: "Alternate rows use warm sand (#EDD9B8).",
  },

  navigation: {
    sidebar: "Wheat panel, rounded-rectangle active pill in desert sand, icon + label in Quicksand.",
    topbar: "Pale sand header with a 4px ripple-pattern strip beneath; brand lockup left, search right.",
    tabs: "Pill tabs on wheat; active tab filled desert sand with pale sand text.",
    breadcrumbs: "Small Quicksand crumbs separated by a small oasis blue diamond glyph.",
  },

  dashboard_style:
    "Wide wheat canvas, Cinzel numerals in desert sand and oasis blue, " +
    "warm earthy stat cards with ripple-strip accent lines, generous horizontal " +
    "breathing room. Never dense.",

  component_styles: {
    dialog: "Centered pale sand card with saddle brown border, night-dune scrim, soft top edge.",
    sidebar: "See navigation.sidebar; collapses to oasis blue icon rail.",
    carousel: "Poster rail with ripple-pattern strips above and below the scroll track.",
    search_bar: "Rounded input with desert sand magnifier icon; placeholder 'Search your horizon…'.",
    media_player: "Dark night-dune control bar; desert sand scrubber thumb; oasis blue buffered track.",
    toast: "Wheat pill toast with saddle brown border sliding up from the bottom, sun icon left.",
    chip: "Pill chip on warm sand, 2px saddle brown outline, oasis sky or tan dust text.",
  },

  layout_patterns: {
    dashboard: "Hero stat row → 3-up earthy metric cards → recent activity rail with poster thumbnails.",
    settings: "Left section nav (oasis blue active) + right form panels, max 760px content width.",
    media_library: "Sticky wheat filter bar → responsive poster grid (auto-fill, 180px min).",
    authentication: "Centered pale sand card on heat-shimmer gradient background with dune silhouette.",
    landing: "Full-bleed hero illustration with oasis horizon gradient → features on wheat → CTA desert sand.",
    detail_view: "Backdrop hero with warm sand grade → poster + metadata → episodes/related on wheat.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY
   * ========================================================================== */

  poster_style:
    "Desert poster feel: Cinzel title in saddle brown, warm painted key art, " +
    "wheat border with a fine saddle brown double-line frame, subtle ripple grain, " +
    "rounded 10px corners.",

  thumbnail_style:
    "10px rounded corners, 2px saddle brown border, warm amber color grade, " +
    "title overlay in Quicksand on a wheat gradient bar at bottom.",

  backdrop_style:
    "Wide cinematic still graded to warm desert dusk: amber highlights, warm umber " +
    "shadows, wide sky gradient from oasis blue to wheat, soft vignette toward edges.",

  media_cards:
    "Poster on top, title in Hind + year in Quicksand below, hover lifts the " +
    "card and reveals a desert sand play pill; running time badge in saddle brown chip.",

  badges: {
    labels: ["4K", "HDR", "Dolby Vision", "Continue Watching", "New", "Favorite", "Download Ready"],
    shape: "Slightly rounded rectangle (4px), 2px saddle brown outline.",
    colors: "Amber dune for quality (4K/HDR), oasis sky for status (New), desert sand for Favorite.",
    typography: "Quicksand, 600 weight, small all-caps.",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  voice: ["Dreamlike", "Warm", "Calm", "Unhurried", "Inviting"],

  tone: ["Welcoming", "Earthy", "Encouraging", "Never salesy"],

  writing_style:
    "Short, smooth sentences — no rush, no jargon. Active voice. Occasional " +
    "desert geography metaphors (horizon, dune, oasis, shimmer, vast). Write the " +
    "way a wise traveler would speak: clear, warm, and unhurried. Never corporate, " +
    "never pushy.",

  vocabulary: [
    "horizon", "dune", "oasis", "shimmer", "vast", "sand", "sun", "warm",
    "still", "quiet", "open", "endless", "promise", "golden", "amber",
  ],

  avoid_words: [
    "leverage", "synergy", "utilize", "disrupt", "cutting-edge", "robust",
    "seamless", "ecosystem", "unlock", "empower", "game-changer",
  ],

  greetings: [
    "Welcome to the horizon. Your library awaits.",
    "Good to see you. The dunes have been quiet.",
    "The horizon stretches wide. What shall we watch?",
    "Your oasis is ready. Pull up a seat.",
  ],

  empty_state_messages: [
    "Nothing on this horizon yet — let's find your first great watch.",
    "The dunes are quiet. Add some titles to fill the view.",
    "No favorites yet. Mark something worth returning to.",
    "Wide open sky. Start exploring to fill the horizon.",
  ],

  notification_style:
    "Calm and direct — like a fellow traveler passing along useful information, " +
    "not a billboard demanding attention. One clear sentence, no exclamation marks.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE
   * ========================================================================== */

  image_prompt_prefix:
    "Desert mirage illustration, warm ochre and amber tones, heat shimmer effect, " +
    "rippling sand dune patterns, oasis blue sky gradient, soft diffused warm light,",

  image_prompt_suffix:
    ", cohesive desert palette (desert sand, tan dust, saddle brown, oasis sky, wheat), " +
    "ripple pattern accents, ambient warm glow, wide open composition, high quality.",

  negative_prompt: [
    "neon", "cyberpunk", "futuristic HUD", "cold blue color grade", "HDR", "lens flare",
    "chrome", "glossy", "dark horror", "minimalist white", "corporate grey",
    "electric colors", "Scandinavian minimal", "sci-fi", "glitch art",
  ],

  ui_generation_rules: [
    "Wheat (#F5DEB3) is the universal page background.",
    "Surface cards use pale sand (#FAF4E8) with a 2px saddle brown border.",
    "Desert sand is the primary CTA color; oasis sky for secondary and focus.",
    "All corners use the design-token radius scale (4px–18px); no sharp 0px corners.",
    "Max content width 1400px; generous horizontal padding.",
    "Max three accent colors per screen view.",
    "Shadows always warm umber-tinted — never grey or black.",
    "Include a ripple-pattern strip accent (4px horizontal) as a section divider.",
  ],

  logo_rules: {
    shape: "Wordmark in Cinzel, optionally paired with a simple dune horizon silhouette badge.",
    complexity: "Clean and legible at small sizes — no more than two visual elements.",
    negative_space: "Generous clear space; the logo breathes like the open desert.",
    colors: "Saddle brown wordmark on wheat, or wheat wordmark on desert sand. Oasis blue inlay accent only.",
    allowed_symbols: ["dune silhouette", "ripple pattern", "sun disc", "horizon line"],
    forbidden_symbols: ["gears", "circuits", "neon halos", "generic play-button triangle alone", "globe"],
  },

  illustration_prompt_template:
    "{prefix} {subject}, in the Desert Mirage style, {mood}, set against the vast " +
    "open desert at midday with heat shimmer {suffix}",

  page_generation_rules: [
    "Hero sections always carry a wide desert landscape illustration or gradient.",
    "Cards are pale sand surfaced with saddle brown borders and optional ripple-strip tops.",
    "Primary CTA buttons are always desert sand, 10px radius, Quicksand bold.",
    "Section dividers use a 4px ripple geometric strip in oasis blue and tan.",
    "Maximum page width 1400px; leading sections open wide with generous sky room.",
    "Footer on wheat background with warm text and a subtle dune silhouette mark.",
  ],

  prompt_library: {
    logo:
      "Design a Desert Mirage logo: Cinzel wordmark in saddle brown on wheat, " +
      "paired with a clean dune horizon silhouette badge, simple, legible, no neon.",
    illustration:
      "{image_prompt_prefix} {subject} {image_prompt_suffix}",
    icon:
      "Desert mirage icon of {subject}, 2px saddle brown stroke, slightly rounded caps, " +
      "soft warm style, oasis blue for active state, single color.",
    background:
      "Warm wheat paper background with subtle ripple grain pattern, faint oasis blue " +
      "gradient wash at the horizon, no neon, no harsh light.",
    landing_page:
      "A Desert Mirage landing page: full-bleed desert hero on heat-shimmer " +
      "gradient, desert sand CTA button, wheat feature sections, pale sand cards " +
      "with saddle brown borders, generous whitespace.",
    dashboard:
      "A spacious desert media dashboard on wheat, Cinzel numerals in " +
      "desert sand, warm earthy stat cards with ripple-strip accents, 10px corners.",
    marketing:
      "A desert mirage social graphic for {topic}: Cinzel headline in saddle brown, " +
      "warm desert illustration, wheat border with saddle brown frame, oasis blue accents.",
  },

  /* ==========================================================================
   * 17. DESIGN TOKENS
   * ========================================================================== */

  design_tokens: {
    color: {
      "--color-primary": "#D4A574",
      "--color-secondary": "#87CEEB",
      "--color-tertiary": "#F5DEB3",
      "--color-neutral": "#C19A6B",
      "--color-bg": "#F5DEB3",
      "--color-surface": "#FAF4E8",
      "--color-surface-alt": "#EDD9B8",
      "--color-text": "#8B4513",
      "--color-success": "#4A9E6B",
      "--color-warning": "#C9872A",
      "--color-error": "#9B3A1A",
      "--color-info": "#5BA4C6",
      "--color-focus": "#87CEEB",
      "--color-border": "#8B4513",
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
      "--radius-md": "10px",
      "--radius-lg": "18px",
      "--radius-xl": "32px",
      "--radius-pill": "999px",
    },
    typography: {
      "--font-headline": "'Cinzel', 'Rockwell', Georgia, serif",
      "--font-display": "'Cinzel', 'Rockwell', Georgia, serif",
      "--font-body": "'Hind', 'Source Sans Pro', system-ui, sans-serif",
      "--font-ui": "'Quicksand', 'Open Sans', sans-serif",
      "--font-mono": "'IBM Plex Mono', 'Courier New', monospace",
    },
    shadow: {
      "--shadow-sm": "0 1px 3px rgba(92,46,20,0.14)",
      "--shadow-md": "0 4px 12px rgba(92,46,20,0.18)",
      "--shadow-lg": "0 12px 28px rgba(92,46,20,0.22)",
    },
  },

  /* ==========================================================================
   * 18. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  responsive_behavior: {
    desktop:
      "Multi-column poster rails, hover lift affordances, ripple-pattern dividers, " +
      "max 1400px content width. Wide sky feeling preserved at every breakpoint.",
    tablet:
      "2–3 column grids, larger touch targets (48px min), " +
      "stacked detail views.",
    tv:
      "10-foot UI: Cinzel numerals at 2× scale, thick saddle brown focus rings (4px), " +
      "poster-forward layout with minimal text density.",
    mobile:
      "Single column, full-width cards, " +
      "full-width poster cards, sticky play bar at bottom on detail view.",
  },

  /* ==========================================================================
   * 19. SOUND IDENTITY
   * ========================================================================== */

  sound_identity: {
    startup_chime: "Soft ambient wind chime — a single warm tone resolving into gentle quiet.",
    notification: "Single soft sand-rustle tap — short, warm, unobtrusive.",
    ui_click: "Warm soft tap — like a finger brushing sand. Short and gentle.",
    success: "Soft ascending two-note phrase, open and warm, like a breeze over dunes.",
    error: "Low soft thud — the sound of sand shifting. Not alarming.",
  },

  /* ==========================================================================
   * 20. SEASONAL VARIANTS
   * ========================================================================== */

  seasonal_variants: [
    {
      name: "Monsoon Mirage",
      active_range: "07-01..09-15",
      overrides: {
        "--color-bg": "#EDD9B8",
        "--color-primary": "#87CEEB",
        "--color-secondary": "#4A9E6B",
      },
      motif:
        "Storm clouds building over the dunes — cooler tones, green appearing, " +
        "the desert receiving rare rain.",
    },
    {
      name: "Golden Dusk",
      active_range: "10-01..11-15",
      overrides: {
        "--color-primary": "#C9872A",
        "--color-tertiary": "#D4A574",
        "--color-bg": "#F0D9A8",
      },
      motif:
        "Deeper, richer amber; long shadows across the dunes; the golden hour " +
        "that lasts all evening.",
    },
    {
      name: "Starlit Sand",
      active_range: "12-01..02-15",
      overrides: {
        "--color-bg": "#EDD9B8",
        "--color-secondary": "#5BA4C6",
        "--color-neutral": "#A07848",
      },
      motif:
        "Cold night desert — deep indigo sky, stars over warm sand, " +
        "the oasis blue glowing against the night.",
    },
  ],

  seasonal_activation: {
    mode: "documented",
    motif_assets: [],
    banner: "The desert is changing — feel the shift in the air.",
  },

  /* ==========================================================================
   * 21. ACCESSIBILITY
   * ========================================================================== */

  accessibility: {
    minimum_contrast: "WCAG AA — 4.5:1 body text, 3:1 large text/UI components. " +
      "Saddle brown on wheat = 6.57:1 (AAA). Oasis sky on wheat = 4.56:1 (AA). " +
      "Desert sand on wheat = 2.91:1 — use only for large text/UI. " +
      "Verify all pairings individually.",
    focus_style: "3px oasis blue focus ring with 2px wheat offset; always fully visible.",
    touch_target: "Minimum 48×48px on mobile; 44×44px minimum on desktop.",
    motion_reduction:
      "Honor prefers-reduced-motion: replace shimmer transitions with simple opacity fades.",
    font_scaling: "All layouts must survive 200% browser text zoom without horizontal overflow or clipped text.",
  },

  /* ==========================================================================
   * 22. DO / DON'T
   * ========================================================================== */

  do_dont: {
    colors: {
      do: [
        "Use wheat as the universal page background",
        "Reserve desert sand for the single primary CTA per view",
        "Use oasis sky for all interactive affordances and focus rings",
        "Use saddle brown for text and borders",
      ],
      dont: [
        "Use white, off-white, or cold grey as a background",
        "Use neon, electric, or fully-saturated accent colors",
        "Use cool-grey or black shadows",
        "Use oasis sky for large area backgrounds — it should be an accent, not a field",
      ],
      reason:
        "The warm earth and cool sky contrast is the identity — diluting it destroys the mirage effect.",
    },
    typography: {
      do: [
        "Use Cinzel for page heroes and major section headings",
        "Use Hind for all body reading",
        "Use Quicksand for UI elements and buttons",
      ],
      dont: [
        "Use geometric sans-serif (Inter, Futura) for display type",
        "Use italic headlines — weight contrast is preferred",
        "Mix more than two type families in a single section",
      ],
      reason:
        "Cinzel and Hind carry the elegant, timeless desert character.",
    },
    layout: {
      do: [
        "Give every section generous horizontal breathing room",
        "Use wide panoramic framing in hero areas",
        "Include a ripple-pattern strip as a section divider",
      ],
      dont: [
        "Cram content or exceed the 1400px max content width",
        "Use tight dense dashboards without whitespace relief",
        "Stack too many accent patterns — restraint is the rule",
      ],
      reason:
        "The desert's defining quality is space — layouts must echo that openness.",
    },
    animation: {
      do: [
        "Keep motion smooth and dreamlike — ease-out, no spring bounce",
        "Respect prefers-reduced-motion with simple opacity fades",
        "Use heat shimmer effects for peak moments only",
      ],
      dont: [
        "Use fast springy or elastic animations",
        "Animate multiple elements simultaneously",
        "Use abrupt linear motion",
      ],
      reason: "Everything in the desert moves with unhurried grace — so should the interface.",
    },
    imagery: {
      do: [
        "Use warm earth-tone desert illustrations with ambient glow",
        "Use wide panoramic framing with low horizon lines",
        "Always grade photography to warm amber tones",
      ],
      dont: [
        "Use cool or desaturated photos",
        "Use harsh industrial imagery",
        "Use imagery that reads as urban, corporate, or futuristic",
      ],
      reason: "Imagery must reinforce the warm, open, dreamlike identity.",
    },
    branding: {
      do: [
        "Keep the dune/horizon mark and Cinzel wordmark as the only logo forms",
        "Use approved signature elements (dunes, ripples, horizon, sun disc)",
      ],
      dont: [
        "Add circuits, globes, or generic tech iconography",
        "Stretch, recolor, or add effects to the logo lockup",
        "Use the logo at sizes below 24px without the icon-only form",
      ],
      reason: "Consistency across desert motifs makes the brand instantly recognizable.",
    },
    icons: {
      do: [
        "Use 2px saddle-brown stroke, rounded, soft outlined icons",
        "Use desert-themed subjects where category allows",
      ],
      dont: [
        "Use hairline-weight or geometrically perfect icon sets",
        "Use filled icons as the default state",
      ],
      reason: "The soft rounded style is load-bearing — it distinguishes this brand.",
    },
    copywriting: {
      do: [
        "Write short, unhurried sentences with active voice",
        "Use geography metaphors sparingly (horizon, dune, oasis, shimmer)",
        "Speak like a wise traveler, not a salesperson",
      ],
      dont: [
        "Use corporate jargon or tech buzzwords",
        "Use exclamation marks in non-celebratory contexts",
        "Be pushy or create artificial urgency",
      ],
      reason: "The voice must feel as unhurried and genuine as the visual identity.",
    },
    ux: {
      do: [
        "Surface the play action prominently on every media card",
        "Keep navigation landmarks visible and simple",
        "Allow the user to rest — not every screen needs a call to action",
      ],
      dont: [
        "Hide primary actions behind ambiguous icons",
        "Add friction or multi-step flows to reach playback",
        "Overwhelm with badges, notifications, or popups",
      ],
      reason: "Getting to 'play' should feel as natural as watching the horizon.",
    },
    performance: {
      do: [
        "Lazy-load poster images with a wheat placeholder",
        "Compress and cache all texture and gradient assets",
        "Use SVG for ripple-pattern strip dividers",
      ],
      dont: [
        "Ship unoptimized full-resolution hero illustrations",
        "Embed heavy texture layers as raster in CSS",
      ],
      reason: "Warmth and openness shouldn't cost a slow experience.",
    },
  },

  /* ==========================================================================
   * 23. SITE ARCHITECTURE
   * ========================================================================== */

  site_architecture: {
    nav: [
      { id: "home",     label: "Home",     emphasis: "default" },
      { id: "features", label: "Features", emphasis: "default" },
      { id: "clients",  label: "Clients",  emphasis: "default" },
      { id: "download", label: "Download", emphasis: "primary" },
      { id: "plugins",  label: "Plugins",  emphasis: "default" },
      { id: "docs",     label: "Docs",     emphasis: "default" },
      { id: "hub",      label: "Hub",      emphasis: "default" },
      { id: "about",    label: "About",    emphasis: "default" },
    ],
    demoted_pages: [],
    extra_pages: [],
    footer_arrangement: "standard",
  },
};

export default brandKit;
