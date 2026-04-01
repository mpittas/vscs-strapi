"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Heading, Text } from "@/components/ui/Typography";
import { ChevronLeft, ChevronRight, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  currentRole: string;
  cvFile: File | null;
  message: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  currentRole: "",
  cvFile: null,
  message: "",
};

const positionLabels: Record<string, string> = {
  "solar-installer": "Монтажник на соларни панели",
  "project-manager": "Ръководител проекти",
  "sales-rep": "Търговски представител",
  "electrical-engineer": "Електроинженер",
  other: "Друга",
};

const experienceLabels: Record<string, string> = {
  "0-1": "0-1 години (начално ниво)",
  "1-3": "1-3 години",
  "3-5": "3-5 години",
  "5-10": "5-10 години",
  "10+": "10+ години",
};

const steps = [
  { id: 1, title: "Основна информация" },
  { id: 2, title: "Опит и квалификации" },
  { id: 3, title: "Личностни качества" },
  { id: 4, title: "Ситуационни въпроси" },
  { id: 5, title: "Ситуационни примери" },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    // Validate current step before proceeding
    let isValid = true;
    let errorMsg = "";

    switch (currentStep) {
      case 1:
        if (!formData.firstName.trim()) {
          isValid = false;
          errorMsg = "Моля, въведете вашето име";
        } else if (!formData.lastName.trim()) {
          isValid = false;
          errorMsg = "Моля, въведете вашата фамилия";
        } else if (!formData.email.trim()) {
          isValid = false;
          errorMsg = "Моля, въведете вашия имейл адрес";
        } else if (!formData.phone.trim()) {
          isValid = false;
          errorMsg = "Моля, въведете вашия телефон";
        }
        break;
      case 2:
        if (!formData.position) {
          isValid = false;
          errorMsg = "Моля, изберете позиция за кандидатстване";
        }
        break;
      case 3:
        if (!formData.experience) {
          isValid = false;
          errorMsg = "Моля, изберете ниво на опит";
        }
        break;
      default:
        break;
    }

    if (!isValid) {
      setError(errorMsg);
      return;
    }

    setError(null);
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError(null);
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("position", formData.position);
      data.append("experience", formData.experience);
      data.append("currentRole", formData.currentRole);
      data.append("message", formData.message);

      if (formData.cvFile) {
        data.append("cvFile", formData.cvFile);
      }

      const response = await fetch("/api/apply", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError("Възникна грешка при изпращане. Моля, опитайте отново.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                id="firstName"
                label="Име"
                placeholder="Въведете вашето име"
                type="text"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
              />
              <Input
                id="lastName"
                label="Фамилия"
                placeholder="Въведете вашата фамилия"
                type="text"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                id="email"
                label="Имейл адрес"
                placeholder="your@email.com"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
              <Input
                id="phone"
                label="Телефон"
                placeholder="+359..."
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <Select
              id="position"
              label="Позиция за кандидатстване"
              value={formData.position}
              onChange={(e) => updateField("position", e.target.value)}
            >
              <option value="">Изберете позиция</option>
              <option value="solar-installer">
                Монтажник на соларни панели
              </option>
              <option value="project-manager">Ръководител проекти</option>
              <option value="sales-rep">Търговски представител</option>
              <option value="electrical-engineer">Електроинженер</option>
              <option value="other">Друга</option>
            </Select>
            <Input
              id="message"
              label="Съпроводително съобщение (по желание)"
              placeholder="Разкажете ни накратко защо се интересувате от тази позиция..."
              type="text"
              value={formData.message}
              onChange={(e) => updateField("message", e.target.value)}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <Select
              id="experience"
              label="Години опит"
              value={formData.experience}
              onChange={(e) => updateField("experience", e.target.value)}
            >
              <option value="">Изберете ниво на опит</option>
              <option value="0-1">0-1 години (начално ниво)</option>
              <option value="1-3">1-3 години</option>
              <option value="3-5">3-5 години</option>
              <option value="5-10">5-10 години</option>
              <option value="10+">10+ години</option>
            </Select>
            <Input
              id="currentRole"
              label="Настояща/последна позиция"
              placeholder="напр. Старши техник соларни системи"
              type="text"
              value={formData.currentRole}
              onChange={(e) => updateField("currentRole", e.target.value)}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-900">
                Качете CV / автобиография
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="cvFile"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    updateField("cvFile", e.target.files?.[0] || null)
                  }
                  className="hidden"
                />
                <label
                  htmlFor="cvFile"
                  className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-[#b4d429] hover:bg-lime-50 transition-all"
                >
                  <div className="text-center">
                    <div className="text-slate-500 mb-2">
                      {formData.cvFile ? (
                        <span className="text-[#b4d429] font-medium">
                          {formData.cvFile.name}
                        </span>
                      ) : (
                        <>
                          <p className="font-medium">Кликнете за качване</p>
                          <p className="text-sm">PDF, DOC или DOCX</p>
                        </>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <div className="bg-slate-50 rounded-xl p-6 space-y-4">
              <Heading as="h3" className="text-lg font-medium">
                Резюме на кандидатурата
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Име</p>
                  <p className="font-medium">
                    {formData.firstName} {formData.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Имейл</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-slate-500">Телефон</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-slate-500">Позиция</p>
                  <p className="font-medium">
                    {positionLabels[formData.position] || "Не е избрана"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Опит</p>
                  <p className="font-medium">
                    {experienceLabels[formData.experience] || "Не е избран"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">CV качено</p>
                  <p className="font-medium">
                    {formData.cvFile ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        {formData.cvFile.name}
                      </span>
                    ) : (
                      "Няма качен файл"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <Heading as="h2" className="text-2xl md:text-3xl font-normal mb-4">
          Кандидатурата е изпратена!
        </Heading>
        <Text variant="body-16" className="text-slate-600 max-w-md mx-auto">
          Благодарим ви за кандидатурата. Ще разгледаме информацията ви и ще се
          свържем с вас скоро.
        </Text>
        <div className="mt-8">
          <Button variant="primary" href="/karieri" showIcon>
            Обратно към кариерата
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12">
      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    currentStep >= step.id
                      ? "bg-[#b4d429] text-dark"
                      : "bg-slate-100 text-slate-400",
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="hidden md:block mt-2 text-center">
                  <div
                    className={cn(
                      "text-xs font-medium leading-normal",
                      currentStep >= step.id
                        ? "text-slate-900"
                        : "text-slate-400",
                    )}
                  >
                    {step.title}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-all",
                    currentStep > step.id ? "bg-[#b4d429]" : "bg-slate-200",
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Title */}
      <div className="mb-8">
        <div className="text-2xl font-normal mb-4 pb-2 border-b border-slate-200">
          {steps[currentStep - 1].title}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <Text variant="body-14" className="text-red-600">
            {error}
          </Text>
        </div>
      )}

      {/* Form Content */}
      <div className="mb-8">{renderStepContent()}</div>

      {/* Back Button - Below Form */}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
        <div>
          {currentStep > 1 && (
            <Button
              variant="outline-dark"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Назад
            </Button>
          )}
        </div>

        {currentStep === 5 ? (
          <Button
            variant="primary"
            onClick={handleSubmit}
            showIcon
            disabled={isSubmitting}
          >
            {isSubmitting ? "Изпраща се..." : "Изпрати кандидатура"}
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={nextStep}
            icon={ChevronRight}
            iconPosition="right"
          >
            Напред
          </Button>
        )}
      </div>
    </div>
  );
}
