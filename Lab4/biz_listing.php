<html lang="en">
<head>
    <title>Business Listings</title>
    <style>
        .root {
            display: inline-flex;
            width: 100%;
        }
        .child{
            margin: 5px;
        }
        .dataList{
            border: 1px outset;
        }
        .catList {
            border: 4px outset;
        }
        td, th {
            border: 2px inset;
        }
    </style>
</head>
<body>
<h1> Business Listings </h1>
<?php
    $servername = "localhost";
    $username = "root";
    $password = "123456";
    $myDB = "business_service";
    $busTable = "businesses";
    $catTable = "categories";
    $biz_catTable = "biz_categories";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $myDB);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

?>
<div class="root">
    <div class="child" style="width: 30%">
        <table class="catList" style="width: 100%">
            <tr>
                <th><b>Click on a category to find business listings: </b></th>
            </tr>
            <?php
            $catSql = "SELECT * FROM $catTable";
            $result = $conn->query($catSql);
            if ($result && $result->num_rows > 0) {
                // output data of each row
                while($row = $result->fetch_assoc())
                        print "<tr><td><a href='biz_listing.php?cat_id=". $row["Category ID"] ."'>" . $row["Title"] . "</td></tr>";
            }
            ?>
        </table>
    </div>
    <div class="child" style="width: 70%">
        <table class="dataList" style="width:100%">
            <?php
            if(isset($_GET['cat_id'])){
                $sql = "SELECT * FROM $busTable, $biz_catTable WHERE $busTable.`Business ID` = $biz_catTable.`Business ID` AND $biz_catTable.`Category ID` = '". $_GET['cat_id'] . "'";
                $result2 = $conn->query($sql);

                if ($result2 && $result2->num_rows > 0) {
                    // output data of each row
                    while($row2 = $result2->fetch_assoc())
                        print "<tr><td>". $row2["Business ID"] . "</td><td>"
                            . $row2["Name"] . "</td><td>" . $row2["Address"] . "</td><td>"
                            . $row2["City"] . "</td><td>" . $row2["Telephone"] . "</td><td>"
                            . $row2["URL"] . "</td><td>" . $row2["Business ID"] . "</td><td>" . $row2["Category ID"] ."</td><tr>";
                }
                else print "No data";
            }
            else print "No data";
            ?>
        </table>
    </div>
</div>
<?php
    $conn->close();
?>
</body>
</html>