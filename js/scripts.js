/* moje rucno kreiranje brda pitanja*/
var ask, a1, a2, a3, a4;
var skupPitanja = [];
var poeni = 0; 

ask = postaviPitanje("Koji je glavni grad Španije?");
a1 = postaviOdgovor("Madrid","true");
a2 = postaviOdgovor("London","false");
a3 = postaviOdgovor("Beč","false");
a4 = postaviOdgovor("Pariz","false");
kreirajPitanje(ask, a1, a2, a3, a4);


ask = postaviPitanje("Koji je najveći okean na svetu?");
a1 = postaviOdgovor("Indijski","false");
a2 = postaviOdgovor("Atlanski","false");
a3 = postaviOdgovor("Tihi","true");
a4 = postaviOdgovor("Severni ledeni","false");
kreirajPitanje(ask, a1, a2, a3, a4);


ask = postaviPitanje("Koja je najčešća krvna grupa u svetu?");
a1 = postaviOdgovor("AB","false");
a2 = postaviOdgovor("Nulta","true");
a3 = postaviOdgovor("A","false");
a4 = postaviOdgovor("B","false");
kreirajPitanje(ask, a1, a2, a3, a4);


ask = postaviPitanje("Koja zemlja je pobedila na prvom održanom Svetskom prvenstvu u fudbalu?");
a1 = postaviOdgovor("Nemačka","false");
a2 = postaviOdgovor("Brazil","false");
a3 = postaviOdgovor("Srbija","false");
a4 = postaviOdgovor("Urugvaj","true");
kreirajPitanje(ask, a1, a2, a3, a4);


ask = postaviPitanje("Koliko kostiju ukupno ima ljudsko telo?");
a1 = postaviOdgovor("206","true");
a2 = postaviOdgovor("300","false");
a3 = postaviOdgovor("152","false");
a4 = postaviOdgovor("256","false");
kreirajPitanje(ask, a1, a2, a3, a4);


console.log(skupPitanja);

let startGame = document.getElementById('startGame');

let reset = document.getElementById('reset');

let start = document.getElementById('start');
let game = document.getElementById('game');

let h2 = document.getElementById('pitanje');
let h1 = document.getElementById('naslov');

/* pocni igru */

var brojPitanja = skupPitanja.length; //max poena
startGame.addEventListener('click', function() {
    start.classList.add('hidden');
    h1.classList.add('hidden');

    game.classList.remove('hidden');
    h2.classList.remove('hidden');
    reset.classList.remove('hidden');

    shuffle(skupPitanja);
    predstaviPtanje();
});


reset.addEventListener('click', function() {
    window.location.reload("false");
});


//pitanje --- string pitanja 
function postaviPitanje(pitanje) {
    var question = {};
    question.pitanje = pitanje;
    question.odgovori = [];
    return question;
}

// kreirajOdgovor(strring odgovora , vrednosti "true" ili "false" )
function postaviOdgovor(odgovor,tacnost) {
    var answer = {};
    answer.odgovor = odgovor;
    answer.tacnost = tacnost;
    return answer;
}

/*
ask - postaviPitanje("sting?")
a1, a2, a3, a4 - postaviOdgovor("sting","true"/"false")

*/

function kreirajPitanje(ask, a1, a2, a3, a4) {
    ask.odgovori.push(a1);
    ask.odgovori.push(a2);
    ask.odgovori.push(a3);
    ask.odgovori.push(a4);
    skupPitanja.push(ask);

}

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

console.log(skupPitanja[0]); //obj question
/* prvo ispod mi treba */
console.log(skupPitanja[0].pitanje); //question.pitanje

console.log(skupPitanja[0].odgovori);//question.odgovori tj. skup answera
console.log(skupPitanja[0].odgovori[0]); //answer


/* ovo dole mi treba */
console.log(skupPitanja[0].odgovori[0].odgovor); //answer.odgovor
console.log(skupPitanja[0].odgovori[0].tacnost); //answer.tacnost

var pitanjaDiv =  document.getElementById('pitanja');

function predstaviPtanje() {
    
    h2.innerHTML = skupPitanja[0].pitanje;

    for (let i = 0; i < skupPitanja[0].odgovori.length; i++) {
        pitanjaDiv.innerHTML+='<label class="container" onclick="checked('+i+')"><span id="odg'+i+'">'+skupPitanja[0].odgovori[i].odgovor+'</span><input type="radio" id="answer'+i+'" name="answer" class="answer" value="'+i+'"><span class="checkmark"></span></label>';
    }

}


let dalje = document.getElementById('dalje');
let end = document.getElementById('end');

var poens = document.getElementById('poeni');
var broj = 5;
dalje.disabled = true;


function checked(x) {
    broj = x;
    dalje.disabled = false;
}

function proveraTacnosti() {
    var odabranOdgovor = document.getElementById('odg'+broj).innerHTML;
    var objOdgovor = skupPitanja[0].odgovori[broj].odgovor;
    var tacnostOdgovora =skupPitanja[0].odgovori[broj].tacnost;

    if(odabranOdgovor === objOdgovor && tacnostOdgovora === "true") {
        poeni += 1;
    } else {
        poeni -= 1;
    }

    poens.innerHTML = poeni;

    broj = 5;
}


dalje.addEventListener('click', function(){
    proveraTacnosti();
    pitanjaDiv.innerHTML = "";
    skupPitanja.shift();

    if(skupPitanja.length>0) {
        predstaviPtanje();
    } else {
        game.classList.add('hidden');
        h2.innerHTML = "K R A J ";
        poens.innerHTML = poeni + " / " + brojPitanja;
        end.classList.remove('hidden');

    }
});