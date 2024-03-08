"use client";
import { useState } from "react";

export default function Home() {
  const [cleared, setCleared] = useState(true);
  const [value, setValue] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-950">
      <div className="grid grid-cols-4 grid-rows-6 gap-6 mt-20">
        <div className="flex place-items-center justify-end col-span-4 text-end text-white text-7xl">
          123,456,789
        </div>
        <Button value={cleared ? "AC" : "C"} color="gray" />
        <Button value="+/-" color="gray" />
        <Button value="%" color="gray" />
        <Button value="÷" color="orange" />
        <Button value="7" />
        <Button value="8" />
        <Button value="9" />
        <Button value="x" color="orange" />
        <Button value="4" />
        <Button value="5" />
        <Button value="6" />
        <Button value="-" color="orange" />
        <Button value="1" />
        <Button value="2" />
        <Button value="3" />
        <Button value="+" color="orange" />
        <Button value="0" isZero={true} />

        <Button value="." />
        <Button value="=" color="orange" />
      </div>
    </main>
  );
}

interface ButtonProps {
  value: string;
  color?: string;
  isZero?: boolean;
}

function Button({ value, color, isZero }: ButtonProps) {
  let baseStyle = "flex items-center text-xl rounded-full";
  let colorStyle = "";

  if (color === "gray") {
    colorStyle = "bg-gray-400 text-gray-900";
  } else if (color === "orange") {
    colorStyle = "bg-orange-500 text-3xl text-white";
  } else {
    colorStyle = "bg-gray-700 text-gray-100";
  }

  const extraStyle = isZero ? "col-span-2 pl-9" : "justify-center h-20 w-20";

  const finalStyle = `${baseStyle} ${colorStyle} ${extraStyle}`;

  return <button className={finalStyle}>{value}</button>;
}
