import React from 'react';
import { KineticText } from './KineticText';
import { FadeText, recommendAnimation } from './FadeText';
import { TypewriterText } from './TypewriterText';

type AnimatedTextProps = {
  text: string;
  animation?: 'typewriter' | 'kinetic' | 'fade' | 'auto';
  style?: React.CSSProperties;
  startFrame?: number;
};

// One entry point for all on-screen text.
// Default is 'typewriter'. Pass 'auto' to pick based on length (kinetic short, fade long).
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  animation = 'typewriter',
  style = {},
  startFrame = 0,
}) => {
  if (animation === 'typewriter') {
    return <TypewriterText text={text} style={style} />;
  }
  const choice = animation === 'auto' ? recommendAnimation(text) : animation;
  return choice === 'kinetic' ? (
    <KineticText text={text} style={style} startFrame={startFrame} />
  ) : (
    <FadeText text={text} style={style} />
  );
};
