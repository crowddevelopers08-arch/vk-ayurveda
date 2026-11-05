"use client";

import { useSyncExternalStore } from "react";
import { campCopy, type CampLang } from "./data";

// Same key and event as the site's other language toggles.
const STORAGE_KEY = "vk-language";
const CHANGE_EVENT = "vk-language-change";

let current: CampLang | null = null;

function getLang(): CampLang {
  if (current) return current;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ta") current = saved;
  } catch {
    // Storage can be blocked; the page still works in English for this visit.
  }
  return current ?? "en";
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

export function setCampLang(next: CampLang) {
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // The choice just won't survive a reload.
  }
  window.dispatchEvent(new CustomEvent<CampLang>(CHANGE_EVENT, { detail: next }));
}

export function useCampLang() {
  const lang = useSyncExternalStore(subscribe, getLang, () => "en" as CampLang);
  return { lang, copy: campCopy[lang] };
}
