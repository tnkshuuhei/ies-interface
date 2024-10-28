"use client";
import React, { useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ExternalLink, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { href: "/register", label: "Register" },
    {
      href: `https://www.tally.xyz/gov/${process.env.NEXT_PUBLIC_TALLY}/`,
      label: "Governance",
      newTab: true,
    },
    {
      href: "https://app.splits.org/accounts/0xd492DF1E59a3e14C986E3b5C00F8f2762AbE0BEF/?chainId=11155111",
      label: "Liquid Splits",
      newTab: true,
    },
    {
      href: "https://sepolia.easscan.org/schema/view/0x2989a5fa235ab527276c3373cabedd103f7fc97d672ce1baa06e2136f8f1d1bb",
      label: "Attestation",
      newTab: true,
    },
    {
      href: "https://github.com/tnkshuuhei/ies-contracts",
      label: "GitHub",
      newTab: true,
    },
  ];

  return (
    <nav className="border-gray-200 px-4 lg:px-6 py-5 bg-white">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/ies-logo.png"
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <ConnectButton />
          <button
            onClick={toggleMenu}
            type="button"
            className="ml-3 inline-flex items-center p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:w-auto">
          <ul className="flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  target={item.newTab ? "_blank" : ""}
                  rel={item.newTab ? "noopener noreferrer" : ""}
                  className="text-gray-700 hover:text-primary-700 transition-colors duration-200"
                >
                  <div className="flex flex-row items-center">
                    {item.label}
                    {item.newTab && (
                      <ExternalLink size={16} className="inline-block ml-1" />
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop ConnectButton */}
        <div className="hidden lg:flex items-center">
          <ConnectButton />
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"} lg:hidden w-full mt-4`}
          id="mobile-menu"
        >
          <ul className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block text-gray-700 hover:text-primary-700 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex flex-row items-center">
                    {item.label}
                    {item.newTab && (
                      <ExternalLink size={16} className="inline-block ml-1" />
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
