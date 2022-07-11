<?php

class AuthModel extends BaseModel{
    const TABLE_NAME = 'account';

    public function signIn(array $data) {
        $id = $this->check($data['username'], $data['password']);
        if($id != -1) {
            $account = $this->findById_base(self::TABLE_NAME, $id, ['id', 'username', 'email', 'role']);
            $tokenAccess = JwtUtils::generateJwtToken($account);
            return ['user'=>$account, 'accessToken'=>$tokenAccess];
        }
        else return "Username or Password invalid";
    }

    public function signUp(array $data){
        if(!$this->checkExist($data['username'], $data['email']))
            return "Username of Email existed";

        $data['barcode'] = Util::generateBarcode($this->getAll_base(self::TABLE_NAME, ['barcode']));
        $data['password'] = md5($data['password']);
        $data['islock'] = 0;

        return $this->create_base(self::TABLE_NAME, $data);
//        unset($returnedData['password']);
    }

    private function check($un, $pw){
        $data = $this->getAll_base(self::TABLE_NAME, ['*']);
        foreach ($data as $value)
            if($value['username'] == $un && $value['password'] == md5($pw))
                return $value['id'];
        return -1;
    }

    private function checkExist($un, $em): bool {
        $data = $this->getAll_base(self::TABLE_NAME, ['*']);
        foreach ($data as $value)
            if($value['username'] == $un && $value['email'] == $em)
                return false;
        return true;
    }

}
