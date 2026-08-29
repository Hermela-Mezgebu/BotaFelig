"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Share2,
  X,
} from "lucide-react";

type BillboardGalleryProps = {
  title: string;
  location: string;
  images: string[];
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85";

export default function BillboardGallery({
  title,
  location,
  images,
}: BillboardGalleryProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  /*
   * ------------------------------------------------------------
   * GALLERY DATA
   * ------------------------------------------------------------
   *
   * We intentionally DO NOT remove duplicate URLs.
   *
   * A billboard can have the same image more than once in the
   * data. Instead, we give every rendered item a unique React key.
   */
  const gallery = useMemo(() => {
    if (images.length > 0) {
      return images;
    }

    return [FALLBACK_IMAGE];
  }, [images]);

  /*
   * ------------------------------------------------------------
   * KEEP ACTIVE IMAGE VALID
   * ------------------------------------------------------------
   *
   * If the billboard changes or the number of images changes,
   * make sure activeImage is still inside the array.
   */
  useEffect(() => {
    setActiveImage((current) => {
      if (gallery.length === 0) {
        return 0;
      }

      if (current >= gallery.length) {
        return gallery.length - 1;
      }

      return current;
    });
  }, [gallery.length]);

  /*
   * ------------------------------------------------------------
   * SHARE
   * ------------------------------------------------------------
   */
  const handleShare = async () => {
    const url = window.location.href;

    const shareData = {
      title,
      text: `Check out ${title} on BotaFelig`,
      url,
    };

    try {
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function"
      ) {
        await navigator.share(shareData);
        return;
      }

      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard
      ) {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard.");
        return;
      }

      alert(url);
    } catch {
      /*
       * The user may cancel the native share dialog.
       * Nothing needs to happen in that case.
       */
    }
  };

  /*
   * ------------------------------------------------------------
   * PREVIOUS IMAGE
   * ------------------------------------------------------------
   */
  const previousImage = () => {
    setActiveImage((current) =>
      current === 0
        ? gallery.length - 1
        : current - 1,
    );
  };

  /*
   * ------------------------------------------------------------
   * NEXT IMAGE
   * ------------------------------------------------------------
   */
  const nextImage = () => {
    setActiveImage((current) =>
      current === gallery.length - 1
        ? 0
        : current + 1,
    );
  };

  /*
   * ------------------------------------------------------------
   * OPEN LIGHTBOX
   * ------------------------------------------------------------
   */
  const openLightbox = (index: number) => {
    setActiveImage(index);
    setShowAllPhotos(true);
  };

  /*
   * ------------------------------------------------------------
   * CLOSE LIGHTBOX
   * ------------------------------------------------------------
   */
  const closeLightbox = () => {
    setShowAllPhotos(false);
  };

  /*
   * ------------------------------------------------------------
   * ESCAPE KEY
   * ------------------------------------------------------------
   */
  useEffect(() => {
    if (!showAllPhotos) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [showAllPhotos, gallery.length]);

  return (
    <>
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight text-zinc-950 sm:text-3xl lg:text-4xl dark:text-white">
            {title}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="text-[#A04100]">
                ●
              </span>

              {location}
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-zinc-300 sm:block dark:bg-zinc-700" />

            <span className="flex items-center gap-1 font-semibold text-zinc-800 dark:text-zinc-200">
              <span className="text-amber-500">
                ★
              </span>

              4.9

              <span className="font-normal text-zinc-500 dark:text-zinc-400">
                (12 reviews)
              </span>
            </span>
          </div>
        </div>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <div className="flex shrink-0 items-center gap-2">
          {/* Share */}

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <Share2 className="h-4 w-4" />

            <span>Share</span>
          </button>

          {/* Save */}

          <button
            type="button"
            onClick={() =>
              setIsSaved((current) => !current)
            }
            className={
              isSaved
                ? "inline-flex h-10 items-center gap-2 rounded-xl border border-[#A04100]/30 bg-[#A04100]/10 px-4 text-sm font-semibold text-[#A04100] transition dark:border-[#FD7C33]/30 dark:bg-[#FD7C33]/10 dark:text-[#FD7C33]"
                : "inline-flex h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            }
          >
            <Heart
              className="h-4 w-4"
              fill={
                isSaved
                  ? "currentColor"
                  : "none"
              }
            />

            <span>
              {isSaved ? "Saved" : "Save"}
            </span>
          </button>
        </div>
      </div>

      {/* ======================================================
          DESKTOP GALLERY
      ====================================================== */}

      <div className="hidden overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:block">
        <div className="grid h-[520px] grid-cols-[minmax(0,3fr)_minmax(220px,1fr)] gap-1">
          {/* Main Image */}

          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="group relative overflow-hidden"
            aria-label={`View ${title} main image`}
          >
            <img
              src={gallery[0]}
              alt={`${title} main view`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
          </button>

          {/* Right Images */}

          <div className="grid grid-rows-2 gap-1">
            {gallery
              .slice(1, 3)
              .map((image, index) => {
                const actualIndex =
                  index + 1;

                return (
                  <button
                    type="button"
                    /*
                     * IMPORTANT:
                     *
                     * Do NOT use:
                     *
                     * key={image}
                     *
                     * because two images can have the
                     * same URL.
                     *
                     * The index makes the key unique.
                     */
                    key={`${image}-${actualIndex}`}
                    onClick={() =>
                      openLightbox(
                        actualIndex,
                      )
                    }
                    className="group relative overflow-hidden"
                    aria-label={`View ${title} image ${actualIndex + 1}`}
                  >
                    <img
                      src={image}
                      alt={`${title} view ${actualIndex + 1}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />

                    <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

                    {/* Show All Photos */}

                    {index === 1 &&
                      gallery.length > 3 && (
                        <div className="absolute bottom-4 right-4">
                          <span className="inline-flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2.5 text-xs font-bold text-zinc-900 shadow-lg backdrop-blur-sm dark:bg-zinc-950/95 dark:text-white">
                            <span className="text-sm">
                              ▦
                            </span>

                            Show all photos
                          </span>
                        </div>
                      )}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* ======================================================
          MOBILE GALLERY
      ====================================================== */}

      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 md:hidden">
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className="relative block aspect-[4/3] w-full"
          aria-label={`View ${title} photos`}
        >
          <img
            src={gallery[0]}
            alt={`${title} main view`}
            className="h-full w-full object-cover"
          />

          <div className="absolute bottom-4 right-4 rounded-lg bg-white/95 px-3 py-2 text-xs font-bold text-zinc-900 shadow-lg dark:bg-zinc-950/95 dark:text-white">
            ▦ {gallery.length} photos
          </div>
        </button>
      </div>

      {/* ======================================================
          PHOTO LIGHTBOX
      ====================================================== */}

      {showAllPhotos && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo gallery`}
        >
          {/* Close */}

          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Previous */}

          {gallery.length > 1 && (
            <button
              type="button"
              onClick={previousImage}
              className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
              aria-label="Previous image"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          {/* Image */}

          <div className="flex max-h-[90vh] max-w-6xl flex-col items-center">
            <img
              src={gallery[activeImage]}
              alt={`${title} gallery image ${activeImage + 1}`}
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
            />

            <p className="mt-4 text-sm font-medium text-white/70">
              {activeImage + 1} /{" "}
              {gallery.length}
            </p>
          </div>

          {/* Next */}

          {gallery.length > 1 && (
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
              aria-label="Next image"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </>
  );
}