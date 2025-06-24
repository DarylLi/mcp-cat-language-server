/**
 * 猫语翻译器 - 将中文转换为可爱的猫语
 */
export interface CatTranslationResult {
    catLanguage: string;
    original: string;
    translation: string;
}
export declare class CatTranslator {
    private readonly catSounds;
    private readonly catEmotions;
    /**
     * 将中文转换为猫语
     */
    translateToCat(text: string): CatTranslationResult;
    private generateCatLanguage;
    private generateQuestionCat;
    private generateExcitedCat;
    private generateStatementCat;
    private isGreeting;
    private isFood;
    private isPlay;
    /**
     * 批量翻译多个文本
     */
    translateMultiple(texts: string[]): CatTranslationResult[];
    /**
     * 生成随机猫语
     */
    generateRandomCat(): string;
}
//# sourceMappingURL=cat-translator.d.ts.map