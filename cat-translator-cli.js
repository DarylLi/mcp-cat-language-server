#!/usr/bin/env node
// 命令行猫语翻译工具

class CatTranslator {
  constructor() {
    this.catSounds = ["喵", "喵喵", "喵～", "喵喵喵"];
    this.catEmotions = ["！", "～", "♪", "...", "？"];
  }

  translateToCat(text) {
    const cleanText = text.replace(/[^\u4e00-\u9fa5]/g, "");
    const charCount = cleanText.length;
    const catLanguage = this.generateCatLanguage(text, charCount);

    return {
      catLanguage,
      original: text,
      translation: `(${text})`,
    };
  }

  generateCatLanguage(text, charCount) {
    if (text.includes("？") || text.includes("?")) {
      return this.generateQuestionCat(charCount);
    } else if (text.includes("！") || text.includes("!")) {
      return this.generateExcitedCat(charCount);
    } else if (this.isGreeting(text)) {
      return "喵～喵喵！";
    } else if (this.isFood(text)) {
      return "喵！喵喵～";
    } else if (this.isPlay(text)) {
      return "喵喵喵～喵！";
    } else {
      return this.generateStatementCat(charCount);
    }
  }

  generateQuestionCat(charCount) {
    const baseCount = Math.min(Math.max(charCount, 2), 5);
    let result = "";

    for (let i = 0; i < baseCount; i++) {
      if (i === baseCount - 1) {
        result += "喵？";
      } else {
        result += this.catSounds[Math.floor(Math.random() * 2)];
      }
    }
    return result;
  }

  generateExcitedCat(charCount) {
    const baseCount = Math.min(Math.max(charCount, 2), 5);
    let result = "";

    for (let i = 0; i < baseCount; i++) {
      result +=
        this.catSounds[Math.floor(Math.random() * this.catSounds.length)];
      if (i < baseCount - 1) {
        result += Math.random() > 0.5 ? "！" : "～";
      } else {
        result += "！";
      }
    }
    return result;
  }

  generateStatementCat(charCount) {
    const baseCount = Math.min(Math.max(charCount, 2), 4);
    let result = "";

    for (let i = 0; i < baseCount; i++) {
      result += this.catSounds[Math.floor(Math.random() * 3)];
      if (i < baseCount - 1 && Math.random() > 0.7) {
        result += "～";
      }
    }

    const endings = ["！", "～", "♪", ""];
    result += endings[Math.floor(Math.random() * endings.length)];
    return result;
  }

  isGreeting(text) {
    const greetings = ["你好", "早上好", "晚上好", "下午好", "嗨"];
    return greetings.some((greeting) => text.includes(greeting));
  }

  isFood(text) {
    const foodWords = ["吃", "饭", "食物", "饿", "美食", "零食", "喝", "水"];
    return foodWords.some((word) => text.includes(word));
  }

  isPlay(text) {
    const playWords = ["玩", "游戏", "出去", "散步", "运动", "球", "玩具"];
    return playWords.some((word) => text.includes(word));
  }

  generateRandomCat() {
    const length = Math.floor(Math.random() * 4) + 2;
    let result = "";

    for (let i = 0; i < length; i++) {
      result +=
        this.catSounds[Math.floor(Math.random() * this.catSounds.length)];
      if (i < length - 1 && Math.random() > 0.6) {
        result +=
          this.catEmotions[Math.floor(Math.random() * this.catEmotions.length)];
      }
    }
    return result;
  }

  catConversation(message) {
    const result = this.translateToCat(message);

    // 生成智能回应
    if (message.includes("你好") || message.includes("嗨")) {
      return "喵～喵喵！(你好呀！很高兴见到你～)";
    } else if (message.includes("吃") && message.includes("没")) {
      return "喵！喵～(吃了！谢谢关心～)";
    } else if (message.includes("想") && message.includes("什么")) {
      return "喵喵喵～喵喵！(想和你一起玩～出去散步吧！)";
    } else if (message.includes("再见") || message.includes("拜拜")) {
      return "喵～喵喵喵！(再见～要常来找我玩哦！)";
    } else {
      return `${result.catLanguage}${result.translation} 喵～(我听懂了～)`;
    }
  }
}

// 命令行交互
const translator = new CatTranslator();

console.log("🐱 欢迎使用猫语翻译器！");
console.log("使用方法:");
console.log('  node cat-translator-cli.js "你想说的话"');
console.log("  或者直接运行进入交互模式\n");

const args = process.argv.slice(2);

if (args.length > 0) {
  // 直接翻译参数
  const text = args.join(" ");
  const result = translator.catConversation(text);
  console.log(`🐱 ${result}`);
} else {
  // 交互模式
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('进入猫语对话模式！输入 "退出" 或 "exit" 结束对话\n');

  function askQuestion() {
    rl.question("你: ", (input) => {
      if (input.toLowerCase() === "exit" || input === "退出") {
        console.log("🐱 喵～再见！(再见～记得常来找我玩哦！)");
        rl.close();
        return;
      }

      if (input.trim() === "") {
        console.log("🐱 " + translator.generateRandomCat() + "(说点什么吧～)");
      } else {
        const response = translator.catConversation(input.trim());
        console.log("🐱 " + response);
      }

      console.log("");
      askQuestion();
    });
  }

  askQuestion();
}
