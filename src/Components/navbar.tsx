"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavbarProps {
  userRole: string | null; // The role of the user
  isLoggedIn: boolean; // Indicates if the user is logged in
  logout: () => void; // Function to handle logout
}

const Navbar: React.FC<NavbarProps> = ({ userRole, isLoggedIn, logout }) => {
  
  const router = useRouter();
  // Handle logout
  const handleLogout = () => {
    logout();
    router.push("/"); // Redirect to home page
  };

  return (
    <nav>
      <div className="max-w mx-auto px-4 py-4">
        <div className="flex justify-center items-center gap-x-8">
          {/* Navigation Links */}
          <Link
            href="/"
            className="hover:text-gray-200 text-lg font-medium transition duration-300"
          >
            Home
          </Link>
          {userRole === "Admin" && (
            <p className="hover:text-gray-200 text-lg font-medium transition duration-300">
              Admin
            </p>
          )}
          {userRole === "User" && (
            <p className="hover:text-gray-200 text-lg font-medium transition duration-300">
              User
            </p>
          )}
          {userRole === "Developer" && (
            <p className="hover:text-gray-200 text-lg font-medium transition duration-300">
              Developer
            </p>
          )}

          {/* Login/Register or Logout */}
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="hover:text-gray-200 text-lg font-medium transition duration-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hover:text-gray-200 text-lg font-medium transition duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-gray-200 text-lg font-medium transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
