# **TA Application Management System**

This is a **Node.js, Express, and MongoDB** application for managing Teaching Assistant (TA) applications. The system supports multiple user roles, including Applicants, Staff, Committee Members, and Instructors, and provides functionality to add courses, apply for courses, view applications, and manage offers.

---

## **Features**

1. **User Authentication**:
   - Register and login functionality for different user roles (Applicant, Staff, Committee Member, Instructor).
   - Role-based access control using JWT tokens.

2. **Course Management**:
   - Staff/Instructors can add and manage courses.
   - Applicants can view available courses and apply.

3. **Application Workflow**:
   - Applicants can apply for courses.
   - Staff and Committee Members can view and manage applications.
   - Committee Members can recommend and select TAs for courses.
   - Applicants can accept or decline offers.

4. **Dashboard**:
   - Role-based dashboards displaying relevant options for each user.

---

## **Technologies Used**

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose ODM
- **Frontend**:
  - HTML, CSS, JavaScript
- **Authentication**:
  - JSON Web Tokens (JWT)
- **Middleware**:
  - CORS
  - Body Parsing
- **Deployment**:
  - Localhost or cloud-based deployment

---

## **Getting Started**

### **Prerequisites**

Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

---

### **Installation**

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd ta-application-management
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
   JWT_SECRET=<your-secret-key>
   ```

4. **Start the MongoDB Server**:
   Ensure MongoDB is running locally or use MongoDB Atlas.

5. **Run the Application**:
   ```bash
   npm start
   ```
   The server will start at `http://localhost:5000`.

---

### **Folder Structure**

```
project
│
├── public/                  # Static frontend files
│   ├── auth/                # Authentication pages (login, register)
│   ├── course/              # Course-related pages (list, add course)
│   ├── applications/        # Offer and application pages
│   ├── css/                 # CSS files
│   └── js/                  # JavaScript files
│
├── routes/                  # Express route definitions
│   ├── auth.js              # Authentication routes
│   ├── applicant.js         # Applicant-related routes
│   ├── staff.js             # Staff-related routes
│   ├── committee.js         # Committee-related routes
│   ├── instructor.js        # Instructor-related routes
│   └── course.js            # Course-related routes
│
├── controllers/             # Route handler functions
│   ├── authController.js    # Authentication logic
│   ├── applicantController.js # Applicant logic
│   ├── staffController.js   # Staff logic
│   ├── committeeController.js # Committee logic
│   └── courseController.js  # Course logic
│
├── models/                  # Mongoose schemas
│   ├── user.js              # User schema
│   ├── course.js            # Course schema
│   └── application.js       # Application schema
│
├── middlewares/             # Custom middleware
│   └── authmiddleware.js    # Authentication middleware
│
├── .env                     # Environment variables
├── server.js                # Main server file
├── package.json             # Node.js dependencies and scripts
└── README.md                # Project documentation
```

---

### **Endpoints**

#### **Authentication (`/auth`)**
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login and receive a token.
- `GET /auth/me`: Get the logged-in user's details.

#### **Applicant (`/applicant`)**
- `POST /applicant/apply`: Apply to a course.
- `GET /applicant/offers`: View offers.
- `PATCH /applicant/respond`: Accept or decline an offer.

#### **Course (`/course`)**
- `POST /course/add`: Add a new course (Staff/Instructor only).
- `GET /course`: Get a list of all available courses.

#### **Staff (`/staff`)**
- `GET /staff/applications`: View applications for courses.
- `POST /staff/recommend`: Recommend an application to the committee.

#### **Committee (`/committee`)**
- `POST /committee/select`: Select a TA for a course.

---

### **Usage**

1. **Login/Register**:
   - Access the login page at `/auth/login.html`.
   - Create a new account or log in with existing credentials.

2. **Dashboard**:
   - Based on your role:
     - Applicants can view and apply for courses.
     - Staff and Instructors can add courses and manage applications.
     - Committee members can recommend or select TAs.

3. **Course Management**:
   - Staff or Instructors can add courses at `/course/add-course.html`.

4. **Applications**:
   - Applicants can view offers and respond to them at `/applications/offers.html`.

---

### **Error Handling**

1. **Invalid or Missing Token**:
   - Returns `401 Unauthorized` with an error message.
2. **Access Denied**:
   - Returns `403 Forbidden` if a user lacks the required role for an endpoint.
3. **Route Not Found**:
   - Returns `404 Route not found`.

---

### **Common Issues**

1. **MongoDB Connection Error**:
   - Ensure `MONGO_URI` is correct in the `.env` file.
   - Ensure MongoDB is running locally or accessible via MongoDB Atlas.

2. **Session Expiry**:
   - Tokens expire after 12 hours by default. Re-login to generate a new token.

3. **Static File Not Found**:
   - Ensure all static files (HTML, CSS, JS) are in the `public` folder.

---

### **Future Enhancements**

1. Implement real-time notifications for offer updates.
2. Add support for email notifications using Node.js email libraries.
3. Enhance the frontend design with a modern framework like React or Angular.
4. Add pagination and search functionality for courses and applications.

---

### **Contributing**

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

---

### **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

