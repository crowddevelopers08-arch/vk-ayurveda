import LegalPage, { type Language, type LegalContent } from "./LegalPage";

const content: Record<Language, LegalContent> = {
  en: {
    title: "Cancellation & Refund Policy",
    effectiveLabel: "Effective date",
    intro: "We understand that plans can change. This policy explains how you can cancel or reschedule a consultation or treatment at VK Ayurveda, and when you are eligible for a refund.",
    contactIntro: "To cancel, reschedule, or request a refund, please call or WhatsApp us with your name and registered phone number.",
    sections: [
      {
        title: "Cancelling a Consultation",
        content: [
          "You may cancel your consultation booking by calling or sending a WhatsApp message to 99966 60102 at least 24 hours before your scheduled appointment.",
          "Cancellations made at least 24 hours in advance are eligible for a full refund of the consultation fee.",
          "Cancellations made less than 24 hours before the appointment, or missed appointments without prior notice, are not eligible for a refund.",
        ],
      },
      {
        title: "Rescheduling",
        content: [
          "You may reschedule your consultation once, free of charge, if you inform us at least 12 hours before your appointment. The new slot is subject to doctor availability.",
          "If VK Ayurveda needs to reschedule or cancel your appointment for any reason, you may choose a new slot or receive a full refund.",
        ],
      },
      {
        title: "Treatment Packages",
        content: [
          "Treatment packages (such as Panchakarma or therapy programmes) can be cancelled before the first session for a full refund, less any registration or medicine charges already incurred.",
          "Once a package has started, refunds for the remaining unused sessions are given on a pro-rata basis after deducting the cost of completed sessions and medicines already dispensed.",
        ],
      },
      {
        title: "Non-Refundable Items",
        content: [
          "Medicines, oils, and other products that have been dispensed cannot be returned or refunded, for hygiene and safety reasons.",
          "Consultations that have already been completed are not refundable.",
        ],
      },
      {
        title: "Refund Process",
        content: [
          "Approved refunds are processed within 7 working days and credited to the original payment method.",
          "Depending on your bank or payment provider, it may take an additional 5–7 working days for the amount to reflect in your account.",
          "Payments made in cash at the hospital will be refunded by bank transfer or UPI to an account you provide.",
        ],
      },
      {
        title: "Failed or Duplicate Payments",
        content: [
          "If money was debited from your account but your booking was not confirmed, or you were charged twice, please contact us with your payment details. Such amounts will be refunded in full after verification.",
        ],
      },
      {
        title: "Changes to This Policy",
        content: [
          "We may update this Cancellation & Refund Policy from time to time. The revised version will be posted on this page with the updated effective date.",
        ],
      },
    ],
  },
  ta: {
    title: "ரத்து & பணத்திருப்பக் கொள்கை",
    effectiveLabel: "நடைமுறை தேதி",
    intro: "திட்டங்கள் மாறலாம் என்பதை நாங்கள் புரிந்துகொள்கிறோம். VK Ayurveda-வில் ஆலோசனை அல்லது சிகிச்சையை எவ்வாறு ரத்து செய்வது அல்லது மாற்றுவது, எப்போது பணத்திருப்பம் பெற தகுதியுடையவர் என்பதை இந்த கொள்கை விளக்குகிறது.",
    contactIntro: "ரத்து செய்ய, நேரத்தை மாற்ற அல்லது பணத்திருப்பம் கோர, உங்கள் பெயர் மற்றும் பதிவு செய்த தொலைபேசி எண்ணுடன் எங்களை அழைக்கவும் அல்லது WhatsApp செய்யவும்.",
    sections: [
      {
        title: "ஆலோசனையை ரத்து செய்தல்",
        content: [
          "உங்கள் சந்திப்புக்கு குறைந்தது 24 மணி நேரத்திற்கு முன் 99966 60102 என்ற எண்ணுக்கு அழைத்து அல்லது WhatsApp செய்தி அனுப்பி உங்கள் ஆலோசனை முன்பதிவை ரத்து செய்யலாம்.",
          "குறைந்தது 24 மணி நேரத்திற்கு முன் செய்யப்படும் ரத்துகளுக்கு ஆலோசனை கட்டணம் முழுமையாக திருப்பித் தரப்படும்.",
          "சந்திப்புக்கு 24 மணி நேரத்திற்குள் செய்யப்படும் ரத்துகள் அல்லது முன்னறிவிப்பின்றி தவறவிடப்பட்ட சந்திப்புகளுக்கு பணத்திருப்பம் இல்லை.",
        ],
      },
      {
        title: "நேரத்தை மாற்றுதல்",
        content: [
          "உங்கள் சந்திப்புக்கு குறைந்தது 12 மணி நேரத்திற்கு முன் தெரிவித்தால், ஒரு முறை இலவசமாக ஆலோசனை நேரத்தை மாற்றலாம். புதிய நேரம் மருத்துவர் கிடைப்பதைப் பொறுத்தது.",
          "எந்த காரணத்திற்காகவும் VK Ayurveda உங்கள் சந்திப்பை மாற்றவோ ரத்து செய்யவோ நேர்ந்தால், புதிய நேரத்தை தேர்வு செய்யலாம் அல்லது முழு பணத்திருப்பம் பெறலாம்.",
        ],
      },
      {
        title: "சிகிச்சை தொகுப்புகள்",
        content: [
          "சிகிச்சை தொகுப்புகளை (பஞ்சகர்மா அல்லது சிகிச்சை திட்டங்கள் போன்றவை) முதல் அமர்வுக்கு முன் ரத்து செய்தால், ஏற்கனவே ஏற்பட்ட பதிவு அல்லது மருந்து கட்டணங்களை கழித்து முழு தொகை திருப்பித் தரப்படும்.",
          "தொகுப்பு தொடங்கிய பிறகு, முடிந்த அமர்வுகள் மற்றும் ஏற்கனவே வழங்கப்பட்ட மருந்துகளின் செலவை கழித்து, பயன்படுத்தப்படாத அமர்வுகளுக்கு விகிதாச்சார அடிப்படையில் பணத்திருப்பம் வழங்கப்படும்.",
        ],
      },
      {
        title: "பணத்திருப்பம் இல்லாதவை",
        content: [
          "சுகாதாரம் மற்றும் பாதுகாப்பு காரணங்களுக்காக, வழங்கப்பட்ட மருந்துகள், தைலங்கள் மற்றும் பிற பொருட்களை திருப்பித் தரவோ பணத்திருப்பம் பெறவோ இயலாது.",
          "ஏற்கனவே முடிந்த ஆலோசனைகளுக்கு பணத்திருப்பம் இல்லை.",
        ],
      },
      {
        title: "பணத்திருப்ப செயல்முறை",
        content: [
          "அங்கீகரிக்கப்பட்ட பணத்திருப்பங்கள் 7 வேலை நாட்களுக்குள் செயல்படுத்தப்பட்டு, முதலில் பணம் செலுத்திய முறைக்கே வரவு வைக்கப்படும்.",
          "உங்கள் வங்கி அல்லது கட்டண வழங்குநரைப் பொறுத்து, தொகை உங்கள் கணக்கில் தெரிய கூடுதலாக 5–7 வேலை நாட்கள் ஆகலாம்.",
          "மருத்துவமனையில் ரொக்கமாக செலுத்திய தொகை, நீங்கள் வழங்கும் கணக்கிற்கு வங்கி பரிமாற்றம் அல்லது UPI மூலம் திருப்பித் தரப்படும்.",
        ],
      },
      {
        title: "தோல்வியடைந்த அல்லது இரட்டை கட்டணங்கள்",
        content: [
          "உங்கள் கணக்கிலிருந்து பணம் கழிக்கப்பட்டு முன்பதிவு உறுதிப்படுத்தப்படவில்லை என்றால், அல்லது இரண்டு முறை கட்டணம் வசூலிக்கப்பட்டிருந்தால், உங்கள் கட்டண விவரங்களுடன் எங்களை தொடர்பு கொள்ளுங்கள். சரிபார்ப்புக்குப் பிறகு அத்தொகை முழுமையாக திருப்பித் தரப்படும்.",
        ],
      },
      {
        title: "இந்த கொள்கையில் மாற்றங்கள்",
        content: [
          "நாங்கள் இந்த ரத்து & பணத்திருப்பக் கொள்கையை அவ்வப்போது புதுப்பிக்கலாம். திருத்தப்பட்ட பதிப்பு புதுப்பிக்கப்பட்ட நடைமுறை தேதியுடன் இந்த பக்கத்தில் இடுகையிடப்படும்.",
        ],
      },
    ],
  },
};

export default function CancellationRefund() {
  return <LegalPage path="/cancellation-and-refund" content={content} />;
}
