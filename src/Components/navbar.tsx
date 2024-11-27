"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null); // User role
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const router = useRouter();

  // Fetch user role and login state from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodeToken = (token: string) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(window.atob(base64));
      };
      const decoded = decodeToken(token);
      setUserRole(decoded.role); // Set role from token
      setIsLoggedIn(true); // Mark as logged in
    } else {
      setIsLoggedIn(false); // Mark as logged out
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    router.push("/");
  };

  return (
    <nav>
      <div className="max-w mx-auto px-4 py-4">
        {/* Flex container with gap */}
        <div className="flex justify-center items-center gap-x-8">
          {/* Navigation Links */}
          <Link
            href="/"
            className="hover:text-gray-200 text-lg font-medium transition duration-300"
          >
            Home
          </Link>
          {userRole === "Admin" && (
            
            <p
            className="hover:text-gray-200 text-lg font-medium transition duration-300"
          >
            Admin
          </p>
          )}
          {userRole === "User" && (
            <p
              className="hover:text-gray-200 text-lg font-medium transition duration-300"
            >
              User
            </p>
          )}
          {userRole === "Developer" && (
            <p
              className="hover:text-gray-200 text-lg font-medium transition duration-300"
            >
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
