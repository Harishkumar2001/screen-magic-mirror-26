import { useEffect, useRef, useState } from "react";
import {
  QUESTIONS,
  SKIN_TYPE_LABEL,
  budgetLabel,
  formatPrice,
  isSimpleRoutine,
  mainConcern,
  recommend,
  skinTypeFromAnswers,
  type Answers,
  type Recommendation,
} from "@/lib/meskin";
import { Button, Card, Check, Pill, ProgressRail, type Stage } from "./ui";
import { cn } from "@/lib/utils";

export function MeSkinApp() {
  const [stage, setStage] = useState<Stage>("Landing");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [photo, setPhoto] = useState<string | null>(null);
  const [usedPhoto, setUsedPhoto] = useState(false);
  const [result, setResult] = useState<Recommendation | null>(null);

  const reset = () => {
    setStage("Landing");
    setQuestionIndex(0);
    setAnswers({});
    setPhoto(null);
    setUsedPhoto(false);
    setResult(null);
  };

  const finish = (withPhoto: boolean) => {
    setUsedPhoto(withPhoto);
    setResult(recommend(answers));
    setStage("Analyzing");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[900px] px-5 pb-24 pt-5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <span className="font-display text-base tracking-tight">MeSkin</span>
          <span className="rounded-full border border-border bg-card px-3 py-1 text-[11px] text-muted-foreground">
            Prototype · simulated AI
          </span>
        </div>
        <div className="mt-4">
          <ProgressRail current={stage} />
        </div>

        <main className="pt-14">
          {stage === "Landing" && <Landing onStart={() => setStage("Questions")} />}

          {stage === "Questions" && (
            <Questionnaire
              index={questionIndex}
              answers={answers}
              setAnswers={setAnswers}
              onBack={() => {
                if (questionIndex === 0) setStage("Landing");
                else setQuestionIndex(questionIndex - 1);
              }}
              onNext={() => {
                if (questionIndex === QUESTIONS.length - 1) setStage("Profile");
                else setQuestionIndex(questionIndex + 1);
              }}
            />
          )}

          {stage === "Profile" && (
            <Profile
              answers={answers}
              onPhoto={() => setStage("Photo")}
              onSkip={() => finish(false)}
            />
          )}

          {stage === "Photo" && (
            <PhotoStep
              photo={photo}
              setPhoto={setPhoto}
              onAnalyze={() => finish(true)}
              onSkip={() => finish(false)}
            />
          )}

          {stage === "Analyzing" && (
            <Analyzing withPhoto={usedPhoto} onDone={() => setStage("Results")} />
          )}

          {stage === "Results" && result && (
            <Results result={result} photo={usedPhoto ? photo : null} onReset={reset} />
          )}
        </main>
      </div>
    </div>
  );
}

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <section className="mx-auto max-w-[640px] text-center">
      <h1 className="text-4xl leading-[1.1] sm:text-5xl">
        Build a skincare routine that fits your skin and your budget.
      </h1>
      <p className="mx-auto mt-6 max-w-[520px] text-base text-muted-foreground">
        Answer a few simple questions first. We'll understand what you need before we ever ask
        for anything else.
      </p>
      <div className="mt-10">
        <Button onClick={onStart}>Start my skin assessment</Button>
      </div>
      <ul className="mt-10 space-y-2 text-sm text-muted-foreground">
        {[
          "Your answers stay private",
          "AI-assisted, never self-diagnosed",
          "Budget comes first, not last",
        ].map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </section>
  );
}

