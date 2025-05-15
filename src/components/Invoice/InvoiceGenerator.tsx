import React from 'react';
import { useProject } from '../../context/ProjectContext';
import ClientInfo from './ClientInfo';
import MaterialsTable from './MaterialsTable';
import LaborTable from './LaborTable';
import InvoiceTotal from './InvoiceTotal';
import Button from '../UI/Button';
import { Download, RefreshCw } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { calculateTotalCost, formatCurrency, calculateTotalArea } from '../../utils/calculations';

const InvoiceGenerator: React.FC = () => {
  const { projectData, refreshMaterialEstimates } = useProject();
  
  const generatePDF = () => {
    const doc = new jsPDF();
    const { client, rooms, materials, labor, tax, discount, dueDate } = projectData;
    const { 
      materialsSubtotal, 
      laborSubtotal, 
      subtotal, 
      taxAmount, 
      discountAmount, 
      total 
    } = calculateTotalCost(projectData);
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text('CONSTRUCTION ESTIMATE', 105, 20, { align: 'center' });
    
    // Date
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Due Date: ${new Date(dueDate).toLocaleDateString()}`, 20, 35);
    
    // Project Details
    doc.setFontSize(12);
    doc.text('Project Details', 20, 45);
    doc.setFontSize(10);
    doc.text(`Total Area: ${calculateTotalArea(rooms).toFixed(1)} m²`, 20, 52);
    doc.text(`Number of Rooms: ${rooms.length}`, 20, 57);
    
    // Client Information
    doc.setFontSize(12);
    doc.text('Client Information', 20, 67);
    doc.setFontSize(10);
    doc.text(`Name: ${client.name || 'N/A'}`, 20, 74);
    doc.text(`Address: ${client.address || 'N/A'}`, 20, 79);
    doc.text(`Email: ${client.email || 'N/A'}`, 20, 84);
    doc.text(`Phone: ${client.phone || 'N/A'}`, 20, 89);
    
    // Materials
    doc.setFontSize(12);
    doc.text('Materials', 20, 99);
    doc.setFontSize(10);
    doc.text('Item', 20, 106);
    doc.text('Quantity', 120, 106);
    doc.text('Unit Cost', 150, 106);
    doc.text('Subtotal', 180, 106);
    
    let yPos = 112;
    materials.forEach((material, index) => {
      doc.text(material.name, 20, yPos);
      doc.text(`${material.quantity} ${material.unit}`, 120, yPos);
      doc.text(`$${material.unitCost.toFixed(2)}`, 150, yPos);
      doc.text(`$${(material.quantity * material.unitCost).toFixed(2)}`, 180, yPos);
      yPos += 5;
    });
    
    // Labor
    yPos += 5;
    doc.setFontSize(12);
    doc.text('Labor', 20, yPos);
    yPos += 7;
    doc.setFontSize(10);
    doc.text('Description', 20, yPos);
    doc.text('Hours', 120, yPos);
    doc.text('Rate', 150, yPos);
    doc.text('Subtotal', 180, yPos);
    
    yPos += 6;
    labor.forEach((item, index) => {
      doc.text(item.description, 20, yPos);
      doc.text(`${item.hours}`, 120, yPos);
      doc.text(`$${item.rate.toFixed(2)}/hr`, 150, yPos);
      doc.text(`$${(item.hours * item.rate).toFixed(2)}`, 180, yPos);
      yPos += 5;
    });
    
    // Summary
    yPos += 10;
    doc.setFontSize(12);
    doc.text('Summary', 20, yPos);
    yPos += 7;
    doc.setFontSize(10);
    doc.text(`Materials Subtotal: ${formatCurrency(materialsSubtotal)}`, 20, yPos);
    yPos += 5;
    doc.text(`Labor Subtotal: ${formatCurrency(laborSubtotal)}`, 20, yPos);
    yPos += 5;
    doc.text(`Subtotal: ${formatCurrency(subtotal)}`, 20, yPos);
    yPos += 5;
    doc.text(`Tax (${tax}%): ${formatCurrency(taxAmount)}`, 20, yPos);
    yPos += 5;
    doc.text(`Discount (${discount}%): -${formatCurrency(discountAmount)}`, 20, yPos);
    yPos += 7;
    doc.setFontSize(12);
    doc.setTextColor(0, 51, 153);
    doc.text(`Total: ${formatCurrency(total)}`, 20, yPos);
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('Generated with Construction Cost Estimator | Built with Bolt.new', 105, 285, { align: 'center' });
    
    doc.save('construction-estimate.pdf');
  };
  
  return (
    <div className="w-full pb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Invoice Generator</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="flex items-center"
            onClick={refreshMaterialEstimates}
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh Estimates
          </Button>
          <Button 
            variant="primary"
            className="flex items-center"
            onClick={generatePDF}
          >
            <Download size={16} className="mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
      
      <ClientInfo />
      
      <MaterialsTable />
      
      <LaborTable />
      
      <InvoiceTotal />
    </div>
  );
};

export default InvoiceGenerator;