import { randomItemArray } from '@/app/utils';
import { Avatar, Chip, Select, SelectItem, Selection } from '@nextui-org/react';
import { ModalFieldsTemplateProps } from '.';
import { useGetFields } from '../fields/api';

const avatars = [
  'https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png',
  'https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png',
  'https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png',
  'https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png',
  'https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png',
  'https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png',
];

interface ModalFieldsBodyTemplateProps
  extends Omit<ModalFieldsTemplateProps, 'onSelect'> {
  onChange: (field: BaseModel[]) => void;
}

export function ModalFieldsBodyTemplate(props: ModalFieldsBodyTemplateProps) {
  const { datasetId, existFields, onChange } = props;

  const { fields } = useGetFields({ datasetId, type: 'all' });

  const availableFields = fields.filter((field) =>
    (existFields || []).every((existField) => existField.id !== field.id),
  );

  function handleSelectOptions(keys: Selection) {
    console.log('keys: ', keys);
    const selection = Array.from(keys);

    const fieldsSelected = availableFields.filter((field) =>
      selection.some((select) => +select === field.id),
    );
    onChange(fieldsSelected);
  }

  return (
    <Select
      items={availableFields}
      label="Select Fields"
      multiple
      variant="bordered"
      required
      size="lg"
      onSelectionChange={handleSelectOptions}
      selectionMode="multiple"
      placeholder="Select Fields"
      labelPlacement="outside"
      renderValue={(fields) => {
        return (
          <div className="flex flex-wrap gap-2">
            {fields.map((field) => (
              <Chip key={field.key}>{field.textValue}</Chip>
            ))}
          </div>
        );
      }}
    >
      {(field) => {
        const avatar = randomItemArray(avatars);

        return (
          <SelectItem key={field.id} textValue={field.name}>
            <div className="flex items-center gap-2">
              <Avatar
                alt={field.name}
                className="flex-shrink-0"
                src={avatar}
                size="md"
              />
              <div className="flex flex-col">
                <span className="text-small">{field.name}</span>
              </div>
            </div>
          </SelectItem>
        );
      }}
    </Select>
  );
}
