import LegalPage, { type Language, type LegalContent } from "./LegalPage";

const sections = {
  en: [
    {
      title: "Information We Collect",
      content: [
        "When you submit a consultation request on our website, we collect personal details including your name, phone number, email address, and any health-related information you choose to share.",
        "We may also collect non-personal data such as browser type, pages visited, and approximate location to improve our website experience.",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "Your contact details are used solely to confirm your appointment, guide you through the next steps, and share updates about your consultation at VK Ayurveda.",
        "We may send you relevant health tips or treatment information via WhatsApp or SMS. You can opt out at any time by replying STOP.",
        "We do not use your information for automated decision-making or profiling.",
      ],
    },
    {
      title: "Sharing of Information",
      content: [
        "We do not sell, rent, or trade your personal information to third parties.",
        "Your data may be shared with our in-house medical team strictly to facilitate your consultation. It will never be disclosed to advertisers or unrelated businesses.",
      ],
    },
    {
      title: "Data Retention",
      content: [
        "We retain your personal information only for as long as necessary to provide our services and comply with applicable legal obligations.",
        "You may request deletion of your data at any time by contacting us at the details provided below.",
      ],
    },
    {
      title: "Cookies",
      content: [
        "Our website may use cookies to enhance your browsing experience. These are small files stored on your device that help us understand site usage patterns.",
        "You can disable cookies in your browser settings; however, some parts of the site may not function correctly without them.",
      ],
    },
    {
      title: "Security",
      content: [
        "We take reasonable technical and organisational measures to protect your information from unauthorised access, loss, or misuse.",
        "While we strive to safeguard your data, no internet transmission is completely secure. Please do not share sensitive medical records through the website contact form.",
      ],
    },
    {
      title: "Your Rights",
      content: [
        "You have the right to access, correct, or delete the personal information we hold about you.",
        "To exercise any of these rights, please contact us using the details below and we will respond within 7 working days.",
      ],
    },
    {
      title: "Changes to This Policy",
      content: [
        "We may update this Privacy Policy from time to time. The revised version will be posted on this page with the updated effective date.",
        "Continued use of our website after any changes constitutes your acceptance of the updated policy.",
      ],
    },
  ],
  ta: [
    {
      title: "நாங்கள் சேகரிக்கும் தகவல்கள்",
      content: [
        "நீங்கள் எங்கள் இணையதளத்தில் ஆலோசனை கோரிக்கை சமர்ப்பிக்கும்போது, உங்கள் பெயர், தொலைபேசி எண், மின்னஞ்சல் முகவரி மற்றும் நீங்கள் பகிர விரும்பும் உடல்நல தகவல்களை நாங்கள் சேகரிக்கிறோம்.",
        "உலாவி வகை, பார்வையிட்ட பக்கங்கள் மற்றும் தோராயமான இருப்பிடம் போன்ற தனிப்பட்ட அல்லாத தகவல்களையும் இணையதள அனுபவத்தை மேம்படுத்த நாங்கள் சேகரிக்கலாம்.",
      ],
    },
    {
      title: "உங்கள் தகவல்களை நாங்கள் எவ்வாறு பயன்படுத்துகிறோம்",
      content: [
        "உங்கள் தொடர்பு விவரங்கள் உங்கள் சந்திப்பை உறுதிப்படுத்தவும், அடுத்த கட்ட வழிகாட்டுதல்களை வழங்கவும், VK Ayurveda-வில் உங்கள் ஆலோசனை குறித்த புதுப்பிப்புகளை பகிர மட்டுமே பயன்படுத்தப்படுகின்றன.",
        "WhatsApp அல்லது SMS மூலம் தொடர்புடைய உடல்நல குறிப்புகள் அல்லது சிகிச்சை தகவல்களை நாங்கள் அனுப்பலாம். STOP என்று பதிலளிப்பதன் மூலம் எந்த நேரத்திலும் நீங்கள் விலகலாம்.",
        "தானியங்கி முடிவெடுப்பு அல்லது சுயவிவர உருவாக்கத்திற்கு உங்கள் தகவல்களை நாங்கள் பயன்படுத்துவதில்லை.",
      ],
    },
    {
      title: "தகவல் பகிர்வு",
      content: [
        "உங்கள் தனிப்பட்ட தகவல்களை நாங்கள் மூன்றாம் தரப்பினரிடம் விற்பனை செய்வதில்லை, வாடகைக்கு கொடுப்பதில்லை அல்லது வர்த்தகம் செய்வதில்லை.",
        "உங்கள் ஆலோசனையை எளிதாக்குவதற்காக மட்டுமே உங்கள் தரவு எங்கள் உள்நிலை மருத்துவ குழுவுடன் பகிரப்படலாம். விளம்பரதாரர்கள் அல்லது தொடர்பில்லாத வணிகங்களிடம் இது எப்போதும் வெளிப்படுத்தப்படாது.",
      ],
    },
    {
      title: "தரவு பாதுகாப்பு காலம்",
      content: [
        "எங்கள் சேவைகளை வழங்கவும் பொருந்தும் சட்ட கடமைகளை நிறைவேற்றவும் தேவையான காலம் மட்டுமே உங்கள் தனிப்பட்ட தகவல்களை நாங்கள் வைத்திருக்கிறோம்.",
        "கீழே கொடுக்கப்பட்ட விவரங்கள் மூலம் எங்களை தொடர்பு கொள்வதன் மூலம் எந்த நேரத்திலும் உங்கள் தரவை நீக்கும்படி கோரலாம்.",
      ],
    },
    {
      title: "குக்கீகள்",
      content: [
        "உங்கள் உலாவல் அனுபவத்தை மேம்படுத்த எங்கள் இணையதளம் குக்கீகளை பயன்படுத்தலாம். இவை உங்கள் சாதனத்தில் சேமிக்கப்படும் சிறிய கோப்புகள் ஆகும், அவை தளப் பயன்பாட்டு முறைகளை புரிந்துகொள்ள உதவுகின்றன.",
        "உங்கள் உலாவி அமைப்புகளில் குக்கீகளை முடக்கலாம்; இருப்பினும், அவற்றின்றி தளத்தின் சில பகுதிகள் சரியாக செயல்படாமல் போகலாம்.",
      ],
    },
    {
      title: "பாதுகாப்பு",
      content: [
        "அங்கீகரிக்கப்படாத அணுகல், இழப்பு அல்லது தவறான பயன்பாட்டிலிருந்து உங்கள் தகவல்களை பாதுகாக்க நாங்கள் நியாயமான தொழில்நுட்ப மற்றும் நிறுவன நடவடிக்கைகளை மேற்கொள்கிறோம்.",
        "உங்கள் தரவை பாதுகாக்க முயற்சிக்கும் அதே நேரத்தில், எந்த இணைய அனுப்பலும் முழுமையாக பாதுகாப்பானது அல்ல. இணையதள தொடர்பு படிவம் மூலம் முக்கியமான மருத்துவ பதிவுகளை பகிராதீர்கள்.",
      ],
    },
    {
      title: "உங்கள் உரிமைகள்",
      content: [
        "நாங்கள் வைத்திருக்கும் உங்கள் தனிப்பட்ட தகவல்களை அணுக, சரிசெய்ய அல்லது நீக்க உங்களுக்கு உரிமை உள்ளது.",
        "இந்த உரிமைகளில் ஏதேனும் ஒன்றை பயன்படுத்த கீழே உள்ள விவரங்களைப் பயன்படுத்தி எங்களை தொடர்பு கொள்ளுங்கள், 7 வேலை நாட்களுக்குள் நாங்கள் பதிலளிப்போம்.",
      ],
    },
    {
      title: "இந்த கொள்கையில் மாற்றங்கள்",
      content: [
        "நாங்கள் இந்த தனியுரிமை கொள்கையை அவ்வப்போது புதுப்பிக்கலாம். திருத்தப்பட்ட பதிப்பு புதுப்பிக்கப்பட்ட நடைமுறை தேதியுடன் இந்த பக்கத்தில் இடுகையிடப்படும்.",
        "எந்த மாற்றங்களுக்கும் பிறகு எங்கள் இணையதளத்தை தொடர்ந்து பயன்படுத்துவது புதுப்பிக்கப்பட்ட கொள்கையை நீங்கள் ஏற்றுக்கொண்டதாக கருதப்படும்.",
      ],
    },
  ],
};

