import { _decorator } from "cc";
import { startGame } from "db://shared-components/shared/scripts/startup";
import Observer from "observer";

import GameCrashComponent from "../../../../extensions/shared-components/assets/game-crash/scripts/components/game-crash-component";
import { siteConfigs } from "../../../scripts/site-configs";
import { settings } from "../game-settings";
import { containerOptions } from "../containerOptions";
import "./../../../resources/i18n";

startGame(settings.name, containerOptions, siteConfigs);

const { ccclass } = _decorator;
const { observer } = Observer;

@ccclass
@observer(settings.name)
export default class Game extends GameCrashComponent {
    override namespace = settings.name;
    override containerOptions = containerOptions;
}
