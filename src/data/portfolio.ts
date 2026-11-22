export interface ProjectLink {
  label: string;
  url: string;
  kind: 'github' | 'live' | 'modrinth' | 'curseforge';
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'fullstack' | '3d-gaming' | 'ui-ux';
  categoryLabel: string;
  year: string;
  role: string;
  context: string;
  featured?: boolean;
  image: string;
  imageAlt: string;
  summary: string;
  problem: string;
  solution: string;
  architectureNote: string;
  highlights: string[];
  specs: ProjectSpec[];
  stack: string[];
  links: ProjectLink[];
  visualType: 'infinity-nova' | 'labcd' | 'cyrix' | 'ecogo' | 'blender-3d';
}

export const PROFILE = {
  handle: 'FireBomb23',
  displayName: 'Rodrigo Albuquerque',
  role: 'Design & Engineering',
  institution: 'ESTGV · Instituto Politécnico de Viseu',
  degree: 'Licenciatura em Tecnologias e Design de Multimédia (3.º Ano)',
  location: 'Viseu, Portugal',
  availability: 'Disponível · Estágio DAPE 2026/27',
  email: 'firebomb0623@gmail.com',
  github: 'https://github.com/FireBomb23',
  modrinth: 'https://modrinth.com/mod/infinitynova',
  curseforge: 'https://www.curseforge.com/minecraft/mc-mods/infinity-nova',
  bio: 'Construo aplicações web e mobile completas — da base de dados relacional à interface interativa e visualização 3D.',
};

