Developer Portfolio Website

A personal portfolio website built to showcase my projects, technical skills, and professional background as a full-stack developer.

The website serves as a central place where recruiters and collaborators can explore my work, view live projects, and learn more about my experience in web development.

Live Demo

Portfolio Website
https://portfolio-web-coral-six.vercel.app

Repository
https://github.com/Romel164255/PortfolioWeb

Features

Modern responsive design

Project showcase section

Skills and technology overview

About me section

Contact section

Links to GitHub, LinkedIn, and projects

Mobile-friendly layout

Tech Stack
Frontend

React.js

HTML5

CSS3

JavaScript

Backend

Node.js

Express.js

Database

PostgreSQL

Tools

Git

GitHub

Vercel (deployment)

Sections of the Portfolio
Hero Section

Introduces the developer with name, role, and quick links to projects.

About Section

Provides background information and technical interests.

Projects Section

Displays full-stack projects including:

Real-time chat application

E-commerce platform

URL shortener

Each project includes GitHub and live demo links.

Skills Section

Lists programming languages, frameworks, and tools used in development.

Contact Section

Allows visitors to reach out via email or social links.

Project Structure
PortfolioWeb
│
├── backend
│   ├── routes
│   ├── controllers
│   ├── middleware
│   └── server.js
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── App.js
│
└── README.md
Installation
Clone the repository
git clone https://github.com/Romel164255/PortfolioWeb.git
cd PortfolioWeb
Install dependencies

Backend

cd backend
npm install

Frontend

cd frontend
npm install
Environment Variables

Create a .env file in the backend folder.

Example

PORT=5000
DATABASE_URL=your_postgresql_connection_string
Run the Application

Start backend

cd backend
npm start

Start frontend

cd frontend
npm start

Application runs at

http://localhost:3000
API Endpoints
Contact Form
Send Contact Message
POST /api/contact

Request body

{
"name": "John Doe",
"email": "john@example.com",
"message": "Hello, I would like to connect."
}

Stores message or sends email notification.

Projects
Get All Projects
GET /api/projects

Returns a list of projects displayed in the portfolio.

Get Single Project
GET /api/projects/:id

Returns details of a specific project.

Future Improvements

Blog section

Dark/light theme toggle

Project filtering

Resume download option

Analytics for portfolio visits

Author

Romel Augustine Fernandez

GitHub
https://github.com/Romel164255

LinkedIn
https://linkedin.com/in/romel-augustine-fernandez-775a643aa
