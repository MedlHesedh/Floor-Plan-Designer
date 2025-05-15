import React from 'react';
import { RoomType } from '../../types';
import * as Lucide from 'lucide-react';
import Button from '../UI/Button';

interface RoomTypeOption {
  type: RoomType;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface RoomSelectorProps {
  onSelectRoom: (type: RoomType) => void;
}

const roomTypes: RoomTypeOption[] = [
  { 
    type: 'bedroom', 
    label: 'Bedroom', 
    icon: <Lucide.Bed size={20} />, 
    color: 'bg-blue-100 border-blue-300' 
  },
  { 
    type: 'bathroom', 
    label: 'Bathroom', 
    icon: <Lucide.Bath size={20} />, 
    color: 'bg-green-100 border-green-300' 
  },
  { 
    type: 'kitchen', 
    label: 'Kitchen', 
    icon: <Lucide.ChefHat size={20} />, 
    color: 'bg-yellow-100 border-yellow-300' 
  },
  { 
    type: 'living', 
    label: 'Living Room', 
    icon: <Lucide.Sofa size={20} />, 
    color: 'bg-purple-100 border-purple-300' 
  },
  { 
    type: 'dining', 
    label: 'Dining Room', 
    icon: <Lucide.UtensilsCrossed size={20} />, 
    color: 'bg-pink-100 border-pink-300' 
  },
  { 
    type: 'office', 
    label: 'Office', 
    icon: <Lucide.Briefcase size={20} />, 
    color: 'bg-indigo-100 border-indigo-300' 
  }
];

export const getRoomColor = (type: RoomType): string => {
  const roomType = roomTypes.find(room => room.type === type);
  return roomType ? roomType.color : 'bg-gray-100 border-gray-300';
};

export const getRoomIcon = (type: RoomType): React.ReactNode => {
  const roomType = roomTypes.find(room => room.type === type);
  return roomType ? roomType.icon : null;
};

const RoomSelector: React.FC<RoomSelectorProps> = ({ onSelectRoom }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Add Rooms</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {roomTypes.map((room) => (
          <Button
            key={room.type}
            variant="outline"
            className={`flex flex-col items-center justify-center p-3 h-24 ${room.color}`}
            onClick={() => onSelectRoom(room.type)}
          >
            {room.icon}
            <span className="mt-2 text-sm">{room.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RoomSelector;