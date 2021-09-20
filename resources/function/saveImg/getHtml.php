<?php

if (count($argv) < 3) {
    echo "[usage] {$argv[0]} file text\n";
}

$inputText = $argv[1];

$html = file_get_contents($inputText);

// リンク
error_log(var_export($html, true), 3, './getHtml.html');


// 画像
if( preg_match('/<img src=".*>/', $html, $result) ){
    error_log(var_export($result, true), 3, './getImg.html');
}else{
    echo 'No match' . PHP_EOL;
}

if( preg_match_all('/<img src=".*>/', $html, $result) ){
    error_log(var_export($result, true), 3, './getImg.html');
}else{
    echo 'No match' . PHP_EOL;
}


// リンク
if( preg_match('/<link rel=".*>/', $html, $result) ){
    error_log(var_export($result, true), 3, './getLink.html');
}else{
    echo 'No match' . PHP_EOL;
}

if( preg_match_all('/<link rel=".*>/', $html, $result) ){
    error_log(var_export($result, true), 3, './getLink.html');
}else{
    echo 'No match' . PHP_EOL;
}
