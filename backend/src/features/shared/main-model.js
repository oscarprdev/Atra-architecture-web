import { connect } from '../../core/database/mongo.js';
import { ObjectId } from 'mongodb';

export class MainModel {
  static async connectToMongo({ db, collection }) {
    return await connect({ db, collection });
  }

  static async getElementById(db, id) {
    return await db.findOne({ _id: new ObjectId(id) });
  }

  static async getElementByQuery(db, query) {
    return await db.find(query).toArray();
  }

  static async findByInAndUpdate(db, id, input, options = null) {
    const result = await db.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: input },
      options || { returnDocument: 'after' }
    );

    return result.value;
  }

  static async findByIdAndDelete(db, id) {
    const result = await db.deleteOne({ _id: new ObjectId(id) });

    return result;
  }
}
