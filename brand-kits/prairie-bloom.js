/**
 * ============================================================================
 *  PHLIX BRAND KIT  —  prairie-bloom.js   (BASE kit)
 * ============================================================================
 *
 *  Name    : Prairie Bloom
 *  Slug    : prairie-bloom
 *  Theme   : American heartland wildflower meadow — quilted patterns, folk
 *            art roosters, sunflowers stretching to wide-open skies, county
 *            fairs, hand-stitched embroidery, warm community gathering.
 *
 *  Palette : Sunflower yellow · Wildflower violet · Barn red · Sky blue ·
 *            Hay gold · Clover green
 *
 *  Schema Version : 2.0
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

const brandKit = {

  /* ==========================================================================
   * 1. IDENTITY
   * ========================================================================== */

  name: "Prairie Bloom",

  slug: "prairie-bloom",

  version: "1.0",

  description:
    "Prairie Bloom is the warmth of a summer county fair — sunflowers leaning " +
    "toward open skies, hand-stitched quilts stretched across porch railings, " +
    "and neighbors sharing a meal in a meadow of wildflowers. It brings that " +
    "same genuine, community-rooted joy to watching media at home.",

  inspiration: [
    "American heartland wildflower meadows",
    "County fair quilts and ribbon displays",
    "Folk art — painted roosters, sunflowers, hex signs",
    "Prairie farmhouse porches and clotheslines",
    "Hand-stitched embroidery samplers",
    "Seed packet illustration from the 1910s–1940s",
    "Grange hall potlucks and community barn dances",
    "Sunflower fields at golden hour",
    "Weathered barn wood and painted hex signs",
  ],

  keywords: [
    "prairie", "wildflower", "sunflower", "meadow", "heartland", "folk art",
    "quilted", "embroidery", "handcrafted", "community", "wholesome", "genuine",
    "rooster", "farmhouse", "county fair", "barn", "clover", "violet", "golden",
    "sky-blue", "hay", "stitched", "hand-lettered", "warm", "pastoral", "earthy",
    "neighborly", "rustic", "cozy", "honest", "grounded", "American", "bloom",
    "patchwork", "slab-serif", "seed-packet", "hex-sign", "summer",
    "open-air", "festive", "harvest", "bounty", "ribbon", "gingham",
  ],

  /* ==========================================================================
   * 2. PERSONALITY
   * ========================================================================== */

  personality: ["Wholesome", "Genuine", "Warm", "Community-centered", "Handcrafted", "Grounded"],

  emotional_goals: [
    "Belonging",
    "Comfort",
    "Delight",
    "Nostalgia",
    "Connection",
  ],

  archetype: "Caregiver",

  audience: [
    "Families",
    "Home viewers who value warmth over slickness",
    "Fans of Americana and folk aesthetics",
    "Community-oriented households",
    "Casual streamers who want a friendly, approachable UI",
  ],

  /* ==========================================================================
   * 3. BRAND STORY
   * ========================================================================== */

  story:
    "Out where the sunflowers line the fence posts and the county fair only " +
    "comes once a year, people know how to make an evening count. Prairie Bloom " +
    "was dreamed up on a porch swing — a way to bring the same easy joy of a " +
    "community gathering into every living room. No fuss, no gloss. Just good " +
    "folks, good stories, and a quilt's worth of warmth stitched into every " +
    "pixel. Phlix with Prairie Bloom feels like coming home after a long " +
    "summer day: familiar, joyful, and a little bit sun-kissed.",

  tagline_primary: "Stories Worth Gathering For.",

  tagline_secondary: [
    "Grown right here, for you.",
    "Pull up a chair. The show's starting.",
    "From our meadow to your screen.",
    "Watch together. Bloom together.",
  ],

  mission:
    "Make every watch feel like a porch gathering — unhurried, warm, and " +
    "shared with the people you love.",

  values: [
    "Community",
    "Authenticity",
    "Warmth",
    "Craftsmanship",
    "Joy",
  ],

  /* ==========================================================================
   * 4. BRAND DNA & PRINCIPLES
   * ========================================================================== */

  brand_dna:
    "Prairie Bloom is the American heartland made visible — sunflowers, hand-stitched " +
    "quilts, folk-art roosters, and open skies. It is warm yellow, wildflower violet, " +
    "and honest barn red. It is never corporate, never cold, never slick. " +
    "Every surface should feel like it was made by caring hands.",

  design_principles: [
    "Every screen should feel as open and unhurried as a meadow.",
    "Handcrafted over polished — slightly imperfect textures are a feature, not a bug.",
    "Color like a quilter: bold patches balanced by ample neutral ground.",
    "Folk motifs — sunflowers, roosters, hex patterns — earn their place on key pages.",
    "Typography should feel hand-lettered or slab-pressed, never sterile.",
    "Community over individualism: show shared content, curated lists, shared views.",
    "Use at most three accent colors per view; let the warm hay background breathe.",
  ],

  brand_opposites: [
    "Not corporate or enterprise",
    "Not minimalist-cold or Swiss-grid austere",
    "Not neon or cyberpunk",
    "Not dark, gothic, or moody",
    "Not luxury or high-fashion",
    "Not urban or metropolitan",
    "Not hyper-polished or overly digital",
  ],

  signature_elements: [
    "Sunflowers — standing tall, petals fanning wide",
    "Quilted patchwork border patterns",
    "Folk art rooster silhouettes",
    "Hand-stitched embroidery floss details",
    "Hex sign rosette motifs",
    "County fair ribbon badges",
    "Barn wood grain texture",
    "Wildflower scatter fields (violets, clover, daisies)",
  ],

  header_motif: "Sunflower swaying animation with drifting pollen-dot particles",

  /* ==========================================================================
   * 5. VISUAL IDENTITY
   * ========================================================================== */

  visual_style: [
    "Folk art illustration",
    "Hand-stitched embroidery",
    "Seed packet woodblock print",
    "Quilted patchwork geometry",
    "Warm paper textures",
    "Slightly imperfect, handmade edges",
  ],

  art_direction:
    "Artwork should feel like a lovingly illustrated seed packet or a framed " +
    "embroidery sampler: warm hay-colored paper with visible grain, hand-drawn " +
    "botanical outlines in deep barn-red or clover ink, confident but slightly " +
    "imperfect strokes. Color fills are flat with gentle texture, never airbrushed " +
    "or gradient-heavy. Compositions favor symmetrical folk-art framing — a central " +
    "sunflower flanked by matched wildflower sprigs, or a rooster centered on a " +
    "hex rosette. Lighting is diffuse golden-hour, as if sunlight is filtering " +
    "through a barn door. Avoid chrome, gloss, drop shadows that feel digital, " +
    "lens flares, or anything that reads as screen-first rather than hand-made.",

  realism: "illustrated",

  rendering_style: ["woodblock", "linocut", "paper grain", "flat vector"],

  texture_level: "medium",

  depth: "slightly_layered",

  lighting: {
    temperature: "warm",
    quality: "golden-hour harvest",
    shadows: "soft",
    contrast: "low",
    notes: "No harsh shadows. Light should feel like late-afternoon sun filtered through tall grass.",
  },

  composition: [
    "Centered folk-art symmetry",
    "Botanical framing — vines and stems as natural borders",
    "Single tall focal subject (sunflower, rooster) on generous hay ground",
    "Quilted grid overlays for structure on data-dense layouts",
    "Rule of thirds for photography; centered for illustration",
  ],

  /* ==========================================================================
   * 6. COLOR SYSTEM
   * ========================================================================== */

  colors: {
    primary: {
      name: "Sunflower Yellow",
      hex: "#F2C12E",
      rgb: "rgb(242, 193, 46)",
      hsl: "hsl(45, 89%, 56%)",
      usage: "Primary CTAs, active states, featured badges, key highlight accents.",
      contrast_targets: ["barn_red", "text_ink", "clover_green"],
    },
    secondary: {
      name: "Wildflower Violet",
      hex: "#7B5EA7",
      rgb: "rgb(123, 94, 167)",
      hsl: "hsl(267, 28%, 51%)",
      usage: "Secondary actions, links, section headers, selected state highlights.",
      contrast_targets: ["hay_cream", "white"],
    },
    tertiary: {
      name: "Barn Red",
      hex: "#B83A3A",
      rgb: "rgb(184, 58, 58)",
      hsl: "hsl(0, 52%, 47%)",
      usage: "Warm emphasis accents, folk-art outlines, danger/destructive actions.",
      contrast_targets: ["hay_cream", "white"],
    },
    neutral: {
      name: "Clover Green",
      hex: "#4E7C59",
      rgb: "rgb(78, 124, 89)",
      hsl: "hsl(133, 23%, 40%)",
      usage: "Success states, muted UI chrome, botanical outlines, dividers.",
      contrast_targets: ["hay_cream", "white"],
    },
    background: {
      name: "Hay Cream",
      hex: "#F7F0DC",
      rgb: "rgb(247, 240, 220)",
      hsl: "hsl(45, 67%, 92%)",
      usage: "Default page background. Prairie Bloom backgrounds are always warm hay.",
      contrast_targets: ["text_ink", "barn_red", "wildflower_violet"],
    },
    surface: {
      name: "Warm Linen",
      hex: "#FBF6EA",
      rgb: "rgb(251, 246, 234)",
      hsl: "hsl(44, 73%, 95%)",
      usage: "Card and panel surfaces, one step lighter than background.",
      contrast_targets: ["text_ink"],
    },
    surface_alt: {
      name: "Oat Field",
      hex: "#EDE3C5",
      rgb: "rgb(237, 227, 197)",
      hsl: "hsl(43, 51%, 85%)",
      usage: "Alternate surface for striped rows, nested panels, hover fills.",
      contrast_targets: ["text_ink"],
    },
    text: {
      name: "Furrow Brown",
      hex: "#2C1D0E",
      rgb: "rgb(44, 29, 14)",
      hsl: "hsl(28, 52%, 11%)",
      usage: "Primary body and headline text; folk-art outline strokes.",
      contrast_targets: ["hay_cream", "warm_linen"],
    },
    success: {
      name: "Clover Mint",
      hex: "#A8D5AE",
      rgb: "rgb(168, 213, 174)",
      hsl: "hsl(127, 35%, 75%)",
      usage: "Success toasts, confirmations, completed states.",
      contrast_targets: ["text_ink"],
    },
    warning: {
      name: "Hay Gold",
      hex: "#D9A520",
      rgb: "rgb(217, 165, 32)",
      hsl: "hsl(44, 74%, 49%)",
      usage: "Warnings, caution states, rating stars.",
      contrast_targets: ["text_ink"],
    },
    error: {
      name: "Faded Barn Red",
      hex: "#9C2A2A",
      rgb: "rgb(156, 42, 42)",
      hsl: "hsl(0, 57%, 39%)",
      usage: "Errors, destructive action buttons, failed states.",
      contrast_targets: ["hay_cream", "white"],
    },
    info: {
      name: "Open Sky Blue",
      hex: "#4A90C4",
      rgb: "rgb(74, 144, 196)",
      hsl: "hsl(207, 47%, 53%)",
      usage: "Informational banners, tips, sky-themed decorative accents.",
      contrast_targets: ["hay_cream", "white"],
    },
    focus: {
      name: "Violet Focus Ring",
      hex: "#7B5EA7",
      rgb: "rgb(123, 94, 167)",
      hsl: "hsl(267, 28%, 51%)",
      usage: "Keyboard-focus ring color (paired with 2px hay-cream offset).",
      contrast_targets: ["hay_cream", "warm_linen"],
    },
    border: {
      name: "Furrow Outline",
      hex: "#2C1D0E",
      rgb: "rgb(44, 29, 14)",
      hsl: "hsl(28, 52%, 11%)",
      usage: "Card borders, dividers — hand-drawn folk-art ink lines.",
      contrast_targets: ["hay_cream"],
    },
    shadow: {
      name: "Warm Earth Shadow",
      hex: "#5C3D1E",
      rgb: "rgba(92, 61, 30, 0.22)",
      hsl: "hsl(28, 51%, 24%)",
      usage: "Soft drop shadows tinted warm earth, never cool grey or pure black.",
      contrast_targets: [],
    },
    overlay: {
      name: "Dusk Field",
      hex: "#1C110A",
      rgb: "rgba(28, 17, 10, 0.58)",
      hsl: "hsl(25, 47%, 7%)",
      usage: "Modal/scrim overlays — warm near-black with a faint harvest-dusk tint.",
      contrast_targets: [],
    },
    gradients: [
      {
        name: "Sunflower Sunrise",
        type: "linear",
        angle: "160deg",
        stops: ["#F2C12E", "#D9A520"],
        usage: "Hero backdrops, featured-item glows, CTA shimmer.",
      },
      {
        name: "Prairie Sky",
        type: "linear",
        angle: "180deg",
        stops: ["#A8CFEA", "#F7F0DC"],
        usage: "Tall hero panels, landing-page sky sections.",
      },
      {
        name: "Wildflower Bloom",
        type: "radial",
        angle: null,
        stops: ["rgba(123,94,167,0.18)", "rgba(247,240,220,0.0)"],
        usage: "Soft violet spotlight behind hero subjects on hay backgrounds.",
      },
    ],
  },

  color_rules: [
    "Backgrounds are always hay cream or a hay-tinted surface — never white or grey.",
    "Sunflower yellow is the primary CTA color; do not repurpose it for body text.",
    "Never use more than three accent colors in a single view.",
    "Shadows and overlays carry a warm-earth tint, never cool grey or pure black.",
    "Wildflower violet is reserved for secondary actions and selected states.",
    "Barn red signals emphasis or caution — use sparingly, at most once per viewport.",
    "Electric neon and cool blue-greys are forbidden anywhere in the UI.",
  ],

  /* ==========================================================================
   * 7. TYPOGRAPHY
   * ========================================================================== */

  fonts: {
    headline: {
      family: "Zilla Slab",
      weight: [700],
      fallbacks: ["Rockwell", "Georgia", "serif"],
      usage: "Big folk-art headlines, hero titles, section names.",
      tracking: "0.01em",
      line_height: 1.1,
    },
    display: {
      family: "Playfair Display",
      weight: [700, 900],
      fallbacks: ["Georgia", "Times New Roman", "serif"],
      usage: "Oversized display text, splash screens, hand-lettered feeling numerals.",
      tracking: "0.02em",
      line_height: 1.0,
    },
    body: {
      family: "Lora",
      weight: [400, 600],
      fallbacks: ["Georgia", "Times New Roman", "serif"],
      usage: "Paragraphs, descriptions, long-form reading — warm humanist serif.",
      tracking: "0em",
      line_height: 1.7,
    },
    ui: {
      family: "Nunito",
      weight: [400, 600, 700],
      fallbacks: ["Open Sans", "system-ui", "sans-serif"],
      usage: "Buttons, labels, navigation, chips, form fields — friendly rounded UI text.",
      tracking: "0.01em",
      line_height: 1.3,
    },
    mono: {
      family: "Fira Code",
      weight: [400, 500],
      fallbacks: ["Courier New", "monospace"],
      usage: "Code, tokens, technical readouts.",
      tracking: "0em",
      line_height: 1.5,
    },
    number: {
      family: "Zilla Slab",
      weight: [700],
      fallbacks: ["Rockwell", "Georgia", "serif"],
      usage: "Stats, counters, runtimes, and dashboard figures.",
      tracking: "0.02em",
      line_height: 1.0,
    },
  },

  typography_rules: [
    "Never use all-caps on body text; reserve caps for short UI labels only.",
    "Headline serif (Zilla Slab) sets the folk-art tone — do not replace with a sans.",
    "Body copy uses Lora for warmth; Nunito handles interactive UI only.",
    "Keep body line-length to 60–72 characters for comfortable prairie-porch reading.",
    "Italic is welcomed in display/headline — it suggests hand-lettering.",
    "Avoid ultra-light or hairline weights; minimum 400 everywhere.",
  ],

  /* ==========================================================================
   * 8. SHAPES
   * ========================================================================== */

  shape_language: [
    "Rounded rectangles with slightly hand-drawn edges",
    "Quilted diamond/lozenge grid overlays",
    "Hex rosette badges (county fair, folk hex signs)",
    "Seed-packet botanical ovals",
    "Scalloped petal edges on cards and modals",
    "Stitched-border dashed outlines",
  ],

  corner_radius: {
    small: "4px",
    medium: "10px",
    large: "18px",
    xl: "28px",
    pill: "999px",
  },

  borders: {
    thickness: "2px",
    style: "solid",
    rounded: true,
    hand_drawn: true,
    notes:
      "Folk-art ink outlines — furrow brown, slightly uneven weight for a " +
      "hand-pressed feel. Dashed borders signal embroidery-stitch detail sections.",
  },

  /* ==========================================================================
   * 9. ICONOGRAPHY
   * ========================================================================== */

  icon_style: ["Outlined", "Hand drawn", "Rounded", "Folk-art"],

  icon_rules: [
    "2px stroke weight; rounded caps and joins.",
    "Prefer botanical and farmstead subjects where relevant — leaf, sun, home, basket.",
    "Single-color by default (furrow brown or wildflower violet); duotone for featured.",
    "Never use sharp angular corners or ultra-thin hairline strokes.",
    "Small hex-rosette detail may accent featured icons.",
  ],

  /* ==========================================================================
   * 10. ILLUSTRATION
   * ========================================================================== */

  illustration_style: [
    "American folk art",
    "1910s–1940s seed packet woodblock",
    "Embroidery sampler flat art",
    "Children's picture book (rustic edition)",
    "Quilt block geometry",
  ],

  character_style: {
    proportions: "Sturdy, friendly, slightly round — like carved folk-art figures.",
    eyes: "Warm, simple dots or almond shapes; expressive without anime detail.",
    expressions: "Cheerful, content, generous — nobody frowns in a sunflower field.",
    clothing: "Prairie practical — gingham aprons, denim overalls, straw hats, floral dresses.",
    outlines: "2px furrow-brown folk-art ink outline; slightly imperfect is intentional.",
  },

  mascot: {
    name: "Sunny",
    species: "Anthropomorphic sunflower",
    personality: "Bright, welcoming, always turning toward you with genuine interest.",
    description:
      "A tall sunflower with a round cheerful face at its center, wearing a " +
      "tiny straw hat and holding a basket of wildflowers. Sturdy green stem " +
      "legs and broad petal arms ready for a wave.",
    poses: [
      "Waving hello from the meadow",
      "Holding a county-fair ribbon",
      "Peering through binoculars at the screen",
      "Napping in the hay",
      "Pointing at a quilt pattern",
    ],
    expressions: ["Beaming", "Curious", "Sleepy at sunset", "Surprised-delighted", "Proud"],
  },

  /* ==========================================================================
   * 11. PHOTOGRAPHY
   * ========================================================================== */

  photography_style: [
    "Golden-hour meadow light",
    "Warm film grain (400-speed)",
    "Vibrant wildflower color palette",
    "Shallow depth-of-field botanical close-ups",
    "Open sky with cumulus clouds",
  ],

  photo_rules: [
    "Always use warm golden tones; never cool, desaturated, or blue-shifted grading.",
    "Never use HDR or hyper-sharpened processing.",
    "Prefer candid community moments — gatherings, shared tables, porch conversations.",
    "Sunflowers, quilts, or open sky must appear or be implied in background.",
    "Film grain is welcome; digital clinical sharpness is not.",
    "Smiling genuine faces only — never stock-photo stiff poses.",
  ],

  /* ==========================================================================
   * 12. MOTION
   * ========================================================================== */

  motion_style: ["Gentle", "Organic", "Bouncy", "Warm", "Unhurried"],

  transitions: ["Fade", "Grow from seed", "Quilt-slide", "Soft-wipe", "Scale bloom"],

  animation_speed: "medium",

  easing: ["ease-out", "spring", "cubic-bezier(0.34, 1.56, 0.64, 1)"],

  microinteractions: {
    hover: "Cards lift 3px with a warm-earth shadow and petals brighten on the corner accent.",
    button_press: "Gentle squash to 0.96 then spring back with a pollen-shimmer.",
    loading: "Sunflower growing from a seed — stem extending, petals unfolding.",
    drag: "Item tilts 3° as if lifted off a quilt top.",
    focus: "Wildflower-violet focus ring grows in from the inside over 140ms.",
    success: "Tiny wildflower burst + clover-green check mark bounce.",
    error: "Brief barn-red horizontal shake — short, non-alarming.",
  },

  /* ==========================================================================
   * 13. UI SYSTEM
   * ========================================================================== */

  ui_style: [
    "Hay-cream warmth throughout",
    "Folk-art quilt borders on section dividers",
    "Sunflower yellow primary actions",
    "Rounded everything with hand-drawn feel",
    "Wildflower accents on hover and selection",
    "Community-gathering spaciousness",
  ],

  spacing_scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],

  shadows: {
    sm: "0 1px 3px rgba(92, 61, 30, 0.16)",
    md: "0 4px 12px rgba(92, 61, 30, 0.20)",
    lg: "0 10px 28px rgba(92, 61, 30, 0.26)",
    notes: "Shadows carry warm-earth tint; soft and diffuse like meadow shade.",
  },

  cards: {
    elevation: "md",
    padding: "16px",
    border_radius: "18px",
    border: "2px solid #2C1D0E",
    background: "#FBF6EA",
    notes:
      "Warm linen surface, furrow-brown folk-art border. Optional dashed inner border " +
      "for embroidery-panel emphasis on featured cards.",
  },

  buttons: {
    primary:   { bg: "#F2C12E", text: "#2C1D0E", radius: "999px", notes: "Sunflower yellow pill, furrow-brown text for contrast." },
    secondary: { bg: "#7B5EA7", text: "#FBF6EA", radius: "999px", notes: "Wildflower violet pill, warm linen text." },
    danger:    { bg: "#9C2A2A", text: "#FBF6EA", radius: "999px", notes: "Faded barn red — destructive actions only." },
    ghost:     { bg: "transparent", text: "#2C1D0E", radius: "999px", notes: "2px furrow-brown outline, no fill." },
    link:      { bg: "transparent", text: "#7B5EA7", radius: "0", notes: "Wildflower violet, underline on hover." },
    icon:      { bg: "#FBF6EA", text: "#2C1D0E", radius: "999px", notes: "Circular warm-linen icon button." },
    fab:       { bg: "#F2C12E", text: "#2C1D0E", radius: "999px", notes: "Floating sunflower-yellow action button." },
  },

  forms: {
    inputs: "Warm-linen fill, 2px furrow-brown border, 10px radius, generous 12px padding.",
    checkboxes: "Rounded square, clover-green check, springy toggle snap.",
    switches: "Pill track in oat-field grey, warm-linen knob, sunflower yellow when on.",
    dropdowns: "Rounded menu on warm linen with soft earth shadow, hex-dot separator.",
    validation: "Inline friendly copy; error = faded barn red, success = clover mint.",
  },

  tables: {
    headers: "Zilla Slab slab-caps on oat-field header row.",
    hover: "Row tints to oat-field on hover.",
    sorting: "Small rounded chevron in wildflower violet.",
    striping: "Alternate rows use surface_alt (oat field).",
  },

  navigation: {
    sidebar: "Warm-linen panel, rounded active pill in sunflower yellow, folk-art icon + label.",
    topbar: "Hay-cream header with a subtle quilt-stripe border-bottom and Prairie Bloom wordmark.",
    tabs: "Pill tabs; active tab filled sunflower yellow with furrow text.",
    breadcrumbs: "Small Nunito crumbs separated by a tiny clover-leaf dot.",
  },

  dashboard_style:
    "Spacious card grid on hay cream, big Zilla Slab numerals in furrow brown, " +
    "wildflower-violet and sunflower-yellow stat accents, quilt-block grid dividers. " +
    "Calm, airy — feels like a well-organized county-fair display case.",

  component_styles: {
    dialog:
      "Centered warm-linen card, dusk-field scrim, scalloped petal top edge in " +
      "sunflower yellow, 28px corner radius.",
    sidebar: "See navigation.sidebar; collapses to icon rail with hex-rosette indicators.",
    carousel: "Poster rail with stitched-dashed top/bottom borders and sunflower-petal navigation arrows.",
    search_bar: "Pill input with a botanical magnifier icon and 'Find your next bloom…' hint.",
    media_player:
      "Warm-control bar that gently fades in; sunflower-yellow scrubber; " +
      "clover-green buffered-range fill.",
    toast: "Rounded pill toast growing up from bottom with a tiny sunflower icon.",
    chip: "Pill chip on oat-field surface with 2px furrow outline.",
  },

  layout_patterns: {
    dashboard: "Hero metric row → 3-up stat cards → recent-activity quilt rail.",
    settings: "Left section nav (botanical icons) + right form panels, max-width 720px content.",
    media_library: "Sticky sunflower-yellow filter bar → responsive poster grid (auto-fill).",
    authentication: "Centered card on a Prairie Sky gradient background with a seed-packet frame.",
    landing: "Full-bleed meadow illustration → features → social proof → CTA (sunflower bloom).",
    detail_view: "Backdrop hero (warm grade) → poster + metadata → episodes/related quilt rails.",
  },

  /* ==========================================================================
   * 14. MEDIA IDENTITY
   * ========================================================================== */

  poster_style:
    "Seed-packet one-sheet feel: slab-serif Zilla Slab title, painted botanical key art, " +
    "hay-cream border with stitched-dash inner frame, rounded 14px corners, paper grain.",

  thumbnail_style:
    "Rounded 10px corners, 2px furrow-brown folk-art border, warm golden grade, " +
    "title overlay in Nunito on a semi-transparent hay strip.",

  backdrop_style:
    "Wide prairie panoramic still, golden-hour warm grade, soft vignette fading " +
    "to hay-cream at bottom, gentle wildflower-scatter overlay.",

  media_cards:
    "Poster on top, title + year in Nunito below on hay cream, hover lifts with warm " +
    "earth shadow and reveals a sunflower-yellow play pill at center.",

  badges: {
    labels: ["4K", "HDR", "Dolby Vision", "Continue Watching", "New", "Favorite", "County Pick"],
    shape: "Hex-rosette or pill, 2px furrow-brown outline.",
    colors:
      "Hay gold for quality (4K/HDR/DV), sky blue for status (New, Continue), " +
      "barn red for Favorite, clover green for County Pick.",
    typography: "Nunito, 700 weight, small caps.",
  },

  /* ==========================================================================
   * 15. COPYWRITING
   * ========================================================================== */

  voice: ["Genuine", "Neighborly", "Warm", "Storytelling", "Unhurried"],

  tone: ["Friendly", "Encouraging", "Down-to-earth", "Celebratory of simple pleasures"],

  writing_style:
    "Short, honest sentences. Active voice. Contractions are natural here. " +
    "Prairie and garden metaphors welcome (bloom, harvest, seeds, roots, gather). " +
    "Never corporate or clinical. Write like you're talking to a neighbor across a " +
    "fence post, not presenting to a board room.",

  vocabulary: [
    "bloom", "harvest", "gather", "roots", "meadow", "grow", "cultivate",
    "sow", "tend", "bounty", "neighbors", "together", "homegrown", "season",
  ],

  avoid_words: [
    "leverage", "synergy", "utilize", "robust", "cutting-edge", "disrupt",
    "scalable", "ecosystem", "bandwidth", "frictionless", "streamlined",
  ],

  greetings: [
    "Welcome back to the meadow.",
    "Good to see you. The sunflowers missed you.",
    "Pull up a chair — something good is growing here.",
    "Hey neighbor! Ready to watch?",
  ],

  empty_state_messages: [
    "Nothing planted here yet — let's find something to grow.",
    "Your meadow's a blank canvas. Add a title to let it bloom.",
    "No favorites yet. Tap the heart to save one for the harvest.",
    "Looks like this field is still fallow. Start a library to fill it up.",
  ],

  notification_style:
    "Warm and genuine — like a note left on the porch by a neighbor. " +
    "Never pushy, never urgent unless it truly is. Always a friendly opener.",

  /* ==========================================================================
   * 16. AI GENERATION GUIDANCE
   * ========================================================================== */

  image_prompt_prefix:
    "American folk-art meadow illustration, seed-packet woodblock style, flat " +
    "warm color fills with subtle paper grain, hand-drawn furrow-brown outlines, " +
    "golden-hour diffuse light, sunflowers and wildflowers framing the subject,",

  image_prompt_suffix:
    ", cohesive prairie palette (sunflower yellow, wildflower violet, barn red, " +
    "hay cream, clover green), wholesome, community-centered, rounded shapes, " +
    "high quality, balanced botanical composition.",

  negative_prompt: [
    "neon", "cyberpunk", "futuristic HUD", "harsh lighting", "lens flare",
    "blue/cool color grade", "HDR", "chrome/glossy", "dark moody", "horror",
    "urban", "corporate", "minimalist-white", "sterile", "cold grey",
  ],

  ui_generation_rules: [
    "Hay-cream background; warm-linen surfaces — never white or cold grey.",
    "Round all corners (≥10px); pills for buttons.",
    "Primary CTA is always sunflower yellow with furrow-brown text.",
    "Max 3 accent colors per screen.",
    "Use the spacing scale; leave generous meadow-breathing whitespace.",
    "Max content width 1320px.",
    "Borders are 2px furrow-brown folk-art lines — never default grey.",
  ],

  logo_rules: {
    shape: "Wordmark in Zilla Slab 700, optionally inside a rounded hex-rosette badge.",
    complexity: "Simple and legible at 24px and above.",
    negative_space: "Generous — let the sunflower breathe around the type.",
    colors: "Sunflower yellow on hay cream, or hay cream on wildflower violet.",
    allowed_symbols: ["sunflower", "hex rosette", "wildflower sprig", "rooster silhouette"],
    forbidden_symbols: ["gears", "circuits", "neon", "play-button triangle alone", "corporate crest"],
  },

  illustration_prompt_template:
    "{prefix} {subject}, in the Prairie Bloom folk-art style, {mood}, set in " +
    "an American heartland meadow with sunflowers and quilted details {suffix}",

  page_generation_rules: [
    "Hero sections always contain a large folk-art meadow illustration.",
    "Cards are rounded on warm-linen with furrow-brown borders.",
    "CTA buttons are always sunflower-yellow pills.",
    "Maximum page width 1320px.",
    "Lead every page with a single botanical focal point — never two competing heroes.",
    "Section dividers may use quilted-dashed pattern lines.",
  ],

  prompt_library: {
    logo:
      "Design a Prairie Bloom logo: Zilla Slab 700 wordmark in sunflower yellow on hay " +
      "cream, optional hex-rosette badge with a sunflower center, simple, legible, no neon.",
    illustration:
      "{image_prompt_prefix} {subject} {image_prompt_suffix}",
    icon:
      "Outlined folk-art icon of {subject}, 2px furrow-brown stroke, rounded caps, " +
      "single color, no sharp corners, botanical and friendly.",
    background:
      "Soft hay-cream background with subtle paper grain and a faint wildflower-scatter " +
      "pattern, no neon, no harsh light, warm golden hour.",
    landing_page:
      "A warm Prairie Bloom landing page: full-bleed sunflower meadow illustration hero, " +
      "sunflower-yellow CTA pill, hay-cream sections, rounded folk-art cards, generous " +
      "whitespace, quilted-border section dividers.",
    dashboard:
      "A spacious media dashboard on hay cream with big Zilla Slab numerals in furrow " +
      "brown, sunflower-yellow and wildflower-violet stat cards, rounded quilt-block layout.",
    marketing:
      "A folk-art seed-packet social graphic for {topic}: bold Zilla Slab headline, " +
      "painted botanical key art, hay-cream border with stitched dash frame, wholesome.",
  },

  /* ==========================================================================
   * 17. DESIGN TOKENS
   * ========================================================================== */

  design_tokens: {
    color: {
      "--color-primary": "#F2C12E",
      "--color-secondary": "#7B5EA7",
      "--color-tertiary": "#B83A3A",
      "--color-neutral": "#4E7C59",
      "--color-bg": "#F7F0DC",
      "--color-surface": "#FBF6EA",
      "--color-surface-alt": "#EDE3C5",
      "--color-text": "#2C1D0E",
      "--color-success": "#A8D5AE",
      "--color-warning": "#D9A520",
      "--color-error": "#9C2A2A",
      "--color-info": "#4A90C4",
      "--color-focus": "#7B5EA7",
      "--color-border": "#2C1D0E",
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
      "--radius-xl": "28px",
      "--radius-pill": "999px",
    },
    typography: {
      "--font-headline": "'Zilla Slab', 'Rockwell', serif",
      "--font-display": "'Playfair Display', 'Georgia', serif",
      "--font-body": "'Lora', 'Georgia', serif",
      "--font-ui": "'Nunito', 'system-ui', sans-serif",
      "--font-mono": "'Fira Code', 'Courier New', monospace",
    },
    shadow: {
      "--shadow-sm": "0 1px 3px rgba(92,61,30,0.16)",
      "--shadow-md": "0 4px 12px rgba(92,61,30,0.20)",
      "--shadow-lg": "0 10px 28px rgba(92,61,30,0.26)",
    },
  },

  /* ==========================================================================
   * 18. RESPONSIVE BEHAVIOR
   * ========================================================================== */

  responsive_behavior: {
    desktop:
      "Multi-column quilt rails, hover affordances, botanical sidebar nav, max 1320px content.",
    tablet:
      "2–3 column grids, larger touch targets, collapsible sidebar to icon rail, " +
      "quilt-block section headers compress to single-column.",
    tv:
      "10-foot UI: oversized Zilla Slab titles, bold sunflower-yellow focus rings, " +
      "D-pad driven navigation, large poster art, minimal chrome.",
    mobile:
      "Single column, bottom tab bar with folk-art icons, full-width posters, " +
      "sticky sunflower-yellow play bar, seed-packet card style.",
  },

  /* ==========================================================================
   * 19. SOUND IDENTITY
   * ========================================================================== */

  sound_identity: {
    startup_chime: "A warm banjo pluck resolving to an open major chord with soft reverb.",
    notification: "A gentle handbell ding — like a county-fair ribbon being announced.",
    ui_click: "A soft wooden tap, like a stamped quilt block.",
    success: "A brief ascending fiddle flourish with warm reverb.",
    error: "A low muted thud — like a bag of grain setting down — short, non-alarming.",
  },

  /* ==========================================================================
   * 20. SEASONAL VARIANTS
   * ========================================================================== */

  seasonal_variants: [
    {
      name: "Harvest Festival",
      active_range: "09-15..11-15",
      overrides: {
        "--color-primary": "#D97A2E",
        "--color-bg": "#F5E8CC",
        "--color-surface": "#FBF1E0",
      },
      motif:
        "Pumpkins and dried corn husks line the quilt-border dividers; " +
        "maple-red leaves drift across the hero illustration.",
    },
    {
      name: "Winter Hearth",
      active_range: "11-25..01-06",
      overrides: {
        "--color-primary": "#B83A3A",
        "--color-secondary": "#4E7C59",
        "--color-bg": "#F3ECE2",
      },
      motif:
        "Pine boughs and holly replace wildflowers; a snowy meadow backdrop " +
        "with a lantern-lit farmhouse in the distance.",
    },
    {
      name: "Spring Seedling",
      active_range: "03-20..05-31",
      overrides: {
        "--color-primary": "#6BAE75",
        "--color-secondary": "#A87DC8",
        "--color-bg": "#F4F2E6",
      },
      motif:
        "Tiny seedlings pushing through dark soil; lilac and apple-blossom " +
        "accents replace the full-bloom sunflower.",
    },
  ],

  /* ==========================================================================
   * 21. ACCESSIBILITY
   * ========================================================================== */

  accessibility: {
    minimum_contrast:
      "WCAG AA (4.5:1 body text on hay cream, 3:1 large text/UI). " +
      "Sunflower yellow on hay cream does not meet AA for body text — use " +
      "furrow-brown text on yellow, or violet/barn-red text on cream.",
    focus_style:
      "2px wildflower-violet focus ring with 2px hay-cream offset; always visible " +
      "on both light and dark surfaces.",
    touch_target: "Minimum 44×44px on all interactive elements.",
    motion_reduction:
      "Honor prefers-reduced-motion; replace the sunflower-grow loader and " +
      "pollen-particle animations with simple fades.",
    font_scaling: "Layouts survive 200% text zoom without clipping or horizontal scroll.",
  },

  /* ==========================================================================
   * 22. DO / DON'T
   * ========================================================================== */

  do_dont: {
    colors: {
      do: [
        "Use hay-cream as the default background for every screen",
        "Reserve sunflower yellow for the single primary CTA per view",
        "Pair wildflower violet with hay-cream for readable secondary actions",
      ],
      dont: [
        "Place sunflower yellow text on a hay-cream background (insufficient contrast)",
        "Use neon, cool-grey, or white-white backgrounds",
        "Exceed three accent colors in a single viewport",
      ],
      reason:
        "The palette is warm and community-rooted; cool or electric colors break the " +
        "handcrafted meadow identity immediately.",
    },
    typography: {
      do: [
        "Use Zilla Slab 700 for headlines — it carries the folk-art weight",
        "Use Lora for body copy — the serif warmth reads like an honest letter",
        "Allow italic in display settings for a hand-lettered quality",
      ],
      dont: [
        "Substitute a geometric or grotesque sans for headlines",
        "Use weights below 400 anywhere",
        "Set body text in ALL CAPS",
      ],
      reason: "Typography is the voice of the brand; sans-serif headlines lose the folk warmth.",
    },
    layout: {
      do: [
        "Give each section meadow-like breathing room",
        "Use quilt-block grid patterns as decorative section dividers",
        "Center a single botanical focal point on hero and empty-state screens",
      ],
      dont: [
        "Pack cards wall-to-wall with no margin",
        "Exceed 1320px content width",
        "Use dense dark sidebars or heavy chrome",
      ],
      reason: "Spaciousness is core to the prairie feeling — cramped is the opposite of open sky.",
    },
    animation: {
      do: [
        "Use organic, spring-based motion — sunflowers sway, they do not snap",
        "Respect prefers-reduced-motion by replacing animations with fades",
        "Time microinteractions to 160–300ms for a natural, unhurried feel",
      ],
      dont: [
        "Use abrupt or mechanical linear easing",
        "Animate everything simultaneously",
        "Use rapid fire-hose animations (< 80ms) that feel urgent or anxious",
      ],
      reason: "Prairie Bloom motion should feel like a summer breeze, not a factory machine.",
    },
    imagery: {
      do: [
        "Use warm golden-hour light in all photos",
        "Feature sunflowers, quilts, or open sky somewhere in every hero",
        "Show genuine community moments — shared meals, gatherings, porch life",
      ],
      dont: [
        "Use cool-toned or desaturated photography",
        "Use dark, moody, or dramatic cinematographic grading",
        "Feature urban or industrial backgrounds",
      ],
      reason:
        "Imagery is the brand's heart; a single wrong-toned photo breaks the whole meadow mood.",
    },
    branding: {
      do: [
        "Keep the wordmark in Zilla Slab on hay cream or in a hex-rosette badge",
        "Use approved signature elements — sunflowers, quilts, roosters, hex signs",
      ],
      dont: [
        "Distort, recolor, or stretch the logo",
        "Add corporate symbols (gears, circuit patterns, globe) to the identity",
      ],
      reason: "Consistency in folk-art details builds recognition across all touch points.",
    },
    icons: {
      do: [
        "Use 2px rounded folk-art outlined icons with botanical subjects",
        "Prefer home, leaf, sun, basket, and community subjects",
      ],
      dont: [
        "Use sharp-cornered geometric icons from a tech icon set",
        "Use ultra-thin hairline icons (< 1.5px stroke)",
      ],
      reason: "Icon style echoes the hand-drawn folk illustration language.",
    },
    copywriting: {
      do: [
        "Write like a neighbor, not a brand manager",
        "Use prairie/garden metaphors naturally — bloom, harvest, grow, gather",
        "Keep sentences short and honest",
      ],
      dont: [
        "Use corporate jargon (leverage, synergy, streamlined)",
        "Write notifications with urgency or FOMO pressure",
        "Use sarcasm or irony — genuineness is the whole point",
      ],
      reason: "Voice is what makes Prairie Bloom feel human, not just folksy-themed.",
    },
    ux: {
      do: [
        "Make the primary play action obvious with a sunflower-yellow CTA",
        "Keep user flows short — never more than two taps to start watching",
        "Show shared/community content to reinforce the gathering theme",
      ],
      dont: [
        "Hide the play button or bury it under settings",
        "Add friction with excessive confirmation dialogs",
        "Prioritize cold data over warm, human content curation",
      ],
      reason: "Getting to 'play together' should feel as easy as pulling up a chair.",
    },
    performance: {
      do: [
        "Lazy-load poster art and folk-art illustrations below the fold",
        "Compress paper-grain and quilt-texture assets aggressively (WebP/AVIF)",
        "Preload only the above-fold hero illustration",
      ],
      dont: [
        "Ship full-resolution unoptimized background textures",
        "Block first paint on decorative folk-art embellishments",
      ],
      reason: "Warm visuals are worth loading — but they should not cost a slow first experience.",
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
      "Base/parent Prairie Bloom kit. Theme: American heartland wildflower meadow — " +
      "quilted patterns, folk art, sunflowers, county fairs, hand-stitched embroidery. " +
      "Author variations against this via base_kit.slug = 'prairie-bloom'.",
  },
};

// Export (ESM). Consumers:
//   import baseKit from './prairie-bloom.js'
//   import { brandKit } from './prairie-bloom.js'
// CommonJS consumers on Node 22+ can use: const baseKit = require('./prairie-bloom.js').default
export default brandKit;
export { brandKit };
