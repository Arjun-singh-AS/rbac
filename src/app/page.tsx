"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Basichome from "../Components/basichome"
import Users from "@/Components/admin";
import AddMessage from "@/Components/developer";
import DisplayMessages from "@/Components/user";
import Navbar from "@/Components/navbar"

export default function Home() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateAuthState = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodeToken = (token: string) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(window.atob(base64));
      };
      const decoded = decodeToken(token);
      setUserRole(decoded.role);
      setIsLoggedIn(true);
    } else {
      setUserRole(null);
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserRole(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    updateAuthState();

    // Listen for changes to the token
    const handleStorageChange = () => {
      updateAuthState();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
    <Navbar userRole={userRole} isLoggedIn={isLoggedIn} logout={logout} />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      {userRole === "Admin" ? (
        <Users/>
      ) : userRole === "User" ? (
        <DisplayMessages/>
        // <div>
        //   <h1 className="text-2xl font-bold">Welcome, User!</h1>
        //   <p className="mt-4">
        //     Check out your <Link href="/user">Profile</Link>.
        //   </p>
        // </div>
      ) : userRole === "Developer" ? (
        <AddMessage/>
        // <div>
        //   <h1 className="text-2xl font-bold">Welcome, Developer!</h1>
        //   <p className="mt-4">
        //     Access your <Link href="/developer">Developer Dashboard</Link>.
        //   </p>
        // </div>
      ) : (
        <Basichome/>
      )}
    </div>
    </>
  );
}
