import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Brand from "./Brand";

const navigation = [
  { label: "Approach", href: "#approach" },
  { label: "Classes", href: "#classes" },
  { label: "Stories", href: "#stories" },
  { label: "Membership", href: "#membership" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 28);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-30% 0px -58% 0px" },
    );
    navigation.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", updateScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled || menuOpen ? "is-scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <div className="nav-inner page-container">
        <Brand onClick={closeMenu} />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} className={active === item.href ? "nav-link is-active" : "nav-link"} href={item.href} aria-current={active === item.href ? "location" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#classes">
          Find your class <ArrowUpRight size={16} strokeWidth={1.9} aria-hidden="true" />
        </a>
        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <div className="page-container mobile-nav-inner">
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu} style={{ transitionDelay: menuOpen ? `${index * 55}ms` : "0ms" }}>
              <span className="mobile-nav-number">0{index + 1}</span>
              {item.label}
              <ArrowUpRight size={25} strokeWidth={1.4} aria-hidden="true" />
            </a>
          ))}
          <p>Make room for what comes next.</p>
        </div>
      </nav>
    </header>
  );
}