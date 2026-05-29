import React from 'react';
import './ChatBubble.css';

const ThumbsUpIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 9.5V16M3.5 9.5H7M7 9.5L9.5 3C10.3284 3 11 3.67157 11 4.5V7.5H15C15.8284 7.5 16.5 8.17157 16.5 9L16 11.5C15.7239 12.6046 14.7239 13.5 13.5 13.5H11V16C11 16.5523 10.5523 17 10 17H9.5C8.94772 17 8.5 16.5523 8.5 16V13.5" />
  </svg>
);

const ThumbsDownIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 10.5V4M3.5 10.5H7M7 10.5L9.5 17C10.3284 17 11 16.3284 11 15.5V12.5H15C15.8284 12.5 16.5 11.8284 16.5 11L16 8.5C15.7239 7.39543 14.7239 6.5 13.5 6.5H11V4C11 3.44772 10.5523 3 10 3H9.5C8.94772 3 8.5 3.44772 8.5 4V6.5" />
  </svg>
);

const CopyIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="7" y="7" width="9" height="9" rx="1.5" />
    <path d="M4 13V5C4 4.44772 4.44772 4 5 4H13" />
  </svg>
);

export interface ChatBubbleProps {
  /** Direction of the message */
  variant?: 'incoming' | 'outgoing';
  /** True = flat corner on avatar side + shows avatar */
  firstMessage?: boolean;
  showAvatar?: boolean;
  avatarSrc?: string;
  avatarAlt?: string;
  showHelperText?: boolean;
  helperText?: string;
  showFooter?: boolean;
  /** Show like / dislike / copy action buttons (incoming only) */
  showActions?: boolean;
  showActionDislike?: boolean;
  showActionCopy?: boolean;
  onLike?: () => void;
  onDislike?: () => void;
  onCopy?: () => void;
  /** One or more ChatText components */
  children: React.ReactNode;
  className?: string;
}

export function ChatBubble({
  variant = 'incoming',
  firstMessage = true,
  showAvatar = true,
  avatarSrc,
  avatarAlt = 'Chat partner',
  showHelperText = true,
  helperText = '19:12 pm',
  showFooter = true,
  showActions = true,
  showActionDislike = true,
  showActionCopy = true,
  onLike,
  onDislike,
  onCopy,
  children,
  className,
}: ChatBubbleProps) {
  const isIncoming = variant === 'incoming';

  const classes = [
    'ods-chat-bubble',
    `ods-chat-bubble--${variant}`,
    firstMessage && 'ods-chat-bubble--first-message',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classes} aria-label={`${isIncoming ? 'Incoming' : 'Outgoing'} message`}>
      {isIncoming && (
        <div className="ods-chat-bubble__avatar" aria-hidden="true">
          {showAvatar && firstMessage ? (
            <div className="ods-chat-bubble__avatar-img">
              {avatarSrc ? (
                <img src={avatarSrc} alt={avatarAlt} />
              ) : (
                <span className="ods-chat-bubble__avatar-placeholder" />
              )}
            </div>
          ) : (
            <div className="ods-chat-bubble__avatar-spacer" />
          )}
        </div>
      )}

      <div className="ods-chat-bubble__content">
        <div className="ods-chat-bubble__messages">{children}</div>

        {showFooter && (
          <footer className="ods-chat-bubble__footer">
            {showHelperText && (
              <time className="ods-chat-bubble__helper-text">{helperText}</time>
            )}
            {showActions && isIncoming && (
              <div
                className="ods-chat-bubble__actions"
                role="group"
                aria-label="Message actions"
              >
                <button
                  className="ods-chat-bubble__action-btn"
                  onClick={onLike}
                  aria-label="Like message"
                >
                  <ThumbsUpIcon />
                </button>
                {showActionDislike && (
                  <button
                    className="ods-chat-bubble__action-btn"
                    onClick={onDislike}
                    aria-label="Dislike message"
                  >
                    <ThumbsDownIcon />
                  </button>
                )}
                {showActionCopy && (
                  <button
                    className="ods-chat-bubble__action-btn"
                    onClick={onCopy}
                    aria-label="Copy message"
                  >
                    <CopyIcon />
                  </button>
                )}
              </div>
            )}
          </footer>
        )}
      </div>
    </article>
  );
}
