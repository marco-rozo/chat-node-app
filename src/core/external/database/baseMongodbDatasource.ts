import { Collection, Db, ObjectId, Document, Filter, UpdateFilter } from 'mongodb';

export abstract class BaseMongoDbDatasource<T extends Document = Document> {
    protected collection: Collection<T>;
    protected db: Db;

    constructor(db: Db, collectionName: string) {
        this.db = db;
        this.collection = this.db.collection<T>(collectionName);
    }

    async get(id: string): Promise<T | null> {
        return (await this.collection.findOne({ _id: new ObjectId(id) } as Filter<T>)) as T | null;
    }

    async getAll(): Promise<T[]> {
        return (await this.collection.find().toArray()) as unknown as T[];
    }

    async update(id: string, data: Partial<T>): Promise<void> {
        await this.collection.updateOne(
            { _id: new ObjectId(id) } as Filter<T>,
            { $set: data } as UpdateFilter<T>
        );
    }
}
