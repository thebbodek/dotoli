import { Typography } from '@bbodek/internal-ui';

import { HighlightTextParams } from '@/highlightText/types';

export const highlightText = ({
  text,
  targetText,
  highlightOptions,
}: HighlightTextParams) => {
  if (targetText === '' || text === '') return text;

  const escapedTarget = [...targetText]
    .map((char) => char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('\\s*');
  const regex = new RegExp(`(${escapedTarget})`, 'gi');
  const parts = text.split(regex);

  const result = parts.map((part, index) => {
    const isMatched = index % 2 === 1;

    if (isMatched) {
      const { color, className } = highlightOptions ?? {};

      return (
        <Typography
          className={className}
          color={highlightOptions ? color : 'primary-06'}
          key={index}
        >
          {part}
        </Typography>
      );
    }

    return part;
  });

  return result;
};
