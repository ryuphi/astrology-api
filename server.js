// server.js (trecho essencial)
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Health
app.get('/health', (req, res) => res.status(200).send('ok'));

// >>> HOROSCOPE (GET com query params)
app.get('/horoscope', async (req, res) => {
  try {
    const { time, latitude, longitude, houseSystem = 'P' } = req.query;

    if (!time || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        error: 'Missing required params: time, latitude, longitude',
        example:
          '/horoscope?time=1995-06-09T18:15:00-03:00&latitude=-22.7496&longitude=-42.8557&houseSystem=P'
      });
    }

    // TODO: aqui você chama sua função real que usa o Swiss Ephemeris.
    // Exemplo (adapte ao seu módulo/lógica real):
    // const result = await getHoroscope({ time, latitude: Number(latitude), longitude: Number(longitude), houseSystem });
    // return res.json(result);

    // Stub de teste (remove depois):
    return res.json({
      ok: true,
      echo: {
        time,
        latitude: Number(latitude),
        longitude: Number(longitude),
        houseSystem
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err?.message || 'internal-error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log('API on', PORT));
