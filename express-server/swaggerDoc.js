const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    info: {
      title: 'eCommerce API',
      description: 'eCommerce API Information',
      contact: {
        name: "MWA Team"
      },
      servers: ["http://localhost:3000"]
    }
  },
  tags: {
      name: 'user-controller',
      description: 'User Controller'
      },
  apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}