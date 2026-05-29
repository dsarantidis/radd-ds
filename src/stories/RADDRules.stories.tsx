import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  STATE_VALUES,
  MODE_VALUES,
  VIEWPORT_VALUES,
  VARIANT_PROP_ORDER,
  MIN_TAPPABLE_AREA,
  validateName,
  validateBooleanProps,
} from '../lib/radd-rules';

const meta: Meta = {
  title: 'RADD/Design Rules',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'All RADD design rules that every component, story, layout and screen must follow. ' +
          'Enforced by the RADD Figma Plugin before design sign-off.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ── Shared UI primitives ───────────────────────────────────────────────────

const colors = {
  bg:         'var(--colours-basic-background, #fff)',
  bgSubtle:   'var(--colours-basic-background-subtle, #f8f8f8)',
  text:       'var(--colours-basic-text, #111)',
  textMuted:  'var(--colours-basic-text-recessive, #616161)',
  accent:     'var(--colours-basic-accent, #FFCE01)',
  border:     'var(--colours-basic-stroke, #e5e5e5)',
  success:    'var(--colours-functional-success-standard, #1A7E31)',
  error:      'var(--colours-functional-destructive-standard, #BC3430)',
  warning:    'var(--colours-functional-warning-standard, #AF510A)',
};

const Page = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontFamily: 'system-ui, sans-serif', background: colors.bg, minHeight: '100vh', padding: '40px', color: colors.text, maxWidth: '900px', margin: '0 auto' }}>
    {children}
  </div>
);

const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', color: colors.text }}>{children}</h1>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: colors.textMuted, margin: '40px 0 16px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '8px' }}>{children}</h2>
);

const Subtitle = ({ children }: { children: React.ReactNode }) => (
  <p style={{ color: colors.textMuted, fontSize: '14px', marginBottom: '32px' }}>{children}</p>
);

const RuleCard = ({ id, title, description, example, fix }: { id: string; title: string; description: string; example?: React.ReactNode; fix?: string }) => (
  <div style={{ border: `1px solid ${colors.border}`, borderRadius: '8px', padding: '16px', marginBottom: '12px', background: colors.bg }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '4px' }}>
      <code style={{ fontSize: '11px', background: colors.bgSubtle, padding: '2px 6px', borderRadius: '4px', color: colors.textMuted, flexShrink: 0 }}>{id}</code>
      <strong style={{ fontSize: '13px', color: colors.text }}>{title}</strong>
    </div>
    <p style={{ fontSize: '13px', color: colors.textMuted, margin: '4px 0' }}>{description}</p>
    {fix && <p style={{ fontSize: '12px', color: colors.success, margin: '4px 0' }}>✓ Fix: {fix}</p>}
    {example && <div style={{ marginTop: '12px' }}>{example}</div>}
  </div>
);

const Badge = ({ ok, label }: { ok: boolean; label: string }) => (
  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '12px', background: ok ? '#d4edda' : '#f8d7da', color: ok ? colors.success : colors.error, fontWeight: 600 }}>
    {ok ? '✓' : '✗'} {label}
  </span>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>{children}</div>
);

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre style={{ background: colors.bgSubtle, padding: '12px', borderRadius: '6px', fontSize: '12px', overflowX: 'auto', margin: '8px 0', color: colors.text }}>{children}</pre>
);

// ── Stories ────────────────────────────────────────────────────────────────

