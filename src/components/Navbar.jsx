import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-gray-200 text-white py-2'>
        <div className="flex logo">
            <span className='font-bold text-3xl mx-8 mb-1 text-black'>&lt;My-Time&gt;</span>
        </div>
        <ul className="flex gap-12 mx-9 mt-1 text-xl cursor-pointer font-semibold hover:font-bold transition-all text-black">
            <li>Home</li>
            <li>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar  