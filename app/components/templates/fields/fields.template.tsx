import { FieldTemplate } from './components';

export interface FieldsTemplateProps {
  datasetSelected: BaseModel[];
}

export function FieldsTemplate(props: FieldsTemplateProps) {
  const { datasetSelected } = props;

  return (
    <>
      {!!datasetSelected.length ? (
        datasetSelected.map((set) => (
          <div
            key={set.id}
            className=" flex w-full flex-col rounded-lg  border-1.5 p-6"
          >
            <FieldTemplate dataset={set} />
          </div>
        ))
      ) : (
        <p className="mt-4  py-6 text-center">No Dataset selected</p>
      )}
    </>
  );
}
