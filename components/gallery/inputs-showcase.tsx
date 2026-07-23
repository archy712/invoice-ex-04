"use client"

import { useState } from "react"

import { ShowcaseSection } from "@/components/gallery/showcase-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const

export function InputsShowcase() {
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ShowcaseSection title="Button" description="variant / size 조합">
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </ShowcaseSection>

      <ShowcaseSection title="Input / Label">
        <div className="w-full space-y-1.5">
          <Label htmlFor="showcase-input">이메일</Label>
          <Input id="showcase-input" placeholder="you@example.com" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Textarea">
        <Textarea placeholder="메시지를 입력하세요" className="w-full" />
      </ShowcaseSection>

      <ShowcaseSection title="Checkbox">
        <div className="flex items-center gap-2">
          <Checkbox id="showcase-checkbox" defaultChecked />
          <Label htmlFor="showcase-checkbox">이용약관에 동의합니다</Label>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Radio Group">
        <RadioGroup defaultValue="monthly" className="gap-3">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="monthly" id="r-monthly" />
            <Label htmlFor="r-monthly">월간 결제</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yearly" id="r-yearly" />
            <Label htmlFor="r-yearly">연간 결제</Label>
          </div>
        </RadioGroup>
      </ShowcaseSection>

      <ShowcaseSection title="Select">
        <Select defaultValue="apple">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="과일 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">사과</SelectItem>
            <SelectItem value="banana">바나나</SelectItem>
            <SelectItem value="grape">포도</SelectItem>
          </SelectContent>
        </Select>
      </ShowcaseSection>

      <ShowcaseSection title="Switch">
        <div className="flex items-center gap-2">
          <Switch id="showcase-switch" defaultChecked />
          <Label htmlFor="showcase-switch">알림 받기</Label>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Slider">
        <Slider defaultValue={[40]} max={100} step={1} className="w-full max-w-56" />
      </ShowcaseSection>

      <ShowcaseSection title="Combobox" description="검색 가능한 선택 입력">
        <Combobox items={frameworks}>
          <ComboboxInput placeholder="프레임워크 선택" />
          <ComboboxContent>
            <ComboboxEmpty>검색 결과가 없습니다.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </ShowcaseSection>

      <ShowcaseSection title="Calendar (Date Picker)" description="Popover + Calendar 조합">
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="outline" className="w-48 justify-start font-normal" />
            }
          >
            <CalendarIcon className="size-4" />
            {date ? date.toLocaleDateString("ko-KR") : "날짜 선택"}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
            />
          </PopoverContent>
        </Popover>
      </ShowcaseSection>

      <ShowcaseSection title="Field" description="레이블/설명/에러를 포함하는 폼 필드 프리미티브">
        <Field className="w-full">
          <FieldLabel htmlFor="showcase-field">사용자 이름</FieldLabel>
          <Input id="showcase-field" placeholder="username" />
          <FieldDescription>영문, 숫자만 사용할 수 있습니다.</FieldDescription>
        </Field>
      </ShowcaseSection>
    </div>
  )
}
