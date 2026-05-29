import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ChatBubble } from '../components/ChatBubble/ChatBubble';
import { ChatText } from '../components/ChatBubble/ChatText';

const meta: Meta<typeof ChatBubble> = {
  title: 'Components/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ODS Chat Bubble — supports incoming/outgoing messages, typing indicator, skeleton loading, slot content, and action buttons. Compliant with WCAG 2.2 AA.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['incoming', 'outgoing'],
      description: 'Message direction',
    },
    firstMessage: {
      control: 'boolean',
      description: 'Shows avatar and flattens the top corner on the avatar side',
    },
    showAvatar: { control: 'boolean' },
    showHelperText: { control: 'boolean' },
    helperText: { control: 'text' },
    showFooter: { control: 'boolean' },
    showActions: { control: 'boolean' },
    showActionDislike: { control: 'boolean' },
    showActionCopy: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

// ── Base stories ────────────────────────────────────────────────────

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
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatText variant="incoming" firstMessage text="Hello! How can I help you today?" />
    </ChatBubble>
  ),
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
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatText variant="outgoing" firstMessage text="I need help resetting my password." />
    </ChatBubble>
  ),
};

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
      <ChatText variant="incoming" firstMessage text="Sure, I can help with that." />
      <ChatText variant="incoming" firstMessage={false} text="First, go to the login page." />
      <ChatText variant="incoming" firstMessage={false} text={'Then click "Forgot password" and follow the steps.'} />
    </ChatBubble>
  ),
};

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
  },
  render: (args) => (
    <ChatBubble
      {...args}
      onLike={() => alert('Liked')}
      onDislike={() => alert('Disliked')}
      onCopy={() => alert('Copied')}
    >
      <ChatText
        variant="incoming"
        firstMessage
        text="That's a great question! Here's a detailed answer that explains the topic thoroughly."
      />
    </ChatBubble>
  ),
};

export const TypingIndicator: Story = {
  name: 'Incoming — Typing',
  args: {
    variant: 'incoming',
    firstMessage: true,
    showHelperText: false,
    showFooter: false,
    showActions: false,
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatText variant="incoming" firstMessage typing />
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
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatText variant="incoming" firstMessage loading />
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
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatText variant="outgoing" firstMessage loading />
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
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatText variant="incoming" firstMessage fill>
        <img
          src="https://picsum.photos/seed/chat/260/195"
          alt="Shared image"
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: '4/3',
            objectFit: 'cover',
            borderRadius: '0 8px 8px 8px',
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
        story:
          'Toggle `showBackground=false` to visually distinguish a chatbot from a live human agent.',
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
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatText
        variant="incoming"
        firstMessage
        showBackground={false}
        text="I'm the automated assistant. How can I help?"
      />
    </ChatBubble>
  ),
};

export const ErrorState: Story = {
  name: 'Outgoing — Failed to Send',
  args: {
    variant: 'outgoing',
    firstMessage: true,
    showHelperText: true,
    helperText: '19:14 pm',
    showFooter: true,
  },
  render: (args) => (
    <ChatBubble {...args}>
      <ChatText
        variant="outgoing"
        firstMessage
        showError
        text="Can you please check my account balance?"
      />
    </ChatBubble>
  ),
};

// ── Full conversation ────────────────────────────────────────────────

export const FullConversation: Story = {
  name: 'Full Conversation',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'A realistic chat thread demonstrating all states: incoming, outgoing, multiple bubbles, typing, and actions.',
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        width: '360px',
        padding: '16px',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}
    >
      {/* Incoming first */}
      <ChatBubble
        variant="incoming"
        firstMessage
        helperText="19:10 pm"
        showActions={false}
      >
        <ChatText variant="incoming" firstMessage text="Hi there! How can I help you today?" />
      </ChatBubble>

      {/* Outgoing */}
      <ChatBubble
        variant="outgoing"
        firstMessage
        helperText="19:11 pm"
        showActions={false}
      >
        <ChatText variant="outgoing" firstMessage text="I need help with my invoice." />
      </ChatBubble>

      {/* Incoming with multiple bubbles */}
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

      {/* Outgoing */}
      <ChatBubble
        variant="outgoing"
        firstMessage
        helperText="19:13 pm"
        showActions={false}
      >
        <ChatText variant="outgoing" firstMessage text="It's INV-2024-00847." />
      </ChatBubble>

      {/* Incoming loading */}
      <ChatBubble
        variant="incoming"
        firstMessage
        showFooter={false}
        showActions={false}
      >
        <ChatText variant="incoming" firstMessage loading />
      </ChatBubble>
    </div>
  ),
};
