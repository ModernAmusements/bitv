const pa11y = require('pa11y');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ error: 'Method not allowed' });
    }

    const { url } = req.body;

    if (!url) {
        return res.status(400).send({ error: 'URL wird benötigt' });
    }

    try {
        const results = await pa11y(url);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send({ error: 'Fehler beim Prüfen der Barrierefreiheit', details: error.message });
    }
};
