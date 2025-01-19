const pa11y = require('pa11y');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Check if the request method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    try {
        const { url } = req.body || {}; // Extract the URL from the request body

        // Validate the URL
        if (!url || typeof url !== 'string') {
            return res.status(400).json({ error: 'URL wird benötigt und muss eine gültige Zeichenkette sein.' });
        }

        // Log the URL being tested
        console.log(`Running Pa11y for URL: ${url}`);

        // Run Pa11y to check accessibility
        const results = await pa11y(url);

        // Respond with the Pa11y results
        res.status(200).json(results);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Pa11y Error:', error);

        // Respond with a detailed error message
        res.status(500).json({
            error: 'Fehler beim Prüfen der Barrierefreiheit.',
            details: error.message,
        });
    }
};