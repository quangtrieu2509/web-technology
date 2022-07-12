<?php

class AccountModel extends BaseModel {
    const TABLE_NAME = 'account';
    private string $TABLE_NAME = 'account';

    public function getAllUser($select = ['*'], $column = "role"): array {
        $columns = implode(',', $select);
        $sql = "select ${columns} from $this->TABLE_NAME where ${column} = 2";
        $query = $this->_query($sql);

        $data = [];
        while ($row = mysqli_fetch_assoc($query)) {
            unset($row['password']);
            $data[] = $row;
        }
        return $data;
    }

    public function update($id, $data) {
        return $this->update_base(self::TABLE_NAME, $id, $data);
    }

    public function findByUsername($user, $select = ['*'], $column = "username") {
        $columns = implode(',', $select);
        $sql = "select ${columns} from $this->TABLE_NAME where INSTR(${column}, \"${user}\") > 0";
        $query = $this->_query($sql);

        $data = [];
        while ($row = mysqli_fetch_assoc($query))
            $data[] = $row;
        return $data;
    }

    public function findByFullname($name, $select = ['*'], $column = "fullname") {
        $columns = implode(',', $select);
        $sql = "select ${columns} from $this->TABLE_NAME where INSTR(${column}, \"${name}\") > 0";
        $query = $this->_query($sql);

        $data = [];
        while ($row = mysqli_fetch_assoc($query))
            $data[] = $row;
        return $data;
    }

    public function findByBarcode($barcode, $select = ['*'], $column = "barcode") {
        $columns = implode(',', $select);
        $sql = "select ${columns} from $this->TABLE_NAME where ${column} = ${barcode}";
        $query = $this->_query($sql);
        return mysqli_fetch_assoc($query);
    }

    private function array_to_string($data): string {
        $str = '';
        foreach ($data as $d) {
            $str = $str.$d.SEPARATING_DELIMITER;
        }
        return substr($str, 0, strlen($str) - 1); // remove the last ';'
    }
}