// pages/api/create-new.js
import prisma from "../../prisma/client";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    console.log(req.body);
    const { email } =
      typeof req.body == "string" ? JSON.parse(req.body) : req.body;

    try {
      const result = await prisma.emails.create({
        data: {
          email: email,
        },
      });
      res.status(200).json({ result });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}
