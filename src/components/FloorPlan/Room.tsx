import React, { useState } from 'react';
import { Room as RoomType } from '../../types';
import { getRoomColor, getRoomIcon } from './RoomSelector';
import { Trash2 } from 'lucide-react';
import { calculateArea } from '../../utils/calculations';

interface RoomProps {
  room: RoomType;
  onUpdate: (id: string, room: Partial<RoomType>) => void;
  onRemove: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  isDragging: boolean;
}

const Room: React.FC<RoomProps> = ({
  room,
  onUpdate,
  onRemove,
  onDragStart,
  isDragging,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const color = getRoomColor(room.type);
  const icon = getRoomIcon(room.type);
  const area = calculateArea(room.width, room.length);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(e.target.value);
    if (!isNaN(width) && width > 0) {
      onUpdate(room.id, { width });
    }
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const length = parseInt(e.target.value);
    if (!isNaN(length) && length > 0) {
      onUpdate(room.id, { length });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(room.id, { name: e.target.value });
  };

  return (
    <div
      className={`
        ${color} border-2 p-3 rounded-lg shadow-sm absolute cursor-move transition-all
        ${isDragging ? 'opacity-50 z-10' : 'opacity-100'}
      `}
      style={{
        width: `${Math.max(120, room.width * 20)}px`,
        height: `${Math.max(100, room.length * 20)}px`,
        left: `${room.position.x}px`,
        top: `${room.position.y}px`,
      }}
      draggable
      onDragStart={(e) => onDragStart(e, room.id)}
      onClick={() => setIsEditing(true)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1 mb-2">
          {icon}
          {isEditing ? (
            <input
              type="text"
              value={room.name}
              onChange={handleNameChange}
              className="p-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              onBlur={() => setIsEditing(false)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <h4 className="font-medium text-gray-800">{room.name}</h4>
          )}
        </div>
        <button 
          className="text-gray-500 hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(room.id);
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="flex flex-col mt-auto">
        <div className="flex items-center mt-2 text-sm">
          <span className="mr-1">W:</span>
          <input
            type="number"
            min="1"
            step="1"
            value={Math.round(room.width)}
            onChange={handleWidthChange}
            className="w-16 p-1 text-xs border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="ml-1">m</span>
        </div>
        
        <div className="flex items-center mt-1 text-sm">
          <span className="mr-1">L:</span>
          <input
            type="number"
            min="1"
            step="1"
            value={Math.round(room.length)}
            onChange={handleLengthChange}
            className="w-16 p-1 text-xs border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="ml-1">m</span>
        </div>
        
        <div className="mt-2 text-xs font-medium text-gray-700">
          Area: {area.toFixed(1)} m²
        </div>
      </div>
    </div>
  );
};

export default Room;