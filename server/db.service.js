import { MongoClient, ObjectID } from 'mongodb'

class DbService {
  init (conf) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(conf.url, {useNewUrlParser: true},
        (err, cli) => {
          // this.client = cli
          if (err) return reject(err)
          this.providersCol = cli.db().collection(conf.collections.providers)
          this.specialtiesCol = cli.db().collection(conf.collections.specialties)
          resolve()
        })
    })
  }

  async create (values) {
    const today = new Date()
    values.specialty = await this.specialtiesCol.findOne({ _id: ObjectID(values.specialty) })
    return new Promise((resolve, reject) => {
      if (!values.specialty || !values.specialty._id) {
        throw new Error('Invalid specialty')
      }
      const provider = {
        _id: new ObjectID(),
        ...values,
        createdAt: today,
        updatedBy: values.createdBy,
        updatedAt: today
      }
      this.providersCol.insertOne(provider, (err, result) => {
        if (err) return reject(err)
        if (result.insertedCount) return resolve(provider)
        else reject(new Error('The provider was not inserted'))
      })
    })
  }

  read (id) {
    return this.providersCol.findOne({ _id: ObjectID(id) })
  }

  async update (values) {
    const today = new Date()
    let _specialty
    if (values.specialty) _specialty = await this.specialtiesCol.findOne({ _id: ObjectID(values.specialty) })
    return new Promise((resolve, reject) => {
      if (values.specialty && !(_specialty && _specialty._id)) {
        throw new Error('Invalid specialty')
      }
      const filter = {_id: new ObjectID(values._id)}
      delete values._id
      values.specialty = _specialty
      values.updatedAt = today
      this.providersCol.findOneAndUpdate(filter, { $set: values }, { returnOriginal: false }, (err, result) => {
        if (err) return reject(err)
        if (result.lastErrorObject.updatedExisting) return resolve(result.value)
        else reject(new Error('The provider was not updated'))
      })
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      this.providersCol.deleteOne({_id: new ObjectID(id)}, (err, { result }) => {
        if (err) return reject(err)
        if (result.n) resolve(result)
        else reject(new Error('The provider was not deleted'))
      })
    })
  }
}

export default new DbService()
