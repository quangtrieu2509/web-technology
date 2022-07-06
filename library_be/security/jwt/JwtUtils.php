<?php

class JwtUtils {

    public static function generateJwtToken(array $account){
        return JWT::encode($account, SECRET_KEY);
    }

    public static function verifyAdminToken($accessToken): bool
    {
        $object = JWT::decode($accessToken, SECRET_KEY);
        $array = get_object_vars($object);

        if($array['role'] == 1)
            return true;
        return false;
    }

    public static function verifyUserToken($accessToken): bool
    {
        $object = JWT::decode($accessToken, SECRET_KEY);
        $array = get_object_vars($object);

        if($array['role'] == 2)
            return true;
        return false;
    }

    public static function verifyOwnedToken($accessToken, $username): bool
    {
        $object = JWT::decode($accessToken, SECRET_KEY);
        $array = get_object_vars($object);

        if($array['username'] == $username)
            return true;
        return false;
    }


}