# 猫语 MCP 服务器配置指南 🐱

## npx 配置的优势

使用 `npx` 配置 MCP 服务器的好处：

- ✅ **自动处理依赖**：npx 会自动解析和加载 node_modules 中的依赖
- ✅ **路径无关**：不需要担心绝对路径问题
- ✅ **更可靠**：减少环境配置问题
- ✅ **自动安装**：如果包不存在，可以自动安装（使用 `-y` 参数）

## 配置步骤

### 1. 确保项目已构建

```bash
cd /Users/daryl/chat-mcp
npm install
npm run build
```

### 2. 找到 Claude Desktop 配置文件位置

**macOS 位置：**

```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**如果文件不存在，创建一个：**

```bash
mkdir -p "~/Library/Application Support/Claude"
touch "~/Library/Application Support/Claude/claude_desktop_config.json"
```

### 3. 配置内容

**推荐方式一：使用 npx（推荐）**

```json
{
  "mcpServers": {
    "cat-language": {
      "command": "npx",
      "args": ["-y", "mcp-cat-language-server"],
      "cwd": "/Users/daryl/chat-mcp",
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

**方式二：直接使用 node**

```json
{
  "mcpServers": {
    "cat-language": {
      "command": "node",
      "args": ["/Users/daryl/chat-mcp/dist/index.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

**方式三：使用本地 npx**

```json
{
  "mcpServers": {
    "cat-language": {
      "command": "npx",
      "args": ["--yes", "--package=.", "mcp-cat-language-server"],
      "cwd": "/Users/daryl/chat-mcp"
    }
  }
}
```

### 4. 重启 Claude Desktop

保存配置文件后，完全退出并重新启动 Claude Desktop 应用。

### 5. 验证配置

在 Claude Desktop 中，你应该能看到猫语翻译工具。可以测试：

- "请帮我翻译：今天吃了没？"
- "用猫语说：今天想干什么？"

## 常见问题解决

### 问题 1：找不到 node/npx 命令

**解决方案 A：** 使用 npx（推荐）

```json
{
  "command": "npx",
  "args": ["-y", "mcp-cat-language-server"],
  "cwd": "/Users/daryl/chat-mcp"
}
```

**解决方案 B：** 使用完整路径

```bash
which node  # 查看 node 路径
which npx   # 查看 npx 路径
```

然后在配置中使用完整路径，例如：

```json
"command": "/usr/local/bin/npx"
```

或者：

```json
"command": "/usr/local/bin/node"
```

### 问题 2：权限问题

**解决方案：** 确保文件有执行权限

```bash
chmod +x /Users/daryl/chat-mcp/dist/index.js
```

### 问题 3：依赖缺失

**解决方案：** 重新安装依赖

```bash
cd /Users/daryl/chat-mcp
rm -rf node_modules
npm install
npm run build
```

### 问题 4：配置文件语法错误

**解决方案：** 验证 JSON 格式

```bash
# 使用jq验证JSON格式
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | jq .
```

## 快速测试

如果 MCP 配置有问题，可以先用命令行版本测试功能：

```bash
cd /Users/daryl/chat-mcp
node cat-translator-cli.js "今天吃了没？"
```

## 调试技巧

1. **查看 Claude Desktop 日志：**

   - 在 Claude Desktop 中按 `Cmd+Shift+I` 打开开发者工具
   - 查看 Console 标签页的错误信息

2. **手动测试 MCP 服务器：**

   使用 npx：

   ```bash
   cd /Users/daryl/chat-mcp
   echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | npx mcp-cat-language-server
   ```

   或使用 node：

   ```bash
   echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | node dist/index.js
   ```

3. **检查文件路径：**
   ```bash
   ls -la /Users/daryl/chat-mcp/dist/index.js
   ```
