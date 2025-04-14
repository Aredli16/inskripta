import AdminLayout from "@/components/layout/AdminLayout";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AdminLayout navigation={[]} secondaryNavigation={[]}>
      {children}
    </AdminLayout>
  );
};

export default Layout;
