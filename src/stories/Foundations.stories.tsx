import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Foundations/Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Live design tokens from the RADD 2.0 Foundations Figma file — synced via figma-console-mcp and built with style-dictionary.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// ── Shared primitives ──────────────────────────────────────────────────

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ padding: '32px', borderBottom: '1px solid var(--colours-basic-stroke, #e5e5e5)' }}>
    <h2 style={{ margin: '0 0 24px', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--colours-basic-text-recessive, #616161)', fontFamily: 'system-ui, sans-serif' }}>
      {title}
    </h2>
    {children}
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--colours-basic-text-recessive, #888)', marginTop: '6px', display: 'block', wordBreak: 'break-all' }}>
    {children}
  </span>
);

// ── Colour swatch ──────────────────────────────────────────────────────

const Swatch = ({ name, cssVar, size = 48 }: { name: string; cssVar: string; size?: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minWidth: '80px', maxWidth: '120px' }}>
    <div
      style={{
        width: '100%',
        height: size,
        borderRadius: '6px',
        background: cssVar,
        border: '1px solid rgba(0,0,0,0.08)',
        boxSizing: 'border-box',
      }}
    />
    <Label>{name}</Label>
    <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#aaa', marginTop: '2px' }}>{cssVar}</span>
  </div>
);

const SwatchGroup = ({ title, items }: { title: string; items: Array<{ name: string; cssVar: string }> }) => (
  <div style={{ marginBottom: '32px' }}>
    <h3 style={{ margin: '0 0 12px', fontSize: '12px', fontWeight: 600, color: 'var(--colours-basic-text, #111)', fontFamily: 'system-ui, sans-serif' }}>
      {title}
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      {items.map((item) => (
        <Swatch key={item.cssVar} name={item.name} cssVar={item.cssVar} />
      ))}
    </div>
  </div>
);

// ── Spacing swatch ─────────────────────────────────────────────────────

