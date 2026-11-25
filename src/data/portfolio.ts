export interface GalleryItem {
  src: string;
  alt: string;
  pixelated?: boolean;
  contain?: boolean;
  span?: 'full' | 'half';
}

export type Cover =
  | { type: 'viewer'; model: 'manopla' | 'tesseract' }
  | { type: 'image'; src: string; alt: string; pixelated?: boolean }
  | { type: 'type' };

export interface Project {
  slug: string;
  number: string;
  title: string;
  kind: string;
  year: string;
  context: string;
  role: string;
  oneLiner: string;
  about: string;
  work: string;
  details: string[];
  stack: string[];
  links: { label: string; url: string }[];
  cover: Cover;
  thumb?: { src: string; alt: string; pixelated?: boolean; contain?: boolean };
  ground: string;
  ink: string;
  gallery: GalleryItem[];
}

export const PROFILE = {
  handle: 'FireBomb23',
  displayName: 'Rodrigo Albuquerque',
  email: 'rodrigoalbuquerque2006@gmail.com',
  github: 'https://github.com/FireBomb23',
  linkedin: 'https://www.linkedin.com/in/rodrigo-albuquerque-a7311644b',
  curriculo: '/curriculo/',
  modrinth: 'https://modrinth.com/mod/infinitynova',
  curseforge: 'https://www.curseforge.com/minecraft/mc-mods/infinity-nova',
};

