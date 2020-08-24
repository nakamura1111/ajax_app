function memo(){
  const submit = document.getElementById("submit");
  
  submit.addEventListener("click", function(e){                 // 、引数必要
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", `posts`, true);                            //    /?content=${e.content}要らない？こっちでもできる？
    XHR.responseType = "json";
    XHR.send(formData);                                         // 送信時に送信内容を引数として記述
    XHR.onload = function () {
      if(XHR.status != 200){                                    // 
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      const list = document.getElementById("list");
      console.log(list);
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
            ${item.content}
          </div>
        </div>
        `;
      list.insertAdjacentHTML("afterend", HTML);                // 「この要素」にHTMLを挿入するよ、詳細な場所は「第一引数に記載」で書き込み内容は「第二引数に記載」だよ
      formText.value = "";                                      // 「この要素」に入っている値（ここでは入力フォームの文章）はなくなるよ（リセットされるよ）
    };
    e.preventDefault();                                         // 
  });
}

window.addEventListener("load", memo);