export const NamingConventions: Story = {
  name: 'Naming Conventions',
  render: () => (
    <Page>
      <H1>Naming Conventions</H1>
      <Subtitle>Rules that apply to every layer, component, story and frame name.</Subtitle>

      <RuleCard
        id="WORDS_START_WITH_CAPITAL"
        title="Title Case"
        description='All component, story and layer names must be in Title Case.'
        example={
          <Row>
            <Badge ok={true}  label="Chat Bubble" />
            <Badge ok={true}  label="ODS Bottom Sheet" />
            <Badge ok={false} label="chat bubble" />
            <Badge ok={false} label="chatBubble" />
          </Row>
        }
      />

      <RuleCard
        id="STARTS_WITH_CORRECT_DS_PREFIX"
        title="Design System Prefix"
        description="Component names must start with the DS acronym (e.g. ODS, RADD)."
        example={
          <Row>
            <Badge ok={true}  label="ODS Chat Bubble" />
            <Badge ok={false} label="Chat Bubble" />
            <Badge ok={false} label="Button" />
          </Row>
        }
      />

      <RuleCard
        id="NAME_HAS_LATIN_CHARACTERS"
        title="Latin Characters Only"
        description="Names can only contain Latin characters (a–z, A–Z, 0–9, common symbols)."
      />

      <RuleCard
        id="NAME_STARTS_WITH_LETTER"
        title="Must Start With a Letter"
        description="Names must not start with a number."
        example={
          <Row>
            <Badge ok={true}  label="Chat Bubble" />
            <Badge ok={false} label="1 Chat Bubble" />
          </Row>
        }
      />

      <RuleCard
        id="HAS_PROPER_LENGTH_NAME"
        title="Max 50 Characters"
        description="Element names cannot exceed 50 characters."
      />

      <RuleCard
        id="NAME_HAS_NO_REDUNDANT_SPACES"
        title="No Redundant Spaces"
        description="No leading, trailing or double spaces in names."
      />

      <RuleCard
        id="FRAME_AND_TEXT_HAVE_SEMANTIC_NAME"
        title="Semantic Names"
        description='No "Frame 123" defaults, no " copy" suffix, no name that just repeats the text content.'
        example={
          <Row>
            <Badge ok={true}  label="Avatar Container" />
            <Badge ok={false} label="Frame 42" />
            <Badge ok={false} label="Button copy" />
          </Row>
        }
      />

      <RuleCard
        id="USE_LIST_CONTAINER_IF_THERE_IS_PATTERN"
        title="List Container Suffix"
        description='Frames with repeating children must be named "* List Container".'
        example={
          <Row>
            <Badge ok={true}  label="Message List Container" />
            <Badge ok={false} label="Messages" />
          </Row>
        }
      />
    </Page>
  ),
};

export const PropertyConventions: Story = {
  name: 'Property Conventions',
  render: () => (
    <Page>
      <H1>Property Naming Conventions</H1>
      <Subtitle>Rules for component props, variant names and property values.</Subtitle>

      <RuleCard
        id="BOOLEAN_PROPERTY_SHOULD_START_WITH_SHOW"
        title='Boolean Props → "Show" Prefix'
        description='All boolean props must be prefixed with "Show" (or "show" in camelCase).'
        example={
          <Row>
            <Badge ok={true}  label="showAvatar" />
            <Badge ok={true}  label="showActions" />
            <Badge ok={true}  label="showFooter" />
            <Badge ok={false} label="hasAvatar" />
            <Badge ok={false} label="actions" />
            <Badge ok={false} label="isLoading" />
          </Row>
        }
      />

      <RuleCard
        id="VARIANT_PROPERTIES_SPECIFIC_ORDER"
        title="Property Order"
        description={`Variant properties must follow this exact order: ${VARIANT_PROP_ORDER.join(' → ')}`}
        example={
          <CodeBlock>{`// ✓ Correct order
interface Props {
  type?:     'text' | 'slot';    // Type
  variant?:  'incoming' | 'outgoing'; // Variant
  size?:     'small' | 'medium'; // Size
  // ... other props ...
  disabled?: boolean;            // Disabled
  readOnly?: boolean;            // Read Only
  state?:    StateValue;         // State (always last)
}`}</CodeBlock>
        }
      />

      <RuleCard
        id="STATE_PROPERTY_SHOULD_HAVE_SPECIFIC_SET_OF_VALUES"
        title="State Prop — Controlled Vocabulary"
        description={`When a prop is named "state", its values MUST be exactly: ${STATE_VALUES.join(', ')}`}
        example={
          <Row>
            {STATE_VALUES.map(v => <Badge key={v} ok={true} label={v} />)}
            <Badge ok={false} label="active" />
            <Badge ok={false} label="disabled" />
            <Badge ok={false} label="hover" />
          </Row>
        }
      />

      <RuleCard
        id="MODE_PROPERTY_SHOULD_HAVE_SPECIFIC_SET_OF_VALUES"
        title="Mode Prop — Controlled Vocabulary"
        description={`When a prop is named "mode", values MUST be: ${MODE_VALUES.join(', ')}`}
        example={
          <Row>
            {MODE_VALUES.map(v => <Badge key={v} ok={true} label={v} />)}
            <Badge ok={false} label="default" />
            <Badge ok={false} label="danger" />
          </Row>
        }
      />

      <RuleCard
        id="VIEWPORT_PROPERTY_SHOULD_HAVE_SPECIFIC_SET_OF_VALUES"
        title="Viewport Prop — Controlled Vocabulary"
        description={`When a prop is named "viewport", values MUST be: ${VIEWPORT_VALUES.join(', ')}`}
        example={
          <Row>
            {VIEWPORT_VALUES.map(v => <Badge key={v} ok={true} label={v} />)}
          </Row>
        }
      />

      <RuleCard
        id="PROPERTY_AND_VALUE_TITLE_CASE"
        title="Property & Value Title Case"
        description="Property names and variant option values must all be in Title Case."
        example={
          <Row>
            <Badge ok={true}  label="Variant=Incoming" />
            <Badge ok={false} label="variant=incoming" />
          </Row>
        }
      />

      <RuleCard
        id="READ_ONLY_PROPERTY_SHOULD_BE_READ_ONLY"
        title="Read Only Property Name"
        description='Read-only properties must be named exactly "Read Only" (no other spelling).'
      />
    </Page>
  ),
};

