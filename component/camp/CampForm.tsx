"use client";

import { useRef, useState } from "react";
import { CAMP, PAIN_AREAS, type PainArea } from "./data";
import styles from "./camp.module.css";
import { useCampBooking } from "./use-camp-booking";
import { useCampLang } from "./use-camp-lang";

const VALID_PHONE = /^[6-9]\d{9}$/;

// Keeps digits only and drops a pasted +91 / 91 prefix, so autofill can't push the number over 10 digits.
function cleanPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return (digits.length > 10 && digits.startsWith("91") ? digits.slice(2) : digits).slice(0, 10);
}

export default function CampForm() {
  const { copy } = useCampLang();
  const { status, error, book } = useCampBooking();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [painArea, setPainArea] = useState<PainArea>(PAIN_AREAS[0]);
  const [invalid, setInvalid] = useState({ name: false, phone: false });
  const nameInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);

  const busy = status !== "idle";
  const payLabel = status === "opening" ? copy.paying : status === "confirming" ? copy.confirming : copy.pay;

  const submit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const nextInvalid = { name: !trimmedName, phone: !VALID_PHONE.test(phone) };
    setInvalid(nextInvalid);
    if (nextInvalid.name) return nameInput.current?.focus();
    if (nextInvalid.phone) return phoneInput.current?.focus();
    book({ name: trimmedName, phone, painArea });
  };

  return (
    <div className={styles.slip}>
      <div className={styles.slipBody}>
        <h2 className={styles.formTitle}>{copy.formTitle}</h2>
        <form id="camp-form" onSubmit={submit} noValidate>
          <input type="hidden" name="camp_location" value={CAMP.loc.en} />

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="camp-name">{copy.nameLabel}</label>
              <input
                ref={nameInput}
                id="camp-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                aria-invalid={invalid.name}
                aria-describedby={invalid.name ? "camp-name-error" : undefined}
                onChange={(e) => {
                  setName(e.target.value);
                  setInvalid((v) => ({ ...v, name: false }));
                }}
              />
              {invalid.name && (
                <p className={styles.fieldError} id="camp-name-error">
                  {copy.nameError}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="camp-phone">{copy.phoneLabel}</label>
              <input
                ref={phoneInput}
                id="camp-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                required
                value={phone}
                aria-invalid={invalid.phone}
                aria-describedby={invalid.phone ? "camp-phone-error" : undefined}
                onChange={(e) => {
                  setPhone(cleanPhone(e.target.value));
                  setInvalid((v) => ({ ...v, phone: false }));
                }}
              />
              {invalid.phone && (
                <p className={styles.fieldError} id="camp-phone-error">
                  {copy.phoneError}
                </p>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="camp-pain">{copy.painLabel}</label>
            <select id="camp-pain" name="pain_area" value={painArea} onChange={(e) => setPainArea(e.target.value as PainArea)}>
              {PAIN_AREAS.map((area) => (
                <option key={area} value={area}>
                  {copy.painOptions[area]}
                </option>
              ))}
            </select>
          </div>

          <button className={`${styles.btn} ${styles.btnFull}`} type="submit" disabled={busy} aria-busy={busy}>
            {busy && <span className={styles.spinner} aria-hidden="true" />}
            {payLabel}
          </button>

          {error && (
            <p className={styles.formError} role="alert">
              {copy.errors[error]}
            </p>
          )}
        </form>
      </div>
      <div className={styles.tear} aria-hidden="true" />
      <p className={styles.slipFine}>{copy.fine}</p>
    </div>
  );
}
