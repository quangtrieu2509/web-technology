<?php
require_once 'BookTitleModel.php';
require_once 'BookModel.php';

class TransactionModel extends BaseModel {

    const TABLE_NAME = 'transaction';
    private $bookTitleModel, $bookModel;


    public function getAll($select = ['*']): array {
        return $this->getAll_base(self::TABLE_NAME, $select);
    }

    public function getOwnerTransaction($token, $select = ['*']): array {
        $acc = JwtUtils::getUserDataFromToken($token);

        $columns = implode(',', $select);
        $sql = "select ${columns} from ". self::TABLE_NAME ." where userid = ${acc['id']}";
        $query = $this->_query($sql);

        $data = [];
        while ($row = mysqli_fetch_assoc($query))
            $data[] = $row;
        return $data;
    }

    public function findById($id) {
        return $this->findById_base(self::TABLE_NAME, $id);
    }

//    public function findByUser($user, $select = ['*'], $column = "username") {
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
//    public function findByBook($book, $select = ['*'], $column = "bookid") {
//        $columns = implode(',', $select);
//        $sql = "select ${columns} from $this->TABLE_NAME where ${column} = ${book}";
//        $query = $this->_query($sql);
//        return mysqli_fetch_assoc($query);
//    }

    public function create($data, $token): string {
        $this->bookTitleModel = new BookTitleModel();
        $this->bookModel = new BookModel();

        // check available books and assign to bookid
        $data['bookid'] = $this->bookTitleModel->checkAvailableBook($data['booktitleid']);
        if(!$data['bookid']) return "No books available";

        // assign to user information
        $user = JwtUtils::getUserDataFromToken($token);
        $data['userid'] = $user['id'];
        $data['username'] = $user['username'];

        // set another fields
        $data['transactionid'] = Util::generateBarcode($this->getAll(['transactionid']), 15);
        $data['transactiondate'] = date("Y-m-d");
        $data['returndate'] = $this->plusDate($data['transactiondate'], $data['extratime']);
        $data['isreturn'] = NOT_RETURNED;
        unset($data['extratime']);

        $result = $this->create_base(self::TABLE_NAME, $data);
        if($result == INSERT_SUCCESSFULLY)
            $this->bookModel->update($data['bookid'], ['status' => UNAVAILABLE]);

        return $result;
    }

    public function update($id, $data): string
    {
        $this->bookModel = new BookModel();

        $trans = $this->findById($id);
        if($trans == null) return "The transaction does not exist";

        $check = $this->checkUpdateTransaction($trans['isreturn'], $data['isreturn']);
//        die($check);
        if($check == INCREASE)
            $this->bookModel->update($trans['bookid'], ['status' => $data['bookstatus']]);
        else if($check == DECREASE)
            $this->bookModel->update($trans['bookid'], ['status' => UNAVAILABLE]);

        unset($data['bookstatus']);
        return $this->update_base(self::TABLE_NAME, $id, $data);
    }

    private function checkUpdateTransaction($oldValue, $newValue)
    {
        // not returned -> returned  => book status: unavailable -> available or broken_or_lost
        if($oldValue == NOT_RETURNED && $newValue == RETURNED)
            return INCREASE;
        // returned -> not returned (almost do not happen)  => book status: available or broken_or_lost -> unavailable
        else if($oldValue == RETURNED &&$newValue == NOT_RETURNED)
            return DECREASE;
        // other cases => nothing changed
        return -1;
    }

    /** calculate the returning date */
    private function plusDate($date, $extraTime): string
    {
        $nDate=date_create($date);
        date_add($nDate,date_interval_create_from_date_string($extraTime));
        return date_format($nDate, "Y-m-d");
    }
}