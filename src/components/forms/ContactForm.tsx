import React from "react";
import Button from "@/components/ui/Button";
import { Heading } from "@/components/ui/Typography";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function ContactForm() {
  return (
    <div className="bg-[#F4F4F4] rounded-3xl p-8 md:p-12">
      <Heading as="h2" className="text-2xl md:text-3xl font-normal mb-2">
        Изпратете запитване
      </Heading>
      <p className="text-slate-500 mb-8">
        Попълнете формата и ние ще се свържем с вас в рамките на 24 часа.
      </p>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input id="name" label="Име" placeholder="Вашето име" type="text" />
          <Input
            id="company"
            label="Фирма / Компания"
            placeholder="Име на фирма"
            type="text"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="email"
            label="Имейл"
            placeholder="example@email.com"
            type="email"
          />
          <Input id="phone" label="Телефон" placeholder="+359..." type="tel" />
        </div>

        <Textarea
          id="message"
          label="Съобщение"
          placeholder="Вашето съобщение"
        />

        <div className="pt-2">
          <Button variant="black" className="px-8 py-3 rounded-full">
            Изпрати съобщение
          </Button>
        </div>
      </form>
    </div>
  );
}
