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
  return new Date(date).toLocaleDateString("en-lk", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatId = (id: string): string => {
  return id.replace(" ", "-").toLowerCase();
};

export const encodeFile = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result.toString());
      } else {
        reject(
          new Error("An error occurred while reading the file - file is empty")
        );
      }
    };
    reader.onerror = reject;
  });
