export default {
  mongo: {
    // TODO: user and password can be set like environment vars
    url: 'mongodb://ricardo:ricardo1@ds139954.mlab.com:39954/evercheck-test-6?retryWrites=true',
    collections: {
      providers: 'providers',
      specialties: 'specialties'
    }
  }
}
