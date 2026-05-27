import { Document, Model } from "mongoose";
import { IBaseRepository } from "../interface/base-repository";

export abstract class BaseRepository<
  T extends Document,
> implements IBaseRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
  async findAll(): Promise<T[]> {
    return this.model.find({}, "-password");
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string, populator?: string): Promise<T | null> {
    const query = this.model.findById(id);
    if (populator) query.populate(populator);
    return await query.exec(); //for ensure
  }
  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async findByField(field: any, value: string) {
    return this.model.findOne({ [field]: value });
  }

  async delete(id: string): Promise<void | any> {
    return this.model.findByIdAndDelete(id);
  }

    async getAllWithFilter(filter:any,sort?:Record<string,1|-1>){
        const query= this.model.find(filter)
        if(sort) query.sort(sort)
        return await query
      }
}
