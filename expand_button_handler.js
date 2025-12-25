// 等待整个页面的HTML内容都加载完毕后，再执行我们的代码
document.addEventListener('DOMContentLoaded', function() {

    // 1. 找到那个“+”号按钮
    const expandButton = document.getElementById('chat-expand-btn');

    // 2. 检查按钮是否存在，如果存在，就给它添加功能
    if (expandButton) {
        // 3. 给按钮添加一个“点击”事件监听器
        expandButton.addEventListener('click', function() {
            // 当按钮被点击时，给<body>标签切换'chat-actions-expanded'这个CSS类
            document.body.classList.toggle('chat-actions-expanded');
        });
    }

});




// 我们只需要留下这个“暂停”的魔法
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}


document.addEventListener('DOMContentLoaded', () => {

    const stickerSearchInput = document.getElementById('sticker-search-input');

    // 确认页面上存在ID为 sticker-search-input 的元素
    if (stickerSearchInput) {

        // 为搜索框添加 'input' 事件监听
        // 当用户在搜索框里打字或清空内容时，此事件会被触发
        stickerSearchInput.addEventListener('input', () => {
            
            // 确认 renderStickerPanel 函数在当前作用域中是存在的
            if (typeof renderStickerPanel === 'function') {
                // 调用兔k中负责渲染表情的函数。
                // 该函数会自动读取搜索框的值并过滤表情。
                renderStickerPanel(); 
            } else {
                // 如果因为某些原因找不到，在控制台报错，方便排查问题
                console.error("[兔k修改]：错误！未能找到全局函数 renderStickerPanel()。请检查脚本加载顺序。");
            }
        });
    }
});