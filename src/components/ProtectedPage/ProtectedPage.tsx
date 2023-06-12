import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import React from "react";
import { UserDashboardLayout } from "~/layouts";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useUserStore } from "~/utils/state";
import { siteConfig } from "~/siteConfig";
import { PartnerDashboardLayout } from "~/layouts";

const partnerPaths = siteConfig.partnerRoutes;

type ProtectedPageProps = {
  children: React.ReactNode;
};

// Component to handle private page
const ProtectedPage = ({ children }: ProtectedPageProps) => {
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
  return (
    <>
      <SignedIn>
        {/*
          Authenticated visitors will see the page content.
        */}
        {isPartner ? (
          <PartnerDashboardLayout>{children}</PartnerDashboardLayout>
        ) : (
          <UserDashboardLayout>{children}</UserDashboardLayout>
        )}
      </SignedIn>
      <SignedOut>
        {/* 
          Non-authenticated visitors will be redirected
          to the sign in page.
        */}
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default ProtectedPage;
