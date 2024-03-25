import MenuDropDown from "./MenuDropDown";

const Navbar = () => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm px-16">
            <div className="py-4 border-b-[1px]">
             
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                    {/* log0 */}
                   logo
                    {/* DropDown  */}
                   <MenuDropDown/>
                </div>
             
            </div>
        </div>
    );
};

export default Navbar;