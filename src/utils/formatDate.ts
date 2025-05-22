export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("vi-VN", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};
