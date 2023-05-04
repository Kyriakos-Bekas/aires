import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import React from "react";

type ProtectedPageProps = {
  children: React.ReactNode;
};

// Component to handle private page
const ProtectedPage = ({ children }: ProtectedPageProps) => {
  return (
    <>
      <SignedIn>
        {/*
          Authenticated visitors will see the page content.
        */}
        {children}
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
