import Link from "next/link";

import { Button } from "@/components/ui/button";

const SuccessPage = () => {
  return (
    <main className="mx-auto max-w-7xl space-y-6 px-3 py-6 text-center">
      <h1 className="text-3xl font-bold">Billing Successfull</h1>
      <p>Your pro account has been activated</p>
      <Button variant="linkHover1" asChild>
        <Link href="/resumes">Back to Resumes</Link>
      </Button>
    </main>
  );
};
export default SuccessPage;
