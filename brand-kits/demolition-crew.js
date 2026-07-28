/**
 * ============================================================================
 *  PHLIX BRAND KIT  —  Demolition Crew   (BASE kit)
 * ============================================================================
 *
 *  "Demolition Crew"
 *  -----------------
 *  Wrecking ball approach — smashing through boring interfaces. Debris
 *  particles cascade across the screen, concrete textures crack and crumble,
 *  crane hooks swing into view, and explosive bursts radiate from CTAs.
 *  The defining twist: "Demo Mode" that temporarily destroys the UI, then
 *  rebuilds it with a collapse-reveal animation. This is the Outlaw
 *  archetype — bold, destructive, revolutionary. Every surface looks like
 *  it was blast-tested. The experience is fully immersive.
 *
 *  Palette: #FF3838 #FFD93D #6C5CE7 #2D3436 #00CEC9
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY
   * ========================================================================== */

  name: "Demolition Crew",

  slug: "demolition-crew",

  version: "1.0",

  description:
    "Demolition Crew turns media servers into a controlled explosion — " +
    "debris particles cascade across every screen, concrete textures crack " +
    "underfoot, crane hooks swing through the hero, and explosive bursts " +
    "mark every call to action. The signature twist is Demo Mode: a " +
    "toggle that briefly destroys the UI in a rubble cascade, then " +
    "rebuilds it with a dramatic collapse-reveal. It is bold, loud, and " +
    "unapologetically aggressive — the Outlaw archetype made interface.",

  inspiration: [
    "Demolition site photography — exposed concrete, twisted rebar, dust clouds",
    "Controlled blast photography — explosion freeze-frames with debris suspended",
    "Wrecking ball slow-motion video — the moment of impact",
    "Industrial hazard signage — bold, high-contrast warning systems",
    "Graffiti on construction walls — raw, urban, rebellious",
    "Bulldozer and excavator machinery close-ups",
    "Crumbling building facades with dramatic lighting",
    "Rubble pile macro photography — texture and angular fragments",
    "Urban decay meets neon — contrast of destruction and light",
    "Stunt explosion sequences from action movies",
  ],

  keywords: [
    "demolition", "wrecking", "crane", "crash", "debris", "rubble", "concrete",
    "explosion", "blast", "burst", "crumble", "smash", "destroy", "outlaw",
    "rebel", "revolutionary", "bold", "aggressive", "industrial", "urban",
    "construction", "wrecking-ball", "tnt", "dynamite", "dust-cloud",
    "debris-field", "concrete-texture", "crane-hook", "blast-wave",
    "rubble-physics", "collapse", "tilt", "shake", "rumble", "impact",
    "controlled-blast", "demolition-crew", "explosive", "kinetic",
    "heavy-machinery", "building-crumble", "dust-particles",
  ],

  /* ==========================================================================
   * 2. PERSONALITY
   * ========================================================================== */

  personality: ["Bold", "Aggressive", "Rebellious", "Kinetic", "Unapologetic", "Powerful"],

  emotional_goals: [
    "Excitement",
    "Immersion",
    "Thrill",
    "Revolution",
    "Empowerment",
    "Captivation",
  ],

  archetype: "Outlaw",

  audience: [
    "Action and demolition enthusiasts",
    "Users who want power and control over their media",
    "Dark-mode lovers who want bold, aggressive aesthetics",
    "Gamers and power users",
    "Viewers who want their media server to feel like a force of nature",
  ],

  /* ==========================================================================
   * 3. BRAND STORY
   * ========================================================================== */

  story:
    "Every great media server tears down barriers. Demolition Crew was " +
    "born from the idea that organizing your library should feel like a " +
    "controlled explosion — powerful, precise, and deeply satisfying. " +
    "From the first debris particle cascading across the hero, to the " +
    "crane hook swing that marks the features section, to the rubble " +
    "physics of Demo Mode tearing apart the UI, Phlix through Demolition " +
    "Crew is a media server that doesn't apologize for being loud. Your " +
    "library isn't just organized — it's demolished and rebuilt on your " +
    "terms.",

  tagline_primary: "Stream Demolished.",

  tagline_secondary: [
    "Your library, wrecked and rebuilt.",
    "Where content hits harder.",
    "Controlled blast. Total control.",
    "Feel every impact.",
  ],

  mission:
    "Deliver a streaming experience so visually powerful that watching " +
    "anything on Phlix feels like a controlled demolition — precise, " +
    "powerful, and deeply satisfying.",

  values: ["Power", "Control", "Boldness", "Revolution", "Precision"],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES
   * ========================================================================== */

  brand_dna:
    "Demolition Crew is controlled chaos made interface — #FF3838 " +
    "(signal red) cutting through #2D3436 (concrete dark), yellow " +
    "warning accents in #FFD93D, purple blast halos in #6C5CE7, and " +
    "cyan sparks in #00CEC9. Debris particles cascade downward, crane " +
    "hooks swing into view, and explosive bursts radiate from CTAs. " +
    "Demo Mode is the signature twist: the UI physically crumbles, " +
    "rubble falls, then everything reconstructs. It is never clean, " +
    "never still, never corporate.",

  design_principles: [
    "Every screen is a demolition site — dark concrete background, explosive accents at the focal point.",
    "Debris particles are the ever-present ambient motion: angular fragments cascading downward.",
    "Crane hook motifs mark major sections — a swinging industrial weight.",
    "Explosive burst animations (CSS radial gradients + scale) radiate from CTAs on hover.",
    "Concrete textures on surfaces — noise grain, layered, industrial.",
    "One primary red CTA per screen — the single loudest point of impact.",
    "Demo Mode: toggle triggers full UI rubble cascade, 800ms destruction, 1200ms rebuild.",
    "Shadows carry deep industrial undertone — never bright or pastel.",
    "Cards and panels have rough, blast-edge borders — not clean die-cut.",
    "Shake and rumble on key interactions — CSS transform jitter on hover.",
  ],

  brand_opposites: [
    "Not clean or minimalist",
    "Not still or static",
    "Not soft or pastel",
    "Not corporate or sterile",
    "Not gentle or calm",
    "Not muted or desaturated",
    "Not precise or tidy",
  ],

  signature_elements: [
    "Cascading debris particle fields (angular fragments, not round)",
    "Crane hook swing motifs at section transitions",
    "Explosive burst radial gradients on CTA hover",
    "Concrete texture overlays (CSS noise + grain)",
    "Rubble physics on Demo Mode destruction/rebuild",
    "Blast-edge borders on cards and panels (irregular, angular)",
    "Dust cloud CSS radial gradients as ambient atmosphere",
    "TNT/dynamite stripe accent dividers (yellow/black hazard stripes)",
    "Shake/rattle hover micro-interactions",
  ],

  header_motif: "Blast-header — a dark concrete bar with crane hook SVG animation, debris particles falling from top edge, and hazard stripe accent",

  /* ==========================================================================
   * 5. VISUAL IDENTITY
   * ========================================================================== */

  visual_style: [
    "Industrial demolition",
    "High contrast",
    "Explosion-saturated",
    "Debris-rich",
    "Concrete-textured",
    "Blast-edge",
  ],

  art_direction:
    "Artwork should feel like a controlled blast caught mid-detonation: " +
    "Concrete Dark (#2D3436) fills the canvas, and Signal Red (#FF3838) " +
    "and Hazard Yellow (#FFD93D) cut through with the intensity of an " +
    "explosion. Surfaces have rough, blast-cut edges that feel raw and " +
    "industrial — not clean die-cut. Lighting is always explosive: " +
    "burst halos, dust radiance, blast flash. Compositions are " +
    "aggressive and diagonal — debris flies outward, hooks swing down, " +
    "particles scatter. Illustration style leans toward bold graphic " +
    "blast art with dust-cloud overlays: flat red/yellow shapes with " +
    "an explosive glow filter, angular ragged edges, and a continuous " +
    "debris-particle field falling downward. Avoid anything that feels " +
    "clean, soft, or corporate.",
  realism: "illustrated",

  rendering_style: ["vector", "flat with blast glow", "dust cloud overlay", "angular edge treatment"],

  texture_level: "high",

  depth: "layered",

  lighting: {
    temperature: "neutral-warm",
    quality: "explosive burst — red-core, yellow-edged, dust scatter",
    shadows: "hard",
    contrast: "very high",
    notes: "All light sources are explosive: blast flash, dust radiance, burst core. No daylight, no cool fill, no neutral bounce.",
  },

  composition: [
    "Diagonal aggression — debris scatter reads outward from focal point",
    "Strong foreground blast-frame silhouette",
    "Asymmetric — explosion mass on one side, open concrete on the other",
    "Vertical heroics for key blast art (wrecking ball, crane hook, explosion column)",
    "Dust cloud radial glow on featured/trending content — the demo twist",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM
   * ========================================================================== */

  colors: {
    primary: {
      name: "Signal Red",
      hex: "#FF3838",
      rgb: "rgb(255, 56, 56)",
      hsl: "hsl(0, 100%, 61%)",
      usage: "Primary CTAs, active states, focus rings, blast accents.",
      contrast_targets: ["concrete_dark", "concrete_surface"],
    },
    secondary: {
      name: "Hazard Yellow",
      hex: "#FFD93D",
      rgb: "rgb(255, 217, 61)",
      hsl: "hsl(51, 100%, 62%)",
      usage: "Warning stripes, hazard accents, secondary highlights.",
      contrast_targets: ["concrete_dark", "blast_purple"],
    },
    tertiary: {
      name: "Blast Purple",
      hex: "#6C5CE7",
      rgb: "rgb(108, 92, 231)",
      hsl: "hsl(248, 76%, 63%)",
      usage: "Blast halos, purple accents, ambient glow on featured content.",
      contrast_targets: ["concrete_dark", "concrete_surface"],
    },
    neutral: {
      name: "Concrete Gray",
      hex: "#636E72",
      rgb: "rgb(99, 110, 114)",
      hsl: "hsl(200, 7%, 42%)",
      usage: "Muted UI chrome, secondary text on dark surfaces, dividers.",
      contrast_targets: ["concrete_dark"],
    },
    background: {
      name: "Concrete Dark",
      hex: "#2D3436",
      rgb: "rgb(45, 52, 54)",
      hsl: "hsl(200, 9%, 19%)",
      usage: "Default page background — industrial concrete dark.",
      contrast_targets: ["signal_red", "hazard_yellow", "concrete_gray"],
    },
    surface: {
      name: "Concrete Surface",
      hex: "#3D4449",
      rgb: "rgb(61, 68, 73)",
      hsl: "hsl(200, 9%, 26%)",
      usage: "Card and panel surfaces — one visible concrete-dark step above background.",
      contrast_targets: ["signal_red", "concrete_gray"],
    },
    surface_alt: {
      name: "Blast Surface",
      hex: "#4A5157",
      rgb: "rgb(74, 81, 87)",
      hsl: "hsl(200, 8%, 32%)",
      usage: "Alternate surface for striped rows, nested panels, hover states.",
      contrast_targets: ["signal_red", "hazard_yellow"],
    },
    text: {
      name: "Blast White",
      hex: "#F5F5F5",
      rgb: "rgb(245, 245, 245)",
      hsl: "hsl(0, 0%, 96%)",
      usage: "Primary body and headline text — near-white, never pure #FFF.",
      contrast_targets: ["concrete_dark", "concrete_surface"],
    },
    success: {
      name: "Spark Cyan",
      hex: "#00CEC9",
      rgb: "rgb(0, 206, 201)",
      hsl: "hsl(179, 100%, 40%)",
      usage: "Success states, confirmations, 'added' toasts — electric cyan sparks.",
      contrast_targets: ["concrete_dark", "concrete_surface"],
    },
    warning: {
      name: "Warning Orange",
      hex: "#E17055",
      rgb: "rgb(225, 112, 85)",
      hsl: "hsl(14, 74%, 61%)",
      usage: "Warnings, caution states, degraded-quality indicators.",
      contrast_targets: ["concrete_dark", "concrete_surface"],
    },
    error: {
      name: "Crimson",
      hex: "#D63031",
      rgb: "rgb(214, 48, 49)",
      hsl: "hsl(1, 74%, 51%)",
      usage: "Errors, destructive actions, critical failed states.",
      contrast_targets: ["blast_white", "concrete_dark"],
    },
    info: {
      name: "Steel Blue",
      hex: "#4A5157",
      rgb: "rgb(74, 81, 87)",
      hsl: "hsl(200, 8%, 32%)",
      usage: "Informational banners — industrial dark, used sparingly.",
      contrast_targets: ["blast_white"],
    },
    focus: {
      name: "Focus Ring",
      hex: "#FF3838",
      rgb: "rgb(255, 56, 56)",
      hsl: "hsl(0, 100%, 61%)",
      usage: "Keyboard-focus ring (Signal Red, 2px, paired with offset).",
      contrast_targets: ["concrete_dark", "concrete_surface"],
    },
    border: {
      name: "Blast Edge",
      hex: "#4A5157",
      rgb: "rgb(74, 81, 87)",
      hsl: "hsl(200, 8%, 32%)",
      usage: "Card/divider borders — rough blast-cut edge feel.",
      contrast_targets: ["signal_red"],
    },
    shadow: {
      name: "Blast Shadow",
      hex: "#1a1e20",
      rgb: "rgba(26, 30, 32, 0.70)",
      hsl: "hsl(200, 9%, 11%)",
      usage: "Drop shadows tinted deep concrete — industrial and heavy, never cool.",
      contrast_targets: [],
    },
    overlay: {
      name: "Dust Scrim",
      hex: "#1a1e20",
      rgb: "rgba(26, 30, 32, 0.85)",
      hsl: "hsl(200, 9%, 11%)",
      usage: "Modal/drawer overlays — near-opaque concrete-dark with dust undertone.",
      contrast_targets: [],
    },
    gradients: [
      {
        name: "Blast Column",
        type: "linear",
        angle: "135deg",
        stops: ["#FF3838", "#6C5CE7", "#00CEC9"],
        usage: "Hero section highlights, CTA halos, blast-stripe dividers.",
      },
      {
        name: "Debris Dust",
        type: "radial",
        angle: null,
        stops: ["rgba(45,52,54,0.0)", "rgba(45,52,54,0.8)"],
        usage: "Ambient dust cloud at viewport bottom — atmospheric depth.",
      },
      {
        name: "Explosive Burst",
        type: "radial",
        angle: null,
        stops: ["rgba(255,56,56,0.4)", "rgba(108,92,231,0.2)", "rgba(0,206,201,0.0)"],
        usage: "CTA hover burst — the explosive glow halo.",
      },
      {
        name: "Hazard Stripe",
        type: "linear",
        angle: "45deg",
        stops: ["#FFD93D", "#2D3436", "#FFD93D", "#2D3436", "#FFD93D"],
        usage: "TNT/dynamite hazard stripe dividers — industrial warning feel.",
      },
      {
        name: "Concrete Surface",
        type: "linear",
        angle: "180deg",
        stops: ["#2D3436", "#3D4449"],
        usage: "Subtle vertical gradient for page backgrounds — depth without flatness.",
      },
      {
        name: "Blast Purple Halo",
        type: "radial",
        angle: null,
        stops: ["rgba(108,92,231,0.5)", "rgba(255,56,56,0.0)"],
        usage: "Featured/trending content glow — the demo twist: purple blast halo.",
      },
    ],
  },

  color_rules: [
    "Backgrounds are always Concrete Dark or Concrete Surface — never light or pastel.",
    "Signal Red is the single loudest point: one primary CTA per screen in #FF3838.",
    "Hazard Yellow is reserved for warning stripes and hazard accents — not background fill.",
    "Blast Purple is for ambient glow halos on featured content — the demo twist marker.",
    "Cards and panels have rough, angular blast-cut borders — not clean die-cut.",
    "Shadows carry deep concrete undertones — never cool grey or pure black (#000).",
    "Maximum three accent colors in any composition (Red + Yellow + Purple or Cyan).",
    "Crimson reserved for errors and destructive actions only.",
    "Spark Cyan for success states — electric contrast against the dark palette.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  fonts: {
    headline: {
      family: "Russo One",
      weight: [400],
      fallbacks: ["Impact", "sans-serif"],
      usage: "Industrial impact headlines, bold demolition titles.",
      tracking: "0.04em",
      line_height: 0.92,
    },
    display: {
      family: "Teko",
      weight: [500, 600, 700],
      fallbacks: ["Oswald", "Impact", "sans-serif"],
      usage: "Oversized stat figures, big feature callouts, section labels.",
      tracking: "0.02em",
      line_height: 0.90,
    },
    body: {
      family: "Exo 2",
      weight: [400, 500, 600],
      fallbacks: ["Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      usage: "Paragraphs, descriptions, long-form reading.",
      tracking: "0.01em",
      line_height: 1.55,
    },
    ui: {
      family: "Exo 2",
      weight: [500, 600, 700],
      fallbacks: ["Roboto", "system-ui", "sans-serif"],
      usage: "Buttons, nav labels, form labels, chips, badges.",
      tracking: "0.03em",
      line_height: 1.2,
    },
    mono: {
      family: "Share Tech Mono",
      weight: [400],
      fallbacks: ["Fira Mono", "Courier New", "monospace"],
      usage: "Code blocks, technical readouts, file paths, timestamps.",
      tracking: "0em",
      line_height: 1.5,
    },
    number: {
      family: "Teko",
      weight: [600],
      fallbacks: ["Oswald", "sans-serif"],
      usage: "Runtime clocks, episode counts, dashboard figures, quality badges.",
      tracking: "0.03em",
      line_height: 1.0,
    },
  },

  typography_rules: [
    "Headlines use Russo One — industrial, blocky, all caps or title case.",
    "Never use light-weight fonts (100–300) on dark backgrounds.",
    "Body text must be at least 15px on dark surfaces for legibility.",
    "Use Exo 2 for body and Teko for display headlines.",
    "Avoid decorative script fonts — this brand is stamped and bold, not elegant.",
    "All caps for section labels and UI categories — industrial stencil feel.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  shape_language: [
    "Angular blast-cut edges — slightly irregular, sharp corners",
    "No rounded corners on primary elements — all sharp industrial cuts",
    "Diagonal hazard stripe accent lines",
    "Ragged/blast-cut card perimeter — achieved with clip-path polygon",
    "Debris fragment shapes — irregular angular polygons, not circles",
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
    notes: "Borders are #4A5157 — rough concrete, not clean. Cards get a clip-path polygon to simulate angular blast-cut edge rather than a hard line.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  icon_style: ["Filled", "Bold stroke", "Industrial red tone"],

  icon_rules: [
    "3px stroke weight, filled preferred for active/featured icons.",
    "Single-color Signal Red for active/featured; Concrete Gray for default.",
    "Angular, industrial — no soft rounded corners.",
    "Never thin hairline icons — weight conveys the brand's power.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  illustration_style: [
    "Bold blast graphic art",
    "Flat vector with explosive glow overlays",
    "Dust cloud filter effect",
    "Angular edge treatment on shapes",
    "Debris field integration — angular fragments, not round particles",
  ],

  character_style: {
    proportions: "Dynamic and powerful — slightly stylized, bold blocky shapes.",
    eyes: "Intense, determined — catching blast light.",
    expressions: "Bold, fierce, excited.",
    clothing: "Industrial workwear — hard hat, high-vis vest, work boots.",
    outlines: "Bold dark outlines — no thin lines.",
  },

  mascot: null,

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  photography_style: [
    "Demolition and blast photography",
    "Concrete texture macro shots",
    "Low-key with red key light",
    "High contrast industrial grade",
    "Debris and dust atmosphere",
  ],

  photo_rules: [
    "Never use daylight or cool-toned photography.",
    "All light sources are explosive: blast flash, dust radiance, burst core.",
    "Strong industrial grade: crush blues, push reds and yellows.",
    "Include debris/dust atmosphere where possible.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  motion_style: ["Explosive", "Cascading", "Shaking", "Blasting", "Kinetic"],

  transitions: [
    "Blast-reveal — content explodes in from center (radial scale + opacity)",
    "Debris fall — elements cascade down with gravity physics (CSS keyframes)",
    "Blast burst — keyframe scale pulse from 0.8 to 1.05 on CTA hover",
    "Shake-rattle — subtle transform jitter on interactive hover",
    "Collapse-rebuild — Demo Mode destroys UI, rubble falls, then reconstructs",
    "Dust cloud — radial gradient fade in/out on section transitions",
    "Crane swing — hook SVG pendulum animation at section starts",
  ],

  animation_speed: "fast",

  easing: ["ease-out", "cubic-bezier(0.22, 1, 0.36, 1)", "ease-in", "cubic-bezier(0.6, 0, 0.9, 1)"],

  microinteractions: {
    hover: "Cards get a 1px red border glow and 3px lift with shake jitter; debris particles briefly scatter.",
    button_press: "Quick scale to 0.94, then explosive spring back with burst glow.",
    loading: "Blast ring progress indicator in Signal Red with dust scatter.",
    drag: "Item leaves a brief debris trail — angular fragments.",
    focus: "Signal Red 2px ring with a 200ms blast-pulse animation.",
    success: "A brief burst of 3–4 cyan sparks from the element + dust cloud.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  ui_style: [
    "Dark concrete surfaces",
    "Angular blast-edge cards",
    "Signal Red primary accents",
    "Debris particle ambient motion",
    "Explosive burst on interactive elements",
  ],

  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],

  shadows: {
    sm: "0 2px 4px rgba(26,30,32,0.6)",
    md: "0 4px 12px rgba(26,30,32,0.7), 0 0 0 1px rgba(255,56,56,0.05)",
    lg: "0 12px 32px rgba(26,30,32,0.8), 0 0 0 1px rgba(255,56,56,0.08)",
    blast_glow: "0 0 20px rgba(255,56,56,0.4), 0 0 40px rgba(108,92,231,0.2)",
    glow_cyan: "0 0 20px rgba(0,206,201,0.5), 0 0 40px rgba(0,206,201,0.2)",
    notes: "Shadows carry deep concrete darkness. The 'blast_glow' token is for active/featured elements; 'glow_cyan' is for success states.",
  },

  cards: {
    elevation: "md",
    padding: "16px",
    border_radius: "6px",
    border: "1px solid #4A5157",
    background: "#3D4449",
    clip_path: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
    notes: "Angular blast-cut surface with rough border and clip-path polygon. Featured cards get the purple blast glow halo.",
  },

  buttons: {
    primary:   { bg: "#FF3838", text: "#F5F5F5", radius: "4px", notes: "Signal Red fill, light text, bold Exo 2 700. THE primary blast point." },
    secondary: { bg: "transparent", text: "#FF3838", radius: "4px", notes: "1px Signal Red border, red text — a blast outline button." },
    danger:    { bg: "#D63031", text: "#F5F5F5", radius: "4px", notes: "Crimson for destructive actions." },
    ghost:     { bg: "transparent", text: "#636E72", radius: "4px", notes: "Concrete Gray text, no border — low-priority actions." },
    link:      { bg: "transparent", text: "#FFD93D", radius: "0", notes: "Yellow underline on hover; inline in body copy only." },
    icon:      { bg: "#4A5157", text: "#636E72", radius: "4px", notes: "Blast Surface icon button; active state flips to Signal Red icon." },
    fab:       { bg: "#FF3838", text: "#F5F5F5", radius: "4px", notes: "Square floating action button with blast_glow shadow — NO rounded FAB in this brand." },
  },

  forms: {
    inputs: "Concrete Surface fill (#3D4449), 1px blast-edge border, 4px radius, 12px padding. Focus border shifts to Signal Red with blast glow.",
    checkboxes: "Square, Signal Red check, 150ms fill animation with slight scale.",
    switches: "Square track in Blast Surface, dark knob, glows Signal Red when on.",
    dropdowns: "Dark dropdown on Concrete Surface with blast border; active option highlighted in Blast Surface.",
    validation: "Inline below field; error = Crimson, success = Spark Cyan, copy is direct and brief.",
  },

  tables: {
    headers: "Russo One ALL CAPS on Blast Surface header row, Concrete Gray text.",
    hover: "Row surface shifts to #4A5157 with a Signal Red left border accent.",
    sorting: "Small angular chevron in Signal Red.",
    striping: "Alternate rows use surface_alt (Blast Surface #4A5157).",
  },

  navigation: {
    sidebar: "Concrete Dark panel, active item on Concrete Surface with left Signal Red 3px indicator bar.",
    topbar: "Concrete Dark bar with a bottom hazard-yellow hairline; brand mark left, links center.",
    tabs: "Square tabs; active tab filled in Signal Red with light text.",
    breadcrumbs: "Small Exo 2 crumbs in Concrete Gray, separated by a blast chevron (») in Signal Red.",
  },

  dashboard_style:
    "Dark concrete canvas with Concrete Surface stat cards in an asymmetric grid. " +
    "Big Teko numerals in Blast White. Cyan sparklines. " +
    "A single Signal Red hero metric per row burns bright. Dense but " +
    "breathable — 24px gaps between cards. Featured stats get the " +
    "purple blast glow.",

  component_styles: {
    dialog: "Centered Concrete Surface modal with angular border and a top 2px Signal Red highlight strip. Dust scrim behind.",
    sidebar: "See navigation.sidebar; collapses to 48px icon rail with Signal Red active dot.",
    carousel: "Poster rail with Blast Surface track and Signal Red scrollbar thumb.",
    search_bar: "Rectangular Concrete Surface input, blast border, Exo 2 placeholder 'Search the rubble…'; search icon in Hazard Yellow.",
    media_player: "Full-dark control bar; Signal Red scrubber and progress fill; icon buttons in Concrete Gray, active in Blast White.",
    toast: "Square toast sliding up from bottom; Crimson left border stripe for errors, Spark Cyan for success; Blast White text.",
    chip: "Square chip on Blast Surface with blast border; active chip fills with Signal Red.",
    demo_mode_toggle: "Large toggle switch with Hazard Yellow when armed, Spark Cyan when active. Label: 'DEMO MODE — DO NOT PRESS' in Russo One.",
  },

  layout_patterns: {
    dashboard: "Blast hero banner → 4-up stat cards → recent activity table → trending rail with purple glow.",
    settings: "Left section nav with Signal Red active indicator → right form panels, max-width 800px.",
    media_library: "Sticky dark filter bar → auto-fill poster grid on Concrete Dark, trending row gets purple blast glow.",
    authentication: "Full-bleed concrete dark with blast-glow radial behind a centered Concrete Surface card.",
    landing: "Full-bleed blast-hero with debris particle field → feature pillars → social proof → Signal Red CTA section.",
    detail_view: "Backdrop hero with dust cloud → poster left + metadata right → episode/related rails, trending gets the purple blast glow.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY
   * ========================================================================== */

  poster_style:
    "Bold one-sheet: Concrete Dark background, Russo One title in Blast White, " +
    "bold blast-key-art with debris-particle overlay, angular ragged border edge.",

  thumbnail_style:
    "6px radius with clip-path angular cut, blast border, warm red color grade, title overlay " +
    "in Exo 2 on a bottom-anchored Concrete Dark gradient.",

  backdrop_style:
    "Wide cinematic still, heavy industrial grade, strong vignette from all edges " +
    "toward center, subtle dust-particle texture overlay at 8% opacity, " +
    "blast glow filter on the hero zone.",

  media_cards:
    "Poster fills top two-thirds, Concrete Surface lower third holds title in Exo 2 " +
    "and runtime in Concrete Gray. Hover lifts card 3px, adds Signal Red " +
    "border glow with shake jitter, and reveals a Signal Red play button. " +
    "TRENDING cards get the purple blast glow halo around the poster.",

  badges: {
    labels: ["4K", "HDR", "Continue Watching", "New", "Trending"],
    shape: "Square, 2px radius, blast-cut corners.",
    colors: "Cyan for quality (4K/HDR), Signal Red for status (New), Hazard Yellow for Trending.",
    typography: "Exo 2 700, small caps, 10–11px.",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  voice: ["Bold", "Aggressive", "Powerful", "Kinetic", "Confident"],

  tone: ["Explosive", "Urgent", "Powerful", "Raw", "Punchy"],

  writing_style:
    "Short punchy sentences that hit like a controlled blast. Active voice, always. " +
    "Blast and demolition metaphors (demolish, blast, wreck, crumble, smash, blow, " +
    "rubble, debris, impact, explode, dynamite, wrecking ball). " +
    "No hedging, no corporate softness, no filler. If it needs five words, use five.",

  vocabulary: [
    "demolish", "blast", "wreck", "crumble", "smash", "blow", "rubble",
    "debris", "impact", "explode", "dynamite", "wrecking-ball", "crane",
    "tnt", "controlled", "precision", "power", "kinetic", "seismic",
    "obliterate", "shatter", "detonate", "scrap", "raze", "flatten",
  ],

  avoid_words: [
    "cozy", "gentle", "calm", "quiet", "subtle", "soft", "delicate",
    "leverage", "synergy", "utilize", "seamless", "journey", "ecosystem",
    "elegant", "refined", "polished", "minimal", "graceful",
  ],

  greetings: [
    "Ready to demolish.",
    "Time to wreck some libraries.",
    "The crew is here.",
    "Blow it all up.",
  ],

  empty_state_messages: [
    "Nothing's been demolished yet — add something to blast it open.",
    "No rubble here yet. Drop the first brick.",
    "The ashes are cold. Light the fuse.",
  ],

  notification_style: "Bold and direct — one punchy sentence, no fluff, no apologies.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE
   * ========================================================================== */

  image_prompt_prefix:
    "Bold blast graphic art, Concrete Dark background with Signal Red and Hazard Yellow " +
    "explosion shapes, debris particles falling, angular blast-cut card borders, " +
    "dust cloud overlay, cinematic blast atmosphere,",

  image_prompt_suffix:
    ", industrial red/yellow color grade, dark background, very high contrast blast, " +
    "kinetic energy, debris atmosphere, bold graphic style, angular shapes.",

  negative_prompt: [
    "pastel", "soft", "cool tones", "blue sky", "water", "ice",
    "peaceful", "gentle", "warm cream", "light background", "minimalist",
    "flat gray", "corporate", "cute", "rounded", "smooth corners",
    "clean lines", "tidy",
  ],

  ui_generation_rules: [
    "Background is always Concrete Dark (#2D3436) or Concrete Surface (#3D4449).",
    "Primary CTA is always Signal Red (#FF3838) — exactly one per screen.",
    "Cards have angular blast-cut borders — not clean hard lines, use clip-path polygon.",
    "Text is Blast White (#F5F5F5) on dark; never pure white (#FFF).",
    "Shadows carry deep concrete undertones — never cool grey.",
    "Use the spacing scale; minimum 24px gap between major sections.",
    "TRENDING/FEATURED content gets a purple blast glow halo — the demo twist.",
    "All corners are sharp — no pill buttons, no rounded corners on cards.",
    "Demo Mode toggle prominently placed — the signature interaction.",
  ],

  logo_rules: {
    shape: "Russo One wordmark in Signal Red, with optional explosion/wrecking-ball underline motif in Hazard Yellow. On dark backgrounds only.",
    complexity: "Bold and legible at 16px minimum; high contrast.",
    negative_space: "At least 16px clearance on all sides of the lockup.",
    colors: "Signal Red on Concrete Dark, or Blast White on Concrete Surface. Yellow/Purple accent only.",
    allowed_symbols: ["explosion", "wrecking ball", "debris", "crane hook", "blast wave", "angular shard"],
    forbidden_symbols: ["water drops", "soft bubbles", "rounded blob shapes", "flowers", "pastel gradients", "smooth curves"],
  },

  illustration_prompt_template:
    "{prefix} {subject} with Demolition Crew blast aesthetic, bold industrial tones, " +
    "debris particles, angular card edges, dust cloud {suffix}",

  page_generation_rules: [
    "Hero sections have a full-bleed dark background with hazard-stripe accent and debris particle field.",
    "All cards sit on Concrete Surface with angular border and clip-path polygon.",
    "CTA buttons are Signal Red, bold Exo 2 700 with explosive burst on hover.",
    "Maximum page width 1440px.",
    "Lead every page with a single dominant visual — no split-attention hero.",
    "Trending/featured rows get the purple blast glow (the demo twist).",
    "Demo Mode section prominently featured — the wrecking ball twist.",
  ],

  /* ==========================================================================
   * 17. DESIGN TOKENS
   * ========================================================================== */

  design_tokens: {
    color: {
      "--color-primary": "#FF3838",
      "--color-secondary": "#FFD93D",
      "--color-tertiary": "#6C5CE7",
      "--color-bg": "#2D3436",
      "--color-surface": "#3D4449",
      "--color-surface-alt": "#4A5157",
      "--color-text": "#F5F5F5",
      "--color-text-muted": "#636E72",
      "--color-border": "#4A5157",
      "--color-success": "#00CEC9",
      "--color-warning": "#E17055",
      "--color-error": "#D63031",
      "--color-info": "#4A5157",
      "--color-focus": "#FF3838",
      "--color-shadow": "rgba(26,30,32,0.70)",
      "--color-overlay": "rgba(26,30,32,0.85)",
      "--color-blast-glow": "rgba(255,56,56,0.4)",
      "--color-glow-cyan": "rgba(0,206,201,0.5)",
      "--color-hazard-yellow": "#FFD93D",
      "--color-blast-purple": "#6C5CE7",
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
      "--font-headline": "'Russo One', Impact, sans-serif",
      "--font-display": "'Teko', Oswald, sans-serif",
      "--font-body": "'Exo 2', Roboto, sans-serif",
      "--font-ui": "'Exo 2', Roboto, sans-serif",
      "--font-mono": "'Share Tech Mono', 'Fira Mono', monospace",
    },
    shadow: {
      "--shadow-sm": "0 2px 4px rgba(26,30,32,0.6)",
      "--shadow-md": "0 4px 12px rgba(26,30,32,0.7), 0 0 0 1px rgba(255,56,56,0.05)",
      "--shadow-lg": "0 12px 32px rgba(26,30,32,0.8), 0 0 0 1px rgba(255,56,56,0.08)",
      "--shadow-blast-glow": "0 0 20px rgba(255,56,56,0.4), 0 0 40px rgba(108,92,231,0.2)",
      "--shadow-glow-cyan": "0 0 20px rgba(0,206,201,0.5), 0 0 40px rgba(0,206,201,0.2)",
    },
  },

  /* ==========================================================================
   * 18. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  responsive_behavior: {
    desktop: "Multi-column poster rails, hover glow affordances on all cards, max 1440px content. Debris particles active on desktop.",
    tablet: "2–3 column grids, larger touch targets (min 48px). Reduce particle count by 60% for performance.",
    mobile: "Single column, full-width poster cards, sticky player bar. Particles off on mobile by default. Hero collapses to 40vh.",
    tv: "10-foot UI: Russo One headlines at 2× scale, bold focus ring in Signal Red at 3px, poster grids fill the dark field.",
  },

  /* ==========================================================================
   * 19. ACCESSIBILITY
   * ========================================================================== */

  accessibility: {
    minimum_contrast:
      "WCAG AA required: Blast White (#F5F5F5) on Concrete Dark (#2D3436) = 11.9:1 — exceeds AAA. " +
      "Signal Red (#FF3838) on Concrete Surface (#3D4449) = 4.8:1 — passes AA for body text. " +
      "Signal Red on Concrete Dark = 7.1:1 — passes AAA. " +
      "Hazard Yellow (#FFD93D) on Concrete Dark = 8.6:1 — passes AAA. " +
      "Concrete Gray (#636E72) on Concrete Dark = 4.5:1 — passes AA. " +
      "Blast White on Concrete Surface = 7.2:1 — passes AAA.",
    focus_style:
      "2px solid Signal Red (#FF3838) focus ring, 2px offset on dark surfaces. " +
      "Single blast-pulse animation (200ms) then holds steady. Always visible — never hidden.",
    touch_target: "Minimum 44×44px; 48×48px recommended for TV and tablet.",
    motion_reduction:
      "Honor prefers-reduced-motion: replace debris-particle fields with static dust overlay, " +
      "replace blast-burst with instant opacity. Keep explosive burst and blast-reveal as fade only. " +
      "Disable all continuous ambient debris motion. Demo Mode still works but without physics.",
    font_scaling:
      "Layouts must remain usable at 200% text zoom. Russo One headlines allowed to clip at 250%+ " +
      "on mobile — acceptable trade-off for the brand impact at normal zoom.",
  },

  /* ==========================================================================
   * 20. DO / DON'T
   * ========================================================================== */

  do_dont: {
    colors: {
      do: [
        "Use Concrete Dark or Concrete Surface for all backgrounds",
        "Reserve Signal Red for exactly one primary CTA per screen",
        "Use Hazard Yellow for hazard stripes and warning accents",
        "Use Blast Purple for the featured content blast glow halo (the demo twist)",
        "Tint all shadows with deep concrete darkness",
      ],
      dont: [
        "Use white, cream, or pastel backgrounds",
        "Place Signal Red next to Hazard Yellow at full saturation — one dominates",
        "Use cool grey or blue-tinted shadows",
        "Use more than three accent colors simultaneously",
        "Use rounded pill shapes — all corners are sharp in this brand",
      ],
      reason: "The brand's power comes from extreme dark-to-explosive contrast — explosions need darkness to burn bright.",
    },
    typography: {
      do: [
        "Use Russo One for headlines in ALL CAPS or title case for maximum impact",
        "Use Exo 2 for body and Exo 2 for UI elements",
        "Maintain minimum 400 weight on dark surfaces",
        "Use ALL CAPS for section labels and categories",
      ],
      dont: [
        "Use light-weight (100–300) fonts on dark backgrounds",
        "Use decorative script fonts",
        "Mix more than two type sizes in a single card",
        "Use rounded or soft font weights",
      ],
      reason: "Bold type carries the brand's power — thin type reads as fragile and off-brand.",
    },
    layout: {
      do: [
        "Use angular blast-cut edges on cards and panels (clip-path polygon technique)",
        "Give 24px minimum gaps between major sections",
        "Apply the purple blast glow on trending/featured content (demo twist)",
        "Use hazard stripe dividers for section breaks",
      ],
      dont: [
        "Crowd multiple Signal Red CTAs into a single view",
        "Exceed 1440px content width",
        "Use light-colored section backgrounds",
        "Use rounded corners anywhere — this brand is angular throughout",
      ],
      reason: "Scarcity of the primary blast color preserves its impact.",
    },
    animation: {
      do: [
        "Use blast-burst keyframes on active/nav elements",
        "Use debris particle fall for ambient motion",
        "Respect prefers-reduced-motion; replace particles with static dust overlay",
        "Use shake/rattle on hover interactions",
      ],
      dont: [
        "Use bouncy spring physics — this brand blasts, it does not bounce",
        "Animate more than two elements simultaneously",
        "Run continuous heavy particle systems on mobile",
        "Use smooth rounded easing — this brand uses sharp, explosive easing",
      ],
      reason: "Motion must feel like a controlled blast: explosive, kinetic, powerful — not mechanical.",
    },
    imagery: {
      do: [
        "Use demolition and blast photography graded industrial red/yellow",
        "Include debris and dust atmosphere",
        "Use blast glow effects on hero art",
        "Use angular fragment shapes, not round circles",
      ],
      dont: [
        "Use daylight, soft, or pastel-graded photography",
        "Use generic stock 'happy people' imagery without blast context",
        "Use flat gray corporate imagery",
        "Use rounded shapes or soft gradients",
      ],
      reason: "Every image must feel like it was lit by a controlled blast.",
    },
    branding: {
      do: [
        "Keep the Russo One wordmark bold and high contrast",
        "Use the purple blast glow on trending content consistently",
        "Maintain 16px minimum clearance around the lockup",
        "Use angular, industrial shapes only",
      ],
      dont: [
        "Stretch, rotate, or recolor the logo outside approved palette",
        "Place the logo on a light background",
        "Use rounded versions of the logo",
      ],
      reason: "Consistency makes the brand recognizable.",
    },
    copywriting: {
      do: [
        "Write short punchy sentences — explosive brevity",
        "Use blast/demolition vocabulary (demolish, blast, wreck, rubble, impact)",
        "End empty-state messages with a direct call to action",
        "Use ALL CAPS for impact words",
      ],
      dont: [
        "Use softening words (cozy, gentle, calm, subtle)",
        "Use corporate filler (leverage, synergy, ecosystem)",
        "Add exclamation marks to routine notifications",
        "Be verbose — this brand hits hard and fast",
      ],
      reason: "The brand's voice is bold and powerful — confident, minimal, explosive.",
    },
  },

  /* ==========================================================================
   * 21. SITE ARCHITECTURE
   * ========================================================================== */

  site_architecture: {
    nav: [
      { id: "home",     label: "Home",     emphasis: "default" },
      { id: "features", label: "Features",  emphasis: "default" },
      { id: "clients",  label: "Clients",   emphasis: "default" },
      { id: "download", label: "Download", emphasis: "primary" },
      { id: "plugins",  label: "Plugins",    emphasis: "default" },
      { id: "docs",     label: "Docs",       emphasis: "default" },
      { id: "hub",      label: "Hub",        emphasis: "default" },
      { id: "about",    label: "About",      emphasis: "default" },
    ],
    demoted_pages: [],
    extra_pages: [
      { id: "demo", label: "Demo Mode", emphasis: "special", description: "Interactive wrecking ball demo" }
    ],
    footer_arrangement: "standard",
  },

  /* ==========================================================================
   * 22. HOMEPAGE NARRATIVE
   * ========================================================================== */

  homepage_narrative: {
    arc: "spark-to-blast",
    logline: "One button press and the whole interface explodes into rubble — then rebuilds.",
    sections: [
      {
        id: "hero",
        source: "hero",
        treatment: "Full-bleed debris-field hero: dark concrete background, falling debris particles, crane hook swing animation, primary CTA in Signal Red with explosive burst.",
        weight: "hero"
      },
      {
        id: "demo-mode",
        source: "demo",
        treatment: "Interactive Demo Mode showcase — the signature twist. Full-width section with a live demo toggle that destroys and rebuilds a UI panel.",
        weight: "hero"
      },
      {
        id: "why",
        source: "pitch_bullets",
        treatment: "Five blasts — each pitch bullet gets an angular icon and blasts in staggered on scroll.",
        weight: "major"
      },
      {
        id: "features",
        source: "features",
        treatment: "8-card grid on Concrete Surface with angular edges. Each card shakes on hover. Featured row (first 3) gets purple blast glow halo — the demo twist applied to the product's best features.",
        weight: "major"
      },
      {
        id: "cta",
        source: "cta",
        treatment: "Full-width hazard-stripe CTA banner — concrete dark with Signal Red gradient bar and a bold 'Demolish Your Library' headline.",
        weight: "hero"
      },
    ],
  },

  experience_archetype: "immersive",

  /* ==========================================================================
   * 23. EXPERIENCE CONTROLS
   * ========================================================================== */

  scroll_experience: {
    mode: "debris-fall",
    spec: "Content sections blast in and debris falls as the user scrolls; angular debris fragments float downward continuously in the background.",
    reduced_motion: "Static dust overlay — particles replaced with a warm radial gradient at the bottom of the viewport.",
  },

  conversion_funnel: {
    style: "single-blast",
    download_opening: "Full-bleed dark hero with hazard-stripe accent, the install command in a concrete card, a single Signal Red 'Demolish Now' CTA.",
    cta_ladder: ["Demolish Your Library (primary CTA)", "View Source (secondary)", "Read the Docs (tertiary)"],
    friction_notes: "No multi-step forms. One path to download. The install command is the hero.",
  },

  /* ==========================================================================
   * 24. METADATA
   * ========================================================================== */

  meta_author: "Joe Huss",

};

export default brandKit;
