import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { Section } from "../../../components/Section";
import { Language } from "./Language";
import { Metamask } from "./Metamask";

import LogoImgUrl from '../../../assets/imgs/logo.png';

export const Navbar = ({ navGradient, navClassName }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const menuToggler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", null);
    };
  });
  
  return (
    <Section
      id="header"
      className={clsx(navGradient && "gradient-bg", { scrolled })}
    >

      <NavLink to="/">
        <img
          className="logo"
          src={LogoImgUrl}
          alt="Crypto Tools"
          title="Crypto Tools"
        />
      </NavLink>

      <div className="hamburger" onClick={menuToggler}>
          <span></span>
          <span></span>
          <span></span>
        </div>

      <div className={clsx("menu-sm", isMenuActive && "active")}>

        <div className="close" onClick={menuToggler}>
          &times;
        </div>

        <div className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/crypto-tools">Tools</NavLink>
        </div>

        <div className="options">
          <Language />
          <Metamask />
        </div>

      </div>

    </Section>
  );
};
