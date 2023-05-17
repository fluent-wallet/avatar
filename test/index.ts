import { generateAvatarURL, generateAvatarSVG, generateAvatarHTML } from '../src/index';

const icon = generateAvatarSVG('0x368d31aeB0aBc22E4a020B1ceba386089fc3aCc6');

const img = document.createElement('img');

img.src = generateAvatarURL('0x368d31aeB0aBc22E4a020B1ceba386089fc3aCc6');

document.getElementById('app')?.appendChild(icon);
document.getElementById('app')?.appendChild(img);
document.getElementById('app')?.insertAdjacentHTML('afterend', generateAvatarHTML('0x368d31aeB0aBc22E4a020B1ceba386089fc3aCc6'));
