# Analyzy - AI-Powered Document Analysis Platform

Analyzy is an innovative application designed to simplify the process of analyzing PDF documents using artificial intelligence (AI). By leveraging cutting-edge technology, Analyzy allows users to upload PDF files and receive comprehensive analysis of their content within seconds. Here's what Analyzy offers:

## What does Analyzy do?

Analyzy streamlines the document analysis process by utilizing AI algorithms to extract key information and provide insightful analysis from PDF documents. Users can simply upload their PDF files to the platform, and Analyzy will analyze the content, generating valuable insights and summaries. Additionally, Analyzy features a chatbox where users can ask questions related to the document, and the AI system will provide accurate responses.

## Features

- **Optional Google sign-in:**
  - Guests can use Analyzy without an account (uploads are associated with the client IP for listing).
  - Users may optionally sign in with Google; the backend sets an HTTP-only session cookie after OAuth.

- **Home and Drag & Drop:**
  - Navigation to various sections including the Analyze page.
  - Drag and drop functionality for uploading files.
  - Upload files to AWS S3 with a single click.
  - View uploaded files and perform actions like analyzing and deleting.

- **Analyze:**
  - Display of uploaded files from AWS S3.
  - AI analysis section for insights on the uploaded files.
  - Chatbox feature for users to interact with AI and ask questions related to the files.

## Future Enhancements
 - Support for uploading and analyzing document formats like DOC/DOCX, PPT
 - Plan to incorporate tools that will allow us to gather valuable feedback and analytics from our users.


## Deployements

  ### [Backend is deployed on google app engine](https://analyzy.el.r.appspot.com/)

## Environment (quick reference)

**Backend (`node_backend/.env`):** `MONGOURL`, `JWT_SECRET`, `GEMINI_API_KEY`, AWS keys, `BUCKET_NAME`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_callbackURL`, and `FRONTEND_URL` (your SPA origin, used for Google OAuth redirects).

**Frontend (`vue_frontend/.env`):** `VITE_API_URL` — backend base URL (no trailing slash), e.g. `http://localhost:8000` for local API.

## Initial Design Concepts and Overview

### 1. Optional sign-in (Google)
The auth screen offers continuing as a guest or signing in with Google for optional account-scoped behavior when enabled on the server.
![Signup-Login](https://github.com/Smoke221/Analyzy/assets/114225283/846f7cf7-1c93-43cb-b875-bfc0179f025b)


### 2. Home and Drag-and-Drop
This image illustrates the navigation bar with the "Analyze" option and a drag-and-drop area for effortless file uploads. Users can easily upload files by dragging them into the designated area. Users can view the files uplaoded to S3.
![Home](https://github.com/Smoke221/Analyzy/assets/114225283/58c26914-d612-4945-83e4-040cf1f58c0b)


### 3. Analyze
The Analyze page layout is shown here, with the uploaded file displayed on the right and the AI analysis section on the left. Users can view detailed analysis insights provided by AI algorithms and a chatbox feature where users can interact with the AI by asking predefined and their own questions, enhancing user engagement and usability.
![Analyze](https://github.com/Smoke221/Analyzy/assets/114225283/bafedd4e-50dd-4ee6-b0ce-46ff8e8d2502)

