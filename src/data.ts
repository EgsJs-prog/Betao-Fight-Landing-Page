/* Dados centralizados da landing page da Betão Fight. */

const WHATSAPP_NUMBER = "5579991399024";

const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_LINK = buildWhatsAppLink(
  "Olá! Vim pelo site da Betão Fight e gostaria de saber mais sobre os treinos."
);

export const TRIAL_WHATSAPP_LINK = buildWhatsAppLink(
  "Olá! Vim pelo site da Betão Fight e quero agendar uma aula experimental."
);

export const PERSONAL_WHATSAPP_LINK = buildWhatsAppLink(
  "Olá! Vim pelo site da Betão Fight e quero saber mais sobre o Personal Fight."
);

export const productWhatsAppLink = (productName: string) =>
  buildWhatsAppLink(
    `Olá! Vim pelo site da Betão Fight e quero conhecer os modelos disponíveis de ${productName}.`
  );

const formatModalities = (modalities: string[]) =>
  modalities.length > 1
    ? `${modalities.slice(0, -1).join(", ")} e ${modalities[modalities.length - 1]}`
    : modalities[0] ?? "";

export const planWhatsAppLink = (planName: string, planPrice: string, modalities: string[] = []) =>
  buildWhatsAppLink(
    `Olá! Vim pelo site da Betão Fight e tenho interesse no plano *${planName}* (${planPrice})${
      modalities.length ? ` com a(s) modalidade(s): *${formatModalities(modalities)}*` : ""
    }. Gostaria de mais informações!`
  );

export const plansInquiryWhatsAppLink = (modalities: string[] = []) =>
  buildWhatsAppLink(
    modalities.length
      ? `Olá! Vim pelo site da Betão Fight e tenho dúvidas sobre os planos para *${formatModalities(modalities)}*.`
      : "Olá! Vim pelo site da Betão Fight e tenho dúvidas sobre os planos."
  );

export const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/qN2PJ6kE5bJzg72Z6";

export const INSTAGRAM_LINK = "https://www.instagram.com/betaofight_official/";

export const HERO = {
  eyebrow: "Centro de Lutas Betão Fight · Aracaju",
  title: "Treine seu corpo. Fortaleça sua mente.",
  description: "Boxe, MMA e Kickboxing para iniciantes e atletas.",
  ctaPrimary: "Agendar aula experimental",
  ctaSecondary: "Ver horários",
} as const;

export interface Modality {
  name: string;
  description: string;
}

export const MODALITIES: Modality[] = [
  { name: "Boxe", description: "Técnica, defesa, agilidade e condicionamento." },
  { name: "MMA", description: "Treino completo com diferentes bases de luta." },
  { name: "Kickboxing", description: "Combina golpes de braços e pernas com intensidade." },
  { name: "Muay Thai", description: "A arte dos oito membros: punhos, cotovelos, joelhos e canelas." },
  { name: "Jiu-Jítsu", description: "Domínio no solo com técnicas de finalização e controle." },
];

export interface Plan {
  name: string;
  price: string;
  detail: string;
  benefit?: string;
  badge?: string;
  featured?: boolean;
}

/* Valores conforme a tabela de preços oficial da academia. */
export const PLANS: Plan[] = [
  { name: "1x por semana", price: "R$ 140", detail: "Plano mensal" },
  { name: "2x por semana", price: "R$ 180", detail: "Plano mensal" },
  { name: "3x por semana", price: "R$ 200", detail: "Plano mensal" },
  {
    name: "Livre",
    price: "R$ 250",
    detail: "Todos os dias",
    badge: "Mais flexível",
    featured: true,
  },
  {
    name: "Duas modalidades",
    price: "R$ 340",
    detail: "Escolha 2 modalidades e treine todos os dias.",
    badge: "Mais completo",
  },
  { name: "Diária", price: "R$ 40", detail: "Treino avulso" },
  {
    name: "Trimestral",
    price: "R$ 550",
    detail: "3 meses",
    benefit: "Direito a treinar todos os dias",
  },
  {
    name: "Semestral",
    price: "R$ 1.000",
    detail: "6 meses",
    benefit: "Direito a treinar todos os dias",
  },
];

