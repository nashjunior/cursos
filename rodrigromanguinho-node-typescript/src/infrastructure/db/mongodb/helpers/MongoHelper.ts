import { MongoClient } from 'mongodb';

const MongoHelper = {
  client: null as MongoClient,
  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    this.client.close();
  },
};

export default MongoHelper;
