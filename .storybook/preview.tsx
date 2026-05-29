import type { Preview, Decorator } from '@storybook/react-vite';
import React from 'react';
import '../src/tokens/index';

// ── Global toolbar controls ──────────────────────────────────────────

export const globalTypes = {
  scheme: {
    name: 'Scheme',
    defaultValue: 'neutral',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'neutral',   title: 'Neutral',   icon: 'circlehollow' },
        { value: 'inverted',  title: 'Inverted',  icon: 'circle'       },
        { value: 'brand',     title: 'Brand',     icon: 'star'         },
        { value: 'secondary', title: 'Secondary', icon: 'bookmark'     },
        { value: 'white',     title: 'White',     icon: 'contrast'     },
        { value: 'black',     title: 'Black',     icon: 'box'          },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  mode: {
    name: 'Mode',
    defaultValue: 'light',
    toolbar: {
      icon: 'sun',
      items: [
        { value: 'light', title: 'Light', icon: 'sun'  },
        { value: 'dark',  title: 'Dark',  icon: 'moon' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

// ── Theme decorator ──────────────────────────────────────────────────
// Wraps every story in a div that carries:
//   [data-theme="brand"] — activates that scheme's CSS vars
//   .dark               — flips to dark mode vars
//
// The neutral scheme is the :root default, so it needs no data-theme.

const withTheme: Decorator = (Story, context) => {
  const scheme = (context.globals.scheme as string) ?? 'neutral';
  const mode   = (context.globals.mode   as string) ?? 'light';

  const isDark     = mode === 'dark';
  const isNeutral  = scheme === 'neutral';

  return (
    <div
      data-scheme={isNeutral ? undefined : scheme}
      className={isDark ? 'dark' : undefined}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        boxSizing: 'border-box',
        background: 'var(--colours-basic-background, #ffffff)',
        transition: 'background 0.2s ease, color 0.2s ease',
        color: 'var(--colours-basic-text, #111111)',
      }}
    >
      <Story />
    </div>
  );
};

export const decorators: Decorator[] = [withTheme];

// ── Global parameters ────────────────────────────────────────────────

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',   // decorator handles centering & background
    controls: {
      matchers: {
        color: /^(background|color|backgroundColor)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
