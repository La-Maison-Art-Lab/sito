(function () {
  var bottone = document.querySelector('.apri-menu');
  var menu = document.getElementById('menu');
  if (bottone && menu) {
    bottone.addEventListener('click', function () {
      var aperto = menu.classList.toggle('aperto');
      bottone.setAttribute('aria-expanded', aperto ? 'true' : 'false');
    });
  }

  var modulo = document.getElementById('modulo-prova');
  if (!modulo) return;
  var esito = document.getElementById('esito');
  modulo.addEventListener('submit', function (e) {
    e.preventDefault();
    esito.className = 'esito';
    esito.textContent = '';
    var invio = modulo.querySelector('button[type="submit"]');
    invio.disabled = true;
    invio.textContent = 'Invio in corso…';
    var dati = new FormData(modulo);
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: dati
    })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j && j.success) {
          esito.className = 'esito ok';
          esito.textContent = 'Fatto. Ti ricontattiamo entro due giorni per fissare la lezione di prova. Se hai fretta, scrivici su WhatsApp.';
          modulo.reset();
        } else { throw new Error('invio non riuscito'); }
      })
      .catch(function () {
        esito.className = 'esito errore';
        esito.textContent = 'Il messaggio non è partito. Riprova tra poco oppure scrivici su WhatsApp al 351 686 1837.';
      })
      .then(function () {
        invio.disabled = false;
        invio.textContent = 'Prenota la prova';
        esito.focus();
      });
  });
})();
