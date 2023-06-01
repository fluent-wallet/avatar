import { generateAvatarURL, generateAvatarPNG, generateAvatarSVG, generateAvatarHTML } from '../src/index';

const icon = generateAvatarSVG('0x368d31aeB0aBc22E4a020B1ceba386089fc3aCc6');

document.getElementById('app')?.appendChild(icon);

// circle icon
const img = document.createElement('img');
img.src = generateAvatarURL('0x368d31aeB0aBc22E4a020B1ceba386089fc3aCc6');
const circle = document.createElement('div');
circle.className = 'circle';
circle.appendChild(img);
document.getElementById('app')?.appendChild(circle);

// another circle icon
const img1 = document.createElement('img');
img1.src = generateAvatarPNG('0x368d31aeB0aBc22E4a020B1ceba386089fc3aCc6', 10);
img1.style.width = '100%';
const circle1 = document.createElement('div');
circle1.className = 'circle';
circle1.appendChild(img1);
document.getElementById('app')?.appendChild(circle1);

// svg html
document.getElementById('app')?.insertAdjacentHTML('afterend', generateAvatarHTML('0x368d31aeB0aBc22E4a020B1ceba386089fc3aCc6'));
