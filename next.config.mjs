// next.config.mjs
// Static export config suitable for GitHub Pages.
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const isProjectPages = isGitHubActions && repo && !repo.endsWith(".github.io");
const basePath = isProjectPages ? `/${repo}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  // images: { unoptimized: true }, // enable later if you use next/image
};

export default nextConfig;
