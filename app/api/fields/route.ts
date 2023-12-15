import { NextRequest } from 'next/server';
import { generateData } from '../datasets/route';

export async function GET(req: NextRequest) {
  const dataFields = generateData('field');

  const { searchParams } = new URL(req.url);

  const dataset = searchParams.get('dataset');
  const type = searchParams.get('type');

  if (!dataset) {
    return new Response('Invalid dataset', {
      status: 500,
    });
  }
  const response = type === 'all' ? dataFields : dataFields.slice(0, 3);
  return Response.json({
    data: {
      fields: response,
    },
  });
}
