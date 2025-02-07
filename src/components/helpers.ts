export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const month = date.toLocaleString("en-us", { month: "long" });
  return `${date.getDate()} ${month} ${date.getFullYear()}`;
}