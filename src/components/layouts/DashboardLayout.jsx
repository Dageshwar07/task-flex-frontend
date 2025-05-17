import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/useContext';
import SideMenu from './SideMenu';
import Navbar from './Navbar';

const DashboardLayout = ({ children, activeMenu}) => {
    const {user}  = useContext(UserContext);
    const [imageError, setImageError] = useState(false);

  return (
    <div>
        <Navbar activeMenu={activeMenu} />

        {user && (
            <div className='flex'>
                <div className="max-[1000px]:hidden">
                    <SideMenu 
                        activeMenu={activeMenu}
                        onImageError={() => setImageError(true)}
                        imageError={imageError}
                    />     
                </div>  
                <div className='grow mx-5'>{children}</div>
            </div>
        )}
        </div>
  )
}

export default DashboardLayout
