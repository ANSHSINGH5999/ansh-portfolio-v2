import { profile } from "@/data/resume";

/** Builds a minimal vCard 3.0 file from the resume data and triggers a
 * browser download — lets a recruiter "Save Contact" in one click instead
 * of retyping details off the page. */
export function downloadVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${profile.name.split(" ").reverse().join(";")};;;`,
    `FN:${profile.name}`,
    `TITLE:${profile.role}`,
    `EMAIL;TYPE=INTERNET:${profile.email}`,
    `TEL;TYPE=CELL:${profile.phone}`,
    `URL:${profile.github}`,
    `ADR;TYPE=HOME:;;${profile.location};;;;`,
    "END:VCARD",
  ];

  const blob = new Blob([lines.join("\r\n")], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${profile.name.replace(/\s+/g, "-")}.vcf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
