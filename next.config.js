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
      "pub-fd8694d56e144f3bbfac5aedbf111b5a.r2.dev",
    ],
  },
};

export default withContentlayer(config);
