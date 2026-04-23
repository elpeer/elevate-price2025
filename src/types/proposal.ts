// ===============================
// PROPOSAL SECTION TYPES - PRO CMS
// ===============================

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

// ===============================
// FIELD DEFINITIONS FOR CMS
// ===============================

export type FieldType = 'text' | 'textarea' | 'image' | 'responsiveImage' | 'repeater' | 'boolean' | 'number' | 'select';

export interface FieldDefinition {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[]; // for select
  itemFields?: FieldDefinition[]; // for repeater
  required?: boolean;
}

// ===============================
// SECTION DATA INTERFACES
// ===============================

export interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  scrollText: string;
  desktopImage: string;
  mobileImage: string;
  proposalLabel: string;
  contactLabel: string;
  phoneLabel: string;
  emailLabel: string;
}

export interface AboutData {
  title: string;
  paragraphs: string[];
  ownerName: string;
  ownerTitle: string;
  ownerEmail: string;
  ownerImage: string;
}

export interface WhyElevateServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyElevateData {
  headerImage: string;
  description: string;
  services: WhyElevateServiceItem[];
}

export interface CoreValueItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface CoreValuesData {
  title: string;
  missionText: string[];
  desktopBackgroundImage: string;
  mobileBackgroundImage: string;
  clientsTitle: string;
  clientLogos: { id: string; image: string }[];
  values: CoreValueItem[];
}

export interface TestimonialItem {
  id: string;
  avatar: string;
  name: string;
  role: string;
  companyLogo: string;
  quote: string;
}

export interface TestimonialsData {
  title: string;
  subtitle: string;
  testimonials: TestimonialItem[];
}

export interface ProjectItem {
  id: string;
  desktopImage: string;
  mobileImage: string;
  title: string;
  description: string;
}

export interface ProjectsData {
  title: string;
  subtitle: string;
  projects: ProjectItem[];
}

export interface SiteContentItem {
  id: string;
  title: string;
  description: string;
}

export interface SiteContentData {
  title: string;
  subtitle: string;
  items: SiteContentItem[];
}

export interface DeliverablesData {
  title: string;
  includedTitle: string;
  excludedTitle: string;
  desktopBackgroundImage: string;
  mobileBackgroundImage: string;
  includedItems: { id: string; text: string }[];
  excludedItems: { id: string; text: string }[];
}

export interface FaqItem {
  id: string;
  title: string;
  content: string;
}

export interface ProjectDetailsData {
  title: string;
  sideImage: string;
  faqItems: FaqItem[];
}

export interface PricingPackageItem {
  id: string;
  text: string;
}

export interface PricingPackage {
  id: string;
  title: string;
  price: number;
  hours: number;
  items: PricingPackageItem[];
}

export interface PricingAddonOption {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  hours: number;
  description: string;
  details: string;
}

export interface PricingCategory {
  id: string;
  title: string;
  options: PricingAddonOption[];
}

export interface PricingData {
  title: string;
  addonsTitle: string;
  addonsSubtitle: string;
  summaryTitle: string;
  totalLabel: string;
  hoursLabel: string;
  basePackages: PricingPackage[];
  addonCategories: PricingCategory[];
  paymentTermsTitle: string;
  paymentTerms: { id: string; text: string }[];
  notes: { id: string; text: string }[];
}

export interface SignatureData {
  title: string;
  signatureTitle: string;
  signatureSubtitle: string;
  clientNameLabel: string;
  clientNamePlaceholder: string;
  dateLabel: string;
  agreementText: string;
  submitButtonText: string;
  successTitle: string;
  successMessage: string;
}

// ===============================
// FIELD SCHEMAS FOR EACH SECTION
// ===============================

