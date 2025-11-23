import React from 'react';

type Props = {
  size?: number | string;
  className?: string;
  title?: string;
};

export default function SuimeLogo({ size = 36, className = '', title = 'SUIME' }: Props) {
  const s = typeof size === 'number' ? `${size}px` : size;
  return (
    <img
      src="/src/assets/suime-logo.svg"
      alt={title}
      title={title}
      width={s}
      height={s}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    />
  );
}
