document.addEventListener('DOMContentLoaded', () => {
    const linkGanharDinheiro = document.getElementById('linkGanharDinheiro');
    const body = document.body;
    const somPopup = document.getElementById('somPopup');
    const popupInicial = document.getElementById('popupInicial');
    let contadorPopups = 0;
    const maxPopups = 15;
    const intervaloPopups = 1200;
    const caminhoImagemPopup = './img/lost.png'; 
    const musicaDeFundo = document.getElementById('musicaDeFundo');

            // Tocar a música de fundo
            function tocarMusicaDeFundo() {
                musicaDeFundo.play().catch(error => {
                    console.error("Erro ao tocar música de fundo:", error);
                    // Tentar novamente após a interação do usuário
                    document.addEventListener('click', tocarMusicaDeFundoAposInteracao, { once: true });
                });
            }

            function tocarMusicaDeFundoAposInteracao() {
                musicaDeFundo.play().catch(error => {
                    console.error("Erro ao tentar tocar a música após interação:", error);
                });
            }

            musicaDeFundo.volume = 0.3;
            // Tentar tocar a música de fundo
            tocarMusicaDeFundo()


    linkGanharDinheiro.addEventListener('click', () => {
    //    popupInicial.style.display = 'none'; // Esconde o pop-up inicial ao clicar
    musicaDeFundo.pause();
        iniciarGeracaoPopups();
    });

    function iniciarGeracaoPopups() {
        const intervalo = setInterval(() => {
            if (contadorPopups < maxPopups) {
                criarPopup(`VIRUS DO MAL!`, gerarMensagemAleatoria(), caminhoImagemPopup);
                tocarSom();
                contadorPopups++;
            } else {
                clearInterval(intervalo); 
            }
        }, intervaloPopups);
    }

    function criarPopup(titulo, mensagem, caminhoImagem) {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.style.width = '280px';
        popup.innerHTML = `
            <div class="popup-titlebar">${titulo} <span style="float: right; cursor: pointer;">[X]</span></div>
            <div class="popup-content">
                <img src="${caminhoImagem}" alt="Ícone do Popup" class="popup-icon">
                <p>${mensagem}</p>
            </div>
        `;
    
        const larguraJanela = window.innerWidth;
        const alturaJanela = window.innerHeight;
        const larguraPopup = 280;
        const alturaPopup = 120;
    
        const x = Math.random() * (larguraJanela - larguraPopup);
        const y = Math.random() * (alturaJanela - alturaPopup);
    
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
    
        const botaoFechar = popup.querySelector('.popup-titlebar span');
        botaoFechar.addEventListener('click', () => {
            for (let i = 0; i < 5; i++) { 
                criarPopup(`VIRUS DO MAL!`, gerarMensagemAleatoria(), caminhoImagemPopup);
                tocarSom();
                contadorPopups++;
                
            }
            popup.remove();
        });
    
    
        body.appendChild(popup);
    }

    function gerarMensagemAleatoria() {
        const mensagens = [
            "MUEHEHE"
        ];
        return mensagens[Math.floor(Math.random() * mensagens.length)];
    }

    function tocarSom() {
        somPopup.currentTime = 0; 
        somPopup.play();
    }
});