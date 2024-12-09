import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import validator from "validator";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const username: FormDataEntryValue =
      (formData.get("username") as string) || "";
    const nisn: FormDataEntryValue = (formData.get("nisn") as string) || "";
    const password: FormDataEntryValue =
      (formData.get("password") as string) || "";
    const confirmPassword: FormDataEntryValue =
      (formData.get("confirmPassword") as string) || "";

    const hash = await bcrypt.hash(password, 10);

    if (username === null || username === "") {
      return Response.json(
        {
          status: "error",
          message: "username cannot be empty",
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
    if (password === null || password === "") {
      return Response.json(
        {
          status: "error",
          message: "password cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (confirmPassword === null || confirmPassword === "") {
      return Response.json(
        {
          status: "error",
          message: "confirmPassword cannot be empty",
        },
        {
          status: 400,
        }
      );
    }
    if (password !== confirmPassword) {
      return Response.json(
        {
          status: "error",
          message: "password and confirmPassword must be the same",
        },
        {
          status: 400,
        }
      );
    }
    if (password.length < 8) {
      return Response.json(
        {
          status: "error",
          message: "password must be at least 8 characters",
        },
        {
          status: 400,
        }
      );
    }

    const duplicatedUsername = await prisma.user.findMany({
      where: {
        username: username,
      },
    });
    const duplicatedNisn = await prisma.user.findMany({
      where: {
        nisn: nisn,
      },
    });

    if (duplicatedUsername.length > 0) {
      return Response.json(
        {
          status: "error",
          message: "username already exists",
        },
        {
          status: 400,
        }
      );
    }
    if (duplicatedNisn.length > 0) {
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
    if (!validator.isAlphanumeric(username)) {
      return Response.json(
        {
          status: "error",
          message: "username must be alphanumeric",
        },
        {
          status: 400,
        }
      );
    }

    const data = await prisma.user.create({
      data: {
        username: username,
        nisn: nisn,
        password: hash,
        role: "mahasiswa",
      },
    });

    return Response.json(
      {
        status: "Success",
        message: "User created successfully",
        data: data,
      },
      {
        status: 201,
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