export const PROJECTS: Project[] = [
  {
    id: 'infinity-nova',
    slug: 'infinity-nova',
    title: 'Infinity Nova',
    subtitle: 'Mod Java NeoForge, Visualizador 3D GeckoLib em Three.js & Backend Django com 2FA TOTP',
    category: '3d-gaming',
    categoryLabel: 'Fullstack & 3D / Gaming',
    year: '2026',
    role: 'Criador, Fullstack & 3D Engineer',
    context: 'Projeto Pessoal · Publicado em Modrinth & CurseForge',
    featured: true,
    image: '/infinity-nova/assets/banner.png',
    imageAlt: 'Banner oficial pixel-art do mod Infinity Nova',
    summary:
      'Ecossistema multi-camada construído de raiz: mod de Minecraft em Java 21 (NeoForge + GeckoLib), site oficial com visualizador 3D Three.js para ficheiros .geo.json reais e backend Django 5.2 com PostgreSQL 18 e autenticação 2FA TOTP.',
    problem:
      'Distribuir, apresentar e gerir versões de um mod complexo com modelos 3D animados sem depender de páginas estáticas genéricas, garantindo segurança administrativa real na publicação de releases.',
    solution:
      'Arquitetura desacoplada em três pilares: motor de jogo em Java 21 / NeoForge com 8 modelos Blockbench/GeckoLib, frontend Three.js que lê diretamente os .geo.json e keyframes oficiais do mod, e API Django protegida por 2FA TOTP encriptado com Fernet AES.',
    architectureNote:
      'O visualizador web consome os mesmos ficheiros de geometria (19 bones, 103 cubos, rotações ZYX exatas e UVs por face) usados no jogo — eliminando duplicação entre pipeline 3D e web.',
    highlights: [
      'Visualizador 3D em Three.js a renderizar 8 modelos reais GeckoLib (.geo.json) com texturas Base64 e animação por keyframes.',
      'Backend Django 5.2 + PostgreSQL 18 com 2FA TOTP (Fernet AES-128-CBC + proteção anti-replay e sessões HttpOnly).',
      'Mod publicado oficialmente no Modrinth e CurseForge (Minecraft 1.21.1 · NeoForge 21.1.86+ · Java 21).',
      'Simulador interativo em WebGL/Canvas com partículas, navegação por teclado e suporte a prefers-reduced-motion.',
    ],
    specs: [
      { label: 'Motor Mod', value: 'Java 21 · NeoForge 21.1 · GeckoLib 4.7' },
      { label: 'Backend', value: 'Django 5.2 · PostgreSQL 18 · REST API' },
      { label: 'Segurança', value: '2FA TOTP · Fernet AES · PBKDF2-SHA256' },
      { label: '3D Web', value: 'Three.js · Blockbench · .geo.json real' },
    ],
    stack: ['Java 21', 'NeoForge', 'Django 5.2', 'PostgreSQL 18', 'Three.js', 'Blockbench', '2FA TOTP'],
    links: [
      { label: 'GitHub', url: 'https://github.com/FireBomb23/Infinity-Nova', kind: 'github' },
      { label: 'Modrinth', url: 'https://modrinth.com/mod/infinitynova', kind: 'modrinth' },
      { label: 'CurseForge', url: 'https://www.curseforge.com/minecraft/mc-mods/infinity-nova', kind: 'curseforge' },
    ],
    visualType: 'infinity-nova',
  },
  {
    id: 'labcd',
    slug: 'labcd',
    title: 'LabCD — Próteses Dentárias',
    subtitle: 'Sistema Multiplataforma Offline-First (Flutter + Django REST + PostgreSQL PL/pgSQL + 3D STL)',
    category: 'fullstack',
    categoryLabel: 'Fullstack & Mobile',
    year: '2026',
    role: 'Fullstack & Mobile Developer',
    context: 'Projeto Integrado IV · 3.º Ano L-TDM (Caso Real: Laboratório Catarina Domingos)',
    featured: true,
    image: '/images/labcd.jpg',
    imageAlt: 'Render 3D industrial de malha dentária STL do sistema LabCD',
    summary:
      'Plataforma empresarial de gestão de produção protética composta por app mobile Flutter offline-first, API REST Django, regras físicas em PL/pgSQL no PostgreSQL e pipeline de ficheiros 3D intraorais (.stl).',
    problem:
      'Laboratórios de prótese dentária coordenam pedidos críticos entre clínicas, técnicos de bancada e administração, lidando com ficheiros 3D STL pesados e necessidade de rastreabilidade mesmo sem rede estável.',
    solution:
      'Sistema em 3 camadas: app Flutter com sincronização offline SQLite e fluxos dedicados para Admin, Técnico (Kanban) e Clínica (Odontograma), backend Django REST e 15 entidades PostgreSQL protegidas por Stored Procedures, Views e Triggers.',
    architectureNote:
      'A integridade do negócio vive também na camada de dados: triggers BEFORE DELETE impedem perda de histórico clínico e triggers AFTER registam auditoria automática de cada transição de bancada.',
    highlights: [
      'App Flutter multiplataforma com sincronização offline-first em SQLite (sqflite) e hashing seguro salt:sha256.',
      'Base de dados PostgreSQL com 15 entidades relacionais, Stored Procedures, Views analíticas e Triggers de auditoria.',
      'Upload e validação binária de ficheiros 3D .stl (limite 100 MB) de digitalização intraoral.',
      'Três interfaces dedicadas: Dashboard executivo, Kanban de produção por bancadas e portal de pedidos clínicos.',
    ],
    specs: [
      { label: 'Mobile', value: 'Flutter · Dart · SQLite Offline-First' },
      { label: 'Backend', value: 'Django REST Framework · Auth Token' },
      { label: 'Base de Dados', value: 'PostgreSQL · 15 Entidades · PL/pgSQL' },
      { label: '3D Clínico', value: 'Upload/Download .STL (até 100 MB)' },
    ],
    stack: ['Flutter', 'Dart', 'Django REST', 'PostgreSQL', 'PL/pgSQL', 'SQLite', '3D STL'],
    links: [
      { label: 'GitHub Perfil', url: 'https://github.com/FireBomb23', kind: 'github' },
    ],
    visualType: 'labcd',
  },
  {
    id: 'cyrix',
    slug: 'cyrix',
    title: 'Cyrix · CyberBoxSecurity',
    subtitle: 'Plataforma Web Fullstack (React + Express + SQL Puro) Validada com Testes UX/UEQ',
    category: 'fullstack',
    categoryLabel: 'Fullstack & UX',
    year: '2025/26',
    role: 'Fullstack Developer & UX',
    context: 'Projeto Integrado III · 2.º Ano L-TDM (Parceria ProjectBox)',
    image: '/images/cyrix.jpg',
    imageAlt: 'Visual 3D arquitetural de segurança digital para o projeto Cyrix',
    summary:
      'Aplicação web fullstack desenvolvida em equipa simulada de empresa, unindo prototipagem no Figma validada com testes de ícones e questionário UEQ a uma implementação React, Express e PostgreSQL em SQL puro.',
    problem:
      'Conceber uma plataforma de cibersegurança acessível a utilizadores não-técnicos sem comprometer rigor na modelação de dados e segurança no backend.',
    solution:
      'Processo iterativo de produto: investigação UX, prototipagem Figma, validação quantitativa com User Experience Questionnaire (UEQ), frontend React modular e servidor Node/Express ligado diretamente a PostgreSQL.',
    architectureNote:
      'Toda a camada de persistência foi escrita em SQL puro parametrizado sobre PostgreSQL, garantindo controlo total sobre joins, chaves estrangeiras e performance.',
    highlights: [
      'Implementação web fullstack com React no frontend e API REST em Node.js / Express.',
      'Modelação relacional e consultas otimizadas em PostgreSQL com SQL puro.',
      'Protótipo Figma validado empiricamente através de testes de ícones e questionário UEQ.',
    ],
    specs: [
      { label: 'Frontend', value: 'React · CSS Modular' },
      { label: 'Backend', value: 'Node.js · Express.js' },
      { label: 'Dados', value: 'PostgreSQL (SQL Puro)' },
      { label: 'Validação UX', value: 'Figma · Testes de Ícones · UEQ' },
    ],
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Figma', 'UX / UEQ'],
    links: [
      { label: 'GitHub Perfil', url: 'https://github.com/FireBomb23', kind: 'github' },
    ],
    visualType: 'cyrix',
  },
  {
    id: 'cg-3d-lab',
    slug: 'cg-3d-lab',
    title: 'Computação Gráfica & Pipeline 3D',
    subtitle: 'Modelação Hard-Surface, UV Unwrapping, Materiais PBR, Rigging, Física & WebGL',
    category: '3d-gaming',
    categoryLabel: '3D & Gráficos',
    year: '2026',
    role: '3D Artist & Technical Graphics',
    context: 'Computação Gráfica (3.º Ano) & Blockbench 3D Lab',
    image: '/images/blender-3d.jpg',
    imageAlt: 'Render 3D de transição entre malha wireframe e material metálico PBR',
    summary:
      'Domínio prático do pipeline gráfico 3D: modelação a partir de blueprints, mapeamento UV, iluminação PBR, simulações físicas (fluidos, tecidos, fumo), rigging e animação em Blender e Blockbench.',
    problem:
      'Ligar o mundo da modelação 3D tradicional à web interativa exige geometria limpa, UVs corretas e otimização para renderização em tempo real.',
    solution:
      'Workflow integrado em Blender e Blockbench preparado para exportação direta para WebGL/Three.js, glTF, STL e motores de jogo (GeckoLib).',
    architectureNote:
      'Cobertura integral do pipeline: da primitiva 3D e topologia limpa ao rigging de esqueleto e renderização em tempo real no browser.',
    highlights: [
      'Modelação hard-surface e orgânica a partir de blueprints em Blender.',
      'UV Unwrapping, texturização PBR, iluminação de cenário e simulações físicas.',
      'Criação de esqueletos (rigging), animação por keyframes e exportação para Three.js / WebGL.',
    ],
    specs: [
      { label: 'Software 3D', value: 'Blender · Blockbench' },
      { label: 'Pipeline', value: 'Modelação · UV · PBR · Rigging · Física' },
      { label: 'Formatos', value: 'glTF · .STL · .geo.json' },
      { label: 'Web', value: 'Three.js · Canvas · WebGL' },
    ],
    stack: ['Blender', 'Blockbench', 'Three.js', 'WebGL', 'UV Mapping', 'Rigging'],
    links: [
      { label: 'GitHub Perfil', url: 'https://github.com/FireBomb23', kind: 'github' },
    ],
    visualType: 'blender-3d',
  },
  {
    id: 'ecogo',
    slug: 'ecogo',
    title: 'EcoGo — Mobilidade Sustentável',
    subtitle: 'Identidade Visual, Prototipagem Mobile/Desktop no Figma & Calculadora Web de CO₂',
    category: 'ui-ux',
    categoryLabel: 'UI/UX & Frontend',
    year: '2025',
    role: 'UI/UX Designer & Frontend Dev',
    context: 'Projeto Integrado II · 2.º Ano L-TDM (Iniciativas Eco-Escolas ESTGV)',
    image: '/images/ecogo.jpg',
    imageAlt: 'Render industrial minimalista de mobilidade elétrica sustentável EcoGo',
    summary:
      'Solução digital de sensibilização para mobilidade sustentável no campus ESTGV: identidade gráfica completa, protótipos mobile/desktop no Figma e calculadora web interativa de pegada de carbono (CO₂).',
    problem:
      'Tornar tangível o impacto ambiental das deslocações diárias para estudantes e docentes, transformando dados abstratos de emissões numa ferramenta simples e apelativa.',
    solution:
      'Sistema de marca e interface desenhado em Figma acompanhado por uma calculadora web responsiva que converte distância e meio de transporte em emissões de CO₂ poupadas.',
    architectureNote:
      'Foco total em clareza visual, hierarquia tipográfica e adaptação responsiva entre ecrãs móveis e desktop.',
    highlights: [
      'Identidade gráfica, logótipo e sistema de componentes mobile e desktop no Figma.',
      'Implementação web interativa da calculadora de emissões de CO₂.',
      'Planeamento ágil com Trello, gráficos de Gantt e análise estruturada de requisitos.',
    ],
    specs: [
      { label: 'Design', value: 'Figma · Identidade Visual · Mobile/Desktop' },
      { label: 'Frontend', value: 'HTML5 · CSS3 · JavaScript' },
      { label: 'Funcionalidade', value: 'Calculadora Interativa de CO₂' },
      { label: 'Gestão', value: 'Metodologia Ágil · Gantt · Requisitos' },
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Figma', 'UI/UX Design', 'Branding'],
    links: [
      { label: 'GitHub Perfil', url: 'https://github.com/FireBomb23', kind: 'github' },
    ],
    visualType: 'ecogo',
  },
];

export const SKILL_GROUPS = [
  {
    title: 'Fullstack & Mobile',
    skills: ['Django & DRF', 'Flutter / Dart', 'React', 'Astro & Tailwind', 'Node.js / Express', 'Java 21', 'TypeScript / JS'],
  },
  {
    title: 'Dados & Segurança',
    skills: ['PostgreSQL', 'PL/pgSQL (Triggers/Views)', 'SQLite Offline-First', 'REST APIs', '2FA TOTP / Fernet AES', 'Git & GitHub'],
  },
  {
    title: '3D & Interatividade',
    skills: ['Three.js / WebGL', 'Blender (Modelação & Rig)', 'Blockbench / GeckoLib', 'Ficheiros 3D STL', 'Canvas & Micro-animações'],
  },
  {
    title: 'Design & Produto',
    skills: ['Figma (UI & Protótipos)', 'Design Systems', 'Testes UX (UEQ)', 'Acessibilidade WCAG', 'Identidade Visual & SVG'],
  },
];

export const TIMELINE = [
  {
    period: '2026 — Presente',
    title: '3.º Ano · Tecnologias e Design de Multimédia',
    place: 'ESTGV — Viseu',
    description:
      'Sistema empresarial LabCD (Flutter, Django, PostgreSQL, STL), Computação Gráfica 3D em Blender, Desenvolvimento de Jogos e preparação DAPE.',
  },
  {
    period: '2025 — 2026',
    title: '2.º Ano · Web Fullstack, Bases de Dados & UX',
    place: 'ESTGV — Viseu',
    description:
      'Plataforma Cyrix (React, Express, PostgreSQL, testes UEQ), projeto EcoGo (Figma + Calculadora CO₂) e Programação Orientada a Objetos.',
  },
  {
    period: '2024 — 2025',
    title: '1.º Ano · Programação & Design Visual',
    place: 'ESTGV — Viseu',
    description:
      'Algoritmos, Estruturas de Dados, Design de Interação, Design de Identidade, Tipografia e Composição Fotográfica.',
  },
];
