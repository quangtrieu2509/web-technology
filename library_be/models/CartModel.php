<?php

class CartModel extends BaseModel{

    const TABLE_NAME = 'cart';

    public function findById($id){
        $cart = $this->findById_base(self::TABLE_NAME, $id);

        return $cart;
    }

    public function deleteFromCart($id): string
    {
        return $this->delete_base(self::TABLE_NAME, $id);
    }

}
