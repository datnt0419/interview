export function generateData(dataName: string) {
  const data = [...Array(20)].map((_, idx) => ({
    id: idx + 1,
    name: `${dataName} ${idx + 1}`,
  }));
  return data;
}

export async function GET() {
  const dataset = generateData('dataset');

  return Response.json({
    data: {
      dataset,
    },
  });
}
