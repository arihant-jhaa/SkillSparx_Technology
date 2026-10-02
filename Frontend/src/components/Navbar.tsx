import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Brand from "./Brand";

const navigation = [
  { label: "Approach", href: "#approach" },
  { label: "Classes", href: "#classes" },
  { label: "Stories", href: "#stories" },
  { label: "Membership", href: "#membership" },
  {
    label: "Programs",
    href: "#programs",
    dropdown: true,
    dropdownItems: [
      { label: "Tech & Data", href: "#tech-data" },
      { label: "Mechanics", href: "#mechanics" },
      { label: "Business", href: "#business" },
      { label: "Medical & Science", href: "#medical-science" },
      { label: "Design", href: "#design" },
      { label: "Other / Bootcamp", href: "#other-bootcamp" },
    ]
  },
  {
    label: "Pro Packs",
    href: "#pro-packs",
    dropdown: true,
    dropdownItems: [
      { label: "Value Packs", href: "#value-packs" },
      { label: "Golden Pass", href: "#golden-pass" },
      { label: "Mock Interviews", href: "#mock-interviews" },
      { label: "Placement Assistance", href: "#placement-assistance" },
    ]
  },
  {
    label: "Advanced Programs",
    href: "#advanced-programs",
    dropdown: true,
    dropdownItems: [
      { label: "Advanced Digital Marketing", href: "#advanced-digital-marketing" },
      { label: "Advanced Data Science", href: "#advanced-data-science" },
    ]
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement }>({});

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

  const handleDropdownClick = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleDropdownBlur = () => {
    setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <header className={`site-header ${scrolled || menuOpen ? "is-scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <div className="nav-inner page-container">
        <Brand onClick={closeMenu} />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => {
            if (item.dropdown && item.dropdownItems) {
              return (
                <div key={item.label} className="nav-dropdown" onMouseEnter={() => handleDropdownClick(item.label)} onMouseLeave={handleDropdownBlur}>
                  <a
                    className={`${active === item.href ? "nav-link is-active" : "nav-link"} ${openDropdown === item.label ? "is-open" : ""}`}
                    href={item.href}
                    aria-current={active === item.href ? "location" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.label}
                    onClick={(e) => {
                      if (window.innerWidth < 768) {
                        e.preventDefault();
                        handleDropdownClick(item.label);
                      }
                    }}
                  >
                    {item.label}
                    <ChevronDown size={16} strokeWidth={1.9} aria-hidden="true" />
                  </a>
                  <div
                    ref={(el) => { if (el) dropdownRefs.current[item.label] = el; }}
                    className={`dropdown-menu ${openDropdown === item.label ? "is-open" : ""}`}
                    role="menu"
                  >
                    {item.dropdownItems.map((subItem, subIndex) => (
                      <a
                        key={subItem.href}
                        href={subItem.href}
                        className="dropdown-item"
                        role="menuitem"
                        onClick={closeMenu}
                        style={{ transitionDelay: `${subIndex * 30}ms` }}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <a key={item.href} className={active === item.href ? "nav-link is-active" : "nav-link"} href={item.href} aria-current={active === item.href ? "location" : undefined}>
                {item.label}
              </a>
            );
          })}
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
            <div key={item.href} style={{ transitionDelay: menuOpen ? `${index * 55}ms` : "0ms" }}>
              {item.dropdown && item.dropdownItems ? (
                <>
                  <button onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)} className="mobile-nav-item">
                    <span className="mobile-nav-number">0{index + 1}</span>
                    {item.label}
                    <ChevronDown size={20} strokeWidth={1.6} aria-hidden="true" />
                  </button>
                  {openDropdown === item.label && menuOpen && (
                    <div className="mobile-dropdown-menu">
                      {item.dropdownItems.map((subItem, subIndex) => (
                        <a key={subItem.href} href={subItem.href} style={{ transitionDelay: `${subIndex * 10}ms` }} onClick={closeMenu}>
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a href={item.href} onClick={closeMenu} className="mobile-nav-item">
                  <span className="mobile-nav-number">0{index + 1}</span>
                  {item.label}
                  <ArrowUpRight size={25} strokeWidth={1.4} aria-hidden="true" />
                </a>
              )}
            </div>
          ))}
          <p>Make room for what comes next.</p>
        </div>
      </nav>
    </header>
  );
}