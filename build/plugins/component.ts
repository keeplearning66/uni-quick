import Components from 'unplugin-vue-components/vite';

export const AutoRegistryComponents = () => {
  return Components({
    dts: 'types/components.d.ts',
  });
};
