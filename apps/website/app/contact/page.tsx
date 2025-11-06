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
import { Checkbox } from "@repo/ui/components/checkbox";
import {
  createContactSchema,
  type ContactFormValues,
} from "@repo/ui/validation";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState } from "react";

const ContactPage = () => {
  const { t, locale } = useLanguage();
  const [formRenderTime] = useState(Date.now());

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(createContactSchema(locale)),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
      website: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      // Calculate time since form was rendered (bot detection)
      const timeSinceRender = Date.now() - formRenderTime;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, _submitTime: timeSinceRender }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Map error code to translated message
        const errorMessages: Record<string, string> = {
          VALIDATION_ERROR: t.contact.messages.validationError,
          RATE_LIMIT_EXCEEDED: t.contact.messages.rateLimitExceeded,
          EMAIL_SEND_FAILED: t.contact.messages.emailSendFailed,
          SERVER_ERROR: t.contact.messages.serverError,
        };
        const errorMessage =
          data.errorCode && data.errorCode in errorMessages
            ? errorMessages[data.errorCode]
            : t.contact.messages.serverError;
        throw new Error(errorMessage);
      }

      // Success - map success code to translated message
      const successMessage = t.contact.messages.success;

      toast.success(successMessage);
      form.reset({}, { keepErrors: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t.contact.messages.serverError;
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
                {t.contact.title}
              </h1>
              <p className="text-lg text-[var(--color-charcoal)] opacity-70 leading-relaxed">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 border border-[var(--color-concrete-grey)]">
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
                          {t.contact.form.name}{" "}
                          <span className="text-[var(--color-red)]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t.contact.form.placeholders.name}
                            className="bg-white border-[var(--color-concrete-grey)]"
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
                          {t.contact.form.email}{" "}
                          <span className="text-[var(--color-red)]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t.contact.form.placeholders.email}
                            className="bg-white border-[var(--color-concrete-grey)]"
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
                          {t.contact.form.phone}{" "}
                          <span className="text-[var(--color-red)]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder={t.contact.form.placeholders.phone}
                            className="bg-white border-[var(--color-concrete-grey)]"
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
                          {t.contact.form.message}{" "}
                          <span className="text-[var(--color-red)]">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t.contact.form.placeholders.message}
                            rows={6}
                            className="bg-white border-[var(--color-concrete-grey)] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <div className="flex gap-3 items-start">
                          <FormControl>
                            <Checkbox
                              id="consent"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-1 flex-shrink-0"
                            />
                          </FormControl>
                          <div className="flex-1 min-w-0">
                            <FormLabel
                              htmlFor="consent"
                              className="text-sm font-normal leading-normal cursor-pointer block"
                            >
                              {t.contact.form.consent}{" "}
                              <Link
                                href="/privacy"
                                className="text-[var(--color-red)] hover:underline font-medium"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {t.contact.form.privacyLink}
                              </Link>{" "}
                              {t.contact.form.consentText}{" "}
                              <span className="text-[var(--color-red)]">*</span>
                            </FormLabel>
                          </div>
                        </div>
                        <FormMessage className="ml-8" />
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
                        {t.contact.form.submitting}
                      </>
                    ) : (
                      t.contact.form.submit
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
                {t.contact.info.companyName}
              </h2>

              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <p className="font-medium text-lg">
                      {t.contact.info.address.city}
                    </p>
                    <p className="text-white/95">
                      {t.contact.info.address.street}
                    </p>
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
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.6!2d23.308923!3d42.675983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xec718dc53639c4a9!2zVGVjaG5vIFN0cm95IEJ1bGdhcmlhIOKAkyBUZWtubyDQodGC0YDQvtC5INCR0YrQu9Cz0LDRgNC40Y8!5e0!3m2!1s${locale}!2sbg!4v1234567890!5m2!1s${locale}!2sbg`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allow="fullscreen"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Techno Stroy Bulgaria Location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
