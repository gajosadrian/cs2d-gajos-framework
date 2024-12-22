import { PlayerManager } from "./Player";
import { ServiceContainer } from "./Container";

interface Services {
    PlayerManager: PlayerManager;
}

export const container = new ServiceContainer<Services>();

container.singleton("PlayerManager", () => new PlayerManager());
