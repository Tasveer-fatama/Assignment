import React, { useState } from 'react';
import { FaCog, FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight, FaMinus, FaPlus } from 'react-icons/fa';

const ChangeFont= () => {
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

  return (
    <div className="container p-8 w-full max-w-2xl">
      <div
        id="drag-box"
        className="bg-white p-4 border-2 border-dashed rounded-lg shadow-lg cursor-move"
        draggable="true"
        onDragStart={handleDragStart}
      >
        <div className="flex items-center justify-between mb-4">
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
            <span className="text-lg">{fontSize}px</span>
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

        {/* <div
          id="text-box"
          className="mt-4 p-6 bg-gray-100 rounded-lg text-black"
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: isBold ? 'bold' : 'normal',
            fontStyle: isItalic ? 'italic' : 'normal',
            textDecoration: isUnderline ? 'underline' : 'none',
            textAlign: textAlign,
          }}
        >
          This is sample text. Adjust the settings to see changes.
        </div> */}
      </div>
    </div>
  );
};

export default ChangeFont;
