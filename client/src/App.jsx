import { useState } from 'react'
import './index.css'

export default function App() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Step 2 complete
        </p>
        <h1 className="mt-4 font-display text-display-lg">
          Tailwind v4 is live
        </h1>
        <p className="mt-4 text-lg text-muted">
          Design tokens, self-hosted fonts and base styles are wired up.
        </p>
        <button
          type="button"
          className="mt-8 rounded-btn bg-accent px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-accent-strong"
        >
          Accent button
        </button>
        <div className="mt-12 rounded-card border border-line bg-white p-8 text-left">
          <h2 className="font-display text-display-md">Card preview</h2>
          <p className="mt-2 text-muted">
            Warm off-white canvas, hairline borders, exactly two radii.
          </p>
        </div>
      </main>

      <section className="bg-ink py-16 text-center text-cream">
        <p>Dark ink band — reserved for section rhythm in later steps</p>
      </section>
    </>
  );
}