export const sectionFieldSchemas: Record<SectionType, FieldDefinition[]> = {
  hero: [
    { key: 'title', label: 'כותרת ראשית', type: 'text', required: true },
    { key: 'subtitle', label: 'כותרת משנית', type: 'text' },
    { key: 'ctaText', label: 'טקסט כפתור', type: 'text' },
    { key: 'scrollText', label: 'טקסט גלילה', type: 'text' },
    { key: 'proposalLabel', label: 'תווית הצעה לכבוד', type: 'text' },
    { key: 'contactLabel', label: 'תווית איש קשר', type: 'text' },
    { key: 'phoneLabel', label: 'תווית טלפון', type: 'text' },
    { key: 'emailLabel', label: 'תווית מייל', type: 'text' },
    { key: 'desktopImage', label: 'תמונת רקע (דסקטופ)', type: 'image' },
    { key: 'mobileImage', label: 'תמונת רקע (מובייל)', type: 'image' },
  ],
  about: [
    { key: 'title', label: 'כותרת', type: 'textarea', required: true },
    { key: 'paragraphs', label: 'פסקאות', type: 'repeater', itemFields: [{ key: 'text', label: 'טקסט', type: 'textarea' }] },
    { key: 'ownerName', label: 'שם בעלים', type: 'text' },
    { key: 'ownerTitle', label: 'תפקיד', type: 'text' },
    { key: 'ownerEmail', label: 'אימייל', type: 'text' },
    { key: 'ownerImage', label: 'תמונת בעלים', type: 'image' },
  ],
  whyElevate: [
    { key: 'headerImage', label: 'תמונת כותרת', type: 'image' },
    { key: 'description', label: 'תיאור', type: 'textarea' },
    { key: 'services', label: 'שירותים', type: 'repeater', itemFields: [
      { key: 'icon', label: 'אייקון', type: 'image' },
      { key: 'title', label: 'כותרת', type: 'text' },
      { key: 'description', label: 'תיאור', type: 'textarea' },
    ]},
  ],
  coreValues: [
    { key: 'title', label: 'כותרת', type: 'text' },
    { key: 'missionText', label: 'טקסט משימה', type: 'repeater', itemFields: [{ key: 'text', label: 'פסקה', type: 'textarea' }] },
    { key: 'desktopBackgroundImage', label: 'רקע (דסקטופ)', type: 'image' },
    { key: 'mobileBackgroundImage', label: 'רקע (מובייל)', type: 'image' },
    { key: 'clientsTitle', label: 'כותרת לקוחות', type: 'text' },
    { key: 'clientLogos', label: 'לוגואים', type: 'repeater', itemFields: [{ key: 'image', label: 'לוגו', type: 'image' }] },
    { key: 'values', label: 'ערכים', type: 'repeater', itemFields: [
      { key: 'icon', label: 'אייקון', type: 'image' },
      { key: 'title', label: 'כותרת', type: 'text' },
      { key: 'description', label: 'תיאור', type: 'textarea' },
    ]},
  ],
  testimonials: [
    { key: 'title', label: 'כותרת', type: 'text' },
    { key: 'subtitle', label: 'תת כותרת', type: 'textarea' },
    { key: 'testimonials', label: 'המלצות', type: 'repeater', itemFields: [
      { key: 'avatar', label: 'תמונה', type: 'image' },
      { key: 'name', label: 'שם', type: 'text' },
      { key: 'role', label: 'תפקיד', type: 'text' },
      { key: 'companyLogo', label: 'לוגו חברה', type: 'image' },
      { key: 'quote', label: 'ציטוט', type: 'textarea' },
    ]},
  ],
  projects: [
    { key: 'title', label: 'כותרת', type: 'text' },
    { key: 'subtitle', label: 'תת כותרת', type: 'textarea' },
    { key: 'projects', label: 'פרויקטים', type: 'repeater', itemFields: [
      { key: 'desktopImage', label: 'תמונה (דסקטופ)', type: 'image' },
      { key: 'mobileImage', label: 'תמונה (מובייל)', type: 'image' },
      { key: 'title', label: 'שם פרויקט', type: 'text' },
      { key: 'description', label: 'תיאור', type: 'textarea' },
    ]},
  ],
  siteContent: [
    { key: 'title', label: 'כותרת', type: 'text' },
    { key: 'subtitle', label: 'תת כותרת', type: 'textarea' },
    { key: 'items', label: 'עמודים', type: 'repeater', itemFields: [
      { key: 'title', label: 'שם עמוד', type: 'text' },
      { key: 'description', label: 'תיאור', type: 'textarea' },
    ]},
  ],
  deliverables: [
    { key: 'title', label: 'כותרת', type: 'text' },
    { key: 'includedTitle', label: 'כותרת כלול', type: 'text' },
    { key: 'excludedTitle', label: 'כותרת לא כלול', type: 'text' },
    { key: 'desktopBackgroundImage', label: 'רקע (דסקטופ)', type: 'image' },
    { key: 'mobileBackgroundImage', label: 'רקע (מובייל)', type: 'image' },
    { key: 'includedItems', label: 'כלול בהצעה', type: 'repeater', itemFields: [{ key: 'text', label: 'פריט', type: 'text' }] },
    { key: 'excludedItems', label: 'לא כלול', type: 'repeater', itemFields: [{ key: 'text', label: 'פריט', type: 'text' }] },
  ],
  projectDetails: [
    { key: 'title', label: 'כותרת', type: 'text' },
    { key: 'sideImage', label: 'תמונה צדדית', type: 'image' },
    { key: 'faqItems', label: 'שאלות נפוצות', type: 'repeater', itemFields: [
      { key: 'title', label: 'שאלה', type: 'text' },
      { key: 'content', label: 'תשובה', type: 'textarea' },
    ]},
  ],
  pricing: [
    { key: 'addonsTitle', label: 'כותרת תוספות', type: 'text' },
    { key: 'addonsSubtitle', label: 'תת כותרת תוספות', type: 'textarea' },
    { key: 'summaryTitle', label: 'כותרת סיכום', type: 'text' },
    { key: 'totalLabel', label: 'תווית סה"כ', type: 'text' },
    { key: 'hoursLabel', label: 'תווית שעות', type: 'text' },
    { key: 'basePackages', label: 'חבילות בסיס', type: 'repeater', itemFields: [
      { key: 'title', label: 'שם חבילה', type: 'text' },
      { key: 'price', label: 'מחיר', type: 'number' },
      { key: 'hours', label: 'שעות', type: 'number' },
      { key: 'items', label: 'פריטים', type: 'repeater', itemFields: [{ key: 'text', label: 'פריט', type: 'text' }] },
    ]},
    { key: 'addonCategories', label: 'קטגוריות תוספות', type: 'repeater', itemFields: [
      { key: 'title', label: 'שם קטגוריה', type: 'text' },
      { key: 'options', label: 'אפשרויות', type: 'repeater', itemFields: [
        { key: 'title', label: 'שם', type: 'text' },
        { key: 'price', label: 'מחיר (טקסט)', type: 'text' },
        { key: 'priceValue', label: 'מחיר (מספר)', type: 'number' },
        { key: 'hours', label: 'שעות', type: 'number' },
        { key: 'description', label: 'תיאור', type: 'textarea' },
      ]},
    ]},
    { key: 'paymentTermsTitle', label: 'כותרת תנאי תשלום', type: 'text' },
    { key: 'paymentTerms', label: 'תנאי תשלום', type: 'repeater', itemFields: [{ key: 'text', label: 'תנאי', type: 'text' }] },
    { key: 'notes', label: 'הערות', type: 'repeater', itemFields: [{ key: 'text', label: 'הערה', type: 'text' }] },
  ],
  signature: [
    { key: 'title', label: 'כותרת', type: 'text' },
    { key: 'signatureTitle', label: 'כותרת חתימה', type: 'text' },
    { key: 'signatureSubtitle', label: 'תת כותרת חתימה', type: 'text' },
    { key: 'clientNameLabel', label: 'תווית שם לקוח', type: 'text' },
    { key: 'clientNamePlaceholder', label: 'פלייסהולדר שם', type: 'text' },
    { key: 'dateLabel', label: 'תווית תאריך', type: 'text' },
    { key: 'agreementText', label: 'טקסט הסכמה', type: 'textarea' },
    { key: 'submitButtonText', label: 'טקסט כפתור', type: 'text' },
    { key: 'successTitle', label: 'כותרת הצלחה', type: 'text' },
    { key: 'successMessage', label: 'הודעת הצלחה', type: 'textarea' },
  ],
};

