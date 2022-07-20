<?php
require_once 'BookTitleModel.php';

class BookModel extends BaseModel{

    const TABLE_NAME = 'book';
    private $bookTitle;

    public function getAll($select = ['*']): array
    {
        return $this->getAll_base(self::TABLE_NAME, $select);
    }

    public function findById($id){
        return $this->findById_base(self::TABLE_NAME, $id);
    }

    public function create($data): string
    {
        $this->bookTitle = new BookTitleModel();
        $incr = $this->bookTitle->modifyCriteriaById($data['booktitleid'], ['quantity', 'quantityleft'], INCREASE);
        if(!$incr) return NULL_BOOK_TITLE_ID;

        $data['bookid'] = Util::generateBarcode($this->getAll(['bookid']), 15);
        $data['status'] = AVAILABLE;
        $result = $this->create_base(self::TABLE_NAME, $data);

        if($result != INSERT_SUCCESSFULLY)
            $this->bookTitle->modifyCriteriaById($data['booktitleid'], ['quantity', 'quantityleft'], DECREASE);

        return $result;
    }

    public function update($id, $data): string
    {
        $this->bookTitle = new BookTitleModel();

        $book = $this->findById($id);
        if($book == null) return NULL_BOOK;

        $check = $this->checkUpdateBook($book['status'], $data['status']);
        if($check == INCREASE)
            $this->bookTitle->modifyCriteriaById($book['booktitleid'], ['quantityleft'], INCREASE);
        else if($check == DECREASE)
            $this->bookTitle->modifyCriteriaById($book['booktitleid'], ['quantityleft'], DECREASE);

        return $this->update_base(self::TABLE_NAME, $id, $data);
    }

    private function checkUpdateBook($oldStatus, $newStatus)
    {
        // available -> unavailable (may be or broken_or_lost -> unavailable) => quantityleft--
        if(($oldStatus == AVAILABLE || $oldStatus == BROKEN_OR_LOST) && $newStatus == UNAVAILABLE)
            return DECREASE;
        // unavailable -> available or unavailable -> broken_or_lost => quantityleft++
        else if($oldStatus == UNAVAILABLE &&($newStatus == AVAILABLE || $newStatus == BROKEN_OR_LOST))
            return INCREASE;
        // other cases => quantityleft is not changed
        return -1;
    }

    public function delete($id): string
    {
        $this->bookTitle = new BookTitleModel();
        $book = $this->findById($id);
        if($book['status'] == UNAVAILABLE)
            return NOT_ALLOWED_DELETE_BOOK;

        $result = $this->delete_base(self::TABLE_NAME, $id);
        if($result == DELETE_SUCCESSFULLY)
            $this->bookTitle->modifyCriteriaById($book['booktitleid'], ['quantity', 'quantityleft'], DECREASE);

        return $result;
    }

    public function getByCriteria($column, $value): array
    {
        $books = [];
        $sql = "select * from ". self::TABLE_NAME ." where ${column} = ${value}";
        $query = $this->_query($sql);

        if($query)
            while ($row = mysqli_fetch_assoc($query))
                $books[] = $row;
        return $books;
    }

    public function deleteByCriteria($column, $value): bool
    {
        $sql = "delete from ". self::TABLE_NAME ." where ${column} = ${value}";
        if(!$this->_query($sql)) return false;
        return true;
    }

    public function getAvailableBooks($booktitleid): array
    {
        $books = [];
        $sql = "select * from ". self::TABLE_NAME ." where booktitleid = ${booktitleid} and status = 0";
        $query = $this->_query($sql);

        if($query)
            while ($row = mysqli_fetch_assoc($query))
                $books[] = $row;
        return $books;
    }

    public function search($bookid)
    {
        $sql = "select * from ". self::TABLE_NAME . " where bookid like '${bookid}' ";
        $query = $this->_query($sql);

        if(!$query) return [];

        $data = [];
        while ($row = mysqli_fetch_assoc($query))
            $data[] = $row;

        return $data;
    }

}
