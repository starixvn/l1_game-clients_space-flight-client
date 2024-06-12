import fs from "fs-extra";
import { BuildHook, IBuildResult, IBuildTaskOption } from "../@types";

interface IOptions {
    remoteAddress: string;
    enterCocos: string;
    selectTest: string;
    objectTest: {
        number: number;
        string: string;
        boolean: boolean;
    };
    arrayTest: [number, string, boolean];
}

const PACKAGE_NAME = "cocos-plugin-template";

interface ITaskOptions extends IBuildTaskOption {
    packages: {
        "cocos-plugin-template": IOptions;
    };
}

function log(...arg: any[]) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}

let allAssets = [];

export const throwError: BuildHook.throwError = true;

export const load: BuildHook.load = async function () {
    console.log(`[${PACKAGE_NAME}] Load cocos plugin example in builder.`);
    allAssets = await Editor.Message.request("asset-db", "query-assets");
};

export const onBeforeBuild: BuildHook.onBeforeBuild = async function (options: ITaskOptions, result: IBuildResult) {
    // Todo some thing
    log(`${PACKAGE_NAME}.webTestOption`, "onBeforeBuild");
};

export const onBeforeCompressSettings: BuildHook.onBeforeCompressSettings = async function (options: ITaskOptions, result: IBuildResult) {
    // const pkgOptions = options.packages[PACKAGE_NAME];
    // if (pkgOptions?.webTestOption) {
    //     console.debug("webTestOption", true);
    // }
    // Todo some thing
    console.debug("onBeforeCompressSettings ", options);
    console.debug("get settings test", result.settings);
};

export const onAfterCompressSettings: BuildHook.onAfterCompressSettings = async function (options: ITaskOptions, result: IBuildResult) {
    // Todo some thing
    console.log("webTestOption", "onAfterCompressSettings");
};

export const onAfterBuild: BuildHook.onAfterBuild = async function (options: ITaskOptions, result: IBuildResult) {
    // change the uuid to test
    const ccUrl = `https://l1-client.lumigame.com/shared-resources/cocos-engine/2d/cc.js`;
    const indexFile = result.paths["indexJs"];
    console.log("after build indexFile", indexFile);
    const data = fs.readFileSync(indexFile, "utf8");
    const newData = data.replace(`topLevelImport('cc')`, `topLevelImport('${ccUrl}')`);
    fs.writeFileSync(indexFile, newData, "utf8");

    const importMapFile = result.paths["cache"]["importMap"];
    console.log("importMapFile: " + importMapFile);
    const mapData = `{"imports":{"cc":"${ccUrl}"}}`;
    fs.writeFileSync(importMapFile, mapData, "utf8");
};

export const unload: BuildHook.unload = async function () {
    console.log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`);
};

export const onError: BuildHook.onError = async function (options, result) {
    // Todo some thing
    console.warn(`${PACKAGE_NAME} run onError`);
};

export const onBeforeMake: BuildHook.onBeforeMake = async function (root, options) {
    console.log(`onBeforeMake: root: ${root}, options: ${options}`);
};

export const onAfterMake: BuildHook.onAfterMake = async function (root, options) {
    console.log(`onAfterMake: root: ${root}, options: ${options}`);
};
