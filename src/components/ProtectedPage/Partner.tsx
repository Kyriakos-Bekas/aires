import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import React from "react";
import { PartnerDashboardLayout } from "~/layouts";

type ProtectedPageProps = {
  children: React.ReactNode;
};

// Component to handle private page
const PartnerProtectedPage = ({ children }: ProtectedPageProps) => {
  return (
    <>
      <SignedIn>
        {/*
          Authenticated visitors will see the page content.
        */}
        {/* <PartnerDashboardLayout> */}
        {children}
        {/* </PartnerDashboardLayout> */}
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

export default PartnerProtectedPage;
