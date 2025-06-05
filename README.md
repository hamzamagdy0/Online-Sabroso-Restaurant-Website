# Sabroso Restaurant Website

A modern, full-stack restaurant management system that enables customers to browse menus, place orders, and manage reservations. Features include user authentication, real-time order tracking, and an admin dashboard for menu management and order processing. Built with Node.js, Express, MongoDB, and EJS for a seamless dining experience.

## Features

- User authentication and authorization
- Menu management
- Order processing
- Responsive design
- Admin dashboard

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS (Embedded JavaScript)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS
- **Development**: Nodemon for development

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd sabroso-restaurant
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Start the development server:
```bash
npm run dev
```

For production:
```bash
npm start
```

## Project Structure

```
sabroso-restaurant/
├── controllers/     # Route controllers
├── models/         # Database models
├── routes/         # API routes
├── views/          # EJS templates
├── public/         # Static files
├── app.js          # Main application file
└── package.json    # Project dependencies
```

## API Endpoints

- Authentication
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/auth/profile

- Menu
  - GET /api/menu
  - POST /api/menu (admin only)
  - PUT /api/menu/:id (admin only)
  - DELETE /api/menu/:id (admin only)

- Orders
  - POST /api/orders
  - GET /api/orders
  - GET /api/orders/:id

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

For any queries or support, please contact [Your Contact Information] 