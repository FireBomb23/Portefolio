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
  email: 'firebomb0623@gmail.com',
  github: 'https://github.com/FireBomb23',
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
    role: 'Tudo: código, modelos, texturas e site',
    oneLiner:
      'A Manopla do Infinito para Minecraft. Mod em Java, site com visualizador 3D e painel de admin.',
    about:
      'O Infinity Nova põe a Manopla do Infinito no Minecraft 1.21.1. Cada joia tem os seus poderes: parar o tempo, puxar bosses com telecinese, teletransporte. Carregas em G e metade dos mobs vira pó. Está publicado no Modrinth e no CurseForge e já passou os 700 downloads.',
    work:
      'Fiz tudo sozinho. O mod é em Java 21 com NeoForge e GeckoLib, e os modelos e animações foram feitos no Blockbench. Para o site escrevi um visualizador em Three.js que lê os mesmos ficheiros .geo.json do jogo — o modelo lá em cima é esse. O backend é Django 5.2 com PostgreSQL, e para publicar changelogs o painel de admin pede um código 2FA.',
    details: [
      '8 modelos 3D: a manopla, as 6 joias e o Tesseract',
      'A manopla tem 19 bones e 103 cubos',
      'Minecraft 1.21.1 · NeoForge 21.1.86+ · GeckoLib 4.7.4+',
      '2FA (TOTP) com segredos cifrados e proteção contra reutilização de códigos',
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
    role: 'App mobile, API e base de dados',
    oneLiner:
      'App para um laboratório de próteses dentárias gerir pedidos, bancadas e ficheiros 3D, mesmo sem rede.',
    about:
      'O LabCD é um sistema para o Laboratório Catarina Domingos, que faz próteses dentárias. As clínicas fazem pedidos, os técnicos seguem o trabalho por bancada e a administração vê tudo num painel.',
    work:
      'Fiz a app em Flutter, que continua a funcionar sem internet: guarda tudo em SQLite e sincroniza depois. A API é Django REST e a base de dados PostgreSQL tem 15 tabelas. Parte das regras vive na própria base de dados, com triggers que não deixam apagar histórico clínico e registam cada mudança de estado.',
    details: [
      'Três perfis: administração, técnico (kanban por bancada) e clínica (odontograma)',
      'Upload de ficheiros STL de digitalização intraoral, até 100 MB',
      'Stored procedures, views e triggers em PL/pgSQL',
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
    role: 'Frontend, API e base de dados',
    oneLiner: 'Portal de cibersegurança e conformidade NIS2, com área de cliente e backoffice.',
    about:
      'A Cyrix é um portal de cibersegurança focado na diretiva NIS2. Tem a parte pública (serviços, notícias, contactos) e, depois do login, uma área de cliente e um backoffice para gerir tudo.',
    work:
      'O frontend é React com Vite. A API é Node e Express com Sequelize, organizada em MVC, com login por JWT, 2FA e passwords com bcrypt. Para a cadeira de Bases de Dados fiz uma segunda app em Django que usa a mesma base PostgreSQL. O protótipo foi testado em Figma com utilizadores (testes de ícones e questionário UEQ).',
    details: [
      'Tickets de suporte, documentos, pedidos de serviço, notícias e equipa',
      'Duas aplicações (Express e Django) sobre a mesma base de dados',
      'Online em cyrix-mu.vercel.app',
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
    role: 'Modelação, texturas e rigging',
    oneLiner: 'Modelação, texturas e rigging em Blender e Blockbench, e como levar isso para o browser.',
    about:
      'Trabalho da cadeira de Computação Gráfica e o que fui aprendendo à parte em Blender e Blockbench.',
    work:
      'Modelação a partir de blueprints, UVs, materiais PBR, iluminação, simulações de fluidos, tecido e fumo, e rigging. No Blockbench fiz os modelos animados do Infinity Nova, que depois pus a correr no browser com Three.js. As texturas abaixo são os mapas UV reais desses modelos.',
    details: [
      'Blender: modelação, UV, PBR, simulações, rigging',
      'Blockbench: modelos e animações para GeckoLib',
      'Exportação para glTF, STL e .geo.json',
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
    role: 'Identidade, UI e frontend',
    oneLiner:
      'Identidade e protótipo de uma app sobre mobilidade sustentável no campus, com calculadora de CO₂.',
    about:
      'Projeto para as Eco-Escolas da ESTGV: pôr estudantes e professores a pensar no impacto de como vêm para o campus.',
    work:
      'Criei a identidade (logótipo, cores, componentes), desenhei os ecrãs mobile e desktop no Figma e programei uma calculadora em HTML, CSS e JavaScript que converte distância e meio de transporte em CO₂ poupado. Organizámos o trabalho com Trello e um diagrama de Gantt.',
    details: [
      'Identidade visual e sistema de componentes',
      'Protótipos mobile e desktop no Figma',
      'Calculadora de CO₂ em JavaScript',
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
  'Java, Python e Django, JavaScript e TypeScript, React, Flutter, PostgreSQL, Three.js, Blender, Blockbench, Figma';

export const TIMELINE = [
  {
    period: '2026 — presente',
    title: '3.º ano · Tecnologias e Design de Multimédia',
    place: 'ESTGV, Viseu',
    description: 'App LabCD em Flutter e Django, modelação em Blender e procura de estágio.',
  },
  {
    period: '2025 — 2026',
    title: '2.º ano · Web, Bases de Dados e UX',
    place: 'ESTGV, Viseu',
    description: 'Portal Cyrix em React e Express e protótipo EcoGo com calculadora de CO₂.',
  },
  {
    period: '2024 — 2025',
    title: '1.º ano · Programação e Design',
    place: 'ESTGV, Viseu',
    description: 'Programação, design de interação, identidade visual e tipografia.',
  },
];
