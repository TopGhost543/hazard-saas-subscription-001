import { SIDENAV_ITEMS } from "@/sidebar_constants/sidebar_constants";
import Image from "next/image";
import SideBarMenuGroup from "./side-bar-menu-group";
import classNames from "classnames";

export default function Sidebar({ toggleCollapse }: { toggleCollapse: boolean }) {
    const asideStyle = classNames(
        "fixed bg-black text-gray-500 z-50 h-full shadow-lg shadow-gray-900/20 transition duration-300 ease-in-out w-[20rem] overflow-y-auto sidebar-scrollbar",
        {
            ["sm:w-[5.4rem] sm:left-0 left-[100%]"]: toggleCollapse,
            ["w-[20rem]"]: !toggleCollapse
        }
    );

    return (
        <aside className={asideStyle}>
            <div className="flex items-center py-5 px-4">
                <Image alt="HazardAI logo" src='/Integrove-Logo_Candy-Box.png' className="w-7" width={28} height={28} />
                {!toggleCollapse && (
                    <h3 className="pl-3 font-bold text-2xl text-[#e6e9ee]">
                        HazardAI
                    </h3>
                )}
            </div>
            <nav className="flex flex-col py-4">
                <div className="flex flex-col gap-1.5 px-2">
                    {SIDENAV_ITEMS.map((item, index) => (
                        <SideBarMenuGroup key={index} menuGroup={item} toggleCollapse={toggleCollapse} />
                    ))}
                </div>
            </nav>
        </aside>
    );
}
