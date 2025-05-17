# 💸 Expense Tracker

A web-based Expense Tracker built using **PHP**, **AJAX**, **MySQL**, and **Chart.js** that helps you manage and visualize your income and expenses efficiently.

------------------------------------------------------------------------------------------------------------------------------------

## 🚀 Features

- Add, view, edit, and delete income/expense transactions
- Real-time updates using AJAX (no page reloads)
- Visual charts powered by Chart.js (Pie chart and Line chart)
- Organized category-wise breakdown
- Fully responsive and clean UI

----------------------------------------------------------------------------------------------------------------------------------------------

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Chart.js
- **Backend**: PHP
- **Database**: MySQL
- **AJAX**: For smooth, asynchronous operations

---

## 🗃️ Database Schema

```sql
CREATE DATABASE expense_tracker;

USE expense_tracker;

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('income', 'expense') NOT NULL,
    category VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
****use your db name and password in dp.php file*****

