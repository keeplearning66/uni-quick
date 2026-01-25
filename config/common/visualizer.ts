import { visualizer } from 'rollup-plugin-visualizer';

export function createVisualizer() {
  return visualizer({
    emitFile: false,
    filename: 'stats.html',
    open: true,
  });
};
