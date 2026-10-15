"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { coverageLocations } from "@/utils/coverageLocations";
import styles from "./LocationsCovered.module.scss";

const tileUrl = process.env.NEXT_PUBLIC_MAP_TILE_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = process.env.NEXT_PUBLIC_MAP_ATTRIBUTION || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const overviewOptions = { paddingTopLeft: [45, 50], paddingBottomRight: [100, 50], maxZoom: 10 };

function pinIcon(selected) {
  return L.divIcon({
    className: styles.marker,
    html: `<span class="${styles.pin} ${selected ? styles.selectedPin : ""}"><svg width="36" height="44" viewBox="0 0 36 44" aria-hidden="true"><path d="M18 1C8.6 1 1 8.6 1 18c0 12 17 25 17 25s17-13 17-25C35 8.6 27.4 1 18 1Z" fill="currentColor" stroke="white" stroke-width="2"/><circle cx="18" cy="18" r="6" fill="white"/></svg></span>`,
    iconSize: [36, 44],
    iconAnchor: [18, 43],
    tooltipAnchor: [12, -24],
  });
}

export default function CoverageMap({ selection, onSelect }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef(new Map());
  const selectionRef = useRef(selection);
  selectionRef.current = selection;
  const [ready, setReady] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      zoomControl: false,
      minZoom: 7,
      maxZoom: 17,
      zoomSnap: 0.5,
      zoomAnimation: !reducedMotion,
      fadeAnimation: !reducedMotion,
    });
    mapRef.current = map;
    const tiles = L.tileLayer(tileUrl, { attribution, maxZoom: 19 }).addTo(map);
    let failedTiles = 0;
    tiles.on("tileerror", () => {
      failedTiles += 1;
      if (failedTiles >= 3) setMapError(true);
    });
    tiles.on("tileload", () => {
      failedTiles = 0;
      setMapError(false);
    });
    L.control.zoom({ position: "topright" }).addTo(map);
    coverageLocations.forEach((location) => {
      const marker = L.marker(location.coordinates, {
        icon: pinIcon(false),
        title: `Explore ${location.name}`,
        alt: `Explore ${location.name}`,
        riseOnHover: true,
      }).addTo(map);
      marker.bindTooltip(location.name, {
        permanent: Boolean(location.primary),
        direction: "right",
        className: styles.mapLabel,
      });
      marker.on("click", () => onSelect(location.id));
      markersRef.current.set(location.id, marker);
    });
    map.fitBounds(coverageLocations.map((location) => location.coordinates), overviewOptions);
    const observer = new ResizeObserver(() => {
      map.invalidateSize({ animate: false });
      if (!selectionRef.current.id) {
        map.fitBounds(coverageLocations.map((location) => location.coordinates), { ...overviewOptions, animate: false });
      }
    });
    observer.observe(containerRef.current);
    setReady(true);

    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, [onSelect]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const selectedId = selection.id;
    const selected = coverageLocations.find((location) => location.id === selectedId);
    markersRef.current.forEach((marker, id) => {
      marker.setIcon(pinIcon(id === selectedId));
      marker.setZIndexOffset(id === selectedId ? 1000 : 0);
    });
    map.stop();
    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (selected) {
      map.flyTo(selected.coordinates, selected.zoom, { animate, duration: 0.8 });
      markersRef.current.get(selected.id)?.openTooltip();
    } else {
      map.fitBounds(coverageLocations.map((location) => location.coordinates), { ...overviewOptions, animate });
    }
  }, [selection, ready]);

  return (
    <div className={styles.mapCanvasWrapper}>
      <div id="coverage-map" ref={containerRef} className={styles.mapCanvas} role="region" aria-label="Interactive map of Fern Cleaning service areas" />
      {mapError && <p className={styles.mapError} role="status">Map tiles couldn’t load. You can still choose an area from the list or try again later.</p>}
    </div>
  );
}