// ===============================
// DEFAULT DATA - ACTUAL CONTENT FROM LIVE SITE
// ===============================

export const defaultHeroData: HeroData = {
  title: 'אפיון ועיצוב UX/UI',
  subtitle: 'עבור Stagent CRM',
  ctaText: 'גלול להצעה',
  scrollText: 'גלול למטה',
  proposalLabel: 'הצעה לכבוד',
  contactLabel: 'איש קשר',
  phoneLabel: 'טלפון',
  emailLabel: 'מייל',
  desktopImage: '',
  mobileImage: '',
};

export const defaultAboutData: AboutData = {
  title: 'אנו נרגשים להתחיל את\nהפרויקט שלך!',
  paragraphs: [
    'אנחנו Elevate Digital Studio, המתמחה בעיצוב חווית משתמש (UX) וממשק משתמש (UI) למוצרים דיגיטליים ומערכות מורכבות.',
    'אנו נרגשים לשתף פעולה בפרויקט שלכם!',
    'אל תהססו לפנות בכל שאלה. ביחד, בואו ניצור משהו מדהים!'
  ],
  ownerName: 'גדי מאירסון',
  ownerTitle: 'CEO elevate',
  ownerEmail: 'gadi@elevate.co.il',
  ownerImage: '',
};

export const defaultWhyElevateData: WhyElevateData = {
  headerImage: '',
  description: 'אנו מעצבים חוויות משתמש אינטואיטיביות וממשקים ויזואליים המשקפים את מהות המותג שלך ומגבירים מעורבות.',
  services: [
    { id: '1', icon: '', title: 'שירות מקיף', description: 'מעיצוב UI/UX ועד פיתוח, מיתוג, אירוח, אבטחה ואסטרטגיה דיגיטלית - אנו מציעים שירותי אינטרנט מקיפים תחת קורת גג אחת.' },
    { id: '2', icon: '', title: 'פתרונות מותאמים אישית', description: 'הפורטפוליו המגוון שלנו מציג את יכולתנו להסתגל לתעשיות שונות.' },
    { id: '3', icon: '', title: 'עיצוב אתר אסטרטגי להצלחה עסקית', description: 'שדרג את הנוכחות שלך באינטרנט עם אתר אינטרנט שנבנה בקפידה.' },
    { id: '4', icon: '', title: 'מצוינות ללא טרחה', description: 'תירגע בזמן שאנו מטפלים בכל פרט.' },
    { id: '5', icon: '', title: 'תמיכת לקוחות יוצאת דופן', description: 'החזון שלך מניע את העבודה שלנו.' },
    { id: '6', icon: '', title: 'הצטיינות מהימנה', description: 'אנו משרתים את החברות המובילות בישראל.' },
  ],
};

