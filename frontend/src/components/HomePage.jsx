import SideBar from "./Sidebar";
import MessageContainer from "./messageContainer";
const HomePage = () => {
  return (
    <div className=" md: h-[500px] bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div className="flex  justify-center  px-6 py-6   lg:py-5 ">
        {/* <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"></div> */}
        <SideBar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;
