/**
 * 文件: expand_button_handler.js
 * 描述: [最终修复版] 为兔k表情面板添加搜索功能，不修改任何原始JS文件。
 *      - 采用“事后筛选DOM”策略，兼容性最强。
 */

document.addEventListener('DOMContentLoaded', () => {
    // 设置检查器，等待兔k核心函数加载完成
    const interval = setInterval(() => {
        if (typeof window.renderStickerPanel === 'function') {
            clearInterval(interval); // 成功捕获，停止检查

            const originalRenderStickerPanel = window.renderStickerPanel;

            // 包装原始函数
            window.renderStickerPanel = function() {
                // 1. 先让原始函数毫无干扰地执行，把所有表情都画出来
                originalRenderStickerPanel.apply(this, arguments);

                // 2. 在原始函数执行完毕后，我们再进行二次处理
                const searchInput = document.getElementById('sticker-search-input');
                const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';

                // 如果没有搜索词，就什么也不做
                if (!searchTerm) {
                    return;
                }

                const grid = document.getElementById('sticker-grid');
                const allStickerItems = grid.querySelectorAll('.sticker-item');
                let visibleCount = 0;

                allStickerItems.forEach(item => {
                    const nameEl = item.querySelector('.sticker-name');
                    if (nameEl) {
                        const stickerName = nameEl.textContent.toLowerCase();
                        
                        // 3. 检查每个表情的名字，不匹配的就隐藏
                        if (stickerName.includes(searchTerm)) {
                            item.style.display = ''; // 恢复显示
                            visibleCount++;
                        } else {
                            item.style.display = 'none'; // 隐藏
                        }
                    }
                });

                // 4. （可选）如果一个都没找到，显示提示信息
                const oldMessage = grid.querySelector('.search-no-results');
                if (oldMessage) {
                    oldMessage.remove();
                }
                if (visibleCount === 0 && allStickerItems.length > 0) {
                    const messageEl = document.createElement('p');
                    messageEl.textContent = '没有找到匹配的表情哦~';
                    messageEl.className = 'search-no-results';
                    messageEl.style.cssText = 'text-align:center; color: var(--text-secondary); grid-column: 1 / -1;';
                    grid.appendChild(messageEl);
                }
            };

            // 绑定输入事件（这部分逻辑不变）
            const stickerSearchInput = document.getElementById('sticker-search-input');
            if (stickerSearchInput) {
                stickerSearchInput.addEventListener('input', () => {
                    window.renderStickerPanel();
                });
            }

            console.log("[兔k修改]：已采用“事后筛选”模式激活搜索功能！");
        }
    }, 100);
}





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