export const StructureConventions: Story = {
  name: 'Structure Conventions',
  render: () => (
    <Page>
      <H1>Structure Conventions</H1>
      <Subtitle>Layout, containment and sizing rules for every element.</Subtitle>

      <RuleCard
        id="HAS_AUTO_LAYOUT"
        title="Always Use Auto Layout (Flexbox)"
        description="Every frame must use auto-layout (CSS: display:flex). No static/absolute containers."
        example={
          <CodeBlock>{`/* ✓ Correct — flex container */
.component { display: flex; gap: 8px; align-items: flex-start; }

/* ✗ Wrong — static positioning */
.component { position: relative; }
.child { position: absolute; top: 0; }`}</CodeBlock>
        }
      />

      <RuleCard
        id="USE_ONLY_FRAMES_IN_DESIGNS"
        title="Frames Only, No Groups"
        description="Use flex div containers instead of display:contents or non-layout wrappers."
      />

      <RuleCard
        id="NO_WIDTH_FILL_INSIDE_HUG_LAYOUT"
        title="No Fill Width Inside Hug Parent"
        description='A child cannot use width:100% (Fill) when its parent has width:fit-content (Hug).'
        example={
          <CodeBlock>{`/* ✗ Invalid */
.parent { display: inline-flex; } /* hug */
.child  { flex: 1; }               /* fill — invalid! */

/* ✓ Valid */
.parent { display: flex; width: 360px; } /* fixed/fill */
.child  { flex: 1; }                     /* fill — OK */`}</CodeBlock>
        }
      />

      <RuleCard
        id="NO_GAP_ON_LAYERS_WITH_LESS_THAN_TWO_CHILDREN"
        title="No Gap With Single Child"
        description="Do not set gap > 0 on a flex container that has only one visible child."
      />

      <RuleCard
        id="IS_ACCEPTABLE_SHAPE"
        title="Only Frames — Shapes for Images Only"
        description="Use <div> containers for structure. Raw shapes (rect, ellipse) only inside <img> or <video> wrappers."
      />

      <RuleCard
        id="COMPONENT_SHOULD_HAVE_FIXED_FRAME_WRAPPER"
        title="Fixed Wrapper Around Fill Component"
        description="Components must not have a fixed width themselves. Wrap them in a fixed-width container; the component uses Fill (flex:1 or width:100%)."
        example={
          <CodeBlock>{`/* ✓ Correct */
<div style={{ width: 360 }}>          {/* fixed wrapper */}
  <ChatBubble style={{ flex: 1 }} />  {/* fill */}
</div>`}</CodeBlock>
        }
      />
    </Page>
  ),
};

export const StylingConventions: Story = {
  name: 'Styling Conventions',
  render: () => (
    <Page>
      <H1>Styling Conventions</H1>
      <Subtitle>All visual values must come from the design token chain — never raw hex/px literals.</Subtitle>

      <RuleCard
        id="STYLE_HAS_ONLY_TOKENS__ERROR"
        title="Tokens Only — No Raw Values"
        description="Every color and typography value must reference a CSS custom property from the foundation layer."
        example={
          <CodeBlock>{`/* ✓ Tokens */
background: var(--colours-basic-background, #fff);
color:      var(--colours-basic-text, #111);
padding:    var(--spacing-component-5, 16px);
font-size:  var(--typography-body-m-regular-size, 16px);

/* ✗ Raw values — FORBIDDEN */
background: #f1f1f1;
color:      rgb(17, 17, 17);
padding:    16px;`}</CodeBlock>
        }
      />

      <RuleCard
        id="HAS_INSIDE_STROKE_ALIGN_AND_STROKES_INCLUDED"
        title="Strokes: Inside + Included"
        description="Borders must be inside (box-sizing: border-box) and included in layout."
        example={
          <CodeBlock>{`/* ✓ */
box-sizing: border-box;
border: 1px solid var(--colours-basic-stroke);`}</CodeBlock>
        }
      />

      <RuleCard
        id="HAS_ALLOWED_STYLING_CHANGES"
        title="Instance Overrides: Dimensions Only"
        description="When using a component, only override: width, height, min/max dimensions, layout sizing mode. Never override background, color, padding, radius, shadow or gap."
        example={
          <CodeBlock>{`/* ✓ Allowed instance overrides */
<ChatBubble style={{ width: '100%' }} />

/* ✗ Forbidden overrides */
<ChatBubble style={{ background: 'red', padding: 24 }} />`}</CodeBlock>
        }
      />

      <RuleCard
        id="LAYER_STYLES_ARE_VISIBLE_AND_ACTIVE"
        title="Remove Hidden/Unused Styles"
        description="Don't keep invisible CSS (display:none styles, opacity:0 fills). Remove them to keep components clean."
      />
    </Page>
  ),
};

