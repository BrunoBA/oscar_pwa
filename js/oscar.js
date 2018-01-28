const FIRST_INDEX = 0;
const CATEGORIES_AVAILABLE = [
        'movie', 
        'actor', 
        'actress', 
        'actor_supporting', 
        'actress_supporting', 
        'animated', 
        'cinematography', 
        'costume', 
        'directing', 
        'documentary_long', 
        'documentary_short', 
        'editing', 
        'foreign', 
        'makeup', 
        'soundtrack', 
        'song', 
        'production', 
        'short_film_animated', 
        'short_film_live_action', 
        'sound_editing', 
        'sound_mixing',
        'visual_effects',
        'writing_adapted',
        'writing_original', 
    ];

let movies = window.localStorage.getItem('movies') || '{}';
movies = JSON.parse(movies);
    
let updateList = function() {
    console.log('[Application] Start to Watch')
    Array.observe(movies, function (changes) {
        let attr = changes[FIRST_INDEX].name;

        if (changes[FIRST_INDEX].type === 'add') {
            console.log('Uma imagem foi adicionada pela primeira vez');
        } 

        if (changes[FIRST_INDEX].type === 'update' && changes[FIRST_INDEX].oldValue.src !== eval('movies.'+attr+'.src')) {
            console.log('O filme foi alterado');
        }
        window.localStorage.setItem('movies', JSON.stringify(movies));
    });
}

function getCurrentDate () {
    var d = new Date;
    return d.toLocaleString('pt-BR');
}

function valuesToArray(obj) {
  return Object.keys(obj).map(function (key) { return obj[key]; });
}

//Atualiza a página de categorias atomaticamente
function refreshPage () {
    let arrayOfCategories = valuesToArray(movies);
    let count = arrayOfCategories.length;
    
    if (count > 0) {
        for (let i = 0; i < count; i++) {
            let category = arrayOfCategories[i].category;
            let sameClass = document.getElementsByClassName(arrayOfCategories[i].category);
            let quantity = sameClass.length;

            for (let j = 0; j < quantity; j++) {
                if (sameClass[j].getAttribute('src') == eval('movies.'+category+'.src')) {
                    sameClass[j].style.border = 'solid 5px #dec933';
                }
            }
        }
    }
}

updateList();

document.addEventListener('DOMContentLoaded', function(event) {
    console.log('[Application] Started');
    refreshPage();
});

document.addEventListener('click', function(event){
    let currentClass = event.target.getAttribute('class');

    if (CATEGORIES_AVAILABLE.indexOf(currentClass) >= 0) {
        let elements = event.target.parentElement.children;
        let image = elements[0].getAttribute('src');
        let legend = elements[1].textContent;
        let subLegend = elements[2].textContent;   
        let category = event.target.parentElement.parentElement.getAttribute('id');
        let dateTime = getCurrentDate();

        let sameClass = document.getElementsByClassName(currentClass);
        let count = sameClass.length;

        for (let i = 0; i < count; i++) {
            if (sameClass[i] != elements[0]) {
                sameClass[i].style.border = '';
            } else {
                elements[0].style.border = 'solid 5px #dec933';    
            }
        }

        //Pode ser colocado um confirm aqui
        eval('movies.'+category+' = { src: image, legend: legend, subLegend: subLegend, category: category, date: dateTime };');
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('./service-worker-pwa.js')
    .then(function(reg){
        console.log('[ServiceWorker] is Registered ');
    })
    .catch(function(err){
        console.log('ERROR', err);
        console.warn('Erro no registro de service worker');
    });
}
