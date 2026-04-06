// =====================================================================
// 文件位置: server/index.js
// 描述: 强化版 AI 中枢 - 专门针对“原理图”进行了 Prompt 工程优化
// =====================================================================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.DASHSCOPE_API_KEY,
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

// --- 接口 A: 流式对话 ---
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
        const stream = await client.chat.completions.create({
            model: "qwen-plus",
            messages: [
                { 
                    role: "system", 
                    content: "你是一位精通中国古建的营造大匠。请用专业视角解答。如果用户提到需要看原理图，请在文字中详细描述结构，并提醒用户可以切换到“丹青”模式尝试生成线稿图。" 
                },
                { role: "user", content: message }
            ],
            stream: true,
        });

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
        }
        res.write('data: [DONE]\n\n');
        res.end();
    } catch (error) {
        res.write(`data: ${JSON.stringify({ error: '连接异常' })}\n\n`);
        res.end();
    }
});

// --- 接口 B: 丹青绘画 (强化版核心) ---
app.post('/api/draw', async (req, res) => {
    const { prompt } = req.body;
    
    // 强制增加结构化指令：线稿、白底、等轴侧图、建筑解析
    const enhancedPrompt = `(Architectural technical drawing:1.5), (Structural decomposition:1.4), (Line art:1.2), Dougong bracket system, Sunmao structure, precise lines, labeled parts, white background, no landscape, isometric view, ${prompt}`;

    try {
        const response = await axios.post(
            'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis',
            {
                model: "wanx-v1",
                input: { prompt: enhancedPrompt },
                parameters: { 
                    style: "<auto>", 
                    size: "1024*1024", 
                    n: 1 
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.DASHSCOPE_API_KEY}`,
                    'X-DashScope-Async': 'enable'
                }
            }
        );

        const taskId = response.data.output.task_id;
        
        let imgUrl = null;
        for (let i = 0; i < 20; i++) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const check = await axios.get(`https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`, {
                headers: { 'Authorization': `Bearer ${process.env.DASHSCOPE_API_KEY}` }
            });
            if (check.data.output.task_status === 'SUCCEEDED') {
                imgUrl = check.data.output.results[0].url;
                break;
            }
        }
        res.json({ url: imgUrl });
    } catch (error) {
        res.status(500).json({ error: '绘图失败' });
    }
});

app.listen(port, () => console.log(`后端已启动: http://localhost:${port}`));