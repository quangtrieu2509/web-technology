<?php

class AccountModel extends BaseModel {
    const TABLE_NAME = 'account';
    private string $TABLE_NAME = 'account';

    public function getAll($select = ['*']): array {
        return $this->getAll_base(self::TABLE_NAME, $select);
    }

    public function create($data) {
        $data['username'] = $this->array_to_string($data['username']);
        $data['fullname'] = $this->array_to_string($data['fullname']);
        $data['gender'] = $this->array_to_string($data['gender']);
        $data['email'] = $this->array_to_string($data['email']);
        $data['phone'] = $this->array_to_string($data['phone']);
        $data['islock'] = false;
        $data['barcode'] = $this->array_to_string($data['barcode']);
        $data['role'] = $this->array_to_string($data['role']);
        $data['password'] = md5($this->array_to_string($data['password']));
        return $this->create_base(self::TABLE_NAME, $data);
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