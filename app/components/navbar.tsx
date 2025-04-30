"use client";
import React, { useState, useEffect } from "react";
import { X, Search, ChevronUp, ChevronDown, Check } from "lucide-react";
import { useDropdown } from "../hooks/useDropdown";

const Navbar = () => {
  const [activeLeftItem, setActiveLeftItem] = useState("Top Locations");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Internships");

  const jobTypeDropdown = useDropdown();

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
    <nav className="px-4 h-[64px] flex justify-between items-center relative shadow-[0px_0px_4px_rgba(0,0,0,0.25)]">
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
                  className={`text-left p-2 hover:bg-gray-100 rounded-r-2xl ${
                    activeLeftItem === item ? "bg-blue-100 font-semibold" : ""
                  }`}
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

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white z-50 p-6 overflow-y-auto">
          {/* Close */}
          <div className="flex justify-end mb-4">
            <X
              className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-400"
              onClick={() => setIsSearchOpen(false)}
            />
          </div>

          {/* Dropdown + Search */}
          <div className="flex items-center gap-4 bg-white  rounded-xl max-w-3xl mx-auto mb-6">
            {/* Dropdown */}
            <div className="relative" ref={jobTypeDropdown.ref}>
              <button
                onClick={jobTypeDropdown.toggle}
                className="flex items-center gap-2 font-medium px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                {selectedType}
                <ChevronDown className={`w-4 h-4 transition ${jobTypeDropdown.isOpen ? "rotate-180" : ""}`} />
              </button>
              {jobTypeDropdown.isOpen && (
                <ul className="absolute mt-2 w-max bg-white border rounded-lg shadow-md text-sm z-50">
                  {["Internships", "Jobs", "Short term courses", "Placement guarantee courses"].map((type) => (
                    <li
                      key={type}
                      className={`px-4 py-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer ${
                        selectedType === type ? "text-blue-600 font-medium" : ""
                      }`}
                      onClick={() => {
                        setSelectedType(type);
                        jobTypeDropdown.toggle();
                      }}
                    >
                      {type}
                      {selectedType === type && <Check className="w-4 h-4 text-blue-600" />}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Input */}
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search here..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 ring-blue-300"
              />
            </div>
          </div>

          {/* Popular Cities */}
          <div className="bg-white border rounded-xl p-4 max-w-3xl mx-auto mb-4">
            <p className="text-sm text-gray-500 font-semibold mb-3">POPULAR CITIES</p>
            <div className="flex flex-wrap gap-2">
              {["Delhi/NCR", "Bangalore", "Mumbai", "Hyderabad", "Chennai", "Kolkata"].map((city) => (
                <span
                  key={city}
                  className="px-4 py-1 text-sm font-medium border rounded-full text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Popular Categories */}
          <div className="bg-white border rounded-xl p-4 max-w-3xl mx-auto">
            <p className="text-sm text-gray-500 font-semibold mb-3">POPULAR CATEGORIES</p>
            <div className="flex flex-wrap gap-2">
              {["Big brands", "Work from home", "Part-time", "MBA", "Engineering", "Media", "Design", "Data Science"].map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-1 text-sm font-medium border rounded-full text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search trigger (collapsed) */}
      {!isSearchOpen && (
        <div
          className="py-2 flex items-center w-[350px] rounded-2xl border border-gray-400 px-2 cursor-pointer"
          onClick={() => setIsSearchOpen(true)}
        >
          <input
            type="text"
            placeholder="Find Your Dream Job..."
            className="w-full py-1 px-2 text-gray-500 outline-none rounded-2xl bg-white"
          />
          <Search className="w-6 h-6 text-gray-600 hover:text-gray-400 mt-1" />
        </div>
      )}

      {/* Login / Sign Up */}
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
