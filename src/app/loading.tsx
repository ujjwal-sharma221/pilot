import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoaderCircle className="mx-auto animate-spin text-muted-foreground" />;
    </div>
  );
}
