export const DEFAULT_HTML = `<script>
    !function(html){
      var
        title       = 'Titleを追加',
        messages    = ['1行目を追加','2行目を追加','3行目を追加'],
        prefix      = 'optimize';

      // 配列をHTMLのdivに変換
      var message = messages.map(function(item) { return '<div class="' + prefix + '-item">' + item + '</div>'; }).join('');

      var popupContainer = document.createElement('div');
      popupContainer.className = prefix + '-origin';
      popupContainer.style.position = 'fixed';
      popupContainer.style.right = '30px';
      popupContainer.style.bottom = '15px';
      popupContainer.style.zIndex = '999999';
      popupContainer.style.width = '200px';

      // コンテンツを挿入
      popupContainer.innerHTML = html
        .replace(/PREFIX/g, prefix)
        .replace(/TITLE/, title)
        .replace(/MESSAGE/, message);

      // ポップアップをページに追加
      document.body.appendChild(popupContainer);
    }(
    '<div class="PREFIX-origin">\\
      <style>\\
      .PREFIX-banner{padding:20px;text-align:left;background-color:white;border:1px solid #ccc;border-radius:5px;position:relative;}\\
      .PREFIX-title{font-size:16px;margin-bottom:10px;color:#0C00C5; font-weight: bold; text-align: left;}\\
      .PREFIX-message{font-size:14px;line-height:1.5;text-align:left;}\\
      .PREFIX-item {margin-bottom: 8px;}\\
      </style>\\
      <div class="PREFIX-banner">\\
        <h2 class="PREFIX-title">TITLE</h2>\\
        <p class="PREFIX-message">MESSAGE</p>\\
      </div>\\
    </div>'
    )
</script>`
