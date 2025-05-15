import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { ClientInfo as ClientInfoType } from '../../types';
import { User, MapPin, Mail, Phone, CalendarDays } from 'lucide-react';

const ClientInfo: React.FC = () => {
  const { projectData, updateClientInfo, updateDueDate } = useProject();
  const { client, dueDate } = projectData;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateClientInfo({ [name]: value } as Partial<ClientInfoType>);
  };
  
  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDueDate(e.target.value);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Client Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <User size={18} />
          </div>
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
            placeholder="Client Name"
            className="pl-10 w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <MapPin size={18} />
          </div>
          <input
            type="text"
            name="address"
            value={client.address}
            onChange={handleChange}
            placeholder="Address"
            className="pl-10 w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <Mail size={18} />
          </div>
          <input
            type="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="pl-10 w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <Phone size={18} />
          </div>
          <input
            type="tel"
            name="phone"
            value={client.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="pl-10 w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="mt-4">
        <div className="relative max-w-xs">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <CalendarDays size={18} />
          </div>
          <input
            type="date"
            value={dueDate}
            onChange={handleDueDateChange}
            className="pl-10 w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600 mt-1 block">Due Date</span>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;