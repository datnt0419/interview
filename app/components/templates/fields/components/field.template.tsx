import { Card, CardBody, Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { ModalFieldsTemplate, RenderQuery } from '../../modal-fields';
import { useGetFields } from '../api';
import { FieldItem, QueryAction } from './field.item';

export interface FieldTemplateProps {
  dataset: BaseModel;
}

export function FieldTemplate(props: FieldTemplateProps) {
  const { dataset } = props;

  const { id, name } = dataset;

  const { fields, isLoading } = useGetFields({ datasetId: id });

  const [fieldsExist, setFieldsExist] = useState<BaseModel[]>([]);

  const fieldSelected = fieldsExist.map((field) => field.name);

  function handleSelectFields(fieldsSelect: BaseModel[]) {
    setFieldsExist((prev) => [...prev, ...fieldsSelect]);
  }
  function handleSelectQuery(field: BaseModel & { des?: string }) {
    console.log(field?.des);
    switch (field.name) {
      case QueryAction.COUNT:
      case QueryAction.SUM:
      case QueryAction.NONE:
        setFieldsExist((prev) => {
          const newFields = prev.map((pre) =>
            pre.id === field.id
              ? {
                  ...pre,
                  name:
                    field.name === QueryAction.NONE
                      ? field.des || ''
                      : field.name,
                }
              : pre,
          );
          console.log('newFields: ', newFields);
          return newFields;
        });
        break;

      case QueryAction.DELETE:
        setFieldsExist((prev) => prev.filter((pre) => pre.id !== field.id));
        break;

      default:
        return;
    }
  }

  useEffect(() => {
    if (!fields.length) return;
    setFieldsExist(fields);
  }, [fields]);

  return (
    <>
      <p>{name}</p>
      <Card className="min-h-[80px]">
        <CardBody className="">
          <div className=" mt-1  flex h-full flex-1 items-center justify-between  space-x-6">
            {isLoading ? (
              <div className=" mt-3 h-full  w-full flex-1 text-center">
                {' '}
                <Spinner />
              </div>
            ) : (
              <>
                <div className=" flex w-full flex-wrap gap-4 ">
                  {!!fieldsExist.length ? (
                    fieldsExist.map((field) => (
                      <FieldItem
                        handleSelectQuery={handleSelectQuery}
                        key={field.id}
                        field={field}
                      />
                    ))
                  ) : (
                    <p className=" w-full text-center">No fields</p>
                  )}
                </div>
                <div className=" flex space-x-4">
                  <RenderQuery fieldsSelected={fieldSelected} />
                  <ModalFieldsTemplate
                    onSelect={handleSelectFields}
                    datasetId={dataset.id}
                    existFields={fieldsExist}
                  />
                </div>
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
