import React from 'react'
import { footerBottomItem } from '../constant /allItems'

const FooterBottom = () => {
  return (
    <div className='w-full bg-fotterBottom py-8'>
      <div className='max-w-5xl mx-auto px-4'>
        <div className='w-full grid grid-cols-3 md:grid-cols-5 md1:grid-cols-6 lg1:grid-cols-7 gap-3 place-content-center text-gray-400 '>
    {
      footerBottomItem.map((item) => (
        <div key={item.id} className='group cursor-pointer'>
          <h3 className='footerBottomTitle'>{item.title}</h3>
          <p className='footerBottomText'>{item.description}</p>
        </div>
      ))
    }
    </div>
      </div>
    </div>
  )
}

export default FooterBottom
