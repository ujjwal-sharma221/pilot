import { PremiumModal } from "@/components/premium-modal";
import { Navbar } from "./_components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      <PremiumModal />
    </div>
  );
};
export default MainLayout;
