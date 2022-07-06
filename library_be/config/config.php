<?php

const SECRET_KEY = 'trieudeptrai';

// database
const DB_HOST = 'localhost';
const DB_USERNAME = 'root';
const DB_PASSWORD = '123456';
const DB_NAME = 'library_management';

//response message
const NO_TOKEN_MESSAGE = 'There is no token';
const INVALID_TOKEN_MESSAGE = 'Token is not valid';
const UNAUTHORIZED_MESSAGE = 'You are not authorized';

//checkedType
const VERIFY_ADMIN_TOKEN = 1;
const VERIFY_USER_TOKEN = 2;
const VERIFY_OWNER_TOKEN = 0;