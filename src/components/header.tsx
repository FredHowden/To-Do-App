import { useState } from "react";
import HamburgerIcon from "./icons/hamburgerIcon";
import logo from "../assets/logo.png"


function HamburgerButton({ ...props }) {
    return <button {...props} />;
}


export default function Header() {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    const toggleMenu = () => {
        setIsHamburgerOpen(!isHamburgerOpen);
    };
    const closeMenu = () => {
        setIsHamburgerOpen(false);
    };



    return (
        <header className="dark:bg-[#141414] dark:text-white bg-gray-100 px-10 py-4 flex items-center fixed top-0 w-full sm:opacity-95 z-1">
            <a href="/"><img className="w-20 h-full" src={logo.src} alt="logo of VRCafe" /> </a>
            <nav className="flex items-center sm:ml-auto">
                <ul className={`flex px-10 gap-5 max-sm:bg-gray-100 dark:max-sm:bg-[#141414] ${isHamburgerOpen ? "max-sm:translate-y-0" : "max-sm:-translate-y-full"} max-sm:fixed max-sm:inset-0 max-sm:transition-all max-sm:duration-500 max-ms:ease-in-out max-sm:flex-col max-sm:pt-16 max-sm:text-3xl sm:gap-4`}>
                    <li><a onClick={closeMenu} className={`max-sm:block max-sm:active:border-2 max-sm:active:border-dotted`} href={""}>lorem</a></li>
                    <li><a onClick={closeMenu} className={`max-sm:block max-sm:active:border-2 max-sm:active:border-dotted`} href={""}>lorem</a></li>
                    <li><a onClick={closeMenu} className={`max-sm:block max-sm:active:border-2 max-sm:active:border-dotted`} href={""}>lorem</a></li>
                    <li><a onClick={closeMenu} className={`max-sm:block max-sm:active:border-2 max-sm:active:border-dotted`} href={""}>lorem</a></li>
                </ul>
            </nav>
            <HamburgerButton
                onClick={toggleMenu}
                className="max-sm:z-1 max-sm:flex max-sm:flex-col max-sm:gap-1 max-sm:cursor-pointer max-sm:relative max-sm:min-w-8 max-sm:min-h-8 max-sm:ml-auto sm:hidden"
                aria-label="Toggle menu">
                <HamburgerIcon isHamburgerOpen={isHamburgerOpen} />
            </HamburgerButton>

        </header>
    );
}


