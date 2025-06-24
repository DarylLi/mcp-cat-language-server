# 猫语 MCP 服务器 🐱

一个可爱的 Model Context Protocol (MCP) 服务器，专门用于将中文翻译成萌萌的猫语格式！

## ✨ 特色功能

- 🌟 **智能猫语翻译**：根据文本内容生成不同风格的猫语
- 📝 **单句翻译**：将中文转换为"喵！喵！(原文意思)"格式
- 📋 **批量翻译**：一次性翻译多个文本
- 🎲 **随机猫语**：生成随机的猫咪表达
- 💬 **智能对话**：与猫咪进行有趣的对话交流

## 🛠️ 技术特点

- **现代化架构**：使用最新的 `McpServer` API
- **类型安全**：基于 TypeScript 和 Zod 构建
- **智能翻译**：情感识别和特殊场景处理
- **易于集成**：完整的 MCP 协议支持

## 📦 安装

### 前置要求

- Node.js 18 或更高版本
- npm 或 yarn

### 从源码安装

```bash
git clone <repository-url>
cd chat-mcp
npm install
npm run build
```

### 使用 npx（推荐）

```bash
npx mcp-cat-language-server
```

## 🚀 使用方法

### 在 Claude Desktop 中使用

1. 打开 Claude Desktop 配置文件：

   ```bash
   code ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

2. 添加以下配置：

   ```json
   {
     "mcpServers": {
       "cat-language": {
         "command": "npx",
         "args": ["mcp-cat-language-server"]
       }
     }
   }
   ```

3. 重启 Claude Desktop

### 命令行使用

```bash
# 直接运行服务器
node dist/index.js

# 或使用 npx
npx mcp-cat-language-server
```

## 🔧 API 参考

### 工具列表

#### 1. `translate_to_cat`

将单个中文文本翻译为猫语。

**参数：**

- `text` (string): 要翻译的中文文本

**示例：**

```json
{
  "name": "translate_to_cat",
  "arguments": {
    "text": "今天天气真好"
  }
}
```

**响应：**

```json
{
  "content": [
    {
      "type": "text",
      "text": "喵喵～～喵～喵♪(今天天气真好)"
    }
  ]
}
```

#### 2. `translate_multiple_to_cat`

批量翻译多个中文文本。

**参数：**

- `texts` (string[]): 要翻译的中文文本数组

#### 3. `generate_random_cat_sound`

生成随机的猫语表达。

**参数：** 无

#### 4. `cat_conversation`

与猫咪进行智能对话。

**参数：**

- `message` (string): 想对猫咪说的话

## 🏗️ 项目结构

```
mcp-cat-language-server/
├── src/
│   ├── index.ts              # 主服务器文件（使用 McpServer API）
│   └── cat-translator.ts     # 猫语翻译核心逻辑
├── dist/                     # 编译后的 JavaScript 文件
├── package.json
├── tsconfig.json
└── README.md
```

## 💻 开发

### 本地开发

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 运行服务器
node dist/index.js
```

### 代码架构

项目使用现代化的 MCP SDK 架构：

- **McpServer**：使用最新的高级 API
- **Zod 验证**：类型安全的参数验证
- **模块化设计**：清晰的代码组织

## 🧪 测试

### 基本功能测试

```bash
# 测试工具列表
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js

# 测试翻译功能
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"translate_to_cat","arguments":{"text":"你好"}}}' | node dist/index.js
```

## 🎯 使用示例

在 Claude Desktop 中，你可以这样使用：

1. **简单翻译**：

   > "请把'今天心情很好'翻译成猫语"

   Claude 会调用翻译工具并返回：

   > "喵～～喵喵 ♪(今天心情很好)"

2. **智能对话**：

   > "对猫咪说你好"

   Claude 会使用对话工具返回：

   > "喵～喵喵！(你好呀！很高兴见到你～)"

## 🔄 更新记录

### v1.0.0

- ✨ 使用现代化的 `McpServer` API 重构
- 📦 添加 Zod 类型验证
- 🛠️ 改进错误处理和代码结构
- 🐱 完整的猫语翻译功能

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**让你的文本变得更可爱！** 🐱💕
