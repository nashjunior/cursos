import { Collection, MongoClient } from 'mongodb';

const MongoHelper = {
  client: null as MongoClient,
  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  mapper(collection: any): any {
    const { _id, ...rest } = collection;
    return { id: _id, ...rest };
  },
};

export default MongoHelper;
