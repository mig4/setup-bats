import * as io from "@actions/io";
import * as process from "process";
import * as path from "path";
import { existsSync } from "fs";

const toolDir = path.join(__dirname, "runner", "tools");
const tempDir = path.join(__dirname, "runner", "temp");

process.env["RUNNER_TOOL_CACHE"] = toolDir;
process.env["RUNNER_TEMP"] = tempDir;
import { ensureBatsAvailable } from "../src/installer";

describe("installer tests", () => {
  beforeAll(async () => {
    await io.rmRF(toolDir);
    await io.rmRF(tempDir);
  }, 100000);

  it("Acquires version of BATS if no matching version is installed", async () => {
    let batsDir = await ensureBatsAvailable("1.0.0");

    expect(existsSync(`${batsDir}.complete`)).toBe(true);
    expect(existsSync(path.join(batsDir, "bin", "bats"))).toBe(true);
  }, 100000);

  it("Throws if no matching version of BATS can be found", async () => {
    let thrown = false;
    try {
      await ensureBatsAvailable("0.0.0");
    } catch {
      thrown = true;
    }
    expect(thrown).toBe(true);
  }, 100000);
});
