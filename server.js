// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// rota de saúde (depois de criar o app)
app.get('/health', (req, res) => res.status(200).send('ok'));

// === suas rotas existentes vêm AQUI ===
// exemplo: app.get('/horoscope', handler)
// (não duplique "const app = express()" se ele já existir no seu arquivo)

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log('API on', PORT));