export const PLAN_MODALITIES = ["Boxe", "MMA", "Kickboxing", "Muay Thai", "Jiu-Jítsu"];

export const PLAN_PAYMENT_NOTE =
  "Pagamento via Pix ou à vista. Pagamento no cartão de crédito possui acréscimo da taxa.";

export interface ScheduleSlot {
  time: string;
  modality: string;
}

export interface ScheduleGroup {
  days: string;
  shortLabel: string;
  slots: ScheduleSlot[];
}

export const SCHEDULE: ScheduleGroup[] = [
  {
    days: "Segunda · Quarta · Sexta",
    shortLabel: "SEG · QUA · SEX",
    slots: [
      { time: "08:00", modality: "Betão · Turmas mistas" },
      { time: "11:00", modality: "Personalizado" },
      { time: "12:00", modality: "Betão · Turmas mistas" },
      { time: "14:00", modality: "Personalizado" },
      { time: "15:00", modality: "Muay Thai · Júlia" },
      { time: "16:00", modality: "Betão · Turmas mistas" },
      { time: "17:00", modality: "Kickboxing · Entony" },
      { time: "18:00", modality: "Jiu-Jítsu · Cleonancio" },
      { time: "19:00", modality: "Betão · Turmas mistas" },
      { time: "20:00", modality: "Betão · Turmas mistas" },
      { time: "21:00", modality: "Betão · Turmas mistas" },
    ],
  },
  {
    days: "Terça · Quinta",
    shortLabel: "TER · QUI",
    slots: [
      { time: "06:15", modality: "Prof. Ivan · Boxe e Kickboxing" },
      { time: "08:00", modality: "Muay Thai · Júlia" },
      { time: "11:00", modality: "Personalizado" },
      { time: "15:00", modality: "Betão · Turmas mistas" },
      { time: "16:00", modality: "MMA" },
      { time: "18:00", modality: "Kickboxing · Entony" },
      { time: "19:00", modality: "Betão · Turmas mistas" },
      { time: "20:30", modality: "Boxe · Andreis" },
    ],
  },
  {
    days: "Sábado",
    shortLabel: "SÁBADO",
    slots: [
      { time: "08:00", modality: "Betão · Turmas mistas" },
      { time: "09:00", modality: "Treino físico" },
      { time: "10:00", modality: "Sparring" },
    ],
  },
];

export const BIO = {
  title: "Experiência de ringue aplicada ao seu treino",
  text: "Betão é ex-lutador de kickboxing e principal professor do Centro de Lutas Betão Fight. Os treinos unem técnica, disciplina e condicionamento para quem está começando e para quem busca evolução competitiva.",
} as const;

export interface GalleryImage {
  src: string;
  alt: string;
  objectPosition: string;
  objectFit?: "cover" | "contain";
}

export const GALLERY: GalleryImage[] = [
  {
    src: "/gallery-1.webp",
    alt: "Turma feminina da Betão Fight após o treino",
    objectPosition: "center 48%",
  },
  {
    src: "/gallery-2.webp",
    alt: "Equipe Betão Fight em evento de luta",
    objectPosition: "center 42%",
    objectFit: "contain",
  },
  {
    src: "/gallery-3.webp",
    alt: "Betão com cinturões de kickboxing ao lado de parceiro de treino",
    objectPosition: "center 20%",
  },
];

export const PERSONAL_FIGHT = {
  title: "Personal Fight",
  subtitle: "Treino personalizado na sua casa.",
  text: "Treino individual adaptado ao seu objetivo, com horário combinado e acompanhamento do professor.",
  benefits: ["Condicionamento", "Emagrecimento", "Técnica de luta", "Horário flexível"],
  cta: "Quero conhecer o Personal Fight",
} as const;

export const LOCATION = {
  title: "Treine com a Betão Fight",
  address: "Av. Vereador Manoel Dória da Silva, 320 · Farolândia · Aracaju/SE",
  mapButton: "Abrir no Google Maps",
  whatsappButton: "Falar no WhatsApp",
} as const;

