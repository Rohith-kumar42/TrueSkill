type EventName =
  | "lead_form_submit"
  | "whatsapp_click"
  | "call_button_click"
  | "assessment_booking"
  | "course_enrolment"
  | "program_view"
  | "contact_form_open"
  | "breadcrumb_click";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (
  eventName: EventName,
  params?: Record<string, string>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};
