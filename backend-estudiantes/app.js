require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(session({
  secret: 'clave_secreta',
  resave: false,
  saveUninitialized: true
}));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error al conectar MongoDB:', err));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/estudiantes', require('./routes/estudiantesRoutes'));

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));