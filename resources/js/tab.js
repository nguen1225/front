/*!*******************************************************************!*\
  !*** タブ切り替え ***!
  \*******************************************************************/
$(function() {
  let tabs = $(".tab"); // tabのクラスを全て取得し、変数tabsに配列で定義
  $(".tab").on("click", function() { // tabをクリックしたらイベント発火
    $(".active").removeClass("active"); // activeクラスを消す
    $(this).addClass("active"); // クリックした箇所にactiveクラスを追加
    const index = tabs.index(this); // クリックした箇所がタブの何番目か判定し、定数indexとして定義
    $(".content").removeClass("show").eq(index).addClass("show"); // showクラスを消して、contentクラスのindex番目にshowクラスを追加
  })
})


$(function() {
 
  // ①タブをクリックしたら発動
  $('.tab li').click(function() {
 
    // ②クリックされたタブの順番を変数に格納
    var index = $('.tab li').index(this);
 
    // ③クリック済みタブのデザインを設定したcssのクラスを一旦削除
    $('.tab li').removeClass('active');
 
    // ④クリックされたタブにクリック済みデザインを適用する
    $(this).addClass('active');
 
    // ⑤コンテンツを一旦非表示にし、クリックされた順番のコンテンツのみを表示
    $('.area ul').removeClass('show').eq(index).addClass('show');
 
  });
});
/*!*******************************************************************!*\
  !*** ここまで ***!
  \*******************************************************************/