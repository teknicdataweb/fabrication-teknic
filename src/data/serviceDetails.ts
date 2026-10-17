/** Texto ampliado de cada servicio (página /services/:id). Solo datos ya publicados en el sitio. */
export type ServiceDetail = {
  heading: { fr: string; en: string }
  paragraphs: { fr: string; en: string }[]
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  usinage: {
    heading: { fr: "Usinage CNC et alésage à Nicolet", en: 'CNC machining and boring in Nicolet' },
    paragraphs: [
      {
        fr: "Notre atelier de Nicolet est équipé de centres d'usinage CNC horizontaux et verticaux pour des pièces pouvant atteindre 11 000 lb. La rotation à 360° avec une précision de 0,001° et des courses de 80 po en X, 70 po en Y et 55,125 po en Z permettent de réaliser des pièces volumineuses avec des tolérances microniques.",
        en: 'Our Nicolet shop is equipped with horizontal and vertical CNC machining centers for parts up to 11,000 lb. 360° rotation with 0.001° precision and travels of 80 in. in X, 70 in. in Y and 55.125 in. in Z make it possible to produce large parts to micron tolerances.',
      },
      {
        fr: "Trois machines phares travaillent au quotidien : l'aléseuse horizontale Maxcut, le centre d'usinage Mitsubishi et l'aléseuse verticale Giddings & Lewis. Elles sont complétées par des tours conventionnels et CNC, une fraiseuse, une perceuse radiale, des rectifieuses planes et de l'alésage portatif. Nous intervenons en atelier et sur site.",
        en: 'Three flagship machines work every day: the Maxcut horizontal boring mill, the Mitsubishi machining center and the Giddings & Lewis vertical boring mill. They are complemented by conventional and CNC lathes, a milling machine, a radial drill, surface grinders and portable boring. We work in our shop and on site.',
      },
    ],
  },
  fabrication: {
    heading: { fr: 'Fabrication métallique sur mesure', en: 'Custom metal fabrication' },
    paragraphs: [
      {
        fr: "Nous fabriquons des structures, des composants et des assemblages complexes sur mesure dans notre atelier équipé de 12 500 pi². Un pont roulant de 7 tonnes permet de manipuler des pièces lourdes en toute sécurité, d'une étape à l'autre.",
        en: 'We build custom structures, components and complex assemblies in our 12,500 sq ft equipped shop. A 7-ton overhead crane lets us handle heavy parts safely from one step to the next.',
      },
      {
        fr: "La coupe se fait avec une scie pouvant aller jusqu'à 18 po, et le perçage avec une perceuse radiale jusqu'à Ø 2¼ po. Le soudage, l'usinage, le sablage et la peinture industrielle sont réalisés au même endroit, ce qui simplifie votre projet du début à la fin.",
        en: 'Cutting is done with a saw up to 18 in., and drilling with a radial drill up to Ø 2¼ in. Welding, machining, sandblasting and industrial painting are all done under one roof, which keeps your project simple from start to finish.',
      },
    ],
  },
  soudure: {
    heading: { fr: 'Soudure industrielle certifiée CWB', en: 'CWB-certified industrial welding' },
    paragraphs: [
      {
        fr: "Nous disposons de l'équipement complet pour souder l'aluminium, l'acier inoxydable, l'acier, la fonte d'acier, la fonte ductile et le laiton, avec une finition impeccable. Les procédés MIG et TIG sont disponibles.",
        en: 'We have the complete equipment to weld aluminum, stainless steel, steel, cast steel, ductile iron and brass with an impeccable finish. MIG and TIG processes are available.',
      },
      {
        fr: "Notre atelier est certifié CWB (CSA W47.1). Que ce soit pour une pièce unitaire, une réparation ou un assemblage plus important, la soudure s'intègre à notre fabrication et à notre usinage pour un résultat cohérent.",
        en: 'Our shop is CWB certified (CSA W47.1). Whether it is a single part, a repair or a larger assembly, welding is integrated with our fabrication and machining for a consistent result.',
      },
    ],
  },
  mecanique: {
    heading: { fr: 'Mécanique industrielle, entretien et remise à neuf', en: 'Industrial mechanics, maintenance and refurbishment' },
    paragraphs: [
      {
        fr: "Nous réparons des composants mécaniques et assurons l'entretien industriel, en atelier comme sur site. Nos équipes interviennent pour remettre à neuf des pièces et des équipements afin de prolonger leur durée de vie.",
        en: 'We repair mechanical components and provide industrial maintenance, both in our shop and on site. Our teams step in to refurbish parts and equipment to extend their service life.',
      },
      {
        fr: "Le jet de sable et la peinture industrielle sont faits sur place : vous obtenez une pièce réparée et protégée, sans avoir à passer par plusieurs fournisseurs.",
        en: 'Sandblasting and industrial painting are done in-house: you get a repaired and protected part without having to deal with several suppliers.',
      },
    ],
  },
  '3d': {
    heading: { fr: 'Conception et impression 3D industrielle', en: 'Industrial 3D design and printing' },
    paragraphs: [
      {
        fr: "Ce service est offert avec notre partenaire DG Innovation 3D : conception et impression 3D pour entreprises, ingénieurs et créateurs. Prototypes, modèles réduits de machines et pièces techniques de calibre industriel, du dessin jusqu'à la pièce imprimée.",
        en: 'This service is offered with our partner DG Innovation 3D: 3D design and printing for companies, engineers and creators. Prototypes, scale models of machines and industrial-grade technical parts, from drawing to printed part.',
      },
      {
        fr: "Pour discuter d'un projet, utilisez les boutons de contact ci-dessus ou visitez le site de DG Innovation 3D.",
        en: 'To discuss a project, use the contact buttons above or visit the DG Innovation 3D website.',
      },
    ],
  },
}
