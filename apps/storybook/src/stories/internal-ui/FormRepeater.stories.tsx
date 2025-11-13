import { useForm } from '@bbodek/hooks';
import {
  FormRepeater,
  Radio,
  Select,
  useFormRepeater,
} from '@bbodek/internal-ui';
import type { Meta, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

const meta = {
  title: 'core/internal-ui/FormRepeater',
  component: FormRepeater,
  argTypes: {
    changedRowsCount: {
      control: 'number',
      description: 'changed rows count',
      type: 'number',
      table: {
        defaultValue: {
          summary: '0',
        },
      },
    },
    onAdd: {
      description: 'on add',
      type: 'function',
    },
    onAllReset: {
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
    className: {
      description: 'className',
      control: 'text',
      type: 'string',
    },
    children: {
      description: 'children',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
} satisfies Meta<typeof FormRepeater>;

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
        items: [
          {
            id: '1',
            name: '김뽀득',
            dispatchCenter: dispatchCenters[0],
            dispatchType: dispatchTypes[0],
            useOrderNotice: false,
          },
          {
            id: '2',
            name: '박뽀득',
            dispatchCenter: dispatchCenters[1],
            dispatchType: dispatchTypes[0],
            useOrderNotice: true,
          },
        ],
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
        changedRowsCount={Object.keys(changedValues).length}
        disabled={disabled}
        onAdd={onAdd}
        onAllReset={onAllReset}
      >
        <FormRepeater.Header>
          <FormRepeater.HeaderContent className='w-[120px]' label='패키지' />
          <FormRepeater.HeaderContent
            className='w-[200px]'
            label='이름'
            required
          />
          <FormRepeater.HeaderContent
            className='w-[200px]'
            label='출고 센터'
            required
          />
          <FormRepeater.HeaderContent className='w-[80px]' label='배송 유형' />
          <FormRepeater.HeaderContent
            className='w-[100px]'
            label='해당'
            required
          />
          <FormRepeater.HeaderContent
            className='w-[150px]'
            label='출고 유형'
            required
          />
        </FormRepeater.Header>
        <FormRepeater.List className='max-h-[250px]'>
          {values.items.map((item) => {
            const { id, name, dispatchCenter, useOrderNotice, dispatchType } =
              item;

            return (
              <FormRepeater.Item
                changedValue={changedValues[id]}
                key={id}
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
                  feedback='출고 센터를 선택해주세요.'
                  isError={!dispatchCenter}
                  value={dispatchCenter}
                  onSelect={({ value }) =>
                    onChange({ id, key: 'dispatchCenter', value })
                  }
                >
                  {dispatchCenters.map((center) => (
                    <Select.Item key={center} label={center} value={center}>
                      {center}
                    </Select.Item>
                  ))}
                </FormRepeater.Select>
                <FormRepeater.Badge
                  iconKey='arrows-left-right'
                  label='직출고'
                  theme='primary'
                  variant='outlined'
                />
                <FormRepeater.Toggle
                  checked={useOrderNotice}
                  label='해당'
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
                      checked={dispatchType === type}
                      key={type}
                      label={type}
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
