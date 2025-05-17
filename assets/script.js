let incomeTotal = 0, expenseTotal = 0;

$(document).ready(function() {
    let incomeChart, expenseChart;

    function fetchData() {
        $.get('api.php', function(response) {
            if (response.status === 'success') {
                let income = {}, expense = {};
                let balance = 0;

                $('#transaction-list').empty();
                response.data.forEach(tx => {
                    const item = `<li>
                        ${tx.type.toUpperCase()}: ${tx.category} ₹${tx.amount} (${tx.date})
                        <button class="edit-btn" 
                            data-id="${tx.id}" 
                            data-type="${tx.type}" 
                            data-category="${tx.category}" 
                            data-amount="${tx.amount}" 
                            data-date="${tx.date}">Edit</button>
                        <button class="delete-btn" data-id="${tx.id}">Delete</button>
                    </li>`;
                    $('#transaction-list').append(item);

                    if (tx.type === 'income') {
                        balance += parseFloat(tx.amount);
                        income[tx.category] = (income[tx.category] || 0) + parseFloat(tx.amount);
                        incomeTotal += parseFloat(tx.amount);
                    } else {
                        balance -= parseFloat(tx.amount);
                        expense[tx.category] = (expense[tx.category] || 0) + parseFloat(tx.amount);
                        expenseTotal += parseFloat(tx.amount);
                    }

                    
                    
                });

                $('#total-balance').text(balance);
                updateChart('#income-chart', incomeChart, income, 'green');
                updateChart('#expense-chart', expenseChart, expense, 'red');

                $('#total-income').text(incomeTotal.toFixed(2));
                $('#total-expense').text(expenseTotal.toFixed(2));

            }
        }, 'json');
    }

    function updateChart(selector, chart, data, color) {
        const ctx = $(selector);
        const labels = Object.keys(data);
        const values = Object.values(data);

        if (chart) chart.destroy();
        chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: labels.map(() => color)
                }]
            }
        });

        if (selector === '#income-chart') incomeChart = chart;
        else expenseChart = chart;
    }

    $('#transaction-form').submit(function(e) {
        e.preventDefault();

        const id = $('#transaction-id').val();
        const formData = $(this).serialize();

        if (id) {
            // Update existing transaction
            $.ajax({
                url: 'api.php',
                type: 'PUT',
                data: formData,
                success: function(response) {
                    if (response.status === 'success') {
                        fetchData();
                        $('#transaction-form')[0].reset();
                        $('#transaction-id').val('');
                    } else {
                        alert('Update failed: ' + response.message);
                    }
                }
            });
        } else {
            // Add new transaction
            $.post('api.php', formData, function(response) {
                if (response.status === 'success') {
                    fetchData();
                    $('#transaction-form')[0].reset();
                } else {
                    alert('Add failed: ' + response.message);
                }
            }, 'json');
        }
    });

    $('#transaction-list').on('click', '.delete-btn', function() {
        const id = $(this).data('id');
        $.ajax({
            url: 'api.php',
            type: 'DELETE',
            data: { id },
            success: function(response) {
                if (response.status === 'success') {
                    fetchData();
                } else {
                    alert('Delete failed: ' + response.message);
                }
            }
        });
    });

    $('#transaction-list').on('click', '.edit-btn', function() {
        const id = $(this).data('id');
        const type = $(this).data('type');
        const category = $(this).data('category');
        const amount = $(this).data('amount');
        const date = $(this).data('date');

        $('#transaction-id').val(id);
        $('#transaction-form select[name="type"]').val(type);
        $('#transaction-form input[name="category"]').val(category);
        $('#transaction-form input[name="amount"]').val(amount);
        $('#transaction-form input[name="date"]').val(date);
    });

    fetchData();
});

