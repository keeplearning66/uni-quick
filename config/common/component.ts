import Components from 'unplugin-vue-components/vite';

export function createAutoRegistryComponents() {
  return Components({
    dts: 'types/components.d.ts',
  });
};
