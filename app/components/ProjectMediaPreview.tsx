"use client";

import Image from "next/image";
import { Images, Maximize2, Play } from "lucide-react";
import type { ProjectMediaPreview } from "../data/projectMediaPreviews";

export default function ProjectMediaPreview({
  media,
  projectCode,
  projectName,
  onOpen,
  onPreload,
}: {
  media: ProjectMediaPreview;
  projectCode: string;
  projectName: string;
  onOpen: (initialIndex: number, trigger: HTMLButtonElement) => void;
  onPreload: () => void;
}) {
  return (
    <button
      type="button"
      className={`project-preview project-preview--${media.layout}`}
      aria-haspopup="dialog"
      aria-label={`Open ${projectName} media gallery with ${media.total} items`}
      onClick={(event) => {
        const frame =
          event.target instanceof Element
            ? event.target.closest<HTMLElement>("[data-media-index]")
            : null;
        onOpen(Number(frame?.dataset.mediaIndex ?? 0), event.currentTarget);
      }}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        const card = event.currentTarget.closest<HTMLElement>(".project-card");
        card?.style.setProperty("--card-rx", "0deg");
        card?.style.setProperty("--card-ry", "0deg");
      }}
      onFocus={onPreload}
      onPointerEnter={onPreload}
    >
      <span className="project-preview__frames" aria-hidden="true">
        {media.items.map((item, index) => (
          <span
            className={`project-preview__frame project-preview__frame--${index + 1}`}
            data-media-index={index}
            key={item.src}
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt=""
                fill
                quality={85}
                sizes={getPreviewSizes(media.layout, index)}
                className="project-preview__image"
              />
            ) : (
              <span className="project-preview__video-card">
                <span className="project-preview__pulse" />
                <Play />
                <strong>{item.label}</strong>
                <small>{item.duration}</small>
              </span>
            )}
          </span>
        ))}
      </span>

      <span className="project-preview__topline" aria-hidden="true">
        <span>{projectCode}</span>
        {media.hasVideo && (
          <span>
            <Play /> VIDEO
          </span>
        )}
      </span>

      <span className="project-preview__action" aria-hidden="true">
        <span>
          <Images />
          <b>{media.total.toString().padStart(2, "0")}</b>
          <small>MEDIA</small>
        </span>
        <span>
          OPEN MEDIA GALLERY <Maximize2 />
        </span>
      </span>
    </button>
  );
}

function getPreviewSizes(
  layout: ProjectMediaPreview["layout"],
  index: number,
) {
  if (layout === "portrait") {
    return "(max-width: 600px) 96px, (max-width: 900px) 120px, 140px";
  }
  if (layout === "landscape" && index > 0) {
    return "(max-width: 600px) 40vw, (max-width: 900px) 38vw, 19vw";
  }
  return "(max-width: 600px) calc(100vw - 4.4rem), (max-width: 900px) calc(100vw - 6rem), 42vw";
}
