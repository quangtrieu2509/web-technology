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

    public static function verifyOwnedToken($accessToken, $userid): bool
    {
        $object = JWT::decode($accessToken, SECRET_KEY);
        $array = get_object_vars($object);

        if($array['id'] == $userid)
            return true;
        return false;
    }

    public static function verifyToken($accessToken){
        $object = JWT::decode($accessToken, SECRET_KEY);
        $array = get_object_vars($object);
        return $array['id'];
    }

    public static function getUserDataFromToken($accessToken): array
    {
        $object = JWT::decode($accessToken, SECRET_KEY);
        $array = get_object_vars($object);
        unset($array['email'], $array['role']);
        return $array;
    }


}
