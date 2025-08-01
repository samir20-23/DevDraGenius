import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyJwt } from "@/lib/jwt";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const decoded = verifyJwt(token!);
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const todos = await prisma.todo.findMany({ where: { userId: decoded.id } });
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const decoded = verifyJwt(token!);
  if (!decoded)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title } = await req.json();
  const todo = await prisma.todo.create({
    data: { title, userId: decoded.id },
  });

  return NextResponse.json(todo);
}
