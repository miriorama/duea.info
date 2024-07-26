var CUCUNA = (function(){
    let cucuna = {
        player: null,
        currentTrack: null,
        trackList:{
            'cucuna': {id:'cucuna',title:'Cucunà', lato:'A'},
            'bardo': {id:'bardo',title:'Bardo', lato:'A'},
            'mazurka': {id:'mazurka',title:'Mazurka J. Da Rous', lato:'A'},
            'la-marcia-di-biule': {id:'la-marcia-di-biule',title:'La marcha di bioule', lato:'A'},
            'bobo': {id:'bobo',title:'Bobò', lato:'A'},
            'margot': {id:'margot',title:'Margot', lato:'B'},
            'rigolet': {id:'rigolet',title:'Rigolet', lato:'B'},
            'espirit-libre': {id:'espirit-libre',title:'Esprit libre', lato:'B'},
            'aura': {id:'aura',title:'Aura', lato:'B'},
            'bobo-remix': {id:'bobo-remix',title:'Bobò - Madaski Remix', lato:'B'},

        }
    };
    let player = null;


    cucuna.init = function(){
        cucuna.player = document.querySelector('#audio');
        //cucuna.play('cucuna');
    }

    cucuna.loadedMetadata = function(){
        let $playerDuration = document.querySelector('.player-duration');
        $playerDuration.innerHTML = UTIL.convertTime(cucuna.player.duration);

        let $playerTitle = document.querySelector('.player-title');
        let currentTrack = document.querySelector('.player-title');
        $playerTitle.innerHTML = 'Lato ' + cucuna.currentTrack.lato + ' - ' + cucuna.currentTrack.title;

        let $playerCurrentTime = document.querySelector('.player-current-time');
        $playerCurrentTime.innerHTML = UTIL.convertTime(cucuna.player.currentTime);
    }

    cucuna.timeUpdate = function(){
        let $playerCurrentTime = document.querySelector('.player-current-time');
        $playerCurrentTime.innerHTML = UTIL.convertTime(cucuna.player.currentTime);
    }

    cucuna.play = function(track){
        track = (!track && !cucuna.currentTrack ? 'cucuna': track);

        if(track){
            cucuna.player.src = '../data/cucuna/' + track + '.mp3';
            cucuna.player.load();

            cucuna.currentTrack = cucuna.trackList[track];

            let $playerTitle = document.querySelector('.player-title');
            $playerTitle.innerHTML = 'Caricamento…';
        }

        let $cucunaTrackCurrent = document.querySelector('.cucuna-track.current');
        if($cucunaTrackCurrent){
            $cucunaTrackCurrent.classList.remove('current');
        }

        let $current = document.querySelector('.cucuna-track[data-track="' + track || cucuna.currentTrack.id + '"]');
        if($current){
            $current.classList.add('current');
        }

        cucuna.player.play().then(response => {
            let $playerPlay = document.querySelector('.player-play');
            let $playerPause = document.querySelector('.player-pause');
            let $label = document.querySelector('.label');
            let $labelImg = document.querySelector('.label img');
            $playerPlay.setAttribute('hidden','');
            $playerPause.removeAttribute('hidden');

            $labelImg.src = '../img/lato-' + cucuna.currentTrack.lato + '.png';
            $label.style.animationPlayState = 'running';
        }).catch(e => {
            console.log(e);
        });;
    }

    cucuna.pause = function(){
        cucuna.player.pause();
        let $playerPlay = document.querySelector('.player-play');
        let $playerPause = document.querySelector('.player-pause');
        let $label = document.querySelector('.label');
        $playerPause.setAttribute('hidden','');
        $playerPlay.removeAttribute('hidden');
        $label.style.animationPlayState = 'paused';
    }

    return cucuna;
})();
CUCUNA.init();

document.addEventListener('DOMContentLoaded', function() {
  });

var UTIL = (function(){
    let util = {};

    util.scrollTo = function(cssSelector,offset){
        offset = offset || 0;
        element = document.querySelector(cssSelector);
        window.scrollTo(0,(element.offsetTop - offset));
    }

    util.convertTime = function(time){
        let mins = Math.floor(time / 60);
        if (mins < 10) {
            mins = '0' + String(mins);
        }
        let secs = Math.floor(time % 60);
        if (secs < 10) {
            secs = '0' + String(secs);
        }

        return mins + ':' + secs;
    }

    return util;
})();