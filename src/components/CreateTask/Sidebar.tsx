import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-800 shadow-lg transition-transform transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ width: '450px', zIndex: 1000 }}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-700"></div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Sidebar;
