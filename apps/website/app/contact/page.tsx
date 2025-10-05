"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Loader2 } from "lucide-react";
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

// Translation map for API response codes
// TODO: Add English translations when language toggle is implemented
const CONTACT_MESSAGES = {
  CONTACT_SUCCESS: "Благодарим ви! Вашето съобщение е изпратено успешно.",
  VALIDATION_ERROR: "Невалидни данни. Моля, проверете формата.",
  RATE_LIMIT_EXCEEDED: "Твърде много заявки. Моля, изчакайте малко.",
  EMAIL_SEND_FAILED: "Грешка при изпращане на имейл. Моля, опитайте отново.",
  SERVER_ERROR: "Възникна грешка. Моля, опитайте отново.",
} as const;

const ContactPage = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        // Map error code to translated message
        const errorMessage =
          data.errorCode && data.errorCode in CONTACT_MESSAGES
            ? CONTACT_MESSAGES[data.errorCode as keyof typeof CONTACT_MESSAGES]
            : CONTACT_MESSAGES.SERVER_ERROR;
        throw new Error(errorMessage);
      }

      // Success - map success code to translated message
      const successMessage =
        data.messageCode && data.messageCode in CONTACT_MESSAGES
          ? CONTACT_MESSAGES[data.messageCode as keyof typeof CONTACT_MESSAGES]
          : CONTACT_MESSAGES.CONTACT_SUCCESS;

      toast.success(successMessage);
      form.reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : CONTACT_MESSAGES.SERVER_ERROR;
      toast.error(errorMessage);
    }
  }

  return (
    <div className="min-h-screen bg-white pt-32 md:pt-24 pb-16 px-4 md:px-12 lg:px-40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12">
          {/* Left Column: Form */}
          <div>
            <div className="mb-8">
              <h1
                className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-charcoal)]"
                id="contact-form-heading"
              >
                Свържете се с нас
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Изпратете ни вашето запитване и ще се свържем с вас възможно
                най-скоро
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 border border-gray-100">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                  role="form"
                  aria-labelledby="contact-form-heading"
                >
                  {/* Honeypot field */}
                  <input
                    type="text"
                    {...form.register("website")}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
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
                    disabled={form.formState.isSubmitting}
                    className="w-full h-12 text-base cursor-pointer"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
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
            <div className="bg-[var(--color-red)] text-white rounded-lg p-8 shadow-lg flex-shrink-0">
              <h2 className="text-2xl font-bold mb-8">
                Техно Строй България ООД
              </h2>

              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <p className="font-medium text-lg">гр. София</p>
                    <p className="text-white/95">бул. Витоша № 188</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <a
                    href="tel:029532790"
                    className="text-lg hover:underline active:opacity-80 transition-opacity touch-manipulation leading-relaxed"
                  >
                    02/953 27 90
                  </a>
                </div>

                <div className="flex gap-4 items-start">
                  <Mail className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <a
                    href="mailto:office@technostroy.bg"
                    className="text-lg hover:underline break-all active:opacity-80 transition-opacity touch-manipulation leading-relaxed"
                  >
                    office@technostroy.bg
                  </a>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-[400px] lg:min-h-0 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d259.27039387559444!2d23.308923145918758!3d42.67598251733605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa851d53a0542d%3A0x8c0abb7ddb14c66f!2z0JjQstCw0L0g0JLQsNC30L7Qsiwg0LHRg9C7LiDigJ7QktC40YLQvtGI0LDigJwgMTg4LCAxNDA4INCh0L7RhNC40Y8!5e0!3m2!1sbg!2sbg!4v1759401675908!5m2!1sbg!2sbg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allow="fullscreen"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
