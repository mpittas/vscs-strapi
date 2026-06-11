"use client";

import React, { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import RadioGroup from "@/components/ui/RadioGroup";
import { Heading, Text } from "@/components/ui/Typography";
import { ChevronRight, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  // Step 1
  fullName: string;
  phone: string;
  city: string;
  age: string;
  photoFile: File | null;
  hasDrivingLicense: string;
  drivingCategories: string[];
  // Step 2
  experienceDescription: string;
  outdoorExperience: string;
  languages: string;
  timeAbroadRestrictions: string;
  certificates: string;
  // Step 3
  motivation: string;
  effortResponse: string;
  pressureHandling: string;
  procedureAttitude: string;
  multiculturalAttitude: string;
  // Step 4
  conflictResolution: string;
  differentStyleHandling: string;
  colleagueRefusal: string;
  nostalgiaHandling: string;
  // Step 5
  situation1: string;
  situation2: string;
}

const initialFormData: FormData = {
  fullName: "",
  phone: "",
  city: "",
  age: "",
  photoFile: null,
  hasDrivingLicense: "",
  drivingCategories: [],
  experienceDescription: "",
  outdoorExperience: "",
  languages: "",
  timeAbroadRestrictions: "",
  certificates: "",
  motivation: "",
  effortResponse: "",
  pressureHandling: "",
  procedureAttitude: "",
  multiculturalAttitude: "",
  conflictResolution: "",
  differentStyleHandling: "",
  colleagueRefusal: "",
  nostalgiaHandling: "",
  situation1: "",
  situation2: "",
};

const drivingLicenseOptions = [
  { value: "yes", label: "Да" },
  { value: "no", label: "Не" },
];

const drivingCategoriesList = [
  "A",
  "A1",
  "M",
  "B",
  "B1",
  "C",
  "C1",
  "D",
  "D1",
  "B+E",
  "C+E",
  "D+E",
  "D1+E",
  "Tтк",
  "Tтб",
  "Tтм",
];

const motivationOptions = [
  { value: "financial", label: "Финансово възнаграждение" },
  { value: "development", label: "Развитие и учене" },
  { value: "eco", label: "Приносът към екологични каузи" },
  { value: "teamwork", label: "Колективната работа" },
];

const effortResponseOptions = [
  { value: "ask_team", label: "Ще поискам подкрепа от екипа" },
  {
    value: "continue_alone",
    label: "Ще продължа самостоятелно, докато не завърша",
  },
  { value: "ask_manager", label: "Ще поискам инструкции от ръководителя" },
  { value: "reassess", label: "Ще преразгледам приоритетите си" },
];

const multiculturalOptions = [
  { value: "excited", label: "Вълнувам се от възможността" },
  {
    value: "reserved",
    label: "Имам известни резерви, но съм готов/а да опитам",
  },
  { value: "worried", label: "Изпитвам притеснения" },
];

const conflictResolutionOptions = [
  { value: "compromise", label: "Разговор и търсене на компромис" },
  { value: "management", label: "Обсъждане с ръководството" },
  { value: "avoid", label: "Избягвам конфликтите" },
  { value: "insist", label: "Държа на своето, без да отстъпвам" },
];

const differentStyleOptions = [
  {
    value: "understand",
    label:
      "Опитвам се да разбера тяхната гледна точка и да намерим общо решение",
  },
  {
    value: "insist_own",
    label:
      "Изразявам мнението си и настоявам на своя подход, ако смятам, че е правилен",
  },
  {
    value: "manager_decides",
    label: "Оставям ръководителя да реши кой подход е по-добър",
  },
  {
    value: "work_alone",
    label: "Работя самостоятелно, за да избегна конфликти",
  },
];

const steps = [
  { id: 1, title: "Основна информация" },
  { id: 2, title: "Опит и квалификации" },
  { id: 3, title: "Личностни качества" },
  { id: 4, title: "Ситуационни въпроси" },
  { id: 5, title: "Ситуационни примери" },
];

export default function MultiStepForm() {
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (
    field: keyof FormData,
    value: string | File | null | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDrivingCategory = (category: string) => {
    setFormData((prev) => {
      const current = prev.drivingCategories;
      if (current.includes(category)) {
        return {
          ...prev,
          drivingCategories: current.filter((c) => c !== category),
        };
      }
      return { ...prev, drivingCategories: [...current, category] };
    });
  };

  const nextStep = () => {
    let isValid = true;
    let errorMsg = "";

    switch (currentStep) {
      case 1:
        if (!formData.fullName.trim()) {
          isValid = false;
          errorMsg = "Моля, въведете трите си имена";
        } else if (!formData.phone.trim()) {
          isValid = false;
          errorMsg = "Моля, въведете телефона си";
        } else if (!formData.city.trim()) {
          isValid = false;
          errorMsg = "Моля, въведете град/село";
        } else if (!formData.age.trim()) {
          isValid = false;
          errorMsg = "Моля, въведете възрастта си";
        } else if (!formData.photoFile) {
          isValid = false;
          errorMsg = "Моля, качете актуална снимка";
        } else if (!formData.hasDrivingLicense) {
          isValid = false;
          errorMsg =
            "Моля, посочете дали имате свидетелство за управление на МПС";
        } else if (
          formData.hasDrivingLicense === "yes" &&
          formData.drivingCategories.length === 0
        ) {
          isValid = false;
          errorMsg = "Моля, посочете категориите от свидетелството си";
        }
        break;
      case 2:
        if (!formData.experienceDescription.trim()) {
          isValid = false;
          errorMsg = "Моля, опишете опита си";
        } else if (!formData.outdoorExperience.trim()) {
          isValid = false;
          errorMsg = "Моля, опишете опита си с работа на открито";
        } else if (!formData.languages.trim()) {
          isValid = false;
          errorMsg = "Моля, посочете какви езици владеете";
        } else if (!formData.timeAbroadRestrictions.trim()) {
          isValid = false;
          errorMsg = "Моля, посочете дали имате ограничения за време в чужбина";
        } else if (!formData.certificates.trim()) {
          isValid = false;
          errorMsg = "Моля, посочете дали притежавате сертификати";
        }
        break;
      case 3:
        if (!formData.motivation) {
          isValid = false;
          errorMsg = "Моля, изберете какво ви мотивира";
        } else if (!formData.effortResponse) {
          isValid = false;
          errorMsg = "Моля, изберете как бихте реагирали при повече усилия";
        } else if (!formData.pressureHandling) {
          isValid = false;
          errorMsg = "Моля, изберете как се справяте с напрежение";
        } else if (!formData.procedureAttitude.trim()) {
          isValid = false;
          errorMsg = "Моля, опишете отношението си към работните процедури";
        } else if (!formData.multiculturalAttitude) {
          isValid = false;
          errorMsg =
            "Моля, изберете как се чувствате при работа с хора от различни култури";
        }
        break;
      case 4:
        if (!formData.conflictResolution) {
          isValid = false;
          errorMsg = "Моля, изберете стратегия за разрешаване на конфликти";
        } else if (!formData.differentStyleHandling) {
          isValid = false;
          errorMsg =
            "Моля, изберете как се справяте с различни стилове на работа";
        } else if (!formData.colleagueRefusal.trim()) {
          isValid = false;
          errorMsg =
            "Моля, опишете какво бихте направили при отказ от съдействие";
        } else if (!formData.nostalgiaHandling.trim()) {
          isValid = false;
          errorMsg = "Моля, опишете как се справяте с носталгията";
        }
        break;
      case 5:
        if (!formData.situation1.trim()) {
          isValid = false;
          errorMsg = "Моля, опишете как бихте подходили в ситуация 1";
        } else if (!formData.situation2.trim()) {
          isValid = false;
          errorMsg = "Моля, опишете как бихте постъпили в ситуация 2";
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

      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "photoFile" && value !== null) {
          if (Array.isArray(value)) {
            data.append(key, value.join(", "));
          } else {
            data.append(key, String(value));
          }
        }
      });

      data.append("_gotcha", honeypotRef.current?.value || "");

      if (formData.photoFile) {
        data.append("photoFile", formData.photoFile);
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
            <Input
              id="fullName"
              label="Попълнете трите си имена *"
              placeholder="Въведете трите си имена"
              type="text"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                id="phone"
                label="Телефон *"
                placeholder="+359..."
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
              <Input
                id="city"
                label="В кой град/село живеете? *"
                placeholder="Въведете град/село"
                type="text"
                value={formData.city}
                onChange={(e) => updateField("city", e.target.value)}
              />
            </div>
            <Input
              id="age"
              label="На каква възраст сте? *"
              placeholder="Въведете възраст"
              type="number"
              value={formData.age}
              onChange={(e) => updateField("age", e.target.value)}
            />

            {/* Photo Upload */}
            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-medium text-slate-900">
                Моля да качите актуална снимка *
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="photoFile"
                  accept="image/*"
                  onChange={(e) =>
                    updateField("photoFile", e.target.files?.[0] || null)
                  }
                  className="hidden"
                />
                <label
                  htmlFor="photoFile"
                  className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-[#b4d429] hover:bg-lime-50 transition-all bg-gray-100"
                >
                  <div className="text-center">
                    <div className="text-slate-500 mb-2">
                      {formData.photoFile ? (
                        <span className="text-[#b4d429] font-medium">
                          {formData.photoFile.name}
                        </span>
                      ) : (
                        <>
                          <p className="font-medium">
                            Кликнете за качване на снимка
                          </p>
                          <p className="text-sm">
                            JPG, PNG или друг изображителен формат
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Driving License Radio */}
            <RadioGroup
              label="Имате ли свидетелство за управление на МПС? Ако да, посочете категорията. *"
              name="hasDrivingLicense"
              options={drivingLicenseOptions}
              value={formData.hasDrivingLicense}
              onChange={(value) => updateField("hasDrivingLicense", value)}
              required
            />

            {/* Conditional Multi-select for Categories */}
            {formData.hasDrivingLicense === "yes" && (
              <div className="flex flex-col gap-y-2">
                <label className="text-sm font-medium text-slate-900">
                  Изберете категориите *
                </label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {drivingCategoriesList.map((category) => (
                    <label
                      key={category}
                      className={cn(
                        "flex items-center justify-center p-2 rounded-lg border cursor-pointer transition-all text-sm",
                        formData.drivingCategories.includes(category)
                          ? "border-[#b4d429] bg-lime-50 text-slate-900"
                          : "border-gray-300 bg-gray-100 text-slate-700 hover:border-gray-400",
                      )}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.drivingCategories.includes(category)}
                        onChange={() => toggleDrivingCategory(category)}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <Textarea
              id="experienceDescription"
              label="Имате ли опит на тази или подобна позиция, какви операции сте извършвали? *"
              placeholder="Опишете вашия опит..."
              value={formData.experienceDescription}
              onChange={(e) =>
                updateField("experienceDescription", e.target.value)
              }
              rows={4}
            />
            <Textarea
              id="outdoorExperience"
              label="Имате ли опит с работа на открито или подобна физическа работа? *"
              placeholder="Опишете вашия опит с работа на открито..."
              value={formData.outdoorExperience}
              onChange={(e) => updateField("outdoorExperience", e.target.value)}
              rows={4}
            />
            <Textarea
              id="languages"
              label="Владеете ли различен език от българския и на какво ниво? *"
              placeholder="Посочете езиците и нивото на владеене..."
              value={formData.languages}
              onChange={(e) => updateField("languages", e.target.value)}
              rows={3}
            />
            <Textarea
              id="timeAbroadRestrictions"
              label="Имате ли ограничения по отношение на времето, което може да прекарате в чужбина? *"
              placeholder="Опишете ограниченията, ако имате такива..."
              value={formData.timeAbroadRestrictions}
              onChange={(e) =>
                updateField("timeAbroadRestrictions", e.target.value)
              }
              rows={3}
            />
            <Textarea
              id="certificates"
              label="Притежавате ли сертификати за допълнителна квалификация? Моля да посочите какви? *"
              placeholder="Посочете сертификатите, ако имате такива..."
              value={formData.certificates}
              onChange={(e) => updateField("certificates", e.target.value)}
              rows={3}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <RadioGroup
              label="Какво ви мотивира най-силно в професионален план? *"
              name="motivation"
              options={motivationOptions}
              value={formData.motivation}
              onChange={(value) => updateField("motivation", value)}
              required
            />
            <RadioGroup
              label="Как бихте реагирали, ако задачите ви изискват повече усилия от предварително очакваното? *"
              name="effortResponse"
              options={effortResponseOptions}
              value={formData.effortResponse}
              onChange={(value) => updateField("effortResponse", value)}
              required
            />
            <Select
              id="pressureHandling"
              label="Как се справяте с работа под напрежение *"
              value={formData.pressureHandling}
              onChange={(e) => updateField("pressureHandling", e.target.value)}
            >
              <option value="">Изберете...</option>
              <option value="calm">
                Запазвам спокойствие и работя методично
              </option>
              <option value="prioritize">Приоритизирам задачите си</option>
              <option value="ask_help">Търся помощ от колеги</option>
              <option value="stress">Изпитвам стрес, но се справям</option>
            </Select>
            <Textarea
              id="procedureAttitude"
              label="Какво е отношението ви към спазването на работните процедури и графици? *"
              placeholder="Опишете отношението си..."
              value={formData.procedureAttitude}
              onChange={(e) => updateField("procedureAttitude", e.target.value)}
              rows={4}
            />
            <RadioGroup
              label="Как се чувствате, когато живеете и работите с хора от различни култури? *"
              name="multiculturalAttitude"
              options={multiculturalOptions}
              value={formData.multiculturalAttitude}
              onChange={(value) => updateField("multiculturalAttitude", value)}
              required
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <RadioGroup
              label="Какви са вашите стратегии за разрешаване на конфликти? *"
              name="conflictResolution"
              options={conflictResolutionOptions}
              value={formData.conflictResolution}
              onChange={(value) => updateField("conflictResolution", value)}
              required
            />
            <RadioGroup
              label="Как се справяте, когато работите с членове на екипа, които имат различен стил на работа или подход към задачите? Как бихте реагирали, ако не сте съгласни с тяхното мнение? *"
              name="differentStyleHandling"
              options={differentStyleOptions}
              value={formData.differentStyleHandling}
              onChange={(value) => updateField("differentStyleHandling", value)}
              required
            />
            <Textarea
              id="colleagueRefusal"
              label="Какво бихте направили, ако ваш колега откаже да съдейства за важна задача? *"
              placeholder="Опишете как бихте реагирали..."
              value={formData.colleagueRefusal}
              onChange={(e) => updateField("colleagueRefusal", e.target.value)}
              rows={4}
            />
            <Textarea
              id="nostalgiaHandling"
              label="Как се справяте с носталгията и липсата на близки хора, когато сте в чужбина? *"
              placeholder="Опишете как се справяте с носталгията..."
              value={formData.nostalgiaHandling}
              onChange={(e) => updateField("nostalgiaHandling", e.target.value)}
              rows={4}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <Textarea
              id="situation1"
              label="Ситуация 1: Представете си, че в екипа възниква спор за това как да се изпълни определена задача. Как бихте подходили? *"
              placeholder="Опишете вашия подход..."
              value={formData.situation1}
              onChange={(e) => updateField("situation1", e.target.value)}
              rows={5}
            />
            <Textarea
              id="situation2"
              label="Ситуация 2: Живеете в обща квартира с колеги, а един от тях редовно нарушава правилата за чистота. Как ще постъпите? *"
              placeholder="Опишете как бихте постъпили..."
              value={formData.situation2}
              onChange={(e) => updateField("situation2", e.target.value)}
              rows={5}
            />
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
        <Text variant="body-16" className="text-slate-700 max-w-md mx-auto">
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
      <input
        ref={honeypotRef}
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {/* Progress Steps */}
      <div className="mb-14 relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200"></div>
        <div className="flex items-center justify-between mb-4 relative z-1">
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
