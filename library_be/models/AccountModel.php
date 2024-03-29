<?php

class AccountModel extends BaseModel {
    const TABLE_NAME = 'account';

    public function getAllUser($select = ['*'], $column = "role"): array
    {
        $columns = implode(',', $select);
        $sql = "select ${columns} from ". self::TABLE_NAME ." where ${column} = 2";
        $query = $this->_query($sql);

        $data = [];
        while ($row = mysqli_fetch_assoc($query)) {
            unset($row['password'], $row['role']);
            $data[] = $row;
        }
        return $data;
    }

    public function getById($id, $select = ['*']) {
        $acc = $this->findById_base(self::TABLE_NAME, $id, $select);
        if($acc == null) return $acc;
        if($acc['role'] == 1) return null;
        unset($acc['password'], $acc['role']);
        return $acc;
    }


    public function findById($id, $select = ['*']) {
        return $this->findById_base(self::TABLE_NAME, $id, $select);
    }

    public function update($id, $data): string
    {

        if(array_key_exists('email', $data)){
            $users = $this->getAllUser(['email']);
            foreach ($users as $user)
                if($data['email'] == $user['email'])
                    return EXISTED_EMAIL;
        }

        return $this->update_base(self::TABLE_NAME, $id, $data);
    }

//    public function findByUsername($user, $select = ['*'], $column = "username") {
//
//        $columns = implode(',', $select);
//        $sql = "select ${columns} from $this->TABLE_NAME where INSTR(${column}, \"${user}\") > 0";
//        $query = $this->_query($sql);
//
//        $data = [];
//        while ($row = mysqli_fetch_assoc($query))
//            $data[] = $row;
//        return $data;
//    }
//
//    public function findByFullname($name, $select = ['*'], $column = "fullname") {
//        $columns = implode(',', $select);
//        $sql = "select ${columns} from $this->TABLE_NAME where INSTR(${column}, \"${name}\") > 0";
//        $query = $this->_query($sql);
//
//        $data = [];
//        while ($row = mysqli_fetch_assoc($query))
//            $data[] = $row;
//        return $data;
//    }
//
//    public function findByBarcode($barcode, $select = ['*'], $column = "barcode") {
//        $columns = implode(',', $select);
//        $sql = "select ${columns} from $this->TABLE_NAME where ${column} = ${barcode}";
//        $query = $this->_query($sql);
//        return mysqli_fetch_assoc($query);
//    }

    public function checkAccountRole($id){
        $acc = $this->findById($id, ['role']);
        if($acc == null) return null;
        return $acc['role'];
    }

    public function search($username, $fullname, $barcode): array
    {
        $sql = "select * from ". self::TABLE_NAME . " where role = 2 and username like '${username}' "
            . "and fullname like '%${fullname}%' and barcode like '${barcode}'";
        $query = $this->_query($sql);

        if(!$query) return [];

        $data = [];
        while ($row = mysqli_fetch_assoc($query))
            $data[] = $row;

        return $data;
    }

}