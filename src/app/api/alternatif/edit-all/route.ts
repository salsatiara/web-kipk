import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Alternatif = {
  id: number;
  nisn: string;
  nama: string;
  penghasilan: number;
  jmlTanggungan: number;
  nilai: number;
  rumah: number;
  listrik: number;
  jarakPositif: number;
  jarakNegatif: number;
  preferensi: number;
}[];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const alternatif: FormDataEntryValue =
      (formData.get("alternatif") as string) || "[]";

    if (alternatif === null || alternatif === "") {
      return Response.json(
        {
          status: "error",
          message: "alternatif cannot be empty",
        },
        {
          status: 400,
        }
      );
    }

    const matriks: Alternatif = JSON.parse(alternatif);

    const data = await prisma.$transaction(
      matriks.map((matrik) =>
        prisma.alternatif.update({
          where: {
            id: matrik.id,
          },
          data: {
            nisn: matrik.nisn,
            nama: matrik.nama,
            penghasilan: matrik.penghasilan,
            jmlTanggungan: matrik.jmlTanggungan,
            nilai: matrik.nilai,
            rumah: matrik.rumah,
            listrik: matrik.listrik,
            jarakPositif: matrik.jarakPositif,
            jarakNegatif: matrik.jarakNegatif,
            preferensi: matrik.preferensi,
          },
        })
      )
    );

    await prisma.aktivitas.create({
      data: {
        pesan: `Perhitungan batch selesai`,
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
