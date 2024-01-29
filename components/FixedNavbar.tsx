import React from "react";
import AuthButton from "./AuthButton";

const FixedNavbar: React.FC = () => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <a href="/courses">
          Courses
        </a>
        <AuthButton />
      </div>
    </nav>
  )
}

export default FixedNavbar;
