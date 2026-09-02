const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const initialHeaders = JSON.stringify(req.headers, null, 2);
    let html = fs.readFileSync(path.join(__dirname, '_page.html'), 'utf8');
    const injectedScript = `<script>window.__INITIAL_HEADERS__ = ${initialHeaders};</script>`;
    html = html.replace('<head>', '<head>' + injectedScript);
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.status(200).send(html);
  } catch (e) {
    res.status(500).send('error: ' + e.message);
  }
};