export const PROJECTS: Project[] = [
  {
    slug: 'infinity-nova',
    number: '01',
    title: 'Infinity Nova',
    kind: 'Mod · Web',
    year: '2026',
    context: 'Projeto pessoal · Modrinth e CurseForge',
    role: 'Fiz tudo sozinho — código Java, modelos 3D, texturas e site',
    oneLiner:
      'Trouxe a Manopla do Infinito para o Minecraft 1.21.1, com um site onde dá para rodar os modelos do jogo em 3D.',
    about:
      'Sempre quis ter a Manopla do Infinito no Minecraft com poderes a sério, sem parecer mais um item genérico. Cada joia muda a jogabilidade: podes abrandar o tempo, puxar bosses pelo ar ou abrir portais. Se carregares no G com as seis joias, estalas os dedos e metade do mapa vira pó. Já soma mais de 715 downloads entre o Modrinth e o CurseForge.',
    work:
      'Desenhei e animei a manopla, as seis joias e o Tesseract no Blockbench e programei a lógica em Java 21 (NeoForge e GeckoLib). Depois quis mostrar os modelos na web sem os refazer: escrevi um leitor em Three.js que abre os mesmos ficheiros .geo.json do mod — podes testar já aqui ao lado. O site tem ainda um backend em Django 5.2 com PostgreSQL onde publico updates protegido por 2FA.',
    details: [
      '8 modelos 3D originais (a manopla sozinha leva 19 bones e 103 cubos)',
      'Leitor Three.js feito à medida para geometria Bedrock / GeckoLib (.geo.json)',
      'Mod para Minecraft 1.21.1 em Java 21, NeoForge 21.1.86+ e GeckoLib 4.7.4+',
      'Painel de changelogs em Django 5.2 com código 2FA (TOTP) cifrado',
    ],
    stack: ['Java 21', 'NeoForge', 'GeckoLib', 'Blockbench', 'Three.js', 'Django 5.2', 'PostgreSQL'],
    links: [
      { label: 'GitHub', url: 'https://github.com/FireBomb23/Infinity-Nova' },
      { label: 'Modrinth', url: 'https://modrinth.com/mod/infinitynova' },
      { label: 'CurseForge', url: 'https://www.curseforge.com/minecraft/mc-mods/infinity-nova' },
    ],
    cover: { type: 'viewer', model: 'manopla' },
    thumb: {
      src: '/infinity-nova/assets/banner.png',
      alt: 'Banner em pixel art do Infinity Nova com a Manopla do Infinito',
      pixelated: true,
    },
    ground: '#090A0F',
    ink: '#F0F2F5',
    gallery: [
      {
        src: '/infinity-nova/assets/banner_description.png',
        alt: 'Banner oficial de apresentação do Infinity Nova',
        pixelated: true,
        contain: true,
        span: 'full',
      },
      {
        src: '/infinity-nova/assets/banner.png',
        alt: 'Ilustração principal da Manopla do Infinito em pixel art',
        pixelated: true,
        contain: true,
        span: 'half',
      },
      {
        src: '/infinity-nova/assets/banner_changelog.png',
        alt: 'Banner da secção de changelogs do Infinity Nova',
        pixelated: true,
        contain: true,
        span: 'half',
      },
      {
        src: '/infinity-nova/textures/manopla_3d.png',
        alt: 'Textura UV 64x64 da Manopla do Infinito',
        pixelated: true,
        contain: true,
        span: 'half',
      },
      {
        src: '/infinity-nova/textures/tesseract_3d.png',
        alt: 'Textura UV 64x64 do Tesseract',
        pixelated: true,
        contain: true,
        span: 'half',
      },
    ],
  },
  {
    slug: 'labcd',
    number: '02',
    title: 'LabCD',
    kind: 'Mobile · Backend',
    year: '2026',
    context: 'Projeto Integrado IV · 3.º ano',
    role: 'App Flutter, API Django REST e base de dados PostgreSQL',
    oneLiner:
      'Uma app para o Laboratório Catarina Domingos seguir próteses dentárias bancada a bancada, mesmo quando o Wi-Fi falha.',
    about:
      'Num laboratório de próteses há dezenas de trabalhos a passar de mão em mão todos os dias, entre clínicas e técnicos. O problema é que nem todas as bancadas têm boa rede. O LabCD resolve isso: as clínicas pedem trabalhos com um odontograma visual, os técnicos movem as peças no quadro da bancada e a gestão acompanha os prazos.',
    work:
      'Construí a app em Flutter com uma base SQLite local para ninguém perder dados se a ligação cair. Assim que volta a haver rede, sincroniza sozinha com a API em Django REST. Na base de dados PostgreSQL (15 tabelas) meti a lógica crítica em PL/pgSQL: há triggers que bloqueiam qualquer tentativa de apagar histórico clínico e guardam quem mudou cada estado.',
    details: [
      'Três vistas na mesma app: clínica (odontograma), técnico (quadro por bancada) e direção',
      'Envio e validação binária de moldes 3D (.STL) de scanner intraoral até 100 MB',
      'Histórico clínico blindado na base de dados com triggers e stored procedures em PL/pgSQL',
    ],
    stack: ['Flutter', 'Dart', 'SQLite', 'Django REST', 'PostgreSQL', 'PL/pgSQL'],
    links: [{ label: 'GitHub', url: 'https://github.com/FireBomb23' }],
    cover: { type: 'type' },
    ground: '#DCE3E8',
    ink: '#0E0E0E',
    gallery: [],
  },
  {
    slug: 'cyrix',
    number: '03',
    title: 'Cyrix',
    kind: 'Web',
    year: '2025/26',
    context: 'Aplicações para a Internet II e Bases de Dados · 2.º ano',
    role: 'Design no Figma, frontend React e duas versões do backend (Express e Django)',
    oneLiner:
      'Portal para empresas avaliarem se cumprem a diretiva europeia NIS2, com área de cliente para gerir incidentes e auditorias.',
    about:
      'Com a nova diretiva NIS2, muitas empresas não sabem por onde começar na cibersegurança. A Cyrix junta uma parte aberta — onde qualquer empresa faz um diagnóstico rápido e vê os serviços — com uma área reservada onde os clientes abrem tickets, descarregam relatórios e falam com a equipa técnica.',
    work:
      'Comecei pelo protótipo no Figma e testei-o com utilizadores reais (testes de compreensão de ícones e questionário UEQ) antes de escrever código. Fiz o frontend em React + Vite e a API principal em Node/Express com Sequelize, login JWT, bcrypt e 2FA. Como o projeto cruzava duas cadeiras, criei também uma segunda versão em Django ligada exatamente à mesma base PostgreSQL.',
    details: [
      'Diagnóstico NIS2 interativo, tickets de suporte, gestão de documentos e backoffice',
      'Duas stacks (Node/Express e Django) a partilhar a mesma base de dados PostgreSQL',
      'Validado com utilizadores em Figma e publicado em cyrix-mu.vercel.app',
    ],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'Sequelize', 'Django', 'PostgreSQL', 'Figma'],
    links: [
      { label: 'Site', url: 'https://cyrix-mu.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/FireBomb23/Cirix' },
    ],
    cover: {
      type: 'image',
      src: '/projetos/cyrix/home.png',
      alt: 'Página inicial da Cyrix Cybersecurity',
    },
    thumb: {
      src: '/projetos/cyrix/home.png',
      alt: 'Página inicial da Cyrix Cybersecurity',
    },
    ground: '#0F172A',
    ink: '#F8FAFC',
    gallery: [
      {
        src: '/projetos/cyrix/nis2.png',
        alt: 'Página da diretiva NIS2 com autoavaliação na Cyrix',
        span: 'full',
      },
      {
        src: '/projetos/cyrix/sobre.png',
        alt: 'Página Sobre Nós da Cyrix',
        span: 'half',
      },
      {
        src: '/projetos/cyrix/servicos.png',
        alt: 'Página de Serviços da Cyrix',
        span: 'half',
      },
      {
        src: '/projetos/cyrix/login.png',
        alt: 'Ecrã de acesso à Área Restrita da Cyrix',
        span: 'half',
      },
      {
        src: '/projetos/cyrix/home-mobile.png',
        alt: 'Versão mobile da página inicial da Cyrix',
        contain: true,
        span: 'half',
      },
    ],
  },
  {
    slug: 'cg-3d-lab',
    number: '04',
    title: 'Computação Gráfica',
    kind: '3D',
    year: '2026',
    context: 'Computação Gráfica · 3.º ano',
    role: 'Modelação 3D, abertura de UVs, texturas e exportação para WebGL',
    oneLiner:
      'Peças modeladas em Blender e Blockbench — das simulações físicas aos mapas UV 64×64 que alimentam os modelos 3D deste site.',
    about:
      'Aqui junto os exercícios mais puxados das aulas de Computação Gráfica com as horas que passei a modelar por conta própria. É o lado do trabalho onde me preocupo com topologia limpa, luz, materiais e esqueletos que não partem quando a animação roda.',
    work:
      'No Blender trabalhei modelação a partir de plantas, materiais PBR, iluminação de estúdio, rigging e simulações de fluidos, fumo e tecido. No Blockbench criei geometria low-poly com texturas pixel-art pintadas à mão num mapa UV 64×64 e exportei tudo para correr a 60 fps em Three.js.',
    details: [
      'Blender: modelação por blueprints, materiais PBR, rigging e simulações físicas',
      'Blockbench: mapas UV 64×64 pintados à mão e animações por keyframes',
      'Exportação limpa para glTF, impressão/CAD (.STL) e WebGL (.geo.json)',
    ],
    stack: ['Blender', 'Blockbench', 'Three.js', 'WebGL'],
    links: [{ label: 'GitHub', url: 'https://github.com/FireBomb23' }],
    cover: { type: 'viewer', model: 'tesseract' },
    thumb: {
      src: '/infinity-nova/textures/tesseract_3d.png',
      alt: 'Mapa de textura UV 64x64 do Tesseract em pixel art',
      pixelated: true,
      contain: true,
    },
    ground: '#111111',
    ink: '#EDEDEA',
    gallery: [
      {
        src: '/infinity-nova/textures/manopla_3d.png',
        alt: 'Mapa de textura UV 64x64 da Manopla',
        pixelated: true,
        contain: true,
        span: 'half',
      },
      {
        src: '/infinity-nova/textures/tesseract_3d.png',
        alt: 'Mapa de textura UV 64x64 do Tesseract',
        pixelated: true,
        contain: true,
        span: 'half',
      },
    ],
  },
  {
    slug: 'ecogo',
    number: '05',
    title: 'EcoGo',
    kind: 'UI/UX',
    year: '2025',
    context: 'Projeto Integrado II · 2.º ano · Eco-Escolas ESTGV',
    role: 'Marca, protótipo Figma e calculadora interativa em JavaScript',
    oneLiner:
      'Quanto CO₂ poupas nas idas para a ESTGV? Uma calculadora e protótipo de app criados para o programa Eco-Escolas.',
    about:
      'Quase toda a gente vai de carro para o campus de Viseu, muitas vezes para fazer poucos quilómetros. O EcoGo nasceu para o programa Eco-Escolas da ESTGV com uma ideia simples: mostrar em números reais o peso dessa viagem diária e recompensar quem troca o carro pelo autocarro, bicicleta ou caminhada.',
    work:
      'Desenhei a marca de raiz — logótipo, paleta verde-floresta e biblioteca de componentes — e montei os protótipos mobile e desktop no Figma. Depois passei a calculadora para HTML, CSS e JavaScript puro: escolhes os quilómetros até ao campus e vês na hora as gramas de CO₂ por dia e os quilos poupados ao fim de um ano letivo.',
    details: [
      'Identidade visual completa e sistema de componentes no Figma',
      'Calculadora de emissões em tempo real (experimenta os botões de distância ao lado)',
      'Planeamento em equipa com quadro Trello e mapa de Gantt',
    ],
    stack: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    links: [{ label: 'GitHub', url: 'https://github.com/FireBomb23' }],
    cover: { type: 'type' },
    ground: '#1E6B45',
    ink: '#F2F0EB',
    gallery: [],
  },
];

export const USES =
  'Java 21, Python & Django, JavaScript & TypeScript, React, Flutter, PostgreSQL, Three.js, Blender, Blockbench e Figma';

export const TIMELINE = [
  {
    period: '2026 — presente',
    title: '3.º ano · Tecnologias e Design de Multimédia',
    place: 'ESTGV, Viseu',
    description: 'App LabCD em Flutter e Django, peças 3D em Blender e procura de estágio.',
  },
  {
    period: '2025 — 2026',
    title: '2.º ano · Web, Bases de Dados e UX',
    place: 'ESTGV, Viseu',
    description: 'Portal Cyrix em React e Express e o projeto EcoGo com calculadora de CO₂.',
  },
  {
    period: '2024 — 2025',
    title: '1.º ano · Programação e Design',
    place: 'ESTGV, Viseu',
    description: 'Fundamentos de programação, design de interação, identidade visual e tipografia.',
  },
];
