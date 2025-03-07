import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const id: FormDataEntryValue = (formData.get("id") as string) || "";
    const nama: FormDataEntryValue = (formData.get("nama") as string) || "";
    const nisn: FormDataEntryValue = (formData.get("nisn") as string) || "";
    const penghasilan: FormDataEntryValue =
      (formData.get("penghasilan") as string) || "";
    const jmlTanggungan: FormDataEntryValue =
      (formData.get("jmlTanggungan") as string) || "";
    const nilai: FormDataEntryValue = (formData.get("nilai") as string) || "";
    const rumah: FormDataEntryValue = (formData.get("rumah") as string) || "";
    const listrik: FormDataEntryValue =
      (formData.get("listrik") as string) || "";

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
    if (nama === null || nama === "") {
      return Response.json(
        {
          status: "error",
          message: "nama cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (nisn === null || nisn === "") {
      return Response.json(
        {
          status: "error",
          message: "nisn cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (penghasilan === null || penghasilan === "") {
      return Response.json(
        {
          status: "error",
          message: "penghasilan cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (jmlTanggungan === null || jmlTanggungan === "") {
      return Response.json(
        {
          status: "error",
          message: "jmlTanggungan cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (nilai === null || nilai === "") {
      return Response.json(
        {
          status: "error",
          message: "nilai cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (rumah === null || rumah === "") {
      return Response.json(
        {
          status: "error",
          message: "rumah cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (listrik === null || listrik === "") {
      return Response.json(
        {
          status: "error",
          message: "listrik cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    const old = await prisma.alternatif.findMany({
      where: {
        nisn: nisn,
      },
    });

    if (old.length > 0 && old[0].nisn !== nisn && old[0].id !== parseInt(id)) {
      return Response.json(
        {
          status: "error",
          message: "nisn already exists",
        },
        {
          status: 400,
        }
      );
    }

    const data = await prisma.alternatif.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nama: nama,
        nisn: nisn,
        penghasilan: parseInt(penghasilan),
        jmlTanggungan: parseInt(jmlTanggungan),
        nilai: parseInt(nilai),
        rumah: parseInt(rumah),
        listrik: parseInt(listrik),
      },
    });

    await prisma.aktivitas.create({
      data: {
        pesan: `Pembaruan data mahasiswa dengan NISN ${data.nisn}`,
      },
    });

    return Response.json(
      {
        status: "Success",
        message: "Data has been updated",
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
