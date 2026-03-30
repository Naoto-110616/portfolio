"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

import { contactSchema, type ContactFormValues } from "@/lib/contact/schema";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  message: "",
};

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields = useMemo(
    () => [
      { key: "name", label: "お名前", type: "text", placeholder: "山田 太郎" },
      {
        key: "email",
        label: "メールアドレス",
        type: "email",
        placeholder: "hello@example.com",
      },
      { key: "company", label: "会社名", type: "text", placeholder: "Zexora Inc." },
    ] as const,
    [],
  );

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        company: fieldErrors.company?.[0],
        message: fieldErrors.message?.[0],
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "送信に失敗しました。");
      }

      setStatus(data.message ?? "お問い合わせを送信しました。");
      setValues(initialValues);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "送信に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/40 p-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Resend</p>
        <h2 className="text-2xl font-semibold text-white">Contact form starter</h2>
        <p className="text-sm leading-6 text-slate-300">
          デザインだけ差し替えれば使えるように、問い合わせ API と送信フローをすぐ確認できるフォームを同梱しています。
        </p>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-3">
          {fields.map((field) => (
            <label key={field.key} className="space-y-2">
              <span className="text-sm text-slate-200">{field.label}</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300"
                name={field.key}
                type={field.type}
                value={values[field.key]}
                onChange={handleChange}
                placeholder={field.placeholder}
              />
              {errors[field.key] ? (
                <span className="text-xs text-rose-200">{errors[field.key]}</span>
              ) : null}
            </label>
          ))}
        </div>

        <label className="block space-y-2">
          <span className="text-sm text-slate-200">お問い合わせ内容</span>
          <textarea
            className="min-h-40 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300"
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="導入したい機能や、デザイン実装で使いたい構成を入力してください。"
          />
          {errors.message ? <span className="text-xs text-rose-200">{errors.message}</span> : null}
        </label>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <button
            className="inline-flex min-w-44 items-center justify-center rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-400"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send inquiry"}
          </button>

          <p className="text-sm text-slate-400">
            Resend のキー未設定時は API がエラーを返し、設定漏れにすぐ気づけます。
          </p>
        </div>

        {status ? (
          <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
            {status}
          </p>
        ) : null}
      </form>
    </section>
  );
}
