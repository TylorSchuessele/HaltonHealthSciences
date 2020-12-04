var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name text, 
            last_name text, 
            date_of_birth date, 
            gender text,
            health_card_number text
            )`,
        (err) => {
            if (err) {
                // Table already created
                //console.log(err);
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO patients (first_name, last_name, date_of_birth, gender, health_card_number ) VALUES (?,?,?,?,?)'
                db.run(insert, ["Tylor","Schuessele", "1997-08-11", "male", "9991992"]);
                db.run(insert, ["ryan","ryanson", "1998-09-12", "female", "ghgfds"]);
            }
        });  
    }
});


module.exports = db