// =====================================================================
// 文件位置: server/index.js
// 模块描述: 古建大匠 AI 问答后端中转服务
// 核心技术: Express.js, 阿里云 DashScope (千问大模型), Server-Sent Events (SSE)
// =====================================================================

require('dotenv').config(); // 加载 .env 文件中的环境变量
const express = require('express'); // 引入 Express Web 框架
const cors = require('cors'); // 引入跨域中间件，允许 Vue 前端访问
const { OpenAI } = require('openai'); // 引入 OpenAI SDK（用于兼容调用千问）

const app = express(); // 实例化 Express 应用
const port = 3000; // 定义后端服务运行的端口

// 配置中间件
app.use(cors()); // 允许所有来源的跨域请求
app.use(express.json()); // 解析请求体中的 JSON 数据

// 初始化大模型客户端，指向阿里云千问的兼容网关
const client = new OpenAI({
apiKey: process.env.DASHSCOPE_API_KEY, // 从环境变量读取千问密钥
baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1", // 阿里云兼容端点
});

// 定义 AI 聊天流式接口
app.post('/api/chat', async (req, res) => {
const { message } = req.body; // 从前端请求头中提取用户发送的消息

// 基础校验：防止空消息请求
if (!message) {
    return res.status(400).json({ error: 'Message is required' });
}

// 设置 HTTP 响应头，开启 SSE (Server-Sent Events) 流式传输
res.setHeader('Content-Type', 'text/event-stream');
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('Connection', 'keep-alive');

try {
    // 调用大模型 API，开启 stream 模式
    const stream = await client.chat.completions.create({
    model: "qwen-plus", // 指定使用的千问模型版本
    messages: [
        // System Prompt 设定 AI 人设（论文亮点：Prompt Engineering）
        { 
        role: "system", 
        content: "你是一位精通中国古代建筑史和榫卯力学的营造大匠。请用专业但易懂的语言，解答关于古建、斗拱、榫卯结构的技术问题。回答要精炼，带有一定的古风底蕴。" 
        },
        { role: "user", content: message } // 传入用户的实际问题
    ],
    stream: true, // 核心机制：允许数据分块返回
    });

    // 遍历数据流，逐块推送给前端
    for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || ""; // 提取文字增量
    if (content) {
        // 按照 SSE 规范格式化数据并发送
        res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
    }
    }
    
    // 数据流传输完毕，发送结束标识
    res.write('data: [DONE]\n\n');
    res.end(); // 关闭响应连接

} catch (error) {
    // 异常捕获与日志记录
    console.error('大模型接口调用失败:', error);
    res.write(`data: ${JSON.stringify({ error: '大匠正在闭关研习，请稍后再试。' })}\n\n`);
    res.end();
}
});

// 启动服务并监听指定端口
app.listen(port, () => {
console.log(`大匠智脑后端服务已启动: http://localhost:${port}`);
});