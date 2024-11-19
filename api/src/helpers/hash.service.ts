import * as bcrypt from 'bcrypt';

export class HashService {
    hashData(data: string): Promise<string> {
        return bcrypt.hash(data, 10);
    }

    compareData(data: string, hash: string): Promise<boolean> {
        return bcrypt.compare(data, hash);
    }
}