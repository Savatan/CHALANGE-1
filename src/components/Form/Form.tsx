"use client";

import { FormEvent, useState } from "react";
import styles from "./Form.module.scss";

type FormFields = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};

type Status = "idle" | "sending" | "success" | "error";

const PHONE_PATTERN = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (!digits) return '';

  let rest = digits;
  if (rest.startsWith('8')) rest = '7' + rest.slice(1);
  if (!rest.startsWith('7')) rest = '7' + rest;

  const p1 = rest.slice(1, 4);
  const p2 = rest.slice(4, 7);
  const p3 = rest.slice(7, 9);
  const p4 = rest.slice(9, 11);

  let result = '+7';
  if (p1) {
    result += ` (${p1}`;
    if (p1.length === 3) result += ')';
  }
  if (p2) {
    result += p1.length === 3 ? ` ${p2}` : p2;
  }
  if (p3) {
    result += `-${p3}`;
  }
  if (p4) {
    result += `-${p4}`;
  }

  return result;
};

export default function Form() {
  const [fields, setFields] = useState<FormFields>({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);

  const handleChange = (field: keyof FormFields) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
      setServerMessage(null);
    };

  const handlePhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formatted = formatPhone(event.target.value);
    setFields((prev) => ({ ...prev, phone: formatted }));
    setErrors((prev) => ({ ...prev, phone: undefined }));
    setServerMessage(null);
  };

  const handleConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConsentGiven(event.target.checked);
    setServerMessage(null);
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormFields, string>> = {};

    if (!fields.name.trim()) {
      newErrors.name = "Поле обязательно";
    }

    if (!fields.phone.trim()) {
      newErrors.phone = "Поле обязательно";
    } else if (!PHONE_PATTERN.test(fields.phone.trim())) {
      newErrors.phone = "Формат: +7 (999) 123-45-67";
    }

    if (!fields.email.trim()) {
      newErrors.email = "Поле обязательно";
    } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
      newErrors.email = "Введите корректный email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validate()) return;

    if (!consentGiven) {
      setServerMessage("Поставьте галочку, чтобы подтвердить согласие.");
      setStatus("error");
      return;
    }

    try {
      setStatus("sending");
      setServerMessage(null);

      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setServerMessage("Заявка успешно отправлена");
      setFields({ name: "", phone: "", email: "", comment: "" });
    } catch {
      setStatus("error");
      setServerMessage("Произошла ошибка. Попробуйте ещё раз.");
    }
  };

  return (
    <section className={styles.section} id="appointment">
      <div className={styles.bgImage} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.info}>
          <h2 className={styles.title}>Запишитесь к нам на приём</h2>
          <p className={styles.text}>
            Оставьте заявку, и администратор свяжется с вами, чтобы подобрать
            удобное время приёма и ответить на вопросы.
          </p>
        </div>

        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Имя*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={styles.input}
                placeholder="Ваше имя"
                value={fields.name}
                onChange={handleChange("name")}
              />
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="phone">
                Телефон*
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={styles.input}
                placeholder="+7 (999) 123-45-67"
                value={fields.phone}
                onChange={handlePhoneChange}
              />
              {errors.phone && (
                <span className={styles.error}>{errors.phone}</span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="E-mail"
                value={fields.email}
                onChange={handleChange("email")}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>

            <div className={`${styles.field} ${styles.commentField}`}>
              <label className={styles.label} htmlFor="comment">
                Комментарий
              </label>
              <textarea
                id="comment"
                name="comment"
                className={styles.textarea}
                placeholder="Сообщение"
                value={fields.comment}
                onChange={handleChange("comment")}
              />
            </div>

            <div className={styles.footerRow}>
              <button
                type="submit"
                className={styles.submit}
                disabled={status === "sending" || !consentGiven}
              >
                {status === "sending" ? "Отправляем..." : "Отправить заявку"}
              </button>

              <div className={styles.consentBlock}>
                <label className={styles.consentLabel}>
                  <input
                    type="checkbox"
                    className={styles.consentCheckbox}
                    checked={consentGiven}
                    onChange={handleConsentChange}
                  />
                  <span className={styles.consentText}>
                    <span>Заполняя и отправляя данную форму</span>
                    <span>я соглашаюсь на обработку персональных данных</span>
                    <span>в соответствии с политикой конфиденциальности сервиса</span>
                  </span>
                </label>
              </div>

              {serverMessage && (
                <span
                  className={`${styles.status} ${
                    status === "success" ? styles.statusSuccess : styles.statusError
                  }`}
                >
                  {serverMessage}
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
