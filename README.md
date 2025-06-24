# 🐱 MCP Cat Language Server

一个有趣的 MCP (Model Context Protocol) 服务器，可以将中文翻译为可爱的猫语！

## ✨ 功能特性

- 🎯 **智能翻译**: 将中文文本转换为个性化的猫语表达
- 🎭 **情感识别**: 根据文本内容（问候、食物、玩耍等）生成不同风格的猫语
- 📦 **批量处理**: 支持同时翻译多个文本
- 🎲 **随机猫语**: 生成随机的猫语表达
- 💬 **智能对话**: 猫咪会根据不同问题给出专门的回应

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 构建项目

```bash
npm run build
```

### 本地测试

```bash
# 使用CLI工具测试翻译功能
node cat-translator-cli.js

# 或者运行服务器
npm start
```

## 🔧 配置 Claude Desktop

### 方法 1: 使用 npx (推荐)

在 Claude Desktop 配置文件中添加：

```json
{
  "mcpServers": {
    "cat-language-server": {
      "command": "npx",
      "args": ["mcp-cat-language-server"]
    }
  }
}
```

### 方法 2: 本地路径

```json
{
  "mcpServers": {
    "cat-language-server": {
      "command": "node",
      "args": ["/path/to/your/project/dist/index.js"]
    }
  }
}
```

### 配置文件位置

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\\Claude\\claude_desktop_config.json`

## 🛠️ MCP 工具

### 1. `translate_to_cat`

将单个中文文本翻译为猫语格式。

**参数**:

- `text` (string): 要翻译的中文文本

**示例**:

```
输入: "今天吃了没？"
输出: "喵！喵喵～(今天吃了没？)"
```

### 2. `translate_multiple_to_cat`

批量翻译多个中文文本。

**参数**:

- `texts` (string[]): 要翻译的中文文本数组

**示例**:

```
输入: ["你好", "今天想干什么"]
输出:
1. 喵～喵喵！(你好)
2. 喵喵喵～喵喵！(今天想干什么)
```

### 3. `generate_random_cat_sound`

生成随机的猫语表达。

**示例输出**: `喵～喵喵喵♪(随机猫语～)`

### 4. `cat_conversation`

与猫咪对话，猫咪会用猫语回应并解释意思。

**参数**:

- `message` (string): 想对猫咪说的话

**示例**:

```
输入: "你好"
输出: "喵～喵喵！(你好呀！很高兴见到你～)"
```

## 🎨 翻译特性

### 智能情感识别

- 🤝 **问候语**: "你好"、"嗨" → 友好的猫语
- 🍽️ **食物相关**: "吃"、"饭"、"饿" → 兴奋的猫语
- 🎮 **玩耍相关**: "玩"、"游戏"、"散步" → 活泼的猫语
- ❓ **疑问句**: 以"？"结尾 → 上扬语调的猫语
- ❗ **感叹句**: 以"！"结尾 → 兴奋语调的猫语

### 个性化猫语生成

- 根据文本长度调整猫语复杂度
- 智能添加情感符号（～、！、♪ 等）
- 保持原文含义的同时增加可爱度

## 📁 项目结构

```
src/
├── index.ts              # MCP服务器主文件
└── cat-translator.ts     # 猫语翻译核心逻辑

dist/                     # 编译后的JavaScript文件
cat-translator-cli.js     # 独立的命令行测试工具
setup-mcp.md             # 详细配置指南
```

## 🧪 开发测试

### 运行测试

```bash
npm test
```

### 开发模式

```bash
npm run dev
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🎉 使用示例

在 Claude Desktop 中配置完成后，你可以这样使用：

```
用户: 请把"今天天气真好"翻译成猫语
Claude: 喵～喵喵♪(今天天气真好)

用户: 我想和猫咪聊天，我说"你好可爱"
猫咪: 喵～喵喵！(你好可爱) 喵～(我听懂了～)
```

让我们一起用猫语让世界变得更可爱吧！🐾