export const defaultCoreValuesData: CoreValuesData = {
  title: 'ערכי הליבה שלנו',
  missionText: [
    'המשימה שלנו היא להעצים עסקים עם פתרונות אינטרנט מתקדמים המניעים צמיחה ומעורבות.',
    'עם מחויבות למצוינות ולשביעות רצון לקוחות, אנו שואפים להיות השותף המנצח.',
  ],
  desktopBackgroundImage: '',
  mobileBackgroundImage: '',
  clientsTitle: 'נבחרנו על ידי הטובים ביותר',
  clientLogos: [
    { id: '1', image: '' },
    { id: '2', image: '' },
    { id: '3', image: '' },
    { id: '4', image: '' },
  ],
  values: [
    { id: '1', icon: '', title: 'חדשנות', description: 'דחיפת גבולות בעיצוב ופיתוח אתרים עם פתרונות חדשניים.' },
    { id: '2', icon: '', title: 'מיקוד לקוח', description: 'מתן עדיפות לתקשורת ברורה ופתרונות מותאמים בהתאמה למטרות הלקוח.' },
    { id: '3', icon: '', title: 'מהימנות', description: 'אספקת תוצאות אמינות ואיכותיות באופן עקבי העולה על הציפיות.' },
    { id: '4', icon: '', title: 'שירות מקיף', description: 'נציע פתרונות משולבים ברמה גבוהה לכל ההיבטים של נוכחות באינטרנט.' },
  ],
};

