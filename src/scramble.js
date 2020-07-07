// required module to generate scrambles;
import * as SRScrambler from 'sr-scrambler';

// query selectors
export const scrambleDisplay = document.querySelector('[data-scramble-display]');

export let currentScramble;
// function to update scramble

export function updateScrambleDisplay() {
  currentScramble = SRScrambler.generateHtmlScramble(3, 30)
  scrambleDisplay.innerText = currentScramble;
}

scrambleDisplay.addEventListener('click', function(e){
  e.stopPropagation();
  updateScrambleDisplay();
})


updateScrambleDisplay();


