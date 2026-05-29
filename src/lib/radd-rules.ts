/**
 * RADD Design Rules — runtime validators for React components and Storybook stories.
 *
 * Every component, story, layout and screen must pass these rules.
 * Source: RADD-Figma-Plugin — the team's Figma quality gate.
 */

// ── Constants ──────────────────────────────────────────────────────────────

/** Allowed State property values */
export const STATE_VALUES = ['Standard', 'Hovered', 'Pressed', 'Focused', 'Visited'] as const;
export type StateValue = typeof STATE_VALUES[number];

/** Allowed Mode property values */
export const MODE_VALUES = ['Standard', 'Informative', 'Error', 'Warning', 'Success'] as const;
export type ModeValue = typeof MODE_VALUES[number];

/** Allowed Viewport property values */
export const VIEWPORT_VALUES = [
  'XXL Large Desktop',
  'XL Desktop',
  'L Laptop',
  'M Tablet',
  'S Mobile',
] as const;
export type ViewportValue = typeof VIEWPORT_VALUES[number];

/** Required variant property order (indices must follow this sequence) */
export const VARIANT_PROP_ORDER = ['Type', 'Variant', 'Size', 'Disabled', 'Read Only', 'State'] as const;

/** Minimum touch-target size in px */
export const MIN_TAPPABLE_AREA = 48;

// ── Rule IDs ───────────────────────────────────────────────────────────────

export type RuleId =
  | 'NAME_HAS_LATIN_CHARACTERS'
  | 'NAME_STARTS_WITH_LETTER'
  | 'NAME_HAS_NO_REDUNDANT_SPACES'
  | 'HAS_PROPER_LENGTH_NAME'
  | 'WORDS_START_WITH_CAPITAL'
  | 'FRAME_AND_TEXT_HAVE_SEMANTIC_NAME'
  | 'STARTS_WITH_CORRECT_DS_PREFIX'
  | 'BOOLEAN_PROPERTY_SHOULD_START_WITH_SHOW'
  | 'PROPERTY_AND_VALUE_TITLE_CASE'
  | 'STATE_PROPERTY_SHOULD_HAVE_SPECIFIC_SET_OF_VALUES'
  | 'MODE_PROPERTY_SHOULD_HAVE_SPECIFIC_SET_OF_VALUES'
  | 'VIEWPORT_PROPERTY_SHOULD_HAVE_SPECIFIC_SET_OF_VALUES'
  | 'VARIANT_PROPERTIES_SPECIFIC_ORDER'
  | 'STYLE_HAS_ONLY_TOKENS'
  | 'HAS_MINIMUM_TAPPABLE_AREA';

export interface RuleViolation {
  rule: RuleId;
  message: string;
  fix?: string;
}

// ── Validators ─────────────────────────────────────────────────────────────

