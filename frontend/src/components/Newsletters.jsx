import React, { useState } from 'react'

const Newsletters = () => {
    const [email, setemail] = useState("")
    const formHandler=(e)=>{
        e.preventDefault();
        alert("done")

    }
  return (
    <div className='text-center'>
        <h2 className='font-extrabold font-xl sm:text-2xl'>Suscribe now & get 20% off</h2>
        <p className='mt-2 text-sm  sm:text-xl text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, velit!</p>
        <form onSubmit={formHandler} className='m-auto w-full sm:w-1/2 flex gap-3 items-center  my-6 border pl-3 '>
            <input value={email} onChange={(e)=>{setemail(e.target.value)}} type="email" required className='w-full sm:flex-1 outline-none' />
            <button  className='bg-black text-white text-sm py-4 px-10'>Suscribe</button> 
        </form>
    </div>
  )
}

export default Newsletters