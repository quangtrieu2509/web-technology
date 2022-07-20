<?php
require_once 'BookTitleModel.php';

class CartModel extends BaseModel{

    const TABLE_NAME = 'cart';
    private $bookTitleModel;

    public function getAllBookByUserId($token){
        $this->bookTitleModel = new BookTitleModel();

        $user = JwtUtils::getUserDataFromToken($token);
        $userId = $user['id'];

        $sql = "select * from ". self::TABLE_NAME . " where userid = ${userId}";
        $query = $this->_query($sql);

        if(!$query) return [];

        $data = [];
        while ($row = mysqli_fetch_assoc($query))
            $data[] = $this->bookTitleModel->getById($row['booktitleid']);

        return $data;
    }

    public function addToCart($data, $token): string
    {

        $user = JwtUtils::getUserDataFromToken($token);
        $data['userid'] = $user['id'];

        $books = $this->getAllBookByUserId($token);
        foreach ($books as $book)
            if($data['booktitleid'] == $book['booktitleid'])
                return ALREADY_ADDED_BOOK;

        return $this->create_base(self::TABLE_NAME, $data);
    }

    public function deleteFromCart($booktitleid, $token): string
    {
        $user = JwtUtils::getUserDataFromToken($token);
        $userId = $user['id'];

        $sql = "delete from ". self::TABLE_NAME ." where userid = ${userId} and booktitleid = ${booktitleid}";

        if($this->_query($sql)) return DELETE_SUCCESSFULLY;
        else return DELETE_FAILED;

    }

}
