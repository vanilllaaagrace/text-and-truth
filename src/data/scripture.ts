export type Translation = "KJV" | "ESV" | "NIV";

export type Verse = {
  num: number;
  text: Partial<Record<Translation, string>>;
  /** If true, this verse is omitted in some modern translations */
  ghost?: boolean;
};

export type Chapter = {
  book: string;
  chapter: number;
  verses: Verse[];
};

export const SAMPLE_CHAPTER: Chapter = {
  book: "Acts",
  chapter: 8,
  verses: [
    { num: 32, text: {
      KJV: "The place of the scripture which he read was this, He was led as a sheep to the slaughter; and like a lamb dumb before his shearer, so opened he not his mouth:",
      ESV: "Now the passage of the Scripture that he was reading was this: 'Like a sheep he was led to the slaughter, and like a lamb before its shearer is silent, so he opens not his mouth.'",
      NIV: "This is the passage of Scripture the eunuch was reading: 'He was led like a sheep to the slaughter, and as a lamb before its shearer is silent, so he did not open his mouth.'",
    }},
    { num: 33, text: {
      KJV: "In his humiliation his judgment was taken away: and who shall declare his generation? for his life is taken from the earth.",
      ESV: "In his humiliation justice was denied him. Who can describe his generation? For his life is taken away from the earth.",
      NIV: "In his humiliation he was deprived of justice. Who can speak of his descendants? For his life was taken from the earth.",
    }},
    { num: 34, text: {
      KJV: "And the eunuch answered Philip, and said, I pray thee, of whom speaketh the prophet this? of himself, or of some other man?",
      ESV: "And the eunuch said to Philip, 'About whom, I ask you, does the prophet say this, about himself or about someone else?'",
      NIV: "The eunuch asked Philip, 'Tell me, please, who is the prophet talking about, himself or someone else?'",
    }},
    { num: 35, text: {
      KJV: "Then Philip opened his mouth, and began at the same scripture, and preached unto him Jesus.",
      ESV: "Then Philip opened his mouth, and beginning with this Scripture he told him the good news about Jesus.",
      NIV: "Then Philip began with that very passage of Scripture and told him the good news about Jesus.",
    }},
    { num: 36, text: {
      KJV: "And as they went on their way, they came unto a certain water: and the eunuch said, See, here is water; what doth hinder me to be baptized?",
      ESV: "And as they were going along the road they came to some water, and the eunuch said, 'See, here is water! What prevents me from being baptized?'",
      NIV: "As they traveled along the road, they came to some water and the eunuch said, 'Look, here is water. What can stand in the way of my being baptized?'",
    }},
    {
      num: 37,
      ghost: true,
      text: {
        KJV: "And Philip said, If thou believest with all thine heart, thou mayest. And he answered and said, I believe that Jesus Christ is the Son of God.",
      },
    },
    { num: 38, text: {
      KJV: "And he commanded the chariot to stand still: and they went down both into the water, both Philip and the eunuch; and he baptized him.",
      ESV: "And he commanded the chariot to stop, and they both went down into the water, Philip and the eunuch, and he baptized him.",
      NIV: "And he gave orders to stop the chariot. Then both Philip and the eunuch went down into the water and Philip baptized him.",
    }},
    { num: 39, text: {
      KJV: "And when they were come up out of the water, the Spirit of the Lord caught away Philip, that the eunuch saw him no more: and he went on his way rejoicing.",
      ESV: "And when they came up out of the water, the Spirit of the Lord carried Philip away, and the eunuch saw him no more, and went on his way rejoicing.",
      NIV: "When they came up out of the water, the Spirit of the Lord suddenly took Philip away, and the eunuch did not see him again, but went on his way rejoicing.",
    }},
  ],
};

export type Flair = "Deconstructing" | "Left the Faith" | "Questioning Believer" | "Practicing Christian" | "Reviewer";

export type UserIdentity = {
  name: string;
  flair: Flair;
  country: string;       // e.g. "Nigeria"
  flag: string;          // emoji flag
  verifiedReviewer: boolean;
};

export type Annotation = {
  id: string;
  category: "Historical Context" | "Translation Error" | "Scientific Contradiction" | "Internal Conflict";
  author: UserIdentity;
  body: string;
  source: string;
  status: "verified" | "pending";
  reviewers: number; // out of 5
};

export type CommunityComment = {
  id: string;
  author: UserIdentity;
  body: string;
  language: string;
  translation: Translation;
  likes: number;
};

