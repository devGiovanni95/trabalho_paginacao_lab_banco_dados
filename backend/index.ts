import {MongoClient} from 'mongodb'
import  express, { json }  from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express()
const port = 3008
const uri = "mongodb://localhost:27017/"
const collectionName = 'livro'
const dbName = 'livros'

app.use(cors())
app.use(express.json())

app.get(`/livros/:page`,async (req, res) => {
    const page = parseInt(req.params.page);
    let actual = (page * 10) - 10    
    const books = await connectAndFindWithPagination(actual)
    res.json(books)
})

app.get(`/len`,async (req, res) => {
    const amount = await len()
    res.json(amount)
})

app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
})

async function len() {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.find({}).toArray()
        return result.length
    } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}


async function connectAndFindWithPagination(skip: number) {
    const client = new MongoClient(uri)
    try {
        await client.connect();
        console.log("Conexao estabelecida");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.find({}).skip(skip).limit(10).toArray()
        return result
    } catch(error) {
        console.log("Algo deu errado: ", error)
    } finally {
        await client.close();
        console.log("Conexao fechada");
    }
}