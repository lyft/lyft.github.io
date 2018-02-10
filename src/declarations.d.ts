declare module '*.png';
declare module 'github-language-colors/colors.json' {
    const colors: { [language: string]: string };
    export = colors;
}
declare const graphql: (query: TemplateStringsArray) => void;
