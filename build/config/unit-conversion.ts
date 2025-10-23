export const getUnitConversionMultiple = (size: number): number => {
  return 750 / size;
};

export const unitConversionProcessor = (enableUnitConversion: boolean, size: number, noConversionUnit: string) => {
  const unitConversionMultiple = getUnitConversionMultiple(size);
  return (value: number, unit: string) => {
    if (!enableUnitConversion) {
      return { value, unit };
    }
    if (unit === 'px') {
      value *= unitConversionMultiple;
      unit = 'rpx';
    }
    else if (unit === noConversionUnit) {
      unit = 'px';
    }
    return { value, unit };
  };
};
