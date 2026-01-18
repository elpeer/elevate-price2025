// Proposal section types
export type SectionType = 
  | 'hero'
  | 'about'
  | 'whyElevate'
  | 'coreValues'
  | 'testimonials'
  | 'projects'
  | 'siteContent'
  | 'deliverables'
  | 'projectDetails'
  | 'pricing'
  | 'signature';

export interface ProposalSection {
  id: string;
  type: SectionType;
  visible: boolean;
  order: number;
  data: Record<string, any>;
}

export interface ClientInfo {
  clientName: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  secondaryPhone?: string;
}

export interface Proposal {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'signed';
  content: ProposalSection[];
  client_info: ClientInfo;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Signature {
  id: string;
  proposal_id: string;
  client_name: string;
  signature_data: string;
  signed_at: string;
  agreed_to_terms: boolean;
  ip_address: string | null;
  created_at: string;
}

// Default section data templates
export const defaultHeroData = {
  title: 'אפיון ועיצוב UX/UI',
  subtitle: 'עבור Stagent CRM',
  backgroundImage: 'https://api.builder.io/api/v1/image/assets/TEMP/78b9d39700d607107fb83c8be8f4161bf83eae8b?placeholderIfAbsent=true'
};

export const defaultAboutData = {
  title: 'אנו נרגשים להתחיל את\nהפרויקט שלך!',
  paragraphs: [
    'אנחנו Elevate Digital Studio, המתמחה בעיצוב חווית משתמש (UX) וממשק משתמש (UI) למוצרים דיגיטליים ומערכות מורכבות. אנו מתמחים בעיצוב ופיתוח אתרי דגל בסטנדרטים מתקדמים, אפליקציות WEB, פלטפורמות מסחר אלקטרוני, דפי נחיתה ומערכות אינטרנט מורכבות. הצוות המוכשר שלנו בעל ניסיון רב בעבודה על פרויקטים מתעשיות שונות ועם מותגים מובילים בארץ ובעולם.',
    'אנו נרגשים לשתף פעולה בפרויקט שלכם! הצעה זו כוללת את את התוכנית שלנו להביא את החזון שלכם לעולם הדיגיטלי בצורה הטובה ביותר.',
    'אל תהססו לפנות בכל שאלה. ביחד, בואו ניצור משהו מדהים!'
  ]
};

export const defaultWhyElevateData = {
  description: 'אנו מעצבים חוויות משתמש אינטואיטיביות וממשקים ויזואליים המשקפים את מהות המותג שלך ומגבירים מעורבות.',
  services: [
    { title: 'שירות מקיף', description: 'מעיצוב UI/UX ועד פיתוח, מיתוג, אירוח, אבטחה ואסטרטגיה דיגיטלית' },
    { title: 'פתרונות מותאמים אישית', description: 'הפורטפוליו המגוון שלנו מציג את יכולתנו להסתגל לתעשיות שונות' },
    { title: 'עיצוב אתר אסטרטגי להצלחה עסקית', description: 'שדרג את הנוכחות שלך באינטרנט' },
    { title: 'מצוינות ללא טרחה', description: 'תירגע בזמן שאנו מטפלים בכל פרט' },
    { title: 'תמיכת לקוחות יוצאת דופן', description: 'החזון שלך מניע את העבודה שלנו' },
    { title: 'הצטיינות מהימנה', description: 'אנו משרתים את החברות המובילות בישראל' }
  ]
};

export const defaultCoreValuesData = {
  values: [
    { title: 'חדשנות', description: 'דחיפת גבולות בעיצוב ופיתוח אתרים עם פתרונות חדשניים.' },
    { title: 'מיקוד לקוח', description: 'מתן עדיפות לתקשורת ברורה ופתרונות מותאמים.' },
    { title: 'מהימנות', description: 'אספקת תוצאות אמינות ואיכותיות באופן עקבי.' },
    { title: 'שירות מקיף', description: 'נציע פתרונות משולבים ברמה גבוהה.' }
  ]
};

export const defaultTestimonialsData = {
  title: 'מה אומרים עלינו',
  testimonials: [
    { name: 'יוסי כהן', title: 'מנכ"ל', text: 'על Elevate הוטל לעצב מחדש ולפתח את האתר החדש שלנו.' },
    { name: 'דני לוי', title: 'VP Product', text: 'אני יכול לומר בביטחון כי Elevate סיפקה חלק מעבודות העיצוב הטובות ביותר.' }
  ]
};

export const defaultProjectsData = {
  title: 'פרויקטים',
  description: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות שלנו',
  projects: [
    { title: 'Israel Canada', description: 'בין אם שמעתם עלינו מחבר', image: '' },
    { title: 'Polestar', description: 'בין אם שמעתם עלינו מחבר', image: '' }
  ]
};

export const defaultSiteContentData = {
  title: 'תכולת האתר',
  description: 'מבנה האתר מאורגן כהיררכיה ברורה',
  items: [
    { title: 'עמוד הבית', description: 'הירו, קומת יתרונות, קומת קטגוריות' },
    { title: 'עמוד קטגוריה', description: 'הסבר קצר על המוצרים שלנו' },
    { title: 'עמוד מוצר', description: 'הירו, קומת יתרונות' },
    { title: 'אודות', description: 'הירו, קומת יתרונות' }
  ]
};

export const defaultDeliverablesData = {
  title: 'כל מה שנספק לך',
  included: [
    'אפיון ועיצוב כל התבניות בהתאם לרשימת המסכים',
    'בניית Design System',
    'ליווי צוות הפיתוח עד לשלבים מתקדמים',
    'מיקרו אנימציה ואלמנטים אינטרקאטיביים',
    'נגישות האתר'
  ],
  excluded: [
    'פיתוח Frontend',
    'מיתוג (אופציונלי)',
    'יצירת תוכן',
    'הכנסת תוכן ועריכה'
  ]
};

export const defaultProjectDetailsData = {
  title: 'פרטים נוספים על הפרויקט',
  faqItems: [
    { title: 'אחריות', content: 'מועד תקופת האחריות יחל מיום העלייה לאוויר למשך 3 חודשים.' },
    { title: 'תקלות', content: 'במקרה של תקלות טכניות, צוות התמיכה שלנו יהיה זמין.' },
    { title: 'הדרכה של אתר CMS', content: 'אנו מספקים הדרכה מקיפה לשימוש במערכת.' }
  ]
};

export const defaultPricingData = {
  basePricingItems: [
    { title: 'אבחון ומחקר', priceValue: 5000, hours: 30, items: ['ראיונות עומק', 'ניתוח הממשק הקיים', 'ניתוח מתחרים'] },
    { title: 'תכנון UX עדכני', priceValue: 2000, hours: 30, items: ['ראיונות עומק', 'ניתוח הממשק הקיים'] },
    { title: 'עיצוב UI', priceValue: 1000, hours: 30, items: ['ראיונות עומק', 'ניתוח הממשק הקיים'] },
    { title: 'העברה לפיתוח וליווי', priceValue: 2000, hours: 30, items: ['ראיונות עומק', 'ניתוח הממשק הקיים'] }
  ],
  categories: [
    {
      id: 'accessibility',
      title: 'נגישות',
      options: [
        { id: 'addon', title: 'תוסף/רכיב נגישות', price: '₪48,000', priceValue: 48000, hours: 40, description: 'נגישות תיושם ברמת הקוד' },
        { id: 'report', title: 'דו"ח נגישות', price: '₪48,000', priceValue: 48000, hours: 40, description: 'נגישות תיושם ברמת הקוד' }
      ]
    }
  ],
  paymentTerms: [
    'שבועיים אחרי פגישת התנעה – 15%',
    'סיום עיצוב – 30%',
    'השלמת פיתוח – 35%',
    'שבועיים אחרי התקנה ווידוא תקינות – 20%'
  ]
};

export const defaultSignatureData = {
  title: 'אישור לקוח',
  agreementText: 'בחתימה מעלה, אני מאשר שקראתי, הבנתי והסכמתי לכל התנאים.'
};

// Generate default sections for a new proposal
export function getDefaultSections(): ProposalSection[] {
  return [
    { id: '1', type: 'hero', visible: true, order: 0, data: defaultHeroData },
    { id: '2', type: 'about', visible: true, order: 1, data: defaultAboutData },
    { id: '3', type: 'whyElevate', visible: true, order: 2, data: defaultWhyElevateData },
    { id: '4', type: 'coreValues', visible: true, order: 3, data: defaultCoreValuesData },
    { id: '5', type: 'testimonials', visible: true, order: 4, data: defaultTestimonialsData },
    { id: '6', type: 'projects', visible: true, order: 5, data: defaultProjectsData },
    { id: '7', type: 'siteContent', visible: true, order: 6, data: defaultSiteContentData },
    { id: '8', type: 'deliverables', visible: true, order: 7, data: defaultDeliverablesData },
    { id: '9', type: 'projectDetails', visible: true, order: 8, data: defaultProjectDetailsData },
    { id: '10', type: 'pricing', visible: true, order: 9, data: defaultPricingData },
    { id: '11', type: 'signature', visible: true, order: 10, data: defaultSignatureData }
  ];
}

export const sectionLabels: Record<SectionType, string> = {
  hero: 'הירו',
  about: 'אודות',
  whyElevate: 'למה Elevate',
  coreValues: 'ערכי ליבה',
  testimonials: 'המלצות',
  projects: 'פרויקטים',
  siteContent: 'תכולת האתר',
  deliverables: 'תוצרים',
  projectDetails: 'פרטי הפרויקט',
  pricing: 'תמחור',
  signature: 'חתימה'
};
