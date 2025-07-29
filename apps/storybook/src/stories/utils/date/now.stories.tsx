import { Alert } from '@bbodek/internal-ui';
import { date, DATE_FORMATS } from '@bbodek/utils';

const meta = {
  title: 'core/utils/date/now',
};

export default meta;

export const Default = {
  render: () => {
    return (
      <Alert
        content={date.toString({
          date: date.now(),
          format: DATE_FORMATS['YYYY.MM.DD.HH.mm.ss'],
        })}
      />
    );
  },
};
