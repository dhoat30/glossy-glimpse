"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { coverageLocations } from "@/utils/coverageLocations";
import styles from "./LocationsCovered.module.scss";

const CoverageMap = dynamic(() => import("./CoverageMap"), {
  ssr: false,
  loading: () => <div className={styles.mapPlaceholder}>Loading coverage map…</div>,
});

export default function LocationsCovered() {
  const sectionRef = useRef(null);
  const mapPanelRef = useRef(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [selection, setSelection] = useState({ id: null });
  const selectedId = selection.id;
  // A fresh selection also recentres an already selected area after manual panning.
  const selectLocation = useCallback((id) => setSelection({ id }), []);
  const selectedLocation = coverageLocations.find((location) => location.id === selectedId);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMapVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const locationButton = (location, compact = false) => (
    <button
      key={location.id}
      type="button"
      className={`${compact ? styles.townButton : styles.locationButton} ${selectedId === location.id ? styles.activeLocation : ""}`}
      aria-pressed={selectedId === location.id}
      aria-controls="coverage-map"
      onClick={() => {
        selectLocation(location.id);
        if (window.matchMedia("(max-width: 900px)").matches) {
          const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          mapPanelRef.current?.scrollIntoView({ block: "start", behavior: reducedMotion ? "instant" : "smooth" });
        }
      }}
    >
      <PlaceOutlinedIcon aria-hidden="true" />
      <span>
        <span className={styles.locationName}>{location.name}</span>
        {!compact && <span className={styles.locationDescription}>{location.description}</span>}
      </span>
      {!compact && <ArrowForwardIcon className={styles.locationArrow} aria-hidden="true" />}
    </button>
  );

  return (
    <section className={styles.section} id="areas-we-cover" ref={sectionRef} aria-labelledby="coverage-heading">
      <div className={styles.container}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>NEAR YOU, ACROSS THE WAIKATO</p>
          <h2 id="coverage-heading">Where we clean</h2>
          <p className={styles.intro}>
            From Hamilton to Matamata, Cambridge and Te Kūiti, we cover the suburbs,
            towns and rural properties in between.
          </p>
        </div>

        <div className={styles.coverageGrid}>
          <div className={styles.locationsPanel}>
            <h3>Find your area</h3>
            <p className={styles.hint}>Choose a location to explore the map.</p>
            <div className={styles.mainLocations}>
              {coverageLocations.filter((location) => location.primary).map((location) => locationButton(location))}
            </div>
            <h4>And the places in between</h4>
            <div className={styles.nearbyLocations}>
              {coverageLocations.filter((location) => !location.primary).map((location) => locationButton(location, true))}
            </div>
            <p className={styles.coverageNote}>Nearby village or rural address? Include it in your quote request and we’ll help.</p>
            <Link href="/get-free-quote" className={styles.quoteLink}>
              Get a quote for your area <ArrowForwardIcon aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.mapPanel} ref={mapPanelRef}>
            <div className={styles.mapHeader}>
              <div>
                <span className={styles.mapEyebrow}>FERN CLEANING COVERAGE</span>
                <p aria-live="polite">{selectedLocation ? selectedLocation.name : "All service areas"}</p>
              </div>
              <button type="button" className={styles.resetButton} onClick={() => selectLocation(null)}>
                Show all areas
              </button>
            </div>
            {mapVisible
              ? <CoverageMap selection={selection} onSelect={selectLocation} />
              : <div className={styles.mapPlaceholder}>Loading coverage map…</div>}
            <div className={styles.mapFooter}>
              <span className={styles.legendDot} aria-hidden="true" />
              <span>Towns, suburbs &amp; surrounding rural areas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
