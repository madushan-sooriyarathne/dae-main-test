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

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
