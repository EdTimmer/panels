declare module 'babel-plugin-glsl/macro' {
  const glsl: (literals: TemplateStringsArray, ...placeholders: any[]) => string;
  export default glsl;
}
