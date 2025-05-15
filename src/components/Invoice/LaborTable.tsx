import React from 'react';
import { Labor } from '../../types';
import { useProject } from '../../context/ProjectContext';
import { PlusCircle, MinusCircle } from 'lucide-react';
import Button from '../UI/Button';
import { formatCurrency } from '../../utils/calculations';

const LaborTable: React.FC = () => {
  const { projectData, updateLabor, addLabor, removeLabor } = useProject();
  const { labor } = projectData;

  const handleHoursChange = (id: string, hours: number) => {
    if (hours > 0) {
      updateLabor(id, { hours });
    }
  };

  const handleRateChange = (id: string, rate: number) => {
    if (rate >= 0) {
      updateLabor(id, { rate });
    }
  };

  const handleAddLabor = () => {
    const newLabor: Labor = {
      id: `labor-${Date.now()}`,
      description: 'New Labor Item',
      hours: 0,
      rate: 0
    };
    addLabor(newLabor);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">Labor</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddLabor}
            className="flex items-center"
          >
            <PlusCircle size={16} className="mr-1" />
            Add Labor
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hourly Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {labor.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateLabor(item.id, { description: e.target.value })}
                    className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={item.hours}
                    onChange={(e) => handleHoursChange(item.id, parseFloat(e.target.value))}
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
                      value={item.rate}
                      onChange={(e) => handleRateChange(item.id, parseFloat(e.target.value))}
                      className="w-24 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-1">/hr</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(item.hours * item.rate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => removeLabor(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MinusCircle size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {labor.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No labor items added. Add a room in the Floor Plan Designer or click "Add Labor" above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaborTable;