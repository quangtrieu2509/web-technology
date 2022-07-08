<?php

class BookTitleModel extends BaseModel{

    const TABLE_NAME = 'booktitle';

    public function getAll($select = ['*']): array
    {
        $bookTitles = $this->getAll_base(self::TABLE_NAME, $select);

        foreach ($bookTitles as $key => $bookTitle)
            unset($bookTitles[$key]['trend']);    // ignore attribute 'trend'

        return $bookTitles;
    }

    public function findById($id){
        $booktitle = $this->findById_base(self::TABLE_NAME, $id);
        unset($booktitle['trend']);

        return $booktitle;
    }

    public function create($data){
        $data['author'] = $this->array_to_string($data['author']);
        $data['category'] = $this->array_to_string($data['category']);
//        $data['bookid'] = Util::generateBarcode($this->getAll_base(self::TABLE_NAME, ['bookid']), 15);
        $data['quantity'] = 0;
        $data['quantityleft'] = 0;
        $data['trend'] = 0;
//        print_r($data);
//        die();
        return $this->create_base(self::TABLE_NAME, $data);
    }

    public function update($id, $data): string
    {
        return $this->update_base(self::TABLE_NAME, $id, $data);
    }

    public function delete($id): string
    {
        $book = $this->findById($id);
        if($book['quantityleft'] != $book['quantity'])
            return 'Deletion is not allow';
        return $this->delete_base(self::TABLE_NAME, $id);
    }

    private function array_to_string($data): string
    {
        $str = '';
        foreach ($data as $d){
            $str = $str.$d.SEPARATING_DELIMITER;
        }
        return substr($str, 0, strlen($str) - 1); // remove the last ';'
    }

}
