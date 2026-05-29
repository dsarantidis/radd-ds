import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ChatBubble, type ChatBubbleProps } from '../components/ChatBubble/ChatBubble';
import { ChatText } from '../components/ChatBubble/ChatText';

// Extended args type — combines ChatBubble props with ChatText-level controls
type StoryArgs = ChatBubbleProps & {
  /** Message text content */
  text?: string;
  /** Show typing animation instead of text */
  typing?: boolean;
  /** Show loading skeleton instead of text */
  loading?: boolean;
  /** Stretch bubble to full width (for images / cards) */
  fill?: boolean;
  /** Show outlined style — distinguishes bot from live agent */
  showBackground?: boolean;
  /** Show failed-to-send error below bubble */
  showError?: boolean;
};

const meta: Meta<StoryArgs> = {
  title: 'Components/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'centered',
    controls: { sort: 'alpha' },
    docs: {
      description: {
        component:
          'ODS Chat Bubble — incoming/outgoing messages, typing indicator, skeleton loading, slot content, and action buttons. WCAG 2.2 AA compliant.',
      },
    },
  },
  argTypes: {
    // ── RADD prop order: Type → Variant → Size → Other → Disabled → Read Only → State ──

    // Type
    variant: {
      control: 'radio',
      options: ['incoming', 'outgoing'],
      description: 'Message direction (Type)',
      table: { category: 'A · Type' },
    },

    // Variant
    firstMessage: {
      control: 'boolean',
      description: 'First in a sequence — shows avatar and flattens the avatar-side corner (Variant)',
      table: { category: 'B · Variant' },
    },

    // Content (Other)
    text: {
      control: 'text',
      description: 'Message text content',
      table: { category: 'C · Content' },
    },
    typing: {
      control: 'boolean',
      description: 'Show typing animation instead of text (incoming only)',
      table: { category: 'C · Content' },
    },
    loading: {
      control: 'boolean',
      description: 'Show skeleton shimmer while content loads',
      table: { category: 'C · Content' },
    },
    fill: {
      control: 'boolean',
      description: 'Stretch bubble to full available width — use for images / cards',
      table: { category: 'C · Content' },
    },

    // Display toggles (Other)
    showAvatar: {
      control: 'boolean',
      table: { category: 'D · Display' },
    },
    showBackground: {
      control: 'boolean',
      description: 'Toggle bubble background (false = outlined, distinguishes bot from agent)',
      table: { category: 'D · Display' },
    },
    showFooter: {
      control: 'boolean',
      table: { category: 'D · Display' },
    },
    showHelperText: {
      control: 'boolean',
      table: { category: 'D · Display' },
    },
    helperText: {
      control: 'text',
      table: { category: 'D · Display' },
    },
    showActions: {
      control: 'boolean',
      description: 'Show like / dislike / copy action buttons (incoming only)',
      table: { category: 'D · Display' },
    },
    showActionDislike: {
      control: 'boolean',
      table: { category: 'D · Display' },
    },
    showActionCopy: {
      control: 'boolean',
      table: { category: 'D · Display' },
    },

    // State (always last per RADD rules)
    showError: {
      control: 'boolean',
      description: 'Show failed-to-send error badge (State)',
      table: { category: 'E · State' },
    },

    // Hidden
    avatarSrc:  { table: { disable: true } },
    avatarAlt:  { table: { disable: true } },
    onLike:     { table: { disable: true } },
    onDislike:  { table: { disable: true } },
    onCopy:     { table: { disable: true } },
    className:  { table: { disable: true } },
    children:   { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

// ── Playground ──────────────────────────────────────────────────────
// All controls fully wired — both ChatBubble AND ChatText update live

export const Playground: Story = {
  name: 'Playground',
  args: {
    variant: 'incoming',
    firstMessage: false,
    showAvatar: false,
    showHelperText: true,
    helperText: '19:12 pm',
    showFooter: true,
    showActions: true,
    showActionDislike: true,
    showActionCopy: true,
    text: "vchcghfcghcghghghghghjgjhjghgjkgjkgjfgjjkgfhhjkjhkjhfhjfhjjfhjh",
    typing: false,
    loading: false,
    fill: true,
    showBackground: true,
    showError: false,
  },
  render: (args) => {
    const { text, typing, loading, fill, showBackground, showError, ...bubbleProps } = args;
    return (
      <ChatBubble
        {...bubbleProps}
        onLike={() => console.log('liked')}
        onDislike={() => console.log('disliked')}
        onCopy={() => console.log('copied')}
      >
        <ChatText
          variant={args.variant}
          firstMessage={args.firstMessage}
          text={text}
          typing={typing}
          loading={loading}
          fill={fill}
          showBackground={showBackground}
          showError={showError}
        />
      </ChatBubble>
    );
  },
};

// ── Directional variants ────────────────────────────────────────────

export const IncomingText: Story = {
  name: 'Incoming — Text',
  args: {
    variant: 'incoming',
    firstMessage: true,
    showAvatar: true,
    showHelperText: true,
    helperText: '19:12 pm',
    showFooter: true,
    showActions: false,
    text: 'Hello! How can I help you today?',
    typing: false,
    loading: false,
    showBackground: true,
    showError: false,
  },
  render: (args) => {
    const { text, typing, loading, fill, showBackground, showError, ...bubbleProps } = args;
    return (
      <ChatBubble {...bubbleProps}>
        <ChatText
          variant={args.variant}
          firstMessage={args.firstMessage}
          text={text}
          typing={typing}
          loading={loading}
          fill={fill}
          showBackground={showBackground}
          showError={showError}
        />
      </ChatBubble>
    );
  },
};

export const OutgoingText: Story = {
  name: 'Outgoing — Text',
  args: {
    variant: 'outgoing',
    firstMessage: true,
    showHelperText: true,
    helperText: '19:13 pm',
    showFooter: true,
    showActions: false,
    text: 'I need help resetting my password.',
    typing: false,
    loading: false,
    showBackground: true,
    showError: false,
  },
  render: (args) => {
    const { text, typing, loading, fill, showBackground, showError, ...bubbleProps } = args;
    return (
      <ChatBubble {...bubbleProps}>
        <ChatText
          variant={args.variant}
          firstMessage={args.firstMessage}
          text={text}
          typing={typing}
          loading={loading}
          fill={fill}
          showBackground={showBackground}
          showError={showError}
        />
      </ChatBubble>
    );
  },
};

// ── Multi-bubble ────────────────────────────────────────────────────

export const IncomingMultipleBubbles: Story = {
  name: 'Incoming — Multiple Bubbles',
  args: {
    variant: 'incoming',
    firstMessage: true,
    showHelperText: true,
    helperText: '19:12 pm',
    showFooter: true,
    showActions: false,
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatText variant={args.variant} firstMessage text="Sure, I can help with that." />
      <ChatText variant={args.variant} firstMessage={false} text="First, go to the login page." />
      <ChatText variant={args.variant} firstMessage={false} text={'Then click "Forgot password" and follow the steps.'} />
    </ChatBubble>
  ),
};

// ── Action buttons ──────────────────────────────────────────────────

export const WithActions: Story = {
  name: 'Incoming — With Actions',
  args: {
    variant: 'incoming',
    firstMessage: true,
    showHelperText: true,
    helperText: '19:12 pm',
    showFooter: true,
    showActions: true,
    showActionDislike: true,
    showActionCopy: true,
    text: "That's a great question! Here's a detailed answer that explains the topic thoroughly.",
    showBackground: true,
    showError: false,
  },
  render: (args) => {
    const { text, typing, loading, fill, showBackground, showError, ...bubbleProps } = args;
    return (
      <ChatBubble
        {...bubbleProps}
        onLike={() => alert('Liked')}
        onDislike={() => alert('Disliked')}
        onCopy={() => alert('Copied')}
      >
        <ChatText
          variant={args.variant}
          firstMessage={args.firstMessage}
          text={text}
          showBackground={showBackground}
        />
      </ChatBubble>
    );
  },
};

// ── Special states ──────────────────────────────────────────────────

export const TypingIndicator: Story = {
  name: 'Incoming — Typing',
  args: {
    variant: 'incoming',
    firstMessage: true,
    showHelperText: false,
    showFooter: false,
    showActions: false,
    typing: true,
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatText variant={args.variant} firstMessage={args.firstMessage} typing={args.typing} />
    </ChatBubble>
  ),
};

export const LoadingSkeleton: Story = {
  name: 'Incoming — Loading Skeleton',
  args: {
    variant: 'incoming',
    firstMessage: true,
    showHelperText: false,
    showFooter: false,
    showActions: false,
    loading: true,
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatText variant={args.variant} firstMessage={args.firstMessage} loading={args.loading} />
    </ChatBubble>
  ),
};

export const OutgoingLoadingSkeleton: Story = {
  name: 'Outgoing — Loading Skeleton',
  args: {
    variant: 'outgoing',
    firstMessage: true,
    showHelperText: false,
    showFooter: false,
    loading: true,
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatText variant={args.variant} firstMessage={args.firstMessage} loading={args.loading} />
    </ChatBubble>
  ),
};

export const WithImageSlot: Story = {
  name: 'Incoming — Image Slot',
  args: {
    variant: 'incoming',
    firstMessage: true,
    showHelperText: true,
    helperText: '19:15 pm',
    showFooter: true,
    showActions: false,
    fill: true,
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatText variant={args.variant} firstMessage={args.firstMessage} fill={args.fill}>
        <img
          src="https://picsum.photos/seed/chat/260/195"
          alt="Shared image"
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: '4/3',
            objectFit: 'cover',
            borderRadius: args.firstMessage ? '0 8px 8px 8px' : '8px',
          }}
        />
      </ChatText>
    </ChatBubble>
  ),
};

