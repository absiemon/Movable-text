import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';

const TextOverlay = ({ text, position, onUpdateText, onDelete }) => {
  const [content, setContent] = useState(text);
  const [isFocus, setIsFocus] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef(null);
  const minX = -400;
  const minY =  0;


  const handleBlur = () => {
    setIsEditing(false);
    onUpdateText(content);
  };

  // This will help in selecting whole content of a particular text overlay on double clicking on it.
  const handleDoubleClick = () => {
    if (textRef.current) {
        const range = document.createRange();
        range.selectNodeContents(textRef.current);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
  };

  return (
    <Draggable 
        defaultPosition={position}
        bounds={{ left: minX, top: minY, right: 400, bottom: 420 }}
    >
      <div
        style={{
          position: 'absolute',
        }}
        onMouseEnter={()=> setIsFocus(true)}
        onMouseLeave={()=> setIsFocus(false)}
      >
        {isEditing ? <div
          contentEditable
          onBlur={handleBlur}
          suppressContentEditableWarning={true}
          className='p-1'
          class="text-4xl font-semibold outline-blue-600"
          ref={textRef}
          onDoubleClick={handleDoubleClick}
        >
          {content}
        </div>
        :
        <div 
            onClick={()=> setIsEditing(true)} 
            className='p-1'
            class="text-4xl font-semibold outline-blue-600 cursor-pointer"
        >
            {content}
          </div>
        }

        { isFocus && <button onClick={onDelete} className='bg-white rounded-sm p-1 mt-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="delete"><g fill="none" fill-rule="evenodd" stroke="#4A4A4A"><path d="M5.5 7.5V20A1.5 1.5 0 0 0 7 21.5h11a1.5 1.5 0 0 0 1.5-1.5V7.5h-14z"></path><path stroke-linecap="round" d="M8.5 10.41v8.18M12.5 10.41v8.18M16.5 10.41v8.18M9 4.333V3.244C9 2.557 9.627 2 10.4 2h4.2c.773 0 1.4.557 1.4 1.244v1.09"></path><rect width="18" height="3" x="3.5" y="4.5" rx="1.5"></rect></g></svg>
        </button>}
      </div>
    </Draggable>
  );
};

export default TextOverlay;
