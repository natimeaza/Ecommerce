import React,{useState,useRef,useEffect} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SideNavContent from './SideNavContent';
import { motion } from 'framer-motion';
import choice from './sidenavitem'


const HeaderBottom = () => {

 

  const[sidebar,setSidebar] = useState(false)
  const ref = useRef()

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if(e.target.contains(ref.current)){
        setSidebar(false)
      }
})
  }  ,[ref,sidebar])
  return (
    <div className='w-full bg-habesha_light text-white h-[36px] px-4 py-3 flex items-center'>
            <ul className='flex items-center gap-2 text-sm tracking-wide'>
              <li onClick={() => {
                setSidebar(true)
              }} className='headerHover flex items-center gap-1'> <MenuIcon /> All</li>
              <li className='headerHover hidden md:inline-flex'>Today's deal</li>
              <li className='headerHover hidden md:inline-flex'>customer service</li>
              <li className='headerHover hidden md:inline-flex'>Registry</li>
              <li className='headerHover hidden md:inline-flex'>sell</li>
            </ul>


            {
              sidebar &&(
                <div className='w-full h-screen text-black fixed top-0 left-0 bg-habesha_blue  bg-opacity-50'>
                  <div className='w-full h-full relative'>

                  <motion.div ref={ref} initial={{ x: -500, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }} className='w-[80%] md:w-[350px] h-full bg-white border border-black overflow-y-auto'>
                      <div className='w-full bg-habesha_light text-white py-2 px-6 flex items-center gap-4'>
                        <AccountCircleIcon/>
                        <h3 className='font-titleFont font-bold text-lg tracking-wide'>Hello, Sign In</h3>
                      </div>
                     
                      {choice.map((item) => (
  <SideNavContent key={item.id} title={item.title} items={item.items} />
))}
                    
                    <span>
                      <CloseIcon onClick={() => {
                        setSidebar(false)
                      }} className='cursor-pointer absolute top-0 left-[82%] md:left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300' />
                    </span>
                    </motion.div>
                  </div>
                </div>
              )
            }
    </div>
  )
}

export default HeaderBottom
