export function toFixed(number: number, precision: number) {
  const multiplier = 10 ** (precision + 1);
  const wholeNumber = Math.floor(number * multiplier);
  return Math.round(wholeNumber / 10) * 10 / multiplier;
};

export function getUnitConversionRatio(size: number): number {
  return 750 / size;
};

export function getConversionValue(value: number, size: number, precision: number): number {
  let conversionValue = getUnitConversionRatio(size) * value;
  if (!Number.isInteger(conversionValue)) {
    conversionValue = toFixed(conversionValue, precision);
  }
  return conversionValue;
};

export function createUnitConversionProcessor(
  enableUnitConversion: boolean,
  size: number,
  noConversionUnit: string,
  precision: number,
) {
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
