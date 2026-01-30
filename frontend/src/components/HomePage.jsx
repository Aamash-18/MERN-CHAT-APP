import { useState } from "react";
import SideBar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { FiMenu } from "react-icons/fi";

const HomePage = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="md:h-[500px] bg-gray-50 dark:bg-gray-900 md:rounded-lg relative">
      {/* Mobile Toggle Button */}
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="md:hidden absolute top-4 left-6 z-50"
        >
          <FiMenu size={26} />
        </button>
      )}

      <div className="flex flex-col md:flex-row justify-center md:px-3 md:py-3 lg:py-5">
        {/* Sidebar */}
        <div
          className={`
            fixed md:static top-0 left-0 z-40 bg-gray-900
            w-[280px] md:w-auto h-full
            transition-transform duration-300 ease-in-out
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <SideBar closeSidebar={() => setShowSidebar(false)} />
        </div>

        {/* Chat */}
        <div className="w-full md:w-auto md:ml-2">
          <MessageContainer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
