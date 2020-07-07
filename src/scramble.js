// required module to generate scrambles;
import * as SRScrambler from 'sr-scrambler';

// query selectors
const scrambleDisplay = document.querySelector('[data-scramble-display]');


// function to update scramble
export function updateScrambleDisplay() {
  scrambleDisplay.innerText = SRScrambler.generateHtmlScramble(3, 30);
}

scrambleDisplay.addEventListener('click', function(e){
  e.stopPropagation();
  updateScrambleDisplay();
})


updateScrambleDisplay();


