<?php

class database {
    public function connect(){
        $connect = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
        mysqli_set_charset($connect, "utf8");
        if(mysqli_connect_errno() === 0)
            return $connect;
        return false;
    }
}