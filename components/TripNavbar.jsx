import React, { useState } from 'react';
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Link } from '@radix-ui/react-navigation-menu';

const TripNavbar = ({ onMenuSelect }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuSelect = (menu) => {
    console.log(menu)
    setSelectedMenu(menu);
    onMenuSelect && onMenuSelect(menu);
  };

  return (
    <Menubar className="flex justify-around">
      <MenubarMenu>
        <MenubarTrigger onClick={() => handleMenuSelect('plan')}>
          Plan
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={() => handleMenuSelect('edit')}>
        more restaurants

        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={() => handleMenuSelect('view')}>
        more attractions
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};

export default TripNavbar;
