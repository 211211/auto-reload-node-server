import XLSX from 'xlsx'
import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer'
const server = express.Router();
const upload = multer({ dest: 'uploads/' });

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get('/', async (req, resp) => {
    resp.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Server is a destiny</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="HTML5 Example Page">
</head>
<body>
  <header>
    <h1>HTML5 Examplesdfdsffsdf Page</h1>
  </header>
  <main></main>
  <script type="module" src="/client/client-entry.js"></script>
</body>
</html>
    `)
})

server.post('/upload-excel', upload.single('file'), (req: any, res) => {
  const filePath = req.file.path;
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);
  res.send(data);
});

export default server;