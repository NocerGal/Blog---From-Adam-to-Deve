import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex items-center h-[75vh] w-full">
      <Loader2 className="animate-spin h-full m-auto" />
    </div>
  );
}