const LATIN_RE = /^[a-zA-Z0-9 !@#$%^&*()_+\-=[\]{}';:"\\|,.<>/?`~—–\-]*$/;
const TITLE_CASE_WORD_RE = /^[A-Z]/;

/** NAME_HAS_LATIN_CHARACTERS */
export function validateLatinChars(name: string): RuleViolation | null {
  if (!LATIN_RE.test(name)) {
    return {
      rule: 'NAME_HAS_LATIN_CHARACTERS',
      message: `"${name}" contains non-Latin characters. Layer names can only have Latin characters.`,
    };
  }
  return null;
}

/** NAME_STARTS_WITH_LETTER */
export function validateStartsWithLetter(name: string): RuleViolation | null {
  if (/^[0-9]/.test(name.trim())) {
    return {
      rule: 'NAME_STARTS_WITH_LETTER',
      message: `"${name}" starts with a number. Layer names must never start with a number.`,
    };
  }
  return null;
}

/** NAME_HAS_NO_REDUNDANT_SPACES */
export function validateNoRedundantSpaces(name: string): RuleViolation | null {
  if (/^\s|\s$/.test(name) || /\s{2,}/.test(name)) {
    return {
      rule: 'NAME_HAS_NO_REDUNDANT_SPACES',
      message: `"${name}" has leading/trailing or multiple consecutive spaces.`,
      fix: 'Remove redundant spaces from the name.',
    };
  }
  return null;
}

/** HAS_PROPER_LENGTH_NAME */
export function validateNameLength(name: string): RuleViolation | null {
  if (name.length > 50) {
    return {
      rule: 'HAS_PROPER_LENGTH_NAME',
      message: `"${name}" is ${name.length} characters. Element names cannot exceed 50 characters.`,
    };
  }
  return null;
}

/** WORDS_START_WITH_CAPITAL */
export function validateTitleCase(name: string): RuleViolation | null {
  const words = name.split(/\s+/).filter(Boolean);
  const invalid = words.filter(w => !TITLE_CASE_WORD_RE.test(w) && /^[a-zA-Z]/.test(w));
  if (invalid.length > 0) {
    return {
      rule: 'WORDS_START_WITH_CAPITAL',
      message: `"${name}" is not Title Case. All words must start with an uppercase letter. (e.g. "Chat Bubble")`,
      fix: 'Convert name to Title Case.',
    };
  }
  return null;
}

/** STARTS_WITH_CORRECT_DS_PREFIX */
export function validateDsPrefix(name: string, prefix: string): RuleViolation | null {
  if (!name.startsWith(prefix)) {
    return {
      rule: 'STARTS_WITH_CORRECT_DS_PREFIX',
      message: `"${name}" must start with the design system prefix "${prefix}". e.g. "${prefix} Chat Bubble"`,
      fix: `Add "${prefix}" prefix to the component name.`,
    };
  }
  return null;
}

/** BOOLEAN_PROPERTY_SHOULD_START_WITH_SHOW */
export function validateBooleanProps(props: Record<string, unknown>): RuleViolation[] {
  return Object.entries(props)
    .filter(([, val]) => typeof val === 'boolean')
    .filter(([key]) => !key.startsWith('show') && !key.startsWith('Show'))
    .map(([key]) => ({
      rule: 'BOOLEAN_PROPERTY_SHOULD_START_WITH_SHOW' as RuleId,
      message: `Boolean prop "${key}" should start with "show" (e.g. "show${key.charAt(0).toUpperCase() + key.slice(1)}").`,
    }));
}

/** STATE_PROPERTY_SHOULD_HAVE_SPECIFIC_SET_OF_VALUES */
export function validateStateValues(state: string): RuleViolation | null {
  if (!(STATE_VALUES as readonly string[]).includes(state)) {
    return {
      rule: 'STATE_PROPERTY_SHOULD_HAVE_SPECIFIC_SET_OF_VALUES',
      message: `State "${state}" is not allowed. Must be one of: ${STATE_VALUES.join(', ')}.`,
    };
  }
  return null;
}

/** MODE_PROPERTY_SHOULD_HAVE_SPECIFIC_SET_OF_VALUES */
export function validateModeValues(mode: string): RuleViolation | null {
  if (!(MODE_VALUES as readonly string[]).includes(mode)) {
    return {
      rule: 'MODE_PROPERTY_SHOULD_HAVE_SPECIFIC_SET_OF_VALUES',
      message: `Mode "${mode}" is not allowed. Must be one of: ${MODE_VALUES.join(', ')}.`,
    };
  }
  return null;
}

/** VARIANT_PROPERTIES_SPECIFIC_ORDER — check that argTypes follow Type→Variant→Size→…→State */
export function validatePropOrder(propNames: string[]): RuleViolation | null {
  const ordered = VARIANT_PROP_ORDER.filter(p =>
    propNames.some(n => n.toLowerCase() === p.toLowerCase())
  );
  for (let i = 0; i < ordered.length - 1; i++) {
    const aIdx = propNames.findIndex(n => n.toLowerCase() === ordered[i].toLowerCase());
    const bIdx = propNames.findIndex(n => n.toLowerCase() === ordered[i + 1].toLowerCase());
    if (aIdx > bIdx) {
      return {
        rule: 'VARIANT_PROPERTIES_SPECIFIC_ORDER',
        message: `Prop order violation: "${ordered[i]}" must come before "${ordered[i + 1]}". Required order: ${VARIANT_PROP_ORDER.join(' → ')}.`,
        fix: 'Re-order variant properties.',
      };
    }
  }
  return null;
}

/** HAS_MINIMUM_TAPPABLE_AREA — check interactive element meets 48px minimum */
export function validateTappableArea(widthPx: number, heightPx: number): RuleViolation | null {
  if (widthPx < MIN_TAPPABLE_AREA || heightPx < MIN_TAPPABLE_AREA) {
    return {
      rule: 'HAS_MINIMUM_TAPPABLE_AREA',
      message: `Interactive element is ${widthPx}×${heightPx}px. Minimum tappable area is ${MIN_TAPPABLE_AREA}×${MIN_TAPPABLE_AREA}px.`,
    };
  }
  return null;
}

/** Run all name-level rules against a single string */
export function validateName(name: string, dsPrefix?: string): RuleViolation[] {
  const violations: RuleViolation[] = [];
  const checks = [
    validateLatinChars(name),
    validateStartsWithLetter(name),
    validateNoRedundantSpaces(name),
    validateNameLength(name),
    validateTitleCase(name),
    dsPrefix ? validateDsPrefix(name, dsPrefix) : null,
  ];
  checks.forEach(v => v && violations.push(v));
  return violations;
}
