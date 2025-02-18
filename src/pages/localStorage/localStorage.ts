export const loadState = () => {
  if (typeof window === "undefined") return undefined; // Kiểm tra nếu đang chạy trên server

  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load state from localStorage", err);
    return undefined;
  }
};

export const saveState = (state: any) => {
  if (typeof window === "undefined") return; // Tránh lỗi trên server

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch (err) {
    console.error("Failed to save state to localStorage", err);
  }
};
