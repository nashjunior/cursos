import { AddAccountRepository } from '../../../../data/protocols/AddAccountRepository';
import { AccountModel } from '../../../../domain/models/Account';
import { AddAccountModel } from '../../../../domain/useCases/AddAccount';
import MongoHelper from '../helpers/MongoHelper';

export default class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection(`accounts`);
    const result = await accountCollection.insertOne(accountData);
    const account = result.ops[0];
    const { _id, ...rest } = account;
    const returnedAccount = { id: _id, ...rest };
    return returnedAccount;
  }
}
