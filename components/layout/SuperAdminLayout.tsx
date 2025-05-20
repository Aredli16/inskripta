"use client";

import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import BaseAdminLayout from "@/components/layout/BaseAdminLayout";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

const SuperAdminLayout = ({ children }: { children: ReactNode }) => {
  const t = useTranslations("SuperAdmin.Layout.Navigation");
  return (
    <BaseAdminLayout
      navigation={[
        {
          name: t("Organizations"),
          href: "/admin",
          icon: BuildingOffice2Icon,
        },
      ]}
      secondaryNavigation={[]}
    >
      {children}
    </BaseAdminLayout>
  );
};

export default SuperAdminLayout;
