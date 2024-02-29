export function formatDate(date: Date | string) {
  if (typeof date === "string") date = new Date(date);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const animationValues = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};
