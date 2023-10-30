import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let hracNaTahu = 'circle';

const oznacPolicko = async (event) => {
  if (hracNaTahu == 'circle') {
    event.target.classList.add('mrizka__pole--kolecko');
    document.querySelector('#hraje__img').src = 'img/cross.svg';
    hracNaTahu = 'cross';
    event.target.disabled = true;

    vsechnaPolicka.forEach((policko) => {
      policko.disabled = true;
    });

    if (vyhodnot()) {
      let herniPole = generujPole();

      const response = await fetch(
        'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            board: herniPole,
            player: 'x',
          }),
        },
      );
      const data = await response.json();
      const { x, y } = data.position;
      const index = vsechnaPolicka[x + y * 10];
      vsechnaPolicka.forEach((policko) => {
        if (
          !(
            policko.classList.contains('mrizka__pole--kolecko') ||
            policko.classList.contains('mrizka__pole--kolecko')
          )
        ) {
          policko.disabled = false;
        }
      });
      index.click();
    }
  } else if (hracNaTahu == 'cross') {
    event.target.classList.add('mrizka__pole--krizek');
    document.querySelector('#hraje__img').src = 'img/circle.svg';
    hracNaTahu = 'circle';
    event.target.disabled = true;
    vyhodnot();
  }
};

const vsechnaPolicka = document.querySelectorAll('.btn');
vsechnaPolicka.forEach((policko) => {
  policko.addEventListener('click', oznacPolicko);
});

const generujPole = () => {
  let herniPole = [];
  vsechnaPolicka.forEach((policko) => {
    if (policko.classList.contains('mrizka__pole--kolecko')) {
      herniPole.push('o');
    } else if (policko.classList.contains('mrizka__pole--krizek')) {
      herniPole.push('x');
    } else {
      herniPole.push('_');
    }
  });
  return herniPole;
};

const vyhodnot = () => {
  let herniPole = generujPole();

  const vitez = findWinner(herniPole);

  if (vitez === 'o' || vitez === 'x') {
    setTimeout(() => {
      alert(`Vyhrál hráč se symbolem ${vitez}.`);
    }, 1000);
    setTimeout(() => {
      location.reload();
    }, 2000);
    return false;
  }

  if (vitez === 'tie') {
    setTimeout(() => {
      alert(`Hra skončila remizou.`);
    }, 1000);
    setTimeout(() => {
      location.reload();
    }, 2000);
    return false;
  }
  return true;
};

const zeptejSe = (event) => {
  const potvrzeni = confirm('Opravdu chceš začít znovu?');
  if (potvrzeni != true) {
    event.preventDefault();
  }
};

document.querySelector('.btn__restart').addEventListener('click', zeptejSe);
