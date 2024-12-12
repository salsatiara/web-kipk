import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const formData = await request.formData();

    const id: FormDataEntryValue = (formData.get("id") as string) || "";

    if (id === null || id === "") {
      return Response.json(
        {
          status: "error",
          message: "id cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    const data = await prisma.kriteria.delete({
      where: {
        id: parseInt(id),
      },
    });

    await prisma.aktivitas.create({
      data: {
        pesan: `Menghapus data kriteria dengan kode ${data.kode}`,
      },
    });

    return Response.json(
      {
        status: "Success",
        message: `Alternatif with id ${id} has been deleted`,
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({
        status: "Error",
        error: error.message,
      });
    }
  }
}
