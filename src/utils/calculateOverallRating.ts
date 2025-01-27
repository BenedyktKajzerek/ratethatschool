export const calculateOverallRating = (
  ratings: Record<string, number>,
): number => {
  const overallRating = parseFloat(
    (
      Object.values(ratings).reduce((a: number, b: number) => a + b, 0) /
      Object.values(ratings).length
    ).toFixed(1),
  );

  return overallRating;
};
