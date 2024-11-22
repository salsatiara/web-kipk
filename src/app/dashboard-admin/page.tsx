"use client";

import { Fade as Hamburger } from "hamburger-react";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";

export default function Home() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="flex top-0 left-0 sticky bg-[#1684A7]">
        <Hamburger toggled={isOpen} toggle={setOpen} size={18} color="#000" />
        <div className="flex w-full justify-between items-center ml-4 mr-6 text-sm font-semibold"> 
          <p className="text-black">KIP-Kuliah</p>
          <BsPersonCircle size={24} color="#000"/>
        </div>
      </div>
      <div></div>
    </>
  );
}
