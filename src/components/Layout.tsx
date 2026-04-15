import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      {children}
    </div>
  );
};

export default Layout;
