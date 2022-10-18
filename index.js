var express     = require('express');
var cors        = require('cors');
var bodyParser  = require('body-parser'); 

require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer');
const upload = multer();


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.post('/api/fileanalyse/', upload.any(), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
  const { files } = req;
  const { originalname,mimetype,size } = files[0];
  let resJson = {"name": originalname ,"type": mimetype,"size":size}
  res.json(resJson);      
});    



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
