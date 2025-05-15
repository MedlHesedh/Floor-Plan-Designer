import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { calculateTotalCost, formatCurrency } from '../../utils/calculations';

const InvoiceTotal: React.FC = () => {
  const { projectData, updateTax, updateDiscount } = useProject();
  const { tax, discount } = projectData;
  
  const {
    materialsSubtotal,
    laborSubtotal,
    subtotal,
    taxAmount,
    discountAmount,
    total
  } = calculateTotalCost(projectData);
  
  const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      updateTax(value);
    }
  };
  
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      updateDiscount(value);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Invoice Summary</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Materials Subtotal:</span>
          <span className="font-medium">{formatCurrency(materialsSubtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Labor Subtotal:</span>
          <span className="font-medium">{formatCurrency(laborSubtotal)}</span>
        </div>
        
        <div className="border-t border-gray-200 my-2 pt-2"></div>
        
        <div className="flex justify-between">
          <span className="text-gray-700 font-medium">Subtotal:</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Tax:</span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={tax}
              onChange={handleTaxChange}
              className="w-16 p-1 text-right border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-1">%</span>
          </div>
          <span className="font-medium">{formatCurrency(taxAmount)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Discount:</span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={discount}
              onChange={handleDiscountChange}
              className="w-16 p-1 text-right border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-1">%</span>
          </div>
          <span className="font-medium text-red-500">-{formatCurrency(discountAmount)}</span>
        </div>
        
        <div className="border-t border-gray-200 my-2 pt-2"></div>
        
        <div className="flex justify-between">
          <span className="text-lg font-bold text-gray-800">Total:</span>
          <span className="text-lg font-bold text-blue-600">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotal;