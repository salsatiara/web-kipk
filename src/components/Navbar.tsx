import axios from "axios";
import { Fade as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  BsBook,
  BsBoxArrowRight,
  BsJournalText,
  BsPersonCircle,
  BsPlusSlashMinus,
} from "react-icons/bs";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  async function logout() {
    try {
      await axios.delete("/api/auth/logout", { withCredentials: true });
      router.push("/login-student");
    } catch {
      router.push("/login-student");
    }
  }

  return (
    <>
      <div className="flex top-0 left-0 z-40 sticky bg-[#1684A7]">
        <Hamburger toggled={isOpen} toggle={setOpen} size={18} color="#000" />
        <div className="flex w-full justify-between items-center ml-4 mr-6 text-sm font-semibold">
          <Link className="text-black" href="/dashboard-admin">
            KIP-Kuliah
          </Link>
          <BsPersonCircle size={24} color="#000" />
        </div>
      </div>
      <div
        className={`flex flex-col w-1/3 min-w-[1/3] max-w-56 top-12 left-0 fixed z-30 bg-[#CFE4EB] text-black duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-60"
        }`}
      >
        <div className="px-6 py-4 text-sm flex items-center border-b border-[#A3A3A3]">
          <BsBook size={24} color="#000" />
          <Link className="ml-2" href="/data-calon-penerima">
            Data Calon Penerima
          </Link>
        </div>
        <div className="px-6 py-4 text-sm flex items-center border-b border-[#A3A3A3]">
          <BsJournalText size={24} color="#000" />
          <Link className="ml-2" href="/data-kriteria">
            Data Kriteria
          </Link>
        </div>
        <div className="px-6 py-4 text-sm flex items-center border-b border-[#A3A3A3]">
          <BsPlusSlashMinus
            className="border-[1.7px] rounded border-black p-1 stroke-[1px]"
            size={24}
            color="#000"
          />
          <Link href="/perhitungan-topsis" className="ml-2">
            Perhitungan
          </Link>
        </div>
        <div className="px-6 py-4 mt-10 ml-auto">
          <button onClick={logout}>
            <BsBoxArrowRight size={24} />
          </button>
        </div>
      </div>
    </>
  );
}
