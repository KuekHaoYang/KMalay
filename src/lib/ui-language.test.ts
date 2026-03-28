import { pathLessonOrder } from "./content";
import { getUiLanguageStage, getUiLanguageStageForLesson, uiText } from "./ui-language";

describe("ui language stages", () => {
  it("moves through the staged language thresholds", () => {
    const totalLessons = pathLessonOrder.length;
    const bilingualStart = Math.ceil(totalLessons * 0.35);
    const malayGuidedStart = Math.ceil(totalLessons * 0.65);
    const malayStart = Math.ceil(totalLessons * 0.85);

    expect(getUiLanguageStage(0)).toBe("english");
    expect(getUiLanguageStage(bilingualStart)).toBe("bilingual");
    expect(getUiLanguageStage(malayGuidedStart)).toBe("malay-guided");
    expect(getUiLanguageStage(malayStart)).toBe("malay");
  });

  it("maps late lessons to Malay immersion", () => {
    const totalLessons = pathLessonOrder.length;
    const bilingualLessonId = pathLessonOrder[Math.ceil(totalLessons * 0.35) - 1];
    const malayGuidedLessonId = pathLessonOrder[Math.ceil(totalLessons * 0.65) - 1];
    const malayLessonId = pathLessonOrder[Math.ceil(totalLessons * 0.85) - 1];

    expect(getUiLanguageStageForLesson(pathLessonOrder[0])).toBe("english");
    expect(getUiLanguageStageForLesson(bilingualLessonId)).toBe("bilingual");
    expect(getUiLanguageStageForLesson(malayGuidedLessonId)).toBe("malay-guided");
    expect(getUiLanguageStageForLesson(malayLessonId)).toBe("malay");
  });

  it("formats bilingual bridge text in the right order", () => {
    expect(uiText("bilingual", "Home", "Utama")).toBe("Home / Utama");
    expect(uiText("malay-guided", "Home", "Utama")).toBe("Utama / Home");
    expect(uiText("malay", "Home", "Utama")).toBe("Utama");
  });
});
