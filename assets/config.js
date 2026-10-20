/* =====================================================================
   Oxe, Mais Tattoo — configuração
   Único arquivo que precisa ser editado para o site sair do modo de
   demonstração e entrar no ar de verdade.
   Tudo aqui veio do Instagram @oxemaistattoo e @ricardotattoo_ (20/10/2026).
   O que não deu para ler está marcado A CONFIRMAR (ver README).
   ===================================================================== */

window.TV = {

  /* ---- Estúdio ------------------------------------------------------ */
  nome:       'Oxe, Mais Tattoo',
  slogan:     'Estúdio de tatuagem em Salvador/BA',
  assinatura: 'Traço fino, contraste pesado e padrão elevado',
  instagram:  'oxemaistattoo',
  prefixoDemo: 'om_',   // chaves da demo no navegador (agenda.js usa o mesmo prefixo)
  logo:       'fotos/logo.jpg',

  // WhatsApp do estúdio: o Instagram tem o botão, mas o número não aparece
  // na coleta (A CONFIRMAR). Vazio = o resumo do pedido vai pelo Direct.
  whatsapp:        '',
  whatsappVisivel: '',

  // Destaque "Novo Endereço" no Instagram: endereço não legível na coleta.
  // A CONFIRMAR. Com maps/embed vazios, o site não mostra mapa.
  endereco: {
    linha1: 'Endereço novo',
    linha2: 'Salvador — BA',
    referencia: '',
    maps:   '',
    embed:  '',
    busca:  'Oxe, Mais Tattoo, Salvador - BA'
  },
  // A CONFIRMAR: horário não aparece no Instagram.
  funcionamento: 'Atendimento com hora marcada',

  /* ---- Supabase ---------------------------------------------------
     Enquanto estes dois campos estiverem vazios, o site roda em MODO
     DEMONSTRAÇÃO: o pedido funciona de verdade na tela, mas fica guardado
     só no navegador de quem está olhando.
       1. supabase.com  ->  New project (região: South America / São Paulo)
       2. SQL Editor    ->  cole e rode db/schema.sql inteiro
       3. Settings > API -> copie "Project URL" e a chave "anon public"
     A chave anon é pública por natureza; quem protege é o RLS do schema.sql.
  ------------------------------------------------------------------ */
  supabaseUrl: '',
  supabaseKey: '',

  regras: {
    passoMin:        30,
    antecedenciaMin: 30,
    janelaDias:      30,
    cancelamentoH:   2
  },

  // Tatuagem é com o Ricardo e piercing é com o piercing do estúdio.
  semPreferencia: false,

  /* ---- Expediente (0 = domingo) ------------------------------------
     A CONFIRMAR: segunda a sábado, 9h às 18h é só para a agenda da demo.
  ------------------------------------------------------------------ */
  expediente: {
    0: { aberto: false },
    1: { aberto: true, abre: '09:00', fecha: '18:00' },
    2: { aberto: true, abre: '09:00', fecha: '18:00' },
    3: { aberto: true, abre: '09:00', fecha: '18:00' },
    4: { aberto: true, abre: '09:00', fecha: '18:00' },
    5: { aberto: true, abre: '09:00', fecha: '18:00' },
    6: { aberto: true, abre: '09:00', fecha: '18:00' }
  },

  /* ---- Equipe (páginas artista.html?a=<slug>) -----------------------
     Só quem foi identificado no Instagram. Equipe completa A CONFIRMAR:
     artista novo é só mais um bloco aqui (e uma linha em barbeiros no banco).
     estudio: true = não é uma pessoa (é o serviço de piercing do estúdio,
              sem nome de profissional ainda): fica fora da vitrine da equipe.
     direct:  @ que recebe o resumo do pedido.
  ------------------------------------------------------------------ */
  artistas: [
    {
      slug: 'ricardo', nome: 'Ricardo', apelido: 'Ricardo', instagram: 'ricardotattoo_', whatsapp: '',
      foto: 'fotos/ricardo-rosto.jpg', capa: 'fotos/ricardo-zeus.jpg',
      oficio: 'Tatuador',
      linha: 'Especialista em realismo e coberturas',
      estilos: ['Realismo preto e cinza', 'Cobertura de tattoo antiga', 'Fechamentos', 'Animais', 'Mitologia e fé'],
      selo: 'Agenda aberta',
      bio: [
        'Tatuador do Oxe, Mais Tattoo, em Salvador.',
        'Especialista em realismo e em coberturas: transforma tattoo antiga em peça nova.',
        'No Instagram dele tem os destaques Cicatrizada, Depoimentos e Disponíveis.',
        'Orçamento direto por aqui: conte a ideia, mande referência e escolha o dia.'
      ],
      fotos: [
        { src: 'fotos/ricardo-zeus.jpg',                   alt: 'Zeus em realismo preto e cinza no braço' },
        { src: 'fotos/ricardo-cobertura-antes-depois.jpg', alt: 'Cobertura: nome com coroa no antebraço virou uma águia em realismo (antes e depois)' },
        { src: 'fotos/ricardo-tigre.jpg',                  alt: 'Tigre em realismo no antebraço' },
        { src: 'fotos/ricardo-gorila.jpg',                 alt: 'Gorila rugindo em realismo no braço' },
        { src: 'fotos/ombro-templario.jpg',                alt: 'Cavaleiro templário com a medalha de São Bento no ombro' },
        { src: 'fotos/braco-leao-filhotes.jpg',            alt: 'Leão com filhotes no braço' },
        { src: 'fotos/retrato-palhaca.jpg',                alt: 'Retrato de palhaça em preto e cinza' },
        { src: 'fotos/ricardo-antebraco-guerreiro.jpg',    alt: 'Guerreiro de barba em realismo no antebraço' }
      ]
    },
    {
      // O destaque "Piercing" mostra que o estúdio fura, mas não diz quem.
      // A CONFIRMAR o nome e o @ de quem faz. Até lá o pedido cai no Direct do estúdio.
      slug: 'piercing', nome: 'Piercing do estúdio', apelido: 'o estúdio', instagram: 'oxemaistattoo', whatsapp: '',
      direct: 'oxemaistattoo', estudio: true, perfuracao: true,
      foto: '', oficio: 'Piercing',
      linha: 'Piercing no estúdio · valor sob consulta',
      estilos: ['Piercing'],
      bio: [],
      fotos: []
    }
  ],

  // Nada tem preço fixo: tudo sai como "sob orçamento" (preco 0).
  // Durações A CONFIRMAR: servem só para reservar o tempo certo na agenda.
  servicosDemo: [
    { id:'orcamento',      nome:'Conversa de orçamento',  descricao:'Para ver a ideia, o local e o tamanho com o Ricardo e fechar valor e data.',     preco_centavos:0, a_partir_de:false, duracao_min:30,  categoria:'Tatuagem', apenas_barbeiro_id:'ricardo' },
    { id:'sessao-pequena', nome:'Sessão pequena',         descricao:'Peças menores e com menos área de sombra.',                                      preco_centavos:0, a_partir_de:false, duracao_min:120, categoria:'Tatuagem', apenas_barbeiro_id:'ricardo' },
    { id:'sessao-media',   nome:'Sessão média',           descricao:'Antebraço, ombro, panturrilha: realismo com sombra e detalhe.',                  preco_centavos:0, a_partir_de:false, duracao_min:240, categoria:'Tatuagem', apenas_barbeiro_id:'ricardo' },
    { id:'sessao-longa',   nome:'Sessão longa',           descricao:'Boa parte do dia, para fechamentos de braço e perna.',                           preco_centavos:0, a_partir_de:false, duracao_min:360, categoria:'Tatuagem', apenas_barbeiro_id:'ricardo' },
    { id:'cobertura',      nome:'Avaliação de cobertura', descricao:'Mande a foto da tattoo antiga: o Ricardo avalia e desenha a cobertura.',         preco_centavos:0, a_partir_de:false, duracao_min:30,  categoria:'Tatuagem', apenas_barbeiro_id:'ricardo' },
    { id:'retoque',        nome:'Retoque',                descricao:'Para tattoo já cicatrizada que precisa de reforço.',                             preco_centavos:0, a_partir_de:false, duracao_min:60,  categoria:'Tatuagem', apenas_barbeiro_id:'ricardo' },
    { id:'piercing',       nome:'Piercing',               descricao:'Perfuração no estúdio. Valor sob consulta.',                                     preco_centavos:0, a_partir_de:false, duracao_min:30,  categoria:'Piercing', apenas_barbeiro_id:'piercing', sem_projeto:true }
  ],

  /* ---- Galeria da capa: posts do @oxemaistattoo (o estúdio não credita
     o artista em todos; A CONFIRMAR quem fez cada peça) -------------- */
  galeria: [
    { src: 'fotos/fechamento-leao-cristo.jpg', alt: 'Fechamento de braço com leão e Cristo' },
    { src: 'fotos/ombro-odin.jpg',             alt: 'Guerreiro nórdico com raios no ombro' },
    { src: 'fotos/antebraco-leao-grega.jpg',   alt: 'Leão rugindo com faixa grega no antebraço' },
    { src: 'fotos/cristo-espinhos.jpg',        alt: 'Cristo com coroa de espinhos' },
    { src: 'fotos/fechamento-gladiador.jpg',   alt: 'Fechamento de braço com gladiador' },
    { src: 'fotos/perna-lobo-bussola.jpg',     alt: 'Lobo com bússola na perna' },
    { src: 'fotos/ombro-templario.jpg',        alt: 'Cavaleiro templário com a medalha de São Bento' },
    { src: 'fotos/antebraco-leao-brasao.jpg',  alt: 'Leão com brasão de time no antebraço' },
    { src: 'fotos/fechamento-espartano.jpg',   alt: 'Fechamento de braço com guerreiro espartano' },
    { src: 'fotos/retrato-palhaca.jpg',        alt: 'Retrato de palhaça em preto e cinza' },
    { src: 'fotos/braco-leao-filhotes.jpg',    alt: 'Leão com filhotes no braço' },
    { src: 'fotos/fechamento-leao.jpg',        alt: 'Fechamento de braço com leão' }
  ],

  /* ---- Estilos que aparecem no pedido de tatuagem --------------------
     Tirados do portfólio do estúdio e da bio do Ricardo.
  ------------------------------------------------------------------ */
  estilos: ['Realismo preto e cinza', 'Cobertura de tattoo antiga', 'Fechamento (braço ou perna)', 'Animais', 'Fé e religião', 'Mitologia e guerreiros', 'Retrato', 'Trago meu desenho', 'Ainda não sei']
};

// o motor chama os profissionais de "barbeiros" (nome herdado, não aparece na tela)
window.TV.barbeirosDemo = window.TV.artistas.map(function (a) {
  return { id: a.slug, slug: a.slug, nome: a.nome, foto: a.foto, instagram: a.instagram,
           whatsapp: a.whatsapp, cargo: a.linha };
});
window.TV.artistaPor = function (chave) {
  return window.TV.artistas.filter(function (a) {
    return a.slug === chave || a.nome === chave || a.instagram === chave;
  })[0] || null;
};
window.TV.modoDemo = !(window.TV.supabaseUrl && window.TV.supabaseKey);
