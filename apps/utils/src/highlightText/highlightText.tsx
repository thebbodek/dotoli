import { HighlightTextParams } from '@/highlightText/types';

export const highlightText = ({ text, targetText }: HighlightTextParams) => {
  if (targetText === '' || text === '') return text;

  const regex = new RegExp(`(${targetText})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const isTargetText = part.toLowerCase() === targetText.toLowerCase();

    if (isTargetText) {
      return (
        <span key={index} className='text-primary-06'>
          {part}
        </span>
      );
    }

    return part;
  });
};
