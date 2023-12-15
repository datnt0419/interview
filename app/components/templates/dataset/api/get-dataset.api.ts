'use client';

import useSWR from 'swr';
import { datasetEndpoint } from './dataset-endpoint';
import { fetcher } from './fetcher';
import { useMemo } from 'react';

type QueryDatasetResponse = {
  dataset: BaseModel[];
};

export function useGetDatasets() {
  const { data, ...restQuery } = useSWR<
    IBaseDataResponse<QueryDatasetResponse>
  >(datasetEndpoint.dataset, fetcher as any);

  const listDatasets = useMemo(() => data?.data.dataset || [], [data?.data]);

  return {
    listDatasets,
    ...restQuery,
  };
}
