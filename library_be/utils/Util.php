<?php

class Util{

    public static function generateBarcode($barcodes, $len = 13){
        $shuffleStr = '';
        for($i = 0; $i <= 9; $i++)
            for($j = 0; $j < $len; $j++)
                $shuffleStr = $shuffleStr . $i;

        $barcode = '';
        $flag = true;
        $barcodes = json_encode($barcodes);
        while($flag){
            $barcode = substr(str_shuffle($shuffleStr), 0, $len);
            $flag = false;
            if(strstr($barcodes, $barcode)) $flag = true;
        }

        return $barcode;
    }


}
