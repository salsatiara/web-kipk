"use client";

import { Fade as Hamburger } from "hamburger-react";
import { useState } from "react";

export default function Home() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between top-0 left-0 sticky bg-[#1684A7]">
        <Hamburger toggled={isOpen} toggle={setOpen} size={18} color="#000" />
        <p>hello</p>
        <p>word</p>
      </div>
      <div></div>
    </>
  );
}
