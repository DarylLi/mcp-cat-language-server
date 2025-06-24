#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { CatTranslator } from "./cat-translator.js";

/**
 * 猫语MCP服务器
 * 提供中文到猫语的翻译功能
 */

const catTranslator = new CatTranslator();

// 创建McpServer实例
const server = new McpServer(
  {
    name: "cat-language-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 注册工具：单个文本翻译
server.tool(
  "translate_to_cat",
  "将中文文本翻译为可爱的猫语格式。输入中文，输出'喵！喵！(原文意思)'的格式。",
  {
    text: z.string().describe("要翻译成猫语的中文文本"),
  },
  async ({ text }) => {
    if (!text || typeof text !== "string") {
      throw new Error("请提供有效的中文文本");
    }

    const result = catTranslator.translateToCat(text);

    return {
      content: [
        {
          type: "text" as const,
          text: `${result.catLanguage}${result.translation}`,
        },
      ],
    };
  }
);

// 注册工具：批量文本翻译
server.tool(
  "translate_multiple_to_cat",
  "批量将多个中文文本翻译为猫语格式",
  {
    texts: z.array(z.string()).describe("要翻译成猫语的中文文本列表"),
  },
  async ({ texts }) => {
    if (!Array.isArray(texts)) {
      throw new Error("请提供文本数组");
    }

    const results = catTranslator.translateMultiple(texts);
    const formattedResults = results
      .map(
        (result, index) =>
          `${index + 1}. ${result.catLanguage}${result.translation}`
      )
      .join("\n");

    return {
      content: [
        {
          type: "text" as const,
          text: formattedResults,
        },
      ],
    };
  }
);

// 注册工具：生成随机猫语
server.tool("generate_random_cat_sound", "生成随机的猫语表达", async () => {
  const randomCat = catTranslator.generateRandomCat();

  return {
    content: [
      {
        type: "text" as const,
        text: `${randomCat}(随机猫语～)`,
      },
    ],
  };
});

// 注册工具：猫咪对话
server.tool(
  "cat_conversation",
  "与猫咪对话，输入任何中文，猫咪会用猫语回应并解释意思",
  {
    message: z.string().describe("想对猫咪说的话"),
  },
  async ({ message }) => {
    if (!message || typeof message !== "string") {
      throw new Error("请提供想说的话");
    }

    const result = catTranslator.translateToCat(message);

    // 生成智能回应
    let response = "";
    if (message.includes("你好") || message.includes("嗨")) {
      response = "喵～喵喵！(你好呀！很高兴见到你～)";
    } else if (message.includes("吃") && message.includes("没")) {
      response = "喵！喵～(吃了！谢谢关心～)";
    } else if (message.includes("想") && message.includes("什么")) {
      response = "喵喵喵～喵喵！(想和你一起玩～出去散步吧！)";
    } else if (message.includes("再见") || message.includes("拜拜")) {
      response = "喵～喵喵喵！(再见～要常来找我玩哦！)";
    } else {
      // 对于其他消息，直接翻译并加上友好回应
      response = `${result.catLanguage}${result.translation} 喵～(我听懂了～)`;
    }

    return {
      content: [
        {
          type: "text" as const,
          text: response,
        },
      ],
    };
  }
);

// 主函数
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("猫语MCP服务器已启动 🐱");
}

// 错误处理
process.on("SIGINT", async () => {
  console.error("正在关闭猫语服务器...");
  await server.close();
  process.exit(0);
});

main().catch((error) => {
  console.error("服务器启动失败:", error);
  process.exit(1);
});
