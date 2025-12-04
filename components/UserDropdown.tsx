'use client'
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { useAuth } from '../contexts/AuthContext';
import { currentUser } from '../lib/helper';
import Link from 'next/link';
import { useAuth } from "@/hooks/useAuth";

const UserDropdown = ({setIsMenuOpen}:{setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  // const { user, logout } = useAuth();
  const { user, isLoading,logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
    setIsOpen(false)
  }

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between space-x-2 transition-colors cursor-pointer w-full md:w-auto"
      >
     
        {/* <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 border-2 border-gray-600">
          {user.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div> */}
        {isLoading ? (
                // Loading state for mobile - show avatar skeleton
                <div className="flex items-center space-x-3 px-3 py-2">
                  <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-gray-600 rounded animate-pulse"></div>
                </div>
              ):
           <div className='flex items-center space-x-2'>
          <Avatar className="w-8 h-8 cursor-pointer">
               <AvatarImage src={user?.profile_pic} />
              <AvatarFallback>{currentUser?.avatar}</AvatarFallback>
            </Avatar>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
              }
        {/* <div className="md:hidden">
              <p className="text-sm capitalize font-medium truncate">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div> */}
        </div>
     {/* {isOpen && (
        <div className="md:hidden absolute bottom-full right-0 mb-2 w-48 bg-gray-100 rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="py-2">
            <Link
              href="/n/profile"
              onClick={handleClose}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )} */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-gray-100 rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-medium truncate">
               {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            
            <Link
              href="/n/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;