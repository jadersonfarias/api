module.exports = {
  bail: true, //se um teste der errado para tudo

  coverageProvider: "v8",

  testMatch: [
    "<rootDir>/src/**/*.spec.js" // vai para raiz do projeto e pega qualquer pasta que tenha .spec.js 
  ],
}
