import { ReactNode, Suspense } from "react";
import RegistrationStepsLayout from "@/components/RegistrationStepsLayout";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="mb-3">
        <div className="lg:border-t lg:border-b lg:border-gray-200 bg-white">
          <Suspense>
            <RegistrationStepsLayout />
          </Suspense>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</main>
    </>
  );
};

export default Layout;
