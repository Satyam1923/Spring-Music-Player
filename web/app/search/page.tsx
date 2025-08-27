"use client";

import { Suspense } from "react";
import Search from "./Search";

export default function Page() {
  return (
    <Suspense
      fallback={<div className="text-center py-8">Loading search...</div>}
    >
      <Search />
    </Suspense>
  );
}
