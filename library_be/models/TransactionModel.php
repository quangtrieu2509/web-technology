<?php

class TransactionModel extends BaseModel {

    const TABLE_NAME = 'transaction';
    private string $TABLE_NAME = 'transaction';


    public function getAll($select = ['*']): array {
        return $this->getAll_base(self::TABLE_NAME, $select);
    }

    public function findById($id) {
        return $this->findById_base(self::TABLE_NAME, $id);
    }

    public function findByUser($user, $select = ['*'], $column = "username") {
        $columns = implode(',', $select);
        $sql = "select ${columns} from $this->TABLE_NAME where INSTR(${column}, \"${user}\") > 0";
        $query = $this->_query($sql);

        $data = [];
        while ($row = mysqli_fetch_assoc($query))
            $data[] = $row;
        return $data;
    }

    public function findByBook($book, $select = ['*'], $column = "bookid") {
        $columns = implode(',', $select);
        $sql = "select ${columns} from $this->TABLE_NAME where ${column} = ${book}";
        $query = $this->_query($sql);
        return mysqli_fetch_assoc($query);
    }

    public function create($data): string {
        $data['username'] = $this->array_to_string($data['username']);
        $data['booktitleid'] = $this->array_to_string($data['booktitleid']);
        $data['bookid'] = $this->array_to_string($data['bookid']);
        $data['transactiondate'] = $this->array_to_string($data['transactiondate']);
        $data['returndate'] = $this->array_to_string($data['returndate']);
        $data['isreturn'] = false;
        return $this->create_base(self::TABLE_NAME, $data);
    }

    public function update($id, $data): string {
        return $this->update_base(self::TABLE_NAME, $id, $data);
    }

    private function array_to_string($data): string {
        $str = '';
        foreach ($data as $d) {
            $str = $str.$d.SEPARATING_DELIMITER;
        }
        return substr($str, 0, strlen($str) - 1); // remove the last ';'
    }
}