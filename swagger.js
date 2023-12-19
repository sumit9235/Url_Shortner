const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: "Url Shortner API",
        description:"For shortening long url's"
    },
    host: 'localhost:4000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/users.route.js','./routes/urls.route.js'];

swaggerAutogen(outputFile,routes,doc);