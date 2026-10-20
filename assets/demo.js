/* =====================================================================
   Oxe, Mais Tattoo — dados de EXEMPLO do modo demonstração (site e painel).
   Só roda com o Supabase desligado. Todos os clientes são fictícios e
   marcados "(exemplo)". Os valores em R$ também são fictícios: servem para
   mostrar o funil, não são tabela do estúdio.
   As "referências" usam fotos da pasta fotos/.
   Carrega depois de config.js e antes de agenda.js / admin.js.
   ===================================================================== */
(function () {
  'use strict';
  var CFG = window.TV;
  if (!CFG || !CFG.modoDemo) return;
  // prefixo das chaves do navegador: o mesmo que o motor (agenda.js) usa
  var PFX = CFG.prefixoDemo || 'om_';
  var VERSAO = PFX + 'oxemais_semeado_v1';
  try { if (localStorage.getItem(VERSAO)) return; } catch (e) { return; }

  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function aberto(d) { var e = (CFG.expediente || {})[d.getDay()]; return e ? !!e.aberto : d.getDay() !== 0; }
  // dia a partir de hoje; dia fechado (domingo) pula para o próximo dia aberto
  function dia(off) {
    var d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + off);
    for (var i = 0; i < 7 && !aberto(d); i++) d.setDate(d.getDate() + (off < 0 ? -1 : 1));
    return iso(d);
  }
  // próximo dia aberto a partir de uma data ISO (passo +1 ou -1)
  function outroDia(s, passo) {
    var p = s.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2], 12);
    do { d.setDate(d.getDate() + passo); } while (!aberto(d));
    return iso(d);
  }
  function criado(off, h) { var d = new Date(); d.setDate(d.getDate() + off); d.setHours(h || 10, 17, 0, 0); return d.toISOString(); }
  function min(t) { var p = t.split(':'); return (+p[0]) * 60 + (+p[1]); }
  function hora(m) { return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); }

  // nomes e durações de reserva, caso o config ainda não traga o serviço
  var SERV = {
    'orcamento':      { nome: 'Conversa de orçamento',  duracao_min: 30 },
    'sessao-pequena': { nome: 'Sessão pequena',         duracao_min: 120 },
    'sessao-media':   { nome: 'Sessão média',           duracao_min: 240 },
    'sessao-longa':   { nome: 'Sessão longa',           duracao_min: 360 },
    'cobertura':      { nome: 'Avaliação de cobertura', duracao_min: 30 },
    'retoque':        { nome: 'Retoque',                duracao_min: 60 },
    'piercing':       { nome: 'Piercing',               duracao_min: 30 }
  };
  (CFG.servicosDemo || []).forEach(function (s) { SERV[s.id] = s; });
  var NOME = { ricardo: 'Ricardo', piercing: 'Piercing do estúdio' };
  (CFG.artistas || []).forEach(function (a) { NOME[a.slug] = a.nome; });

  function tattoo(estilo, local, tam, ideia, extra) {
    return ['Estilo: ' + estilo, 'Local: ' + local, 'Tamanho: ' + tam]
      .concat(extra || [], ['Ideia: ' + ideia]).join('\n');
  }
  function furo(texto) { return 'Piercing: ' + texto; }

  // [profissional, serviço, dia, início, cliente, etapa, obs, anexos, valor, sinal, sinal pago, criado há n dias]
  var L = [
    /* ---- Ricardo: realismo e coberturas ---- */
    ['ricardo', 'orcamento',      dia(1),  '10:00', 'Thiago S.',   'novo',      tattoo('Realismo preto e cinza', 'Antebraço', '10 a 20 cm', 'Leão rugindo com a juba bem marcada, igual ao do Instagram', ['Primeira tattoo: Não']), ['fotos/antebraco-leao-grega.jpg'], 0, 0, false, 0],
    ['ricardo', 'cobertura',      dia(2),  '09:30', 'Daniela M.',  'novo',      tattoo('Cobertura de tattoo antiga', 'Antebraço', '5 a 10 cm', 'Cobrir um nome com coroa no antebraço, pensei numa águia', ['Cobertura: Sim']), ['fotos/ricardo-cobertura-antes-depois.jpg'], 0, 0, false, 0],
    ['ricardo', 'orcamento',      dia(8),  '15:00', 'Caio R.',     'novo',      tattoo('Mitologia e guerreiros', 'Ombro', '20 a 30 cm', 'Zeus com raio no ombro, fechando para o braço depois'), [], 0, 0, false, -1],
    ['ricardo', 'sessao-media',   dia(3),  '09:00', 'Rodrigo A.',  'conversa',  tattoo('Fé e religião', 'Braço', '20 a 30 cm', 'Cristo com coroa de espinhos na parte de dentro do braço'), ['fotos/cristo-espinhos.jpg'], 0, 0, false, -2],
    ['ricardo', 'orcamento',      dia(2),  '15:00', 'Lucas P.',    'conversa',  tattoo('Animais', 'Perna / panturrilha', '20 a 30 cm', 'Lobo com bússola na panturrilha'), [], 0, 0, false, -3],
    ['ricardo', 'sessao-longa',   dia(6),  '09:00', 'Felipe N.',   'orcado',    tattoo('Fechamento (braço ou perna)', 'Braço', 'Fechamento (braço, perna ou costas)', 'Fechamento com gladiador e coliseu, primeira de três sessões'), ['fotos/fechamento-gladiador.jpg'], 250000, 50000, false, -4],
    ['ricardo', 'cobertura',      dia(4),  '14:00', 'Juliana C.',  'orcado',    tattoo('Cobertura de tattoo antiga', 'Ombro', '10 a 20 cm', 'Cobrir uma tribal antiga no ombro', ['Cobertura: Sim']), [], 90000, 20000, true, -5],
    ['ricardo', 'sessao-media',   dia(0),  '10:00', 'Marcelo T.',  'marcado',   tattoo('Fé e religião', 'Ombro', '20 a 30 cm', 'Cavaleiro templário com a medalha de São Bento'), ['fotos/ombro-templario.jpg'], 120000, 30000, true, -7],
    ['ricardo', 'sessao-longa',   dia(5),  '09:00', 'André L.',    'marcado',   tattoo('Animais', 'Braço', 'Mais de 30 cm', 'Leão com os dois filhotes, homenagem aos filhos'), ['fotos/braco-leao-filhotes.jpg'], 180000, 40000, true, -9],
    ['ricardo', 'retoque',        dia(4),  '16:00', 'Bruno G.',    'marcado',   tattoo('Realismo preto e cinza', 'Antebraço', '10 a 20 cm', 'Retoque do tigre feito no mês passado'), [], 0, 0, false, -4],
    ['ricardo', 'sessao-media',   dia(-5), '09:00', 'Paulo V.',    'concluido', tattoo('Retrato', 'Braço', '20 a 30 cm', 'Retrato de palhaça em preto e cinza'), [], 110000, 30000, true, -14],
    ['ricardo', 'sessao-pequena', dia(-8), '13:00', 'Diego O.',    'concluido', tattoo('Animais', 'Antebraço', '10 a 20 cm', 'Leão com o escudo do time no antebraço'), [], 60000, 15000, true, -16],
    ['ricardo', 'orcamento',      dia(-2), '15:00', 'Henrique B.', 'recusado',  tattoo('Realismo preto e cinza', 'Costas', 'Fechamento (braço, perna ou costas)', 'Costas fechadas, mas só posso fazer em uma sessão'), [], 0, 0, false, -6],

    /* ---- Piercing do estúdio ---- */
    ['piercing', 'piercing', dia(1),   '11:00', 'Larissa F.', 'novo',      furo('hélix na orelha esquerda'), [], 0, 0, false, 0],
    ['piercing', 'piercing', dia(3),   '15:00', 'Bianca R.',  'novo',      furo('septo, primeira vez'), [], 0, 0, false, -1],
    ['piercing', 'piercing', dia(2),   '10:00', 'Nathália S.', 'conversa', furo('nostril, quero saber as opções de joia'), [], 0, 0, false, -2],
    ['piercing', 'piercing', dia(6),   '14:00', 'Kauã M.',    'orcado',    furo('dois furos no lóbulo'), [], 15000, 0, false, -3],
    ['piercing', 'piercing', dia(0),   '16:00', 'Camila D.',  'marcado',   furo('umbigo'), [], 12000, 0, false, -3],
    ['piercing', 'piercing', dia(-4),  '16:30', 'Rafaela P.', 'concluido', furo('tragus'), [], 12000, 0, false, -8],
    ['piercing', 'piercing', dia(-3),  '11:00', 'Igor A.',    'recusado',  furo('sobrancelha, mas só no domingo'), [], 0, 0, false, -5]
  ];
  // só entra quem está na equipe do config
  L = L.filter(function (x) { return !CFG.artistas || !CFG.artistas.length || CFG.artistas.some(function (a) { return a.slug === x[0]; }); });

  var ocupado = {};
  var lista = L.map(function (x, i) {
    var s = SERV[x[1]] || { nome: x[1], duracao_min: 60 };
    var status = x[5] === 'concluido' ? 'concluido' : x[5] === 'recusado' ? 'cancelado' : 'confirmado';
    // se dois exemplos caírem no mesmo horário (dia fechado empurra a data), o segundo muda de dia
    var ini = min(x[3]), fimMin = ini + s.duracao_min, d = x[2], hoje = iso(new Date());
    if (status === 'confirmado') {
      for (var t = 0; t < 14; t++) {
        var livre = !(ocupado[x[0] + d] || []).some(function (o) { return ini < o[1] && fimMin > o[0]; });
        if (livre) break;
        d = outroDia(d, d < hoje ? -1 : 1);
      }
      (ocupado[x[0] + d] = ocupado[x[0] + d] || []).push([ini, fimMin]);
    }
    return {
      codigo: 'EX' + String(1001 + i), barbeiro_id: x[0], barbeiro: NOME[x[0]] || x[0],
      servico: s.nome, preco_centavos: 0, nome: x[4] + ' (exemplo)',
      telefone: '719000000' + String(10 + i), dia: d, inicio: hora(ini), fim: hora(fimMin),
      obs: x[6], status: status, anexos: x[7], exemplo: true,
      etapa: x[5], valor_centavos: x[8], sinal_centavos: x[9], sinal_pago: x[10], criado_em: criado(x[11])
    };
  });
  var bloqueios = [
    { id: 'b1', barbeiro_id: 'ricardo', data: dia(12), hora_inicio: '00:00', hora_fim: '23:59', motivo: 'Convenção de tatuagem (exemplo)' },
    { id: 'b2', barbeiro_id: 'piercing', data: dia(9), hora_inicio: '00:00', hora_fim: '23:59', motivo: 'Folga (exemplo)' }
  ];
  try {
    localStorage.setItem(PFX + 'agendamentos_demo', JSON.stringify(lista));
    localStorage.setItem(PFX + 'bloqueios_demo', JSON.stringify(bloqueios));
    localStorage.removeItem(PFX + 'artistas_demo');
    localStorage.setItem(PFX + 'demo_semeado_v1', '1');   // o motor não semeia por cima
    localStorage.setItem(VERSAO, '1');
  } catch (e) {}
})();
