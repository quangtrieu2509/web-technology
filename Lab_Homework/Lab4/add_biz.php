<html lang="en">
<head>
    <title>Category Registration</title>
    <style>
        .root {
            display: inline-flex;
            width: 100%;
        }
        .child{
            margin: 10px;
        }
        .text {
            width: 100%;
            border: 2px inset;
        }
        .wrap-box {
            height: 80px;
            width: 100%;
            overflow-y: auto;  /* scrollbar */
            border: 2px inset;
        }
    </style>
</head>
<body>
<h1> Category Registration </h1>
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
    $flag = false;
    /* Add to B-Table*/
    if(isset($_POST["submit"]) && $_POST["bName"] != "" && $_POST["addr"] != "" && $_POST["city"] != "" && $_POST["tel"] != "" && $_POST["url"] != ""){
        $insertBusSql = "INSERT INTO $busTable (Name, Address, City, Telephone, URL) 
                            VALUES('" . $_POST["bName"] . "','" . $_POST["addr"] . "','" . $_POST["city"] . "','" . $_POST["tel"] . "','" . $_POST["url"] . "')";
        if ($conn->query($insertBusSql) === TRUE) {
            $flag = true;
            print "Record inserted as shown below.";
            /* Add to B-C-Table */
            if(isset($_POST["category"])){
                $lastInsert = $conn->query("SELECT * FROM $busTable ORDER BY  $busTable .`Business ID` DESC LIMIT 1");
                $tmp = $lastInsert->fetch_assoc();

                foreach ($_POST["category"] as $cat){
                    $insertBCSql = "INSERT INTO $biz_catTable VALUES (" . $tmp['Business ID'] . ", '" . $cat . "')";
                    if ($conn->query($insertBCSql) === FALSE) print "Error: " . $insertBCSql . "<br>" . $conn->error;
                }
            }
        } else print "Error: " . $insertBusSql . "<br>" . $conn->error;
    }
?>
<form action="add_biz.php" method="POST">
    <div class="root">
        <div class="child" style="width: 40%">
            <?php
            if(!$flag) print "<p>Click on one, or control-click on multiple categories:</p>";
            else print "<p>Selected category values are highlighted:</p>"
            ?>

            <div class="wrap-box">
                <?php
                $catSql = "SELECT * FROM $catTable";
                $result = $conn->query($catSql);
                if ($result && $result->num_rows > 0) {
                    // output data of each row
                    while($row = $result->fetch_assoc()) {
                        if(isset($_POST['submit']) && containingCheck($_POST['category'], $row["Category ID"]))
                            print "<label><input type='checkbox' class='item' name='category[]' checked='checked' value='". $row["Category ID"] ."'>" . $row["Title"] . "</label><br>";
                        else print "<label><input type='checkbox' class='item' name='category[]' value='". $row["Category ID"] ."'>" . $row["Title"] . "</label><br>";
                    }
                }
                ?>
            </div>
        </div>
        <div class="child" style="width: 60%; margin-right: 30px;">
            <table style="width: 100%">
                <tr>
                    <td>Business Name: </td>
                    <?php
                    if(isset($_POST['submit'])) print '<td><input class="text" type="text" name="bName" value="' . $_POST['bName'] . '"></td>';
                    else print '<td><input class="text" type="text" name="bName"></td>';
                    ?>
                </tr>
                <tr>
                    <td>Address: </td>
                    <?php
                    if(isset($_POST['submit'])) print '<td><input class="text" type="text" name="addr" value="' . $_POST['addr'] . '"></td>';
                    else print '<td><input class="text" type="text" name="addr"></td>';
                    ?>
                </tr>
                <tr>
                    <td>City: </td>
                    <?php
                        if(isset($_POST['submit'])) print '<td><input class="text" type="text" name="city" value="' . $_POST['city'] . '"></td>';
                        else print '<td><input class="text" type="text" name="city"></td>';
                    ?>
                </tr>
                <tr>
                    <td>Telephone: </td>
                    <?php
                    if(isset($_POST['submit'])) print '<td><input class="text" type="text" name="tel" value="' . $_POST['tel'] . '"></td>';
                    else print '<td><input class="text" type="text" name="tel"></td>';
                    ?>
                </tr>
                <tr>
                    <td>URL: </td>
                    <?php
                    if(isset($_POST['submit'])) print '<td><input class="text" type="text" name="url" value="' . $_POST['url'] . '"></td>';
                    else print '<td><input class="text" type="text" name="url"></td>';
                    ?>
                </tr>

            </table>
        </div>
    </div>
    <br><br>
    <?php
        if(!$flag) print '<input type="submit" name="submit" style="padding: 5px" value="ADD BUSINESS">';
        else print '<a href="add_biz.php">Add Another Business</a>';
    ?>


</form>
<?php
    function containingCheck($array, $var) {
        foreach($array as $item) if($item === $var) return true;
        return false;
    }

    $conn->close();
?>
</body>
</html>