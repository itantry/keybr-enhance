import { FakePhoneticModel } from "@keybr/phonetic-model";
import { Settings } from "@keybr/settings";
import { toCodePoints } from "@keybr/unicode";
import test from "ava";
import { CustomTextLesson } from "./customtext.ts";
import { LessonKey } from "./key.ts";
import { lessonProps } from "./settings.ts";

const allCodePoints = { has: () => true };

test("provide key set", (t) => {
  const settings = new Settings();
  const model = new FakePhoneticModel();
  const lesson = new CustomTextLesson(settings, model, allCodePoints);
  const lessonKeys = lesson.update(lesson.analyze([]));

  t.deepEqual(lessonKeys.findIncludedKeys(), [
    new LessonKey({
      letter: FakePhoneticModel.letter1,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isBoosted: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter2,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isBoosted: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter3,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isBoosted: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter4,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isBoosted: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter5,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isBoosted: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter6,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isBoosted: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter7,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isBoosted: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter8,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isBoosted: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter9,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isBoosted: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter10,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isBoosted: false,
      isForced: false,
    }),
  ]);
  t.deepEqual(lessonKeys.findExcludedKeys(), []);
  t.is(lessonKeys.findBoostedKey(), null);
});

test("generate text with empty settings", (t) => {
  const settings = new Settings().set(lessonProps.customText.content, "");
  const model = new FakePhoneticModel();
  const lesson = new CustomTextLesson(settings, model, allCodePoints);
  lesson.update(lesson.analyze([]));

  t.is(
    lesson.generate(),
    "? ? ? ? ? ? ? ? ? ? " +
      "? ? ? ? ? ? ? ? ? ? " +
      "? ? ? ? ? ? ? ? ? ? " +
      "? ? ? ? ? ? ? ? ? ? " +
      "? ? ? ? ? ? ? ? ? ? " +
      "? ? ? ? ? ? ? ? ? ? " +
      "? ? ? ? ? ? ? ? ? ? " +
      "? ? ? ? ? ? ? ? ? ? " +
      "? ? ? ? ? ? ? ? ? ? " +
      "? ? ? ? ? ? ? ? ? ?",
  );
});

test("generate text using settings", (t) => {
  {
    const settings = new Settings()
      .set(lessonProps.customText.content, "Abc! Def? 123")
      .set(lessonProps.customText.lowercase, true)
      .set(lessonProps.customText.lettersOnly, true)
      .set(lessonProps.customText.randomize, false);
    const model = new FakePhoneticModel();
    const codePoints = new Set(toCodePoints("abcdefABCDEF123!?"));
    const lesson = new CustomTextLesson(settings, model, codePoints);
    lesson.update(lesson.analyze([]));
    lesson.rng = model.rng;

    t.is(
      lesson.generate(),
      "abc def abc def abc def abc def abc def abc def abc def abc def abc " +
        "def abc def abc def abc def abc def abc def abc def abc def abc def",
    );
  }

  {
    const settings = new Settings()
      .set(lessonProps.customText.content, "Abc! Def? 123")
      .set(lessonProps.customText.lowercase, false)
      .set(lessonProps.customText.lettersOnly, false)
      .set(lessonProps.customText.randomize, false);
    const model = new FakePhoneticModel();
    const codePoints = new Set(toCodePoints("abcdefABCDEF123!?"));
    const lesson = new CustomTextLesson(settings, model, codePoints);
    lesson.update(lesson.analyze([]));
    lesson.rng = model.rng;

    t.is(
      lesson.generate(),
      "Abc! Def? 123 Abc! Def? 123 Abc! Def? 123 Abc! Def? 123 Abc! Def? 123 " +
        "Abc! Def? 123 Abc! Def? 123 Abc! Def? 123 Abc! Def? 123 Abc!",
    );
  }
});

test("generate randomized text using settings", (t) => {
  {
    const settings = new Settings()
      .set(
        lessonProps.customText.content,
        "Abc! Def? 123 AAA aaa BBB bbb CCC ccc",
      )
      .set(lessonProps.customText.lowercase, true)
      .set(lessonProps.customText.lettersOnly, true)
      .set(lessonProps.customText.randomize, true);
    const model = new FakePhoneticModel();
    const codePoints = new Set(toCodePoints("abcdefABCDEF123!?"));
    const lesson = new CustomTextLesson(settings, model, codePoints);
    lesson.update(lesson.analyze([]));
    lesson.rng = model.rng;

    t.is(
      lesson.generate(),
      "abc aaa bbb abc aaa bbb abc aaa bbb abc aaa bbb abc aaa bbb abc aaa " +
        "bbb abc aaa bbb abc aaa bbb abc aaa bbb abc aaa bbb abc aaa bbb abc",
    );
  }

  {
    const settings = new Settings()
      .set(
        lessonProps.customText.content,
        "Abc! Def? 123 AAA aaa BBB bbb CCC ccc",
      )
      .set(lessonProps.customText.lowercase, false)
      .set(lessonProps.customText.lettersOnly, false)
      .set(lessonProps.customText.randomize, true);
    const model = new FakePhoneticModel();
    const codePoints = new Set(toCodePoints("abcdefABCDEF123!?"));
    const lesson = new CustomTextLesson(settings, model, codePoints);
    lesson.update(lesson.analyze([]));
    lesson.rng = model.rng;

    t.is(
      lesson.generate(),
      "Abc! AAA bbb Abc! AAA bbb Abc! AAA bbb Abc! AAA bbb Abc! AAA bbb Abc! " +
        "AAA bbb Abc! AAA bbb Abc! AAA bbb Abc! AAA bbb Abc! AAA bbb",
    );
  }
});
