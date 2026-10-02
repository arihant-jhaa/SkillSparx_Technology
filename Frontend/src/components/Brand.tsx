type BrandProps = {
  light?: boolean;
  large?: boolean;
  onClick?: () => void;
};

export default function Brand({ light = false, large = false, onClick }: BrandProps) {
  return (
    <a className={`brand ${light ? "brand-light" : ""} ${large ? "brand-large" : ""}`} href="#top" onClick={onClick} aria-label="SkillSparx Technology home">
      <img
        src="/SkillSparx_Logo.png"
        alt="SkillSparx Technology"
        className="brand-symbol brand-symbol-img"
        style={{ display: "block", width: 85, height: 85, borderRadius: 6, objectFit: "contain", background: "transparent", flexShrink: 0, border: "none", padding: 0 }}
      />
      <div className="brand-text">
        <span>SkillSparx</span>
        <span className="brand-technology">Technology</span>
      </div>
    </a>
  );
}