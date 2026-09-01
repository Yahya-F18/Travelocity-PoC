// api/checkout.js — يخدم صفحة الاختبار ويلتقط هيدرز التحميل الأول
import fs from 'fs';
import path from 'path';
let lastHeaders = null;
export default function handler(req, res) {
  if (req.query.show === 'headers') {
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    return res.status(200).send(lastHeaders ? JSON.stringify(lastHeaders, null, 2) : 'no capture yet');
  }
  lastHeaders = req.headers;
  const html = fs.readFileSync(path.join(process.cwd(), 'public', 'index.html'), 'utf8');
  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}
