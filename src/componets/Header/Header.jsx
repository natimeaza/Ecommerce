import React, { useState } from 'react';
import HeaderBottom from './HeaderBottom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { allItems } from '../constant /headerItems';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../../redux/HabeshaSlice';
import HabeshaLogo from '../../assets/images/HabeshaLogo.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import USA from '../../assets/images/USA.jpeg';
import Ethiopia from '../../assets/images/ET.jpeg';

const Header = () => {
  const [showAll, setShowAll] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const products = useSelector((state) => state.habesha.cartProducts);
  const language = useSelector((state) => state.habesha.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchItem.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchItem.trim())}`);
      setShowAll(false);
    }
    console.log(products.length)
  };

  const text = {
    EN: {
      deliverTo: 'Delivered To',
      country: 'USA',
      signIn: 'Hello, Sign In',
      accountList: 'Account & List',
      returns: 'Return',
      orders: '& Orders',
      cart: 'Cart',
      all: 'All',
    },
    AMH: {
      deliverTo: 'የተላከበት',
      country: 'አሜሪካ',
      signIn: 'ሰላም፣ ግባ',
      accountList: 'መለያ እና ዝርዝር',
      returns: 'መመለስ',
      orders: 'እና ትዕዛዞች',
      cart: 'ጋሪ',
      all: 'ሁሉም',
    },
  };

  const currentText = text[language];

  const languageOptions = [
    { code: 'EN', flag: USA, label: 'English' },
    { code: 'AMH', flag: Ethiopia, label: 'አማርኛ' },
  ];

  return (
    <div className="w-full sticky top-0 z-50">
      <div className="w-full bg-habesha_blue text-white px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/">
          <div className="headerHover">
            <h1 className="w-44 text-center">
              <img className="h-16 w-20 mx-auto rounded-md" src={HabeshaLogo} alt="logo" />
            </h1>
          </div>
        </Link>

        <div className="headerHover hidden md1:inline-flex items-center">
          <LocationOnIcon />
          <p className="text-sm text-lightText font-light flex flex-col">
            {currentText.deliverTo}{' '}
            <span className="text-sm font-semibold -mt-1 text-whiteText">{currentText.country}</span>
          </p>
        </div>

        <div className="h-10 rounded-md hidden lg1:flex flex-grow relative items-center">
          <span
            onClick={() => setShowAll(!showAll)}
            className="h-full w-14 bg-gray-200 hover:bg-grey-300 border-2 cursor-pointer duration-300 text-sm text-habesha_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md"
          >
            {currentText.all} <ArrowDropDownIcon />
          </span>

           {showAll && (
            <div>
              <ul className="absolute h-50 w-56 top-10 left-0 overflow-x-hidden bg-white border-[1px] border-habesha_blue text-black p-2 flex-col gap-1 z-50">
                {allItems.map((item) => (
                  <li
                    onClick={() => {
                      setSearchItem(item.title[language]); // Use the translated title
                      setShowAll(false); // Close the dropdown after selection
                    }}
                    key={item.id}
                    className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-habesha_blue cursor-pointer duration-200 flex items-center gap-2"
                  >
                    {item.title[language]} {/* Display the translated title */}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <input
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
            type="text"
            className="h-full text-base text-habesha_blue flex-grow outline-none border-none px-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <span
            onClick={handleSearch}
            className="w-12 h-full flex items-center justify-center bg-habesha_yellow hover:bg-[#f3a847] duration-300 text-habesha_blue cursor-pointer rounded-tr-md rounded-br-md"
          >
            <SearchIcon />
          </span>
        </div>

        <div className="relative flex items-center justify-center text-white text-sm font-titleFont">
          <span
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="flex items-center gap-1 cursor-pointer"
          >
            <img className="w-6" src={language === 'EN' ? USA : Ethiopia} alt={`${language} flag`} />
            <span>{language}</span>
            <ArrowDropDownIcon />
          </span>

          {showLanguageDropdown && (
            <ul className="absolute top-8 w-32 bg-white border-[1px] border-habesha_blue text-black p-2 flex flex-col gap-1 z-50">
              {languageOptions.map((lang) => (
                <li
                  key={lang.code}
                  onClick={() => {
                    dispatch(setLanguage(lang.code));
                    setShowLanguageDropdown(false);
                  }}
                  className="text-sm tracking-wide font-titleFont flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1"
                >
                  <img className="w-6" src={lang.flag} alt={`${lang.code} flag`} />
                  {lang.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link to="/SignIn">
          <div className="flex flex-col items-start justify-center headerHover">
            <p className="text-sm md1:text-xs text-white md1:text-lightText font-light">{currentText.signIn}</p>
            <p className="text-sm font-semibold -mt-1 text-whiteText hidden md1:inline-flex">
              {currentText.accountList} <ArrowDropDownIcon />
            </p>
          </div>
        </Link>

        <div className="hidden lg1:flex flex-col items-start justify-center headerHover">
          <p className="text-sm text-lightText font-light">{currentText.returns}</p>
          <p className="text-sm font-semibold -mt-1 text-whiteText">{currentText.orders}</p>
        </div>

        <Link to="/cart">
          <div className="flex items-start justify-center headerHover relative">
            <ShoppingCartIcon />
            <p className="text-xs font-semibold mt-3 text-whiteText">
              {currentText.cart}{' '}
              <span className="absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-habesha_blue rounded-full flex justify-center items-center">
                {products.length > 0 ? products.length : 0}
              </span>
            </p>
          </div>
        </Link>
      </div>

      <HeaderBottom />
    </div>
  );
};

export default Header;