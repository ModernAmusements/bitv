document.getElementById('urlForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Prüfen der Barrierefreiheit...</p>';

    try {
        const response = await fetch('/api/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            throw new Error('Fehler beim Abrufen des Berichts');
        }

        const results = await response.json();
        displayOverview(results);
    } catch (error) {
        resultsDiv.innerHTML = `<p>Fehler: ${error.message}</p>`;
    }
});

function displayOverview(results) {
    const resultsDiv = document.getElementById('results');

    const issueCount = results.issues.length;
    resultsDiv.innerHTML = `<p>Gefundene Probleme: <strong>${issueCount}</strong></p>`;

    if (issueCount > 0) {
        const detailsHtml = results.issues.map((issue, index) => `
            <div class="issue">
                <p><strong>${index + 1}. ${issue.message}</strong></p>
                <button class="toggle-details" onclick="toggleDetails(${index})">Details anzeigen</button>
                <div id="details-${index}" class="details" style="display: none;">
                    <p><strong>Selector:</strong> ${issue.selector}</p>
                    <p><strong>Kontext:</strong> ${issue.context}</p>
                    <p><strong>Typ:</strong> ${issue.type}</p>
                </div>
            </div>
        `).join('');

        resultsDiv.innerHTML += detailsHtml;
    } else {
        resultsDiv.innerHTML += `<p>Die Seite erfüllt die Anforderungen der Barrierefreiheit!</p>`;
    }
}

function toggleDetails(index) {
    const detailsDiv = document.getElementById(`details-${index}`);
    detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
}
