import { PrismaClient } from "@prisma/client";
import { request } from "http";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

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

    const data = await prisma.alternatif.create({
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

    return Response.json(
      {
        status: "Success",
        message: "Data found successfully",
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {}
}
