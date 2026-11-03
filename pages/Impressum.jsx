import React from "react";
import LegalArticle from "@/components/LegalArticle";
import { IMPRESSUM } from "@/lib/legalContent";

export default function Impressum() {
  return <LegalArticle content={IMPRESSUM} />;
}