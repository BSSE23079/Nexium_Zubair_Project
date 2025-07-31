export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Log the URL to make SURE the server is using the correct one from .env.local
  console.log('--- Attempting to call n8n webhook ---');
  console.log('URL:', process.env.N8N_WEBHOOK_URL);

  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({ error: 'Resume and Job Description are required.' });
    }

    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume, jobDescription }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        // Log the error response from n8n
        console.error('n8n workflow returned an error:', errorBody);
        throw new Error('Failed to get a response from the AI service.');
    }

    const data = await response.json();
    console.log('--- Successfully received response from n8n ---');
    res.status(200).json(data);

  } catch (error) {
    // This is the most important log. It will catch network errors.
    console.error('--- A critical error occurred while calling the webhook ---');
    console.error(error); // This will print the full technical error
    res.status(500).json({ error: error.message || 'An internal server error occurred.' });
  }
}