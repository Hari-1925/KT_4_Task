Library Book Management System
Project Overview

This project is a Library Book Management System developed to demonstrate backend and frontend integration using modern web technologies. The application implements full CRUD operations with proper schema validation and error handling.

The system allows users to manage library books by adding, viewing, updating, and deleting records while enforcing logical constraints such as preventing negative stock and conditional deletion.

Technologies Used
Backend

Node.js

Express.js

MongoDB (Local)

Mongoose

CORS

Nodemon

Frontend

React (Vite)

JavaScript

CSS

Tools

Visual Studio Code

Postman

MongoDB Shell (mongosh)

Project Structure
KT_4_Task/
│
├── backend/
│   ├── models/
│   │   └── Book.js
│   ├── server.js
│   ├── package.json
│   └── node_modules/
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   ├── index.css
│   ├── package.json
│   └── node_modules/

Features
Backend Features

MongoDB schema with validation

RESTful API design

CRUD operations:

Create book

Read all books

Read books by category

Read books published after 2015

Update book copies

Update book category

Delete books with zero available copies only

Error handling for:

Book not found

Invalid updates

Negative stock prevention

Frontend Features

Modern dashboard UI

Form to add new books

Table view for all books

Buttons to update copies

Delete operation with backend validation

Real-time UI updates based on backend responses

How to Run the Project
Prerequisites

Node.js installed

MongoDB Community Edition installed and running locally

Backend Setup

Navigate to the backend folder:

cd backend


Install dependencies:

npm install


Start the backend server:

npm run dev


The backend will run on:

http://localhost:5000

Frontend Setup

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the frontend server:

npm run dev


The frontend will run on:

http://localhost:5173

API Endpoints (Backend)
Method	Endpoint	Description
POST	/books	Add a new book
GET	/books	Get all books
GET	/books/category/:category	Get books by category
GET	/books/after/2015	Get books published after 2015
PUT	/books/:id/copies	Increase or decrease copies
PUT	/books/:id/category	Update book category
DELETE	/books/:id	Delete book if copies are zero
API Testing

All backend APIs were tested using Postman before frontend integration to ensure correctness and stability.

Notes

node_modules folders are not included in the repository.

Dependencies can be reinstalled using npm install.

MongoDB must be running locally before starting the backend.

Conclusion

This project demonstrates a complete full-stack implementation with clear separation of concerns, proper data validation, and reliable error handling. It follows standard development practices and is suitable for academic or internship evaluation.
