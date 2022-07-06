<html lang="en">
<head>
    <title>Category Administration</title>
    <style>
        th {
            background: lightgray;
        }
        td {
            background: aliceblue;
        }
        .text {
            width: 100%;
            border: 2px inset;
        }
    </style>
</head>
<body>
<h1> Category Administration </h1>
<?php
    $servername = "localhost";
    $username = "root";
    $password = "123456";
    $myDB = "business_service";
    $tableName = "categories";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $myDB);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    /* Add to C-Table*/
    if(isset($_POST["submit"]) && $_POST["catID"] !== ""){
        $insertSql = "INSERT INTO $tableName VALUES('" . $_POST["catID"] . "','" .
            $_POST["title"] . "','" . $_POST["des"] . "')";
        if ($conn->query($insertSql) === TRUE) {
            print "New category created successfully!";
        } else print "Error: " . $insertSql . "<br>" . $conn->error;
    }
?>
<form action="admin.php" method="post">
    <table style="width:100%">
        <tr>
            <th>CatID</th>
            <th>Title</th>
            <th>Description</th>
        </tr>
        <?php
        $sql = "SELECT * FROM $tableName";
        $result = $conn->query($sql);
        if ($result && $result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                print "<tr><td>" . $row["Category ID"]. "</td><td>" . $row["Title"]. "</td><td>" . $row["Description"]. "</td></tr>";
            }
        }
        ?>
        <tr>
            <td><input class="text" type="text" name="catID"></td>
            <td><input class="text" type="text" name="title"></td>
            <td><input class="text" type="text" name="des"></td>
        </tr>
    </table>
    <br>
    <input type="submit" name="submit" style="padding: 5px" value="ADD CATEGORY">
</form>
<?php
$conn->close();
?>
</body>
</html>