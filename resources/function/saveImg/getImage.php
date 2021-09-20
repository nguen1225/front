<?php
if (count($argv) < 3) {
    echo "[usage] {$argv[0]} file text\n";
}

$inputText = $argv[1];

if (!isset($inputText))
{
    throw new Exception('The first argument is required for url.');
}

$url = $inputText;
if (!preg_match('/^(http|https):\/\//', $url))
{
    throw new Exception('Invalid url.');
}

$header = @get_headers($url);
if (!preg_match('/^HTTP\/.*\s+200\s/i', $header[0]))
{
    throw new Exception('Target page does not found.');
}


// 画像保存先
$savePath = '/Users/msnowrobin213/Desktop/html/saveImg/'; //任意の場所

// htmlソース取得
$htmlSource = file_get_contents($inputText);

// if( preg_match('/<img src=".*>/', $htmlSource, $res) ){
//     error_log(var_export($res, true), 3, './getImg.html');
// }else{
//     echo 'No match' . PHP_EOL;
// }

if ( $htmlSource )
{
    // 画像ファイルのURL取得
    preg_match_all( '/src=".*?(\.jpg|\.jpeg|\.gif|\.png)"/i', $htmlSource, $res ); // (\.jpg|\.jpeg|\.gif|\.png) ここは必要に応じて変更
    error_log(var_export($res, true), 3, './getImg.html');

    if ( isset( $res[ 1 ] ) )
    {
        foreach( $res[ 1 ] as $targetImgUrl )
        {
            // ファイル名生成
            $fileNameTmp = explode( '/', $targetImgUrl );
            $fileNameTmp = array_reverse( $fileNameTmp );
            $fileName = $fileNameTmp[ 0 ];

            // 画像保存
            $imgData = @file_get_contents( $targetImgUrl );
            if ( $imgData )
            {
                file_put_contents( IMG_SAVE_PATH . $fileName, $imgData );
            }
        }
    }
}

//画像のパス
$image_path = "https://www.jp.square-enix.com/common/templates/images/logo_ipn_b.gif";

//保存するファイル名
$file_name = 'logoff7.gif';

$image = file_get_contents($image_path);

$save_path = IMAGES_PATH.$file_name;

file_put_contents($savePath, $savepath, $image);
