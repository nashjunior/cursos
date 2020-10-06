import bcrypt from 'bcrypt';
import { Encrypter } from '../../data/protocols/Encrypter';

export default class BcryptAdapter implements Encrypter {
  private readonly salt: number;

  constructor(salt = 12) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }
}
