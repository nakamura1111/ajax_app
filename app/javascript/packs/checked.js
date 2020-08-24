function check(){
  const posts = document.querySelectorAll(".post");       // セレクタ指定による要素の取得

  posts.forEach( function(post) {
    post.addEventListener("click", () => {
      if (post.getAttribute("data-load") != null) {       
        return null;                                      // 二回目以降は以下の処理を行えないようにする
      }
      post.setAttribute("data-load", "true");             // 一回処理が実行されたことをHTMLに記録
      const postId = post.getAttribute("data-id");        // カスタムデータ(投稿文に関するレコードのid)を取得
      const XHR = new XMLHttpRequest();                   // リクエスト送信オブジェクト生成
      XHR.open("GET", `/posts/${postId}`, true);          // HTTPメソッドとエンドポイントと非同期通信か否かを指定
      XHR.responseType = "json";                          // レスポンスのデータ形式を指定
      XHR.send();                                         // リクエスト送信
      XHR.onload = () => {                                // レスポンス受信のイベント検知したら
        if (XHR.status != 200) {                          // レスポンスが正常でなかった場合
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        const item = XHR.response.post;                   // レスポンスのpostプロパティ（キー）のデータを変数に格納
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false){
          post.removeAttribute("data-check");
        }
      }
    });
  });
}

setInterval(check, 5000);                               // 1000ms ごとに check 関数を実行