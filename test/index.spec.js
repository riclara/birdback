process.env.NODE_ENV = 'test'

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server/app').default
var expect = chai.expect

chai.use(chaiHttp)

function importTest(name, path) {
  describe(name, function () {
      require(path);
  });
}

describe('loading express', function () {
  before(function (done) {
    setTimeout(() => {
      done()
    }, 3000)
  })

  after(function () {
    server.close()
  })

  describe('/GET root', () => {
    it('it should GET status 200', done => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          done()
        })
    })
  })

  describe('CRUD tests', () => {
    var id
    it('must create a provider', done => {
      chai
        .request(server)
        .post('/')
        .send({
          firstName : 'Ricardo',
          lastName : 'Lara',
          middleName : 'H',
          email : 'riclara@gmail.com',
          specialty : '59c19c6e5754f2d72b65c662',
          projectedStartDate : '2017-09-14T02:55:39.479-05:00',
          employerId : 318,
          providerType : 'ARNP',
          staffStatus : 'CONSULTING',
          assignedTo : 33212,
          status : 'AWAITING_DECISION',
          createdBy : 11767,
          other: 'any value'
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).have.status(200)
          expect(res.body).to.not.have.property('other')
          expect(res.body._id).to.be.a('string')
          expect(res.body.firstName).to.equal('Ricardo')
          expect(res.body.lastName).to.equal('Lara')
          expect(res.body.middleName).to.equal('H')
          expect(res.body.email).to.equal('riclara@gmail.com')
          expect(res.body.specialty).to.be.a('object')
          expect(res.body.specialty._id).to.equal('59c19c6e5754f2d72b65c662')
          expect(res.body.projectedStartDate).to.equal(new Date('2017-09-14T02:55:39.479-05:00').toISOString())
          expect(res.body.employerId).to.equal(318)
          expect(res.body.providerType).to.equal('ARNP')
          expect(res.body.staffStatus).to.equal('CONSULTING')
          expect(res.body.assignedTo).to.equal(33212)
          expect(res.body.status).to.equal('AWAITING_DECISION')
          expect(res.body.createdBy).to.equal(11767)
          expect(res.body.updatedBy).to.equal(11767)
          id = res.body._id
          done()
        })
    })

    it('must retrieve a provider', done => {
      chai
        .request(server)
        .get('/'+id)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).have.status(200)
          expect(res.body).to.not.have.property('other')
          expect(res.body._id).to.be.a('string')
          expect(res.body.firstName).to.equal('Ricardo')
          expect(res.body.lastName).to.equal('Lara')
          expect(res.body.middleName).to.equal('H')
          expect(res.body.email).to.equal('riclara@gmail.com')
          expect(res.body.specialty).to.be.a('object')
          expect(res.body.specialty._id).to.equal('59c19c6e5754f2d72b65c662')
          expect(res.body.projectedStartDate).to.equal(new Date('2017-09-14T02:55:39.479-05:00').toISOString())
          expect(res.body.employerId).to.equal(318)
          expect(res.body.providerType).to.equal('ARNP')
          expect(res.body.staffStatus).to.equal('CONSULTING')
          expect(res.body.assignedTo).to.equal(33212)
          expect(res.body.status).to.equal('AWAITING_DECISION')
          expect(res.body.createdBy).to.equal(11767)
          expect(res.body.updatedBy).to.equal(11767)
          done()
        })
    })

    it('must update a provider', done => {
      chai
        .request(server)
        .put('/')
        .send({
          _id: id,
          firstName : 'Ricardo1',
          lastName : 'Lara1',
          middleName : 'J',
          email : 'riclara1@gmail.com',
          specialty : '59c19c6e5754f2d72b65c685',
          projectedStartDate : '2017-10-14T02:55:39.479-05:00',
          employerId : 319,
          providerType : 'MD',
          staffStatus : 'ASSOCIATE',
          assignedTo : 33213,
          status : 'AWAITING_CREDENTIALS',
          updatedBy : 11768,
          other: 'any value'
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).have.status(200)
          expect(res.body).to.not.have.property('other')
          expect(res.body._id).to.be.a('string')
          expect(res.body.firstName).to.equal('Ricardo1')
          expect(res.body.lastName).to.equal('Lara1')
          expect(res.body.middleName).to.equal('J')
          expect(res.body.email).to.equal('riclara1@gmail.com')
          expect(res.body.specialty).to.be.a('object')
          expect(res.body.specialty._id).to.equal('59c19c6e5754f2d72b65c685')
          expect(res.body.projectedStartDate).to.equal(new Date('2017-10-14T02:55:39.479-05:00').toISOString())
          expect(res.body.employerId).to.equal(319)
          expect(res.body.providerType).to.equal('MD')
          expect(res.body.staffStatus).to.equal('ASSOCIATE')
          expect(res.body.assignedTo).to.equal(33213)
          expect(res.body.status).to.equal('AWAITING_CREDENTIALS')
          expect(res.body.createdBy).to.equal(11767)
          expect(res.body.updatedBy).to.equal(11768)
          done()
        })
    })


    it('must update partial attributes from a provider', done => {
      chai
        .request(server)
        .put('/')
        .send({
          _id: id,
          firstName : 'Ricardo2',
          specialty : '59c19c6e5754f2d72b65c683',
          status : 'APPROVED',
          updatedBy : 11768
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).have.status(200)
          expect(res.body._id).to.be.a('string')
          expect(res.body.firstName).to.equal('Ricardo2')
          expect(res.body.lastName).to.equal('Lara1')
          expect(res.body.middleName).to.equal('J')
          expect(res.body.email).to.equal('riclara1@gmail.com')
          expect(res.body.specialty).to.be.a('object')
          expect(res.body.specialty._id).to.equal('59c19c6e5754f2d72b65c683')
          expect(res.body.projectedStartDate).to.equal(new Date('2017-10-14T02:55:39.479-05:00').toISOString())
          expect(res.body.employerId).to.equal(319)
          expect(res.body.providerType).to.equal('MD')
          expect(res.body.staffStatus).to.equal('ASSOCIATE')
          expect(res.body.assignedTo).to.equal(33213)
          expect(res.body.status).to.equal('APPROVED')
          expect(res.body.createdBy).to.equal(11767)
          expect(res.body.updatedBy).to.equal(11768)
          done()
        })
    })

    it('must delete a provider', done => {
      chai
        .request(server)
        .delete('/'+id)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          done()
        })
    })

  })
})
