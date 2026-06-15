🍕 Pizza Delivery Full Stack Application

A full-stack Pizza Ordering System built using React, Node.js, Express, and MongoDB.
It includes authentication, role-based access, pizza customization, inventory management, and order tracking.

🚀 Live Features
👤 User Features
User registration and login system
JWT-based authentication
Email verification system
Forgot password functionality
Browse available pizza ingredients
Build custom pizza:
Choose Pizza Base (5 options)
Choose Sauce (5 options)
Choose Cheese type
Select Veggies (multiple options)
Place order with real-time stock deduction
View order history
Track order status (live updates)
👨‍💼 Admin Features
Admin login with role-based access control
Complete inventory management system:
Pizza Bases
Sauces
Cheeses
Veggies
Meats
Add / Update / Delete inventory items
Monitor stock levels in real-time
Low stock detection system
Admin dashboard for all orders
Update order status:
Order Received
In Kitchen
Sent for Delivery
💳 Payment System
Razorpay payment gateway integration (Test Mode)
On successful payment:
Order is confirmed
Stock is updated automatically
📦 Order System
Users can place customized pizza orders
Backend automatically:
Calculates total price
Deducts stock quantity
Validates inventory availability
Admin can manage all orders
Users can track their order status in real time
📧 Email System
Email verification on signup
Forgot password email reset system
Low stock alert system:
Automatically sends email to admin when stock goes below threshold (e.g. < 20 items)
🔐 Authentication & Authorization
JWT authentication
Role-based access control:
User role
Admin role
Protected routes for both frontend and backend
🛠️ Tech Stack
Frontend
React.js
React Router
Axios
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
JWT
bcryptjs
Other Integrations
Razorpay (Payments)
Nodemailer (Emails)
📁 Project Structure
backend/
frontend/
⚙️ Setup Instructions
Backend
cd backend
npm install
npm run dev
Frontend
cd frontend
npm install
npm run dev
🔑 Environment Variables

Create .env in backend:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret
📌 API Features
Auth Routes
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile
Admin Routes
Inventory CRUD
Order management
Status updates
Order Routes
POST /api/orders
GET /api/orders/my-orders
📊 Project Highlights
Full-stack real-world architecture
Role-based system (User + Admin)
Inventory + Order + Payment system
Real-time stock management
Email automation system
Production-style backend structure
🏁 Status

✔ Backend Completed
✔ Frontend Completed
✔ Authentication System Done
✔ Order System Done
✔ Admin Panel Done
✔ Ready for Deployment

👨‍💻 Author

Yug Mehta
