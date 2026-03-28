import { useDeferredValue, useMemo, useState } from "react";
import { useAppState } from "../state/AppStateContext";

export default function LexiconPage() {
  const { allItems, addCustomEntry } = useAppState();
  const [search, setSearch] = useState("");
  const [malay, setMalay] = useState("");
  const [english, setEnglish] = useState("");
  const [note, setNote] = useState("");
  const [example, setExample] = useState("");
  const deferredSearch = useDeferredValue(search);

  const filteredItems = useMemo(() => {
    const query = deferredSearch.trim().toLocaleLowerCase("en-US");
    if (!query) {
      return allItems;
    }

    return allItems.filter((item) => {
      const englishText = item.english.join(" ").toLocaleLowerCase("en-US");
      return (
        item.malay.toLocaleLowerCase("ms-MY").includes(query) ||
        englishText.includes(query) ||
        item.tags.join(" ").toLocaleLowerCase("en-US").includes(query)
      );
    });
  }, [allItems, deferredSearch]);

  return (
    <div className="page-stack">
      <section className="panel">
        <p className="eyebrow">Lexicon</p>
        <h2>Seeded deck plus your own capture list.</h2>
        <p className="muted-copy">
          Custom entries do not enter the main path. They go straight into local review, which is the correct behavior for personal vocabulary capture.
        </p>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Add custom item</p>
            <h3>Capture something you heard today.</h3>
          </div>
        </div>
        <div className="form-grid">
          <label>
            <span className="field-label">Malay</span>
            <input className="text-input" value={malay} onChange={(event) => setMalay(event.target.value)} />
          </label>
          <label>
            <span className="field-label">English glosses</span>
            <input
              className="text-input"
              value={english}
              placeholder="comma separated"
              onChange={(event) => setEnglish(event.target.value)}
            />
          </label>
          <label>
            <span className="field-label">Register note</span>
            <input className="text-input" value={note} onChange={(event) => setNote(event.target.value)} />
          </label>
          <label>
            <span className="field-label">Example</span>
            <input className="text-input" value={example} onChange={(event) => setExample(event.target.value)} />
          </label>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              addCustomEntry({ malay, english, note, example });
              setMalay("");
              setEnglish("");
              setNote("");
              setExample("");
            }}
            disabled={!malay.trim() || !english.trim()}
          >
            Save to review
          </button>
        </div>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">Search deck</p>
            <h3>{filteredItems.length} visible entries</h3>
          </div>
        </div>
        <input
          className="text-input"
          value={search}
          placeholder="Search Malay, English, or tags"
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="lexicon-list">
          {filteredItems.slice(0, 120).map((item) => (
            <article key={item.id} className="lexicon-card">
              <div className="lexicon-head">
                <div>
                  <h4>{item.malay}</h4>
                  <p>{item.english.join(", ")}</p>
                </div>
                <span className="lesson-chip">{item.kind}</span>
              </div>
              <div className="chip-wrap">
                {item.tags.slice(0, 4).map((tag) => (
                  <span key={`${item.id}-${tag}`} className="topic-chip">
                    {tag}
                  </span>
                ))}
              </div>
              {item.registerNote && <p className="muted-copy">{item.registerNote}</p>}
              {item.example && <p className="example-copy">Example: {item.example}</p>}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
