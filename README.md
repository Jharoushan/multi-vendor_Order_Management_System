#  Multi-Vendor Order Management System (Backend)

This is the backend for an e-commerce platform where **multiple vendors** can sell their products, and **customers** can place orders from different vendors in a single go. The system also gives **admin-level insights and analytics** to track everything.

---

##  Project Summary

**Key Users:**
-  Customers (place orders)
-  Vendors (add/manage their products)
-  Admin (monitor revenue, product performance, and vendor activity)

**Built with:**
- Node.js (server)
- Express (routing)
- MongoDB + Mongoose (database)
- JWT (login tokens)
- Bcrypt (secure passwords)
- Joi (request validation)

---

##  User Roles & Authentication

We have 3 user types:
- `customer`
- `vendor`
- `admin`

Each user can sign up and login. A **JWT token** is given on login, which must be sent in headers while accessing other APIs.

**Authentication Modules:**
- `POST /api/auth/signup` → Register a new user
- `POST /api/auth/login` → Login and receive token

---

##  Product Management (Vendor Only)

Vendors can manage their products:

- `POST /api/products` → Add new product
- `PUT /api/products/:id` → Update product
- `DELETE /api/products/:id` → Delete product
- `GET /api/products` → View all vendor’s products

Each product has:
- `name`, `price`, `stock`, `category`, `vendorId`, `createdAt`

---

##  Order Placement (Customer)

Customers can:
- Add products to cart from **multiple vendors**
- Place a single order
- Backend will:
  - Check stock
  - Deduct stock
  - Split the order into multiple sub-orders (1 per vendor)
  - Save a **master order** with child sub-orders

**API:**
- `POST /api/orders` → Place an order

---

##  Admin & Vendor Analytics

### For Admin:
- `GET /api/admin/analytics/revenue` → Total revenue per vendor (last 30 days)
- `GET /api/admin/analytics/top-products` → Top 5 best-selling products
- `GET /api/admin/analytics/order-value` → Average order value

### For Vendor:
- `GET /api/vendor/analytics/sales` → Sales in the last 7 days
- `GET /api/vendor/analytics/low-stock` → Products with low stock

---

##  Testing The Project (Using Postman)

1. **Signup & login** as customer, vendor, or admin.
2. Use the **token** received after login in the Postman headers:


## Project structure

├── models/         # Mongoose models (User, Product, Order)
      ├── placeOrder.js
      ├── products.js
      ├── userLoginSignup.js
├── controllers/    # Request handlers for each route
      ├── adminAnalyticsController.js
      ├── authentController.js
      ├── orderController.js
      ├── productsController.js
      ├── vendorAnalyticsController.js
├── routes/         # API routes
      ├── adminAnalyticsRoutes.js
      ├── authentRoutes.js
      ├── orderRoutes.js
      ├── productRoutes.js
      ├── vendorAnalyticsRoutes.js
├── middlewares/    # Auth, error, and role-based access
      ├── authentMiddleware.js
├── app.js          # Main app setup
├── server.js       # Entry point
└── .env            # Environment variables

