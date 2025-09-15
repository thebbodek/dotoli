import { useForm } from '@bbodek/hooks';
import {
  FormRepeater,
  Radio,
  Select,
  useFormRepeater,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

const meta: Meta<typeof FormRepeater> = {
  title: 'core/internal-ui/FormRepeater',
  component: FormRepeater,
  argTypes: {
    changedRowsCount: {
      control: 'object',
      description: 'changed rows count',
      type: 'number',
    },
    onAdd: {
      action: 'add',
      description: 'on add',
      type: 'function',
    },
    onAllReset: {
      action: 'reset',
      description: 'on all reset',
      type: 'function',
    },
    disabled: {
      control: 'boolean',
      description: 'disabled',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormRepeater>;

export const Default: Story = {
  render: ({ disabled }) => {
    interface Item {
      id: string;
      name: string | null;
      dispatchCenter: string | null;
      useOrderNotice: boolean;
      dispatchType: string | null;
    }
    interface UpdateFields {
      id: string;
      items: Item[];
    }
    const dispatchTypes = ['직출고', '간선'];
    const dispatchCenters = ['광명', '울산'];
    const originalValues: UpdateFields = useMemo(
      () => ({
        id: 'id',
        items: [],
      }),
      [],
    );
    const { values, setValues } = useForm<UpdateFields>({
      initialValues: originalValues,
    });
    const initialValue: Omit<Item, 'id'> = {
      name: null,
      dispatchCenter: dispatchCenters[0],
      useOrderNotice: false,
      dispatchType: dispatchTypes[0],
    };
    const {
      models: { changedValues },
      operations: { onAdd, onAllReset, onChange, onReset, onDelete },
    } = useFormRepeater({
      key: 'items',
      values: values.items,
      originalValues: originalValues.items,
      initialValue,
      setValues,
    });

    return (
      <FormRepeater
        onAdd={onAdd}
        onAllReset={onAllReset}
        changedRowsCount={Object.keys(changedValues).length}
        disabled={disabled}
      >
        <FormRepeater.Header>
          <FormRepeater.HeaderContent label='패키지' className='w-[120px]' />
          <FormRepeater.HeaderContent
            label='이름'
            className='w-[200px]'
            required
          />
          <FormRepeater.HeaderContent
            label='출고 센터'
            className='w-[200px]'
            required
          />
          <FormRepeater.HeaderContent label='배송 유형' className='w-[80px]' />
          <FormRepeater.HeaderContent
            label='해당'
            className='w-[100px]'
            required
          />
          <FormRepeater.HeaderContent
            label='출고 유형'
            className='w-[150px]'
            required
          />
        </FormRepeater.Header>
        <FormRepeater.List className='max-h-[250px]'>
          {values.items.map((item) => {
            const { id, name, dispatchCenter, useOrderNotice, dispatchType } =
              item;

            return (
              <FormRepeater.Item
                key={id}
                changedValue={changedValues[id]}
                onDelete={() => onDelete({ id })}
                onReset={({ originalValue }) => onReset({ id, originalValue })}
              >
                <FormRepeater.Text>스텐 식판 (20)</FormRepeater.Text>
                <FormRepeater.Input
                  value={name}
                  onChange={(e) =>
                    onChange({ id, key: 'name', value: e.target.value })
                  }
                />
                <FormRepeater.Select
                  displayValue={dispatchCenter}
                  value={dispatchCenter}
                  onSelect={({ value }) =>
                    onChange({ id, key: 'dispatchCenter', value })
                  }
                  isError={!dispatchCenter}
                  feedback='출고 센터를 선택해주세요.'
                >
                  {dispatchCenters.map((center) => (
                    <Select.Item key={center} value={center} label={center}>
                      {center}
                    </Select.Item>
                  ))}
                </FormRepeater.Select>
                <FormRepeater.Badge
                  label='직출고'
                  variant='outlined'
                  theme='primary'
                  iconKey='arrows-left-right'
                />
                <FormRepeater.Toggle
                  label='해당'
                  checked={useOrderNotice}
                  onChange={(e) =>
                    onChange({
                      id,
                      key: 'useOrderNotice',
                      value: e.target.checked,
                    })
                  }
                />
                <FormRepeater.Radio>
                  {dispatchTypes.map((type) => (
                    <Radio
                      key={type}
                      label={type}
                      checked={dispatchType === type}
                      onChange={() =>
                        onChange({ id, key: 'dispatchType', value: type })
                      }
                    />
                  ))}
                </FormRepeater.Radio>
              </FormRepeater.Item>
            );
          })}
        </FormRepeater.List>
      </FormRepeater>
    );
  },
};
