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
  conception: {
    heading: { fr: 'Conception et dessin technique à Nicolet', en: 'Design and technical drawing in Nicolet' },
    paragraphs: [
      {
        fr: "Nous concevons des pièces et des assemblages sur mesure en 3D (CAO) et produisons les plans techniques nécessaires à leur fabrication, avec les tolérances requises.",
        en: 'We design custom parts and assemblies in 3D (CAD) and produce the technical drawings needed to manufacture them, with the required tolerances.',
      },
      {
        fr: "Vous avez une pièce brisée ou sans plan ? La rétro-ingénierie permet de la reproduire à partir d'un échantillon. Nous pouvons aussi améliorer une pièce existante pour la rendre plus simple à fabriquer, et la prototyper avant de passer à la production.",
        en: 'Have a broken part or one with no drawing? Reverse engineering lets us reproduce it from a sample. We can also improve an existing part to make it easier to manufacture, and prototype it before moving to production.',
      },
      {
        fr: "Nous travaillons avec les formats courants (STEP, DXF, DWG, PDF), et le même atelier fabrique ensuite la pièce : usinage, fabrication et, au besoin, impression 3D.",
        en: 'We work with common file formats (STEP, DXF, DWG, PDF), and the same shop then makes the part: machining, fabrication and, when needed, 3D printing.',
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
