import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();

  try {
    const update = await prisma.ustadzh.update({
      where: { id },
      data: {
        ...body,
      },
    });

    return Response.json(
      {
        message: "Ustadz updated successfully",
        data: update,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error updating ustadz with id ${id}:`, error);
    return Response.json(
      {
        message: "Failed to update ustadz",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await prisma.ustadzh.delete({
      where: { id },
    });

    return Response.json(
      {
        message: "Ustadz deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting ustadz with id ${id}:`, error);
    return Response.json(
      {
        message: "Failed to delete ustadz",
      },
      { status: 500 }
    );
  }
}
