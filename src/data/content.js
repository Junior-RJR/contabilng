// Conteúdo central do site — edite aqui textos, contatos e imagens.

export const contact = {
  phoneLabel: '11 99760-5263',
  phoneHref: 'tel:+5511997605263',
  whatsapp: 'https://wa.me/5511997605263',
  email: 'contato@contabilng.com.br',
  hours: 'Seg - Sex 8:30 - 16:45',
  address: {
    title: 'Filiais ABC',
    lines: ['Alameda São Caetano, 1021, Sala 3,', 'Campestre, Santo André - SP', 'CEP 09070-105'],
    map: 'https://www.google.com/maps?q=Alameda+S%C3%A3o+Caetano,+1021,+Campestre,+Santo+Andr%C3%A9+-+SP,+09070-105&output=embed',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Alameda+S%C3%A3o+Caetano,+1021,+Santo+Andr%C3%A9+-+SP',
  },
  social: {
    facebook: '#',
    linkedin: '#',
    instagram: '#',
    blog: '#blog',
  },
}

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'Empresa', href: '#empresa' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Planos', href: '#processo' },
  { label: 'Contato', href: '#contato' },
  { label: 'Blog', href: '#blog' },
  { label: 'Faqs', href: '#' },
]

// Troque pelas imagens oficiais do site (coloque em /public e use '/nome.jpg').
const u = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const heroImage = u('photo-1560250097-0b93528c311a', 1400)

export const rotatingWords = ['sua empresa', 'seu negócio', 'seu crescimento', 'seu futuro']

export const services = [
  {
    title: 'Contabilidade',
    icon: 'Calculator',
    image: u('photo-1554224155-6726b3ff858f'),
    text: 'Oferecemos uma gama completa e abrangente de serviços contábeis para garantir que sua empresa ou situação pessoal seja gerida com precisão, eficiência e conformidade. Nossa equipe especializada trabalha diligentemente para fornecer soluções contábeis eficazes e personalizadas, atendendo às suas necessidades específicas e únicas.',
  },
  {
    title: 'Imposto de Renda',
    icon: 'Receipt',
    image: u('photo-1552664730-d307ca884978'),
    text: 'Oferecemos serviços especializados para a preparação e envio da declaração de Imposto de Renda, garantindo precisão e conformidade com a legislação vigente. Nossa equipe experiente trabalha para otimizar sua situação fiscal e assegurar que todas as obrigações sejam cumpridas de forma eficiente e sem complicações.',
  },
  {
    title: 'Departamento Fiscal',
    icon: 'Landmark',
    image: u('photo-1551288049-bebda4e38f71'),
    text: 'Nosso Departamento Fiscal oferece uma abordagem abrangente e detalhada para a administração e otimização de obrigações fiscais. Com uma equipe altamente experiente e qualificada, garantimos que sua empresa esteja sempre em conformidade com a legislação tributária e aproveite ao máximo os benefícios e incentivos disponíveis.',
  },
  {
    title: 'Departamento Pessoal',
    icon: 'Users',
    image: u('photo-1600880292203-757bb62b4baf'),
    text: 'Nosso Departamento Pessoal proporciona uma gestão eficiente e detalhada de todas as questões relacionadas aos recursos humanos da sua empresa. Com uma equipe especializada, garantimos que todas as atividades estejam em conformidade com a legislação trabalhista e sejam realizadas com precisão e pontualidade.',
  },
  {
    title: 'Abertura de Empresa',
    icon: 'Building2',
    image: u('photo-1542744173-8e7e53415bb0'),
    text: 'Oferecemos serviços completos para a legalização de empresas, cobrindo todos os aspectos necessários para a abertura, alteração e encerramento de empresas. Nossa equipe especializada garante que todos os processos sejam realizados de acordo com as normas legais e regulatórias, proporcionando uma transição suave e eficiente para o seu negócio.',
  },
  {
    title: 'Planejamento Tributário',
    icon: 'TrendingUp',
    image: u('photo-1556761175-5973dc0f32e7'),
    text: 'Oferecemos serviços especializados de planejamento tributário para ajudar empresas e indivíduos a minimizar eficazmente a carga tributária e maximizar a eficiência fiscal. Nossa abordagem estratégica visa identificar oportunidades valiosas e desenvolver soluções personalizadas que atendam às necessidades específicas de cada cliente.',
  },
]

