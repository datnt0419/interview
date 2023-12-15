'use client';

import useSWR from 'swr';
import { useMemo } from 'react';
import { fieldsEndpoint } from './fields.endpoint';

const fetcher = (...args: [RequestInfo, RequestInit]) =>
  fetch(...args).then((res) => res.json());

type QueryFieldsResponse = {
  fields: BaseModel[];
};

type QueryFieldsRequest = {
  datasetId: number;
  type?: 'all';
};
export function useGetFields({ datasetId, type }: QueryFieldsRequest) {
  const { data, ...restQuery } = useSWR<IBaseDataResponse<QueryFieldsResponse>>(
    [fieldsEndpoint.fields(datasetId, type)],
    fetcher as any,
  );

  const fields = useMemo(() => data?.data.fields || [], [data?.data]);

  return {
    fields,
    ...restQuery,
  };
}
