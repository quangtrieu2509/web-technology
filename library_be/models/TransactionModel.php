<?php

class TransactionModel extends BaseModel {

    const TABLE_NAME = 'transaction';

    public function getAll($select = ['*']): array {
        return $this->getAll_base(self::TABLE_NAME, $select);

//        foreach ($bookTitles as $key => $bookTitle)
//            unset($bookTitles[$key]['trend']);    // ignore attribute 'trend'

//        return $transactions;
    }

    public function findById($id) {
        return $this->findById_base(self::TABLE_NAME, $id);
//        unset($booktitle['trend']);

//        return $transaction;
    }

    public function findByUser($user) {
        return $this->findByCriteria_base(self::TABLE_NAME, "userid", $user);
    }

    public function findByBook($book) {
        return $this->findByCriteria_base(self::TABLE_NAME, "bookname", $book);
    }

    public function create($data) {
        // Can them thong tin vao day
        return $this->create_base(self::TABLE_NAME, $data);
    }

    public function update($id, $data): string {
        return $this->update_base(self::TABLE_NAME, $id, $data);
    }
}