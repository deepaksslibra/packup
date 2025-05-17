'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="p-4 text-red-600">
      <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
      <pre className="bg-red-100 p-2 rounded text-sm">{error.message}</pre>
    </div>
  );
}
