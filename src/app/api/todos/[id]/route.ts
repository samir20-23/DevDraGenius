import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { done } = await req.json();
  const updatedTodo = await prisma.todo.update({
    where: { id: Number(params.id) },
    data: { done },
  });
  return NextResponse.json(updatedTodo);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.todo.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}
