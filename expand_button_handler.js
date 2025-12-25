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




/**
 * 智能决策函数（“智能大脑”） - 【测试版本】
 * @param {object} messageObject - 从主文件传过来的单条消息数据
 */
function playNotificationOnMessageArrival(messageObject) {
  
  // --- 【规则1】检查这条消息是不是AI发的 ---
  if (messageObject.role !== 'assistant') {
    return; 
  }

  // --- 【规则2 - 临时禁用】我们暂时跳过这一步检查，看看程序是否能恢复正常 ---
  /*  <-- 请注意这里的注释符号
  if (!state.activeChatId) {
    return; 
  }
  */  // <-- 和这里的注释符号
  
  // --- 【最终决定】播放提示音！---
  playNotificationSound(); 
}
