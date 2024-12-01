import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  FaCog,
  FaBold,
  FaItalic,
  FaUnderline,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

const Hero = () => {
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);

  const [showOptions, setShowOptions] = useState(false);
  const [textList, setTextList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const containerRef = useRef(null);

  const addText = () => {
    if (!inputText.trim()) return; // Prevent empty text
    const defaultY = textList.length * 60 + 20;
    const newTextList = [
      ...textList,
      {
        text: inputText,
        x: 20,
        y: defaultY,
        fontSize: fontSize,
        isBold: isBold,
        isItalic: isItalic,
        isUnderline: isUnderline,
        textAlign: "left",
      },
    ];
    setUndoStack([...undoStack, textList]);
    setRedoStack([]);
    setTextList(newTextList);
    setInputText("");
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const previousState = undoStack.pop();
    setRedoStack([textList, ...redoStack]);
    setTextList(previousState);
    setUndoStack([...undoStack]);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack.shift();
    setUndoStack([...undoStack, textList]);
    setTextList(nextState);
    setRedoStack([...redoStack]);
  };

  const handleMouseDown = (index) => (e) => {
    setSelectedTextIndex(index);

    const startX = e.clientX;
    const startY = e.clientY;
    const textItem = textList[index];

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const newX = Math.max(
        0,
        Math.min(containerRect.width - 50, textItem.x + deltaX) // Ensure text stays within bounds
      );
      const newY = Math.max(
        0,
        Math.min(containerRect.height - 30, textItem.y + deltaY) // Ensure text stays within bounds
      );

      setTextList((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, x: newX, y: newY } : item
        )
      );
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleFontSizeIncrease = () => {
    setFontSize(fontSize + 2);
    setTextList((prevTextList) =>
      prevTextList.map((item) => ({
        ...item,
        fontSize: item.fontSize + 2,
      }))
    );
  };

  const handleFontSizeDecrease = () => {
    setFontSize(fontSize - 2);
    setTextList((prevTextList) =>
      prevTextList.map((item) => ({
        ...item,
        fontSize: item.fontSize - 2,
      }))
    );
  };

  const handleStyleChange = (type) => {
    if (selectedTextIndex === null) return; // No text selected

    const updatedTextList = [...textList];
    const selectedText = updatedTextList[selectedTextIndex];

    if (type === "bold") {
      selectedText.isBold = !selectedText.isBold;
    } else if (type === "italic") {
      selectedText.isItalic = !selectedText.isItalic;
    } else if (type === "underline") {
      selectedText.isUnderline = !selectedText.isUnderline;
    }

    setTextList(updatedTextList);
  };

  return (
    <div>
      <div className="pt-16 pb-8 mx-auto max-w-5xl px-4 sm:pt-24">
        <div className="text-center">
          <div className="text-5xl font-extrabold grid grid-flow-col gap-6 justify-center items-center bg-[#f8f6f6] m-auto mb-2 my-12 h-18 pb-2 pt-2 border border-1 border-zinc-300 border-opacity-30 rounded-md">
            <div className="flex flex-col items-center mt-8">
              <FontAwesomeIcon
                icon={faArrowRotateLeft}
                onClick={undo}
                className="cursor-pointer"
              />
              <button className="text-base font-medium mt-2" onClick={undo}>
                Undo
              </button>
            </div>
            <div className="flex flex-col items-center mt-8">
              <FontAwesomeIcon
                icon={faArrowRotateRight}
                onClick={redo}
                className="cursor-pointer"
              />
              <button className="text-base font-medium mt-2" onClick={redo}>
                Redo
              </button>
            </div>
          </div>

          <div
            ref={containerRef}
            className="canvas"
            style={{
              position: "relative",
              height: "300px",
              border: "1px solid black",
            }}
          >
            {textList.map((item, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  top: item.y,
                  left: item.x,
                  cursor: "move",

                  whiteSpace: "nowrap", // Prevents text from wrapping
                  // textAlign: item.textAlign, // Alignment applied here
                }}
                onMouseDown={handleMouseDown(index)}
              >
                <span
                  style={{
                    fontSize: `${item.fontSize}px`,
                    fontWeight: item.isBold ? "bold" : "normal",
                    fontStyle: item.isItalic ? "italic" : "normal",
                    textDecoration: item.isUnderline ? "underline" : "none",
                    display: "inline-block",
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center mx-auto bg-[#fffcfc] mt-1 px-4 pt-4 pb-4 border border-1 border-zinc-300 border-opacity-30 rounded-md max-w-5xl overflow-hidden">
            <div
              id="drag-box"
              className="bg-white p-4 border-2 border-dashed rounded-lg shadow-lg cursor-move"
            >
              <div className="flex items-center justify-between mb-4 space-x-20">
                <div className="flex items-center space-x-2">
                  <FaCog
                    className="text-gray-600 cursor-pointer"
                    onClick={() => setShowOptions(!showOptions)}
                  />
                  <span className="font-bold text-xl">Text Styles</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleFontSizeDecrease}
                    className="px-2 py-1 bg-gray-300 rounded-md text-gray-600 hover:bg-gray-400"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg">{fontSize}</span>
                  <button
                    onClick={handleFontSizeIncrease}
                    className="px-2 py-1 bg-gray-300 rounded-md text-gray-600 hover:bg-gray-400"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              {showOptions && (
                <div className="space-x-4 mb-4">
                  <button
                    onClick={() => handleStyleChange("bold")}
                    className={`text-gray-600 hover:text-black ${
                      isBold ? "text-black" : ""
                    }`}
                  >
                    <FaBold />
                  </button>
                  <button
                    onClick={() => handleStyleChange("italic")}
                    className={`text-gray-600 hover:text-black ${
                      isItalic ? "text-black" : ""
                    }`}
                  >
                    <FaItalic />
                  </button>
                  <button
                    onClick={() => handleStyleChange("underline")}
                    className={`text-gray-600 hover:text-black ${
                      isUnderline ? "text-black" : ""
                    }`}
                  >
                    <FaUnderline />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 max-w-md mx-auto sm:flex sm:flex-col sm:items-center md:mt-8">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text here"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addText}
              className="w-full text-white flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md bg-black hover:bg-black md:py-5 md:text-2xl md:px-10"
            >
              Add Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
