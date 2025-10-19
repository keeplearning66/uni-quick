export const getUnitConversionMultiple = (env: Record<string, string>): number => {
  const { VITE_UI_SIZE } = env;
  return 750 / +VITE_UI_SIZE;
};
