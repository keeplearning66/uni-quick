export const toFixed = (number: number, precision: number) => {
  const multiplier = 10 ** (precision + 1);
  const wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
};

export const getUnitConversionMultiple = (size: number): number => {
  return 750 / size;
};

export const getConversionValue = (value: number, size: number, precision: number): number => {
  value = getUnitConversionMultiple(size) * value;
  if (!Number.isInteger(value)) {
    value = toFixed(value, precision);
  }
  return value;
};

export const createUnitConversionProcessor = (enableUnitConversion: boolean, size: number, noConversionUnit: string, precision: number) => {
  return (value: number, unit: string) => {
    if (!enableUnitConversion) {
      return { value, unit };
    }
    if (unit === 'px') {
      value = getConversionValue(value, size, precision);
      unit = 'rpx';
    }
    else if (unit === noConversionUnit) {
      unit = 'px';
    }
    return { value, unit };
  };
};
