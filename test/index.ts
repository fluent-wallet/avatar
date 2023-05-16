import generateIdentIcon from '../src/index';

const icon = generateIdentIcon('0x368d31aeB0aBc22E4a020B1ceba386089fc3aCc6');

document.getElementById('app')?.appendChild(icon);
document.getElementById('app')?.appendChild(generateIdentIcon('0x368d31aeB0aBc22E4a020B1ceba386089fc3aCc6'));
