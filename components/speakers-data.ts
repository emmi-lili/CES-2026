export type Speaker = {
  name: string;
  role: string;
  /** TODO: reemplazar por la foto real del speaker (en /public). */
  photo: string;
  linkedin: string;
  /** Perfil de Twitter/X (opcional). Si se define, aparece en el modal. */
  twitter?: string;
  /** Bio del speaker mostrada en el modal (opcional). */
  bio?: string;
  /** Resalta la card con borde verde y glow. */
  featured?: boolean;
  /** Ajusta el encuadre de la foto (CSS object-position). Default: center. */
  objectPosition?: string;
};

export const SPEAKERS: Speaker[] = [
  // TODO: reemplazar `name` y `role` por los datos reales de cada speaker.
  {
    name: "Andrés Kim",
    role: "Regional Expansion Lead\nTETHER",
    photo: "/AK.webp",
    linkedin: "https://www.linkedin.com/in/andres-gk/",
    objectPosition: "center top",
    bio: "Más de 7 años de experiencia en las industrias de petróleo, energía y tecnologías Web3.\n\nSólido conocimiento del ecosistema blockchain y de sus potenciales aplicaciones en una amplia variedad de sectores e industrias.\n\nCompromiso con la implementación de tecnologías innovadoras para resolver problemas del mundo real y transformar la manera en que operan las empresas y los modelos de negocio.",
  },
  {
    name: "Brissia Benavente",
    role: "Head of Growth\nCIUDATTA",
    photo: "/brissia-benavente.webp",
    linkedin: "https://www.linkedin.com/in/brissiabenavente/",
    objectPosition: "center top",
    bio: "Brissia es una nómada digital boliviana y actualmente se desempeña como Head of Growth & Strategy en Ciudata. A lo largo de su trayectoria ha mentorado a más de 100 startups de Bolivia, Latinoamérica y Europa, acompañándolas en el diseño de estrategias para acelerar su crecimiento.\n\nSu propósito es formar a la siguiente generación de líderes capaces de construir soluciones con impacto. A través de LinkedIn divulga contenido sobre nuevas tecnologías, inteligencia artificial, el futuro del trabajo, Business Science y el estilo de vida de los nómadas digitales, inspirando profesionales a prepararse para una economía cada vez más global, descentralizada y digital.",
  },
  {
    name: "Carlos H. Fernandez Mazzi",
    role: "CEO\nFINKA TOKEN",
    photo: "/carlos-fernandez-mazzi.webp",
    linkedin: "https://www.linkedin.com/in/carlosfernandezmazzi/",
    objectPosition: "center top",
    bio: "Carlos Fernandez Mazzi aporta más de 35 años de experiencia en negocios internacionales, banca de inversión e inversión de impacto.\n\nEs socio fundador de Finka GmbH, la empresa detrás de Finka Token, el primer instrumento suizo de reparto de ingresos basado en blockchain respaldado por activos tangibles en Bolivia.",
  },
  {
    name: "Carlos Neira",
    role: "CFO\nMERU",
    photo: "/CN.webp",
    linkedin: "https://www.linkedin.com/in/carlos-neira-a1a44548/",
    objectPosition: "center top",
  },
  {
    name: "Carlos Olivera",
    role: "CTO\nPRESTA YA",
    photo: "/CO.webp",
    linkedin: "https://www.linkedin.com/in/colivera/",
  },
  {
    name: "Edwin Saavedra",
    role: "CEO\nKAIZEN MOTORS",
    photo: "/edwin-saavedra.webp",
    linkedin: "https://www.linkedin.com/in/edwinsaavedra/",
    objectPosition: "center top",
    bio: "En Kaizen Motors, los principios de lean management y la analítica de negocios son el núcleo de nuestro enfoque para impulsar la innovación y la eficiencia. Nuestro equipo, bajo mi liderazgo, está comprometido con implementar mejoras continuas en los procesos, asegurando que cada decisión esté basada en datos y centrada en el cliente. Con una sólida experiencia en implementación de ERP y analítica de posventa, hemos integrado con éxito sistemas avanzados para repuestos, servicio, CRM y finanzas, mejorando significativamente los flujos de trabajo operativos. Adoptando la filosofía Kaizen, buscamos constantemente oportunidades para optimizar el desempeño y entregar un valor excepcional a nuestros clientes.",
  },
  {
    name: "Emilia Aguilar",
    role: "CEO\nFORTGATE",
    photo: "/EA.webp",
    linkedin: "https://www.linkedin.com/in/emmi-aguilar-rivero/",
    objectPosition: "center top",
    bio: "Ingeniera de Sistemas especializada en Blockchain y Privacy Engineer, con más de seis años de trayectoria en el ecosistema tech y cripto latinoamericano. Su trabajo se ha centrado en la integración e implementación de tecnología cripto y blockchain en empresas, así como en liderar iniciativas de innovación dentro del sector bancario y financiero, donde ha acompañado a instituciones en su acercamiento a nuevas tecnologías. Actualmente cofundadora de FortgateID, un sistema de verificación de identidad enfocada en privacidad y fundadora de Capa Zero, consultorías institucionales de tecnología avanzada.",
  },
  {
    name: "Emilio Rivero Coello",
    role: "Product Manager\nANCHORAGE DIGITAL",
    photo: "/emilio.webp",
    linkedin: "https://www.linkedin.com/in/emiliorivcoello/",
    objectPosition: "center top",
    bio: "Emilio Rivero Coello es Gerente de Producto para Banca Corresponsal de Stablecoins en Anchorage Digital, con más de 8 años de experiencia en la intersección de stablecoins, pagos e infraestructura criptográfica. Anteriormente, lideró productos de pago en Aptos Labs y fue Jefe de Producto para Stablecoins en Bitso, tras liderar la iniciativa para obtener la primera licencia fintech de México bajo la Ley de Fintech mexicana. Posee un MBA de la Harvard Business School, una maestría en finanzas del ITAM y una licenciatura en economía del ITAM.",
  },
  {
    name: "Fernando Arriola",
    role: "Director\nCÁMARA PARAGUAYA DE FINTECH",
    photo: "/FA.webp",
    linkedin: "https://www.linkedin.com/in/fernando-arriola-arza-b5ba2730/",
  },
  {
    name: "Gonzalo Garrido",
    role: "Director de Desarrollo Empresarial y Marketing\nON CHAIN SCHOOL",
    photo: "/GG.webp",
    linkedin: "https://www.linkedin.com/in/gonzalo-garrido-romerodecastilla/",
    objectPosition: "center top",
    bio: "Empresario con más de una década de experiencia en la creación, liderazgo y escalamiento de proyectos educativos y negocios digitales. Especializado en desarrollo comercial, ventas y formación de equipos de alto rendimiento, con experiencia en sectores como educación, blockchain y cripto, comercio electrónico, finanzas y bienes raíces. Conferencista nacional e internacional, enfocado en generar impacto a través de la educación, el desarrollo del talento y la creación de oportunidades en industrias emergentes.",
  },
  {
    name: "Jorge Cerda",
    role: "Experto en Blockchain",
    photo: "/JC.webp",
    linkedin: "https://www.linkedin.com/in/jorgealbertocerda/",
    bio: "Profesional con más de 20 años de experiencia en consultorías de marketing y exportaciones principalmente de alimentos, elaboración de varios estudios de mercado, diseño e implementación de importantes proyectos de agronegocios. Especializado recientemente en aplicación de tecnología Blockchain para la trazabilidad en las cadenas de valor y suministro.",
  },
  {
    name: "Juan Carlos Reyes",
    role: "Presidente\nCOMISIÓN NACIONAL DE ACTIVOS DIGITALES EL SALVADOR",
    photo: "/JCR.webp",
    linkedin: "https://www.linkedin.com/in/jcreyes/",
    bio: "Especialista certificado en prevención de delitos financieros con criptoactivos y fundador de Efficiency.ca. Cuenta con más de 20 años de experiencia en los sectores de tecnología, energía y blockchain, con enfoque en gobernanza, estrategia e innovación. Posee una Maestría en Gestión y Finanzas por Harvard y fue reconocido como uno de los 20 hispanos más influyentes de Canadá.",
  },
  {
    name: "Jorge Eguino",
    role: "BD and Partnerships\nRAIN",
    photo: "/JE.webp",
    linkedin: "https://www.linkedin.com/in/jorgejaviereguino/",
    objectPosition: "center top",
    bio: "Jorge Eguino es Business Development & Partnerships en Rain, una plataforma global de infraestructura para pagos y movimiento de dinero con stablecoins que trabaja con más de 200 socios a nivel mundial y procesa miles de millones de dólares en volumen transaccional. Cuenta con vasta experiencia en el ecosistema fintech, liderando iniciativas de crecimiento, alianzas estratégicas y transformación digital en empresas como Flourish Fi y FinConecta. Además, es profesor de tecnologías emergentes en la Universidad de Alcalá. Jorge es licenciado en Economía por la University of Arkansas y posee un Máster en Big Data y Business Analytics por IE University.",
  },
  {
    name: "Kublai Gómez",
    role: "Cofundador y CTO\nPRISMAPAY",
    photo: "/kumblai-gomez.webp",
    linkedin: "https://www.linkedin.com/in/kublai/",
    objectPosition: "center top",
    bio: "Kublai Gómez es cofundador y CTO de Prismapay, la primera plataforma boliviana de gestión de tesorería y pagos internacionales de grado institucional, construida sobre infraestructura bancaria y tecnología de activos digitales.\n\nCon más de 25 años de experiencia en ingeniería de software en Estados Unidos, Rusia, España y Suecia, lidera desde Bolivia el desarrollo tecnológico de Prismapay junto a un equipo local de ingenieros.\n\nEs Ingeniero Electrónico, cuenta con un M.S. en Ciberseguridad y certificaciones en SAP, uno de los sistemas ERP empresariales más utilizados a nivel global.",
  },
  {
    name: "Juan Pablo Velasco",
    role: "Gobernador\nSANTA CRUZ",
    photo: "/JPV.webp",
    linkedin: "https://www.linkedin.com/in/juanvelasco2/",
    objectPosition: "center top",
    bio: "Emprendedor tecnológico con más de 10 años de experiencia en la industria. Cofundador de la primera plataforma de delivery online de Bolivia, posteriormente adquirida por PedidosYa, en la mayor adquisición de la historia del comercio electrónico boliviano. Ha liderado el crecimiento y expansión de empresas tecnológicas en los sectores de movilidad, fintech y energía, participando en la creación de startups de alto impacto en Latinoamérica.",
  },
  {
    name: "Mario Patiño",
    role: "Gerente Mesa de Dinero y Tesoreria\nBANCO DE CRÉDITO S.A.",
    photo: "/mario-patino.webp",
    linkedin: "https://www.linkedin.com/in/mariopatinoserrate/",
    objectPosition: "center top",
  },
  {
    name: "Maria Fernanda Juppet",
    role: "Co-Founder y Directora Académica\nDIGITAL ASSETS INSTITUTE",
    photo: "/MFJ.webp",
    linkedin: "https://www.linkedin.com/in/mfjuppet/",
    objectPosition: "center top",
  },
  {
    name: "Martin Iturri",
    role: "Director\nITURRI & ASOCIADOS-FIRMA DE ABOGADOS",
    photo: "/MI.webp",
    linkedin: "https://www.linkedin.com/in/mart%C3%ADn-iturri-194a252b/",
  },
  {
    name: "Patricia Tudisco",
    role: "Intendente de Supervisión Financiera\nBANCO CENTRAL DEL URUGUAY",
    photo: "/PT.webp",
    linkedin: "https://www.linkedin.com/in/patricia-tudisco-848320142/",
    objectPosition: "center top",
  },
];