const content: Record<Language, LegalContent> = {
  en: {
    title: "Privacy Policy",
    effectiveLabel: "Effective date",
    intro: "At VK Ayurveda we respect your privacy. This policy explains what personal information we collect, why we collect it, and how we protect it when you use our website or book a consultation.",
    contactIntro: "If you have any questions about this Privacy Policy or wish to exercise your rights, please reach us through any of the channels below.",
    sections: sections.en,
  },
  ta: {
    title: "தனியுரிமை கொள்கை",
    effectiveLabel: "நடைமுறை தேதி",
    intro: "VK Ayurveda-வில் நாங்கள் உங்கள் தனியுரிமையை மதிக்கிறோம். நீங்கள் எங்கள் இணையதளத்தை பயன்படுத்தும்போது அல்லது ஆலோசனை முன்பதிவு செய்யும்போது நாங்கள் என்ன தனிப்பட்ட தகவல்களை சேகரிக்கிறோம், ஏன் சேகரிக்கிறோம், எவ்வாறு பாதுகாக்கிறோம் என்பதை இந்த கொள்கை விளக்குகிறது.",
    contactIntro: "இந்த தனியுரிமை கொள்கை குறித்து ஏதேனும் கேள்விகள் இருந்தால் அல்லது உங்கள் உரிமைகளை பயன்படுத்த விரும்பினால், கீழே உள்ள சேனல்களில் ஏதேனும் ஒன்று மூலம் எங்களை அணுகுங்கள்.",
    sections: sections.ta,
  },
};

export default function PrivacyPolicy() {
  return <LegalPage path="/generic/privacy-policy" content={content} />;
}
