module.exports = (req, res) => {
  const lines = Object.keys(req.headers).sort().map(k => k + ': ' + req.headers[k]);
  res.setHeader('content-type', 'text/plain; charset=utf-8');
  res.status(200).send(lines.join('\n'));
};