export const AccessibilityRules: Story = {
  name: 'Accessibility Rules',
  render: () => (
    <Page>
      <H1>Accessibility Rules</H1>
      <Subtitle>Rules that ensure components meet minimum usability requirements.</Subtitle>

      <RuleCard
        id="HAS_MINIMUM_TAPPABLE_AREA"
        title={`Minimum Tappable Area — ${MIN_TAPPABLE_AREA}px`}
        description={`Any interactive element (button, link, toggle) that has a State property must have a minimum touch target of ${MIN_TAPPABLE_AREA}×${MIN_TAPPABLE_AREA}px.`}
        example={
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', marginTop: '8px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: MIN_TAPPABLE_AREA, height: MIN_TAPPABLE_AREA, background: colors.success, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px' }}>
                {MIN_TAPPABLE_AREA}px
              </div>
              <div style={{ fontSize: '11px', color: colors.success, marginTop: '4px' }}>✓ Min size</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 32, height: 32, background: colors.error, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px' }}>
                32px
              </div>
              <div style={{ fontSize: '11px', color: colors.error, marginTop: '4px' }}>✗ Too small</div>
            </div>
          </div>
        }
      />
    </Page>
  ),
};

// ── Live validator ─────────────────────────────────────────────────────────

export const LiveValidator: Story = {
  name: 'Live Validator',
  parameters: {
    docs: {
      description: {
        story: 'Interactive checker — run RADD name rules against any string.',
      },
    },
  },
  render: () => {
    const examples = [
      { input: 'ODS Chat Bubble', dsPrefix: 'ODS' },
      { input: 'chat bubble', dsPrefix: 'ODS' },
      { input: '1 Button', dsPrefix: 'ODS' },
      { input: 'Chat  Bubble', dsPrefix: 'ODS' },
      { input: 'ODS Chat Bubble With A Very Long Name That Exceeds Fifty Characters', dsPrefix: 'ODS' },
      { input: 'ODS Button', dsPrefix: 'ODS' },
    ];

    return (
      <Page>
        <H1>Live Validator</H1>
        <Subtitle>Runs name-level RADD rules against each example string.</Subtitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {examples.map(({ input, dsPrefix }) => {
            const violations = validateName(input, dsPrefix);
            return (
              <div key={input} style={{ border: `1px solid ${violations.length ? colors.error : colors.success}`, borderRadius: '8px', padding: '12px', background: colors.bg }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: violations.length ? '8px' : 0 }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: colors.text }}>"{input}"</span>
                  <span style={{ fontSize: '11px', color: violations.length ? colors.error : colors.success, fontWeight: 600 }}>
                    {violations.length ? `${violations.length} violation${violations.length > 1 ? 's' : ''}` : '✓ Passes all rules'}
                  </span>
                </div>
                {violations.map((v, i) => (
                  <div key={i} style={{ fontSize: '12px', color: colors.error, marginTop: '4px' }}>
                    ✗ [{v.rule}] {v.message}
                    {v.fix && <span style={{ color: colors.success }}> → {v.fix}</span>}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <H2>Boolean Prop Validator</H2>
        {[
          { label: '✓ Correct', props: { showAvatar: true, showFooter: false, showActions: true } },
          { label: '✗ Violations', props: { hasAvatar: true, loading: false, active: true } },
        ].map(({ label, props }) => {
          const violations = validateBooleanProps(props);
          return (
            <div key={label} style={{ border: `1px solid ${violations.length ? colors.error : colors.success}`, borderRadius: '8px', padding: '12px', marginBottom: '8px' }}>
              <code style={{ fontSize: '12px' }}>{JSON.stringify(Object.keys(props))}</code>
              <div style={{ marginTop: '6px' }}>
                {violations.length === 0
                  ? <span style={{ color: colors.success, fontSize: '12px' }}>✓ All boolean props follow "show" convention</span>
                  : violations.map((v, i) => <div key={i} style={{ color: colors.error, fontSize: '12px' }}>✗ {v.message}</div>)
                }
              </div>
            </div>
          );
        })}
      </Page>
    );
  },
};
