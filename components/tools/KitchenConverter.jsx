import React from "react";
import IngredientConverter from "@/components/tools/IngredientConverter";
import TemperatureConverter from "@/components/tools/TemperatureConverter";

export default function KitchenConverter() {
  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
      <IngredientConverter />
      <TemperatureConverter />
    </div>
  );
}