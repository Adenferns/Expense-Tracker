<?php
header('Content-Type: application/json');
include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $res = $conn->query("SELECT * FROM transactions ORDER BY date DESC");
    $transactions = [];
    $incomeTotal = 0;
    $expenseTotal = 0;

    while ($row = $res->fetch_assoc()) {
        $transactions[] = $row;
        if ($row['type'] === 'income') $incomeTotal += $row['amount'];
        else $expenseTotal += $row['amount'];
    }

    echo json_encode(['status' => 'success', 'data' => $transactions, 'incomeTotal' => $incomeTotal, 'expenseTotal' => $expenseTotal]);

} elseif ($method == 'POST') {
    $type = $_POST['type'];
    $category = $_POST['category'];
    $amount = $_POST['amount'];
    $date = $_POST['date'];

    $stmt = $conn->prepare("INSERT INTO transactions (type, category, amount, date) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssds", $type, $category, $amount, $date);
    $stmt->execute();

    echo json_encode(['status' => 'success']);

} elseif ($method == 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE['id'];

    $stmt = $conn->prepare("DELETE FROM transactions WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode(['status' => 'success']);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents("php://input"), $_PUT);
    $id = $_PUT['id'];
    $type = $_PUT['type'];
    $category = $_PUT['category'];
    $amount = $_PUT['amount'];
    $date = $_PUT['date'];

    $stmt = $conn->prepare("UPDATE transactions SET type = ?, category = ?, amount = ?, date = ? WHERE id = ?");
    $stmt->bind_param("ssdsi", $type, $category, $amount, $date, $id);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $stmt->error]);
    }
    exit;
}
?>