export const NoBubbleBackground: Story = {
  name: 'Incoming — No Background (Bot)',
  parameters: {
    docs: {
      description: {
        story: 'Set `showBackground=false` to visually distinguish a chatbot from a live human agent.',
      },
    },
  },
  args: {
    variant: 'incoming',
    firstMessage: true,
    showHelperText: true,
    helperText: '19:12 pm',
    showFooter: true,
    showActions: false,
    text: "I'm the automated assistant. How can I help?",
    showBackground: false,
    showError: false,
  },
  render: (args) => {
    const { text, typing, loading, fill, showBackground, showError, ...bubbleProps } = args;
    return (
      <ChatBubble {...bubbleProps}>
        <ChatText
          variant={args.variant}
          firstMessage={args.firstMessage}
          text={text}
          showBackground={showBackground}
        />
      </ChatBubble>
    );
  },
};

export const ErrorState: Story = {
  name: 'Outgoing — Failed to Send',
  args: {
    variant: 'outgoing',
    firstMessage: true,
    showHelperText: true,
    helperText: '19:14 pm',
    showFooter: true,
    showActions: false,
    text: 'Can you please check my account balance?',
    showError: true,
    showBackground: true,
  },
  render: (args) => {
    const { text, typing, loading, fill, showBackground, showError, ...bubbleProps } = args;
    return (
      <ChatBubble {...bubbleProps}>
        <ChatText
          variant={args.variant}
          firstMessage={args.firstMessage}
          text={text}
          showError={showError}
        />
      </ChatBubble>
    );
  },
};

