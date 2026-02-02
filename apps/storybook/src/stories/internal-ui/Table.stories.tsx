import { useForm } from '@bbodek/hooks';
import { Badge, Flex, Table, Toggle } from '@bbodek/internal-ui';
import { now } from '@bbodek/utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta = {
  title: 'core/internal-ui/Table',
  component: Table,
  argTypes: {
    caption: {
      description: 'Table caption',
      control: 'text',
      type: 'string',
    },
    children: {
      description: `The content of the component, normally TableHead, TableBody`,
      table: { type: { summary: 'ReactNode' } },
    },
    className: {
      description: 'Table className',
      control: 'text',
      type: 'string',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof Table>;

interface User {
  id: number;
  name: string;
  username: string;
  status: string;
  isApproved: boolean;
  createdBy: string;
}

interface UserFields extends User {
  checked: boolean;
  isActive: boolean;
  goodsCode: string;
}

const USER_LIST_MAPPER = {
  CHECKED: 'checked',
  ACTIVE: 'isActive',
  NAME: 'name',
  USER_NAME: 'username',
  IS_APPROVED: 'isApproved',
  CREATED_BY: 'createdBy',
  GOODS_CODE: 'goodsCode',
  CONFIRM: 'confirm',
  ACTIONS: 'actions',
} as const;

type UserListKeys = (typeof USER_LIST_MAPPER)[keyof typeof USER_LIST_MAPPER];

const USER_LIST_COLUMNS_MAPPER: Record<UserListKeys, string> = {
  [USER_LIST_MAPPER['CHECKED']]: '전체 선택',
  [USER_LIST_MAPPER['ACTIVE']]: '전체 활성화',
  [USER_LIST_MAPPER['NAME']]: '이름',
  [USER_LIST_MAPPER['USER_NAME']]: '고유 ID',
  [USER_LIST_MAPPER['IS_APPROVED']]: '승인 여부',
  [USER_LIST_MAPPER['GOODS_CODE']]: '굿즈 코드',
  [USER_LIST_MAPPER['CREATED_BY']]: '생성자',
  [USER_LIST_MAPPER['CONFIRM']]: '승인',
  [USER_LIST_MAPPER['ACTIONS']]: '',
};

const USER_LIST_STYLE_MAPPER: Record<UserListKeys, string> = {
  [USER_LIST_MAPPER['CHECKED']]: 'w-[80px]',
  [USER_LIST_MAPPER['ACTIVE']]: 'w-[150px] gap-x-2',
  [USER_LIST_MAPPER['NAME']]: 'w-[100px] flex-1',
  [USER_LIST_MAPPER['USER_NAME']]: 'w-[6.5rem]',
  [USER_LIST_MAPPER['IS_APPROVED']]: 'w-[90px]',
  [USER_LIST_MAPPER['GOODS_CODE']]: 'w-[150px]',
  [USER_LIST_MAPPER['CREATED_BY']]: 'w-[150px]',
  [USER_LIST_MAPPER['CONFIRM']]: 'w-[100px]',
  [USER_LIST_MAPPER['ACTIONS']]: 'w-[150px]',
};

const users: User[] = Array.from({ length: 30 }).map((_, index) => ({
  id: index,
  name: 'John Doe',
  username: 'john.doe',
  lastLoggedInAt: '2021-01-01',
  status: 'active',
  isApproved: true,
  createdBy: 'John Doe',
}));

export const Default: Story = {
  render: () => {
    const { values, setValues } = useForm<UserFields[]>({
      initialValues: users.map((user) => ({
        ...user,
        checked: false,
        isActive: false,
        goodsCode: '',
      })),
    });

    return (
      <Table caption='사용자 목록' className='h-[500px] w-[800px]'>
        <Table.Head>
          <Table.Row>
            {Object.values(USER_LIST_MAPPER).map((key) => {
              const defaultProps = {
                className: USER_LIST_STYLE_MAPPER[key],
              };
              const label = USER_LIST_COLUMNS_MAPPER[key] ?? '';

              const onChange = ({
                key,
                value,
              }: {
                key: keyof UserFields;
                value: UserFields[keyof UserFields];
              }) => {
                setValues((prev) =>
                  prev.map((user) => ({ ...user, [key]: value })),
                );
              };

              if (key === USER_LIST_MAPPER['CHECKED']) {
                return (
                  <Table.Cell {...defaultProps}>
                    <Table.Cell.Checkbox
                      checked={values.every((user) => user.checked)}
                      label={label}
                      onChange={(e) =>
                        onChange({ key, value: e.target.checked })
                      }
                    />
                  </Table.Cell>
                );
              }

              if (key === USER_LIST_MAPPER['ACTIVE']) {
                return (
                  <Table.Cell {...defaultProps}>
                    <Table.Cell.Toggle
                      checked={values.every((user) => user.isActive)}
                      label={label}
                      onChange={(e) =>
                        onChange({ key, value: e.target.checked })
                      }
                    />
                  </Table.Cell>
                );
              }

              return <Table.Cell {...defaultProps}>{label}</Table.Cell>;
            })}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {values.map((user) => {
            const { id, checked, isActive } = user;

            const onChange = ({
              key,
              value,
            }: {
              key: keyof UserFields;
              value: UserFields[keyof UserFields];
            }) => {
              setValues((prev) =>
                prev.map((user) =>
                  user.id === id ? { ...user, [key]: value } : user,
                ),
              );
            };

            return (
              <Table.Row>
                {Object.values(USER_LIST_MAPPER).map((key) => {
                  const defaultProps = {
                    className: USER_LIST_STYLE_MAPPER[key],
                  };

                  if (key === 'checked') {
                    return (
                      <Table.Cell {...defaultProps}>
                        <Table.Cell.Checkbox
                          checked={checked}
                          onChange={(e) =>
                            onChange({ key, value: e.target.checked })
                          }
                        />
                      </Table.Cell>
                    );
                  }

                  if (key === USER_LIST_MAPPER['ACTIVE']) {
                    return (
                      <Table.Cell {...defaultProps}>
                        <Table.Cell.Toggle
                          checked={isActive}
                          onChange={(e) =>
                            onChange({ key, value: e.target.checked })
                          }
                        />
                      </Table.Cell>
                    );
                  }

                  if (key === USER_LIST_MAPPER['IS_APPROVED']) {
                    return (
                      <Table.Cell {...defaultProps}>
                        <Badge
                          label={user.isApproved ? '승인' : '미승인'}
                          theme={user.isApproved ? 'green' : 'red'}
                          variant='status'
                        />
                      </Table.Cell>
                    );
                  }

                  if (key === USER_LIST_MAPPER['CREATED_BY']) {
                    return (
                      <Table.Cell {...defaultProps}>
                        <Table.Cell.Persona name={user.createdBy} />
                      </Table.Cell>
                    );
                  }

                  if (key === USER_LIST_MAPPER['CONFIRM']) {
                    return (
                      <Table.Cell {...defaultProps}>
                        <Table.Cell.Button
                          items={[
                            { label: '취소', theme: 'gray' },
                            { label: '확인' },
                          ]}
                        />
                      </Table.Cell>
                    );
                  }

                  if (key === USER_LIST_MAPPER['ACTIONS']) {
                    return (
                      <Table.Cell {...defaultProps}>
                        <Table.Cell.IconButton
                          items={[
                            {
                              iconKey: 'copy',
                              'aria-label': '복사',
                            },
                            {
                              iconKey: 'pencil-simple-line',
                              'aria-label': '수정',
                            },
                            {
                              iconKey: 'trash',
                              'aria-label': '삭제',
                            },
                          ]}
                        />
                      </Table.Cell>
                    );
                  }

                  if (key === USER_LIST_MAPPER['GOODS_CODE']) {
                    const UPPER_CASE_REG_EXP = /[^A-Z]/g;
                    const isError =
                      user.goodsCode.length > 0 &&
                      UPPER_CASE_REG_EXP.test(user.goodsCode);

                    return (
                      <Table.InputCell
                        {...defaultProps}
                        feedback={
                          isError ? '! 대문자만 입력 가능합니다' : undefined
                        }
                        disabled={user.id === 0}
                        isError={isError}
                        placeholder='입력해주세요'
                        value={user.goodsCode}
                        onChange={(e) =>
                          onChange({ key, value: e.target.value })
                        }
                      />
                    );
                  }

                  return (
                    <Table.Cell {...defaultProps}>
                      {user[key as keyof UserFields] as string}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  },
};

const startDate = now();
const endDate = startDate.add(7, 'day');
const diffDay = endDate.diff(startDate, 'day');

export const WithFixedLeft: Story = {
  render: () => (
    <Table caption='사용자 목록' className='h-[250px] w-[800px]'>
      <Table.Head>
        <Table.Row>
          <Table.Cell className='w-[117px]' isFixedLeft>
            사용일
          </Table.Cell>
          {Array.from({ length: diffDay }).map((_, index) => (
            <Table.Cell className='w-[145px]'>
              {startDate.add(index, 'day').format('MM-DD(ddd)')}
            </Table.Cell>
          ))}
        </Table.Row>
        <Table.Row>
          <Table.Cell className='w-[117px]' isFixedLeft>
            배송일
          </Table.Cell>
          {Array.from({ length: diffDay }).map((_, index) => (
            <Table.Cell className='w-[145px]'>
              {startDate
                .subtract(1, 'day')
                .add(index, 'day')
                .format('MM-DD(ddd)')}
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {Array.from({ length: 5 }).map(() => (
          <Table.Row>
            <Table.Cell className='w-[117px]' role='rowheader' isFixedLeft>
              멜라민 식판
            </Table.Cell>
            {Array.from({ length: diffDay }).map((_, index) => (
              <Table.Cell className='w-[145px]'>{String(index)}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

export const EmptyTable: Story = {
  render: () => {
    const [count, setCount] = useState(0);

    return (
      <Flex direction='column' gap='4'>
        <Toggle
          checked={count === 0}
          label='테이블 비우기'
          onChange={() => setCount((v) => (v === 0 ? 10 : 0))}
        />

        <Table caption='사용자 목록' className='w-[800px]'>
          <Table.Head>
            <Table.Row>
              <Table.Cell className='w-[117px]' role='rowheader' isFixedLeft>
                사용일
              </Table.Cell>
              {Array.from({ length: diffDay }).map((_, index) => (
                <Table.Cell className='w-[145px]'>
                  {startDate.add(index, 'day').format('MM-DD(ddd)')}
                </Table.Cell>
              ))}
            </Table.Row>
          </Table.Head>

          <Table.Body emptyComponent={<Table.Empty />}>
            {Array.from({ length: count }).map(() => (
              <Table.Row>
                <Table.Cell className='w-[117px]' role='rowheader' isFixedLeft>
                  멜라민 식판
                </Table.Cell>
                {Array.from({ length: diffDay }).map((_, index) => (
                  <Table.Cell className='w-[145px]'>{String(index)}</Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Flex>
    );
  },
};

export const LoadingTable: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
      <Flex direction='column' gap='8'>
        <Toggle
          checked={isLoading}
          label='loading'
          onChange={() => setIsLoading((v) => !v)}
        />

        <Table caption='사용자 목록' className='h-[500px] w-fit'>
          <Table.Head>
            <Table.Row>
              {Object.values(USER_LIST_MAPPER).map((key) => (
                <Table.Cell className={USER_LIST_STYLE_MAPPER[key]}>
                  {USER_LIST_COLUMNS_MAPPER[key]}
                </Table.Cell>
              ))}
            </Table.Row>
          </Table.Head>

          <Table.Body
            loadingComponent={
              <Table.Loading
                keys={Object.values(USER_LIST_MAPPER)}
                styles={USER_LIST_STYLE_MAPPER}
              />
            }
            isLoading={isLoading}
          >
            {Array.from({ length: 10 }).map(() => (
              <Table.Row>
                {Object.values(USER_LIST_MAPPER).map((key) => {
                  return (
                    <Table.Cell className={USER_LIST_STYLE_MAPPER[key]}>
                      {key}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Flex>
    );
  },
};

export const WithLinkRows: Story = {
  render: () => (
    <Table caption='사용자 목록' className='h-[500px] w-[800px]'>
      <Table.Head>
        <Table.Row>
          <Table.Cell className='w-[100px]'>ID</Table.Cell>
          <Table.Cell className='flex-1'>이름</Table.Cell>
          <Table.Cell className='w-[200px]'>사용자명</Table.Cell>
          <Table.Cell className='w-[150px]'>상태</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {users.slice(0, 10).map((user) => (
          <Table.LinkRow
            className='cursor-pointer transition-colors hover:bg-gray-50'
            href={`/users/${user.id}`}
            key={user.id}
          >
            <Table.Cell className='w-[100px]'>{user.id}</Table.Cell>
            <Table.Cell className='flex-1'>{user.name}</Table.Cell>
            <Table.Cell className='w-[200px]'>{user.username}</Table.Cell>
            <Table.Cell className='w-[150px]'>
              <Badge
                label={user.status === 'active' ? '활성' : '비활성'}
                theme={user.status === 'active' ? 'green' : 'gray'}
                variant='status'
              />
            </Table.Cell>
          </Table.LinkRow>
        ))}
      </Table.Body>
    </Table>
  ),
};
