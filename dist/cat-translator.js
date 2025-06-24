/**
 * 猫语翻译器 - 将中文转换为可爱的猫语
 */
export class CatTranslator {
    catSounds = ["喵", "喵喵", "喵～", "喵喵喵"];
    catEmotions = ["！", "～", "♪", "...", "？"];
    /**
     * 将中文转换为猫语
     */
    translateToCat(text) {
        // 移除标点符号和空格来计算字符数
        const cleanText = text.replace(/[^\u4e00-\u9fa5]/g, "");
        const charCount = cleanText.length;
        // 根据文本长度和内容生成猫语
        const catLanguage = this.generateCatLanguage(text, charCount);
        return {
            catLanguage,
            original: text,
            translation: `(${text})`,
        };
    }
    generateCatLanguage(text, charCount) {
        // 根据文本内容和长度生成个性化的猫语
        let catPhrase = "";
        // 根据问句类型调整猫语
        if (text.includes("？") || text.includes("?")) {
            // 疑问句 - 用上扬的语调
            catPhrase = this.generateQuestionCat(charCount);
        }
        else if (text.includes("！") || text.includes("!")) {
            // 感叹句 - 用兴奋的语调
            catPhrase = this.generateExcitedCat(charCount);
        }
        else if (this.isGreeting(text)) {
            // 问候语
            catPhrase = "喵～喵喵！";
        }
        else if (this.isFood(text)) {
            // 食物相关
            catPhrase = "喵！喵喵～";
        }
        else if (this.isPlay(text)) {
            // 玩耍相关
            catPhrase = "喵喵喵～喵！";
        }
        else {
            // 普通陈述句
            catPhrase = this.generateStatementCat(charCount);
        }
        return catPhrase;
    }
    generateQuestionCat(charCount) {
        const baseCount = Math.min(Math.max(charCount, 2), 5);
        let result = "";
        for (let i = 0; i < baseCount; i++) {
            if (i === baseCount - 1) {
                result += "喵？";
            }
            else {
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
            }
            else {
                result += "！";
            }
        }
        return result;
    }
    generateStatementCat(charCount) {
        const baseCount = Math.min(Math.max(charCount, 2), 4);
        let result = "";
        for (let i = 0; i < baseCount; i++) {
            result += this.catSounds[Math.floor(Math.random() * 3)]; // 更多使用基础喵音
            if (i < baseCount - 1 && Math.random() > 0.7) {
                result += "～";
            }
        }
        // 随机添加结尾情感
        const endings = ["！", "～", "♪", ""];
        result += endings[Math.floor(Math.random() * endings.length)];
        return result;
    }
    isGreeting(text) {
        const greetings = [
            "你好",
            "早上好",
            "晚上好",
            "下午好",
            "嗨",
            "hello",
            "hi",
        ];
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
    /**
     * 批量翻译多个文本
     */
    translateMultiple(texts) {
        return texts.map((text) => this.translateToCat(text));
    }
    /**
     * 生成随机猫语
     */
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
}
//# sourceMappingURL=cat-translator.js.map