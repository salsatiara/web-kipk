import { AuthContext } from "@/services/storage";
import axios from "axios";
import { Fade as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import {
  BsBook,
  BsBoxArrowRight,
  BsJournalText,
  BsPersonCircle,
  BsPlusSlashMinus,
} from "react-icons/bs";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  content: {
    width: "25%",
    height: "30%",
    margin: "auto",
    padding: "0rem",
    backgroundColor: "rgba(163, 163, 163, 0.8)",
    inset: "0",
    border: "0",
    borderRadius: "0.5rem",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
};

export default function Navbar() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [isOpen, setOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="w-full h-full flex flex-col bg-[#A3A3A3] justify-center items-center gap-10 bg-opacity-0">
          <p className="font-bold text-center w-5/6">
            Are you sure you want to get out of the system?
          </p>
          <div className="flex gap-12">
            <button
              className="bg-[#EB0707] text-white px-6 py-3 rounded-md"
              onClick={logout}
            >
              Yes
            </button>
            <button
              className="bg-[#F6EC72] text-black px-6 py-3 rounded-md"
              onClick={closeModal}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex top-0 left-0 z-40 sticky bg-[#1684A7]">
        <Hamburger toggled={isOpen} toggle={setOpen} size={18} color="#000" />
        <div className="flex w-full justify-between items-center ml-4 mr-6 text-sm font-semibold">
          <Link
            className="text-black"
            href={
              auth.role == "admin" ? "/dashboard-admin" : "/dashboard-mahasiswa"
            }
          >
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
        <div
          className={`px-6 py-4 text-sm items-center border-b border-[#A3A3A3] ${
            auth.role == "admin" ? "flex" : "hidden"
          }`}
        >
          <BsBook size={24} color="#000" />
          <Link className="ml-2" href="/data-calon-penerima">
            Data Calon Penerima
          </Link>
        </div>
        <div
          className={`px-6 py-4 text-sm items-center border-b border-[#A3A3A3] ${
            auth.role == "admin" ? "flex" : "hidden"
          }`}
        >
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
          <button
            onClick={() => {
              setOpen(false);
              openModal();
            }}
          >
            <BsBoxArrowRight size={24} />
          </button>
        </div>
      </div>
    </>
  );
}
