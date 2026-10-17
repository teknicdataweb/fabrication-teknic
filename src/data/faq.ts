/** Preguntas frecuentes (página de contacto). Solo datos ya publicados en el sitio. */
export type FaqItem = {
  q: { fr: string; en: string }
  a: { fr: string; en: string }
}

export const FAQ: FaqItem[] = [
  {
    q: { fr: 'Combien de temps faut-il pour recevoir une soumission ?', en: 'How long does it take to receive a quote?' },
    a: {
      fr: 'Nous répondons à votre demande de soumission sous 24 à 48 heures ouvrables.',
      en: 'We reply to your quote request within 24 to 48 business hours.',
    },
  },
  {
    q: { fr: 'La soumission est-elle gratuite ?', en: 'Is the quote free?' },
    a: {
      fr: 'Oui. L’estimation est gratuite et sans engagement.',
      en: 'Yes. The estimate is free and with no obligation.',
    },
  },
  {
    q: { fr: 'Quelle est la capacité de votre atelier d’usinage CNC ?', en: 'What is the capacity of your CNC machine shop?' },
    a: {
      fr: 'Nos centres d’usinage et aléseuses CNC traitent des pièces pouvant atteindre 11 000 lb, avec une rotation à 360° et une précision de 0,001°. Notre atelier de 12 500 pi² est équipé d’un pont roulant de 7 tonnes.',
      en: 'Our CNC machining centers and boring mills handle parts up to 11,000 lb, with 360° rotation and 0.001° precision. Our 12,500 sq ft shop is equipped with a 7-ton overhead crane.',
    },
  },
  {
    q: { fr: 'Quels matériaux soudez-vous ?', en: 'Which materials do you weld?' },
    a: {
      fr: 'Nous soudons l’aluminium, l’acier inoxydable, l’acier, la fonte d’acier, la fonte ductile et le laiton. Notre atelier est certifié CWB (CSA W47.1).',
      en: 'We weld aluminum, stainless steel, steel, cast steel, ductile iron and brass. Our shop is CWB certified (CSA W47.1).',
    },
  },
  {
    q: { fr: 'Intervenez-vous sur site ?', en: 'Do you work on site?' },
    a: {
      fr: 'Oui. L’usinage et l’entretien mécanique industriel sont offerts en atelier et sur site.',
      en: 'Yes. Machining and industrial mechanical maintenance are offered in our shop and on site.',
    },
  },
  {
    q: { fr: 'Mes plans restent-ils confidentiels ?', en: 'Do my drawings stay confidential?' },
    a: {
      fr: 'Oui, la confidentialité de vos plans est garantie.',
      en: 'Yes, the confidentiality of your drawings is guaranteed.',
    },
  },
  {
    q: { fr: 'Quelles sont vos heures d’ouverture ?', en: 'What are your opening hours?' },
    a: {
      fr: 'Nous sommes ouverts du lundi au vendredi, de 7 h à 17 h.',
      en: 'We are open Monday to Friday, from 7 AM to 5 PM.',
    },
  },
  {
    q: { fr: 'Où se trouve votre atelier ?', en: 'Where is your shop located?' },
    a: {
      fr: 'Au 50, route Marie-Victorin, Nicolet (Québec) J3T 1A1, au Centre-du-Québec.',
      en: 'At 50 Marie-Victorin Road, Nicolet, Quebec J3T 1A1, in the Centre-du-Québec region.',
    },
  },
]