// ── Full conversation ────────────────────────────────────────────────

export const FullConversation: Story = {
  name: 'Full Conversation',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'A realistic chat thread — all states: incoming, outgoing, multiple bubbles, typing, actions.',
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-component-2, 4px)',
        width: '360px',
        padding: 'var(--spacing-component-5, 16px)',
        background: 'var(--colours-basic-background, #fff)',
        borderRadius: 'var(--radius-medium, 12px)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}
    >
      <ChatBubble variant="incoming" firstMessage helperText="19:10 pm" showActions={false}>
        <ChatText variant="incoming" firstMessage text="Hi there! How can I help you today?" />
      </ChatBubble>

      <ChatBubble variant="outgoing" firstMessage helperText="19:11 pm" showActions={false}>
        <ChatText variant="outgoing" firstMessage text="I need help with my invoice." />
      </ChatBubble>

      <ChatBubble
        variant="incoming"
        firstMessage
        helperText="19:12 pm"
        showActions
        onLike={() => {}}
        onDislike={() => {}}
        onCopy={() => {}}
      >
        <ChatText variant="incoming" firstMessage text="Of course! I can help with that." />
        <ChatText variant="incoming" firstMessage={false} text="Could you share your invoice number?" />
        <ChatText variant="incoming" firstMessage={false} text="You'll find it in the email we sent you." />
      </ChatBubble>

      <ChatBubble variant="outgoing" firstMessage helperText="19:13 pm" showActions={false}>
        <ChatText variant="outgoing" firstMessage text="It's INV-2024-00847." />
      </ChatBubble>

      <ChatBubble variant="incoming" firstMessage showFooter={false} showActions={false}>
        <ChatText variant="incoming" firstMessage loading />
      </ChatBubble>
    </div>
  ),
};
