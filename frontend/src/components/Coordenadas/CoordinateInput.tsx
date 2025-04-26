import React, { JSX, useState } from "react";

export default function CoordinateInput(): JSX.Element {
  const [norte, setNorte] = useState<string>("-5.5613");
  const [sul, setSul] = useState<string>("-14.8722");
  const [oeste, setOeste] = useState<string>("-65.7016");
  const [leste, setLeste] = useState<string>("-49.3409");

  return (
    <div className="flex flex-col items-center space-y-4">
      <br />
      <div className="font-semibold text-sm uppercase"></div>

      <div className="relative w-64 h-64 border rounded-md bg-gray-100 shadow-inner">
        {/* Norte */}
        <input
          type="text"
          value={norte}
          onChange={(e) => setNorte(e.target.value)}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 text-center border rounded p-1 shadow bg-white"
        />
        <label className="text-sm font-medium"> Norte </label>
        {/* Sul */}
        <input
          type="text"
          value={sul}
          onChange={(e) => setSul(e.target.value)}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 text-center border rounded p-1 shadow bg-white"
        />
        <label className="text-sm font-medium"> Sul </label>

                {/* Leste */}
                <input
          type="text"
          value={leste}
          onChange={(e) => setLeste(e.target.value)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-24 text-center border rounded p-1 shadow bg-white"
        />{" "}
        <label className="text-sm font-medium"> Leste </label>

        {/* Oeste */}
        <input
          type="text"
          value={oeste}
          onChange={(e) => setOeste(e.target.value)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-24 text-center border rounded p-1 shadow bg-white"
        />
        <label className="text-sm font-medium"> Oeste </label>
      </div>
    </div>
  );
}
