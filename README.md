# **EquiSports API**

EquiSports API is a backend service for an online sports equipment store that offers a variety of sports accessories, including gear and apparel. The API allows users to register, view products, and manage inventory through MongoDB. Admins can add, update, delete products, and fetch product details by categories or price.

---

## **Live Site**

- **Frontend**: [EquiSports Frontend](https://equi-sports-shakir.vercel.app/)
- **Backend**: [EquiSports Server](https://equi-sports-server-shakir.vercel.app)

---

## **API Endpoints**

### **User Endpoints**

- **GET /users**: Fetch all users.
- **POST /users**: Create a new user.

### **Product Endpoints**

- **GET /products**: Fetch all products.
- **GET /products/:id**: Fetch a single product by ID.
- **GET /limitedProductsData**: Fetch the first 8 products.
- **POST /products**: Add a new product.
- **PUT /products/:id**: Update a product by ID.
- **DELETE /products/:id**: Delete a product by ID.
- **GET /categories**: Get a list of unique categories.
- **GET /products/category/:category**: Fetch products by category.
- **GET /products/sort/:sort**: Sort products by price (`asc` or `desc`).

---

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, MongoDB Atlas
- **Authentication**: None (Basic API)
- **Middleware**: CORS
- **Environment Variables**: dotenv

---

## **How to Run the API Locally**

### 1. Clone the Repository

```bash
git clone https://github.com/ShakirMahmud/equiSports-server.git
cd equisports-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of your project and add your MongoDB credentials:

```env
DB_USER=your-mongodb-username
DB_PASS=your-mongodb-password
```

### 4. Run the Server

```bash
npm start
```

The server will start on port `5000` (or the port defined in your `.env` file).

---

## **Contributing**

If you'd like to contribute to the project, feel free to fork the repository, create a new branch, and submit a pull request. Please ensure that all code is properly tested before submitting a pull request.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Credits**

- **Backend Framework**: Express.js
- **Database**: MongoDB
- **Hosting**: MongoDB Atlas


