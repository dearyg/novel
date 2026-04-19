import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

export default function About() {
  return (
    <>
      <Head>
        <title>About — The Senior Observer</title>
      </Head>

      <Layout>
        <article className="py-10 md:py-16 px-4">
          <div className="max-w-[65ch] mx-auto">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors mb-8">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              Back
            </Link>

            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-8">About This Novel</h1>

            <div className="space-y-6 text-sm text-secondary leading-relaxed">

              <section>
                <h2 className="text-base font-semibold text-primary mb-2">The Story</h2>
                <p>
                  <em>The Senior Observer</em> is an ongoing techno-existential thriller set in 2030.
                  It follows Jeff Zhang, a Senior SDE in Irvine, as he begins experiencing
                  "somatic bleeds" — phantom sensations from lives that aren't his. The novel
                  explores identity, consciousness, and the thin membrane between selves through
                  the lens of software architecture.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-primary mb-2">How It's Made</h2>
                <p>
                  This novel uses a human-AI collaborative process:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li>
                    <strong className="text-primary">Human-authored plot</strong> — all narrative
                    architecture, character arcs, themes, and chapter blueprints are written by the author.
                  </li>
                  <li>
                    <strong className="text-primary">AI-refined prose</strong> — each chapter goes through
                    multiple AI-assisted revision passes to sharpen language, deepen metaphor, and polish
                    pacing. The author directs every iteration.
                  </li>
                  <li>
                    <strong className="text-primary">Multiple reading styles</strong> — AI generates
                    alternative stylistic renditions (Literary, Concise, Cinematic) of the same chapter,
                    giving readers control over voice and density.
                  </li>
                  <li>
                    <strong className="text-primary">Dynamic localization</strong> — certain story elements
                    adapt to the reader's city, making the experience personal.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-base font-semibold text-primary mb-2">AI Transparency</h2>
                <p>
                  We believe in full transparency about AI's role. The creative direction — what happens,
                  why it matters, who these characters are — is entirely human. AI is a tool in the
                  revision process, similar to how an editor refines a manuscript, except it can
                  produce multiple stylistic variants simultaneously. No chapter is published without
                  human review and approval.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-primary mb-2">Copyright</h2>
                <p>
                  All content on this site — including narrative text, character designs, the
                  technical blueprint system, and the chapter architecture — is the intellectual
                  property of Alayido, LLC. The novel is published freely for reading but may not
                  be reproduced, distributed, or adapted without permission.
                </p>
                <p className="mt-2 text-xs text-muted">
                  &copy; {new Date().getFullYear()} Alayido, LLC. All rights reserved.
                </p>
              </section>

              <section>
                <h2 className="text-base font-semibold text-primary mb-2">Contact</h2>
                <p>
                  Reach us at <span className="text-primary">alayido.me@gmail.com</span>.
                </p>
              </section>
            </div>
          </div>
        </article>
      </Layout>
    </>
  );
}
