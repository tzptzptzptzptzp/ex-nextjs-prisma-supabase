import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DB接続
export async function connect() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("The database connection has failed.");
  }
}

// 全てのデータを取得するAPI
export const GET = async (req: Request, res: NextResponse) => {
  try {
    connect();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};
