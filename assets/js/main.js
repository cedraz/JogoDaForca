inicio = document.querySelector('.inicio');

palavra = document.querySelector('.palavra-input');
dica = document.querySelector('.dica-input');

confirmar = document.querySelector('.botao-confirma');

chute = document.querySelector('.chute-input');
confirmarChute = document.querySelector('.botao-chute');

criarPalavra = document.querySelector('.formar-palavra');
letras = document.querySelector('.letras');
contador = document.querySelector('.contador');

let vidas = 6;

function criarJogo() {
    for (let i = 0; i < palavra.value.length; i++) {
        letras.innerHTML += '_'
    }
    inicio.innerHTML = `dica: ${dica.value}`
    contador.innerHTML = `${vidas} vidas`

    criarPalavra.style.display = 'flex'
    chute.style.display = 'flex'
    confirmarChute.style.display = 'block'

};

function checkChar(e) {
    const char = String.fromCharCode(e.keyCode);
    const pattern = '[0-9A-Z,.`´~{}:;/|"!@#$%¨&*()]'
    let caracteres = char.match(pattern)

    if (caracteres) {
        e.preventDefault();
    }
}

document.addEventListener('keypress', (e) => {
    checkChar(e)
})

function modificar(word, index, replacement) {
    let chars = word.split('');
    chars[index] = replacement;
    return chars.join('');
}

function formarPalavra() {
    chute.innerHTML = ''
    if (palavra.value == chute.value) {

        alert('Você acertou a palavra')
        window.location.reload()

    } else if (palavra.value.includes(chute.value) && chute.value.length == 1) {
        
        let indices = []
        for (const i in palavra.value) {
            if (chute.value == palavra.value[i]) {
                indices.push(i)
            }
        }   

        for (const indice of indices) {
            letras.innerHTML = modificar(letras.innerHTML, indice, chute.value)

            if (letras.innerHTML === palavra.value) {
                alert('Você acertou a palavra')
                window.location.reload()
            }
        }

    } else {
        vidas += -1
        contador.innerHTML = `${vidas} vidas`

        if (vidas == 0) {
            alert(`Você perdeu, a palavra era: ${palavra.value}`)
            window.location.reload()
        }
    }
}

document.addEventListener('click', (e) => {
    if (e.target === confirmar ) {
        criarJogo();
    }

    if (e.target === confirmarChute) {
        formarPalavra();
        chute.value = ''
    }
});

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && (e.target === palavra || e.target === dica)) {
        criarJogo();
    }

    if (e.key === 'Enter' && e.target === chute) {
        formarPalavra();
        chute.value = ''
    }
});