"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ImageIcon,
  Play,
  Video,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  projectMediaCatalog,
  type ProjectMediaCollection,
  type ProjectMediaItem,
} from "../data/projectMediaCatalog";

export default function ProjectGallery({
  initialIndex = 0,
  onClose,
  projectName,
  returnFocus,
}: {
  initialIndex?: number;
  onClose: () => void;
  projectName: string;
  returnFocus: HTMLButtonElement | null;
}) {
  const collection = projectMediaCatalog[projectName];
  if (!collection) return null;

  return (
    <ProjectGalleryDialog
      collection={collection}
      initialIndex={initialIndex}
      onClose={onClose}
      returnFocus={returnFocus}
    />
  );
}

function ProjectGalleryDialog({
  collection,
  initialIndex,
  onClose,
  returnFocus,
}: {
  collection: ProjectMediaCollection;
  initialIndex: number;
  onClose: () => void;
  returnFocus: HTMLButtonElement | null;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipeStart = useRef<{
    pointerId: number;
    x: number;
    y: number;
  } | null>(null);
  const normalizedInitialIndex = Math.min(
    Math.max(initialIndex, 0),
    collection.media.length - 1,
  );
  const [activeIndex, setActiveIndex] = useState(normalizedInitialIndex);
  const [closing, setClosing] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const [section, setSection] = useState("All");

  const sections = useMemo(
    () => Array.from(new Set(collection.media.map((item) => item.section))),
    [collection.media],
  );
  const filteredMedia = useMemo(
    () =>
      section === "All"
        ? collection.media
        : collection.media.filter((item) => item.section === section),
    [collection.media, section],
  );
  const activeMedia = filteredMedia[activeIndex] ?? filteredMedia[0];

  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    const delay = matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 220;
    closeTimerRef.current = setTimeout(onClose, delay);
  }, [closing, onClose]);

  const showPrevious = useCallback(() => {
    setDetailView(false);
    setActiveIndex((index) =>
      index <= 0 ? filteredMedia.length - 1 : index - 1,
    );
  }, [filteredMedia.length]);

  const showNext = useCallback(() => {
    setDetailView(false);
    setActiveIndex((index) =>
      index >= filteredMedia.length - 1 ? 0 : index + 1,
    );
  }, [filteredMedia.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const focusTarget =
      returnFocus ?? (document.activeElement as HTMLElement | null);
    if (dialog && !dialog.open) dialog.showModal();
    closeButtonRef.current?.focus();

    const previousOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      document.documentElement.style.overflow = previousOverflow;
      document.body.style.overflow = previousBodyOverflow;
      if (dialog?.open) dialog.close();
      if (focusTarget?.isConnected) focusTarget.focus({ preventScroll: true });
    };
  }, [returnFocus]);

  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex, section]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        closing ||
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (event.target instanceof Element && event.target.closest("video"))
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
      if (event.key === "Home") {
        event.preventDefault();
        setDetailView(false);
        setActiveIndex(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        setDetailView(false);
        setActiveIndex(filteredMedia.length - 1);
      }
    };
    addEventListener("keydown", onKeyDown);
    return () => removeEventListener("keydown", onKeyDown);
  }, [closing, filteredMedia.length, showNext, showPrevious]);

  const selectSection = (nextSection: string) => {
    setDetailView(false);
    setSection(nextSection);
    setActiveIndex(0);
  };

  const selectMedia = (index: number) => {
    setDetailView(false);
    setActiveIndex(index);
  };

  const toggleDetailView = () => {
    setDetailView((current) => !current);
  };

  if (!activeMedia) return null;

  return (
    <dialog
      ref={dialogRef}
      className={`project-gallery ${closing ? "is-closing" : ""}`.trim()}
      aria-describedby="project-gallery-summary"
      aria-labelledby="project-gallery-title"
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <div className="project-gallery__shell" data-lenis-prevent>
        <header className="project-gallery__header">
          <div>
            <p>PROJECT ARCHIVE / {collection.media.length} ASSETS</p>
            <h2 id="project-gallery-title">{collection.title}</h2>
            <span id="project-gallery-summary">{collection.summary}</span>
          </div>
          <div className="project-gallery__header-actions">
            <span aria-live="polite">
              {(activeIndex + 1).toString().padStart(2, "0")} /{" "}
              {filteredMedia.length.toString().padStart(2, "0")}
            </span>
            {activeMedia.type === "image" &&
              activeMedia.display !== "document" && (
                <button
                  type="button"
                  className="project-gallery__zoom"
                  onClick={toggleDetailView}
                  aria-label={
                    detailView ? "Fit image to viewer" : "Open image detail view"
                  }
                  aria-pressed={detailView}
                  title={detailView ? "Fit image" : "View image details"}
                >
                  {detailView ? <ZoomOut /> : <ZoomIn />}
                </button>
              )}
            <button
              ref={closeButtonRef}
              type="button"
              className="project-gallery__close"
              onClick={requestClose}
              aria-label="Close project gallery"
            >
              <X />
            </button>
          </div>
        </header>

        {sections.length > 1 && (
          <nav className="project-gallery__filters" aria-label="Media groups">
            {["All", ...sections].map((item) => (
              <button
                type="button"
                key={item}
                className={section === item ? "is-active" : ""}
                onClick={() => selectSection(item)}
                aria-pressed={section === item}
              >
                {item}
                <span>
                  {item === "All"
                    ? collection.media.length
                    : collection.media.filter((media) => media.section === item)
                        .length}
                </span>
              </button>
            ))}
          </nav>
        )}

        <section
          className="project-gallery__stage"
          aria-label={activeMedia.label}
          onPointerDown={(event) => {
            if (
              !detailView &&
              event.pointerType === "touch" &&
              !(
                event.target instanceof Element &&
                event.target.closest("video, button")
              )
            ) {
              swipeStart.current = {
                pointerId: event.pointerId,
                x: event.clientX,
                y: event.clientY,
              };
              event.currentTarget.setPointerCapture(event.pointerId);
            }
          }}
          onPointerUp={(event) => {
            if (swipeStart.current?.pointerId !== event.pointerId) return;
            const distanceX = event.clientX - swipeStart.current.x;
            const distanceY = event.clientY - swipeStart.current.y;
            swipeStart.current = null;
            if (
              Math.abs(distanceX) < 48 ||
              Math.abs(distanceX) <= Math.abs(distanceY) * 1.15
            ) {
              return;
            }
            if (distanceX > 0) showPrevious();
            else showNext();
          }}
          onPointerCancel={() => {
            swipeStart.current = null;
          }}
        >
          <div className="project-gallery__ambient" aria-hidden="true" />
          {activeMedia.type === "image" ? (
            activeMedia.display === "document" ? (
              <div
                className="project-gallery__document"
                key={activeMedia.src}
                data-lenis-prevent
              >
                <Image
                  src={activeMedia.src}
                  alt={activeMedia.alt}
                  width={activeMedia.width ?? 1220}
                  height={activeMedia.height ?? 13700}
                  loading="eager"
                  quality={85}
                  sizes="(max-width: 900px) 92vw, 920px"
                  className="project-gallery__document-image"
                />
              </div>
            ) : (
              <div
                className={`project-gallery__image-wrap ${detailView ? "is-detail" : ""}`.trim()}
                key={activeMedia.src}
                data-lenis-prevent
              >
                <div className="project-gallery__image-surface">
                  <ProgressiveGalleryImage media={activeMedia} />
                </div>
              </div>
            )
          ) : (
            <video
              key={activeMedia.src}
              className="project-gallery__video"
              src={activeMedia.src}
              poster={collection.poster}
              controls
              playsInline
              preload="none"
              aria-label={activeMedia.label}
            >
              Your browser does not support this project video.
            </video>
          )}

          {filteredMedia.length > 1 && (
            <>
              <button
                type="button"
                className="project-gallery__nav project-gallery__nav--previous"
                onClick={showPrevious}
                aria-label="Previous media"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                className="project-gallery__nav project-gallery__nav--next"
                onClick={showNext}
                aria-label="Next media"
              >
                <ChevronRight />
              </button>
            </>
          )}

          <div className="project-gallery__caption">
            <span>
              {activeMedia.type === "video" ? <Video /> : <ImageIcon />}
              {activeMedia.section}
            </span>
            <strong>{activeMedia.label}</strong>
            {detailView ? (
              <small>DETAIL VIEW · SCROLL TO EXPLORE</small>
            ) : (
              activeMedia.duration && <small>{activeMedia.duration}</small>
            )}
          </div>
        </section>

        <nav
          className="project-gallery__thumbs"
          aria-label="Choose project media"
          data-lenis-prevent
        >
          {filteredMedia.map((item, index) => (
            <button
              type="button"
              key={item.src}
              ref={index === activeIndex ? activeThumbRef : undefined}
              className={`project-gallery__thumb ${index === activeIndex ? "is-active" : ""}`.trim()}
              onClick={() => selectMedia(index)}
              aria-label={`Show ${item.label}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              {item.type === "image" && item.thumbnail !== false ? (
                <Image
                  src={item.src}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(max-width: 800px) 84px, 104px"
                  className="project-gallery__thumb-image"
                />
              ) : (
                <span className="project-gallery__thumb-placeholder">
                  {item.type === "video" ? <Play /> : <FileText />}
                </span>
              )}
              <span>{(index + 1).toString().padStart(2, "0")}</span>
            </button>
          ))}
        </nav>
      </div>
    </dialog>
  );
}

function ProgressiveGalleryImage({ media }: { media: ProjectMediaItem }) {
  const [quality, setQuality] = useState<75 | 85>(85);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <>
      <Image
        src={media.src}
        alt=""
        fill
        loading="eager"
        quality={75}
        sizes="104px"
        aria-hidden="true"
        className="project-gallery__image project-gallery__image--preview"
      />
      {!failed && (
        <Image
          key={`${media.src}-${quality}`}
          src={media.src}
          alt={media.alt}
          fill
          loading="eager"
          fetchPriority="high"
          quality={quality}
          sizes="(max-width: 900px) calc(100vw - 5rem), 82vw"
          className={`project-gallery__image project-gallery__image--main ${loaded ? "is-loaded" : ""}`.trim()}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(false);
            if (quality === 85) setQuality(75);
            else setFailed(true);
          }}
        />
      )}
      {failed && (
        <span className="project-gallery__image-error" role="alert">
          The full-resolution image could not be loaded. Showing preview.
        </span>
      )}
    </>
  );
}