export const SPONSOR_WHATSAPP_MESSAGE =
  "Olá! Vi no site do Betão Fight Club que vocês estão abertos a parcerias e patrocínios. Gostaria de conversar sobre uma possível parceria.";

export const SPONSOR_WHATSAPP_LINK = buildWhatsAppLink(SPONSOR_WHATSAPP_MESSAGE);

export const SPONSOR_PHONE_DISPLAY = "+55 79 99139-9024";

export interface SponsorBenefitItem {
  id: string;
  label: string;
  icon: "trophy" | "share" | "handshake";
}

export interface Sponsor {
  id: string;
  name: string;
  logoSrc: string;
  logoAlt: string;
  url?: string;
}

export const SPONSORS: Sponsor[] = [
  {
    id: "farmacias-ze-do-bairro",
    name: "Farmácias Zé do Bairro",
    logoSrc: "/sponsor-ze-do-bairro.png",
    logoAlt: "Logo Farmácias Zé do Bairro",
  },
  {
    id: "valor",
    name: "Valor",
    logoSrc: "/sponsor-valor.png",
    logoAlt: "Logo Valor Centro de Soluções em Negócios Imobiliários",
  },
];

export const TRAINING_VIDEO_SECTION = {
  eyebrow: "Nossa rotina",
  title: "O treino acontece aqui",
  description:
    "Mais do que treinar, é fazer parte de uma equipe. Conheça um pouco da nossa rotina e veja de perto a energia dos treinos no Betão Fight.",
  cta: "Conheça nossos planos →",
  videoSrc: "/treino-rotina.mp4",
  posterSrc: "/treino-rotina-poster.jpg",
  videoAriaLabel: "Vídeo da rotina de treinos no Betão Fight Club",
} as const;

export const SPONSOR_SECTION = {
  eyebrow: "Parcerias & Patrocínios",
  title: "Sua marca junto com o Betão Fight",
  description:
    "Apoie o esporte, fortaleça nossa equipe e conecte sua marca com quem vive a luta todos os dias.",
  sponsorsTitle: "Quem está com a gente",
  sponsorsSubtitle: "Marcas que apoiam o Betão Fight",
  cta: "Falar no WhatsApp →",
  whatsappLabel: "WhatsApp para parcerias",
  benefits: [
    { id: "eventos", label: "Visibilidade em eventos", icon: "trophy" },
    { id: "redes", label: "Presença nas redes", icon: "share" },
    { id: "personalizadas", label: "Parcerias personalizadas", icon: "handshake" },
  ] as SponsorBenefitItem[],
} as const;

export type ProductIconName = "shirt" | "glove" | "wrap" | "cap" | "shorts";

export interface ProductCategory {
  name: string;
  category: string;
  description: string;
  icon: ProductIconName;
}

export const PRODUCTS: ProductCategory[] = [
  {
    name: "Luvas",
    category: "Equipamentos",
    description: "Luvas para Boxe e Kickboxing. Consulte tamanhos e modelos disponíveis.",
    icon: "glove",
  },
  {
    name: "Bandagens",
    category: "Equipamentos",
    description: "Proteção para mãos e punhos durante os treinos.",
    icon: "wrap",
  },
  {
    name: "Bonés",
    category: "Acessórios",
    description: "Bonés para completar o visual da Betão Fight fora do treino.",
    icon: "cap",
  },
];

export interface Kit {
  id: string;
  name: string;
  model: string;
  image: string;
  accentColor: string;
}

export const KITS: Kit[] = [
  {
    id: "blood",
    name: "Camisa Blood",
    model: "Blood",
    image: "/blood-shirt-v2.png",
    accentColor: "#d51e2f",
  },
  {
    id: "champions",
    name: "Camisa Champions",
    model: "Champions",
    image: "/champions-shirt-v2.png",
    accentColor: "#c9a84c",
  },
  {
    id: "steel",
    name: "Camisa Steel",
    model: "Steel",
    image: "/steel-shirt-v2.png",
    accentColor: "#9a9a96",
  },
  {
    id: "warrior",
    name: "Camisa Warrior",
    model: "Warrior",
    image: "/warrior-shirt-v2.png",
    accentColor: "#e84bb3",
  },
  {
    id: "battle",
    name: "Camisa Battle",
    model: "Battle",
    image: "/battle-shirt-v2.png",
    accentColor: "#e03030",
  },
];

