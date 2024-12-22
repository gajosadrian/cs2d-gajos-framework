import { container } from "./core/ServiceProvider";
import modules from "./modules";
import { info } from "./utils";
import { eventManager } from "./core/Event";
import { timeManager } from "./core/Time";
import { gameManager } from "./core/Game";
import { cacheManager } from "./core/Cache";

for (const module of modules) {
    module.module.register();
    info(`Registered LUA module: ${module.name}`);
}

container.resolve("PlayerManager").register();
eventManager.register();
cacheManager.register();
gameManager.register();
timeManager.register();

/**
 * Plugins DEMO
 */
import { registerCustomPlayerPlugin } from "./plugins/custom-mod/main";
import { registerDemoPlugin } from "./plugins/demo/main";
registerCustomPlayerPlugin();
registerDemoPlugin();
