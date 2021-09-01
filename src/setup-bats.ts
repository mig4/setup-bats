import * as core from '@actions/core'
// import * as path from "path";
import {ensureBatsAvailable} from './installer'

async function run(): Promise<void> {
  try {
    const version = core.getInput('bats-version', {required: true})
    core.info(`Setting up BATS ${version} ...`)

    await ensureBatsAvailable(version)

    // const matchersPath = path.join(__dirname, "..", ".github");
    // console.log(
    //   `##[add-matcher]${path.join(matchersPath, "bats-matcher.json")}`
    // );
  } catch (error: unknown) {
    const {message} = error as Error
    core.setFailed(message)
  }
}

run()
