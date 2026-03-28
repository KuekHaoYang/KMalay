import { getUiLanguageStage, getUiLanguageStageForLesson, uiText } from "./ui-language";

describe("ui language stages", () => {
  it("moves through the staged language thresholds", () => {
    expect(getUiLanguageStage(0)).toBe("english");
    expect(getUiLanguageStage(100)).toBe("bilingual");
    expect(getUiLanguageStage(150)).toBe("malay-guided");
    expect(getUiLanguageStage(200)).toBe("malay");
  });

  it("maps late lessons to Malay immersion", () => {
    expect(getUiLanguageStageForLesson("lesson-1")).toBe("english");
    expect(getUiLanguageStageForLesson("lesson-101")).toBe("bilingual");
    expect(getUiLanguageStageForLesson("lesson-151")).toBe("malay-guided");
    expect(getUiLanguageStageForLesson("lesson-201")).toBe("malay");
  });

  it("formats bilingual bridge text in the right order", () => {
    expect(uiText("bilingual", "Home", "Utama")).toBe("Home / Utama");
    expect(uiText("malay-guided", "Home", "Utama")).toBe("Utama / Home");
    expect(uiText("malay", "Home", "Utama")).toBe("Utama");
  });
});
