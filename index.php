<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Expense Tracker</title>
    <link rel="stylesheet" href="assets/style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</head>
<body>
    <div class="container">
        <h1>Expense Tracker</h1>
        <h2>Total Balance: ₹<span id="total-balance">0</span></h2>

        <form id="transaction-form">
            <select name="type" required>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
            <input type="text" name="category" placeholder="Category" required>
            <input type="number" name="amount" placeholder="Amount" required>
            <input type="date" name="date" required>
            <button type="submit">Add Transaction</button>
            <input type="hidden" name="id" id="transaction-id">

        </form>

        <div class="charts">
            <canvas id="income-chart"></canvas>
            <canvas id="expense-chart"></canvas>
        </div>

        <div class="totals">
            <div>Total Income: ₹<span id="total-income">0</span></div>
            <div>Total Expense: ₹<span id="total-expense">0</span></div>
        </div>


        <ul id="transaction-list"></ul>
    </div>

    <script src="assets/script.js"></script>
</body>
</html>



