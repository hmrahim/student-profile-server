const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.trq2z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async()=> {
    try {
        const database = await client.connect()
        if(database){
            console.log("database connected");
        }
        // databse collectins=====================
        const studentCollection = client.db("student-profile").collection("students")


        // all routs========================

        app.post("/addstudent", async(req,res)=> {
            const body = req.body
            const result =await studentCollection.insertOne(body)
            res.send(result)
            console.log(result);
        })

        app.get("/addstudent",async(req,res)=> {
            const data =await studentCollection.find().toArray()
            res.send(data)
        })

        app.get("/addstudent/:id",async(req,res)=> {
            const id = req.params.id
            const query = {_id:ObjectId(id)}
            const data = await studentCollection.findOne(query)
            res.send(data)
        })


        app.patch("/addstudent/:id",async(req,res)=> {
            const id = req.params.id
            const data = req.body
            const query = {_id:ObjectId(id)}
            const doc = {
                $set:{
                    name:data.name,
                    image:data.image,
                    father:data.father,
                    mother:data.mother,
                    class:data.class,
                    shift:data.shift,
                    phone:data.phone,
                    email:data.email,
                    address:data.address,

                }
            }
            const result = await studentCollection.updateOne(query,doc)

            res.send(result)
        })


        
    } finally{

    }

}

run().catch(console.dir)



app.get("/",(req,res)=> {
    res.send("hello from home")
})



app.listen(port,()=> {
    console.log("server started on port 5000");
})