export const defaultTestimonialsData: TestimonialsData = {
  title: 'מה אומרים עלינו',
  subtitle: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות שלנו, אנו מודדים את ההצלחה שלנו על סמך שביעות רצון הלקוחות שלנו.',
  testimonials: [
    { id: '1', avatar: '', name: 'יוסי כהן', role: 'מנכ"ל', companyLogo: '', quote: '"על Elevate הוטל לעצב מחדש ולפתח את האתר החדש שלנו. המסירה הסופית שלהם לא רק עלתה על הציפיות שלנו."' },
    { id: '2', avatar: '', name: 'דני לוי', role: 'VP Product', companyLogo: '', quote: '"אני יכול לומר בביטחון כי Elevate סיפקה חלק מעבודות העיצוב והפיתוח הטובות ביותר עבור Playtika."' },
    { id: '3', avatar: '', name: 'מיכל אברהם', role: 'Product Manager', companyLogo: '', quote: '"המומחיות והחדשנות של Elevate בתכנון ויישום שיפורים משמעותיים עלו על כל הציפיות שלנו."' },
    { id: '4', avatar: '', name: 'רון שמש', role: 'CTO', companyLogo: '', quote: '"על Elevate הוטל לעצב מחדש ולפתח את האתר החדש שלנו. המסירה הסופית שלהם עלתה על הציפיות."' },
  ],
};

