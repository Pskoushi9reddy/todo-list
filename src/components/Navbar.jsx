import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-black text-white py-2 my-2'>
        <div className="flex logo">
            <span className='font-bold text-xl mx-8'>&lt;My-Time&gt;</span>
        </div>
        <ul className="flex gap-12 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar  