import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { connect } from "../route";

const prisma = new PrismaClient();

// IDに対応したデータを取得するAPI
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/blog/")[1]);
    connect();
    const post = await prisma.post.findFirst({ where: { id } });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect;
  }
};
