import { SignedIn, SignedOut } from "@clerk/nextjs";
import { type ReactNode } from "react";
import { BasicLayout } from "~/layouts";
import { ProtectedPage } from "../ProtectedPage";

const OpenPage = ({ children }: { children: ReactNode }) => (
  <>
    <SignedIn>
      <ProtectedPage>{children}</ProtectedPage>
    </SignedIn>

    <SignedOut>
      <BasicLayout>{children}</BasicLayout>
    </SignedOut>
  </>
);

export default OpenPage;
