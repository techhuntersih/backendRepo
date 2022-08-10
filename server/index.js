var express=require('express');
var cors = require('cors')
var app=express();
const { randomInt } = require('crypto');
var sql = require('mysql2/promise');
app.get('/',function(req,res){
     res.send('Helooworld !')
})
app.use(cors());
app.use(express.json())
const connection =  sql.createPool({
    host :"sql6.freesqldatabase.com",
    user:"sql6511526",
    password :"av3YdrcipN",
    database :"sql6511526",
    port:3306,
})




// const n = randomInt(10000000, 100000000);
// console.log(n);

app.post('/app',async(req,res)=>{
  try{
      let result = await connection.query(
            `INSERT INTO Application_details(Name,Date_of_Birth,Age,Gender,State,Email,Degree_of_Hearing_loss,Type_of_Hearing_Loss) 
            VALUES('${req.body.name}','${req.body.dob}','${req.body.age}','${req.body.gender.value}','${req.body.state}','${req.body.email}','${req.body.degree_of_Hearing_Loss}','${req.body.type_of_hearing_loss}')`
        );
        console.log("inserted")
        console.log(result);
        return res.status(200).json({insertid : result[0].insertId})
    }catch(e){
        console.log(e);
    }

}
)
app.listen(5000,function(req,res){
    console.log("server started");
})
