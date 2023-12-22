"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../darkMode/DarkModeToggle";
import logo from "../../../public/logo.png";
import { signOut, useSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "About",
    url: "/about",
  },
  {
    id: 3,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 4,
    title: "Blog",
    url: "/blog",
  },

  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const session = useSession();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image src={logo} alt="logo" className={styles.logo} />
      </Link>
      <div className={styles.mode}>
        <DarkModeToggle />
      </div>
      <div className={styles.togglebar} onClick={toggleDrawer}>
        <GiHamburgerMenu size={30} className={styles.menbar} />
      </div>

      <div
        className={`${styles.toggleNavbar} ${
          isDrawerOpen ? styles.toggleNavbarActive : styles.toggleNavbarInActive
        }`}
      >
        <RxCross1
          size={30}
          className={styles.toggleIcon}
          onClick={toggleDrawer}
        />
        <div className={styles.toggleLinks}>
          {links.map((link) => (
            <Link key={link.id} href={link.url} className={styles.toggleink}>
              {link.title}
            </Link>
          ))}
          {session.status === "authenticated" && (
            <button className={styles.logout} onClick={signOut}>
              Logout
            </button>
          )}
        </div>
      </div>

      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" && (
          <button className={styles.logout} onClick={signOut}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
