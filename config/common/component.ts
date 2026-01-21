import Components from 'unplugin-vue-components/vite';

export const createAutoRegistryComponents = () => {
  return Components({
    dts: 'types/components.d.ts',
  });
};
