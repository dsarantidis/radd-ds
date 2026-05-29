import React from 'react';

export function TypingAnimation() {
  return (
    <div
      className="ods-typing-animation"
      role="status"
      aria-label="Typing indicator"
    >
      <span className="ods-typing-animation__dot" aria-hidden="true" />
      <span className="ods-typing-animation__dot" aria-hidden="true" />
      <span className="ods-typing-animation__dot" aria-hidden="true" />
    </div>
  );
}
