import { prisma } from "@repo/database/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { cloudinaryPublicId, order } = await req.json();

    if (!cloudinaryPublicId) {
      return NextResponse.json(
        { error: "Missing cloudinaryPublicId" },
        { status: 400 }
      );
    }

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const projectImage = await prisma.projectImage.create({
      data: {
        projectId: id,
        cloudinaryPublicId,
        order: order ?? 0,
      },
    });

    return NextResponse.json(projectImage, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[ProjectImages POST] Error details:", {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      error: error,
    });
    return NextResponse.json(
      { error: "Failed to create project image", details: errorMessage },
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

    const { id: projectId } = await params;
    const { imageId } = await req.json();

    if (!imageId) {
      return NextResponse.json({ error: "Missing imageId" }, { status: 400 });
    }

    // Verify the image belongs to this project
    const image = await prisma.projectImage.findUnique({
      where: { id: imageId },
    });

    if (!image || image.projectId !== projectId) {
      return NextResponse.json(
        { error: "Image not found in project" },
        { status: 404 }
      );
    }

    // Delete the image record
    const deletedImage = await prisma.projectImage.delete({
      where: { id: imageId },
    });

    return NextResponse.json(deletedImage);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[ProjectImages DELETE] Error details:", {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      error: error,
    });
    return NextResponse.json(
      { error: "Failed to delete project image", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { images } = await req.json();

    if (!images || !Array.isArray(images)) {
      return NextResponse.json(
        { error: "Missing or invalid images array" },
        { status: 400 }
      );
    }

    // Update order for all images
    const updatePromises = images.map((image: { id: string; order: number }) =>
      prisma.projectImage.update({
        where: { id: image.id },
        data: { order: image.order },
      })
    );

    await Promise.all(updatePromises);

    // Return updated images
    const updatedImages = await prisma.projectImage.findMany({
      where: { projectId: id },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(updatedImages);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[ProjectImages PATCH] Error details:", {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      error: error,
    });
    return NextResponse.json(
      { error: "Failed to update project images order", details: errorMessage },
      { status: 500 }
    );
  }
}
