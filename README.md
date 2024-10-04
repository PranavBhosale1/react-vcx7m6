# React VCX7M6 Learning Roadmap Application

A web application built using React and JointJS that helps students manage their learning roadmap by allowing them to create subjects, add topics, mark them as completed, upload resources, and access educational resources through Google Cloud's Gemini API.

## Features

- Add and manage subjects and topics.
- Mark topics as completed or incomplete.
- Upload files and manage attachments for each topic.
- Visualize the learning roadmap using JointJS.
- Fetch learning resources using the Gemini API.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) (Node package manager, typically installed with Node.js)
- [Git](https://git-scm.com/) (optional, for version control)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PranavBhosale1/react-vcx7m6.git
   cd react-vcx7m6
Install dependencies: Make sure you have npm installed, then run:

bash
Copy code
npm install
Set up Google Cloud:

Create a Google Cloud account and a new project.
Enable the Gemini API and other relevant APIs (like Firestore, Storage).
Set up authentication and get your API keys.
Configure your environment:

Create a .env file in the root of the project and add your environment variables:
env
Copy code
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
Replace your_gemini_api_key_here with your actual API key.
Run the application:

bash
Copy code
npm start
Open your browser: Navigate to http://localhost:3000 to view the application.

Project Structure
plaintext
Copy code
/react-vcx7m6
├── /public
│   └── index.html
├── /src
│   ├── /components
│   │   ├── RoadmapView.js
│   │   └── RoadmapView.css
│   ├── App.js
│   ├── index.js
├── .env
├── package.json
└── README.md
How to Use
Add a Subject:

Enter the subject name in the input field and click "Add Subject."
Add a Topic:

Select a subject, enter the topic name, and click "Add Topic."
Manage Topics:

Mark topics as completed, edit topic names, and delete topics as needed.
Upload Resources:

Use the file input to upload resources related to the topic.
Access Learning Resources:

The application fetches relevant resources using the Gemini API based on the selected topic.
