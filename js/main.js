var DUEA = (function(){
    let duea = {};
    let player = null;

    duea.init = function(){
        player = new Audio('data/duea.mp3');

        //DUEA.initCursor();
    }

    duea.initCursor = function(){
        const cursor = document.querySelector('.cursor');

        document.addEventListener('mousemove', e => {
            requestAnimationFrame(function() {
                cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;");
              });
        })

        document.addEventListener('click', () => {
            cursor.classList.add("expand");

            setTimeout(() => {
                cursor.classList.remove("expand");
            }, 500)
        })

        // set the starting position of the cursor outside of the screen
        //t clientX = -100;
        //t clientY = -100;
        //nst innerCursor = document.querySelector(".cursor");

        //// add listener to track the current mouse position
        //document.addEventListener("mousemove", e => {
        //  clientX = e.clientX;
        //  clientY = e.clientY;
        //});
        //
        //// transform the innerCursor to the current mouse position
        //// use requestAnimationFrame() for smooth performance
        //const render = () => {
        //  innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
        //  // if you are already using TweenMax in your project, you might as well
        //  // use TweenMax.set() instead
        //  // TweenMax.set(innerCursor, {
        //  //   x: clientX,
        //  //   y: clientY
        //  // });
        //
        //  requestAnimationFrame(render);
        //};
        //requestAnimationFrame(render);


        //// add event listeners to all items
        const linkItems = document.querySelectorAll(".box-img");
        linkItems.forEach(item => {
          item.addEventListener("mouseenter", function() {
              cursor.classList.add('cursor-img');
          });
          item.addEventListener("mouseleave", function() {
              cursor.classList.remove('cursor-img');
          });


        });

        document.querySelector(".btn-campagna").addEventListener("mouseenter", function() {
            cursor.classList.add('cursor-campagna');
        });
        document.querySelector(".btn-campagna").addEventListener("mouseleave", function() {
            cursor.classList.remove('cursor-campagna');
        });
    }

    duea.play = function(){
        player.play();
        let $playerPlay = document.querySelector('.player-play');
        let $playerPause = document.querySelector('.player-pause');
        $playerPlay.setAttribute('hidden','');
        $playerPause.removeAttribute('hidden');
    }

    duea.pause = function(){
        player.pause();
        let $playerPlay = document.querySelector('.player-play');
        let $playerPause = document.querySelector('.player-pause');
        $playerPause.setAttribute('hidden','');
        $playerPlay.removeAttribute('hidden');
    }

    return duea;
})();
DUEA.init();

document.addEventListener('DOMContentLoaded', function() {
    let parallaxList = document.querySelectorAll('.parallax');
    let diff=0;

    window.addEventListener('scroll', function() {
      parallaxList.forEach(function($parallax) {
        var viewportOffset = $parallax.getBoundingClientRect();
        if(viewportOffset.top < window.innerHeight){
            diff = 50 + UTIL.mapRange((viewportOffset.top *100 /window.innerHeight), 0, 100, -20, 20);
        }
        $parallax.style.backgroundPosition = '50% ' + diff + '%';
      });
    });
  });

  var UTIL = (function(){
    let util = {};

    util.mapRange = function(value, minSource, maxSource, minTarget, maxTarget){
        // Normalizza il valore di input nel range di origine
        const normalizedValue = (value - minSource) / (maxSource - minSource);

        // Mappa il valore normalizzato nel range di destinazione
        const mappedValue = (normalizedValue * (maxTarget - minTarget)) + minTarget;

        // Restituisci il valore mappato
        return mappedValue;
    }

    util.scrollTo = function(cssSelector,offset){
        offset = offset || 0;
        element = document.querySelector(cssSelector);
        window.scrollTo(0,(element.offsetTop - offset));
    }

    return util;
  })();

  //$(".intro-img").ripples({
  //  resolution: 256,
  //  perturbance: 0.005,
  //  dropRadius: 20,
  //});

  var options = {
    resolution: 256,
    perturbance: 0.005,
    dropRadius: 20,
  };
  options = Object.assign({}, Ripples.DEFAULTS, options);
  let ripple = new Ripples(document.querySelector('.intro-img'),options);

  window.onresize = function(){ location.reload(); }