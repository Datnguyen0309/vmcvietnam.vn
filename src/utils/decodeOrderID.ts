import CryptoJS from "crypto-js";

const SECRET_KEY = "OME"; // Lưu khóa bí mật vào biến môi trường

// Mã hóa order_id
export const encryptOrderId = (order_id: string) => {
  const ciphertext = CryptoJS.AES.encrypt(order_id, SECRET_KEY).toString();
  return encodeURIComponent(ciphertext); // Mã hóa URL để tránh lỗi khi truyền
};

// Giải mã order_id
export const decryptOrderId = (encrypted_order_id: string) => {
  const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encrypted_order_id), SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8); // Trả về order_id gốc
};