export const SAMPLE_ANNOTATIONS: Record<number, Annotation[]> = {
  37: [
    {
      id: "a1",
      category: "Translation Error",
      author: { name: "Adaeze O.", flair: "Reviewer", country: "Nigeria", flag: "🇳🇬", verifiedReviewer: true },
      body: "Verse 37 is absent from the earliest Greek manuscripts (Codex Sinaiticus, Vaticanus, Alexandrinus). It appears to be a 6th-century Western liturgical insertion — likely a baptismal confession formula — later incorporated into the Textus Receptus and inherited by the KJV. Modern critical editions (NA28, UBS5) omit it; this is why ESV and NIV mark it as absent.",
      source: "Metzger, A Textual Commentary on the Greek New Testament (1994), pp. 315–316.",
      status: "verified",
      reviewers: 5,
    },
    {
      id: "a2",
      category: "Historical Context",
      author: { name: "T. Mensah", flair: "Deconstructing", country: "Ghana", flag: "🇬🇭", verifiedReviewer: false },
      body: "The Ethiopian eunuch narrative is one of the earliest references to a sub-Saharan African convert in the New Testament. Worth noting how this passage was later reframed in Aksumite Christian tradition and used in 19th-century European missionary apologetics — sometimes in ways that erased the eunuch's own agency.",
      source: "Phillipson, Foundations of an African Civilisation: Aksum & the Northern Horn (2012), ch. 4.",
      status: "pending",
      reviewers: 2,
    },
    {
      id: "a4",
      category: "Internal Conflict",
      author: { name: "Dr. R. Halevi", flair: "Reviewer", country: "Israel", flag: "🇮🇱", verifiedReviewer: true },
      body: "The verse functions as a doctrinal gatekeeper — requiring a verbal confession before baptism — which contradicts the surrounding narrative where the eunuch is baptized immediately upon seeing water (v.36, v.38). Its insertion smooths a theological tension the original text seems comfortable leaving open.",
      source: "Bart D. Ehrman, The Orthodox Corruption of Scripture (2011 rev. ed.), pp. 87–90.",
      status: "verified",
      reviewers: 5,
    },
  ],
  33: [
    {
      id: "a3",
      category: "Internal Conflict",
      author: { name: "J. Okafor", flair: "Reviewer", country: "Nigeria", flag: "🇳🇬", verifiedReviewer: true },
      body: "The quoted passage is from Isaiah 53 (LXX). Compare with the Masoretic text — the 'generation' clause has notable variance, which has been a contested christological proof-text for centuries.",
      source: "Hengel, The Septuagint as Christian Scripture (2002).",
      status: "verified",
      reviewers: 5,
    },
  ],
};

export const SAMPLE_COMMENTS: Record<number, CommunityComment[]> = {
  37: [
    {
      id: "c1",
      author: { name: "Naomi", flair: "Deconstructing", country: "Jamaica", flag: "🇯🇲", verifiedReviewer: false },
      body: "Wild that the entire 'sinner's prayer' moment I was raised on hangs on a verse the earliest manuscripts don't even have.",
      language: "English", translation: "KJV", likes: 84,
    },
    {
      id: "c2",
      author: { name: "Émile", flair: "Left the Faith", country: "France", flag: "🇫🇷", verifiedReviewer: false },
      body: "On me l'a citée à 9 ans pour me convaincre de me faire baptiser. Lire ça aujourd'hui, c'est vertigineux.",
      language: "French", translation: "NIV", likes: 31,
    },
    {
      id: "c5",
      author: { name: "Pastor M. Adeyemi", flair: "Practicing Christian", country: "Nigeria", flag: "🇳🇬", verifiedReviewer: true },
      body: "I've preached from this verse for 14 years. Reading the textual notes here doesn't shake my faith — but it does make me rethink how I teach the altar call. Grateful this space exists.",
      language: "English", translation: "ESV", likes: 207,
    },
    {
      id: "c6",
      author: { name: "Liu Wei", flair: "Questioning Believer", country: "Singapore", flag: "🇸🇬", verifiedReviewer: false },
      body: "在中文和合本里这节是有的,但脚注说早期抄本没有。我们家从来没人讲过这个细节。",
      language: "Chinese", translation: "KJV", likes: 46,
    },
    {
      id: "c7",
      author: { name: "Sara", flair: "Deconstructing", country: "United States", flag: "🇺🇸", verifiedReviewer: false },
      body: "The fact that the ESV just… skips this verse and most pastors never mention it is the whole reason I started questioning. Transparency matters.",
      language: "English", translation: "ESV", likes: 119,
    },
  ],
  36: [
    {
      id: "c3",
      author: { name: "Tobi", flair: "Questioning Believer", country: "Nigeria", flag: "🇳🇬", verifiedReviewer: false },
      body: "My pastor preached this exact passage last Sunday. Nobody mentioned that v37 is disputed. Nobody.",
      language: "English", translation: "ESV", likes: 22,
    },
  ],
};
