export default function handler(req: { method: string; body: string; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; token?: string; }): any; new(): any; }; }; }) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    const { email, password } = JSON.parse(req.body);
  
    // Kiểm tra tài khoản giả định (Thay thế bằng database thực tế)
    if (email === "admin@example.com" && password === "123456") {
      return res.status(200).json({ token: "fake-jwt-token" });
    } else {
      return res.status(401).json({ message: "Email hoặc mật khẩu không đúng!" });
    }
  }
  