import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl transition-transform transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-full max-w-[375px] sm:max-w-[410px] md:max-w-[360px] lg:max-w-[350px]`}
      style={{ zIndex: 1000 }}
    >
      <div className="text-gray-300 w-full">{children}</div>
    </div>
  );
};

export default Sidebar;
