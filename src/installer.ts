import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import * as path from "path";

const TOOL_NAME = "BATS";

export async function ensureBatsAvailable(version: string) {
  // check cache
  let toolPath = tc.find(TOOL_NAME, version);

  if (!toolPath) {
    toolPath = await acquireBats(version);
  }
  core.debug(`BATS cached in: ${toolPath}`);

  // prepend bin directory to PATH for future tasks
  core.addPath(path.join(toolPath, "bin"));

  return toolPath;
}

async function acquireBats(version: string): Promise<string> {
  //
  // Download
  //
  let downloadPath = await tc.downloadTool(getDownloadUrl(version));

  //
  // Extract
  //
  let extPath = await tc.extractTar(downloadPath);

  //
  // Install into local cache
  //
  let toolRoot = path.join(extPath, `bats-core-${version}`);
  return await tc.cacheDir(toolRoot, TOOL_NAME, version);
}

function getDownloadUrl(version: string) {
  return `https://github.com/bats-core/bats-core/archive/v${version}.tar.gz`;
}
