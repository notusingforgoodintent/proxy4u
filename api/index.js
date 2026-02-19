export default async function handler(req, res) {
  // Get the 'url' parameter from the request (e.g., ?url=https://google.com)
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Error: Please provide a URL. Usage: /api?url=https://example.com");
  }

  try {
    const response = await fetch(url);
    const data = await response.text();

    // Set headers to allow any website to call this proxy
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', response.headers.get('Content-Type') || 'text/html');

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Proxy Error: Could not fetch the requested website.");
  }
}