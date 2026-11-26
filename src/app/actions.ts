"use server";

import { contact } from "@/lib/content";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"firstName" | "lastName" | "email" | "phone" | "issue", string>>;
  values?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    firstName: get("firstName"),
    lastName: get("lastName"),
    email: get("email"),
    contactMethod: get("contactMethod"),
    phone: get("phone"),
    issue: get("issue"),
  };

  // Honeypot: bots fill hidden fields.
  if (get("company")) return { status: "success", message: "Thank you." };

  const errors: InquiryState["errors"] = {};
  if (!values.firstName) errors.firstName = "Please enter your first name.";
  if (!values.lastName) errors.lastName = "Please enter your last name.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number.";
  if (!contact.fields.issue.options.includes(values.issue)) errors.issue = "Please select the type of issue.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Please review the highlighted fields.", errors, values };
  }

  // TODO: deliver the inquiry (e.g. email via Resend/SMTP or a CRM webhook).
  // Never log personal details in production.

  return {
    status: "success",
    message: "Thank you. Your confidential inquiry has been received — a member of our team will be in touch shortly.",
  };
}
