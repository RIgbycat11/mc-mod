package com.rigbycat11.optimizedmod;

import net.minecraft.server.MinecraftServer;
import net.minecraft.world.World;
import it.unimi.dsi.fastutil.longs.Long2IntMap;
import it.unimi.dsi.fastutil.longs.Long2IntOpenHashMap;
import java.util.ArrayDeque;
import java.util.Deque;

/**
 * High-performance ore generation manager using:
 * - Object pooling for work items
 * - Primitive collections to avoid boxing
 * - Batch processing to spread load across ticks
 */
public class OreGeneratorManager {
    private static final int WORK_BATCH_SIZE = 8; // Process 8 chunks per tick max
    private static final int MAX_WORK_QUEUE = 256;
    
    // Reusable work item pool
    private final Deque<GenerationWorkItem> workPool = new ArrayDeque<>();
    private final Deque<GenerationWorkItem> workQueue = new ArrayDeque<>();
    
    // Cache: chunk position -> last generated tick (avoid re-gen)
    private final Long2IntMap generatedChunks = new Long2IntOpenHashMap();
    private int currentTick = 0;
    
    public OreGeneratorManager() {
        // Pre-allocate work items
        for (int i = 0; i < 32; i++) {
            workPool.push(new GenerationWorkItem());
        }
    }
    
    public void tick(MinecraftServer server) {
        currentTick++;
        
        // Process up to WORK_BATCH_SIZE items per tick to avoid lag spikes
        int processed = 0;
        while (!workQueue.isEmpty() && processed < WORK_BATCH_SIZE) {
            GenerationWorkItem item = workQueue.pop();
            processGeneration(server, item);
            workPool.push(item); // Return to pool
            processed++;
        }
    }
    
    private void processGeneration(MinecraftServer server, GenerationWorkItem item) {
        // Simulate ore generation work
        // In real mod: generate ores in a chunk, update world state, etc.
        // Keep it short and non-blocking
    }
    
    private GenerationWorkItem obtainWorkItem() {
        return workPool.isEmpty() ? new GenerationWorkItem() : workPool.pop();
    }
    
    /**
     * Reusable work item to avoid allocations
     */
    private static class GenerationWorkItem {
        long chunkPos;
        int x, z;
        World world;
        
        void reset() {
            chunkPos = 0;
            x = 0;
            z = 0;
            world = null;
        }
    }
}
