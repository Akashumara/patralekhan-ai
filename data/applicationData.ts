import { Template } from '../types';

export const CATEGORIES = ['Banking', 'Police', 'Utility', 'Job', 'School', 'General'] as const;

export const TEMPLATES: Template[] = [
  // --- BANKING ---
  {
    id: 'bank-001',
    title: 'Request for New Cheque Book',
    category: 'Banking',
    tags: ['cheque', 'bank', 'checkbook'],
    englishBody: `To,\nThe Branch Manager,\n[Bank Name],\n[Branch Address]\n\nDate: [Date]\n\nSubject: Request for Issue of New Cheque Book\n\nRespected Sir/Madam,\n\nI hold a savings account in your branch with Account Number [Account Number]. \n\nI would like to request you to kindly issue a new cheque book containing [Number of Leaves] leaves for my account. My current cheque book has been exhausted.\n\nPlease debit the necessary charges from my account.\n\nThanking You,\n\nYours Faithfully,\n\nSignature: _________________\nName: [Your Name]\nMobile: [Mobile Number]`,
    hindiBody: `सेवा में,\nशाखा प्रबंधक,\n[Bank Name],\n[Branch Address]\n\nदिनांक: [Date]\n\nविषय: नई चेक बुक जारी करने हेतु आवेदन\n\nमहोदय/महोदया,\n\nमैं आपके बैंक का एक खाताधारक हूँ और मेरा खाता संख्या [Account Number] है।\n\nमेरी वर्तमान चेक बुक समाप्त हो गई है, इसलिए मैं आपसे अनुरोध करता हूँ कि कृपया मेरे खाते के लिए [Number of Leaves] पन्नों वाली नई चेक बुक जारी करें।\n\nकृपया आवश्यक शुल्क मेरे खाते से काट लें।\n\nधन्यवाद,\n\nभवदीय,\n\nहस्ताक्षर: _________________\nनाम: [Your Name]\nमोबाइल: [Mobile Number]`,
    faqs: [
      { question: "How many days does it take to get a cheque book?", answer: "Usually 3-7 working days depending on the bank." },
      { question: "Are there charges?", answer: "Yes, most banks charge a nominal fee after a certain free limit." }
    ]
  },
  {
    id: 'bank-002',
    title: 'Application to Block ATM Card',
    category: 'Banking',
    tags: ['atm', 'lost', 'block', 'debit card'],
    englishBody: `To,\nThe Branch Manager,\n[Bank Name],\n[Branch Address]\n\nDate: [Date]\n\nSubject: Request to Block Lost ATM Card immediately\n\nRespected Sir/Madam,\n\nI am [Your Name], holding account number [Account Number] in your branch. I regret to inform you that I have lost my ATM/Debit card somewhere in [Location of Loss] on [Date of Loss].\n\nTo prevent any misuse, I request you to kindly block my card immediately. I also request you to issue a duplicate card at the earliest.\n\nThanking You,\n\nYours Faithfully,\n\nName: [Your Name]\nMobile: [Mobile Number]`,
    hindiBody: `सेवा में,\nशाखा प्रबंधक,\n[Bank Name],\n[Branch Address]\n\nदिनांक: [Date]\n\nविषय: खोए हुए एटीएम कार्ड को ब्लॉक करने हेतु\n\nमहोदय,\n\nमैं [Your Name] हूँ और आपके बैंक में मेरा खाता संख्या [Account Number] है। मुझे यह बताते हुए खेद है कि मेरा एटीएम कार्ड [Location of Loss] में [Date of Loss] को खो गया है।\n\nकिसी भी दुरुपयोग को रोकने के लिए, कृपया मेरे कार्ड को तुरंत ब्लॉक करें। मैं आपसे यह भी अनुरोध करता हूँ कि जल्द से जल्द एक डुप्लीकेट कार्ड जारी करें।\n\nधन्यवाद,\n\nभवदीय,\n\nनाम: [Your Name]\nमोबाइल: [Mobile Number]`,
    faqs: [
      { question: "Should I also call customer care?", answer: "Yes, calling customer care is the fastest way, but this letter is needed for written record and re-issuance." }
    ]
  },
  {
    id: 'bank-003',
    title: 'KYC Update Request',
    category: 'Banking',
    tags: ['kyc', 'update', 'address'],
    englishBody: `To,\nThe Branch Manager,\n[Bank Name],\n[Branch Address]\n\nDate: [Date]\n\nSubject: Submission of KYC Documents for Account [Account Number]\n\nRespected Sir/Madam,\n\nI am submitting herewith the self-attested copies of my Aadhaar Card and PAN Card for the purpose of updating KYC details for my savings account [Account Number].\n\nKindly update the records in your system.\n\nThanking You,\n\nName: [Your Name]\nAttached: 1. Aadhaar Copy 2. PAN Copy`,
    hindiBody: `सेवा में,\nशाखा प्रबंधक,\n[Bank Name],\n[Branch Address]\n\nदिनांक: [Date]\n\nविषय: खाता संख्या [Account Number] के लिए केवाईसी दस्तावेज जमा करना\n\nमहोदय,\n\nमैं अपने बचत खाते [Account Number] के केवाईसी विवरण अपडेट करने के उद्देश्य से अपने आधार कार्ड और पैन कार्ड की स्व-सत्यापित प्रतियां जमा कर रहा/रही हूँ।\n\nकृपया अपने सिस्टम में रिकॉर्ड अपडेट करें।\n\nधन्यवाद,\n\nनाम: [Your Name]\nसंलग्न: 1. आधार कॉपी 2. पैन कॉपी`,
    faqs: [
        { question: "Is physical visit required?", answer: "Often yes, for original verification."}
    ]
  },
   // --- POLICE ---
  {
    id: 'police-001',
    title: 'Application for Lost Mobile Phone',
    category: 'Police',
    tags: ['fir', 'lost', 'mobile', 'police'],
    englishBody: `To,\nThe Station House Officer (SHO),\n[Police Station Name],\n[City/District]\n\nDate: [Date]\n\nSubject: Report regarding lost Mobile Phone\n\nRespected Sir,\n\nI, [Your Name], son/daughter of [Father's Name], resident of [Your Address], wish to report the loss of my mobile phone.\n\nModel: [Phone Model]\nIMEI Number: [IMEI Number]\nSIM Number: [Mobile Number]\n\nIt was lost on [Date of Loss] near [Place of Loss] around [Time]. Kindly register my complaint so I can apply for a duplicate SIM.\n\nYours Faithfully,\n\nName: [Your Name]\nContact: [Alternate Contact Number]`,
    hindiBody: `सेवा में,\nथाना प्रभारी (SHO),\n[Police Station Name],\n[City/District]\n\nदिनांक: [Date]\n\nविषय: मोबाइल फोन खोने की सूचना\n\nमहोदय,\n\nमैं, [Your Name], पुत्र/पुत्री [Father's Name], निवासी [Your Address], अपने मोबाइल फोन के खोने की सूचना देना चाहता/चाहती हूँ।\n\nमॉडल: [Phone Model]\nआईएमईआई नंबर: [IMEI Number]\nसिम नंबर: [Mobile Number]\n\nयह [Date of Loss] को [Place of Loss] के पास लगभग [Time] बजे खो गया था। कृपया मेरी शिकायत दर्ज करें ताकि मैं डुप्लीकेट सिम के लिए आवेदन कर सकूं।\n\nभवदीय,\n\nनाम: [Your Name]\nसंपर्क: [Alternate Contact Number]`,
    faqs: [
      { question: "How to find IMEI?", answer: "Dial *#06# on your phone. If lost, check the phone box." },
      { question: "Is this an FIR?", answer: "Usually this is a 'Lost Article Report' (NCR), needed for SIM re-issue." }
    ]
  },
  {
    id: 'police-002',
    title: 'Tenant Verification Request',
    category: 'Police',
    tags: ['tenant', 'verification', 'rent'],
    englishBody: `To,\nThe SHO,\n[Police Station Name]\n\nSubject: Request for Tenant Verification\n\nSir,\n\nI, [Landlord Name], owner of [Property Address], have rented my property to [Tenant Name]. I am submitting their details and ID proof for police verification.\n\nKindly verify and acknowledge.\n\nOwner Name: [Landlord Name]\nMobile: [Mobile Number]`,
    hindiBody: `सेवा में,\nथाना प्रभारी,\n[Police Station Name]\n\nविषय: किरायेदार सत्यापन हेतु आवेदन\n\nमहोदय,\n\nमैं, [Landlord Name], [Property Address] का मालिक हूँ। मैंने अपनी संपत्ति [Tenant Name] को किराए पर दी है। मैं पुलिस सत्यापन के लिए उनका विवरण और आईडी प्रमाण जमा कर रहा हूँ।\n\nकृपया सत्यापित करें।\n\nमालिक का नाम: [Landlord Name]\nमोबाइल: [Mobile Number]`,
    faqs: [
        { question: "Is it mandatory?", answer: "Yes, in most Indian cities, tenant verification is mandatory by law." }
    ]
  },

  // --- UTILITY ---
  {
    id: 'util-001',
    title: 'Electricity Meter Change Request',
    category: 'Utility',
    tags: ['electricity', 'meter', 'bijli'],
    englishBody: `To,\nThe Assistant Engineer,\n[Electricity Board Name],\n[Area/Zone]\n\nDate: [Date]\n\nSubject: Application for changing faulty Electricity Meter\n\nRespected Sir,\n\nI am a consumer with Consumer Number [Consumer Number] residing at [Your Address].\n\nI want to bring to your notice that the electricity meter installed at my residence is not working/running very fast since [Start Date]. This has resulted in an unusually high bill.\n\nI request you to kindly check the meter and replace it if necessary.\n\nThanking You,\n\n[Your Name]\nPhone: [Mobile Number]`,
    hindiBody: `सेवा में,\nसहायक अभियंता,\n[Electricity Board Name],\n[Area/Zone]\n\nदिनांक: [Date]\n\nविषय: खराब बिजली मीटर बदलने हेतु आवेदन\n\nमहोदय,\n\nमैं [Your Address] का निवासी हूँ और मेरा उपभोक्ता नंबर [Consumer Number] है।\n\nमैं आपके ध्यान में लाना चाहता हूँ कि मेरे घर पर लगा बिजली मीटर [Start Date] से काम नहीं कर रहा है / बहुत तेज चल रहा है। इसके परिणामस्वरूप बिल बहुत अधिक आ रहा है।\n\nआपसे अनुरोध है कि कृपया मीटर की जांच करें और यदि आवश्यक हो तो इसे बदलें।\n\nधन्यवाद,\n\n[Your Name]\nफोन: [Mobile Number]`,
    faqs: [
      { question: "Is there a fee?", answer: "Yes, you might have to pay a meter testing fee." }
    ]
  },
  {
    id: 'util-002',
    title: 'Complaint regarding Irregular Water Supply',
    category: 'Utility',
    tags: ['water', 'municipal', 'jal board'],
    englishBody: `To,\nThe Municipal Commissioner,\n[Municipality Name]\n\nSubject: Irregular Water Supply in [Area Name]\n\nSir,\n\nI am writing to highlight the severe water crisis in [Area Name]. For the last [Number of Days] days, water supply has been very irregular and dirty.\n\nResidents are facing huge difficulties. Kindly take immediate action.\n\nYours,\n[Your Name]\n[Address]`,
    hindiBody: `सेवा में,\nनगर निगम आयुक्त,\n[Municipality Name]\n\nविषय: [Area Name] में अनियमित जल आपूर्ति\n\nमहोदय,\n\nमैं [Area Name] में पानी की गंभीर समस्या को उजागर करने के लिए लिख रहा हूँ। पिछले [Number of Days] दिनों से, पानी की आपूर्ति बहुत अनियमित और गंदी है।\n\nनिवासियों को भारी कठिनाइयों का सामना करना पड़ रहा है। कृपया तत्काल कार्रवाई करें।\n\nभवदीय,\n[Your Name]\n[Address]`,
    faqs: []
  },

  // --- SCHOOL ---
  {
    id: 'school-001',
    title: 'Sick Leave Application for Student',
    category: 'School',
    tags: ['leave', 'sick', 'school', 'fever'],
    englishBody: `To,\nThe Principal,\n[School Name],\n[City]\n\nDate: [Date]\n\nSubject: Sick Leave Application\n\nRespected Sir/Madam,\n\nWith due respect, I beg to state that my son/daughter [Student Name] of Class [Class/Section] is suffering from [Reason for Illness] since last night. The doctor has advised him/her complete rest for [Number of Days] days.\n\nTherefore, I request you to grant him/her leave from [Start Date] to [End Date].\n\nThanking You,\n\nYours Sincerely,\n\nParent's Name: [Your Name]\nSignature: ________________`,
    hindiBody: `सेवा में,\nप्रधानाचार्य महोदय,\n[School Name],\n[City]\n\nदिनांक: [Date]\n\nविषय: बीमारी के कारण अवकाश हेतु आवेदन\n\nमहोदय/महोदया,\n\nसविनय निवेदन है कि मेरा पुत्र/पुत्री [Student Name], कक्षा [Class/Section], कल रात से [Reason for Illness] से पीड़ित है। डॉक्टर ने उसे [Number of Days] दिनों तक पूर्ण आराम करने की सलाह दी है।\n\nअतः आपसे अनुरोध है कि उसे [Start Date] से [End Date] तक अवकाश प्रदान करने की कृपा करें।\n\nधन्यवाद,\n\nआपका विश्वासी,\n\nअभिभावक का नाम: [Your Name]\nहस्ताक्षर: ________________`,
    faqs: [
      { question: "Do I need a medical certificate?", answer: "For leaves longer than 2-3 days, schools usually require a doctor's certificate." }
    ]
  },
  {
    id: 'school-002',
    title: 'Request for Transfer Certificate (TC)',
    category: 'School',
    tags: ['tc', 'transfer', 'school leaving'],
    englishBody: `To,\nThe Principal,\n[School Name]\n\nSubject: Application for Transfer Certificate\n\nRespected Sir,\n\nI am [Your Name], father of [Student Name], studying in Class [Class]. I have been transferred to [New City] for my job. Therefore, I request you to issue the Transfer Certificate for my child to enable admission in a new school.\n\nThank you,\n\n[Your Name]`,
    hindiBody: `सेवा में,\nप्रधानाचार्य महोदय,\n[School Name]\n\nविषय: स्थानांतरण प्रमाण पत्र (TC) हेतु आवेदन\n\nमहोदय,\n\nमैं [Your Name], [Student Name] का पिता हूँ, जो कक्षा [Class] में पढ़ता है। मेरा तबादला [New City] हो गया है। अतः आपसे अनुरोध है कि मेरे बच्चे का स्थानांतरण प्रमाण पत्र जारी करें ताकि नए स्कूल में प्रवेश मिल सके।\n\nधन्यवाद,\n\n[Your Name]`,
    faqs: []
  },

  // --- JOB ---
  {
    id: 'job-001',
    title: 'Resignation Letter',
    category: 'Job',
    tags: ['resign', 'job', 'quitting'],
    englishBody: `To,\nThe HR Manager,\n[Company Name]\n\nDate: [Date]\n\nSubject: Resignation from the post of [Your Designation]\n\nDear Sir/Madam,\n\nPlease accept this letter as my formal resignation from the position of [Your Designation] at [Company Name]. My last day of employment will be [Last Working Date].\n\nI am grateful for the opportunities I have been given during my time here.\n\nSincerely,\n\n[Your Name]\nEmp ID: [Employee ID]`,
    hindiBody: `सेवा में,\nएचआर मैनेजर,\n[Company Name]\n\nदिनांक: [Date]\n\nविषय: [Your Designation] पद से इस्तीफा\n\nमहोदय/महोदया,\n\nकृपया [Company Name] में [Your Designation] के पद से मेरा औपचारिक इस्तीफा स्वीकार करें। मेरा अंतिम कार्य दिवस [Last Working Date] होगा।\n\nयहाँ काम करने के दौरान मिले अवसरों के लिए मैं आभारी हूँ।\n\nभवदीय,\n\n[Your Name]\nकर्मचारी आईडी: [Employee ID]`,
    faqs: [
      { question: "What is notice period?", answer: "Check your offer letter. Standard is 30 to 90 days." }
    ]
  },
   {
    id: 'job-002',
    title: 'Application for Salary Increment',
    category: 'Job',
    tags: ['salary', 'hike', 'promotion'],
    englishBody: `To,\nThe Manager,\n[Company Name]\n\nSubject: Request for Salary Increment\n\nDear Sir,\n\nI have been working as a [Designation] for the past [Years] years. During this time, I have successfully completed [Mention Project/Achievement].\n\nConsidering my performance and the market standards, I request you to kindly review my salary.\n\nSincerely,\n\n[Your Name]`,
    hindiBody: `सेवा में,\nप्रबंधक महोदय,\n[Company Name]\n\nविषय: वेतन वृद्धि हेतु आवेदन\n\nमहोदय,\n\nमैं पिछले [Years] वर्षों से [Designation] के रूप में कार्यरत हूँ। इस दौरान मैंने [Mention Project/Achievement] सफलतापूर्वक पूरा किया है।\n\nमेरे प्रदर्शन और बाजार के मानकों को देखते हुए, मैं आपसे अनुरोध करता हूँ कि कृपया मेरे वेतन की समीक्षा करें।\n\nभवदीय,\n\n[Your Name]`,
    faqs: []
  }
];
