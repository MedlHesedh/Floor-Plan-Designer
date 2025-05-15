import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Room, RoomType, Material, Labor, ClientInfo, ProjectData, Floor } from '../types';
import { calculateMaterialsFromRooms } from '../utils/calculations';

interface ProjectContextType {
  projectData: ProjectData;
  addFloor: () => void;
  removeFloor: (id: string) => void;
  addRoom: (room: Room) => void;
  updateRoom: (id: string, room: Partial<Room>) => void;
  removeRoom: (id: string) => void;
  updateRoomPosition: (id: string, x: number, y: number) => void;
  updateMaterial: (id: string, material: Partial<Material>) => void;
  addMaterial: (material: Material) => void;
  removeMaterial: (id: string) => void;
  updateLabor: (id: string, labor: Partial<Labor>) => void;
  addLabor: (labor: Labor) => void;
  removeLabor: (id: string) => void;
  updateClientInfo: (info: Partial<ClientInfo>) => void;
  updateTax: (tax: number) => void;
  updateDiscount: (discount: number) => void;
  updateDueDate: (date: string) => void;
  refreshMaterialEstimates: () => void;
}

const defaultClientInfo: ClientInfo = {
  name: '',
  address: '',
  email: '',
  phone: '',
};

const defaultProjectData: ProjectData = {
  floors: [
    { id: 'floor-1', name: 'Ground Floor', level: 0 }
  ],
  rooms: [],
  materials: [],
  labor: [],
  client: defaultClientInfo,
  tax: 10,
  discount: 0,
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projectData, setProjectData] = useState<ProjectData>(defaultProjectData);

  const addFloor = () => {
    setProjectData((prev) => {
      const newLevel = Math.max(...prev.floors.map(f => f.level)) + 1;
      const newFloor: Floor = {
        id: `floor-${Date.now()}`,
        name: `Floor ${newLevel}`,
        level: newLevel
      };
      return {
        ...prev,
        floors: [...prev.floors, newFloor]
      };
    });
  };

  const removeFloor = (id: string) => {
    setProjectData((prev) => {
      if (prev.floors.length <= 1) return prev; // Prevent removing last floor
      return {
        ...prev,
        floors: prev.floors.filter(f => f.id !== id),
        rooms: prev.rooms.filter(r => r.floorId !== id)
      };
    });
  };

  const addRoom = (room: Room) => {
    setProjectData((prev) => {
      const updatedRooms = [...prev.rooms, room];
      const updatedMaterials = calculateMaterialsFromRooms(updatedRooms);
      return {
        ...prev,
        rooms: updatedRooms,
        materials: updatedMaterials,
      };
    });
  };

  const updateRoom = (id: string, roomData: Partial<Room>) => {
    setProjectData((prev) => {
      const roomIndex = prev.rooms.findIndex((room) => room.id === id);
      if (roomIndex === -1) return prev;

      const updatedRooms = [...prev.rooms];
      updatedRooms[roomIndex] = { ...updatedRooms[roomIndex], ...roomData };
      
      const updatedMaterials = calculateMaterialsFromRooms(updatedRooms);
      
      return {
        ...prev,
        rooms: updatedRooms,
        materials: updatedMaterials,
      };
    });
  };

  const removeRoom = (id: string) => {
    setProjectData((prev) => {
      const updatedRooms = prev.rooms.filter((room) => room.id !== id);
      const updatedMaterials = calculateMaterialsFromRooms(updatedRooms);
      
      return {
        ...prev,
        rooms: updatedRooms,
        materials: updatedMaterials,
      };
    });
  };

  const updateRoomPosition = (id: string, x: number, y: number) => {
    setProjectData((prev) => {
      const roomIndex = prev.rooms.findIndex((room) => room.id === id);
      if (roomIndex === -1) return prev;

      const updatedRooms = [...prev.rooms];
      updatedRooms[roomIndex] = {
        ...updatedRooms[roomIndex],
        position: { x, y },
      };

      return {
        ...prev,
        rooms: updatedRooms,
      };
    });
  };

  const updateMaterial = (id: string, materialData: Partial<Material>) => {
    setProjectData((prev) => {
      const materialIndex = prev.materials.findIndex((material) => material.id === id);
      if (materialIndex === -1) return prev;

      const updatedMaterials = [...prev.materials];
      updatedMaterials[materialIndex] = {
        ...updatedMaterials[materialIndex],
        ...materialData,
      };

      return {
        ...prev,
        materials: updatedMaterials,
      };
    });
  };

  const addMaterial = (material: Material) => {
    setProjectData((prev) => ({
      ...prev,
      materials: [...prev.materials, material],
    }));
  };

  const removeMaterial = (id: string) => {
    setProjectData((prev) => ({
      ...prev,
      materials: prev.materials.filter((material) => material.id !== id),
    }));
  };

  const updateLabor = (id: string, laborData: Partial<Labor>) => {
    setProjectData((prev) => {
      const laborIndex = prev.labor.findIndex((labor) => labor.id === id);
      if (laborIndex === -1) return prev;

      const updatedLabor = [...prev.labor];
      updatedLabor[laborIndex] = {
        ...updatedLabor[laborIndex],
        ...laborData,
      };

      return {
        ...prev,
        labor: updatedLabor,
      };
    });
  };

  const addLabor = (labor: Labor) => {
    setProjectData((prev) => ({
      ...prev,
      labor: [...prev.labor, labor],
    }));
  };

  const removeLabor = (id: string) => {
    setProjectData((prev) => ({
      ...prev,
      labor: prev.labor.filter((labor) => labor.id !== id),
    }));
  };

  const updateClientInfo = (info: Partial<ClientInfo>) => {
    setProjectData((prev) => ({
      ...prev,
      client: { ...prev.client, ...info },
    }));
  };

  const updateTax = (tax: number) => {
    setProjectData((prev) => ({
      ...prev,
      tax,
    }));
  };

  const updateDiscount = (discount: number) => {
    setProjectData((prev) => ({
      ...prev,
      discount,
    }));
  };

  const updateDueDate = (date: string) => {
    setProjectData((prev) => ({
      ...prev,
      dueDate: date,
    }));
  };

  const refreshMaterialEstimates = () => {
    setProjectData((prev) => {
      const updatedMaterials = calculateMaterialsFromRooms(prev.rooms);
      return {
        ...prev,
        materials: updatedMaterials,
      };
    });
  };

  return (
    <ProjectContext.Provider
      value={{
        projectData,
        addFloor,
        removeFloor,
        addRoom,
        updateRoom,
        removeRoom,
        updateRoomPosition,
        updateMaterial,
        addMaterial,
        removeMaterial,
        updateLabor,
        addLabor,
        removeLabor,
        updateClientInfo,
        updateTax,
        updateDiscount,
        updateDueDate,
        refreshMaterialEstimates,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};