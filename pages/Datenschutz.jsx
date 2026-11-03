import React from "react";
import LegalArticle from "@/components/LegalArticle";
import { DATENSCHUTZ } from "@/lib/legalContent";

export default function Datenschutz() {
  return <LegalArticle content={DATENSCHUTZ} />;
}