"use client";

import Navbar from "@/components/Navbar";
import listrikFormatter from "@/libs/listrikFormatter";
import nilaiFormatter from "@/libs/nilaiFormatter";
import penghasilanFormatter from "@/libs/penghasilanFormatter";
import rumahFormatter from "@/libs/rumahFormatter";
import tanggunganFormatter from "@/libs/tanggunganFormatter";
import { AuthContext } from "@/services/storage";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  BsBook,
  BsCheck2,
  BsPencilSquare,
  BsPlusLg,
  BsTrash3,
} from "react-icons/bs";
import Modal from "react-modal";
import jwt from "jsonwebtoken";

const option: {
  value: string;
  label: string;
}[] = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

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

type Data = {
  status: string;
  message: string;
  data: {
    id: number;
    nisn: string;
    nama: string;
    penghasilan: number;
    jmlTanggungan: number;
    nilai: number;
    rumah: number;
    listrik: number;
  }[];
};

interface PayloadToken {
  id: string;
  username: string;
  role: string;
  nisn: string;
  iat: number;
  exp: number;
}

export default function DataCalonPenerima() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [data, setData] = useState<Data>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [dataid, setDataId] = useState<number>(0);

  async function refreshToken() {
    try {
      const response = await axios.post(
        "/api/auth/token",
        {},
        { withCredentials: true }
      );
      auth.setToken(response.data.accessToken);
      const decoded =
        (jwt.decode(response.data.accessToken) as PayloadToken) || null;
      if (decoded) {
        auth.setId(decoded.id);
        auth.setUsername(decoded.username);
        auth.setRole(decoded.role);
        auth.setNisn(decoded.nisn);
        auth.setExpire(decoded.exp);
        if (decoded.role !== "admin") {
          router.push("/dashboard-mahasiswa");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        router.push("/login-admin");
      }
    }
  }

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openAlert = (id: number) => {
    setDataId(id);
    setAlertIsOpen(true);
  };
  const closeAlert = () => {
    setDataId(0);
    setAlertIsOpen(false);
  };

  async function fetchData() {
    const response = await axios.get<Data>("/api/alternatif");
    setData(response.data);
  }

  async function handleDelete(id: number) {
    await axios.delete(`/api/alternatif/hapus`, {
      data: {
        id: id,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    fetchData();
    closeAlert();
    openModal();
  }

  useEffect(() => {
    refreshToken();
    fetchData();
  }, []);

  return (
    <>
      <Modal
        isOpen={alertIsOpen}
        onRequestClose={closeAlert}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="w-full h-full flex flex-col bg-[#A3A3A3] justify-center items-center gap-10 bg-opacity-0">
          <p className="font-bold text-center w-5/6">
            Are u sure you want to delete this data? This action cannot be
            undone.
          </p>
          <div className="flex gap-12">
            <button
              className="bg-[#EB0707] text-white px-6 py-3 rounded-md"
              onClick={() => handleDelete(dataid)}
            >
              Yes
            </button>
            <button
              className="bg-[#F6EC72] text-black px-6 py-3 rounded-md"
              onClick={closeAlert}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="w-full h-full flex flex-col bg-[#A3A3A3] justify-center items-center bg-opacity-0">
          <div className="text-[#1684A7] bg-white rounded-full px-2 py-2 border border-[#1684A7] mb-6">
            <BsCheck2 className="text-5xl stroke-[0px]" />
          </div>
          <p className="font-bold text-center w-5/6 text-xl mb-3">Success!</p>
          <p className="font-bold text-center w-5/6 mb-2">
            Data successfully deleted
          </p>
          <button
            className="bg-[#1684A7] text-white px-6 py-2 rounded-md"
            onClick={closeModal}
          >
            OK
          </button>
        </div>
      </Modal>
      <Navbar />
      <div className="bg-white w-full text-black flex flex-col">
        <div className="flex flex-col">
          <div className="flex justify-between px-4 py-2 bg-[#E6E6E6] rounded">
            <div className="flex items-center">
              <BsBook size={24} color="#000" />
              <p className="ml-2">Data Calon Penerima</p>
            </div>
            <div className="flex items-center">
              <Link href="/form-mahasiswa?action=tambah">
                <BsPlusLg size={24} color="#000" />
              </Link>
            </div>
          </div>
          <div className="mx-8 my-4 flex justify-between">
            <div className="flex text-sm items-center">
              <p>Show</p>
              <select className="border border-black rounded mx-2">
                {option.map((opt) => (
                  <option
                    className="bg-white open:bg-white"
                    key={opt.value}
                    value={opt.value}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              <p>Entries</p>
            </div>
            <div className="flex text-sm">
              <p>Search:</p>
              <input
                type="text"
                placeholder="Search"
                className="border border-black rounded mx-2 w-32 px-1"
              />
            </div>
          </div>
          <div className="overflow-x-auto w-full flex">
            <table className="border mx-auto">
              <thead className="bg-[#1684A7]">
                <tr>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    No.
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    NISN
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Nama Siswa
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Penghasilan Orang Tua
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Jumlah Tanggungan Keluarga
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Nilai Rata-rata Raport
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Kondisi Rumah dan Aset
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Daya Listrik PLN
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {index + 1}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {item.nisn}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {item.nama}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {penghasilanFormatter(item.penghasilan)}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {tanggunganFormatter(item.jmlTanggungan)}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {nilaiFormatter(item.nilai)}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {rumahFormatter(item.rumah)}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {listrikFormatter(item.listrik)}
                    </td>
                    <td className="flex items-center border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      <Link
                        href={`/form-mahasiswa?id=${item.id}&nisn=${item.nisn}&nama=${item.nama}&penghasilan=${item.penghasilan}&tanggungan=${item.jmlTanggungan}&nilai=${item.nilai}&rumah=${item.rumah}&listrik=${item.listrik}&action=edit`}
                        className="bg-[#F6EC72] text-black px-2 py-1 rounded inline-block"
                      >
                        <BsPencilSquare size={14} />
                      </Link>
                      <button
                        className="bg-[#EB0707] text-black px-2 py-1 rounded"
                        onClick={() => openAlert(item.id)}
                      >
                        <BsTrash3 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mx-8 my-4 flex justify-between">
            <div className="flex">
              <p className="text-sm">Showing 1 to 5 of 5 entries</p>
            </div>
            <div className="flex border border-black rounded gap-2 px-2 items-center text-sm">
              <button>Previous</button>
              <p className="bg-[#09A599] px-2 my-1">1</p>
              <button>Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
