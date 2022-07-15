<?php
require_once 'BookModel.php';

class BookTitleModel extends BaseModel{

    const TABLE_NAME = 'booktitle';
    private $bookModel;

    public function getAll($select = ['*']): array
    {
        $bookTitles = $this->getAll_base(self::TABLE_NAME, $select);

        foreach ($bookTitles as $key => $bookTitle)
            $bookTitles[$key] = $this->pre_setBookTitle($bookTitle);

        return $bookTitles;
    }

    public function getById($id){
        $booktitle = $this->findById_base(self::TABLE_NAME, $id);
        if($booktitle != null)
            $booktitle = $this->pre_setBookTitle($booktitle);

        return $booktitle;
    }

    public function findById($id){
        $this->bookModel = new BookModel();
        $booktitle = $this->getById($id);

        // get books from table 'book' that have the attribute 'booktitleid' is $id
        if($booktitle != null){
            $booktitlepk = $this->_getPK(self::TABLE_NAME);
            $booktitle['books'] = $this->bookModel->getByCriteria($booktitlepk, $id);
        }

        return $booktitle;
    }

    public function create($data): string
    {
        $data['author'] = $this->array_to_string($data['author']);
        $data['category'] = $this->array_to_string($data['category']);
        $data['quantity'] = 0;
        $data['quantityleft'] = 0;
        $data['trend'] = 0;

        return $this->create_base(self::TABLE_NAME, $data);
    }

    public function update($id, $data): string
    {
        if(array_key_exists('author', $data)) $data['author'] = $this->array_to_string($data['author']);
        if(array_key_exists('category', $data)) $data['category'] = $this->array_to_string($data['category']);
        return $this->update_base(self::TABLE_NAME, $id, $data);
    }

    public function delete($id): string
    {
        $this->bookModel = new BookModel();
        $book = $this->findById($id);
        if($book['quantityleft'] != $book['quantity'])
            return 'Deletion is not allow';

        // delete books from table 'book' before delete book title
        if($book['books'] != []){
            $booktitlepk = $this->_getPK(self::TABLE_NAME);
            if(!$this->bookModel->deleteByCriteria($booktitlepk, $id))
                return "Delete books of booktitle failed";
        }

        return $this->delete_base(self::TABLE_NAME, $id);
    }

    public function modifyCriteriaById($id, array $columns, $type): bool
    {
        $booktitlepk = $this->_getPK(self::TABLE_NAME);
        $strColumns = implode(',', $columns);

        $sql = "select ${strColumns} from ". self::TABLE_NAME ." where ${booktitlepk} = ${id} limit 1";
        $query = $this->_query($sql);

        $value = mysqli_fetch_assoc($query);
        if($value != null) {
            foreach ($value as $key => $v)
                if($type == INCREASE) $value[$key] = $v + 1;
                else $value[$key] = $v - 1;

            $this->update($id, $value);
            return true;
        }
        return false;
    }


    public function search(string $bookname, array $pages, array $publishyear, string $author, string $category): array
    {
        $strPages = "(pages <= ${pages['max']} and pages >= ${pages['min']})";
        $strYear = "(publishyear <= ${publishyear['max']} and publishyear >= ${publishyear['min']})";
        $strCategory = '(';
        if(strlen($category) == 0) $strCategory = "(category like '%${category}%')";
        else{
            $categories = $this->string_to_array($category);
            foreach ($categories as $cat)
                $strCategory = $strCategory . " category like '%${cat}%' or";

            $strCategory = substr($strCategory, 0, strlen($strCategory) - 2);
            $strCategory = $strCategory. ')';
        }

        $sql = "select * from ". self::TABLE_NAME . " where bookname like '%${bookname}%' "
            . "and author like '%${author}%' and ${strCategory} and ${strPages} and ${strYear}";
        $query = $this->_query($sql);

        if(!$query) return [];

        $data = [];
        while ($row = mysqli_fetch_assoc($query))
            $data[] = $this->pre_setBookTitle($row);

        return $data;
    }

    /** convert array to string to store to db */
    private function array_to_string(array $data): string
    {
        $str = '';
        foreach ($data as $d){
            $str = $str.trim($d).SEPARATING_DELIMITER;
        }
        return substr($str, 0, strlen($str) - 1); // remove the last ';'
    }

    /** convert string to array to return APIs */
    private function string_to_array(string $data): array
    {
        if(strlen($data) == 0) return [];
        return explode(SEPARATING_DELIMITER, $data);
    }

    /** pre-set book title before returning APIs */
    private function pre_setBookTitle($var){
        unset($var['trend']);
        $var['author'] = $this->string_to_array($var['author']);
        $var['category'] = $this->string_to_array($var['category']);
        return $var;
    }

    public function checkAvailableBook($booktitleid)
    {
        $this->bookModel = new BookModel();

        $books = $this->bookModel->getAvailableBooks($booktitleid);
        if($books == []) return false;
        else return $books[0]['bookid'];
    }

}
