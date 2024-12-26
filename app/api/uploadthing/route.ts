import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
// src/app/api/uploadthing/route.ts
export const runtime = "nodejs";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: { callbackUrl: "https://streamify-u.vercel.app/api/uploadthing" },

  // Apply an (optional) custom config:
  // config: { ... },
});
