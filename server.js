require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { userRoutes } = require('./app/routes/usersRoutes');
const { statisticRoutes } = require('./app/routes/statisticRoutes');
const { broadcastRoutes } = require('./app/routes/broadcastRoutes');
const { contentRoutes } = require('./app/routes/contentRoutes');

const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

userRoutes(app);
statisticRoutes(app);
broadcastRoutes(app);
contentRoutes(app);

app.server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
