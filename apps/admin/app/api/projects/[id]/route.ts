import { prisma } from "@repo/database/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    // If slug is being updated, check uniqueness (excluding current project)
    if (body.slug) {
      const existingProject = await prisma.project.findUnique({
        where: { slug: body.slug },
      });

      if (existingProject && existingProject.id !== id) {
        return NextResponse.json(
          { error: "Код вече съществува. Моля, използвайте друг код." },
          { status: 409 }
        );
      }
    }

    const project = await prisma.project.update({
      where: { id },
      data: body,
      include: { category: true, client: true, images: true },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("[Projects PUT] Error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Projects DELETE] Error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