export const KIT_PRICE = "R$ 65";
export const KIT_DESCRIPTION = "Camiseta oficial com design exclusivo Betão Fight. Seu treino em alta performance levado a sério.";

export interface GloveKit {
  id: string;
  name: string;
  color: string;
  image: string;
  accentColor: string;
}

export const GLOVE_KITS: GloveKit[] = [
  {
    id: "vermelho",
    name: "Kit Luva Vermelho",
    color: "Vermelho",
    image: "/glove-kit-vermelho.png",
    accentColor: "#d51e2f",
  },
  {
    id: "rosa",
    name: "Kit Luva Rosa",
    color: "Rosa",
    image: "/glove-kit-rosa.png",
    accentColor: "#e8a0b0",
  },
  {
    id: "amarelo",
    name: "Kit Luva Amarelo",
    color: "Amarelo",
    image: "/glove-kit-amarelo.png",
    accentColor: "#e0a820",
  },
  {
    id: "prata",
    name: "Kit Luva Prata",
    color: "Prata",
    image: "/glove-kit-prata.png",
    accentColor: "#b0b0b0",
  },
  {
    id: "dourado",
    name: "Kit Luva Dourado",
    color: "Dourado",
    image: "/glove-kit-dourado.jpg",
    accentColor: "#c9a84c",
  },
];

export const GLOVE_KIT_PRICE = "R$ 300";
export const GLOVE_KIT_DESCRIPTION = "Luva + Bandagem + Protetor Bucal Pretorian. Tudo que você precisa para começar a treinar.";

export interface CoreKit {
  id: string;
  name: string;
  color: string;
  image: string;
  accentColor: string;
}

export const CORE_KITS: CoreKit[] = [
  {
    id: "vermelho-dourado",
    name: "Pretorian Core Vermelho e Dourado",
    color: "Vermelho e Dourado",
    image: "/kit_luva_de_boxe_e_muay_thai_core_vermelha_e_dourado_pretorian_4.webp",
    accentColor: "#d51e2f",
  },
  {
    id: "azul-branco",
    name: "Pretorian Core Azul e Branco",
    color: "Azul e Branco",
    image: "/kit_luva_de_boxe_e_muay_thai_core_azul_e_branco_pretorian_4.webp",
    accentColor: "#3a7bd5",
  },
  {
    id: "branco-prata",
    name: "Pretorian Core Branco e Prata",
    color: "Branco e Prata",
    image: "/kit_luva_de_boxe_e_muay_thai_core_branco_e_prata_pretorian_2.webp",
    accentColor: "#e0e0e0",
  },
  {
    id: "preto-dourado",
    name: "Pretorian Core Preto e Dourado",
    color: "Preto e Dourado",
    image: "/kit_luva_de_boxe_e_muay_thai_core_preto_e_dourado_pretorian_4.webp",
    accentColor: "#c9a84c",
  },
  {
    id: "preto-prata",
    name: "Pretorian Core Preto e Prata",
    color: "Preto e Prata",
    image: "/kit_luva_de_boxe_e_muay_thai_core_preto_e_prata_pretorian_4.webp",
    accentColor: "#b0b0b0",
  },
];

export const CORE_KIT_PRICE = "R$ 300";
export const CORE_KIT_DESCRIPTION = "Luva + Bandagem + Protetor Bucal Pretorian Core. Kit completo para Boxe e Muay Thai com qualidade profissional.";

export const FOOTER_LINKS = [
  { label: "Instagram", href: INSTAGRAM_LINK },
  { label: "WhatsApp", href: WHATSAPP_LINK },
  { label: "Localização", href: GOOGLE_MAPS_LINK },
] as const;

export const FOOTER_CREDIT = "Desenvolvido pela MBV Studio";
