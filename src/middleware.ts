import { authMiddleware } from "@clerk/nextjs";
import { siteConfig } from "./siteConfig";

export default authMiddleware({
  publicRoutes: siteConfig.publicRoutes,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
