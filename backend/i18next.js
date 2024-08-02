const i18next = require('i18next');
const Backend = require('i18next-node-fs-backend');
const expressMiddleware = require('i18next-express-middleware');

i18next
  .use(Backend)
  .use(expressMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    }
  });

default export i18next;