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
 * 智能决策函数（“智能大脑”）
 * @param {object} messageObject - 从主文件传过来的单条消息数据
 */
function playNotificationOnMessageArrival(messageObject) {
  
  // --- 【规则1】检查这条消息是不是AI发的 ---
  // 根据您的代码，AI消息的角色是 "assistant"。如果不是，就不响。
  if (messageObject.role !== 'assistant') {
    return; // 用户自己发的消息，或者其他类型的消息，直接跳过
  }

  // --- 【规则2】检查当前是否在聊天界面 ---
  // 如果不在聊天界面（比如在看朋友圈），我们可能不希望它响。
  // 这个变量 `state.activeChatId` 是从您代码里看到的，应该能用。
  if (!state.activeChatId) {
    return; // 不在任何聊天中，也跳过
  }
  
  // --- 【最终决定】通过了所有检查，就播放提示音！---
  // playNotificationSound() 就是您在“兔k”项目里已经有的那个函数。
  playNotificationSound(); 
}