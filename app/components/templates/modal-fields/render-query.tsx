import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Snippet,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';

export interface RenderQueryProps {
  fieldsSelected: string[];
}

export function RenderQuery(props: RenderQueryProps) {
  const { fieldsSelected } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isDisabled = fieldsSelected.length === 0;
  const queryText = fieldsSelected.join(', ');
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          isDisabled={isDisabled}
          onClick={onOpen}
          color="danger"
          variant="bordered"
        >
          Export
        </Button>
      </div>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                SQL Code
              </ModalHeader>
              <ModalBody className="mb-4 py-4">
                <Tooltip
                  placement={'top'}
                  showArrow
                  content={queryText}
                  color="secondary"
                >
                  <Snippet
                    className="overflow-hidden"
                    variant="shadow"
                    color="secondary"
                  >
                    {queryText}
                  </Snippet>
                </Tooltip>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
