import React from 'react'

const Title = ({text1,text2}) => {
  return (  
    <div className='inline-flex gap-2 mb-3 items-center'>
        <p className='text-gray-500 font-extrabold'>{text1} <span className='text-gray-700 font-bold '>{text2}</span></p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-500'></p>

    </div>
  )
}

export default Title