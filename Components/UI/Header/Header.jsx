"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { headerLinks } from "@/utils/headerLinks";
import styles from "./Header.module.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <>
      {menuOpen && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close navigation backdrop"
          tabIndex={-1}
          onClick={() => {
            setMenuOpen(false);
            toggleRef.current?.focus();
          }}
        />
      )}
    <header className={styles.header} ref={headerRef}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="Fern Cleaning home" onClick={() => setMenuOpen(false)}>
          <Image src="/logo.png" width={90} height={52} alt="Fern Cleaning" />
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
        </button>
        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={`${styles.navigation} ${menuOpen ? styles.open : ""}`}
          onBlur={(event) => {
            if (!headerRef.current?.contains(event.relatedTarget)) setMenuOpen(false);
          }}
        >
          <ul className={styles.links}>
            {headerLinks.map((item) => {
              const active = !item.url.includes("#") && pathname === item.url;
              return (
                <li key={item.url}>
                  <Link
                    href={item.url}
                    className={`${styles.link} ${active ? styles.active : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/get-free-quote" className={styles.quote} onClick={() => setMenuOpen(false)}>
            Get Your Free Quote
          </Link>
        </nav>
      </div>
    </header>
    </>
  );
}
