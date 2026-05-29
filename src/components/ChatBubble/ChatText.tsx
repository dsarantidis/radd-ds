import React from 'react';
import { TypingAnimation } from './TypingAnimation';

export interface ChatTextProps {
  variant?: 'incoming' | 'outgoing';
  /** Flat top corner facing the avatar side; hides avatar spacer when false */
  firstMessage?: boolean;
  /** Replaces content with the typing animation (incoming only) */
  typing?: boolean;
  /** Replaces content with a skeleton shimmer */
  loading?: boolean;
  /** Stretches bubble to full available width — use for images, cards, slots */
  fill?: boolean;
  /** Toggle bubble background; false shows an outlined style (bot vs agent distinction) */
  showBackground?: boolean;
  /** Shows an error badge below the bubble */
  showError?: boolean;
  /** Plain text content */
  text?: string;
  /** Slot content — images, cards, any ReactNode */
  children?: React.ReactNode;
  className?: string;
}

function Skeleton() {
  return (
    <div className="ods-chat-skeleton" role="status" aria-label="Loading message">
      <div className="ods-chat-skeleton__line" style={{ width: '80%' }} />
      <div className="ods-chat-skeleton__line" style={{ width: '60%' }} />
      <div className="ods-chat-skeleton__line" style={{ width: '40%' }} />
    </div>
  );
}

export function ChatText({
  variant = 'incoming',
  firstMessage = true,
  typing = false,
  loading = false,
  fill = false,
  showBackground = true,
  showError = false,
  text,
  children,
  className,
}: ChatTextProps) {
  const classes = [
    'ods-chat-text',
    `ods-chat-text--${variant}`,
    firstMessage && 'ods-chat-text--first-message',
    fill && 'ods-chat-text--fill',
    !showBackground && 'ods-chat-text--no-bg',
    typing && 'ods-chat-text--typing',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = () => {
    if (loading) return <Skeleton />;
    if (typing) return <TypingAnimation />;
    if (children) return <div className="ods-chat-text__slot">{children}</div>;
    return <p className="ods-chat-text__text">{text}</p>;
  };

  return (
    <div className={classes}>
      <div className="ods-chat-text__bubble">{content()}</div>
      {showError && (
        <div className="ods-chat-text__error" role="alert">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
            <line
              x1="6" y1="3.5" x2="6" y2="6.5"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            />
            <circle cx="6" cy="8.5" r="0.75" fill="currentColor" />
          </svg>
          Failed to send
        </div>
      )}
    </div>
  );
}
