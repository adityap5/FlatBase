# 🏠FlatBase

FlatBase is a Flat booking platform designed to provide users with a seamless experience for booking accommodations based on location. The application includes features for user registration and login, assigning different roles to sellers and customers, enabling users to book accommodations easily, and allowing sellers to list their properties with image uploads.

## Features

- User Registration and Login
- Role Assignment for Sellers and Customers
- Accommodation Booking
- Property Listing with Image Uploads
- Responsive and Visually Appealing User Interface

## Technologies Used

### Frontend

- React.js
- Tailwind CSS
- Material UI (for icons)

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas

### Image Storage

- Cloudinary

### Middleware

- Multer (for managing image uploads)

## Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas account
- Cloudinary account

### Clone the Repository

```bash
git clone https://github.com/adityap5/flatbase.git
cd flatbase
```

### Install Dependencies

#### Backend

Navigate to the `backend` directory and install the necessary packages:

```bash
cd backend
npm install
```

#### Frontend

Navigate to the `frontend` directory and install the necessary packages:

```bash
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```env
MONGO_URI=your_mongo_db_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Running the Application

#### Backend

In the `backend` directory, start the server:

```bash
cd backend
npm run dev
```

#### Frontend

In the `frontend` directory, start the React application:

```bash
cd ../frontend
npm run dev
```

The application should now be running on `http://localhost:5173`.

## Packages Used

### Backend

- Express: Web framework for Node.js
- Mongoose: ODM for MongoDB
- bcryptjs: For hashing passwords
- jsonwebtoken: For generating JWT tokens
- Multer: For handling file uploads
- Cloudinary: For image storage
- dotenv: For managing environment variables
- cors: Secure cross-origin requests and data transfers between browsers and servers

### Frontend

- React: JavaScript library for building user interfaces
- React Router: For routing
- Tailwind CSS: For styling
- Material UI: For icons
- Axios: For making HTTP requests
- react-spinners: To show Spinner while loading

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.


---

Feel free to reach out with any questions or suggestions!

Happy Coding!⚡