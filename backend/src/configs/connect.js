import { MongoClient } from "mongodb";

const URI = "mongodb+srv://gabrielgamarques1:0o1vHuHGy94rytpn@cluster025.mgwrb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster025";

const client = new MongoClient(URI);

export const connect = async () => {
    try {
        await client.connect();
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB", error);
        throw error;
    }
}   
