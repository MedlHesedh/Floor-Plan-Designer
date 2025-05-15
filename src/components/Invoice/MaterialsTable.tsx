import React from 'react';
import { Material } from '../../types';
import { useProject } from '../../context/ProjectContext';
import { PlusCircle, MinusCircle } from 'lucide-react';
import Button from '../UI/Button';
import { formatCurrency } from '../../utils/calculations';

const MaterialsTable: React.FC = () => {
  const { projectData, updateMaterial, addMaterial, removeMaterial } = useProject();
  const { materials } = projectData;

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      updateMaterial(id, { quantity });
    }
  };

  const handleUnitCostChange = (id: string, unitCost: number) => {
    if (unitCost >= 0) {
      updateMaterial(id, { unitCost });
    }
  };

  const handleAddMaterial = () => {
    const newMaterial: Material = {
      id: `mat-${Date.now()}`,
      name: 'New Material',
      unit: 'pcs',
      unitCost: 0,
      quantity: 0
    };
    addMaterial(newMaterial);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">Materials</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddMaterial}
            className="flex items-center"
          >
            <PlusCircle size={16} className="mr-1" />
            Add Material
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {materials.map((material) => (
              <tr key={material.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={material.name}
                    onChange={(e) => updateMaterial(material.id, { name: e.target.value })}
                    className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={material.unit}
                    onChange={(e) => updateMaterial(material.id, { unit: e.target.value })}
                    className="w-20 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={material.quantity}
                    onChange={(e) => handleQuantityChange(material.id, parseFloat(e.target.value))}
                    className="w-24 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="mr-1">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={material.unitCost}
                      onChange={(e) => handleUnitCostChange(material.id, parseFloat(e.target.value))}
                      className="w-24 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(material.quantity * material.unitCost)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => removeMaterial(material.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MinusCircle size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {materials.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No materials added. Add a room in the Floor Plan Designer or click "Add Material" above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialsTable;