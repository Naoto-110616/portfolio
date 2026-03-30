import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .transform((value) => value || undefined)
  .optional();

export const contactSchema = z.object({
  name: z.string().trim().min(2, "お名前は2文字以上で入力してください。"),
  email: z.email("メールアドレスの形式が正しくありません。"),
  company: optionalText,
  message: z.string().trim().min(10, "お問い合わせ内容は10文字以上で入力してください。"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
