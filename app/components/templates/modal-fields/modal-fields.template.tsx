import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { ModalFieldsBodyTemplate } from './modal-fields-body.template';
import { useState } from 'react';

export interface ModalFieldsTemplateProps {
  datasetId: number;
  existFields: BaseModel[];
  onSelect: (fieldsSelect: BaseModel[]) => void;
}

export function ModalFieldsTemplate(props: ModalFieldsTemplateProps) {
  const { datasetId, existFields, onSelect } = props;

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [fieldsSelect, setFieldsSelect] = useState<BaseModel[]>([]);

  function handleChangeFields(fields: BaseModel[]) {
    setFieldsSelect(fields);
  }

  function handleSave() {
    onSelect(fieldsSelect);
    onClose();
  }

  return (
    <>
      <Button color="primary" className="min-w-[100px]" onClick={onOpen}>
        More Fields
      </Button>
      <Modal
        scrollBehavior="outside"
        size="2xl"
        className="min-h-[60vh]"
        backdrop={'blur'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Select Fields
              </ModalHeader>
              <ModalBody>
                <ModalFieldsBodyTemplate
                  onChange={handleChangeFields}
                  datasetId={datasetId}
                  existFields={existFields}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  className="min-w-[100px]"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  isDisabled={fieldsSelect.length === 0}
                  color="primary"
                  className="min-w-[100px]"
                  onPress={handleSave}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
