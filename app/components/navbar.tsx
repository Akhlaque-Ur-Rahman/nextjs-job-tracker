"use client"
import React from 'react'
import { Search, ChevronUp , ChevronDown  } from "lucide-react";





const navbar = () => {
  return (
    <nav className='bg-blue-200 py-4 px-4 flex justify-between'>
      <div className='text-xl font-medium'>
        <h1>Job Tracker</h1>
      </div>
      <div className='group/job hover:text-blue-700 hover:cursor-pointer relative'>
        <p className='flex items-center text-lg'>Job <ChevronUp className="w-5 h-5 ml-1 transform transition-transform duration-300 group-hover/job:rotate-180" /></p>
        <div className='size-[300] hidden  group-hover/job:block absolute border-1 border-red-400 text-black top-full'>
            <div>
                <li></li>
                <li></li>
                <li></li>
            </div>
            <div>
                
            </div>
        </div>
      </div>
      <div className='flex items-center cursor-pointer w-[300px] rounded-2xl border-1 border-gray-400 px-2 shadow-md'>
        <input type="text" name="search" id="search" placeholder='Find Your Dream Job...' className='w-full outline-none text-gray-500' />
        <Search className="w-5 h-5 text-gray-600" />
      </div>
      <div className='shadow-md rounded-2xl'>
        <button className='px-2 py-1 rounded-2xl hover:bg-blue-300 hover:cursor-pointer'>Login | Sign Up</button>
      </div>


    </nav>
  )
}

export default navbar
