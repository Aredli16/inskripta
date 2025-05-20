"use client";

import BaseAdminLayout from "@/components/layout/BaseAdminLayout";
import { FolderIcon, UsersIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";

const DomainAdminLayout = ({ children }: { children: ReactNode }) => {
  const t = useTranslations("Domain.Admin.Navigation");

  return (
    <BaseAdminLayout
      navigation={[
        {
          name: t("Students"),
          icon: UsersIcon,
          href: "/admin",
        },
        {
          name: t("Registrations"),
          icon: FolderIcon,
          href: "/admin/registrations",
        },
      ]}
      secondaryNavigation={[]}
    >
      {children}
    </BaseAdminLayout>
  );
};

export default DomainAdminLayout;
