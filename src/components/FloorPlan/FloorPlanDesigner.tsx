import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { Room as RoomType, RoomType as RoomTypeEnum } from '../../types';
import RoomSelector from './RoomSelector';
import Room from './Room';
import { calculateTotalArea } from '../../utils/calculations';
import { AreaChart, Plus, Trash2 } from 'lucide-react';
import Button from '../UI/Button';

const FloorPlanDesigner: React.FC = () => {
  const { projectData, addRoom, updateRoom, removeRoom, updateRoomPosition, addFloor, removeFloor } = useProject();
  const [draggedRoomId, setDraggedRoomId] = useState<string | null>(null);
  const [selectedFloorId, setSelectedFloorId] = useState<string>(projectData.floors[0].id);
  
  const totalArea = calculateTotalArea(projectData.rooms);
  const currentFloorRooms = projectData.rooms.filter(room => room.floorId === selectedFloorId);
  
  const handleAddRoom = (type: RoomTypeEnum) => {
    const roomCount = projectData.rooms.filter(room => room.type === type).length + 1;
    const newRoom: RoomType = {
      id: `room-${Date.now()}`,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${roomCount}`,
      width: 3,
      length: 4,
      position: {
        x: Math.random() * 100 + 20,
        y: Math.random() * 100 + 20,
      },
      floorId: selectedFloorId,
    };
    addRoom(newRoom);
  };
  
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedRoomId(id);
    e.dataTransfer.setData('text/plain', id);
    
    const room = projectData.rooms.find(r => r.id === id);
    if (room) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      e.dataTransfer.setData('application/json', JSON.stringify({ offsetX, offsetY }));
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const offset = JSON.parse(e.dataTransfer.getData('application/json') || '{"offsetX":0,"offsetY":0}');
    
    const floorPlanRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - floorPlanRect.left - offset.offsetX;
    const y = e.clientY - floorPlanRect.top - offset.offsetY;
    
    updateRoomPosition(id, x, y);
    setDraggedRoomId(null);
  };

  const handleAddFloor = () => {
    addFloor();
  };

  const handleRemoveFloor = (id: string) => {
    if (projectData.floors.length > 1) {
      removeFloor(id);
      setSelectedFloorId(projectData.floors[0].id);
    }
  };
  
  return (
    <div className="w-full pb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Floor Plan Designer</h2>
        <div className="flex items-center px-4 py-2 bg-blue-50 rounded-lg">
          <AreaChart className="text-blue-500 mr-2" size={20} />
          <span className="text-blue-800 font-medium">Total Area: {totalArea.toFixed(1)} m²</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 flex gap-2 overflow-x-auto p-2">
          {projectData.floors.map((floor) => (
            <button
              key={floor.id}
              onClick={() => setSelectedFloorId(floor.id)}
              className={`
                px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                ${selectedFloorId === floor.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
            >
              <span>{floor.name}</span>
              {projectData.floors.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFloor(floor.id);
                  }}
                  className="hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddFloor}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Floor
        </Button>
      </div>
      
      <RoomSelector onSelectRoom={handleAddRoom} />
      
      <div 
        className="w-full bg-white border-2 border-dashed border-gray-300 rounded-lg shadow-md relative"
        style={{ height: '600px', overflow: 'hidden' }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {currentFloorRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>Drag and drop rooms to create your floor plan</p>
            <p className="text-sm mt-2">Select a room type from above to begin</p>
          </div>
        ) : (
          currentFloorRooms.map((room) => (
            <Room
              key={room.id}
              room={room}
              onUpdate={updateRoom}
              onRemove={removeRoom}
              onDragStart={handleDragStart}
              isDragging={draggedRoomId === room.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FloorPlanDesigner;