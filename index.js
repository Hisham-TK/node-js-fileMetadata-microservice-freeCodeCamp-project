var express = require('express');
var cors = require('cors');
require('dotenv').config();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

var app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// General log middleware
app.use((req, res, next) => {
  const { ip, method, path, query, body, params, headers } = req;
  console.log({ ip, method, path, query, body, params /* , headers */ });
  next();
});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// File uploader API
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { originalname: name, mimetype: type, size } = req.file;
  res.json({ name, type, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
