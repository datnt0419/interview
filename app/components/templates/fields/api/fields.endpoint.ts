export const fieldsEndpoint = {
  fields(datasetId: number, type?: 'all') {
    const url = type
      ? `/api/fields?dataset=${datasetId}&type=${type}`
      : `/api/fields?dataset=${datasetId}`;
    return url;
  },
};
