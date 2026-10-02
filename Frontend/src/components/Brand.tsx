type BrandProps = {
  light?: boolean;
  large?: boolean;
  onClick?: () => void;
};

export default function Brand({ light = false, large = false, onClick }: BrandProps) {
  return (
    <a className={`brand ${light ? "brand-light" : ""} ${large ? "brand-large" : ""}`} href="#top" onClick={onClick} aria-label="SkillSparx Technology home">
      <svg className="brand-symbol" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <path d="M3 31V16.5C3 9.04 9.04 3 16.5 3H31V17.5C31 24.96 24.96 31 17.5 31H3Z" fill="currentColor" />
        <path d="M3 31 31 3M16.5 3v14.5H31" stroke="var(--brand-cut, #F6F5F1)" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <div className="brand-text">
        <span>SkillSparx</span>
        <span className="brand-technology">Technology</span>
      </div>
    </a>
  );
}