export const defaultProjectsData: ProjectsData = {
  title: 'פרויקטים',
  subtitle: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות שלנו, אנו מודדים את ההצלחה שלנו על סמך שביעות רצון הלקוחות שלנו.',
  projects: [
    { id: '1', desktopImage: '', mobileImage: '', title: 'Israel Canada', description: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות' },
    { id: '2', desktopImage: '', mobileImage: '', title: 'Polestar', description: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות' },
    { id: '3', desktopImage: '', mobileImage: '', title: 'Afcon', description: 'בין אם שמעתם עלינו מחבר או שקראתם את הביקורות החיוביות' },
  ],
};

export const defaultSiteContentData: SiteContentData = {
  title: 'תכולת האתר',
  subtitle: 'מבנה האתר מאורגן כהיררכיה ברורה הכוללת דף בית מרכזי, עמודי תוכן ראשיים',
  items: [
    { id: '1', title: 'עמוד הבית', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
    { id: '2', title: 'עמוד קטגוריה', description: 'הסבר קצר על המוצרים שלנו ופאנל פילטרים של הקטגוריות יחד עם המוצרים' },
    { id: '3', title: 'עמוד מוצר', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
    { id: '4', title: 'אודות', description: 'הירו, קומת יתרונות, קומת קטגוריות, קומת מוצרים, צור קשר, פוטר' },
    { id: '5', title: 'עמוד יתרונות', description: '' },
    { id: '6', title: 'יצירת קשר', description: '' },
  ],
};

export const defaultDeliverablesData: DeliverablesData = {
  title: 'כל מה שנספק לך',
  includedTitle: 'כלול בהצעה',
  excludedTitle: 'לא כלול',
  desktopBackgroundImage: '',
  mobileBackgroundImage: '',
  includedItems: [
    { id: '1', text: 'אפיון ועיצוב כל התבניות בהתאם לרשימת המסכים' },
    { id: '2', text: 'בניית Design System' },
    { id: '3', text: 'ליווי צוות הפיתוח עד לשלבים מתקדמים' },
    { id: '4', text: 'מיקרו אנימציה ואלמנטים אינטרקאטיביים' },
    { id: '5', text: 'נגישות האתר' },
  ],
  excludedItems: [
    { id: '1', text: 'פיתוח Frontend' },
    { id: '2', text: 'מיתוג (אופציונלי)' },
    { id: '3', text: 'יצירת תוכן' },
    { id: '4', text: 'הכנסת תוכן ועריכה' },
  ],
};

export const defaultProjectDetailsData: ProjectDetailsData = {
  title: 'פרטים נוספים על הפרויקט',
  sideImage: '',
  faqItems: [
    { id: '1', title: 'אחריות', content: 'מועד תקופת האחריות יחל מיום העלייה לאוויר למשך 3 חודשים. במסגרת האחריות, חברת elevate תטפל בכל תקלה בהתאם לSLA.' },
    { id: '2', title: 'תקלות', content: 'במקרה של תקלות טכניות, צוות התמיכה שלנו יהיה זמין לסייע בפתרון הבעיה בהקדם האפשרי.' },
    { id: '3', title: 'הדרכה של אתר CMS', content: 'אנו מספקים הדרכה מקיפה לשימוש במערכת ניהול התוכן (CMS) של האתר.' },
  ],
};

export const defaultPricingData: PricingData = {
  title: 'תמחור',
  addonsTitle: 'העדפות ותוספות',
  addonsSubtitle: 'נא לבחור העדפות בנוגע לנגישות ושרתים ועוד..',
  summaryTitle: 'סיכום לוחות זמנים ועלויות',
  totalLabel: 'סה"כ',
  hoursLabel: 'שעות',
  basePackages: [
    { id: '1', title: 'אבחון ומחקר', price: 5000, hours: 30, items: [{ id: '1', text: 'ראיונות עומק לצורך למידה ואפיון צרכים' }, { id: '2', text: 'ניתוח הממשק הקיים' }, { id: '3', text: 'ניתוח מתחרים' }] },
    { id: '2', title: 'תכנון UX עדכני', price: 2000, hours: 30, items: [{ id: '1', text: 'ראיונות עומק' }, { id: '2', text: 'ניתוח הממשק הקיים' }] },
    { id: '3', title: 'עיצוב UI', price: 1000, hours: 30, items: [{ id: '1', text: 'ראיונות עומק' }, { id: '2', text: 'ניתוח הממשק הקיים' }] },
    { id: '4', title: 'העברה לפיתוח וליווי', price: 2000, hours: 30, items: [{ id: '1', text: 'ראיונות עומק' }, { id: '2', text: 'ניתוח הממשק הקיים' }] },
  ],
  addonCategories: [
    { id: 'accessibility', title: 'נגישות', options: [
      { id: 'addon', title: 'תוסף/רכיב נגישות', price: '₪48,000', priceValue: 48000, hours: 40, description: 'נגישות תיושם ברמת הקוד', details: '' },
    ]},
  ],
  paymentTermsTitle: 'תנאי תשלום',
  paymentTerms: [
    { id: '1', text: 'שבועיים אחרי פגישת התנעה – 15%' },
    { id: '2', text: 'סיום עיצוב – 30%' },
    { id: '3', text: 'השלמת פיתוח – 35%' },
    { id: '4', text: 'שבועיים אחרי התקנה ווידוא תקינות – 20%' },
  ],
  notes: [
    { id: '1', text: '*הזמנים המוגדרים הם זמנים לכל חלק בנפרד' },
  ],
};

export const defaultSignatureData: SignatureData = {
  title: 'אישור לקוח',
  signatureTitle: 'חתימה',
  signatureSubtitle: 'יש לחתום בשדה הבא וללחוץ אישור.',
  clientNameLabel: 'שם לקוח',
  clientNamePlaceholder: 'הכנס שם מלא',
  dateLabel: 'תאריך',
  agreementText: 'בחתימה מעלה, אני מאשר שקראתי, הבנתי והסכמתי לכל התנאים, התנאים והמדיניות המפורטים בהסכם פרויקט ADU.',
  submitButtonText: 'אישור',
  successTitle: 'תודה רבה!',
  successMessage: 'ההצעה נחתמה בהצלחה. ניצור איתך קשר בהקדם.',
};

// Generate default sections
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
    { id: '11', type: 'signature', visible: true, order: 10, data: defaultSignatureData },
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
  signature: 'חתימה',
};
