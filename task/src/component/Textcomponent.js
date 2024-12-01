import React, { useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FaCog, FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight, FaMinus, FaPlus } from 'react-icons/fa';


const Hero = () => {
   
        const [fontSize, setFontSize] = useState(16);
        const [isBold, setIsBold] = useState(false);
        const [isItalic, setIsItalic] = useState(false);
        const [isUnderline, setIsUnderline] = useState(false);
        const [textAlign, setTextAlign] = useState('left');
        const [showOptions, setShowOptions] = useState(false);
      
        const handleFontSizeIncrease = () => {
          if (fontSize < 100) setFontSize(fontSize + 2);
        };
      
        const handleFontSizeDecrease = () => {
          if (fontSize > 10) setFontSize(fontSize - 2);
        };
      
        const handleTextAlign = (align) => {
          setTextAlign(align);
        };
      
        const handleDragStart = (e) => {
          e.dataTransfer.setData('text/plain', '');
        };  


  const [textList, setTextList] = useState([]); // Store all text items
  const [inputText, setInputText] = useState(""); // Input field state
  const [undoStack, setUndoStack] = useState([]); // Stack for undo functionality
  const [redoStack, setRedoStack] = useState([]); // Stack for redo functionality

  // Add new text dynamically
  const addText = () => {
    if (!inputText.trim()) return; // Prevent empty text
    const defaultY = textList.length * 60 + 20; // Dynamically calculate Y position
    const newTextList = [...textList, { text: inputText, x: 20, y: defaultY }];
    setUndoStack([...undoStack, textList]); // Push current state to undo stack
    setRedoStack([]); // Clear redo stack on new action
    setTextList(newTextList); // Update state
    setInputText(""); // Clear input field
  };

  // Undo the last action
  const undo = () => {
    if (undoStack.length === 0) return; // No undo actions available
    const previousState = undoStack.pop(); // Get the last state from undo stack
    setRedoStack([textList, ...redoStack]); // Push current state to redo stack
    setTextList(previousState); // Restore previous state
    setUndoStack([...undoStack]); // Update undo stack
  };

  // Redo the last undone action
  const redo = () => {
    if (redoStack.length === 0) return; // No redo actions available
    const nextState = redoStack.shift(); // Get the last state from redo stack
    setUndoStack([...undoStack, textList]); // Push current state to undo stack
    setTextList(nextState); // Restore next state
    setRedoStack([...redoStack]); // Update redo stack
  };

  // Handle dragging logic
  const handleMouseDown = (index) => (e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const textItem = textList[index];

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      setTextList((prevTextList) =>
        prevTextList.map((item, i) =>
          i === index
            ? { ...item, x: textItem.x + deltaX, y: textItem.y + deltaY }
            : item
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

  return (
    <div>
      <div className="pt-16 pb-8 mx-auto max-w-5xl px-4 sm:pt-24">
        <div className="text-center">
          <div className="text-5xl font-extrabold grid grid-flow-col gap-6 justify-center items-center bg-[#f8f6f6] m-6 mb-2 mr-12 my-12 h-18  pb-2 pt-2 border border-1 border-zinc-300 border-opacity-30 rounded-md">
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

          <div className="w-full flex justify-center">
            <div
              className="flex flex-col items-center justify-start bg-[#030303] mt-1  m-6 mr-12 my-5 pb-5 border border-1 border-zinc-300 border-opacity-30 rounded-md relative overflow-hidden p-5"
              style={{ minHeight: `${Math.max(200, textList.length * 70)}px`, width: "900px" }}
            >
              {textList.map((item, index) => (
                <div
                  key={index}
                  className="absolute bg-transparent text-white text-3xl p-2 rounded shadow-lg cursor-move z-10"
                  style={{ top: item.y, left: item.x }}
                  onMouseDown={handleMouseDown(index)}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>
          {/* change font size and style */}
          <div className="flex flex-col items-center justify-start bg-[#fffcfc] mt-1  mr-12  pb-2  border border-1 border-zinc-300 border-opacity-30 rounded-md relative overflow-hidden p-2"  >
          <div
        id="drag-box"
        className="bg-white p-4 border-2 border-dashed rounded-lg shadow-lg cursor-move"
        draggable="true"
        onDragStart={handleDragStart}
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
              onClick={() => setIsBold(!isBold)}
              className="text-gray-600 hover:text-black"
            >
              <FaBold />
            </button>
            <button
              onClick={() => setIsItalic(!isItalic)}
              className="text-gray-600 hover:text-black"
            >
              <FaItalic />
            </button>
            <button
              onClick={() => setIsUnderline(!isUnderline)}
              className="text-gray-600 hover:text-black"
            >
              <FaUnderline />
            </button>
            <button
              onClick={() => handleTextAlign('left')}
              className="text-gray-600 hover:text-black"
            >
              <FaAlignLeft />
            </button>
            <button
              onClick={() => handleTextAlign('center')}
              className="text-gray-600 hover:text-black"
            >
              <FaAlignCenter />
            </button>
            <button
              onClick={() => handleTextAlign('right')}
              className="text-gray-600 hover:text-black"
            >
              <FaAlignRight />
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
