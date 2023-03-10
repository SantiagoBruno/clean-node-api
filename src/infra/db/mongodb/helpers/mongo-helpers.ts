import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,
  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },
  async disconnect () {
    await this.client.close()
    this.client = null
  },
  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },
  mapMongoDbObject (object: any): any {
    if (object) {
      object.id = object._id.toString()
      delete object._id
      return object
    }
  },
  mapMongoDbArrObjects (objects: any[]): any {
    const resultObj = [...objects]
    resultObj.forEach((obj) => {
      obj = this.mapMongoDbObject(obj)
    })
    return resultObj
  }
}
