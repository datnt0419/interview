import { randomItemArray } from '@/app/utils';
import {
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useRef, useState } from 'react';

const colors = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
] as ButtonProps['color'][];

export enum QueryAction {
  SUM = 'sum(price)',
  COUNT = 'count(price)',
  NONE = 'none',
  DELETE = 'delete',
}

const fieldItemData = [
  {
    label: QueryAction.SUM,
  },
  {
    label: QueryAction.COUNT,
  },
  {
    label: QueryAction.NONE,
  },
  {
    label: QueryAction.DELETE,
  },
] as const;

export interface FieldItemProps {
  field: BaseModel;
  handleSelectQuery: (fieldWithQuery: BaseModel) => void;
}

export function FieldItem(props: FieldItemProps) {
  const { field, handleSelectQuery } = props;

  const fieldRefValue = useRef(field.name);
  console.log('fieldRefValue: ', fieldRefValue);

  const [colorButton] = useState(() => {
    const color = randomItemArray(colors);
    return color;
  });

  function handleSelectionChange(key: any) {
    handleSelectQuery({
      id: field.id,
      name: key,
      ...(key === QueryAction.NONE && { des: fieldRefValue.current }),
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <Dropdown backdrop="blur">
        <DropdownTrigger>
          <Button
            className="min-w-[100px]"
            color={colorButton}
            variant="shadow"
          >
            {field.name}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={handleSelectionChange}
          items={fieldItemData}
          variant="faded"
          aria-label="Actions"
        >
          {(item) => {
            return (
              <DropdownItem
                showDivider
                key={item.label}
                color={item.label === QueryAction.DELETE ? 'danger' : 'default'}
                className={
                  item.label === QueryAction.DELETE ? 'text-danger' : ''
                }
              >
                {item.label}
              </DropdownItem>
            );
          }}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
