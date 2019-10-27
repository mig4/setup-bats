import * as core from "@actions/core";
import * as path from "path";
import { ensureBatsAvailable } from "./installer";

async function run() {
  try {
    const version = core.getInput("bats-version", { required: true });
    console.log(`Setting up BATS ${version} ...`);

    await ensureBatsAvailable(version);

    const matchersPath = path.join(__dirname, "..", ".github");
    console.log(
      `##[add-matcher]${path.join(matchersPath, "bats-matcher.json")}`
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
