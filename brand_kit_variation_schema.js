/**
 * ============================================================================
 *  PHLIX BRAND KIT VARIATION SCHEMA  —  brand_kit_variation_schema.js
 * ============================================================================
 *
 *  WHAT THIS IS
 *  ------------
 *  A VARIATION kit is a *child* identity that is tied to a BASE (parent) kit
 *  defined in brand_kit_schema.js. A variation does NOT redefine the whole
 *  brand. Instead it:
 *
 *     1. Points at its parent via `base_kit` (the parent/base kit it extends).
 *     2. Adds variation-only identity fields (`sub_name`, `variation`).
 *     3. Adds extra customization fields that set this variation apart from
 *        *sibling* variations sharing the same base (mood, use_case,
 *        differentiators, signature_twist, etc.).
 *     4. Optionally replaces individual base values through `overrides`
 *        (a partial-shaped subset of any base-kit field).
 *
 *  INHERITANCE / MERGE SEMANTICS
 *  -----------------------------
 *  Resolve a variation into a full, usable kit like this:
 *
 *     resolved = deepMerge( baseKit , variation.overrides )
 *     resolved = { ...resolved, ...variationOnlyTopLevelFields }
 *
 *  Rules:
 *     • A variation INHERITS every field of its base kit by default.
 *     • Any field present in `overrides` REPLACES the matching base field
 *       (deep-merge objects; arrays replace wholesale unless your merger is
 *       configured to concat — default is replace).
 *     • ORDERED ARRAYS REPLACE WHOLESALE. Fields whose ORDER is meaningful —
 *       e.g. `site_architecture.nav`, `homepage_narrative.sections`, and
 *       `feature_casting.hero` — are replaced in full when overridden: a
 *       variation re-declares the ENTIRE ordered array, it never splices into,
 *       appends to, or reorders the base's array in place. Declare the whole
 *       order you want.
 *     • Variation-only top-level fields (sub_name, variation, experience_twist,
 *       mood, use_case, differentiators, signature_twist, priority, is_default,
 *       tags) are ADDITIVE and never exist on the base.
 *     • `name` and `slug` resolution:
 *           - display name  = base_kit.name + " — " + sub_name
 *           - resolved slug = this file's `slug` (full, includes the sub_name)
 *
 *  FIELDS THAT LIVE ONLY ON VARIATIONS (absent from the base by design)
 *  -------------------------------------------------------------------
 *     • sub_name
 *     • variation
 *     • experience_twist
 *     • base_kit      (the parent link)
 *     • overrides     (partial base overrides)
 *     • mood / intensity / use_case / context / differentiators /
 *       signature_twist / target_segment / priority / is_default
 *
 *  FIELD COMMENT FORMAT (same as the base schema)
 *  ----------------------------------------------
 *     Label : human-readable name
 *     Type  : data type
 *     About : meaning / usage
 *     Values: allowed/enum values (where applicable)
 *     e.g.  : example value(s)
 *
 *  The object below is a fully populated example: the "Sunday Matinee"
 *  variation of the "Retro Film Reel" base kit.
 *
 *  USAGE
 *  -----
 *      import baseKit      from './brand_kit_schema.js'
 *      import variation    from './brand_kit_variation_schema.js'
 *      const resolved = resolveVariation(baseKit, variation)  // your merge fn
 * ============================================================================
 */

