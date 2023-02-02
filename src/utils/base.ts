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

export const generateRandomPath = (points: number) => {
  const path = Array.from({ length: points })
    .map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_) =>
        `${Math.floor(Math.random() * 100)}% ${Math.floor(
          Math.random() * 100
        )}%`
    )
    .join(", ");
  return path;
};
