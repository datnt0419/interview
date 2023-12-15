'use client';

import { Chip, Select, SelectItem, Selection } from '@nextui-org/react';
import { useState } from 'react';

import { FieldsTemplate } from '../fields';
import { useGetDatasets } from './api';

export interface DatasetTemplateProps {}

export function DatasetTemplate(props: DatasetTemplateProps) {
  const [datasetIds, setDatasetIds] = useState<number[]>([]);

  const { listDatasets } = useGetDatasets();

  function handleSelection(keys: Selection) {
    const convertIds = Array.from(keys);
    setDatasetIds(convertIds as number[]);
  }

  const datasetSelected = listDatasets.filter((dataset) =>
    datasetIds.some((dataId) => +dataId === dataset.id),
  );

  return (
    <div className="flex h-full flex-1 space-x-12 ">
      <div className="flex flex-col gap-2">
        {/* <Popover shouldCloseOnBlur placement="bottom">
          <PopoverTrigger>
            <Button
              startContent={<CiCirclePlus />}
              className="text-lg"
              color="primary"
              variant="bordered"
            >
              Select datasets
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 shadow-none  ">
            <div className="flex  w-[320px]   flex-col gap-2">
              <Select
                label="Select datasets"
                size="sm"
                isMultiline={true}
                labelPlacement="outside"
                color="primary"
                classNames={{
                  base: 'max-w-xs',
                  trigger: 'min-h-unit-12 py-2',
                }}
                variant="bordered"
                renderValue={(items) => {
                  return (
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <Chip key={item.key}>{item?.textValue}</Chip>
                      ))}
                    </div>
                  );
                }}
                selectionMode="multiple"
                selectedKeys={datasetIds}
                onSelectionChange={handleSelection}
              >
                {listDatasets.map((dataset) => (
                  <SelectItem key={dataset.id} value={dataset.id}>
                    {dataset.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </PopoverContent>
        </Popover> */}
        <div className="flex  w-[320px]   flex-col gap-2">
          <Select
            label="Select datasets"
            size="sm"
            placeholder="Select datasets..."
            isMultiline={true}
            labelPlacement="outside"
            color="primary"
            classNames={{
              base: 'max-w-xs',
              trigger: 'min-h-unit-12 py-2',
            }}
            variant="bordered"
            renderValue={(items) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <Chip key={item.key}>{item?.textValue}</Chip>
                  ))}
                </div>
              );
            }}
            selectionMode="multiple"
            selectedKeys={datasetIds}
            onSelectionChange={handleSelection}
          >
            {listDatasets.map((dataset) => (
              <SelectItem key={dataset.id} value={dataset.id}>
                {dataset.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="px--12 flex w-full flex-1 flex-col  space-y-6  overflow-x-hidden ">
        <FieldsTemplate datasetSelected={datasetSelected} />
      </div>
    </div>
  );
}
