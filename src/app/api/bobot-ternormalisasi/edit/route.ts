import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type MatriksBobotTernormalisasi = {
  id: number;
  nisn: string;
  nama: string;
  penghasilan: number;
  jmlTanggungan: number;
  nilai: number;
  rumah: number;
  listrik: number;
}[];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const bobotTernomalisasi: FormDataEntryValue =
      (formData.get("bobotTernormalisasi") as string) || "[]";

    if (bobotTernomalisasi === null || bobotTernomalisasi === "") {
      return Response.json(
        {
          status: "error",
          message: "bobotTernormalisasi cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    const matriks: MatriksBobotTernormalisasi = JSON.parse(bobotTernomalisasi);

    await prisma.matriks.deleteMany({});

    const data = await prisma.matriks.createMany({
      data: matriks.map((matrik) => ({
        nisn: matrik.nisn,
        nama: matrik.nama,
        penghasilan: matrik.penghasilan,
        jmlTanggungan: matrik.jmlTanggungan,
        nilai: matrik.nilai,
        rumah: matrik.rumah,
        listrik: matrik.listrik,
      })),
    });

    await prisma.aktivitas.create({
      data: {
        pesan: `Perhitungan bobot ternormalisasi selesai`,
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
