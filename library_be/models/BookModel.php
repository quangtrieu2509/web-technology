<?php

class BookModel extends BaseModel{

    const TABLE_NAME = 'book';

    public function getAll($select = ['*']): array
    {
        $books = $this->getAll_base(self::TABLE_NAME, $select);

        foreach ($books as $key => $book);

        return $books;
    }

    public function findById($id){
        $book = $this->findById_base(self::TABLE_NAME, $id);

        return $book;
    }

    public function create($data){
        $data['bookid'] = Util::generateBarcode($this->getAll_base(self::TABLE_NAME, ['bookid']), 15);
        $data['status'] = 0;
        return $this->create_base(self::TABLE_NAME, $data);
    }

    public function update($id, $data): string
    {
        return $this->update_base(self::TABLE_NAME, $id, $data);
    }

    public function delete($id): string
    {
        return $this->delete_base(self::TABLE_NAME, $id);
    }

}
