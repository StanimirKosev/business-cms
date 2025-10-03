"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import { contactSchema, type ContactFormValues } from "@repo/ui/validation";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "Общо запитване",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    // Honeypot check
    if (values.website) {
      console.log("Bot detected");
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual endpoint later
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Грешка при изпращане");
      }

      toast.success("Благодарим ви! Вашето съобщение е изпратено успешно.");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Възникна грешка. Моля, опитайте отново.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-40">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[55%_45%] gap-12">
          {/* Left Column: Form */}
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Свържете се с нас</h1>
              <p className="text-gray-600">
                Изпратете ни вашето запитване и ще се свържем с вас възможно
                най-скоро
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Honeypot field */}
                  <input
                    type="text"
                    {...form.register("website")}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Име <span className="text-[var(--color-red)]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Вашето име"
                            className="bg-white border-gray-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Имейл{" "}
                          <span className="text-[var(--color-red)]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="email@example.com"
                            className="bg-white border-gray-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Телефон{" "}
                          <span className="text-[var(--color-red)]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+359 XXX XXX XXX"
                            className="bg-white border-gray-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Съобщение{" "}
                          <span className="text-[var(--color-red)]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Вашето съобщение..."
                            rows={6}
                            className="bg-white border-gray-300 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-base relative"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Изпращане...
                      </>
                    ) : (
                      "Изпрати"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Right Column: Company Info + Map */}
          <div className="flex flex-col gap-6 h-full">
            {/* Company Info */}
            <div className="bg-[var(--color-red)] text-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-8">
                Техно Строй България ООД
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-lg">гр. София</p>
                    <p className="text-white/95">бул. Витоша № 188</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:029532790"
                    className="text-lg hover:underline active:opacity-80 transition-opacity touch-manipulation"
                  >
                    02/953 27 90
                  </a>
                </div>

                <div className="flex gap-4">
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:office@technostroy.bg"
                    className="text-lg hover:underline break-all active:opacity-80 transition-opacity touch-manipulation"
                  >
                    office@technostroy.bg
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-lg overflow-hidden shadow-lg flex-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d259.27039387559444!2d23.308923145918758!3d42.67598251733605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa851d53a0542d%3A0x8c0abb7ddb14c66f!2z0JjQstCw0L0g0JLQsNC30L7Qsiwg0LHRg9C7LiDigJ7QktC40YLQvtGI0LDigJwgMTg4LCAxNDA4INCh0L7RhNC40Y8!5e0!3m2!1sbg!2sbg!4v1759401675908!5m2!1sbg!2sbg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
