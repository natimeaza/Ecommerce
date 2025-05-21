import React,{useState} from 'react'
import HeaderBottom from './HeaderBottom'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { allItems } from '../constant /allItems';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HabeshaLogo from '../../assets/images/HabeshaLogo.jpeg'

const Header = () => {


const [showAll,setShowAll] = useState(false)
const [searchItem,setSearchItem] = useState('') 
const products = useSelector((state) => state.habesha.products)
 
  return (
    <div className='w-full sticky top-0 z-50' >

    <div className='W-full bg-habesha_blue text-white px-4 py-3 flex items-center gap-4'>
      <Link to="/">
      <div className='headerHover' >
      <h1 className='w-44 mt-2 text-center'> 
        <img className="h-16 w-20 ml-10 rounded-md"  src={HabeshaLogo} alt="logo" />
        </h1> 
      </div>
      </Link>


      <div className='headerHover hidden md1:inline-flex '> 
        <LocationOnIcon/>
        <p className='text-sm text-lightText font-light flex flex-col'>
           Deliverd To {""} <span className='text-sm font-semibold -mt-1 text-whiteText'>USA</span>
           </p>
      </div>
    <div className=' h-10 rounded-md hidden lg1:flex flex-grow relative '>
      <span onClick={() => {
        setShowAll(!showAll)
        
      }} className='h-full w-14 bg-gray-200 hover:bg-grey-300 border-2 cursor-pointer duration-300 text-sm text-habesha_blue font-titleFont flex items-center justify-center rounded-t1-md rounded-bl-md  '>
         All <span><ArrowDropDownIcon /></span></span>

         {
          showAll && (
            <div>
              <ul className='absolute h-50 w-56 top-10 left-0  overflow-x-hidden bg-white border-[1px] border-habesha_blue text-black p-2 flex-col gap-1 z-50'>
                
                {
                  allItems.map((item) => (
                    <li onClick={()=>{
                      setSearchItem(item.title)
                    }} key={item.id} className='text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-habesha_blue cursor-pointer duration-200 flex items-center gap-2'>
                      {item.title}
                    </li>
                  ))}
              </ul>
            </div>
          )
         }
      <input onChange={(e) => setSearchItem(e.target.value)} value={searchItem}  type="text" className=' h-full text-base text-habesha_blue flex-grow outline-none border-none px-2' />
      <span onClick={()=>{
        setShowAll(!showAll)
      }} className='w-12 h-full flex items-center justify-center bg-habesha_yellow hover:bg-[#f3a847] duration-300 text-habesha_blue cursor-pointer rounded-tr-md rounded-br-md'><SearchIcon /></span>
    </div>
    
<Link to="/SignIn">
 <div className='flex flex-col items-start justify-center headerHover'>
      <p className='text-sm md1:text-xs text-white md1:text-lightText font-light'>hello, signin</p>
      <p className='text-sm font-semibold -mt-1 text-whiteText hidden md1:inline-flex'>Account & list {' '}<span> <ArrowDropDownIcon /></span></p>
    </div>
</Link>

    <div className='hidden lg1:flex flex-col items-start justify-center headerHover'>
      <p className='text-sm text-lightText font-light' >Return</p>
      <p className='text-sm font-semibold -mt-1 text-whiteText'>& Orders</p>
    </div>


     <Link to="/cart">
     <div className='flex items-start justify-center headerHover relative'>
        <ShoppingCartIcon />
        <p className='text-xs font-semibold mt-3 text-whiteText'>
          Cart <span className='absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-habesha_blue rounded-full flex justify-center items-center'>{products.length > 0 ? products.length : 0}</span></p>
      </div>
     </Link>
      

    </div>

         <HeaderBottom />
    <div>


    </div>
    </div>
  )
}

export default Header
