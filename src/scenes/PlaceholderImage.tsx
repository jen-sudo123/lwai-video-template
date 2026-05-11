import React from 'react';
import { colors, typography } from '../tokens';

type PlaceholderImageProps = {
  label?: string; // description of what image goes here
  style?: React.CSSProperties;
};

// Renders a styled grey box with a label when no real image is available yet.
// Used by scene components when image prop starts with "placeholder:".
// Convention: image="placeholder:Deep Research screenshot"
export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  label = 'Image coming soon',
  style = {},
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: colors.neutral200,
        border: `3px dashed ${colors.neutral600}`,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        ...style,
      }}
    >
      {/* Camera icon placeholder */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="16" width="56" height="40" rx="6" stroke={colors.neutral600} strokeWidth="3" fill="none" />
        <circle cx="32" cy="36" r="10" stroke={colors.neutral600} strokeWidth="3" fill="none" />
        <circle cx="32" cy="36" r="4" fill={colors.neutral600} />
        <path d="M22 16l4-8h12l4 8" stroke={colors.neutral600} strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="50" cy="24" r="3" fill={colors.neutral600} />
      </svg>

      {/* Label */}
      <div
        style={{
          ...typography.caption,
          color: colors.neutral600,
          textAlign: 'center',
          maxWidth: '80%',
          padding: '0 16px',
        }}
      >
        {label}
      </div>

      {/* Lime accent tag */}
      <div
        style={{
          backgroundColor: colors.lime500,
          ...typography.label,
          color: colors.white,
          fontSize: 18,
          padding: '6px 16px',
          borderRadius: 4,
        }}
      >
        PLACEHOLDER
      </div>
    </div>
  );
};

// Helper used by scene components:
// Pass image="placeholder:What goes here" to get a placeholder.
// Pass image="images/real-file.png" to get the real image.
export const isPlaceholder = (image: string) => image.startsWith('placeholder:');
export const getPlaceholderLabel = (image: string) =>
  image.replace('placeholder:', '').trim();
