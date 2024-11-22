import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex w-full h-screen min-h-min bg-gray-100 text-black justify-center">
        <div className="flex flex-col lg:w-1/4 w-full bg-white my-20 mx-4 py-14 px-8 rounded drop-shadow">
          <Image
            src="/image.jpeg"
            width={100}
            height={100}
            alt="Logo UNJ"
            className="mx-auto"
          />
          <p className="text-xl font-black mt-4 mb-6 text-[#1684A7] text-center">
            KIP-KULIAH
          </p>
          <p className="text-sm font-semibold">Selamat datang!</p>
          <p className="text-xs mt-2">
            Silahkan log in untuk mengakses sistem.
          </p>
          <form className="mt-6 flex flex-col">
            <input
              className="bg-[#E6E6E6] w-full rounded px-3 py-2 text-xs"
              type="text"
              placeholder="Username"
            />
            <input
              className="bg-[#E6E6E6] w-full rounded px-3 py-2 text-xs mt-8"
              type="password"
              placeholder="Password"
            />
            <p className="text-[#09A599] text-xs text-right mt-2">
              Lupa password?
            </p>
            <button className="bg-[#09A599] w-full rounded text-white text-xs py-2 mt-4">
              Log in
            </button>
            <Link
              href="/login-student"
              className="text-[#09A599] text-xs text-center mt-4 mx-auto"
            >
              Switch to Student Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