const brandKitVariation = {

  /* ==========================================================================
   * 0. PARENT LINK  — which base/parent kit this variation extends
   * ========================================================================== */

  // ── base_kit ───────────────────────────────────────────────────────────────
  // Label : Base / Parent Kit
  // Type  : object   (REQUIRED — this is what makes it a variation)
  // About : The base kit this variation is tied to and inherits from. The
  //         `slug` must match a base kit's top-level `slug`. `version` pins the
  //         base version this variation was authored against (optional but
  //         recommended so you can detect drift when the base changes).
  // Shape :
  //         {
  //           slug    : string  — base kit slug (REQUIRED, foreign key)
  //           name    : string  — base kit display name (denormalized for convenience)
  //           version : string  — base kit version this variation targets
  //           ref     : string  — optional path/URL/registry id of the base file
  //         }
  // e.g.  : { slug: "retro-film-reel", name: "Retro Film Reel", version: "1.2" }
  base_kit: {
    slug: "retro-film-reel",
    name: "Retro Film Reel",
    version: "1.2",
    ref: "./brand_kit_schema.js",
  },

  /* ==========================================================================
   * 1. VARIATION IDENTITY  — fields unique to variations
   * ========================================================================== */

  // ── name ───────────────────────────────────────────────────────────────────
  // Label : Brand Name (inherited)
  // Type  : string
  // About : Usually mirrors the base kit's name. Kept here for convenience and
  //         standalone rendering. Leave equal to `base_kit.name` unless this
  //         variation intentionally rebrands the parent.
  // e.g.  : "Retro Film Reel"
  name: "Retro Film Reel",

  // ── sub_name ───────────────────────────────────────────────────────────────
  // Label : Sub Name (variation subtitle)
  // Type  : string   (VARIATION-ONLY — never on the base kit)
  // About : The variation's subtitle. Combined with the base name to form the
  //         full display name: "Retro Film Reel — Sunday Matinee".
  // e.g.  : "Sunday Matinee"
  sub_name: "Sunday Matinee",

  // ── slug ───────────────────────────────────────────────────────────────────
  // Label : Slug (full)
  // Type  : string   (kebab-case, unique)
  // About : The full machine id for this variation — base slug + sub_name slug.
  // e.g.  : "retro-film-reel-sunday-matinee"
  slug: "retro-film-reel-sunday-matinee",

  // ── variation ──────────────────────────────────────────────────────────────
  // Label : Variation Statement
  // Type  : string   (VARIATION-ONLY — never on the base kit)
  // About : One sentence explaining what makes THIS variation unique versus its
  //         siblings. This is the single most important differentiator field.
  // e.g.  : "Soft family-friendly, popcorn vibes, warm and approachable."
  variation: "Soft family-friendly, popcorn vibes, warm and approachable.",

  // ── version ────────────────────────────────────────────────────────────────
  // Label : Variation Version
  // Type  : string
  // About : Content version of this variation's own values (independent of the
  //         base kit version it targets).
  version: "1.0",

  // ── description ────────────────────────────────────────────────────────────
  // Label : Description
  // Type  : string
  // About : Short paragraph describing this variation specifically.
  description:
    "The gentlest, most family-friendly cut of Retro Film Reel — bright cream, " +
    "soft mint accents, rounded everything, and Saturday-morning-cartoon warmth.",

  /* ==========================================================================
   * 2. DISTINGUISHING FIELDS  — set this variation apart from its siblings
   *    (These are the "1 or more additional fields" that further customize a
   *     variation beyond the shared base identity.)
   * ========================================================================== */

  // ── mood ───────────────────────────────────────────────────────────────────
  // Label : Mood
  // Type  : array<string>
  // About : The emotional dial for this variation. Siblings of the same base
  //         differ primarily by mood (e.g. "Sunday Matinee" vs a "Midnight
  //         Noir" variation).
  mood: ["Soft", "Cozy", "Cheerful", "Wholesome"],

  // ── intensity ──────────────────────────────────────────────────────────────
  // Label : Intensity
  // Type  : enum<string>
  // Values: "subtle" | "soft" | "balanced" | "bold" | "dramatic"
  // About : How loud/strong the brand expression is in this variation. "Sunday
  //         Matinee" sits at the soft end of the dial.
  intensity: "soft",

  // ── use_case ───────────────────────────────────────────────────────────────
  // Label : Use Case
  // Type  : array<string>
  // About : Where/when this variation should be applied. Drives automatic theme
  //         selection, and — together with `target_segment` — is the intended
  //         signal for resolving this variation's `feature_casting` and
  //         `visitor_paths` overrides when authoring (which features to hero and
  //         which self-select paths to fork for this moment/audience).
  use_case: [
    "Kids & family profiles",
    "Weekend / matinee landing pages",
    "Onboarding for new households",
  ],

  // ── context ────────────────────────────────────────────────────────────────
  // Label : Context
  // Type  : string
  // About : Free-text note on the situational fit for this variation.
  context:
    "Use whenever the audience skews family/kids or the moment should feel " +
    "light and welcoming rather than cinematic-dramatic.",

  // ── target_segment ─────────────────────────────────────────────────────────
  // Label : Target Segment
  // Type  : array<string>
  // About : The audience subset this variation is tuned for (narrower than the
  //         base kit's `audience`). Together with `use_case`, it drives which
  //         features a variation casts into the spotlight (`feature_casting`) and
  //         which self-select `visitor_paths` (if any) make sense for that
  //         audience.
  target_segment: ["Families with young kids", "Casual weekend viewers"],

  // ── differentiators ────────────────────────────────────────────────────────
  // Label : Differentiators
  // Type  : array<string>
  // About : Explicit, concrete ways this variation differs from sibling
  //         variations of the same base. Be specific — generators read this to
  //         avoid blending variations together.
  differentiators: [
    "Softer, lighter palette (more cream, mint accents) than the base default.",
    "Rounder corners and bouncier motion than other variations.",
    "Friendlier, simpler copy aimed at all ages.",
    "Popcorn motif is foregrounded; noir/marquee-dark cues are dropped.",
  ],

  // ── signature_twist ────────────────────────────────────────────────────────
  // Label : Signature Twist
  // Type  : string
  // About : The single recurring motif/flourish that uniquely marks this
  //         variation (a focused override of the base's signature_elements).
  signature_twist: "An ever-present friendly popcorn bucket character (Reelo's snack).",

  // ── experience_twist ───────────────────────────────────────────────────────
  // Label : Experience Twist
  // Type  : string   (VARIATION-ONLY — the experiential sibling of signature_twist)
  // About : One sentence naming the single EXPERIENTIAL (not merely visual)
  //         difference versus sibling variations — how the site actually BEHAVES
  //         or is STRUCTURED differently, not just how it is colored. Where
  //         `signature_twist` names the recurring motif, this names the changed
  //         experience (interaction model, companion behavior, funnel, etc.).
  // e.g.  : see below
  experience_twist:
    "Same base information architecture, but Reelo's on-page companion tips are " +
    "turned on and the hero drops the base's parallax-diorama motion for a simple " +
    "static illustration — gentler and calmer for a family audience.",

  // ── tags ───────────────────────────────────────────────────────────────────
  // Label : Tags
  // Type  : array<string>
  // About : Free-form labels for filtering/search within a variation library.
  tags: ["family", "soft", "kids", "weekend", "default-friendly"],

  // ── priority ───────────────────────────────────────────────────────────────
  // Label : Priority
  // Type  : number   (lower = higher priority when auto-selecting variations)
  // About : Tie-breaker when multiple variations match a context.
  priority: 10,

  // ── is_default ─────────────────────────────────────────────────────────────
  // Label : Is Default Variation
  // Type  : boolean
  // About : Whether this is the default variation to fall back to for its base
  //         kit when no other variation is selected.
  is_default: true,

  /* ==========================================================================
   * 3. OVERRIDES  — selective replacements of inherited base fields
   * ==========================================================================
   *  Anything NOT listed here is inherited unchanged from the base kit.
   *  Each key mirrors a base-kit field path; objects deep-merge, scalars and
   *  arrays replace. Keep this block SMALL — only what actually differs.
   * ========================================================================== */

  // ── overrides ──────────────────────────────────────────────────────────────
  // Label : Overrides
  // Type  : object   (partial shape of the base kit — VARIATION-ONLY)
  // About : The subset of base-kit values this variation changes. Resolution is
  //         deepMerge(baseKit, overrides). Use base-kit field names as keys.
  overrides: {

    // Lean the personality/voice softer & more child-friendly than the base.
    personality: ["Nostalgic", "Fun", "Family-friendly", "Cozy", "Gentle"],
    voice: ["Playful", "Approachable", "Warm", "Slightly quirky"],
    tone: ["Gentle", "Reassuring", "Cheerful"],

    // Nudge the palette lighter/softer (these MERGE into base colors; only the
    // listed roles change — everything else inherits).
    colors: {
      secondary: {
        name: "Soft Mint",
        hex: "#A3E4D7",
        rgb: "rgb(163, 228, 215)",
        hsl: "hsl(168, 56%, 77%)",
        usage: "Primary accent for this variation — gentler than base teal.",
        contrast_targets: ["black_outline"],
      },
      accent: {
        name: "Mint",
        hex: "#A3E4D7",
        rgb: "rgb(163, 228, 215)",
        hsl: "hsl(168, 56%, 77%)",
        usage: "Soft highlights, badges, success states.",
        contrast_targets: ["black_outline"],
      },
    },

    // Softer, rounder shapes than the base defaults.
    corner_radius: {
      small: "10px",
      medium: "16px",
      large: "24px",
      xl: "36px",
      pill: "999px",
    },

    // Bouncier, gentler motion for the family feel.
    motion_style: ["Playful", "Slow", "Bouncy", "Gentle"],
    animation_speed: "slow",

    // Tighten the UI guidance toward family-friendliness.
    ui_style: [
      "Soft warm tones",
      "Popcorn bucket motifs",
      "Family-friendly feel",
      "Rounded everything",
      "Cozy theater ambiance",
    ],

    // Variation-specific copy.
    tagline_primary: "Home Theater, Upgraded.",
    greetings: ["Ready for the matinee?", "Popcorn's ready 🍿", "Welcome back, take a seat!"],

    // Tilt AI image generation softer.
    image_prompt_suffix:
      ", soft pastel cream-and-mint palette, extra-rounded shapes, wholesome and " +
      "child-friendly, gentle golden light, high quality.",

    // Narrow the do/dont with one extra rule specific to this variation.
    color_rules: [
      "Never use more than 3 accent colors in a single view.",
      "Backgrounds should always be cream.",
      "Avoid fully saturated, neon, or electric colors.",
      "Favor soft mint over the base's brighter teal for accents.",
    ],

    // ── Experience overrides (new §22–§26 fields) ─────────────────────────────
    // Re-cast the features to hero the family / profile-safety story. NOTE: this
    // whole ordered `hero` array REPLACES the base's — it is re-declared in full,
    // never spliced into the base order.
    feature_casting: {
      hero: [
        { id: "auth",     angle: "Everyone gets their own seat — kid-safe profiles and a gentle rating filter." },
        { id: "syncplay", angle: "Watch together even when you're apart — perfectly in step." },
      ],
      support: ["library", "transcode", "hub"],
      footnote: ["dlna", "livetv", "plugins"],
      omit_from_home: [],
    },

    // Turn Reelo's companion on more warmly (deep-merges into base mascot, so
    // name/species/poses are inherited; only `behavior` is replaced).
    mascot: {
      behavior: {
        placement: "Bottom-right on Home, Download, and About — a little brighter and more present than the base.",
        idle: "Softly bobs and offers popcorn; motion is disabled under prefers-reduced-motion.",
        tips: [
          { where: "home:#hero",       say: "Pull the whole family up a seat — I saved you the good row." },
          { where: "download:#server", say: "Two little steps and it's showtime. I'll get the lights." },
        ],
        easter_interactions: [
          { trigger: "click:3", react: "Reelo giggles and shares a popcorn kernel with the kids." },
        ],
        dismiss: "A soft 'Nap time, Reelo' button tucks him away; remembered via localStorage.",
      },
    },

    // Calm the hero: static illustration instead of the base's parallax diorama.
    hero_experience: {
      mode: "static",
      spec: "A single flat painted marquee illustration, curtain already open and Reelo waving — no parallax, no motion.",
      suggested_inputs: [],
      fallback: "This static illustration IS the fallback; the same headline, subheadline, and both CTAs are baked into the markup.",
      js_budget_kb: 0,
    },

    // Softest, plainest reading contract for an all-ages audience.
    complexity_profile: {
      density: "minimal",
      reading_level: "plain-language",
      jargon_policy: "translate",
      page_budget: { home_sections_max: 4, words_per_section_max: 70 },
    },
  },

  /* ==========================================================================
   * 4. METADATA
   * ========================================================================== */

  // ── metadata ───────────────────────────────────────────────────────────────
  // Label : Metadata
  // Type  : object
  // About : Bookkeeping for this variation file.
  metadata: {
    author: "Phlix Design",                          // string
    created: "2026-06-30",                            // string (ISO date)
    updated: "2026-06-30",                            // string (ISO date)
    license: "Proprietary — Phlix internal use.",     // string
    compatible_models: ["claude-opus-4-8", "sdxl", "flux.1"], // array<string>
    schema_version: "2.1",                            // string — variation schema shape version
    kit_type: "variation",                            // string — always "variation" here
    notes:
      "Variation of base 'retro-film-reel'. Resolve via deepMerge(base, overrides) " +
      "then apply the variation-only top-level fields.",
  },
};

// Export (ESM). Consumers:
//   import variation from './brand_kit_variation_schema.js'
//   import { brandKitVariation } from './brand_kit_variation_schema.js'
// CommonJS consumers on Node 22+ can use:  const v = require('./brand_kit_variation_schema.js').default
export default brandKitVariation;
export { brandKitVariation };
