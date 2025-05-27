"use client";

import BaseAdminLayout from "@/components/layout/BaseAdminLayout";
import {
  ClockIcon,
  CogIcon,
  FolderIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
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
        {
          name: "Cours",
          icon: ClockIcon,
          href: "/admin/lessons",
        },
      ]}
      secondaryNavigation={[
        {
          name: t("Settings"),
          icon: CogIcon,
          href: "/admin/settings",
        },
      ]}
    >
      {children}
    </BaseAdminLayout>
  );
};

export default DomainAdminLayout;
