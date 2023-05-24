import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useUserStore } from "~/utils/state";
import { DashboardLayout } from "~/layouts";

// Paths that are only accessible to partners
const partnerPaths = ["/dashboard"];

type RedirectProps = {
  children: React.ReactNode;
};

// Component to handle redirects based on user role
const Redirect = ({ children }: RedirectProps) => {
  const { user } = useUser();
  const router = useRouter();
  let isPartner = false;
  const setId = useUserStore((state) => state.setId);
  const setIsPartner = useUserStore((state) => state.setIsPartner);

  if (!!user) {
    const { organizationMemberships, id } = user;
    isPartner = !!organizationMemberships.length
      ? organizationMemberships.some(
          (membership) => membership.organization.name === "AirES Partners"
        )
      : false;

    setId(id);
    setIsPartner(isPartner);

    // Redirect to dashboard if partner
    if (isPartner && !partnerPaths.includes(router.asPath))
      void router.push("/dashboard");

    // Redirect to home if not partner
    if (!isPartner && partnerPaths.includes(router.asPath))
      void router.push("/");
  }

  return isPartner ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <>{children}</>
  );
};

export default Redirect;
