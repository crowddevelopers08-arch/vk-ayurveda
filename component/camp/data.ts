/* ---- EDIT THIS BLOCK for each camp ---- */
export const CAMP = {
  loc: { en: "Mayiladuthurai", ta: "மயிலாடுதுறை" },
  day: { en: "Thursday", ta: "வியாழக்கிழமை" }, // Fri: Pattukottai / பட்டுக்கோட்டை / வெள்ளிக்கிழமை; Sat: Karaikal / காரைக்கால் / சனிக்கிழமை
  venue: {
    en: "41, Mayuranathar North Street, Mayiladuthurai, Tamil Nadu 609001",
    ta: "41, மயூரநாதர் வடக்கு வீதி, மயிலாடுதுறை, தமிழ்நாடு 609001",
  },
  time: { en: "6 to 8 pm", ta: "மாலை 6 முதல் 8 மணி வரை" }, // The Time row hides if this is left empty.
  map: "https://maps.app.goo.gl/ivmWdQGyx919UvvT8?g_st=ic",
  video: "", // Landscape (16:9) VSL video file URL (mp4)
  poster: "", // Optional thumbnail image URL
};
/* --------------------------------------- */

export const PHONE_DISPLAY = "99966 60102";
export const PHONE_HREF = "tel:+919996660102";

// English values go to Razorpay and TeleCRM whichever language the visitor is reading.
export const PAIN_AREAS = ["Back", "Neck", "Knee", "Joint", "Other"] as const;
export type PainArea = (typeof PAIN_AREAS)[number];

export type CampLang = "en" | "ta";

const { loc, day, venue, time } = CAMP;

