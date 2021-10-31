const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wnpsb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        // console.log('connected to database');
        const database = client.db("carMechanic");
        const servicesCollection = database.collection("services");

        // GET API[load all data]
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        });

        // GET Single Service
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific service', id);
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })


        // create a document to insert
        // POST API
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('hit the post api', service);

            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result)
            // res.send('post hitted');
        });


        // DELETE API
        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await servicesCollection.deleteOne(query);
            res.json(result);
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Running Genius Server')
})

app.get('/hello', (req, res) => {
    res.send('hello is here')
})

app.listen(port, () => {
    console.log('Running Genius Server on port', port);
})


//one time
//1.heroku site open
//2.heroku install
//3.

//Every project
//1.git init [git e file purata dibo]
//2. .gitignore file rakhbo [node_modules
//.env]
//3.push everything to git
//4.make sure in packege.json you have this:   "start": "node index.js",
//5.make sure index.js e eita ase:  const port = process.env.PORT || 5000;
//6.heroku log in
//7.heroku create [1 bar e 1 project er jonno]
//8.git push heroku main
//9.kaj sesh

//update 
// save everything
// git Push
//git push heroku main