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


/**
 * 文件: expand_button_handler.js
 * 描述: [最终版] 为兔k表情面板添加搜索功能，不修改任何原始JS文件。
 *      - 使用 DOMContentLoaded 确保执行时机正确。
 *      - 增加延时和重试机制，确保能捕获到兔k的核心函数和变量。
 */

document.addEventListener('DOMContentLoaded', () => {
    // 设置一个检查器，因为兔k的核心对象可能比我们的脚本晚一点才初始化完成
    const interval = setInterval(() => {
        // 我们要检查两个关键目标：`state` 变量和 `renderStickerPanel` 函数是否都已准备就绪
        if (typeof window.state !== 'undefined' && typeof window.renderStickerPanel === 'function') {
            
            // 一旦两个目标都出现，就停止重复检查，避免不必要的性能消耗
            clearInterval(interval);

            // ----------------------------------------------------------------------
            // 1. “函数包装”核心逻辑 (和之前一样，但现在能确保目标存在)
            // ----------------------------------------------------------------------
            const originalRenderStickerPanel = window.renderStickerPanel;

            window.renderStickerPanel = function() {
                const searchInput = document.getElementById('sticker-search-input');
                const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';

                // 如果没有搜索词，或者 state/userStickers 还不存在，就直接调用原始函数
                if (!searchTerm || !window.state || !window.state.userStickers) {
                    return originalRenderStickerPanel.apply(this, arguments);
                }
                
                // 执行搜索逻辑
                const realUserStickersBackup = [...window.state.userStickers];
                const filteredStickers = realUserStickersBackup.filter(sticker => 
                    sticker.name.toLowerCase().includes(searchTerm)
                );
                window.state.userStickers = filteredStickers;
                
                // 调用原始函数进行渲染
                originalRenderStickerPanel.apply(this, arguments);
                
                // 立刻恢复原始数据
                window.state.userStickers = realUserStickersBackup;
            };

            // ----------------------------------------------------------------------
            // 2. 为搜索框绑定事件 (和之前一样)
            // ----------------------------------------------------------------------
            const stickerSearchInput = document.getElementById('sticker-search-input');
            if (stickerSearchInput) {
                stickerSearchInput.addEventListener('input', () => {
                    // 调用我们包装过的新函数
                    window.renderStickerPanel();
                });
            }

            console.log("[兔k修改]：已成功捕获并包装 renderStickerPanel，搜索功能已激活！");

        }
    }, 100); // 每 100 毫秒检查一次，直到成功
});
