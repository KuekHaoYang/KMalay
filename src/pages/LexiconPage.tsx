import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useAppState } from "../state/AppStateContext";
import { getKindLabel, uiText } from "../lib/ui-language";

const INITIAL_VISIBLE_COUNT = 180;
const VISIBLE_BATCH_SIZE = 120;

export default function LexiconPage() {
  const { allItems, addCustomEntry, uiLanguageStage } = useAppState();
  const [search, setSearch] = useState("");
  const [malay, setMalay] = useState("");
  const [english, setEnglish] = useState("");
  const [note, setNote] = useState("");
  const [example, setExample] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const deferredSearch = useDeferredValue(search);
  const t = (englishText: string, malayText: string) => uiText(uiLanguageStage, englishText, malayText);

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

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [deferredSearch, allItems.length]);

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount]
  );
  const hasMore = visibleItems.length < filteredItems.length;

  useEffect(() => {
    const node = loadMoreRef.current;

    if (!node || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        setVisibleCount((current) => Math.min(filteredItems.length, current + VISIBLE_BATCH_SIZE));
      },
      {
        rootMargin: "640px 0px"
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [filteredItems.length, hasMore]);

  return (
    <div className="page-stack">
      <section className="panel">
        <p className="eyebrow">{t("Lexicon", "Leksikon")}</p>
        <h2>{t("Seeded deck plus your own capture list.", "Dek benih bersama senarai tangkapan anda sendiri.")}</h2>
        <p className="muted-copy">
          {t(
            "Custom entries do not enter the main path. They go straight into local review, which is the correct behavior for personal vocabulary capture.",
            "Entri tersuai tidak masuk ke laluan utama. Entri itu terus masuk ke ulang kaji tempatan, dan itu memang tingkah laku yang betul untuk tangkapan kosa kata peribadi."
          )}
        </p>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t("Add custom item", "Tambah item tersuai")}</p>
            <h3>{t("Capture something you heard today.", "Tangkap sesuatu yang anda dengar hari ini.")}</h3>
          </div>
        </div>
        <div className="form-grid">
          <label>
            <span className="field-label">{t("Malay", "Bahasa Melayu")}</span>
            <input className="text-input" value={malay} onChange={(event) => setMalay(event.target.value)} />
          </label>
          <label>
            <span className="field-label">{t("English glosses", "Maksud bahasa Inggeris")}</span>
            <input
              className="text-input"
              value={english}
              placeholder={t("comma separated", "pisahkan dengan koma")}
              onChange={(event) => setEnglish(event.target.value)}
            />
          </label>
          <label>
            <span className="field-label">{t("Register note", "Catatan register")}</span>
            <input className="text-input" value={note} onChange={(event) => setNote(event.target.value)} />
          </label>
          <label>
            <span className="field-label">{t("Example", "Contoh")}</span>
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
            {t("Save to review", "Simpan ke ulang kaji")}
          </button>
        </div>
      </section>

      <section className="panel">
        <div className="section-header">
          <div>
            <p className="eyebrow">{t("Search deck", "Cari dalam dek")}</p>
            <h3>{filteredItems.length} {t("visible entries", "entri kelihatan")}</h3>
            <p className="muted-copy">
              {t(
                `Showing ${visibleItems.length} now. Scroll to keep loading more.`,
                `Memaparkan ${visibleItems.length} sekarang. Skrol untuk terus memuatkan lagi.`
              )}
            </p>
          </div>
        </div>
        <input
          className="text-input"
          value={search}
          placeholder={t("Search Malay, English, or tags", "Cari Bahasa Melayu, bahasa Inggeris, atau tag")}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="lexicon-list">
          {visibleItems.map((item) => (
            <article key={item.id} className="lexicon-card">
              <div className="lexicon-head">
                <div>
                  <h4>{item.malay}</h4>
                  <p>{item.english.join(", ")}</p>
                </div>
                <span className="lesson-chip">{getKindLabel(uiLanguageStage, item.kind)}</span>
              </div>
              <div className="chip-wrap">
                {item.tags.slice(0, 4).map((tag) => (
                  <span key={`${item.id}-${tag}`} className="topic-chip">
                    {tag}
                  </span>
                ))}
              </div>
              {item.registerNote && <p className="muted-copy">{item.registerNote}</p>}
              {item.example && <p className="example-copy">{t("Example", "Contoh")}: {item.example}</p>}
            </article>
          ))}
        </div>
        {hasMore ? (
          <div ref={loadMoreRef} className="lexicon-footer">
            <p className="muted-copy">
              {t("Loading more entries as you scroll.", "Memuatkan lagi entri semasa anda menatal.")}
            </p>
            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                setVisibleCount((current) => Math.min(filteredItems.length, current + VISIBLE_BATCH_SIZE))
              }
            >
              {t("Load more now", "Muat lagi sekarang")}
            </button>
          </div>
        ) : (
          <div className="lexicon-footer">
            <p className="muted-copy">
              {t("All matching entries are already on screen.", "Semua entri yang sepadan sudah dipaparkan.")}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
