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
//        $data['booktitleid'] = Util::generateBarcode($this->getAll_base(self::TABLE_NAME, ['booktitleid']), 15);
        $data['quantity'] = 0;
        $data['quantityleft'] = 0;
        $data['trend'] = 0;
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

}
