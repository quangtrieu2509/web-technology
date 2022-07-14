<?php

class BaseModel extends database {
    protected $connect;

    public function __construct(){
        $this->connect = $this->connect();
    }

    public function getAll_base($table, $select): array
    {
        $columns = implode(',', $select);

        $sql = "select ${columns} from ${table}";
        $query = $this->_query($sql);

        if(!$query) return [];

        $data = [];
        while ($row = mysqli_fetch_assoc($query))
            $data[] = $row;

        return $data;
    }

    public function findById_base($table, $id, $select = ['*']){
        $pk = $this->_getPK($table);
        $columns = implode(',', $select);
        $sql = "select ${columns} from ${table} where ${pk} = ${id} limit 1";
        $query = $this->_query($sql);
        return mysqli_fetch_assoc($query);
    }

    public function create_base($table, $data): string
    {
        $columns = implode(',', array_keys($data));
        $newValues = array_map(function ($value) { return "'". $value . "'"; }, array_values($data));
        $newValues = implode(',', $newValues);
        $sql = "insert into ${table}($columns) values (${newValues})";

//        die($sql);
        if($this->_query($sql)) return INSERT_SUCCESSFULLY;
        else return INSERT_FAILED;

    }

    public function delete_base($table, $id): string
    {
        $pk = $this->_getPK($table);
        $sql = "delete from ${table} where ${pk} = ${id}";
        if($this->_query($sql)) return DELETE_SUCCESSFULLY;
        else return DELETE_FAILED;
    }

    public function update_base($table, $id, $data): string
    {
        $dataSet = [];
        foreach ($data as $key => $value)
            $dataSet[] = "${key} = '${value}'";
        $sets = implode(',', $dataSet);

        $pk = $this->_getPK($table);
        $sql = "update ${table} set ${sets} where ${pk} = ${id}";

        if($this->_query($sql)) return UPDATE_SUCCESSFULLY;
        else return UPDATE_FAILED;
    }


    protected function _query($sql){
        return mysqli_query($this->connect, $sql);
    }

    /** get primary key from a certain table */
    protected function _getPK($table){
        $sqlID = "select COLUMN_NAME from INFORMATION_SCHEMA.KEY_COLUMN_USAGE
        where TABLE_NAME = '${table}' and CONSTRAINT_NAME = 'PRIMARY'";

        $queryGetID = $this->_query($sqlID);
        $arrayPK = [];
        while($row =  mysqli_fetch_assoc($queryGetID))
            $arrayPK[] = $row;

        return  $arrayPK[0]["COLUMN_NAME"];
    }
}
