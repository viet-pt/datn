import React from 'react';
import UserMenu from '../header/UserMenu';

function Header() {
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <div></div>
          
          <div className="flex items-center">
            <hr className="w-px h-6 bg-gray-200 mx-3" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;