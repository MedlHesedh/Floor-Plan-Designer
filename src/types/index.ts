export type RoomType = 'bedroom' | 'bathroom' | 'kitchen' | 'living' | 'dining' | 'office';

export interface Room {
  id: string;
  type: RoomType;
  name: string;
  width: number;
  length: number;
  position: {
    x: number;
    y: number;
  };
  floorId: string;
}

export interface Floor {
  id: string;
  name: string;
  level: number;
}

export interface Material {
  id: string;
  name: string;
  unit: string;
  unitCost: number;
  quantity: number;
}

export interface Labor {
  id: string;
  description: string;
  hours: number;
  rate: number;
}

export interface ClientInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface ProjectData {
  floors: Floor[];
  rooms: Room[];
  materials: Material[];
  labor: Labor[];
  client: ClientInfo;
  tax: number;
  discount: number;
  dueDate: string;
}