export const stats = [
  { value: 15, suffix: '+', label: 'anos de experiência' },
  { value: 500, suffix: '+', label: 'empresas atendidas' },
  { value: 98, suffix: '%', label: 'clientes satisfeitos' },
  { value: 100, suffix: '%', label: 'atendimento digital' },
]

export const steps = [
  { title: 'Conversa inicial', text: 'Entendemos o momento e os objetivos do seu negócio, sem compromisso.' },
  { title: 'Diagnóstico', text: 'Analisamos regime tributário, obrigações e oportunidades de economia.' },
  { title: 'Plano sob medida', text: 'Montamos a estratégia contábil e fiscal ideal para a sua realidade.' },
  { title: 'Gestão contínua', text: 'Cuidamos de tudo mês a mês, com relatórios claros e suporte próximo.' },
]

export const testimonials = [
  {
    company: 'Global Reversa',
    tagline: 'Logística Reversa',
    name: 'Farias',
    text: 'Gostaria de expressar minha satisfação com o trabalho realizado pela Contábil NG. Desde o início da nossa parceria, a equipe tem se mostrado extremamente competente e dedicada. Além disso, a comunicação é sempre clara, eficiente e ágil. A Contábil NG demonstra compromisso com o sucesso de seus clientes, oferecendo suporte constante e soluções personalizadas que fazem a diferença. Recomendo a Contábil NG!',
  },
  {
    company: 'Avante Elétrica',
    tagline: 'Materiais elétricos',
    name: 'Ana Rita Q. T.',
    text: 'O que falar da Contábil NG, uma equipe totalmente eficiente, eles sempre se preocupam com seu trabalho e dedicação pelo cliente, escritório super antecioso e ágil, confio no trabalho da NG de olhos fechados. Grata',
  },
  {
    company: 'Totale!',
    tagline: 'Distribuidora de acessórios tecnológicos',
    name: 'Norberto M. dos Santos',
    text: 'Excelente qualidade de serviços, equipe atenciosa. Sou cliente há anos, eu recomendo.',
  },
  {
    company: 'Jardim Floresce',
    tagline: 'Floricultura',
    name: 'Stefani',
    text: 'Atendimento excelente! Esse é o resumo. Sempre prontos a sanar nossas dúvidas e com uma assessoria extremamente eficiente. São conhecedores do que fazem e só tenho a agradecer pela parceria.',
  },
]

export const posts = [
  {
    title: 'Receita Federal alerta sobre golpes online que imitam o PGMEI',
    date: '25 jul 2024',
    tag: 'MEI',
    image: u('photo-1563986768609-322da13575f3', 800),
    href: '#',
  },
  {
    title: 'PIS retroativo: entenda o que é e quem tem direito a receber',
    date: '25 jul 2024',
    tag: 'Trabalhista',
    image: u('photo-1579621970563-ebec7560ff3e', 800),
    href: '#',
  },
  {
    title: 'Receita facilita regularização de débitos tributários decorrentes de decisões favoráveis no Carf',
    date: '21 jun 2024',
    tag: 'Tributário',
    image: u('photo-1450101499163-c8848c66ca85', 800),
    href: '#',
  },
]

export const ctaImage = u('photo-1450101499163-c8848c66ca85', 1600)

// Clientes exibidos na faixa do rodapé (troque por logos em /public se quiser).
export const clients = ['Jardim do Olhar', 'Ecologicamigos', 'MLP Vendas', 'Nobre Paladar', 'R3', 'Império Dança', 'Comet Açaí', 'Haus']
