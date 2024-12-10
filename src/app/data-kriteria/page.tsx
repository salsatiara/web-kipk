"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BsCheck2,
  BsJournalText,
  BsPencilSquare,
  BsPlusLg,
  BsTrash3,
} from "react-icons/bs";
import Modal from "react-modal";

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
    kode: string;
    kriteria: string;
    rentang1: string;
    bobot1: number;
    rentang2: string;
    bobot2: number;
    rentang3: string;
    bobot3: number;
    rentang4: string;
    bobot4: number;
    rentang5: string;
    bobot5: number;
  }[];
};

export default function DataKriteria() {
  const [data, setData] = useState<Data>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [dataid, setDataId] = useState<number>(0);

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
    const response = await axios.get<Data>("/api/kriteria");
    setData(response.data);
  }

  async function handleDelete(id: number) {
    await axios.delete(`/api/kriteria/hapus`, {
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
      <div className="bg-white h-screen w-full text-black flex flex-col">
        <div className="flex flex-col">
          <div className="flex justify-between px-4 py-2 bg-[#E6E6E6] rounded">
            <div className="flex items-center">
              <BsJournalText size={24} color="#000" />
              <p className="ml-2">Data Kriteria</p>
            </div>
            <div className="flex items-center">
              <Link href="/form-kriteria?action=tambah">
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
                    Kode
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Kriteria
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Rentang Nilai
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Bobot
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((item, index) => (
                  <>
                    <tr>
                      <td
                        className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                        rowSpan={5}
                      >
                        {index + 1}
                      </td>
                      <td
                        className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                        rowSpan={5}
                      >
                        {item.kode}
                      </td>
                      <td
                        className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                        rowSpan={5}
                      >
                        {item.kriteria}
                      </td>
                      <td
                        className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                        rowSpan={1}
                      >
                        {item.rentang1}
                      </td>
                      <td
                        className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                        rowSpan={1}
                      >
                        {item.bobot1}
                      </td>
                      <td
                        className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                        rowSpan={5}
                      >
                        <div className="flex items-center">
                          <Link
                            href={`/form-kriteria?id=${item.id}&kode=${item.kode}&kriteria=${item.kriteria}&rentang1=${item.rentang1}&bobot1=${item.bobot1}&rentang2=${item.rentang2}&bobot2=${item.bobot2}&rentang3=${item.rentang3}&bobot3=${item.bobot3}&rentang4=${item.rentang4}&bobot4=${item.bobot4}&rentang5=${item.rentang5}&bobot5=${item.bobot5}&action=edit`}
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
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                        rowSpan={1}
                      >
                        {item.rentang2}
                      </td>
                      <td
                        className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                        rowSpan={1}
                      >
                        {item.bobot2}
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                        rowSpan={1}
                      >
                        {item.rentang3}
                      </td>
                      <td
                        className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                        rowSpan={1}
                      >
                        {item.bobot3}
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                        rowSpan={1}
                      >
                        {item.rentang4}
                      </td>
                      <td
                        className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                        rowSpan={1}
                      >
                        {item.bobot4}
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                        rowSpan={1}
                      >
                        {item.rentang5}
                      </td>
                      <td
                        className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                        rowSpan={1}
                      >
                        {item.bobot5}
                      </td>
                    </tr>
                  </>
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
