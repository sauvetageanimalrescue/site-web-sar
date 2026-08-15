import type { CataloguePages } from "./types";
import { MUNICIPALITES } from "@/contenu/municipalites";

export const PAGES_EN: CataloguePages = {
  mission: {
    surtitre: "Since 2010",
    titre: "Our mission",
    intro:
      "Sauvetage Animal Rescue helps animals in distress. We deploy people and equipment to carry out rescue missions for citizens, businesses and municipalities.",
    image: "/images/hero-accueil.png",
    blocs: [
      {
        titre: "A gap in the emergency chain",
        texte: [
          "When a person is in distress, an entire system springs into action. For an animal, nothing comparable existed in Québec. Firefighters and municipal animal services did what they could, but nobody was trained specifically to bring down a cat fifteen metres up a tree or pull a raccoon from the bottom of a chimney.",
          "Sauvetage Animal Rescue grew out of that gap. The organization applies the principles of emergency response to the animal world: a dispatch centre that takes the calls, graded intervention levels, safety procedures, and a registry where every mission is documented from the first call to its closure.",
        ],
      },
      {
        titre: "What we do",
        liste: [
          "Technical rescue at height, on ice, in sewers and in confined spaces",
          "Safe capture of stray, reactive or injured animals",
          "Transport to partner shelters and clinics",
          "Support for emergency services and municipalities",
          "Training for the public and for professionals",
          "Awareness workshops in elementary schools",
        ],
      },
      {
        titre: "Who calls us",
        texte: [
          "Our calls come from citizens, municipal animal services, police and fire departments, shelters, businesses and sometimes other rescue organizations. What they have in common: an animal is in a situation it cannot get out of alone, and nobody on site has the equipment or the training to intervene safely.",
        ],
      },
      {
        titre: "Funded by its members",
        texte: [
          "We receive no government grants and no public funding. Everything rests on member dues, donations, street campaigns and our community. That is what guarantees our independence, and it is also what makes every single membership matter.",
        ],
      },
    ],
    actions: [
      { href: "/membre", libelle: "Become a member", principal: true },
      { href: "/statistiques", libelle: "See our statistics" },
    ],
  },

  direction: {
    surtitre: "A word from the founder",
    titre: "Executive director",
    intro:
      "Eric Dussault, founder and executive director of Sauvetage Animal Rescue.",
    image: "/images/direction.png",
    blocs: [
      {
        texte: [
          "I have devoted my life to defending those with no voice: animals in distress. In 2010, I founded Sauvetage Animal Rescue, an organization unique in Québec, specialized in the technical rescue of animals. We go where nobody else goes: into trees, onto rooftops, down sewers, out onto the ice, in cities and in the countryside. Cats, raccoons, geese, foxes, dogs, pigeons: every call is different, but the mission stays the same, protect life.",
          "The idea came from a simple observation. In our society, when a human being is in distress, an entire rescue system is ready to act. For animals, there was a void. I decided to adapt the principles of emergency response, learned over my years in search and rescue, public safety, armoured transport and close protection, to a cause that matters deeply to me.",
          "My greatest challenge since founding the organization is financial stability. We receive no government assistance. Everything rests on the generosity of citizens and on our community. Those members, those allies at heart, are what make every rescue possible.",
          "I am surrounded by a remarkable team of volunteers, from emergency services, the animal world and the general public, who give time, energy and heart to save lives. Together we complete several hundred missions each year.",
          "What I want for the future is for Sauvetage Animal Rescue to become the reference in animal rescue. To train other teams, here and elsewhere. To pass on what we know. And one day to see our role recognized within the emergency chain, on equal footing with traditional services. Because animal suffering deserves as much attention as human suffering.",
          "And that dream, I can only reach it with you.",
        ],
      },
      {
        encadre: {
          titre: "Contact",
          lignes: [
            "Eric Dussault, executive director",
            "e.dussault@sar.quebec",
            "2180 Sainte-Catherine Street West, Montréal, Québec H3H 1M7",
            "Reporting line: 514-773-3911",
            "Toll free: 833-773-3911",
            "Duty officer: 514-270-3636",
          ],
        },
      },
    ],
  },

  territoire: {
    surtitre: "Montréal metropolitan community",
    titre: "Our territory",
    intro:
      "Sauvetage Animal Rescue operates across the entire Montréal metropolitan community: 82 municipalities spread over five administrative regions, Montréal, Laval, the Montérégie, the Laurentides and Lanaudière.",
    image: "/images/territoire.jpg",
    blocs: [
      {
        titre: "4,360 square kilometres",
        texte: [
          "The area is home to more than 4.2 million residents, close to half of Québec's population, and over 1.7 million households. Thousands of parks, urban forests, rivers, highways, farmland and densely built neighbourhoods sit side by side. Every year this territory generates hundreds of calls requiring a fast, specialized response.",
        ],
      },
      {
        titre: "Between city and wilderness",
        texte: [
          "That diversity demands adaptability. Rescuing a cat stuck high in a Montréal borough, helping ducklings that fell into a suburban storm drain, or attending an injured deer in an outlying municipality call for neither the same equipment nor the same approach. The mission adapts to the terrain and to the local reality of each intervention.",
        ],
      },
      {
        titre: "The 82 municipalities we serve",
        liste: MUNICIPALITES,
      },
    ],
    actions: [
      { href: "/signalement", libelle: "Report an animal", principal: true },
    ],
  },

  partenaires: {
    surtitre: "Together",
    titre: "Our partners",
    intro:
      "Our partners play a decisive role in carrying out our mission. Their support lets us rescue more animals, give them the care they need and raise awareness of the animal cause in our community.",
    image: "/images/certificat-partenaire.png",
    blocs: [
      {
        titre: "The partner certificate",
        texte: [
          "The partnership certificate measures 11 by 17 inches. Its design draws on banknotes and treasury bonds: security elements, rich colours, ledger format. Your organization's name appears prominently, framed by a bilingual message of thanks. It is renewed each year and only twenty are issued.",
        ],
      },
      {
        titre: "The visibility that comes with it",
        liste: [
          "Certificate displayed in your business or office",
          "Live broadcast on our Facebook page during the handover, converted to video",
          "Photo post of the handover on Facebook",
          "Photo post on Instagram",
          "Video post on TikTok",
          "Permanent mention in the Partners section of our site",
          "A dedicated post on Patreon",
          "A mention in the newsletter",
        ],
      },
    ],
    actions: [
      { href: "/partenariat", libelle: "Become a partner", principal: true },
    ],
  },

  medias: {
    surtitre: "Press coverage",
    titre: "In the media",
    intro:
      "Television reports, press articles and radio interviews about the work of Sauvetage Animal Rescue. Every piece of coverage is a chance to carry the animal cause beyond our own community.",
    image: "/images/services-urgence.png",
    blocs: [
      {
        texte: [
          "Our interventions have been covered by La Presse, TVA Nouvelles, Courrier du Sud, 107.7 Estrie, 103.3, Info Petite Nation and Le Soleil de Châteauguay, among others. Stories have ranged from the rescue of a dog in whitewater at Plaisance to the organization's positions on urban deer culls.",
          "For interview or press requests, write to the executive director at e.dussault@sar.quebec.",
        ],
      },
    ],
  },

  "ateliers/primaire": {
    surtitre: "Awareness",
    titre: "Elementary school workshops",
    intro:
      "Our team comes directly into the classroom to raise awareness of animal protection and rescue among young students.",
    image: "/images/ecoles.jpg",
    blocs: [
      {
        titre: "What students learn",
        texte: [
          "During these interactive presentations, students learn to recognize an animal in distress, what to do, who to contact and what resources exist. We emphasize empathy and respect toward animals, and encourage children to become genuine animal protectors.",
          "Each workshop adapts to the school's needs and schedule.",
        ],
      },
      {
        titre: "A certificate for every student",
        texte: [
          "Every student receives an official certificate from Sauvetage Animal Rescue. It recognizes their attention, their participation and their commitment to animals. It is also a keepsake of our visit, one they can display proudly in their room.",
        ],
      },
      {
        titre: "Book a date",
        texte: [
          "For more information or to book, contact the executive director at e.dussault@sar.quebec.",
        ],
      },
    ],
  },

  patreon: {
    surtitre: "Monthly support",
    titre: "Become a Patreon supporter",
    intro:
      "Patreon provides steady monthly support rather than a one-off gift. For an organization with no grants, that stability changes everything: it makes it possible to plan equipment, vehicle maintenance and the replacement of rescue gear.",
    image: "/images/patreon.png",
    blocs: [
      {
        titre: "What you get",
        liste: [
          "Virtual membership card",
          "Access to the emergency line at all hours",
          "Access to radio communications",
          "Daily posts",
          "The chief's logbook",
          "Informational capsules",
          "Interviews with rescuers",
          "Exclusive videos",
          "Voicemail recordings",
          "Contests and draws",
          "Members-only products",
          "Surveys and private events",
        ],
      },
      {
        titre: "What members say",
        texte: [
          "\"I support your organization because you save lives that matter a great deal to me. Hold on to this wonderful mission. Every life is important.\" Sylvie, Sainte-Anne-des-Plaines",
          "\"I am so proud to be a Patreon member, and I have been almost since you started. I really feel like I am contributing to rescuing animals who, without you, would be left to fend for themselves.\" Sylvie, Saint-Jean-sur-Richelieu",
        ],
      },
    ],
    actions: [
      {
        href: "https://www.patreon.com/sauvetageanimalrescue",
        libelle: "Go to Patreon",
        principal: true,
      },
    ],
  },

  partenariat: {
    surtitre: "$2,000 a year",
    titre: "Become a partner",
    intro:
      "Twenty partner certificates are issued each year. They are meant for businesses and organizations that want to attach their name to animal rescue, with concrete visibility among a committed community.",
    image: "/images/certificat-partenaire.png",
    blocs: [
      {
        titre: "What the partnership includes",
        liste: [
          "An 11 by 17 inch certificate, numbered and renewed each year",
          "An official handover captured in photo and video",
          "A live broadcast on our channels during the handover",
          "Dedicated posts on Facebook, Instagram and TikTok",
          "A permanent mention on the site's Partners page",
          "A dedicated post on Patreon",
          "A mention in the newsletter",
        ],
      },
      {
        titre: "Arranging it",
        texte: [
          "Because the number of certificates is limited, arrangements are made directly with the executive director. Write to e.dussault@sar.quebec with your organization's name and line of business.",
        ],
      },
    ],
  },

  formations: {
    surtitre: "For the public and for professionals",
    titre: "Training",
    intro:
      "Sauvetage Animal Rescue offers training for pet owners as well as for anyone who deals with animals at work: animal care staff, police and fire services, and businesses.",
    image: "/images/formations.jpg",
    blocs: [
      {
        titre: "Three paths",
        liste: [
          "Animal Rescue Basics: 25 modules, 8 hours, one day",
          "Animal First Aid: 50 modules, 16 hours",
          "Custom training for emergency services",
        ],
      },
      {
        titre: "A practical approach",
        texte: [
          "Our courses are not there to turn you into a veterinarian. They are there to make you capable of recognizing an emergency, approaching an animal without making things worse or getting hurt, taking the right steps, and getting the animal to a vet as fast as possible.",
        ],
      },
    ],
    actions: [
      {
        href: "/formations/initiation-secours-animal",
        libelle: "Animal Rescue Basics",
        principal: true,
      },
      {
        href: "/formations/premiers-secours-animal",
        libelle: "Animal First Aid",
      },
    ],
  },

  "formations/initiation-secours-animal": {
    surtitre: "25 modules • 8 hours",
    titre: "Animal Rescue Basics",
    intro:
      "One day to be better equipped for an emergency involving your animal: recognizing the signs of distress, taking the right steps and getting it quickly to a veterinary clinic.",
    image: "/images/formations.jpg",
    blocs: [
      {
        titre: "Course content",
        liste: [
          "Animal laws and regulations in Québec",
          "Emergency plan and first aid kit",
          "Personal protective equipment",
          "Safe approach and animal body language",
          "Vital signs and levels of consciousness",
          "Muzzling and restraint",
          "Primary and secondary assessment",
          "History taking and shock",
          "Dehydration and poisoning",
          "Clearing the airway",
          "Rescue breathing and CPR",
          "Emergency numbers and resources",
        ],
      },
      {
        titre: "Included",
        liste: ["Course workbook", "Certificate of participation", "Sticker"],
      },
      {
        titre: "Registering",
        texte: [
          "Course dates are announced by email and on our social channels. To find out about the next session or arrange a private course, write to e.dussault@sar.quebec.",
        ],
      },
    ],
  },

  "formations/premiers-secours-animal": {
    surtitre: "50 modules • 16 hours",
    titre: "Animal First Aid",
    intro:
      "The full course for pet owners who want to be genuinely prepared. It covers the range of common emergencies and conditions a companion animal can face.",
    image: "/images/formations.jpg",
    blocs: [
      {
        titre: "What the course covers",
        liste: [
          "Everything in Animal Rescue Basics",
          "Hyperthermia, heatstroke, hypothermia and frostbite",
          "Near drowning and electrocution",
          "Seizures, stroke, heart attack",
          "Pulmonary embolism, gastric torsion, intestinal obstruction",
          "Bruises, wounds, bleeding and burns",
          "Eye proptosis",
          "Bone and joint injuries",
          "Animal struck by a vehicle",
          "Immobilization, evacuation and transport",
          "Common chronic conditions and zoonoses",
          "Whelping, prophylaxis and car safety",
        ],
      },
      {
        titre: "Included",
        liste: [
          "Course workbook",
          "Card and certificate of participation",
          "Patch and sticker",
        ],
      },
      {
        titre: "Registering",
        texte: [
          "To find out about the next session or arrange a group course, write to e.dussault@sar.quebec.",
        ],
      },
    ],
  },

  "formations/services-urgence": {
    surtitre: "Custom built",
    titre: "Training for emergency services",
    intro:
      "Courses designed for police officers, firefighters and front-line responders, so they can recognize, anticipate and manage situations involving animals.",
    image: "/images/services-urgence.png",
    blocs: [
      {
        titre: "Why",
        texte: [
          "An animal on scene changes the picture: it can injure a responder, bolt into traffic, block access to a victim or complicate an evacuation. Our training reduces those risks for the public, for responders and for the animals themselves.",
        ],
      },
      {
        titre: "Fully modular",
        texte: [
          "Content adapts to each organization's mission, territory and constraints. It can focus on patrol work, public safety, or fire and rescue contexts. Every course is adjusted with the requesting organization so it stays consistent with their internal procedures.",
        ],
      },
      {
        titre: "Requesting a course",
        texte: [
          "Write to e.dussault@sar.quebec describing the training you want, your operational context and the realities of your service.",
        ],
      },
    ],
  },

  contact: {
    surtitre: "Reach us",
    titre: "Contact",
    intro:
      "For an animal in distress, call the reporting line. For anything else, here is how to reach us.",
    blocs: [
      {
        encadre: {
          titre: "Phone",
          lignes: [
            "Reporting line: 514-773-3911",
            "Toll free: 833-773-3911",
            "Duty officer: 514-270-3636",
            "Fax: 438-238-4481",
          ],
        },
      },
      {
        encadre: {
          titre: "Email and address",
          lignes: [
            "General enquiries: info@sar.quebec",
            "Executive director: e.dussault@sar.quebec",
            "2180 Sainte-Catherine Street West",
            "Montréal, Québec H3H 1M7, Canada",
          ],
        },
      },
    ],
    actions: [
      { href: "/signalement", libelle: "Report an animal", principal: true },
    ],
  },

  confidentialite: {
    titre: "Privacy policy",
    intro:
      "This policy explains what information Sauvetage Animal Rescue collects, why, and what we do with it.",
    blocs: [
      {
        titre: "What we collect",
        liste: [
          "Reports: name, phone, email, the address where the animal is and a description of the situation.",
          "Memberships: name, email, phone, city, postal code and billing details processed by Stripe.",
          "Applications: contact details, availability, experience and motivation.",
          "Aggregated browsing statistics, with no personal identification.",
        ],
      },
      {
        titre: "Why",
        texte: [
          "Report details are used only to handle the intervention and to call you back if needed. Membership details are used to issue your card, send it to you and manage your renewal. Applications are used for the recruitment process.",
        ],
      },
      {
        titre: "Payments",
        texte: [
          "Payments are processed by Stripe. We never see your card number and we do not store it. Stripe applies its own security and retention policies.",
        ],
      },
      {
        titre: "Sharing",
        texte: [
          "We do not sell or rent your information. It may be passed to a shelter, a veterinary clinic or a municipal service only when that is necessary to take charge of a reported animal.",
        ],
      },
      {
        titre: "Your rights",
        texte: [
          "You can request access to, correction of or deletion of your information by writing to info@sar.quebec. We respond within thirty days.",
        ],
      },
    ],
  },

  conditions: {
    titre: "Terms of use",
    intro:
      "Terms applying to the use of sar.quebec and to transactions carried out on it.",
    blocs: [
      {
        titre: "Reports",
        texte: [
          "The online reporting form does not replace a phone call. For an emergency, call the reporting line. We guarantee no response time: missions are prioritized by severity and available resources.",
        ],
      },
      {
        titre: "Memberships and donations",
        texte: [
          "Dues and donations are non-refundable. A membership is valid until 31 December of its year of issue. A membership with automatic renewal renews each year and can be cancelled at any time from the member area; cancellation takes effect at the end of the period already paid for.",
        ],
      },
      {
        titre: "Observation days and training",
        texte: [
          "Observation days and courses are non-refundable. A spot may be transferred to another person. Participants are responsible for noting the date and time of their activity and must sign a liability waiver on site.",
        ],
      },
      {
        titre: "Ownership",
        texte: [
          "The text, images, insignia and content on this site belong to Sauvetage Animal Rescue and may not be reproduced without written permission.",
        ],
      },
    ],
  },
};
