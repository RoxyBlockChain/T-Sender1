"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaGithub } from 'react-icons/fa';
import '@rainbow-me/rainbowkit/styles.css';

export default function Header() {
  return (

     <header className="  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 5px;
  font-weight: 500;
  transition: 0.3s;
  display: flex;
  align-items: center;">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo/Title */}
          <div className="leftH">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">TS</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

                         T-Sender
              </span>
            </div>
          </div>
        </div>       
      {/* GitHub button */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="GitHub Repository"
            >
              <FaGithub className="h-5 w-5 text-gray-600 hover:text-gray-900" />
            </a>
        {/* Connect button */}
        <div className="rightH">
          <ConnectButton /> 
        </div>
        </div>
        
    </header>
  );
}