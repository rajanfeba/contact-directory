This is the sample Contacts web application that stores information such as name, address, and telephone numbers for contacts.

# Getting Started

## Clone the Repository
`git clone https://github.com/rajanfeba/contact-directory.git`
`cd contact-directory`

## Prerequisites
Ensure you have Node.js installed on your system.

### Instal dependencies
`npm install`

### Running the application
`node app.js`
Server will run at:  http://localhost:3000

### API Endpoints

Base URL: http://localhost:3000/contacts

| Method   |      Endpoint  |  Description              |
|----------|:-------------: |------:                    |
| GET      |   /list        |   Get all contacts        |
| POST     |   /new-contact |   Add a new contact       |
| PUT      |   /update/:id  |   Update a contact by ID  |
| DELETE   |   /delete/:id  |   Delete a contact by ID  |