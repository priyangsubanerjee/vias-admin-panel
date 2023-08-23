import connectDatabase from "@/db/connect";
import admin from "@/db/models/admin";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const authorization = req.headers.authorization || null;

  if (authorization !== process.env.AUTHORIZATION) {
    return res.status(200).json({
      success: false,
      message: "Authorization failed",
    });
  }

  await connectDatabase();
  const { email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const admin_ = new admin({
    email,
    password: hash,
  });

  await admin_.save();

  res.status(200).json({
    success: true,
    message: "Admin registered successfully",
  });
}
