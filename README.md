# JSONBlob-Replica

This repository contains a replica of JSONBlob, a simple HTTP service for storing and retrieving JSON data.

## Getting Started

To get started, clone this repository to your local machine:

```console
git clone https://github.com/Tedla2001/JSONBlob-Replica.git
```

## Usage

To start the server, run the following command:

```console
node app
```

This will start the server at http://localhost:8000/api.

### Endpoints

The following endpoints are available:

```http
GET /api/:id: Returns the JSON data stored with the specified ID.
POST /api: Stores the JSON data in the request body and returns the ID.
PUT /api/:id: Updates the JSON data stored with the specified ID.
DELETE /api/:id: Deletes the JSON data stored with the specified ID.
```

### Team

- [Tewodros Amare](https://github.com/teddygizachew)
- [Tedla Tafari](https://github.com/Tedla2001)
- [Lulseged Admasu](https://github.com/lul-g)


## License

This project is licensed under the MIT License. See the LICENSE file for details.
