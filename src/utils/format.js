export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate;
}
