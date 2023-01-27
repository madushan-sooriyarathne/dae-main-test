export const clamp = (
  lowerBound: number,
  higherBound: number,
  num: number
): number => {
  const rangeSize = higherBound - lowerBound;
  return (
    ((((num - lowerBound) % rangeSize) + rangeSize) % rangeSize) + lowerBound
  );
};
