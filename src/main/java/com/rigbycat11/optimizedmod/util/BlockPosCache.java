package com.rigbycat11.optimizedmod.util;

import net.minecraft.util.math.BlockPos;

/**
 * Reusable mutable BlockPos cache to avoid allocations in hot loops.
 * Usage: cache.set(x, y, z); BlockState state = world.getBlockState(cache);
 */
public class BlockPosCache {
    private final BlockPos.Mutable pos = new BlockPos.Mutable();
    
    public void set(int x, int y, int z) {
        pos.set(x, y, z);
    }
    
    public BlockPos.Mutable get() {
        return pos;
    }
}
