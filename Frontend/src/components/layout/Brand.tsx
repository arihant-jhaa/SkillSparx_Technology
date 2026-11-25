type BrandProps = {
  light?: boolean;
  large?: boolean;
  onClick?: () => void;
  homeHref?: string;
};

export default function Brand({ light = false, large = false, onClick, homeHref = "#top" }: BrandProps) {
  return (
    <a className={`brand ${light ? "brand-light" : ""} ${large ? "brand-large" : ""}`} href={homeHref} onClick={onClick} aria-label="SkillSparx Technology home">
      <img
        src="/SkillSparx_Logo.png"
        alt="SkillSparx Technology"
        className="brand-symbol brand-symbol-img"
        style={{ display: "block", width: 70,marginTop: 8, height: 70, borderRadius: 6, objectFit: "contain", background: "transparent", flexShrink: 0, border: "none", padding: 0 }}
      />
      <div className="brand-text">
        <span>SkillSparx</span>
        <span className="brand-technology">Technology</span>
      </div>
    </a>
  );
}
