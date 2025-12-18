
interface HamburgerIconProps {
    isHamburgerOpen: boolean;
}

export default function HamburgerIcon({ isHamburgerOpen }: HamburgerIconProps) {

    const hamburgerLinesClass = `w-full h-1 bg-black dark:bg-white absolute transition-all duration-300 ease-in-out`
    const topLine = isHamburgerOpen ? "top-[50%] rotate-45 -translate-y-1/2" : "top-1/8"
    const middleLine =  `top-1/2 -translate-y-1/2 ${isHamburgerOpen ? "opacity-0" : "opacity-100"}`;
    const bottomLine = isHamburgerOpen ? "bottom-[50%] -rotate-45 translate-y-1/2" : "bottom-1/8"
    return (
        <>
            <div className={`${hamburgerLinesClass} ${topLine} `}></div>
            <div className={`${hamburgerLinesClass} ${middleLine} `}></div>
            <div className={`${hamburgerLinesClass} ${bottomLine} `}></div>
        </>

    );
}
