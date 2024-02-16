import { useState, useContext, useEffect } from "react";
import Logo from "../assets/Logo.svg";
import LogOutIcon from "../assets/LogOut.svg";
import CartIcon from "../assets/Cart.svg";
import { useNavigate } from "react-router-dom";
import Context from "../context/GlobalContext";
import { useCookieContext } from "../context/CookieContext";

function Navbar() {
  const { categories, getCategories, currentCategory,setCurrentCategory, filterProducts, currency, setCurrency ,totalQuantity} = useContext(Context)
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const { removeCookie } = useCookieContext()
  const handleLogout = (e) => 
  {
    e.preventDefault();
    removeCookie('accessToken', { path: '/' });
  };
  const handleCurrencyChange = (event) => {setCurrency(event.target.value);};

  useEffect(() => {getCategories()}, [])

  return (
    <nav className="px-4">
      <div className="hidden lg:flex justify-between">
        <ul className="flex w-[50%] gap-8">
          {categories.map((c) =>
          (<li className="flex flex-col  text-center w-[70px] h-[56px]">
            <button onClick={() => {
              setCurrentCategory(c)
              filterProducts(c)
            }} className={`${currentCategory===c?'border-green-400 text-green-400':''} py-6 border-b-2 mt-3 border-transparent hover:text-green-400 hover:border-green-400`}>{c}</button>
          </li>))}
        </ul>
        <button onClick={() => {
          navigate("/mainpage")
          filterProducts("All")
          setCurrentCategory("All")
        }} className="py-2">
          <img src={Logo} className="mt-[24px] mb-[15px]" alt="my_logo" />
        </button>
        <ul className="flex w-[50%] items-center justify-end gap-8">
          <li className="flex">
            <select
              value={currency} onChange={handleCurrencyChange}
              className="py-6 px-4 border-b-2 border-transparent hover:border-green-400 leading-tight focus:outline-none">
              <option key="$" value="$">
                $
              </option>
              <option key="₼" value="₼">
                ₼
              </option>
            </select>
          </li>
          <li>
            <button onClick={() => navigate("/cart")} className="relative p-6 border-b-2 border-transparent hover:text-green-400 hover:border-green-400">
              <img src={CartIcon} className="w-[20px] h-[20px]" alt="cart_icon" />
              <span className="absolute rounded-full bg-black top-[-5px] right-[10px]  py-[0.5px] px-[8px] text-white">{totalQuantity}</span>
            </button>
            <button onClick={(e) => handleLogout(e)} className="py-3 px-6 border-b-2 border-transparent">
                <img src={LogOutIcon} className="w-[20px] h-[20px]" alt="cart_icon" />
              </button>
          </li>
        </ul>
      </div>
      <div className="flex flex-col lg:hidden">
        <div className="flex h-[75px] items-center justify-between">
          <div className="ml-5">
            <button
              onClick={() => {
                setOpenNav((preVal) => !preVal);
              }}
              className="text-black"
            >
              ☰
            </button>
          </div>
          <button onClick={() => {
            navigate("/mainpage")
            filterProducts("All")
            setCurrentCategory("All")
          }}>
            <img src={Logo} className="mt-[24px] mb-[15px]" alt="my_logo" />
          </button>
        </div>
        <div className={`${openNav ? "" : "hidden"}`}>
          <ul className="flex flex-col items-center mb-[25px] gap-8">
            {categories.map((c) =>
            (<li className="flex px-5  flex-col text-center w-full">
              <button onClick={() => {
                setCurrentCategory(c)
                filterProducts(c)
              }} className={`${currentCategory===c?'border-green-400 text-green-400':''} py-3 border-b-2 border-transparent hover:text-green-400 hover:border-green-400`}>{c}</button>
            </li>))}
          </ul>
          <ul className="flex items-center justify-center gap-16">
            <li className="flex">
              <select value={currency} onChange={handleCurrencyChange} className="rounded py-3 border-b-2 border-transparent hover:border-green-400 px-4 leading-tight focus:outline-none">
                <option value="$">
                  $
                </option>
                <option value="₼">
                  ₼
                </option>
              </select>
            </li>
            <li>
              <button onClick={() => navigate("/cart")} className="py-3 relative px-6 border-b-2 border-transparent hover:text-green-400 hover:border-green-400">
                <img src={CartIcon} className="w-[20px] h-[20px]" alt="cart_icon" />
                <span className="absolute rounded-full bg-black top-[-10px] right-[10px]  py-[1px] px-[8px] text-white">{totalQuantity}</span>
              </button>
              <button onClick={(e) => handleLogout(e)} className="py-[100px]  px-6 border-b-2 border-transparent">
                <img src={LogOutIcon} className="w-[20px] h-[20px]" alt="cart_icon" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar