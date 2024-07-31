import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { BsList, BsSearch, BsBell } from "react-icons/bs"; 

interface HeaderProps {
    toggleCollapse: boolean;
    setToggleCollapse: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ toggleCollapse, setToggleCollapse }) => {
    const sideBarToggle = () => {
        setToggleCollapse(!toggleCollapse);
    };

    const headerStyle = classNames("fixed bg-black w-full z-10 px-4 shadow-sm shadow-slate-500/40", {
        ["sm:pl-[20rem]"]: !toggleCollapse,
        ["sm:pl-[5.6rem]"]: toggleCollapse
    });

    return (
        <header className={headerStyle}>
            <div className="flex items-center justify-between h-16">
                <button
                    onClick={sideBarToggle}
                    className="order-2 bg-[#3a3f4B] sm:order-1 text-[#6e768e] hover:bg-white hover:text-[#3a3f4B] focus:outline-none focus:ring-0 focus:border-none ml-3 h-[30px] w-[30px] shadow-black/10 transition duration-300 ease-in-out flex items-center justify-center rounded"
                >
                    <BsList />
                </button>
                <div className="order-1 sm:order-2 flex items-center">
                    
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-[#3a3f48] text-[#d1d5db] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#6e768e] px-3 py-1 rounded-md w-56 sm:w-72" // Adjusted width classes
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6e768e]">
                            <BsSearch />
                        </span>
                    </div>
                    
        
                    <button
                        className="ml-4 mr-4 text-[#6e768e] hover:text-white focus:outline-none focus:ring-0 focus:border-none"
                        aria-label="Notifications"
                    >
                        <BsBell size={24} />
                    </button>
                    
                    
                    <div className="h-10 w-10 rounded-full bg-[#3a3f48] flex items-center justify-center text-center ml-auto cursor-pointer">
                        <span className="font-semibold text-sm text-white">BM</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;