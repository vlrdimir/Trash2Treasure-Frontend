/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import { withContentlayer } from "next-contentlayer2";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [
      "i.pinimg.com",
      "github.com",
      "cdn.dontdemoit.com",
      "not-lain-background-removal.hf.space",
      "pub-fd8694d56e144f3bbfac5aedbf111b5a.r2.dev",
      "lh3.googleusercontent.com",
      "asset.kompas.com",
    ],
  },
};

export default withContentlayer(config);
