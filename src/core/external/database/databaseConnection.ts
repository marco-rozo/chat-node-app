import { MongoClient, Db } from "mongodb";

export class DatabaseConnection {
    private static instance: DatabaseConnection;
    private client: MongoClient;
    private db: Db;

    private constructor() {
        const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
        this.client = new MongoClient(uri);
        this.db = this.client.db("ixc_chat");
    }

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    public async connect(): Promise<void> {
        try {
            await this.client.connect();
            console.log("Connected to MongoDB - Database: ixc_chat");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    }

    public getDatabase(): Db {
        return this.db;
    }

    public async disconnect(): Promise<void> {
        await this.client.close();
        console.log("Disconnected from MongoDB");
    }
}