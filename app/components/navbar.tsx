"use client";
import React, { useState, useEffect } from "react";
import { X, Search, ChevronUp, ChevronDown, Check  } from "lucide-react";
import { useDropdown } from "../hooks/useDropdown";

const Navbar = () => {
  const [activeLeftItem, setActiveLeftItem] = useState("Top Locations");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const jobTypeDropdown = useDropdown();
   const [selectedType, setSelectedType] = useState("Internships");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const leftItems = ["Top Locations", "Top Categories", "Explore Jobs", "Courses"];

  const rightContent: Record<string, string[]> = {
    "Top Locations": ["Jobs in Mumbai", "Jobs in Bangalore", "Jobs in Hyderabad"],
    "Top Categories": ["Software", "Marketing", "Sales", "Design"],
    "Explore Jobs": ["Trending jobs globally", "Remote jobs", "Fresher jobs"],
    "Courses": ["Full Stack Development", "Data Science", "UI/UX Design"],
  };
 


  return (
    <nav className="px-4 h-[64px] flex justify-between items-center relative">
      {/* Logo */}
      <div className="text-xl font-medium">
        <h1>Job Tracker</h1>
      </div>

      {/* Jobs Dropdown */}
      <div
        className="group/job hover:text-blue-700 cursor-pointer relative h-full"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <p className="flex items-center text-lg h-full p-2">
          Job
          <ChevronUp className={`w-5 h-5 ml-1 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`} />
        </p>

        {showDropdown && (
          <div className="absolute top-full left-0 flex bg-white shadow-lg rounded-md w-[500px]">
            <div className="w-1/3 border-r p-4 flex flex-col">
              {leftItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveLeftItem(item)}
                  className={`text-left p-2 hover:bg-gray-100 rounded-r-2xl ${activeLeftItem === item ? "bg-blue-100 font-semibold" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="w-2/3 p-4 flex flex-col">
              {rightContent[activeLeftItem]?.map((subItem, index) => (
                <a key={index} href="#" className="p-2 hover:underline">
                  {subItem}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div
        className={`py-2 flex items-start w-[350px] rounded-2xl border border-gray-400 px-2 ${
          isSearchOpen ? "absolute top-0 left-0 w-full h-screen border-none bg-white z-50" : ""
        }`}
        id="nav-search"
      >
        <div
          className={`flex w-full items-center gap-4 ${
            isSearchOpen ? "justify-center h-[64px]" : "justify-between"
          }`}
        >
          {isSearchOpen && (
            <div className="relative" ref={jobTypeDropdown.ref}>
              <button
          onClick={jobTypeDropdown.toggle}
          className="flex items-center text-sm gap-1 px-2 py-1 border rounded-md hover:bg-gray-100"
        >
          {selectedType}
          <ChevronDown className={`w-4 h-4 transition ${jobTypeDropdown.isOpen ? "rotate-180" : ""}`} />
        </button>

              {jobTypeDropdown.isOpen && (
                <ul className="absolute z-10 mt-1 min-w-fit bg-white border rounded-md shadow-md w-full whitespace-nowrap">
                  {["Internship", "Job", "Short Term Courses", "Placement Guaranteed Courses"].map((type) => (
                    <li
                    key={type}
                    className={`px-4 py-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer text-sm ${
                      selectedType === type ? "font-medium text-blue-600" : ""
                    }`}
                    onClick={() => {
                      setSelectedType(type);
                      jobTypeDropdown.toggle();
                    }}
                  >
                    {type}
                    {selectedType === type && <span className="text-blue-600"><Check /></span>}
                  </li>
                  
                  ))}
                </ul>
              )}
            </div>
          )}
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Find Your Dream Job..."
            onClick={() => setIsSearchOpen(true)}
            className={`w-3/4 py-1 px-2 text-gray-500 outline-none ${
              isSearchOpen ? "border-b border-blue-300 rounded-none" : "rounded-2xl"
            }`}
          />
          <Search className="w-6 h-6 text-gray-600 hover:text-gray-400 mt-1" />
          {isSearchOpen && (
            <X
              className="text-gray-600 hover:text-gray-400 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsSearchOpen(false);
              }}
            />
          )}
        </div>
      </div>

      {/* Login/Sign Up Buttons */}
      <div className="shadow-sm rounded-2xl flex">
        <button className="px-4 py-2 rounded-l-2xl bg-blue-200 hover:bg-blue-300 hover:rounded-r-none cursor-pointer">
          Sign Up
        </button>
        <button className="px-4 py-2 rounded-2xl hover:bg-blue-300 hover:rounded-l-none cursor-pointer">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
