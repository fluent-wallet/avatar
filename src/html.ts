type EscapeKey = '&' | '<' | '>' | '"' | "'";

export function escapeHTML(html: string): string {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return `${html}`.replace(/[&<>"']/g, (i) => {
        return map[i as EscapeKey] || i;
    });
}

export function valueToHTML(v: any): string {
    if (v instanceof HTMLTemplate) {
        return v.toString();
    }
    if (Array.isArray(v)) {
        return v.map((i) => valueToHTML(i)).join('');
    }
    if ((typeof v === 'boolean' && v === false) || v === undefined || v === null) {
        return '';
    }
    return escapeHTML(v);
}

export class HTMLTemplate {
    strings: TemplateStringsArray;
    values: any[];
    constructor(strings: TemplateStringsArray, values: any[]) {
        this.strings = strings;
        this.values = values;
    }
    getHTML(): string {
        const { strings, values } = this;
        let str = strings[0];
        for (let i = 1; i < strings.length; i++) {
            const v = values[i - 1];
            str += `${valueToHTML(v)}${strings[i]}`;
        }
        return str;
    }
    toString() {
        return this.getHTML();
    }
}

export default function html(strings: TemplateStringsArray, ...values: any[]) {
    return new HTMLTemplate(strings, values);
}
