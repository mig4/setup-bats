"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const tc = __importStar(require("@actions/tool-cache"));
const path = __importStar(require("path"));
const TOOL_NAME = "BATS";
function ensureBatsAvailable(version) {
    return __awaiter(this, void 0, void 0, function* () {
        // check cache
        let toolPath = tc.find(TOOL_NAME, version);
        if (!toolPath) {
            toolPath = yield acquireBats(version);
        }
        core.debug(`BATS cached in: ${toolPath}`);
        // prepend bin directory to PATH for future tasks
        core.addPath(path.join(toolPath, "bin"));
        return toolPath;
    });
}
exports.ensureBatsAvailable = ensureBatsAvailable;
function acquireBats(version) {
    return __awaiter(this, void 0, void 0, function* () {
        //
        // Download
        //
        let downloadPath = yield tc.downloadTool(getDownloadUrl(version));
        //
        // Extract
        //
        let extPath = yield tc.extractTar(downloadPath);
        //
        // Install into local cache
        //
        let toolRoot = path.join(extPath, `bats-core-${version}`);
        return yield tc.cacheDir(toolRoot, TOOL_NAME, version);
    });
}
function getDownloadUrl(version) {
    return `https://github.com/bats-core/bats-core/archive/v${version}.tar.gz`;
}
