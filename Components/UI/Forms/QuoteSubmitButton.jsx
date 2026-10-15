"use client";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./FormStyle.module.scss";

export default function QuoteSubmitButton({ isLoading, variant = "default" }) {
  return (
    <Button
      type="submit"
      variant="contained"
      loading={isLoading}
      aria-busy={isLoading}
      aria-label={isLoading ? "Sending your quote request" : undefined}
      className={styles.submitButton}
      fullWidth
      loadingIndicator={
        <span className={styles.loadingContent}>
          <CircularProgress size={20} color="inherit" aria-label="Sending your quote request" />
          <span>Sending…</span>
        </span>
      }
      endIcon={!isLoading && variant === "hero" ? <ArrowForwardIcon /> : undefined}
    >
      <span className={styles.submitLabel} aria-hidden={isLoading}>
        {variant === "hero" ? "Submit" : "Get My Free Quote"}
      </span>
    </Button>
  );
}
