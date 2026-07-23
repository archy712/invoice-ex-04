"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { contactFormSchema, type ContactFormValues } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"

const roleOptions = [
  { value: "developer", label: "개발자" },
  { value: "designer", label: "디자이너" },
  { value: "pm", label: "기획자" },
  { value: "other", label: "기타" },
] as const

export function ContactForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      notifications: true,
    },
  })

  async function onSubmit(values: ContactFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    toast.success("문의가 접수되었습니다", {
      description: `${values.name}님, 빠르게 답변드리겠습니다.`,
    })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="contact-name">이름</FieldLabel>
          <Input id="contact-name" placeholder="홍길동" {...register("name")} />
          <FieldError errors={errors.name ? [errors.name] : undefined} />
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="contact-email">이메일</FieldLabel>
          <Input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          <FieldError errors={errors.email ? [errors.email] : undefined} />
        </Field>

        <Field data-invalid={!!errors.role}>
          <FieldLabel htmlFor="contact-role">역할</FieldLabel>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select value={field.value ?? null} onValueChange={field.onChange}>
                <SelectTrigger id="contact-role" className="w-full">
                  <SelectValue placeholder="역할을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={errors.role ? [errors.role] : undefined} />
        </Field>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="contact-message">메시지</FieldLabel>
          <Textarea
            id="contact-message"
            placeholder="문의 내용을 입력해주세요"
            {...register("message")}
          />
          <FieldDescription>최소 10자 이상 작성해주세요.</FieldDescription>
          <FieldError errors={errors.message ? [errors.message] : undefined} />
        </Field>

        <Field orientation="horizontal">
          <FieldLabel htmlFor="contact-notifications" className="flex-1">
            이메일 알림 받기
            <FieldDescription>답변이 등록되면 이메일로 알려드립니다.</FieldDescription>
          </FieldLabel>
          <Controller
            control={control}
            name="notifications"
            render={({ field }) => (
              <Switch
                id="contact-notifications"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </Field>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          문의 보내기
        </Button>
      </FieldGroup>
    </form>
  )
}