function Questionnaire({
  index,
  answers,
  setAnswers,
  onBack,
  onNext,
}: {
  index: number;
  answers: Answers;
  setAnswers: (next: Answers) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const question = QUESTIONS[index]!;
  const selected = answers[question.id] ?? [];
  const [nudge, setNudge] = useState(false);

  useEffect(() => setNudge(false), [index]);

  const toggle = (option: string) => {
    setNudge(false);
    const next =
      question.type === "single"
        ? [option]
        : selected.includes(option)
          ? selected.filter((o) => o !== option)
          : [...selected, option];
    setAnswers({ ...answers, [question.id]: next });
  };

  return (
    <section className="mx-auto max-w-[620px]">
      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
        Question {index + 1} of {QUESTIONS.length}
      </p>
      <h2 className="mt-3 text-2xl leading-snug sm:text-3xl">{question.prompt}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {question.type === "multi" ? "Select all that apply" : "Select one"}
      </p>

      <div className="mt-8 space-y-2">
        {question.options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border bg-card px-4 py-3.5 text-left text-sm transition-colors",
                active ? "border-primary" : "border-border hover:border-primary/40",
              )}
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center border",
                  question.type === "single" ? "rounded-full" : "rounded-[4px]",
                  active ? "border-primary bg-primary" : "border-border",
                )}
              >
                {active && (
                  <span className="size-2 rounded-full bg-primary-foreground" aria-hidden />
                )}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {nudge && (
        <p className="mt-4 text-sm text-gold">
          Pick {question.type === "multi" ? "at least one option" : "an option"} to continue.
        </p>
      )}

      <div className="mt-8 flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={() => (selected.length === 0 ? setNudge(true) : onNext())}>
          Continue
        </Button>
      </div>
    </section>
  );
}

