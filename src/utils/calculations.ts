import { Room, Material, Labor, ProjectData } from '../types';

export const calculateArea = (width: number, length: number): number => {
  return width * length;
};

export const calculateTotalArea = (rooms: Room[]): number => {
  return rooms.reduce((total, room) => {
    return total + calculateArea(room.width, room.length);
  }, 0);
};

// These are simplified calculations for demo purposes
// In a real application, these would be more complex and accurate
export const calculateMaterialsFromRooms = (rooms: Room[]): Material[] => {
  const totalArea = calculateTotalArea(rooms);
  
  // Basic materials needed for construction
  return [
    {
      id: 'mat-1',
      name: 'Cement (5kg bags)',
      unit: 'bags',
      unitCost: 15,
      quantity: Math.ceil(totalArea * 0.15),
    },
    {
      id: 'mat-2',
      name: 'Tiles',
      unit: 'm²',
      unitCost: 25,
      quantity: Math.ceil(totalArea * 1.1), // Adding 10% for wastage
    },
    {
      id: 'mat-3',
      name: 'Paint',
      unit: 'liters',
      unitCost: 8,
      quantity: Math.ceil(totalArea * 0.4),
    },
    {
      id: 'mat-4',
      name: 'Bricks',
      unit: 'pieces',
      unitCost: 0.5,
      quantity: Math.ceil(totalArea * 80),
    },
    {
      id: 'mat-5',
      name: 'Sand',
      unit: 'tons',
      unitCost: 30,
      quantity: Math.ceil(totalArea * 0.08),
    },
    {
      id: 'mat-6',
      name: 'Gravel',
      unit: 'tons',
      unitCost: 35,
      quantity: Math.ceil(totalArea * 0.07),
    },
  ];
};

export const calculateDefaultLabor = (rooms: Room[]): Labor[] => {
  const totalArea = calculateTotalArea(rooms);
  
  // Basic labor estimates
  return [
    {
      id: 'labor-1',
      description: 'Masonry Work',
      hours: Math.ceil(totalArea * 2),
      rate: 20,
    },
    {
      id: 'labor-2',
      description: 'Tiling',
      hours: Math.ceil(totalArea * 1.5),
      rate: 25,
    },
    {
      id: 'labor-3',
      description: 'Painting',
      hours: Math.ceil(totalArea * 1),
      rate: 18,
    },
    {
      id: 'labor-4',
      description: 'Electrical Work',
      hours: Math.ceil(totalArea * 0.5),
      rate: 30,
    },
    {
      id: 'labor-5',
      description: 'Plumbing',
      hours: Math.ceil(totalArea * 0.5),
      rate: 28,
    },
  ];
};

export const calculateMaterialsSubtotal = (materials: Material[]): number => {
  return materials.reduce((total, material) => {
    return total + (material.unitCost * material.quantity);
  }, 0);
};

export const calculateLaborSubtotal = (labor: Labor[]): number => {
  return labor.reduce((total, laborItem) => {
    return total + (laborItem.rate * laborItem.hours);
  }, 0);
};

export const calculateTotalCost = (projectData: ProjectData): {
  materialsSubtotal: number;
  laborSubtotal: number;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
} => {
  const materialsSubtotal = calculateMaterialsSubtotal(projectData.materials);
  const laborSubtotal = calculateLaborSubtotal(projectData.labor);
  const subtotal = materialsSubtotal + laborSubtotal;
  
  const taxAmount = subtotal * (projectData.tax / 100);
  const discountAmount = subtotal * (projectData.discount / 100);
  
  const total = subtotal + taxAmount - discountAmount;
  
  return {
    materialsSubtotal,
    laborSubtotal,
    subtotal,
    taxAmount,
    discountAmount,
    total,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(amount);
};
