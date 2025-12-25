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


// 确保在整个页面（包括所有原始脚本）都加载完毕后才执行我们的代码
window.addEventListener('load', () => {

    // ----------------------------------------------------------------------
    // 1. “函数包装”核心逻辑
    // ----------------------------------------------------------------------

    // 检查原始的 renderStickerPanel 函数是否存在于全局作用域
    if (typeof window.renderStickerPanel === 'function') {

        // a. 先把原始的函数保存到一个我们自己的变量里，以备后用
        const originalRenderStickerPanel = window.renderStickerPanel;

        // b. 现在，我们重新定义一个同名的全局函数，这就是我们的“包装器”
        //    当兔k的其他部分调用 renderStickerPanel() 时，实际上会调用我们这个新函数
        window.renderStickerPanel = function() {
            
            // 在我们的新函数里，我们先执行自己的搜索逻辑
            const searchInput = document.getElementById('sticker-search-input');
            const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';

            // 如果没有搜索词，就直接调用原始函数，不做任何改动
            if (!searchTerm) {
                originalRenderStickerPanel.apply(this, arguments);
                return; // 结束
            }
            
            // 如果有搜索词，我们就需要“欺骗”一下原始函数
            // CRITICAL: 先把全局的原始表情列表备份起来
            const realUserStickersBackup = [...state.userStickers];

            // CRITICAL: 然后，根据搜索词创建一个临时的、被过滤后的新列表
            const filteredStickers = realUserStickersBackup.filter(sticker => 
                sticker.name.toLowerCase().includes(searchTerm)
            );

            // CRITICAL: 把全局的表情列表暂时替换成我们过滤后的版本
            state.userStickers = filteredStickers;

            // 现在，调用原始的 renderStickerPanel 函数。
            // 它会以为自己正在处理完整的列表，但实际上它处理的是我们筛选过的列表！
            originalRenderStickerPanel.apply(this, arguments);

            // SUPER CRITICAL: 调用完毕后，立刻把原始的、完整的表情列表恢复回去！
            // 这一步至关重要，确保了我们不会影响程序的其他任何部分。
            state.userStickers = realUserStickersBackup;
        };

        console.log("[兔k修改]：已成功包装 renderStickerPanel 函数，搜索功能已准备就绪。");
    }


    // ----------------------------------------------------------------------
    // 2. 为搜索框绑定事件
    // ----------------------------------------------------------------------
    const stickerSearchInput = document.getElementById('sticker-search-input');
    if (stickerSearchInput) {
        // 当用户在搜索框里打字时
        stickerSearchInput.addEventListener('input', () => {
            // 就调用我们包装过的 renderStickerPanel 函数
            // 这会触发上面的整套逻辑
            window.renderStickerPanel();
        });
    }
});