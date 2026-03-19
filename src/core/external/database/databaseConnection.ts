import mongoose from 'mongoose';

export class DatabaseConnection {

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    private static instance: DatabaseConnection;
    private static uri: string = process.env.MONGO_URI || 'mongodb://localhost:27017/ixc_chat';

    private constructor() {
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(DatabaseConnection.uri);
            console.info(`✅ MongoDB conectado com sucesso!`);
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}
