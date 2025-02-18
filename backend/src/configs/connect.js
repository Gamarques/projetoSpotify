import { MongoClient } from "mongodb";
import server from "./server.js";

const client = new MongoClient(server.mongodb.uri);

const connect = async () => {
    try {
        await client.connect();
        console.log(`Conectado ao MongoDB - Database: ${server.mongodb.dbName}`);
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        throw error;
    }
}   

export default connect;
export const db = client.db(server.mongodb.dbName);