import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const id: FormDataEntryValue = (formData.get("id") as string) || "";
    const kode: FormDataEntryValue = (formData.get("kode") as string) || "";
    const kriteria: FormDataEntryValue =
      (formData.get("kriteria") as string) || "";
    const tipe: FormDataEntryValue = (formData.get("tipe") as string) || "";
    const bobot: FormDataEntryValue = (formData.get("bobot") as string) || "";
    const rentang1: FormDataEntryValue =
      (formData.get("rentang1") as string) || "";
    const bobot1: FormDataEntryValue = (formData.get("bobot1") as string) || "";
    const rentang2: FormDataEntryValue =
      (formData.get("rentang2") as string) || "";
    const bobot2: FormDataEntryValue = (formData.get("bobot2") as string) || "";
    const rentang3: FormDataEntryValue =
      (formData.get("rentang3") as string) || "";
    const bobot3: FormDataEntryValue = (formData.get("bobot3") as string) || "";
    const rentang4: FormDataEntryValue =
      (formData.get("rentang4") as string) || "";
    const bobot4: FormDataEntryValue = (formData.get("bobot4") as string) || "";
    const rentang5: FormDataEntryValue =
      (formData.get("rentang5") as string) || "";
    const bobot5: FormDataEntryValue = (formData.get("bobot5") as string) || "";

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
    if (kode === null || kode === "") {
      return Response.json(
        {
          status: "error",
          message: "kode cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (kriteria === null || kriteria === "") {
      return Response.json(
        {
          status: "error",
          message: "kriteria cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (tipe === null || tipe === "") {
      return Response.json(
        {
          status: "error",
          message: "tipe cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (bobot === null || bobot === "") {
      return Response.json(
        {
          status: "error",
          message: "bobot cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (rentang1 === null || rentang1 === "") {
      return Response.json(
        {
          status: "error",
          message: "rentang 1 cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (bobot1 === null || bobot1 === "") {
      return Response.json(
        {
          status: "error",
          message: "bobot 1 cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (rentang2 === null || rentang2 === "") {
      return Response.json(
        {
          status: "error",
          message: "rentang 2 cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (bobot2 === null || bobot2 === "") {
      return Response.json(
        {
          status: "error",
          message: "bobot 2 cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (rentang3 === null || rentang3 === "") {
      return Response.json(
        {
          status: "error",
          message: "rentang 3 cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (bobot3 === null || bobot3 === "") {
      return Response.json(
        {
          status: "error",
          message: "bobot 3 cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (rentang4 === null || rentang4 === "") {
      return Response.json(
        {
          status: "error",
          message: "rentang 4 cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (bobot4 === null || bobot4 === "") {
      return Response.json(
        {
          status: "error",
          message: "bobot4 cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (rentang5 === null || rentang5 === "") {
      return Response.json(
        {
          status: "error",
          message: "rentang 5 cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (bobot5 === null || bobot5 === "") {
      return Response.json(
        {
          status: "error",
          message: "bobot 5 cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    const old = await prisma.kriteria.findMany({
      where: {
        kode: kode,
      },
    });

    if (old.length > 0 && old[0].kode !== kode && old[0].id !== parseInt(id)) {
      return Response.json(
        {
          status: "error",
          message: "kode already exists",
        },
        {
          status: 400,
        }
      );
    }

    const data = await prisma.kriteria.update({
      where: {
        id: parseInt(id),
      },
      data: {
        kode: kode,
        kriteria: kriteria,
        tipe: tipe,
        bobot: parseFloat(bobot),
        rentang1: rentang1,
        bobot1: parseInt(bobot1),
        rentang2: rentang2,
        bobot2: parseInt(bobot2),
        rentang3: rentang3,
        bobot3: parseInt(bobot3),
        rentang4: rentang4,
        bobot4: parseInt(bobot4),
        rentang5: rentang5,
        bobot5: parseInt(bobot5),
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
