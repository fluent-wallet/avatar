import MersenneTwister from 'mersenne-twister';

const colors = [
    '#01888C', // teal
    '#FC7500', // bright orange
    '#034F5D', // dark teal
    '#F73F01', // orangered
    '#FC1960', // magenta
    '#C7144C', // raspberry
    '#F3C100', // goldenrod
    '#1598F2', // lightning blue
    '#2465E1', // sail blue
    '#F19E02', // gold
];

const shapeCount = 4;
const svgNamespaceURI = 'http://www.w3.org/2000/svg';

interface HSLType {
    h: number;
    s: number;
    l: number;
}

function HSLToHex(hsl: HSLType) {
    let { h, s, l } = hsl;
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        _r = 0,
        _g = 0,
        _b = 0;

    if (0 <= h && h < 60) {
        _r = c;
        _g = x;
        _b = 0;
    } else if (60 <= h && h < 120) {
        _r = x;
        _g = c;
        _b = 0;
    } else if (120 <= h && h < 180) {
        _r = 0;
        _g = c;
        _b = x;
    } else if (180 <= h && h < 240) {
        _r = 0;
        _g = x;
        _b = c;
    } else if (240 <= h && h < 300) {
        _r = x;
        _g = 0;
        _b = c;
    } else if (300 <= h && h < 360) {
        _r = c;
        _g = 0;
        _b = x;
    }
    // Having obtained RGB, convert channels to hex
    let r = Math.round((_r + m) * 255).toString(16),
        g = Math.round((_g + m) * 255).toString(16),
        b = Math.round((_b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;

    return '#' + r + g + b;
}

function addressToNumber(address: string): number {
    const addr = address.slice(2, 10);
    const seed = parseInt(addr, 16);
    return seed;
}

export class WalletAvatarGenerate {
    constructor(public mt: MersenneTwister) {}
    generateAvatarSvg(address: string) {
        this.mt.init_seed(addressToNumber(address));
        const remainingColors = this.hueShift(colors.slice());
        const bgColor = this.genColor(remainingColors);

        const svg = document.createElementNS(svgNamespaceURI, 'svg');
        svg.setAttributeNS(null, 'x', '0');
        svg.setAttributeNS(null, 'y', '0');
        svg.setAttributeNS(null, 'width', '100%');
        svg.setAttributeNS(null, 'height', '100%');
        svg.setAttribute('viewBox', '0 0 100 100');

        const bgRect = document.createElementNS(svgNamespaceURI, 'rect');
        bgRect.setAttribute('x', '0');
        bgRect.setAttribute('y', '0');
        bgRect.setAttribute('width', '100');
        bgRect.setAttribute('height', '100');
        bgRect.setAttribute('fill', bgColor);

        svg.appendChild(bgRect);

        for (var i = 0; i < shapeCount - 1; i++) {
            this.genShape(remainingColors, i, shapeCount - 1, svg);
        }

        return svg;
    }

    genShape(remainingColors: Array<string>, i: number, total: number, svg: Element) {
        const diameter = 100;
        const center = diameter / 2;

        const shape = document.createElementNS(svgNamespaceURI, 'rect');
        shape.setAttributeNS(null, 'x', '0');
        shape.setAttributeNS(null, 'y', '0');
        shape.setAttributeNS(null, 'width', diameter.toString());
        shape.setAttributeNS(null, 'height', diameter.toString());

        const firstRot = this.mt.random();
        const angle = Math.PI * 2 * firstRot;
        const velocity = (diameter / total) * this.mt.random() + (i * diameter) / total;

        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        const translate = 'translate(' + tx + ' ' + ty + ')';

        // Third random is a shape rotation on top of all of that.
        const secondRot = this.mt.random();
        const rot = firstRot * 360 + secondRot * 180;
        const rotate = 'rotate(' + rot.toFixed(1) + ' ' + center + ' ' + center + ')';
        const transform = translate + ' ' + rotate;
        shape.setAttributeNS(null, 'transform', transform);
        const fill = this.genColor(remainingColors);
        shape.setAttributeNS(null, 'fill', fill);

        svg.appendChild(shape);
    }
    genColor(colors: Array<string>) {
        // must call once
        this.mt.random();
        const idx = Math.floor(colors.length * this.mt.random());
        const color = colors.splice(idx, 1)[0];
        return color;
    }
    hueShift(colors: Array<string>) {
        const wobble = 30;
        const amount = this.mt.random() * 30 - wobble / 2;
        const rotate = (hex: string) => this.colorRotate(hex, amount);
        return colors.map(rotate);
    }
    colorRotate(hex: string, degrees: number) {
        const hsl = this.hexToHSL(hex);
        let hue = hsl.h;
        hue = (hue + degrees) % 360;
        hue = hue < 0 ? 360 + hue : hue;
        hsl.h = hue;
        return HSLToHex(hsl);
    }
    hexToHSL(hex: string) {
        // Convert hex to RGB first
        let r = parseInt('0x' + hex[1] + hex[2]);
        let g = parseInt('0x' + hex[3] + hex[4]);
        let b = parseInt('0x' + hex[5] + hex[6]);
        // Then to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        if (delta == 0) h = 0;
        else if (cmax == r) h = ((g - b) / delta) % 6;
        else if (cmax == g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        if (h < 0) h += 360;

        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        return { h, s, l };
    }
}

function generateSVGIcon(address: string) {
    const wag = new WalletAvatarGenerate(new MersenneTwister());
    return wag.generateAvatarSvg(address);
}

export default generateSVGIcon;
