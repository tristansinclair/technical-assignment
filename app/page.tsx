"use client";
import clsx from "clsx";
import { useState } from "react";

export default function Home() {
  const [cleared, setCleared] = useState(true);
  const [screenValue, setScreenValue] = useState(0);
  const [activeOperation, setActiveOperation] = useState("");

  const [previousValue, setPreviousValue] = useState(0);

  const handleClick = (buttonValue: string | number) => {
    if (!isNaN(Number(buttonValue))) {
      handleNumberClick(Number(buttonValue));
    } else {
      handleOperationClick(buttonValue as string);
    }
  };

  const handleNumberClick = (number: number) => {
    console.log(`Number ${number} clicked`);

    setCleared(false);
    const length = screenValue.toString().length;

    if (length < 9) {
      if (screenValue === 0) {
        setScreenValue(number);
      } else {
        setScreenValue(screenValue * 10 + number);
      }
    }
  };

  const handleOperationClick = (operation: string) => {
    console.log(`Operation ${operation} clicked`);

    let result = 0;

    switch (operation) {
      case "AC":
        setScreenValue(0);
        setPreviousValue(0);
        setActiveOperation("");
        setCleared(true);
        break;
      case "C":
        setScreenValue(0);
        setCleared(true);
        break;
      case "+/-":
        setScreenValue(screenValue * -1);
        break;
      case "%":
        setScreenValue(screenValue / 100);
        break;
      case "÷":
      case "x":
      case "-":
      case "+":
        setPreviousValue(screenValue);
        setScreenValue(0);
        setActiveOperation(operation);
        break;
      case "=":
        if (activeOperation && previousValue !== null) {
          switch (activeOperation) {
            case "+":
              result = previousValue + screenValue;
              break;
            case "-":
              result = previousValue - screenValue;
              break;
            case "x":
              result = previousValue * screenValue;
              break;
            case "÷":
              result = previousValue / screenValue;
              if (screenValue === 0) {
                console.error("Division by zero");
                // TODO: handle division by zero appropriately
                return;
              }
              break;
          }
          setScreenValue(result);
          setPreviousValue(0);
          setActiveOperation("");
        }
        break;
      default:
        console.log("Unknown operation");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-950">
      <div className="grid grid-cols-4 grid-rows-6 gap-6 mt-20">
        <div className="flex place-items-center justify-end col-span-4 text-end text-white text-6xl">
          {screenValue.toLocaleString()}
        </div>
        <Button
          value={cleared ? "AC" : "C"}
          color="gray"
          handleClick={handleClick}
        />
        <Button value="+/-" color="gray" handleClick={handleClick} />
        <Button value="%" color="gray" handleClick={handleClick} />
        <Button
          value="÷"
          color="orange"
          isActive={activeOperation == "÷"}
          handleClick={handleClick}
        />
        <Button value="7" handleClick={handleClick} />
        <Button value="8" handleClick={handleClick} />
        <Button value="9" handleClick={handleClick} />
        <Button
          value="x"
          color="orange"
          isActive={activeOperation == "x"}
          handleClick={handleClick}
        />
        <Button value="4" handleClick={handleClick} />
        <Button value="5" handleClick={handleClick} />
        <Button value="6" handleClick={handleClick} />
        <Button
          value="-"
          color="orange"
          isActive={activeOperation == "-"}
          handleClick={handleClick}
        />
        <Button value="1" handleClick={handleClick} />
        <Button value="2" handleClick={handleClick} />
        <Button value="3" handleClick={handleClick} />
        <Button
          value="+"
          color="orange"
          isActive={activeOperation == "+"}
          handleClick={handleClick}
        />
        <Button value="0" isZero={true} handleClick={handleClick} />
        <Button value="." handleClick={handleClick} />
        <Button value="=" color="orange" handleClick={handleClick} />
      </div>
    </main>
  );
}

interface ButtonProps {
  value: string;
  color?: string;
  isZero?: boolean;
  isActive?: boolean;
  handleClick: (buttonValue: string | number) => void;
}

function Button({ value, color, isZero, isActive, handleClick }: ButtonProps) {
  let baseStyle = "flex items-center text-xl rounded-full";
  let colorStyle = "";

  if (color === "gray") {
    colorStyle = "bg-gray-400 text-gray-900 hover:bg-gray-500";
  } else if (color === "orange") {
    colorStyle = "bg-orange-500 text-3xl text-white hover:bg-orange-600";
  } else {
    colorStyle = "bg-gray-700 text-gray-100 hover:bg-gray-800";
  }

  const extraStyle = isZero ? "col-span-2 pl-9" : "justify-center h-20 w-20";
  const activeStyle = isActive
    ? "bg-white text-orange-500 hover:bg-orange-100"
    : "";

  const finalStyle = clsx(baseStyle, colorStyle, extraStyle, activeStyle);

  return (
    <button onClick={() => handleClick(value)} className={finalStyle}>
      {value}
    </button>
  );
}
