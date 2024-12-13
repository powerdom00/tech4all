import { NextApiRequest, NextApiResponse } from "next";
import { LoginService } from "../../../server/src/app/services/LoginServices";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const loginService = new LoginService();

    try {
      const result = await loginService.login(username, password);
      if (result.success) {
        res.status(200).json({ message: "Login successful", user: result.user });
      } else {
        res.status(401).json({ message: result.message });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
