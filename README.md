# TECHNICAL EVALUATION BACKEND

>  A ES6 CRUD api for evaluation
## Build Setup
```sh
# Run develop environment
$ git clone https://github.com/riclara/birdback.git # or clone your own fork
$ cd birdback
$ npm install
$ npm run dev
```
Your app should now be running on [localhost:8000](http://localhost:8000/).

## Tests
```sh
# Run Tests
$ npm test
```

## Api Examples

### Create
```sh
  curl -X POST \
    http://localhost:8000/ \
    -H 'Content-Type: application/json' \
    -d '{
    "firstName" : "Ricardo",
    "lastName" : "Lara",
    "middleName" : "H",
    "email" : "riclara1@gmail.com",
    "specialty" : "59c19c6e5754f2d72b65c662",
    "projectedStartDate" : "2017-09-14T02:55:39.479-05:00",
    "employerId" : 318,
    "providerType" : "ARNP",
    "staffStatus" : "CONSULTING",
    "assignedTo" : 33212,
    "status" : "AWAITING_DECISION",
    "createdBy" : 11767,
    "other": "@@@@@@"
  }'
```

### Retrieve
```sh
  curl -X GET \
  http://localhost:8000/5c841bc00c79d7800fc9075e \
  -H 'Content-Type: application/json'
```

### Update
```sh
  curl -X PUT \
    http://localhost:8000/ \
    -H 'Content-Type: application/json' \
    -d '{
    "_id": "5c843d12f55cd0a47364f9d7",
    "firstName" : "Ricardo2",
    "lastName" : "Lara",
    "specialty": "59c19c6e5754f2d72b65c680",
    "status": "READY_FOR_REVIEW",
    "staffStatus": "COURTESY",
    "updatedBy": 111,
    "other": "@@@@@"
  }'
```

### Delete
```sh
  curl -X DELETE \
  http://localhost:8000/5c84443211b149ae718adf89
```

