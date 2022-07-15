<?php

class CartModel extends BaseModel{

    const TABLE_NAME = 'cart';

    public function findById($id){
        $cart = $this->findById_base(self::TABLE_NAME, $id);

        return $cart;
    }

    public function addToCart($data){
        return $this->create_base(self::TABLE_NAME, $data);
    }

    public function deleteFromCart($id): string
    {

        return $this->delete_base(self::TABLE_NAME, $id);
    }

}
