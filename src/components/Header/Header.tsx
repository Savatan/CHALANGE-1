"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScrollToForm = () => {
    const el = document.getElementById('appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleAccessibility = () => {
    document.documentElement.classList.toggle('accessible-mode');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!navRef.current) return;
      if (navRef.current.contains(event.target as Node)) return;

      setIsServicesOpen(false);
      setIsAboutOpen(false);
      setIsMobileMenuOpen(false);
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const updateLayout = () => {
      if (typeof window === 'undefined') return;
      const isMobile = window.innerWidth <= 768;
      setIsMobileLayout(isMobile);
      if (!isMobile) {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
        setIsAboutOpen(false);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.container}>
          <button
            type="button"
            className={styles.accessibilityBtn}
            onClick={handleToggleAccessibility}
          >
            <img
              src="/images/glasses.png" 
              alt=""
              className={styles.topIcon}
            />
            <span>Версия для слабовидящих</span>
          </button>
          <a href="#" className={styles.topLink}>
            <img
              src="/images/max.png" 
              alt=""
              className={styles.topIcon}
            />
            <span>Канал – MAX</span>
          </a>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <span className={styles.brand}>ПРЕМЬЕРА</span>
            <div className={styles.logoText}>
              <span className={styles.subtitle}>премиальная</span>
              <span className={styles.title}>стоматология</span>
            </div>
          </Link>
          <div className={styles.navWrapper}>
            {isMobileLayout && (
              <button
                type="button"
                className={styles.burger}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                <span className={styles.burgerLine} />
                <span className={styles.burgerLine} />
                <span className={styles.burgerLine} />
              </button>
            )}

            <nav
              className={`${styles.nav} ${
                isMobileLayout ? styles.navMobile : ''
              } ${isMobileLayout && isMobileMenuOpen ? styles.navMobileOpen : ''}`}
              ref={navRef}
            >
              <div className={styles.navItem}>
                <button
                  type="button"
                  className={styles.dropdownBtn}
                  onClick={() => setIsServicesOpen((prev) => !prev)}
                >
                  <span>Услуги</span>
                  <span
                    className={`${styles.arrow} ${
                      isServicesOpen ? styles.arrowOpen : ''
                    }`}
                  >
                    ▾
                  </span>
                </button>
                {isServicesOpen && (
                  <div className={styles.dropdown}>
                    <a href="#">Терапия</a>
                    <a href="#">Имплантация</a>
                    <a href="#">Ортодонтия</a>
                  </div>
                )}
              </div>

              <div className={styles.navItem}>
                <button
                  type="button"
                  className={styles.dropdownBtn}
                  onClick={() => setIsAboutOpen((prev) => !prev)}
                >
                  <span>О клинике</span>
                  <span
                    className={`${styles.arrow} ${
                      isAboutOpen ? styles.arrowOpen : ''
                    }`}
                  >
                    ▾
                  </span>
                </button>
                {isAboutOpen && (
                  <div className={styles.dropdown}>
                    <a href="#">История</a>
                    <a href="#">Оборудование</a>
                    <a href="#">Документы</a>
                  </div>
                )}
              </div>

              <a href="#">Команда</a>
              <a href="#">Цены</a>
              <a href="#">Результаты работ</a>
              <a href="#">Акции</a>
              <a href="#">Контакты</a>
            </nav>
          </div>

          <div className={styles.actions}>
            {!isMobileLayout && (
              <span className={styles.phone}>+7 (423) 265-89-50</span>
            )}
            <button className={styles.button} type="button" onClick={handleScrollToForm}>
              <img
                src="/images/Frame.png" 
                alt=""
                className={styles.buttonIcon}
              />
              <span>Записаться</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
