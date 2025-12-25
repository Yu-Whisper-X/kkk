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




// ===================================================================
// =========== 新功能最终版：带“暂停”功能的消息提示音 ============
// ===================================================================

// 这是一个让代码“暂停”一下的魔法
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * 这个新函数会接收【一大堆】消息
 * 然后一个一个地、带暂停地播放提示音
 * @param {Array} messageBatchArray - 主程序传过来的一堆消息
 */
async function playSoundsForMessageBatch(messageBatchArray) {
  
  // 循环处理这一堆消息里的每一条
  for (const message of messageBatchArray) {

    // 只有AI发的消息才需要响
    if (message && message.role === 'assistant') {
      
      // 播放声音
      playNotificationSound();
      
      // 【关键！】播放后，强制暂停一小会儿（0.15秒）
      await sleep(150); 
    }
  }
}