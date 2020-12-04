const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors())

var db = require("./database.js");


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {

    res.send('Hamilton Health Services');

});

app.get('/api/patients', (req, res) => {

    var sql = "select * from patients"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });

});

app.post('/api/patients', (req, res) => {

    var insert = 'INSERT INTO patients (first_name, last_name, date_of_birth, gender, health_card_number ) VALUES (?,?,?,?,?)'
    db.run(insert, [
        req.body.firstName,
        req.body.lastName, 
        req.body.dateOfBirth, 
        req.body.gender, 
        req.body.healthCardNum]);

        res.json({
            "message": "success",
        })

});


// PORT
const port = 3000;

app.listen(port, () => console.log('Listening on port ' + port));

