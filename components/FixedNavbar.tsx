import React from "react";
import AuthButton from "./AuthButton";

const FixedNavbar: React.FC = () => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <a href="/" className="transition-transform duration-200 hover:scale-110">
          Home
        </a>
        <a href="/courses" className="transition-transform duration-200 hover:scale-110">
          Courses
        </a>
        <a href="/questions" className="transition-transform duration-200 hover:scale-110">
          Questions
        </a>
        <AuthButton />
      </div>
    </nav>
  )
}

export default FixedNavbar;
