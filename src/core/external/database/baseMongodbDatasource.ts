import { Model, UpdateQuery } from 'mongoose';

export abstract class BaseMongoDbDatasource<T> {
    constructor(protected readonly model: Model<T>) { }

    public async get(id: string): Promise<T | null> {
        return await this.model.findById(id).exec();
    }

    public async getAll(): Promise<T[]> {
        return await this.model.find().exec();
    }

    public async update(id: string, data: Partial<T>): Promise<void> {
        await this.model.findByIdAndUpdate(id, { $set: data } as UpdateQuery<T>).exec();
    }
}