const SpacingItem = ({ name, cssVar }: { name: string; cssVar: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
    <div style={{ width: cssVar, height: '20px', background: 'var(--colours-basic-accent, #e20074)', borderRadius: '2px', minWidth: '4px', flexShrink: 0 }} />
    <Label>{name} — {cssVar}</Label>
  </div>
);

// ── Radius swatch ──────────────────────────────────────────────────────

const RadiusItem = ({ name, cssVar }: { name: string; cssVar: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    <div
      style={{
        width: '64px',
        height: '64px',
        background: 'var(--colours-basic-accent, #e20074)',
        borderRadius: cssVar,
        opacity: 0.8,
      }}
    />
    <Label>{name}</Label>
    <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#aaa' }}>{cssVar}</span>
  </div>
);

// ── Elevation ─────────────────────────────────────────────────────────

const ElevationItem = ({ name, cssVar }: { name: string; cssVar: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    <div
      style={{
        width: '80px',
        height: '80px',
        borderRadius: '8px',
        background: 'var(--colours-basic-background, #fff)',
        boxShadow: cssVar,
        border: '1px solid rgba(0,0,0,0.04)',
      }}
    />
    <Label>{name}</Label>
  </div>
);

// ── Stories ────────────────────────────────────────────────────────────

export const Colours: Story = {
  name: 'Colours',
  render: () => (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: 'var(--colours-basic-background, #fff)', minHeight: '100vh' }}>
      <Section title="Basic">
        <SwatchGroup title="Surfaces" items={[
          { name: 'background', cssVar: 'var(--colours-basic-background)' },
          { name: 'background-subtle', cssVar: 'var(--colours-basic-background-subtle)' },
          { name: 'background-card', cssVar: 'var(--colours-basic-background-card)' },
        ]} />
        <SwatchGroup title="Text" items={[
          { name: 'text', cssVar: 'var(--colours-basic-text)' },
          { name: 'text-dominant', cssVar: 'var(--colours-basic-text-dominant)' },
          { name: 'text-recessive', cssVar: 'var(--colours-basic-text-recessive)' },
          { name: 'text-link', cssVar: 'var(--colours-basic-text-link)' },
        ]} />
        <SwatchGroup title="Accent" items={[
          { name: 'accent', cssVar: 'var(--colours-basic-accent)' },
          { name: 'text-on-accent', cssVar: 'var(--colours-basic-text-on-accent)' },
          { name: 'accent-secondary', cssVar: 'var(--colours-basic-accent-secondary)' },
          { name: 'text-on-accent-secondary', cssVar: 'var(--colours-basic-text-on-accent-secondary)' },
        ]} />
        <SwatchGroup title="Stroke" items={[
          { name: 'stroke', cssVar: 'var(--colours-basic-stroke)' },
          { name: 'stroke-subtle', cssVar: 'var(--colours-basic-stroke-subtle)' },
          { name: 'modal-overlay', cssVar: 'var(--colours-basic-modal-overlay)' },
        ]} />
      </Section>

      <Section title="Functional">
        <SwatchGroup title="Success" items={[
          { name: 'standard', cssVar: 'var(--colours-functional-success-standard)' },
          { name: 'subtle', cssVar: 'var(--colours-functional-success-subtle)' },
          { name: 'hovered', cssVar: 'var(--colours-functional-success-hovered)' },
          { name: 'pressed', cssVar: 'var(--colours-functional-success-pressed)' },
        ]} />
        <SwatchGroup title="Warning" items={[
          { name: 'standard', cssVar: 'var(--colours-functional-warning-standard)' },
          { name: 'subtle', cssVar: 'var(--colours-functional-warning-subtle)' },
          { name: 'hovered', cssVar: 'var(--colours-functional-warning-hovered)' },
          { name: 'pressed', cssVar: 'var(--colours-functional-warning-pressed)' },
        ]} />
        <SwatchGroup title="Destructive" items={[
          { name: 'standard', cssVar: 'var(--colours-functional-destructive-standard)' },
          { name: 'subtle', cssVar: 'var(--colours-functional-destructive-subtle)' },
          { name: 'hovered', cssVar: 'var(--colours-functional-destructive-hovered)' },
          { name: 'pressed', cssVar: 'var(--colours-functional-destructive-pressed)' },
        ]} />
        <SwatchGroup title="Informational" items={[
          { name: 'standard', cssVar: 'var(--colours-functional-informational-standard)' },
          { name: 'subtle', cssVar: 'var(--colours-functional-informational-subtle)' },
          { name: 'hovered', cssVar: 'var(--colours-functional-informational-hovered)' },
          { name: 'pressed', cssVar: 'var(--colours-functional-informational-pressed)' },
        ]} />
        <SwatchGroup title="Notification" items={[
          { name: 'notification', cssVar: 'var(--colours-functional-notification-notification)' },
          { name: 'text-on-notification', cssVar: 'var(--colours-functional-notification-text-on-notification)' },
        ]} />
      </Section>

      <Section title="Neutral Shades">
        <SwatchGroup title="" items={[100,200,300,400,500,600,700,800,900].map(n => ({
          name: `${n}`,
          cssVar: `var(--colours-shades-neutral-shades-${n})`,
        }))} />
      </Section>

      <Section title="Accent Shades">
        <SwatchGroup title="" items={[
          { name: 'subtle', cssVar: 'var(--colours-shades-accent-shades-accent-subtle)' },
          { name: 'extra-recessive', cssVar: 'var(--colours-shades-accent-shades-accent-extra-recessive)' },
          { name: 'recessive', cssVar: 'var(--colours-shades-accent-shades-accent-recessive)' },
          { name: 'dominant', cssVar: 'var(--colours-shades-accent-shades-accent-dominant)' },
          { name: 'extra-dominant', cssVar: 'var(--colours-shades-accent-shades-accent-extra-dominant)' },
        ]} />
      </Section>
    </div>
  ),
};

export const Schemes: Story = {
  name: 'Colour Schemes',
  parameters: {
    docs: {
      description: {
        story: 'All 6 schemes side-by-side. Each panel carries `[data-theme]` to activate the scheme layer. The `.dark` class on each right-half activates dark mode.',
      },
    },
  },
  render: () => {
    const schemes = ['neutral', 'inverted', 'brand', 'secondary', 'white', 'black'];
    const swatches = [
      { label: 'background', cssVar: '--colours-basic-background' },
      { label: 'accent', cssVar: '--colours-basic-accent' },
      { label: 'text', cssVar: '--colours-basic-text' },
      { label: 'stroke', cssVar: '--colours-basic-stroke' },
    ];

    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', padding: '32px', background: 'var(--colours-basic-background, #f5f5f5)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {schemes.map((scheme) => (
            <div key={scheme} data-theme={scheme} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
              {/* Light half */}
              <div style={{ padding: '16px', background: 'var(--colours-basic-background)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', color: 'var(--colours-basic-text-recessive)' }}>
                  {scheme} · light
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {swatches.map((s) => (
                    <div key={s.label} title={s.label} style={{ flex: 1, height: '28px', borderRadius: '4px', background: `var(${s.cssVar})`, border: '1px solid rgba(0,0,0,0.06)' }} />
                  ))}
                </div>
              </div>
              {/* Dark half */}
              <div className="dark" data-theme={scheme} style={{ padding: '16px', background: 'var(--colours-basic-background)' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', color: 'var(--colours-basic-text-recessive)' }}>
                  {scheme} · dark
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {swatches.map((s) => (
                    <div key={s.label} title={s.label} style={{ flex: 1, height: '28px', borderRadius: '4px', background: `var(${s.cssVar})`, border: '1px solid rgba(255,255,255,0.06)' }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '16px', fontSize: '11px', color: '#888', fontFamily: 'monospace' }}>
          Swatches left→right: background · accent · text · stroke
        </p>
      </div>
    );
  },
};

export const SpacingScale: Story = {
  name: 'Spacing',
  render: () => (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: 'var(--colours-basic-background, #fff)', padding: '32px' }}>
      <Section title="Component spacing">
        <div>
          {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
            <SpacingItem key={n} name={`spacing-component-${n}`} cssVar={`var(--spacing-component-${n})`} />
          ))}
        </div>
      </Section>
      <Section title="Layout spacing">
        <div>
          {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
            <SpacingItem key={n} name={`spacing-layout-${n}`} cssVar={`var(--spacing-layout-${n})`} />
          ))}
        </div>
      </Section>
    </div>
  ),
};

