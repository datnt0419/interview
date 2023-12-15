'use client';

import { DatasetTemplate } from './components/templates';

export default function Home() {
  return (
    <main className="h-screen overflow-hidden p-12">
      <h2 className="mb-8 text-2xl font-semibold">Databuckets</h2>
      <DatasetTemplate />
    </main>
  );
}
