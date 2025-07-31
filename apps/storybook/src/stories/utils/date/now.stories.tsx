import { Alert } from '@bbodek/internal-ui';
import { DATE_FORMATS, now, toString } from '@bbodek/utils';

const meta = {
  title: 'core/utils/date/now',
};

export default meta;

export const Default = {
  render: () => {
    return (
      <Alert
        content={toString({
          date: now(),
          format: DATE_FORMATS['YYYY.MM.DD.HH.mm.ss'],
        })}
      />
    );
  },
};
