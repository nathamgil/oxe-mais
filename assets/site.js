/* =====================================================================
   Vitrine (capa, página do artista e processo) — não depende do motor.
   - cards da equipe (levam para artista.html?a=<slug>)
   - "Pedir orçamento com ...": abre o pedido já com o artista escolhido
   - galeria com foto ampliada (setas, teclado e deslizar no celular)
   - "Encontre seu traço": escolhe um estilo e vê quem faz (se a página tiver)
   - página do artista: capa, bio, estilos, portfólio, contatos, outros
   Quem não tem foto usa o logo do estúdio.
   ===================================================================== */
(function () {
  'use strict';

  var CFG = window.TV;
  var LOGO = CFG.logo || 'fotos/logo.jpg';
  function $(s) { return document.querySelector(s); }
  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }
  function chama(a) { return a.apelido || a.nome; }
  function linkAgendar(a) { return 'index.html?artista=' + encodeURIComponent(a.slug) + '#agendar'; }
  function linkPagina(a) { return 'artista.html?a=' + encodeURIComponent(a.slug); }
  function arrobaDe(a) { return a.direct || a.instagram || CFG.instagram; }
  function pessoas() { return CFG.artistas.filter(function (a) { return !a.estudio; }); }
  function rotuloPedir(a) { return a.perfuracao && a.estudio ? 'Agendar piercing' : 'Pedir orçamento com ' + chama(a); }

  var ano = $('#ano');
  if (ano) ano.textContent = new Date().getFullYear();
  if (CFG.modoDemo && $('#faixa-demo')) $('#faixa-demo').hidden = false;

  /* ---- card do artista ---- */
  function card(a) {
    var c = el('article', 'artista-card');
    var lk = el('a', 'ac-link');
    lk.href = linkPagina(a);
    lk.setAttribute('aria-label', 'Ver o portfólio de ' + a.nome);
    var capa = el('span', 'ac-capa');
    var ic = el('img');
    ic.src = a.capa || (a.fotos && a.fotos[0] && a.fotos[0].src) || LOGO;
    ic.alt = ''; ic.loading = 'lazy';
    capa.appendChild(ic);
    if (a.selo) capa.appendChild(el('span', 'ac-selo', a.selo));
    lk.appendChild(capa);
    var txt = el('span', 'ac-txt');
    var rosto = el('span', 'ac-rosto');
    var ir = el('img'); ir.src = a.foto || LOGO; ir.alt = ''; ir.loading = 'lazy';
    rosto.appendChild(ir);
    txt.appendChild(rosto);
    var nomes = el('span', 'ac-nomes');
    nomes.appendChild(el('span', 'ac-oficio', a.oficio || 'Tatuagem'));
    nomes.appendChild(el('h3', 'ac-nome', a.nome));
    nomes.appendChild(el('span', 'ac-arroba', '@' + a.instagram));
    txt.appendChild(nomes);
    lk.appendChild(txt);
    lk.appendChild(el('span', 'ac-linha', a.linha));
    c.appendChild(lk);
    var acoes = el('div', 'ac-acoes');
    var p = el('a', 'btn btn-cheio', rotuloPedir(a));
    p.href = linkAgendar(a); p.setAttribute('data-embarcar', a.slug);
    acoes.appendChild(p);
    var v = el('a', 'btn btn-linha', 'Ver portfólio');
    v.href = linkPagina(a);
    acoes.appendChild(v);
    c.appendChild(acoes);
    return c;
  }
  var equipe = $('#lista-equipe');
  if (equipe) pessoas().forEach(function (a) { equipe.appendChild(card(a)); });

  /* ---- "Pedir orçamento com ...": na capa, escolhe o artista sem recarregar ---- */
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('[data-embarcar]');
    if (!a || !$('#agendar-app') || !CFG.agendarCom || !CFG.barbeirosCarregados) return;
    ev.preventDefault();
    CFG.agendarCom(a.getAttribute('data-embarcar'));
    $('#agendar').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---- link com âncora: a página cresce depois de montar tudo ---- */
  window.addEventListener('load', function () {
    var alvo = location.hash.length > 1 && document.getElementById(location.hash.slice(1));
    if (alvo) setTimeout(function () { alvo.scrollIntoView(); }, 150);
  });

  /* ---- foto ampliada: navega pela galeria em que a foto está ---- */
  var lupa = null, serie = [], pos = 0;
  function montaLupa() {
    lupa = el('dialog', 'lupa');
    lupa.setAttribute('aria-label', 'Foto ampliada');
    var topo = el('div', 'lupa-topo');
    topo.appendChild(el('span', 'lupa-txt'));
    var x = el('button', 'lupa-fechar', 'Fechar');
    x.type = 'button';
    x.addEventListener('click', function () { lupa.close(); });
    topo.appendChild(x);
    lupa.appendChild(topo);
    var palco = el('div', 'lupa-palco');
    var ant = el('button', 'lupa-seta lupa-ant', '‹'); ant.type = 'button'; ant.setAttribute('aria-label', 'Foto anterior');
    var prox = el('button', 'lupa-seta lupa-prox', '›'); prox.type = 'button'; prox.setAttribute('aria-label', 'Próxima foto');
    ant.addEventListener('click', function () { mostra(pos - 1); });
    prox.addEventListener('click', function () { mostra(pos + 1); });
    palco.appendChild(ant); palco.appendChild(el('img')); palco.appendChild(prox);
    lupa.appendChild(palco);
    lupa.appendChild(el('span', 'lupa-conta'));
    lupa.addEventListener('click', function (ev) { if (ev.target === lupa) lupa.close(); });
    lupa.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowLeft') mostra(pos - 1);
      if (ev.key === 'ArrowRight') mostra(pos + 1);
    });
    var x0 = null;
    palco.addEventListener('touchstart', function (ev) { x0 = ev.touches[0].clientX; }, { passive: true });
    palco.addEventListener('touchend', function (ev) {
      if (x0 == null) return;
      var dx = ev.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) mostra(pos + (dx < 0 ? 1 : -1));
    });
    document.body.appendChild(lupa);
  }
  function mostra(i) {
    pos = (i + serie.length) % serie.length;
    var f = serie[pos];
    lupa.querySelector('.lupa-txt').textContent = f.alt;
    var im = lupa.querySelector('img');
    im.src = f.src; im.alt = f.alt;
    lupa.querySelector('.lupa-conta').textContent = (pos + 1) + ' / ' + serie.length;
    var varias = serie.length > 1;
    lupa.querySelector('.lupa-ant').hidden = !varias;
    lupa.querySelector('.lupa-prox').hidden = !varias;
  }
  function amplia(fotos, i) {
    if (!lupa) montaLupa();
    serie = fotos; mostra(i);
    if (lupa.showModal) { if (!lupa.open) lupa.showModal(); } else window.open(fotos[i].src, '_blank');
  }
  function galeria(alvo, fotos, comAutor) {
    alvo.innerHTML = '';
    fotos.forEach(function (f, i) {
      var fig = el('figure', 'peca');
      var b = el('button', 'peca-btn');
      b.type = 'button';
      b.setAttribute('aria-label', 'Ampliar: ' + f.alt);
      var im = el('img'); im.src = f.src; im.alt = f.alt; im.loading = 'lazy';
      if (f.pos) im.style.objectPosition = f.pos;
      b.appendChild(im);
      b.addEventListener('click', function () { amplia(fotos, i); });
      fig.appendChild(b);
      var cap = el('figcaption', null, f.alt);
      if (comAutor && f.autor) cap.appendChild(el('small', null, f.autor));
      fig.appendChild(cap);
      alvo.appendChild(fig);
    });
  }
  // todas as peças, com o nome de quem fez
  function todasAsFotos() {
    var l = [];
    pessoas().forEach(function (a) {
      (a.fotos || []).forEach(function (f) { l.push(Object.assign({ autor: a.nome, slug: a.slug }, f)); });
    });
    return l;
  }
  var amostra = $('#mural-capa');
  if (amostra) {
    var max = +amostra.getAttribute('data-max') || 8;
    var base = CFG.galeria && CFG.galeria.length ? CFG.galeria : todasAsFotos();
    galeria(amostra, base.slice(0, max), true);
  }
  // fotos avulsas com data-amplia (ex.: antes e depois, cartaz do flash)
  Array.prototype.forEach.call(document.querySelectorAll('[data-amplia]'), function (b) {
    b.addEventListener('click', function () {
      var im = b.querySelector('img');
      amplia([{ src: im.getAttribute('src'), alt: im.alt }], 0);
    });
  });

  /* ---- Encontre seu traço: estilo -> quem faz e peças daquele estilo ---- */
  var tracoBox = $('#traco-chips');
  if (tracoBox && CFG.tracos) {
    var fotosTodas = todasAsFotos();
    var quem = $('#traco-equipe'), pecas = $('#traco-fotos'), legenda = $('#traco-legenda');
    var escolhe = function (t) {
      Array.prototype.forEach.call(tracoBox.children, function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-t') === t.id ? 'true' : 'false');
      });
      var fazem = CFG.artistas.filter(function (a) { return (a.tracos || []).indexOf(t.id) >= 0; });
      legenda.textContent = t.desc + ' ' + (fazem.length === 1 ? 'Quem faz: 1 artista.' : 'Quem faz: ' + fazem.length + ' artistas.');
      quem.innerHTML = '';
      fazem.forEach(function (a) {
        var c = el('div', 'traco-quem');
        var im = el('img'); im.src = a.foto || LOGO; im.alt = ''; im.loading = 'lazy';
        c.appendChild(im);
        var tx = el('div');
        var nm = el('a', 'traco-nome', a.nome); nm.href = linkPagina(a);
        tx.appendChild(nm);
        tx.appendChild(el('span', null, a.linha));
        c.appendChild(tx);
        var p = el('a', 'btn btn-cheio mini', (a.perfuracao || a.piercer) && t.id === 'piercing' ? 'Agendar piercing' : 'Pedir orçamento');
        p.href = linkAgendar(a); p.setAttribute('data-embarcar', a.slug);
        p.setAttribute('aria-label', 'Pedir orçamento com ' + a.nome);
        c.appendChild(p);
        quem.appendChild(c);
      });
      var sel = fotosTodas.filter(function (f) { return (f.t || []).indexOf(t.id) >= 0; }).slice(0, 8);
      if (t.fotos) sel = t.fotos.concat(sel).slice(0, 8);
      galeria(pecas, sel, true);
    };
    CFG.tracos.forEach(function (t, i) {
      var b = el('button', 'traco-chip', t.nome);
      b.type = 'button'; b.setAttribute('data-t', t.id); b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () { escolhe(t); });
      tracoBox.appendChild(b);
      if (!i) escolhe(t);
    });
  }

  /* ---- botão flutuante some quando o pedido está na tela ---- */
  var flutua = $('.flutua'), agendar = $('#agendar');
  if (flutua) {
    var aVista = {};
    var atualiza = function () {
      flutua.hidden = window.scrollY < window.innerHeight * 0.8 ||
        Object.keys(aVista).some(function (k) { return aVista[k]; });
    };
    if ('IntersectionObserver' in window) {
      var olheiro = new IntersectionObserver(function (es) {
        es.forEach(function (e) { aVista[e.target.id || 'capa'] = e.isIntersecting; });
        atualiza();
      }, { threshold: 0.05 });
      if (agendar) olheiro.observe(agendar);
      if ($('.caminhos')) olheiro.observe($('.caminhos'));
    }
    window.addEventListener('scroll', atualiza, { passive: true });
    atualiza();
  }

  /* ---- mapa (só com endereço confirmado) ---- */
  var mapa = $('#mapa');
  if (mapa && CFG.endereco && CFG.endereco.embed) {
    var ifr = el('iframe');
    ifr.src = CFG.endereco.embed; ifr.loading = 'lazy'; ifr.title = 'Mapa: ' + CFG.endereco.busca;
    ifr.referrerPolicy = 'no-referrer-when-downgrade';
    mapa.appendChild(ifr);
  }

  /* ---- página do artista ---- */
  var pagina = $('#artista-pagina');
  if (!pagina) return;
  var slug = new URLSearchParams(location.search).get('a') || (location.hash.match(/^#\/([\w-]+)/) || [])[1];
  var a = slug && CFG.artistaPor(slug);
  if (!a || a.estudio) {
    $('#art-nao-achei').hidden = false;
    return;
  }
  var temFotos = !!(a.fotos && a.fotos.length);
  document.title = a.nome + ' · ' + CFG.nome;

  var capaImg = $('#art-capa-img');
  if (capaImg) { capaImg.src = a.capa || (temFotos ? a.fotos[0].src : LOGO); capaImg.alt = (a.capa || temFotos) ? 'Trabalho de ' + a.nome : ''; }
  var rosto = $('#art-rosto');
  if (rosto) { rosto.src = a.foto || LOGO; rosto.alt = a.foto ? a.nome : ''; }
  $('#art-oficio').textContent = a.oficio || 'Tatuagem';
  $('#art-nome').textContent = a.nome;
  var arroba = $('#art-arroba');
  arroba.textContent = '@' + a.instagram;
  arroba.href = 'https://www.instagram.com/' + a.instagram + '/';
  $('#art-linha').textContent = a.linha;
  if (a.destaque) { $('#art-destaque').textContent = a.destaque; $('#art-destaque').hidden = false; }
  if (a.frase) { $('#art-frase').textContent = '“' + a.frase + '”'; $('#art-frase').hidden = false; }
  var est = $('#art-estilos');
  (a.estilos || []).forEach(function (e) { est.appendChild(el('span', null, e)); });
  if (a.bio && a.bio.length) {
    var bio = $('#art-bio');
    a.bio.forEach(function (l) { bio.appendChild(el('li', null, l)); });
    $('#art-sobre').hidden = false;
  }

  var rotulo = 'Pedir orçamento com ' + chama(a);
  ['#art-pedir', '#art-pedir-2'].forEach(function (s) {
    var b = $(s); if (!b) return;
    b.textContent = rotulo; b.href = linkAgendar(a); b.setAttribute('data-embarcar', a.slug);
  });
  var fl = $('#art-flutua');
  if (fl) { fl.href = linkAgendar(a); fl.textContent = 'Pedir com ' + chama(a); }

  // contatos: WhatsApp (número ou link curto), links da bio e Direct
  var extras = $('#art-extras');
  function extra(txt, url, cls) {
    var z = el('a', 'btn ' + (cls || 'btn-linha'), txt);
    z.href = url; z.target = '_blank'; z.rel = 'noopener';
    extras.appendChild(z);
  }
  if (a.whatsapp) extra('WhatsApp ' + (a.whatsappVisivel || ''), 'https://wa.me/' + a.whatsapp, 'btn-zap');
  else if (a.zapLink) extra('WhatsApp de ' + chama(a), a.zapLink, 'btn-zap');
  (a.links || []).forEach(function (l) { extra(l.rot, l.url); });
  if (!a.whatsapp && !a.zapLink) extra('Direct @' + arrobaDe(a), 'https://ig.me/m/' + arrobaDe(a));

  $('#art-port-titulo').textContent = 'Portfólio de ' + chama(a);
  var mais = $('#art-mais');
  if (temFotos) {
    galeria($('#art-portfolio'), a.fotos, false);
    mais.href = 'https://www.instagram.com/' + a.instagram + '/';
    mais.textContent = 'Ver mais no @' + a.instagram;
  } else {
    $('#art-portfolio').hidden = true;
    mais.hidden = true;
    var vazio = $('#art-sem-fotos');
    vazio.querySelector('p').textContent = 'As peças de ' + chama(a) + ' entram aqui em breve. Enquanto isso, veja o Instagram.';
    vazio.hidden = false;
  }

  var outros = $('#lista-outros');
  var resto = pessoas().filter(function (o) { return o.slug !== a.slug; });
  if (outros && resto.length) resto.forEach(function (o) { outros.appendChild(card(o)); });
  else if ($('#art-outros')) $('#art-outros').hidden = true;

  var comp = $('#art-compartilhar'), saida = $('#art-compartilhado');
  comp.addEventListener('click', function () {
    var url = location.origin + location.pathname + '?a=' + a.slug;
    if (navigator.share) {
      navigator.share({ title: a.nome + ' · ' + CFG.nome, url: url }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () { saida.textContent = 'Link copiado.'; },
        function () { saida.textContent = url; });
    } else { saida.textContent = url; }
  });
  pagina.hidden = false;
})();
