import type { CSSProperties, ReactNode } from "react";
import { buildWhatsAppUrl, type WhatsAppMessageType } from "../utils/whatsapp";

type Props = {
  type?: WhatsAppMessageType;
  courseName?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  "aria-label"?: string;
};

export default function WhatsAppLink({ type = "general", courseName, className, children, onClick, ...ariaProps }: Props) {
  return (
    <a className={className} href={buildWhatsAppUrl(type, courseName)} target="_blank" rel="noopener noreferrer" onClick={onClick} {...ariaProps}>
      {children}
    </a>
  );
}
