import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Brand from "./Brand";
import Modal from "./Modal";

const footerGroups = [
  { title: "PRODUCT", links: [{ label: "The approach", href: "#approach" }, { label: "All classes", href: "#classes" }, { label: "Membership", href: "#membership" }] },
  { title: "RESOURCES", links: [{ label: "Our story", href: "#manifesto" }, { label: "Maker stories", href: "#stories" }, { label: "Community", href: "#community" }] },
  { title: "COMPANY", links: [{ label: "About unfold.", href: "#manifesto" }, { label: "Say hello", href: "mailto:hello@unfold.school" }, { label: "Our letter", href: "#newsletter" }] },
  { title: "SOCIAL", links: [{ label: "Instagram", href: "https://www.instagram.com/" }, { label: "LinkedIn", href: "https://www.linkedin.com/" }, { label: "YouTube", href: "https://www.youtube.com/" }] },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [legal, setLegal] = useState<"Terms" | "Privacy" | null>(null);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const address = email.trim();
    if (!address) return;
    const subject = encodeURIComponent("Join the unfold. letter");
    const body = encodeURIComponent(`Please add ${address} to the unfold. letter.`);
    window.location.href = `mailto:hello@unfold.school?subject=${subject}&body=${body}`;
    setStatus("Your email app is opening. Send the drafted message to join.");
  };

  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-top">
          <div className="footer-brand-block">
            <Brand light large />
            <p>A creative school for people becoming what's next.</p>
          </div>
          <div id="newsletter" className="footer-newsletter">
            <h2>Good things in your inbox.</h2>
            <p>Ideas, inspiration, and the occasional note from the studio.</p>
            <form onSubmit={handleSubscribe}>
              <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
              <input id="newsletter-email" type="email" required autoComplete="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} />
              <button type="submit" aria-label="Open email app to join the unfold. letter"><ArrowRight size={22} strokeWidth={1.7} /></button>
            </form>
            {status && <p className="newsletter-status" role="status">{status}</p>}
          </div>
        </div>

        <div className="footer-middle">
          <p className="footer-signoff">Stay curious.<br />Keep making.</p>
          <div className="footer-link-groups">
            {footerGroups.map((group) => (
              <div className="footer-link-group" key={group.title}>
                <h3>{group.title}</h3>
                {group.links.map((link) => (
                  <a key={link.label} href={link.href} target={link.href.startsWith("https://") ? "_blank" : undefined} rel={link.href.startsWith("https://") ? "noreferrer" : undefined}>
                    {link.label}{link.href.startsWith("https://") && <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden="true" />}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="footer-giant" aria-hidden="true">unfold<span>.</span></div>
        <div className="footer-bottom"><span>&copy; {new Date().getFullYear()} unfold. All rights reserved.</span><span>Made for the makers.</span><div><button type="button" onClick={() => setLegal("Terms")}>Terms</button><button type="button" onClick={() => setLegal("Privacy")}>Privacy</button></div></div>
      </div>

      <Modal open={legal !== null} onClose={() => setLegal(null)} labelledBy="legal-dialog-title" className="legal-dialog">
        {legal && <div className="legal-content">
          <p className="eyebrow eyebrow-purple">THE FINE PRINT</p>
          <h2 id="legal-dialog-title">{legal}</h2>
          {legal === "Privacy" ? (
            <p>This website does not use tracking cookies or store the email entered in the update form. That form opens your email application with a drafted message, which you choose whether to send. If you have a privacy question, write to hello@unfold.school.</p>
          ) : (
            <p>Class and membership details are presented for exploration. Membership enquiries open your email application, and no payments are collected through this website. Please contact hello@unfold.school with any questions.</p>
          )}
        </div>}
      </Modal>
    </footer>
  );
}