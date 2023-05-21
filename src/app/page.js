"use client";
import { useState } from "react";
import Image from "next/image";

function HomePage() {
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/upload", {
        method: "POST",
        body: data,
      });
      console.log(res);

      if (res.ok) {
        console.log("Archivo subido.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files?.[0]);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-zinc-950 p-5">
        <h1 className="text-4xl text-center my-4 text-white">Subir archivo</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            className="bg-zinc-900 text-zinc-100 p-2 rounded block mb-2"
            onChange={handleFileChange}
          />

          <button
            className="bg-green-900 text-zinc-100 p-2 rounded block w-full disabled:opacity-50"
            disabled={!file}
          >
            Subir
          </button>
        </form>
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            alt="Uploaded file"
            className="w-64 h-64 object-contain mx-auto"
            width={256}
            height={256}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;