import React from 'react'
import img from '../../assets/images/ET.jpeg'
import FooterMiddleList from './FooterMiddleList'
import { middleList } from '../constant /middlelist'
import HabeshaLogo from '../../assets/images/HabeshaLogo.jpeg'

const FooterMiddle = () => {
  return (
    <div className='w-full bg-habesha_light text-white'>
      <div className='w-full border-b-[1px] border-t-[1px] p-10 border-gray-500'>
        <div className='max-w-5xl mx-auto text-gray-300 '>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg1:grid-cols-4 gap-6 md:place-items-center md:items-start'>
     {
      middleList.map(items => (
        <FooterMiddleList key={items.id} title={items.title} listItem={items.listItems} />
      )) 
     }
      </div>
        </div>
      </div>

      <div className="w-full flex gap-6 items-center justify-center py-6">
        <div>
          <img className="h-16 w-20 ml-10 rounded-md" src={HabeshaLogo} alt="logo" />
        </div>
        <div className="flex gap-2">
          <p className="flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1">
            English
          </p>
        </div>
        <div className="flex gap-1 items-center justify-center border border-gray-500 hover:border-amazon_yellow cursor-pointer duration-200 px-2 py-1">
          <img className="w-6" src={img} alt="flagImg" />
          <p>Ethiopia</p>
        </div>
      </div>
      {/* ============ Bottom End here ================= */}
    </div>
  )
}

export default FooterMiddle