function Profile({
  answers,
  onPhoto,
  onSkip,
}: {
  answers: Answers;
  onPhoto: () => void;
  onSkip: () => void;
}) {
  const tiles = [
    { label: "Skin type", value: SKIN_TYPE_LABEL[skinTypeFromAnswers(answers)] },
    { label: "Main concern", value: mainConcern(answers) },
    { label: "Budget", value: budgetLabel(answers) },
    { label: "Priority", value: answers["priority"]?.[0] ?? "—" },
  ];

  return (
    <section className="mx-auto max-w-[640px]">
      <h2 className="text-3xl">Here's what we're seeing so far</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Based on your answers alone — no photo needed yet.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tiles.map((tile) => (
          <Card key={tile.label}>
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {tile.label}
            </p>
            <p className="mt-2 font-display text-lg">{tile.value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-xl">Want to make this more accurate?</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          A photo helps us read visible characteristics like texture and shine, so the routine we
          build lines up with what your skin is actually doing right now.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button onClick={onPhoto}>Add a skin photo</Button>
          <Button variant="ghost" onClick={onSkip}>
            Skip, just use my answers
          </Button>
        </div>
      </div>
    </section>
  );
}

function PhotoStep({
  photo,
  setPhoto,
  onAnalyze,
  onSkip,
}: {
  photo: string | null;
  setPhoto: (value: string | null) => void;
  onAnalyze: () => void;
  onSkip: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const load = (file?: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <section className="mx-auto max-w-[620px]">
      <h2 className="text-3xl">Take or upload a clear photo</h2>
      <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
        {["Natural lighting", "No filter", "No heavy makeup", "Face clearly visible"].map(
          (item) => (
            <li key={item} className="flex items-center gap-3">
              <Check filled />
              {item}
            </li>
          ),
        )}
      </ul>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          load(e.dataTransfer.files?.[0]);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "mt-8 cursor-pointer rounded-lg border border-dashed bg-card p-10 text-center transition-colors",
          dragging ? "border-primary" : "border-border hover:border-primary/50",
        )}
      >
        {photo ? (
          <div className="flex flex-col items-center gap-3">
            <img
              src={photo}
              alt="Your uploaded skin photo preview"
              className="size-28 rounded-md object-cover"
            />
            <p className="text-sm text-muted-foreground">Tap to choose a different photo</p>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-sm">Click to upload, or drag a photo here</p>
            <p className="text-xs text-muted-foreground">JPG or PNG</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => load(e.target.files?.[0])}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button disabled={!photo} onClick={onAnalyze}>
          Analyze my photo
        </Button>
        <Button variant="ghost" onClick={onSkip}>
          Skip this step
        </Button>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Your photo is used only for this analysis and is not shared with third parties.
      </p>
    </section>
  );
}

function Analyzing({ withPhoto, onDone }: { withPhoto: boolean; onDone: () => void }) {
  const steps = withPhoto
    ? [
        "Reading image quality",
        "Reading visible skin texture",
        "Matching to your answers",
        "Comparing product options",
        "Building the cheapest basket that fits",
      ]
    : [
        "Matching your answers to skin profiles",
        "Comparing product options",
        "Building the cheapest basket that fits",
      ];

  const [done, setDone] = useState(0);

  useEffect(() => {
    const delay = Math.round(3000 / steps.length);
    const timers = steps.map((_, i) =>
      setTimeout(() => {
        setDone(i + 1);
        if (i === steps.length - 1) setTimeout(onDone, 450);
      }, delay * (i + 1)),
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mx-auto max-w-[520px]">
      <h2 className="text-3xl">Building your routine</h2>
      <ul className="mt-8 space-y-4">
        {steps.map((step, i) => (
          <li
            key={step}
            className={cn(
              "flex items-center gap-3 text-sm transition-colors",
              i < done ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <Check filled={i < done} />
            {step}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Results({
  result,
  photo,
  onReset,
}: {
  result: Recommendation;
  photo: string | null;
  onReset: () => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const skin = SKIN_TYPE_LABEL[result.skinType].toLowerCase();

  return (
    <section>
      <h2 className="text-3xl leading-tight sm:text-4xl">
        Your routine, built for {skin} skin
        {result.simple ? "" : ` and ${result.concern.toLowerCase()}`}
      </h2>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Pill>{SKIN_TYPE_LABEL[result.skinType]}</Pill>
        {!result.simple && <Pill>{result.concern}</Pill>}
        <Pill tone="gold">{result.budget}</Pill>
      </div>

      {photo && (
        <img
          src={photo}
          alt="The skin photo used for this analysis"
          className="mt-6 size-20 rounded-md object-cover"
        />
      )}

      <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          { title: "Morning", steps: result.morning },
          { title: "Evening", steps: result.evening },
        ].map((column) => (
          <Card key={column.title}>
            <h3 className="text-lg">{column.title}</h3>
            <ol className="mt-4 space-y-3 text-sm">
              {column.steps.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="text-muted-foreground">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-lg">Your basket</h3>
        <ul className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
          {result.items.map((item) => {
            const expanded = open === item.product.id;
            return (
              <li key={item.product.id}>
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : item.product.id)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/60"
                >
                  <span>
                    <span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {item.role}
                    </span>
                    <span className="mt-1 block text-sm font-medium">{item.product.name}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {item.product.retailer}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold">
                    {formatPrice(item.product.price)}
                  </span>
                </button>
                {expanded && (
                  <div className="border-t border-border bg-secondary/40 px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      Why we selected this
                    </p>
                    <ul className="mt-3 space-y-2 text-sm">
                      {item.reasons.map((reason) => (
                        <li key={reason} className="flex gap-3">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
          <li className="flex items-center justify-between px-5 py-4 text-sm">
            <span className="text-muted-foreground">Estimated total</span>
            <span className="font-display text-lg text-gold">{formatPrice(result.total)}</span>
          </li>
        </ul>
      </div>

      <div className="mt-10 rounded-lg border border-gold/40 bg-gold-soft px-5 py-4 text-sm">
        We're not recommending anything because it's expensive, or because it's the cheapest thing
        that exists — this is the cheapest basket that still matches what you told us.
      </div>

      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
        This reflects visible characteristics and what you told us — it isn't a medical diagnosis.
        If you have persistent or worsening skin concerns, a dermatologist is the right next step.
      </p>

      <div className="mt-10">
        <Button onClick={onReset}>Start over</Button>
      </div>
    </section>
  );
}

export { isSimpleRoutine };
