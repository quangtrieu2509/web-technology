<?php

class AuthModel extends BaseModel{
    const TABLE_NAME = 'account';

    public function signIn(array $data) {
        $id = $this->check($data['username'], $data['password']);

        if($id == -1) return "Your account is locked";
        else if($id == -2) return "Username or Password invalid";
        else{
            $account = $this->findById_base(self::TABLE_NAME, $id, ['id', 'username', 'email', 'role']);
            $tokenAccess = JwtUtils::generateJwtToken($account);
            return ['user'=>$account, 'accessToken'=>$tokenAccess];
        }
    }

    public function signUp(array $data): string
    {
        if(!$this->checkExist($data['username'], $data['email']))
            return "Username or Email existed";

        $data['barcode'] = Util::generateBarcode($this->getAll_base(self::TABLE_NAME, ['barcode']));
        $data['password'] = md5($data['password']);
        $data['islock'] = 0;
        $data['role'] = VERIFY_USER_TOKEN;

        return $this->create_base(self::TABLE_NAME, $data);
    }

    private function check($un, $pw){
        $data = $this->getAll_base(self::TABLE_NAME, ['*']);

        foreach ($data as $value)
            if($value['username'] == $un && $value['password'] == md5($pw)){
                if($value['islock'] == 1) return -1;
                else return $value['id'];
            }

        return -2;
    }

    private function checkExist($un, $em): bool {
        $data = $this->getAll_base(self::TABLE_NAME, ['*']);
        foreach ($data as $value)
            if($value['username'] == $un && $value['email'] == $em)
                return false;
        return true;
    }

}