export const campCopy = {
  en: {
    title: `VK Ayurveda Pain Relief Camp · ${loc.en}`,
    brandTagline: "Pain Relief & Neuro Care",
    bookHeader: "Book ₹99 Slot",
    badge: `Weekly Pain Relief Camp · ${loc.en}`,
    h1: `Back, neck or joint pain? Meet our Ayurvedic doctors in ${loc.en}.`,
    sub: `Every ${day.en}. Doctor consultation at just ₹99 when you book online, plus 10% extra discount on treatments.`,
    offerOnline: "Book online",
    offerDirect: "Direct at camp",
    offerDiscount: "+ 10% extra discount on treatments",
    bookCta: "Book my ₹99 slot",
    callCta: "Call +91 99966 60102",
    trust: ["NABH certified hospital", "4.8★ on Google", "40,000+ patients treated"],
    videoPlaceholder: "VSL video goes here",
    videoPlay: "Play video",

    campTitle: `VK Ayurveda Pain Clinic, now in ${loc.en}`,
    campLead: `Don’t travel far for treatment. Our doctors come to ${loc.en} every week to check your pain and guide you on the right Ayurvedic care.`,
    painsLabel: "Pain we check",
    pains: ["Back pain", "Sciatica", "Neck pain", "Knee pain", "Joint pain", "Arthritis"],
    note: `Camp runs every ${day.en}. Come this week.`,
    getsLabel: "What you get",
    gets: [
      "Doctor consultation at ₹99 when you book online (₹199 direct at camp)",
      "Check-up of your pain and body movement",
      "A treatment plan suited to your condition",
      "Honest advice. Admission only if the doctor recommends it",
      "10% extra discount on treatments",
    ],

    formTitle: "Reserve your ₹99 slot",
    nameLabel: "Your name",
    phoneLabel: "Mobile number",
    painLabel: "Where is your pain?",
    painOptions: { Back: "Back", Neck: "Neck", Knee: "Knee", Joint: "Joint", Other: "Other" } as Record<PainArea, string>,
    pay: "Pay ₹99 & confirm slot",
    paying: "Opening payment…",
    confirming: "Confirming payment…",
    fine: "₹99 applies to online booking. Direct visit at the camp: ₹199. 10% extra discount on treatments. Limited slots per camp.",
    nameError: "Enter your name",
    phoneError: "Enter a 10-digit mobile number",
    errors: {
      not_configured: `Online payment is not available right now. Please call ${PHONE_DISPLAY} to book.`,
      start_failed: "The payment could not start. Check your connection and try again.",
      payment_failed: `The payment did not go through. Try again, or call ${PHONE_DISPLAY}.`,
      verify_failed: `We could not confirm your payment. If money was deducted, call ${PHONE_DISPLAY}.`,
    },

    detailsTitle: `${loc.en} camp`,
    venueLabel: "Venue",
    venue: venue.en,
    dayLabel: "Day",
    dayValue: `Every ${day.en}`,
    timeLabel: "Time",
    time: time.en,
    directions: "Get directions",
    callUs: "Call us",

    footer: `VK Ayurveda · NABH certified Ayurvedic hospital · Call ${PHONE_DISPLAY}`,
    legal: { privacy: "Privacy Policy", terms: "Terms & Conditions", refund: "Cancellation & Refund" },

    thanks: "Thank you! We will call you to confirm your slot.",
    paymentId: "Payment ID",
    backToCamp: "Back to camp page",
  },
  ta: {
    title: `VK Ayurveda Pain Relief Camp · ${loc.ta}`,
    brandTagline: "வலி நிவாரணம் & நரம்பியல் சிகிச்சை",
    bookHeader: "₹99 முன்பதிவு",
    badge: `வாராந்திர வலி நிவாரண முகாம் · ${loc.ta}`,
    h1: `முதுகு, கழுத்து, மூட்டு வலியா? ${loc.ta}-ல் எங்கள் ஆயுர்வேத மருத்துவர்களை சந்தியுங்கள்.`,
    sub: `ஒவ்வொரு ${day.ta}யும். ஆன்லைனில் முன்பதிவு செய்தால் மருத்துவர் ஆலோசனை வெறும் ₹99, சிகிச்சைகளுக்கு கூடுதலாக 10% தள்ளுபடி.`,
    offerOnline: "ஆன்லைன் முன்பதிவு",
    offerDirect: "முகாமில் நேரடியாக",
    offerDiscount: "+ சிகிச்சைகளுக்கு கூடுதல் 10% தள்ளுபடி",
    bookCta: "₹99-க்கு முன்பதிவு செய்யுங்கள்",
    callCta: "அழைக்க: +91 99966 60102",
    trust: ["NABH சான்றிதழ் பெற்ற மருத்துவமனை", "Google-ல் 4.8★", "40,000+ நோயாளிகள்"],
    videoPlaceholder: "VSL வீடியோ இங்கே வரும்",
    videoPlay: "வீடியோவை இயக்கு",

    campTitle: `VK ஆயுர்வேதா வலி சிகிச்சை மையம், இப்போது ${loc.ta}-ல்`,
    campLead: `சிகிச்சைக்காக தூரம் செல்ல வேண்டாம். எங்கள் மருத்துவர்கள் ஒவ்வொரு வாரமும் ${loc.ta}-க்கு வந்து உங்கள் வலியை பரிசோதித்து, சரியான ஆயுர்வேத சிகிச்சை வழிகாட்டுவார்கள்.`,
    painsLabel: "நாங்கள் பரிசோதிக்கும் வலிகள்",
    pains: ["முதுகு வலி", "சியாடிகா", "கழுத்து வலி", "முழங்கால் வலி", "மூட்டு வலி", "மூட்டு வாதம்"],
    note: `முகாம் ஒவ்வொரு ${day.ta}யும் நடைபெறும். இந்த வாரமே வாருங்கள்.`,
    getsLabel: "உங்களுக்குக் கிடைப்பவை",
    gets: [
      "மருத்துவர் ஆலோசனை ஆன்லைனில் ₹99 (முகாமில் நேரடியாக ₹199)",
      "உங்கள் வலி மற்றும் உடல் இயக்கத்தின் பரிசோதனை",
      "உங்கள் நிலைக்கு ஏற்ற சிகிச்சை திட்டம்",
      "நேர்மையான ஆலோசனை. மருத்துவர் பரிந்துரைத்தால் மட்டுமே அட்மிஷன்",
      "சிகிச்சைகளுக்கு கூடுதல் 10% தள்ளுபடி",
    ],

    formTitle: "உங்கள் ₹99 ஸ்லாட்டை பதிவு செய்யுங்கள்",
    nameLabel: "உங்கள் பெயர்",
    phoneLabel: "மொபைல் எண்",
    painLabel: "எங்கு வலி?",
    painOptions: { Back: "முதுகு", Neck: "கழுத்து", Knee: "முழங்கால்", Joint: "மூட்டு", Other: "மற்றவை" } as Record<PainArea, string>,
    pay: "₹99 செலுத்தி உறுதி செய்யுங்கள்",
    paying: "பணம் செலுத்தும் பக்கத்தைத் திறக்கிறோம்…",
    confirming: "பணத்தை உறுதி செய்கிறோம்…",
    fine: "₹99 ஆன்லைன் முன்பதிவுக்கு மட்டும். முகாமில் நேரடியாக வந்தால் ₹199. சிகிச்சைகளுக்கு கூடுதலாக 10% தள்ளுபடி. ஒவ்வொரு முகாமிலும் குறைந்த ஸ்லாட்டுகளே.",
    nameError: "பெயரை உள்ளிடவும்",
    phoneError: "10 இலக்க மொபைல் எண்ணை உள்ளிடவும்",
    errors: {
      not_configured: `ஆன்லைன் பணம் செலுத்துதல் இப்போது இயங்கவில்லை. முன்பதிவு செய்ய ${PHONE_DISPLAY}-க்கு அழைக்கவும்.`,
      start_failed: "பணம் செலுத்துதலைத் தொடங்க முடியவில்லை. இணைய இணைப்பைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
      payment_failed: `பணம் செலுத்துதல் நிறைவடையவில்லை. மீண்டும் முயற்சிக்கவும் அல்லது ${PHONE_DISPLAY}-க்கு அழைக்கவும்.`,
      verify_failed: `உங்கள் பணத்தை உறுதி செய்ய முடியவில்லை. பணம் கழிக்கப்பட்டிருந்தால், ${PHONE_DISPLAY}-க்கு அழைக்கவும்.`,
    },

    detailsTitle: `${loc.ta} முகாம்`,
    venueLabel: "இடம்",
    venue: venue.ta,
    dayLabel: "நாள்",
    dayValue: `ஒவ்வொரு ${day.ta}`,
    timeLabel: "நேரம்",
    time: time.ta,
    directions: "வழி காட்ட",
    callUs: "அழைக்க",

    footer: `VK ஆயுர்வேதா · NABH சான்றிதழ் பெற்ற ஆயுர்வேத மருத்துவமனை · அழைக்க ${PHONE_DISPLAY}`,
    legal: { privacy: "தனியுரிமை கொள்கை", terms: "விதிமுறைகள் & நிபந்தனைகள்", refund: "ரத்து & பணத்திருப்பம்" },

    thanks: "நன்றி! உங்கள் ஸ்லாட்டை உறுதி செய்ய நாங்கள் அழைப்போம்.",
    paymentId: "பரிவர்த்தனை எண்",
    backToCamp: "முகாம் பக்கத்திற்குத் திரும்பு",
  },
};

export type BookingErrorCode = keyof typeof campCopy.en.errors;
