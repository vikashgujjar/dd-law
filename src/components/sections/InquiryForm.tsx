"use client";

import { AnimatePresence, m } from "motion/react";
import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions";
import { contact } from "@/lib/content";
import { ChevronIcon, MailIcon } from "@/components/ui/Icons";

const initial: InquiryState = { status: "idle" };
const f = contact.fields;

export function InquiryForm() {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const err = state.errors ?? {};
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <m.div
        role="status"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[420px] flex-col items-center justify-center text-center"
      >
        <svg viewBox="0 0 64 64" className="draw h-16 w-16 text-gold" data-drawn="true" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden>
          <circle cx="32" cy="32" r="30" pathLength={1} />
          <path d="M20 33 L28 41 L45 24" pathLength={1} />
        </svg>
        <p className="mt-8 max-w-sm font-serif text-2xl leading-snug text-ivory">{state.message}</p>
      </m.div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-x-6 gap-y-7 sm:grid-cols-2" aria-describedby={state.message ? "form-status" : undefined}>
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Company <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field id="firstName" label={f.firstName.label} required error={err.firstName}>
        <input id="firstName" name="firstName" autoComplete="given-name" placeholder={f.firstName.placeholder} defaultValue={v.firstName} required {...aria("firstName", err.firstName)} className={inputCls} />
      </Field>
      <Field id="lastName" label={f.lastName.label} required error={err.lastName}>
        <input id="lastName" name="lastName" autoComplete="family-name" placeholder={f.lastName.placeholder} defaultValue={v.lastName} required {...aria("lastName", err.lastName)} className={inputCls} />
      </Field>
      <Field id="email" label={f.email.label} required error={err.email} full>
        <div className="relative">
          <MailIcon className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" />
          <input id="email" name="email" type="email" autoComplete="email" placeholder={f.email.placeholder} defaultValue={v.email} required {...aria("email", err.email)} className={`${inputCls} pl-7`} />
        </div>
      </Field>
      <Field id="contactMethod" label={f.contactMethod.label}>
        <Select id="contactMethod" placeholder={f.contactMethod.placeholder} options={f.contactMethod.options} defaultValue={v.contactMethod} />
      </Field>
      <Field id="phone" label={f.phone.label} required error={err.phone}>
        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder={f.phone.placeholder} defaultValue={v.phone} required {...aria("phone", err.phone)} className={inputCls} />
      </Field>
      <Field id="issue" label={f.issue.label} required error={err.issue} full>
        <Select id="issue" placeholder={f.issue.placeholder} options={f.issue.options} defaultValue={v.issue} required invalid={!!err.issue} />
      </Field>

      <div className="sm:col-span-2">
        <AnimatePresence>
          {state.message && (
            <m.p id="form-status" role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-4 text-sm text-[#f0b7a4]">
              {state.message}
            </m.p>
          )}
        </AnimatePresence>
        <button
          type="submit"
          disabled={pending}
          className="group relative isolate mt-2 w-full overflow-hidden bg-gold py-5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-navy transition-opacity disabled:opacity-60"
        >
          <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-ivory transition-transform duration-700 ease-lux group-hover:scale-x-100" />
          {pending ? "Sending…" : contact.submit}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "peer w-full border-0 border-b border-ivory/20 bg-transparent px-0 py-3 text-[1rem] text-ivory placeholder:text-ivory/35 transition-colors focus:border-gold focus:outline-none focus:ring-0 aria-[invalid=true]:border-[#e08f74]";

function aria(id: string, error?: string) {
  return { "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined };
}

function Field({ id, label, required, error, full, children }: { id: string; label: string; required?: boolean; error?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={`group relative ${full ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id} className="block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-ivory/60 transition-colors group-focus-within:text-gold">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      <div className="relative">
        {children}
        <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-lux group-focus-within:scale-x-100" />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-[#f0b7a4]">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({ id, placeholder, options, defaultValue, required, invalid }: { id: string; placeholder: string; options: string[]; defaultValue?: string; required?: boolean; invalid?: boolean }) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        required={required}
        defaultValue={defaultValue ?? ""}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
        className={`${inputCls} cursor-pointer appearance-none pr-8 [&:has(option[value='']:checked)]:text-ivory/35 [&>option]:bg-navy [&>option]:text-ivory`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronIcon className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
    </div>
  );
}
