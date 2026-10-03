import LegalPage, { type Language, type LegalContent } from "./LegalPage";

const content: Record<Language, LegalContent> = {
  en: {
    title: "Terms & Conditions",
    effectiveLabel: "Effective date",
    intro: "These Terms & Conditions govern your use of the VK Ayurveda website and the consultations and treatments you book through it. By using this website or booking a consultation, you agree to these terms.",
    contactIntro: "If you have any questions about these Terms & Conditions, please reach us through any of the channels below.",
    sections: [
      {
        title: "About Our Services",
        content: [
          "VK Ayurveda is a NABH certified Ayurvedic hospital offering consultations and treatments for pain relief, Panchakarma, stroke recovery, and neuro care.",
          "Information on this website is for general awareness only and is not a substitute for a personal medical diagnosis. Treatment plans are decided only after a consultation with our doctors.",
        ],
      },
      {
        title: "Booking a Consultation",
        content: [
          "When you book a consultation, you agree to provide accurate details including your name, phone number, and relevant health information.",
          "Your booking is confirmed only after our team contacts you and allots a date and time. Appointment slots are subject to doctor availability.",
          "The consultation fee shown on the website (currently ₹150) applies to the initial doctor consultation only. Medicines, therapies, and treatment packages are charged separately.",
        ],
      },
      {
        title: "Payments",
        content: [
          "All fees are payable in Indian Rupees (INR). Payments may be made online through our payment partners or at the hospital.",
          "Treatment and package prices are shared with you before treatment begins. Prices may change without prior notice, but any change will not affect a package you have already paid for.",
        ],
      },
      {
        title: "Treatment Outcomes",
        content: [
          "Ayurvedic treatment results vary from person to person depending on age, health condition, lifestyle, and adherence to the prescribed plan.",
          "Patient testimonials and reviews on this website reflect individual experiences and are not a guarantee of similar results.",
        ],
      },
      {
        title: "Patient Responsibilities",
        content: [
          "Please share your complete medical history, current medications, and any allergies with our doctors so they can advise you safely.",
          "Follow the diet, medicine, and therapy instructions given by our doctors. Do not stop any ongoing allopathic medication without consulting your treating physician.",
        ],
      },
      {
        title: "Use of Website Content",
        content: [
          "All text, images, videos, and logos on this website belong to VK Ayurveda and may not be copied, reproduced, or used commercially without our written permission.",
          "You agree not to misuse the website, submit false enquiries, or attempt to disrupt its normal functioning.",
        ],
      },
      {
        title: "Limitation of Liability",
        content: [
          "VK Ayurveda is not liable for any loss arising from reliance on general information published on this website without a proper consultation.",
          "We are not responsible for delays or interruptions caused by technical issues, network failures, or events beyond our reasonable control.",
        ],
      },
      {
        title: "Governing Law",
        content: [
          "These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in Tamil Nadu.",
        ],
      },
      {
        title: "Changes to These Terms",
        content: [
          "We may update these Terms & Conditions from time to time. The revised version will be posted on this page with the updated effective date.",
          "Continued use of our website after any changes constitutes your acceptance of the updated terms.",
        ],
      },
    ],
  },
  ta: {
    title: "விதிமுறைகள் & நிபந்தனைகள்",
    effectiveLabel: "நடைமுறை தேதி",
    intro: "VK Ayurveda இணையதளத்தை பயன்படுத்துவதும், அதன் மூலம் நீங்கள் முன்பதிவு செய்யும் ஆலோசனைகள் மற்றும் சிகிச்சைகளும் இந்த விதிமுறைகள் & நிபந்தனைகளுக்கு உட்பட்டவை. இந்த இணையதளத்தை பயன்படுத்துவதன் மூலம் அல்லது ஆலோசனை முன்பதிவு செய்வதன் மூலம், இந்த விதிமுறைகளை நீங்கள் ஏற்றுக்கொள்கிறீர்கள்.",
    contactIntro: "இந்த விதிமுறைகள் & நிபந்தனைகள் குறித்து ஏதேனும் கேள்விகள் இருந்தால், கீழே உள்ள சேனல்களில் ஏதேனும் ஒன்று மூலம் எங்களை அணுகுங்கள்.",
    sections: [
      {
        title: "எங்கள் சேவைகள் பற்றி",
        content: [
          "VK Ayurveda என்பது வலி நிவாரணம், பஞ்சகர்மா, பக்கவாத மீட்பு மற்றும் நியூரோ பராமரிப்புக்கான ஆலோசனைகள் மற்றும் சிகிச்சைகளை வழங்கும் NABH சான்றளிக்கப்பட்ட ஆயுர்வேத மருத்துவமனை ஆகும்.",
          "இந்த இணையதளத்தில் உள்ள தகவல்கள் பொது விழிப்புணர்வுக்காக மட்டுமே; இது தனிப்பட்ட மருத்துவ பரிசோதனைக்கு மாற்றாகாது. எங்கள் மருத்துவர்களுடன் ஆலோசனைக்குப் பிறகே சிகிச்சை திட்டம் முடிவு செய்யப்படும்.",
        ],
      },
      {
        title: "ஆலோசனை முன்பதிவு",
        content: [
          "ஆலோசனை முன்பதிவு செய்யும்போது, உங்கள் பெயர், தொலைபேசி எண் மற்றும் தொடர்புடைய உடல்நல தகவல்கள் உட்பட சரியான விவரங்களை வழங்க ஒப்புக்கொள்கிறீர்கள்.",
          "எங்கள் குழு உங்களை தொடர்பு கொண்டு தேதி மற்றும் நேரத்தை ஒதுக்கிய பிறகே உங்கள் முன்பதிவு உறுதிப்படுத்தப்படும். சந்திப்பு நேரங்கள் மருத்துவர் கிடைப்பதைப் பொறுத்தது.",
          "இணையதளத்தில் காட்டப்படும் ஆலோசனை கட்டணம் (தற்போது ₹150) முதல் மருத்துவர் ஆலோசனைக்கு மட்டுமே. மருந்துகள், சிகிச்சைகள் மற்றும் சிகிச்சை தொகுப்புகளுக்கு தனியாக கட்டணம் வசூலிக்கப்படும்.",
        ],
      },
      {
        title: "கட்டணங்கள்",
        content: [
          "அனைத்து கட்டணங்களும் இந்திய ரூபாயில் (INR) செலுத்தப்பட வேண்டும். எங்கள் கட்டண கூட்டாளர்கள் மூலம் ஆன்லைனில் அல்லது மருத்துவமனையில் நேரடியாக செலுத்தலாம்.",
          "சிகிச்சை தொடங்கும் முன் சிகிச்சை மற்றும் தொகுப்பு விலைகள் உங்களுடன் பகிரப்படும். விலைகள் முன்னறிவிப்பின்றி மாறலாம், ஆனால் நீங்கள் ஏற்கனவே செலுத்திய தொகுப்பை அது பாதிக்காது.",
        ],
      },
      {
        title: "சிகிச்சை முடிவுகள்",
        content: [
          "வயது, உடல்நிலை, வாழ்க்கை முறை மற்றும் பரிந்துரைக்கப்பட்ட திட்டத்தை பின்பற்றுவதைப் பொறுத்து ஆயுர்வேத சிகிச்சை முடிவுகள் ஒவ்வொருவருக்கும் மாறுபடும்.",
          "இந்த இணையதளத்தில் உள்ள நோயாளி அனுபவங்கள் மற்றும் மதிப்புரைகள் தனிப்பட்ட அனுபவங்களே; இதே போன்ற முடிவுகளுக்கு உத்தரவாதம் அல்ல.",
        ],
      },
      {
        title: "நோயாளியின் பொறுப்புகள்",
        content: [
          "உங்களுக்கு பாதுகாப்பாக ஆலோசனை வழங்க, உங்கள் முழு மருத்துவ வரலாறு, தற்போதைய மருந்துகள் மற்றும் ஒவ்வாமைகளை எங்கள் மருத்துவர்களுடன் பகிருங்கள்.",
          "எங்கள் மருத்துவர்கள் வழங்கும் உணவு, மருந்து மற்றும் சிகிச்சை வழிமுறைகளை பின்பற்றுங்கள். உங்கள் மருத்துவரை கலந்தாலோசிக்காமல் நடந்துகொண்டிருக்கும் அலோபதி மருந்துகளை நிறுத்தாதீர்கள்.",
        ],
      },
      {
        title: "இணையதள உள்ளடக்க பயன்பாடு",
        content: [
          "இந்த இணையதளத்தில் உள்ள அனைத்து உரைகள், படங்கள், வீடியோக்கள் மற்றும் லோகோக்கள் VK Ayurveda-க்கு சொந்தமானவை; எங்கள் எழுத்துப்பூர்வ அனுமதியின்றி நகலெடுக்கவோ, மறுபதிப்பு செய்யவோ, வணிக ரீதியாக பயன்படுத்தவோ கூடாது.",
          "இணையதளத்தை தவறாக பயன்படுத்தவோ, போலி விசாரணைகளை சமர்ப்பிக்கவோ, அதன் இயல்பான செயல்பாட்டை சீர்குலைக்க முயற்சிக்கவோ மாட்டீர்கள் என்று ஒப்புக்கொள்கிறீர்கள்.",
        ],
      },
      {
        title: "பொறுப்பு வரம்பு",
        content: [
          "முறையான ஆலோசனையின்றி இந்த இணையதளத்தில் வெளியிடப்பட்ட பொதுத் தகவல்களை நம்பியதால் ஏற்படும் எந்த இழப்புக்கும் VK Ayurveda பொறுப்பல்ல.",
          "தொழில்நுட்ப சிக்கல்கள், நெட்வொர்க் தோல்விகள் அல்லது எங்கள் கட்டுப்பாட்டிற்கு அப்பாற்பட்ட நிகழ்வுகளால் ஏற்படும் தாமதங்கள் அல்லது இடையூறுகளுக்கு நாங்கள் பொறுப்பல்ல.",
        ],
      },
      {
        title: "ஆளும் சட்டம்",
        content: [
          "இந்த விதிமுறைகள் இந்திய சட்டங்களுக்கு உட்பட்டவை. எந்த சர்ச்சையும் தமிழ்நாட்டில் உள்ள நீதிமன்றங்களின் பிரத்தியேக அதிகார வரம்பிற்கு உட்பட்டது.",
        ],
      },
      {
        title: "இந்த விதிமுறைகளில் மாற்றங்கள்",
        content: [
          "நாங்கள் இந்த விதிமுறைகள் & நிபந்தனைகளை அவ்வப்போது புதுப்பிக்கலாம். திருத்தப்பட்ட பதிப்பு புதுப்பிக்கப்பட்ட நடைமுறை தேதியுடன் இந்த பக்கத்தில் இடுகையிடப்படும்.",
          "எந்த மாற்றங்களுக்கும் பிறகு எங்கள் இணையதளத்தை தொடர்ந்து பயன்படுத்துவது புதுப்பிக்கப்பட்ட விதிமுறைகளை நீங்கள் ஏற்றுக்கொண்டதாக கருதப்படும்.",
        ],
      },
    ],
  },
};

export default function TermsConditions() {
  return <LegalPage path="/generic/terms-and-conditions" content={content} />;
}
