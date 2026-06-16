package com.rigbycat11.optimizedmod;

import net.fabricmc.api.ModInitializer;
import net.fabricmc.fabric.api.event.lifecycle.v1.ServerTickEvents;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OptimizedMod implements ModInitializer {
    public static final String MOD_ID = "optimized_mod";
    public static final Logger LOGGER = LoggerFactory.getLogger(MOD_ID);

    private static final OreGeneratorManager oreManager = new OreGeneratorManager();

    @Override
    public void onInitialize() {
        LOGGER.info("Initializing Optimized Mod - Server-side performance focus");
        
        // Register efficient server tick
        ServerTickEvents.END_SERVER_TICK.register(server -> {
            oreManager.tick(server);
        });
    }
}
