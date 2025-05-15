import React from 'react';
import { ProjectProvider } from './context/ProjectContext';
import FloorPlanDesigner from './components/FloorPlan/FloorPlanDesigner';
import InvoiceGenerator from './components/Invoice/InvoiceGenerator';
import Tabs from './components/UI/Tabs';
import Badge from './components/UI/Badge';
import { HardHat } from 'lucide-react';

function App() {
  return (
    <ProjectProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <HardHat className="h-8 w-8 text-yellow-500" />
                <h1 className="ml-2 text-2xl font-bold text-gray-900">Floor Plan Designer</h1>
              </div>
              <Badge />
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Tabs
            tabs={[
              {
                label: 'Design',
                content: <FloorPlanDesigner />,
              },
              {
                label: 'Invoice',
                content: <InvoiceGenerator />,
              },
            ]}
          />
        </main>
        
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">© {new Date().getFullYear()} Construction Cost Estimator</p>
              <Badge />
            </div>
          </div>
        </footer>
      </div>
    </ProjectProvider>
  );
}

export default App;