import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/useContext';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../common/ProfileImage';

const SideMenu = ({activeMenu}) => {
    const {user, logout} = useContext(UserContext);
    const [sideMenuData, setSideMenuData] = useState([]);
    const navigate = useNavigate();

    const handleClick = (route) => {
        // Check if this is a logout action
        if (route.toLowerCase() === 'logout') {
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {    
        try {
            logout();
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Logout error:", error);
            navigate("/login", { replace: true });
        }
    };

    useEffect(() => {
        if(user) {
            setSideMenuData(user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
        }
    }, [user]);

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20'>
            <div className='flex flex-col items-center justify-center mb-7 pt-5'>
                <div className='relative'>
                    <ProfileImage
                        src={user?.profileImageUrl}
                        alt={user?.name}
                        size="large"
                        className="border-2 border-purple-800"
                    />
                    {user?.role === "admin" && (
                        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-[10px] font-medium text-white px-4 py-1 rounded shadow bg-purple-800">
                            Admin
                        </span>
                    )}
                </div>

                <h5 className='text-gray-950 font-medium leading-6 mt-5'>
                    {user?.name || "User"}
                </h5>

                <p className='text-[12px] text-gray-500'>{user?.email || ""}</p>
            </div>

            <div className="space-y-1">
                {sideMenuData.map((item, index) => {
                    const isActive = activeMenu === item.label;
                    return (
                        <button
                            key={`menu_${index}`}
                            className={`w-full flex items-center gap-4 px-6 py-3 text-[15px] transition-colors
                                ${isActive 
                                    ? "text-purple-800 bg-purple-50 border-r-4 border-purple-800 font-medium" 
                                    : "text-gray-600 hover:bg-gray-50"
                                }`}
                            onClick={() => handleClick(item.path)}
                        >
                            <item.icon className={`text-xl ${isActive ? 'text-purple-800' : 'text-gray-400'}`} />
                            {item.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default SideMenu;