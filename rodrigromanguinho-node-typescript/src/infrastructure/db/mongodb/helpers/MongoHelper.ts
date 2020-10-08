import { Collection, MongoClient } from 'mongodb';

const MongoHelper = {
  client: null as MongoClient,
  url: null as string,
  async connect(url: string): Promise<void> {
    this.url = url;
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    this.client.close();
    this.client = null as MongoClient;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.url);
    }
    return this.client.db().collection(name);
  },

  mapper(collection: any): any {
    const { _id, ...rest } = collection;
    return { id: _id, ...rest };
  },
};

export default MongoHelper;
