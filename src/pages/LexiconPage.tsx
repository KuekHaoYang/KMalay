import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { searchItems } from "../lib/search";
import { getKindLabel, uiText } from "../lib/ui-language";
import { useAppActions, useCourseCatalogState, useProgressState } from "../state/AppStateContext";

const MOBILE_BREAKPOINT = 720;
const VIRTUAL_CARD_HEIGHT = 320;
const VIRTUAL_OVERSCAN_ROWS = 4;

const getColumnCount = () => (window.innerWidth >= MOBILE_BREAKPOINT ? 2 : 1);

export default function LexiconPage() {
  const { searchEntries } = useCourseCatalogState();
  const { addCustomEntry } = useAppActions();
  const { uiLanguageStage } = useProgressState();
  const [search, setSearch] = useState("");
  const [malay, setMalay] = useState("");
  const [english, setEnglish] = useState("");
  const [note, setNote] = useState("");
  const [example, setExample] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState(() => ({
    scrollTop: typeof window === "undefined" ? 0 : window.scrollY,
    height: typeof window === "undefined" ? 0 : window.innerHeight,
    columns: typeof window === "undefined" ? 1 : getColumnCount(),
    listTop: 0
  }));
  const deferredSearch = useDeferredValue(search);
  const t = (englishText: string, malayText: string) => uiText(uiLanguageStage, englishText, malayText);

  const filteredItems = useMemo(
    () => searchItems(searchEntries, deferredSearch),
    [deferredSearch, searchEntries]
  );

  useEffect(() => {
    let frameId = 0;

    const updateViewport = () => {
      frameId = 0;
      setViewport({
        scrollTop: window.scrollY,
        height: window.innerHeight,
        columns: getColumnCount(),
        listTop: listRef.current ? listRef.current.getBoundingClientRect().top + window.scrollY : 0
      });
    };

    const queueViewportUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateViewport);
    };

    updateViewport();
    window.addEventListener("scroll", queueViewportUpdate, { passive: true });
    window.addEventListener("resize", queueViewportUpdate);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", queueViewportUpdate);
      window.removeEventListener("resize", queueViewportUpdate);
    };
  }, []);

  const totalRows = Math.ceil(filteredItems.length / viewport.columns);
  const visibleTop = Math.max(0, viewport.scrollTop - viewport.listTop);
  const visibleBottom = Math.max(0, viewport.scrollTop + viewport.height - viewport.listTop);
  const rawStartRow = Math.max(0, Math.floor(visibleTop / VIRTUAL_CARD_HEIGHT) - VIRTUAL_OVERSCAN_ROWS);
  const startRow = Math.min(rawStartRow, Math.max(0, totalRows - 1));
  const endRow = Math.min(
    totalRows,
    Math.ceil(visibleBottom / VIRTUAL_CARD_HEIGHT) + VIRTUAL_OVERSCAN_ROWS
  );
  const startIndex = startRow * viewport.columns;
  const endIndex = Math.min(
    filteredItems.length,
    Math.max(startRow + 1, endRow) * viewport.columns
  );
  const visibleItems = filteredItems.slice(startIndex, endIndex);
  const topSpacerHeight = startRow * VIRTUAL_CARD_HEIGHT;
  const bottomSpacerHeight = Math.max(0, (totalRows - endRow) * VIRTUAL_CARD_HEIGHT);

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
                `Rendering ${visibleItems.length} cards now. Results stay windowed for performance.`,
                `Memaparkan ${visibleItems.length} kad sekarang. Keputusan kekal dalam tetingkap untuk prestasi.`
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
        {filteredItems.length === 0 ? (
          <div className="lexicon-footer">
            <p className="muted-copy">
              {t("No matching entries.", "Tiada entri yang sepadan.")}
            </p>
          </div>
        ) : (
          <div ref={listRef} className="lexicon-list lexicon-list-virtual">
            {topSpacerHeight > 0 ? (
              <div className="lexicon-spacer" style={{ height: `${topSpacerHeight}px` }} aria-hidden="true" />
            ) : null}
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
            {bottomSpacerHeight > 0 ? (
              <div className="lexicon-spacer" style={{ height: `${bottomSpacerHeight}px` }} aria-hidden="true" />
            ) : null}
          </div>
        )}
        <div className="lexicon-footer">
          <p className="muted-copy">
            {t(
              `Windowed slice ${filteredItems.length === 0 ? 0 : startIndex + 1}-${endIndex} of ${filteredItems.length}.`,
              `Tetingkap ${filteredItems.length === 0 ? 0 : startIndex + 1}-${endIndex} daripada ${filteredItems.length}.`
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
