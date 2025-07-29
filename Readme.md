# 🛍️ Product and user management App (Node.js + Express)

A simple full-stack web app built using **HTML, CSS, and Node.js (Express)** that allows users to sign up, log in, and view product details.

## 🚀 Features

- 🌐 Landing Page with navigation
- 🔐 User Signup and Login
- 🛒 Product information lookup via name and image URL
- 📄 Displays product details like price, brand, storage, etc.
- 📁 Data stored in local `.json` files (no database needed)

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS, JavaScript
- **Backend**: Node.js, Express
- **Storage**: Local JSON files (`users.json`, `products.json`)

---

## 📁 Folder Structure

project-root/
├── server.js # Main backend file
├── src/
│ ├── index.html # Home page
│ ├── login.html # Login page
│ ├── signup.html # Signup page
│ ├── table.html # Product table form
│ ├── users.json # Stores user data
│ ├── products.json # Stores product info
│ └── style.css # (Optional) CSS styles
└── README.md

---

## 🧪 How It Works

1. **Home Page**: Navigate to Login or Signup
2. **Signup**: Saves email & password in `users.json`
3. **Login**:
   - Validates email and password
   - Redirects to `/table` if successful
4. **Product Form**:
   - Submit product name and image
   - Checks against `products.json`
   - If found, displays it in a table
   - Clicking "Details" shows full info (brand, storage, RAM, battery)

---