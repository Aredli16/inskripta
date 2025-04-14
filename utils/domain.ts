import { headers } from "next/headers";

export const getSubdomain = async () => {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  return host.split(".")[0];
};
