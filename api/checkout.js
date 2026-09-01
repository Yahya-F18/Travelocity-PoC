const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // قراءة الهيدرز الواردة في الطلب الأول
  const initialHeaders = JSON.stringify(req.headers, null, 2);
  
  // قراءة ملف الـ HTML الأصلي
  let html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');
  
  // حقن الهيدرز في كائن جافاسكريبت داخل الصفحة
  const injectedScript = `<script>window.__INITIAL_HEADERS__ = ${initialHeaders};</script>`;
  html = html.replace('<head>', '<head>' + injectedScript);

  res.setHeader('content-type', 'text/html; charset=utf-8');
  res.status(200).send(html);
};
