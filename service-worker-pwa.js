let cacheName = 'oscar_pwa_1.0.3';
let filesToCache = [
    './',
    'index.html',
    'movie.html',
    'actor.html',
    'actress.html',
    'actor_supporting.html',
    'actress_supporting.html',
    'animated.html',
    'cinematography.html',
    'costume.html',
    'directing.html',
    'documentary_long.html',
    'documentary_short.html',
    'editing.html',
    'foreign.html',
    'makeup.html',
    'soundtrack.html',
    'song.html',
    'production.html',
    'short_film_animated.html',
    'short_film_live_action.html',
    'sound_editing.html',
    'sound_mixing.html',
    'visual_effects.html',
    'writing_adapted.html',
    'writing_original.html',

    'imgs/movies/abacus_small_enough_to_jail.jpg',
    'imgs/movies/all_the_money_in_the_world.jpg',
    'imgs/movies/baby_driver.jpg',
    'imgs/movies/beauty_and_the_beast.jpg',
    'imgs/movies/blade_runner_2049.jpg',
    'imgs/movies/call_me_by_your_name.jpg',
    'imgs/movies/coco.jpg',
    'imgs/movies/darkest_hour.jpg',
    'imgs/movies/dear_basketball.jpg',
    'imgs/movies/dekalb_elementary.jpg',
    'imgs/movies/dunkirk.jpg',
    'imgs/movies/edith_eddie.jpg',
    'imgs/movies/faces_places.jpg',
    'imgs/movies/ferdinand.jpg',
    'imgs/movies/garden_party.jpg',
    'imgs/movies/gardian_of_the_galaxy_vol_2.jpg',
    'imgs/movies/get_out.jpg',
    'imgs/movies/heaven_is_a_traffic_jam_on_the_405.jpg',
    'imgs/movies/heroine.jpg',
    'imgs/movies/i_tonya.jpg',
    'imgs/movies/icarus.jpg',
    'imgs/movies/kakayo.jpg',
    'imgs/movies/knife_skills.jpg',
    'imgs/movies/kong_skull_island.jpg',
    'imgs/movies/lady_bird.jpg',
    'imgs/movies/last_men_in_aleppo.jpg',
    'imgs/movies/logan.jpg',
    'imgs/movies/lou.jpg',
    'imgs/movies/loveless.jpg',
    'imgs/movies/loving_vicent.jpg',
    'imgs/movies/marshall.jpg',
    'imgs/movies/mollys_game.jpg',
    'imgs/movies/mudbound.jpg',
    'imgs/movies/my_nephew_emmett.jpg',
    'imgs/movies/negative_space.jpg',
    'imgs/movies/on_body_and_soul.jpg',
    'imgs/movies/phatom_thread.jpg',
    'imgs/movies/revolting_rhymes.jpg',
    'imgs/movies/roman_j_israel_esq.jpg',
    'imgs/movies/star_wars_the_last_jedi.jpg',
    'imgs/movies/strong_island.jpg',
    'imgs/movies/the_baby_boss.jpg',
    'imgs/movies/the_big_sick.jpg',
    'imgs/movies/the_breadwinner.jpg',
    'imgs/movies/the_disaster_artist.jpg',
    'imgs/movies/the_eleven_o_clock.jpg',
    'imgs/movies/the_florid_project.jpg',
    'imgs/movies/the_greatest_showman.jpg',
    'imgs/movies/the_insult.jpg',
    'imgs/movies/the_post.jpg',
    'imgs/movies/the_shape_of_water.jpg',
    'imgs/movies/the_silent_child.jpg',
    'imgs/movies/the_square.jpg',
    'imgs/movies/three_billboards_outside_ebbing_missouri.jpg',
    'imgs/movies/traffic_stop.jpg',
    'imgs/movies/una_mujer_fantastica.jpg',
    'imgs/movies/victoria_and_abdul.jpg',
    'imgs/movies/war_for_the_planet_of_the_apes.jpg',
    'imgs/movies/wato_wote.jpg',
    'imgs/movies/wonder.jpg',

    'imgs/person/allison_janney.jpg',
    'imgs/person/christopher_plummer.jpg',
    'imgs/person/daniel_day_lewis.jpg',
    'imgs/person/daniel_kaluuya.jpg',
    'imgs/person/denzel_washington.jpg',
    'imgs/person/frances_mcdormand.jpg',
    'imgs/person/gary_oldman.jpg',
    'imgs/person/laurie_metcalf .jpg',
    'imgs/person/lesley_manville.jpg',
    'imgs/person/margot_robbie.jpg',
    'imgs/person/mary_j_blige .jpg',
    'imgs/person/meryl_streep.jpg',
    'imgs/person/octavia_spencer.jpg',
    'imgs/person/richard_jenkins.jpg',
    'imgs/person/sally_hawkins.jpg',
    'imgs/person/sam_rockwell.jpg',
    'imgs/person/saoirse_ronan.jpg',
    'imgs/person/timothee_chalamet.jpg',
    'imgs/person/willem_dafoe.jpg',
    'imgs/person/woody_harrelson.jpg',

    'vendor/bootstrap/css/bootstrap.min.css',
    'vendor/font-awesome/css/font-awesome.min.css',
    'css/sb-admin.min.css',
    'css/oscar.css',

    'vendor/jquery/jquery.min.js',
    'vendor/bootstrap/js/bootstrap.bundle.min.js',
    'vendor/jquery-easing/jquery.easing.min.js',
    'js/sb-admin.min.js',
    'js/object.observe.polyfill.js',
    'js/array.observe.polyfill.js',
    'js/oscar.js'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Installer');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        }).catch(function (error){
            console.warn('ERROR!',error);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});

