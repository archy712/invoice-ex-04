import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "이름은 2자 이상이어야 합니다." }),
  email: z.string().email({ message: "올바른 이메일 주소를 입력해주세요." }),
  role: z.enum(["developer", "designer", "pm", "other"], {
    message: "역할을 선택해주세요.",
  }),
  message: z
    .string()
    .min(10, { message: "메시지는 10자 이상 입력해주세요." })
    .max(500, { message: "메시지는 500자를 넘을 수 없습니다." }),
  notifications: z.boolean(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
