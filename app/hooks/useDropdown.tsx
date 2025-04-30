import { useState, useRef, useEffect } from "react";

export function useDropdown() {
    // Control the Open and Close State of the Dropdown
    const[isOpen, setIsOpen] = useState(false);
    // Keep reference of the dropdown container 
    const ref = useRef<HTMLDivElement>(null);

    // to toggle the open and close state
    const toggle = ()=> setIsOpen((prev)=>!prev);
    // Close the Dropdown
    const close = ()=>setIsOpen(false);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          close(); //Closes the Dropdown when Clicked Outside
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  

  return {
    isOpen,
    toggle,
    close,
    ref,
  };
}