export const RadiusScale: Story = {
  name: 'Radius',
  render: () => (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: 'var(--colours-basic-background, #fff)', padding: '32px' }}>
      <Section title="Border Radius">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-end' }}>
          {[
            { name: 'zero', cssVar: 'var(--radius-zero)' },
            { name: 'extra-small', cssVar: 'var(--radius-extra-small)' },
            { name: 'small', cssVar: 'var(--radius-small)' },
            { name: 'medium', cssVar: 'var(--radius-medium)' },
            { name: 'large', cssVar: 'var(--radius-large)' },
            { name: 'extra-large', cssVar: 'var(--radius-extra-large)' },
            { name: 'extra-extra-large', cssVar: 'var(--radius-extra-extra-large)' },
            { name: 'full', cssVar: 'var(--radius-full)' },
          ].map(({ name, cssVar }) => (
            <RadiusItem key={name} name={name} cssVar={cssVar} />
          ))}
        </div>
      </Section>
    </div>
  ),
};

export const Typography: Story = {
  name: 'Typography',
  render: () => {
    const scales = [
      { name: 'Display', size: 'var(--typography-display-size)', weight: 'var(--typography-display-weight)', lh: 'var(--typography-display-line-height)' },
      { name: 'Title L', size: 'var(--typography-title-l-size)', weight: 'var(--typography-title-l-weight)', lh: 'var(--typography-title-l-line-height)' },
      { name: 'Title M', size: 'var(--typography-title-m-size)', weight: 'var(--typography-title-m-weight)', lh: 'var(--typography-title-m-line-height)' },
      { name: 'Title S', size: 'var(--typography-title-s-size)', weight: 'var(--typography-title-s-weight)', lh: 'var(--typography-title-s-line-height)' },
      { name: 'Subtitle', size: 'var(--typography-subtitle-size)', weight: 'var(--typography-subtitle-weight)', lh: 'var(--typography-subtitle-line-height)' },
      { name: 'Body L', size: 'var(--typography-body-l-size)', weight: 'var(--typography-body-l-weight)', lh: 'var(--typography-body-l-line-height)' },
      { name: 'Body M Regular', size: 'var(--typography-body-m-regular-size)', weight: 'var(--typography-body-m-regular-weight)', lh: 'var(--typography-body-m-regular-line-height)' },
      { name: 'Body M Bold', size: 'var(--typography-body-m-bold-size)', weight: 'var(--typography-body-m-bold-weight)', lh: 'var(--typography-body-m-bold-line-height)' },
      { name: 'Body S Regular', size: 'var(--typography-body-s-regular-size)', weight: 'var(--typography-body-s-regular-weight)', lh: 'var(--typography-body-s-regular-line-height)' },
      { name: 'Body S Bold', size: 'var(--typography-body-s-bold-size)', weight: 'var(--typography-body-s-bold-weight)', lh: 'var(--typography-body-s-bold-line-height)' },
      { name: 'Paragraph', size: 'var(--typography-paragraph-size)', weight: 'var(--typography-paragraph-weight)', lh: 'var(--typography-paragraph-line-height)' },
      { name: 'Link M Regular', size: 'var(--typography-link-m-regular-size)', weight: 'var(--typography-link-m-regular-weight)', lh: 'var(--typography-link-m-regular-line-height)' },
      { name: 'Link M Bold', size: 'var(--typography-link-m-bold-size)', weight: 'var(--typography-link-m-bold-weight)', lh: 'var(--typography-link-m-bold-line-height)' },
      { name: 'Microcopy Regular', size: 'var(--typography-microcopy-regular-size)', weight: 'var(--typography-microcopy-regular-weight)', lh: 'var(--typography-microcopy-regular-line-height)' },
      { name: 'Microcopy Bold', size: 'var(--typography-microcopy-bold-size)', weight: 'var(--typography-microcopy-bold-weight)', lh: 'var(--typography-microcopy-bold-line-height)' },
    ];

    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', background: 'var(--colours-basic-background, #fff)', padding: '32px' }}>
        <Section title="Type Scale">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {scales.map(({ name, size, weight, lh }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: '24px', padding: '12px 0', borderBottom: '1px solid var(--colours-basic-stroke, #eee)' }}>
                <div
                  style={{
                    fontSize: size,
                    fontWeight: weight,
                    lineHeight: lh,
                    color: 'var(--colours-basic-text-dominant, #111)',
                    minWidth: '200px',
                  }}
                >
                  {name}
                </div>
                <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#aaa' }}>
                  {size} · {weight} · {lh}
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    );
  },
};

export const Elevation: Story = {
  name: 'Elevation',
  render: () => {
    const levels = [
      { name: 'FAB standard', cssVar: `0px var(--elevation-fab-standard-y) var(--elevation-fab-standard-blur) var(--elevation-fab-standard-spread) var(--elevation-fab-standard-colour)` },
      { name: 'App bar bottom', cssVar: `0px var(--elevation-app-bar-bottom-flat-y) var(--elevation-app-bar-bottom-flat-blur) var(--elevation-app-bar-bottom-flat-spread) var(--elevation-app-bar-bottom-flat-colour)` },
    ];
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', background: 'var(--colours-basic-background-subtle, #f5f5f5)', padding: '32px' }}>
        <Section title="Elevation">
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '24px', fontFamily: 'monospace' }}>
            Elevation tokens expose individual x/y/blur/spread/colour properties — compose them into box-shadow in components.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-end' }}>
            {levels.map(({ name, cssVar }) => (
              <ElevationItem key={name} name={name} cssVar={cssVar} />
            ))}
          </div>
        </Section>
      </div>
    );
  },
};
