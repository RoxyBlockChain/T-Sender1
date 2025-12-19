import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaGithub } from 'react-icons/fa';

export default function Header() {
  return (

    <header className="flex items-center justify-between p-4 bg-red-300 shadow-md">
      {/* Left side - Title */}
      <div className="flex items-center place-items: start gap-2">
        <h4 className="text-2xl font-bold text-gray-600">T-Sender</h4>
         {/* GitHub button */}
        <a
          href="https://github.com/RoxyBlockChain/t-sender"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="GitHub repository"
        >
          <FaGithub className="w-5 h-5 text-gray-700" />
        </a>
      </div>
        {/* Connect button */}
        <ConnectButton /> 
    </header>
  );
}