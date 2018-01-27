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

let movies = {};
let notes = {
    data:[]
};
    
let updateList = function() {
    console.log('[Application Start to Watch]')
    Object.observe(movies, function (changes) {
        let attr = changes[FIRST_INDEX].name;

        if (changes[FIRST_INDEX].type === 'add') {
            console.log('Uma imagem foi adicionada pela primeira vez');
        } 

        if (changes[FIRST_INDEX].type === 'update' && changes[FIRST_INDEX].oldValue.src !== eval('movies.'+attr+'.src')) {
            console.log('O filme foi alterado');
        }
    });
}

function getCurrentDate () {
    var d = new Date;
    return d.toLocaleString('pt-BR');
}

updateList();

document.addEventListener('DOMContentLoaded', function(event) {
    console.log('[Application Started]');
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