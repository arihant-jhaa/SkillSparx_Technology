const WHATSAPP_NUMBER = "917488491572";

export type WhatsAppMessageType = "general" | "enrollment" | "course-enquiry";

export function getWhatsAppMessage(type: WhatsAppMessageType, courseName?: string): string {
  if (type === "enrollment") {
    return `Hello SkillSparx Technology Team,\n\nI am interested in enrolling in the ${courseName ?? ""} course.\n\nPlease share the enrollment process, fees, batch details, and other relevant information.\n\nThank you.`;
  }
  if (type === "course-enquiry") {
    return `Hello SkillSparx Technology Team,\n\nI have an enquiry about the ${courseName ?? ""} course. Please share the course details and enrollment information.\n\nThank you.`;
  }
  return "Hello SkillSparx Technology Team,\n\nI am interested in your courses and would like to know more about the available programs, fees, schedules, and enrollment process.\n\nPlease assist me with the details.\n\nThank you.";
}

export function buildWhatsAppUrl(type: WhatsAppMessageType = "general", courseName?: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(getWhatsAppMessage(type, courseName))}`;
}
