import prisma from "@/lib/prisma";

export async function PUT({
  params,
  request,
}: {
  params: Promise<{ id: string }>;
  request: Request;
}) {
  const { id } = await params;
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

export async function DELETE({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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
