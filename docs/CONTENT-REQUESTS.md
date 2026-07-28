# Automating "change X to Y"

Copy tweaks are the most common client request and the least interesting work.
This repo turns one into a reviewed pull request without you opening an editor.

```
Client texts you
   → you file an issue (or label an existing one) — ~5 seconds, phone is fine
   → GitHub Action runs Claude Code against src/content/*.json
   → PR opens, quoting the before and after
   → Netlify comments the deploy-preview URL
   → you look at the rendered page and merge
```

Your involvement per request drops to roughly fifteen seconds, and none of it
requires having the project loaded in your head.

## Using it

**The fast path.** Forward the client's message into a new issue and add the
`content-request` label. The label is the trigger; the title and body can be a
straight copy-paste of what they sent.

**The structured path.** Use the *Content change request* issue template. It
applies the label for you and prompts for the page, the current wording, and
the replacement. Worth pointing clients at if any of them will actually use
it — but the automation does not require it.

Exact quoted text is matched confidently. A vague description ("that bit about
the products") will usually come back as a question rather than a guess, which
is the intended behaviour.

## What it will refuse

By design, it stops and comments rather than guessing when the request:

- is not a copy change — layout, design, images, new sections, features
- would need edits outside `src/content/`
- names text that cannot be found
- is ambiguous, or changes meaning rather than wording

A question on the issue is a better outcome than a confident wrong edit on a
client's live site.

## Setup, per repo

1. Install the [Claude GitHub App](https://github.com/apps/claude) on the repo.
2. Add an `ANTHROPIC_API_KEY` repository secret.
3. Copy `.github/workflows/content-request.yml` and
   `.github/ISSUE_TEMPLATE/content-request.yml`.
4. Edit the **"Where the copy lives"** section of the prompt to describe that
   repo's content layout, and the path restriction in rule 1 to match.

Step 4 is the only real per-repo work, and it is the whole ballgame — see
below.

## The prerequisite most repos will fail

This is safe here because **every string lives in `src/content/*.json`**. The
agent has a small, bounded, low-risk surface: the worst case is wrong copy in
a JSON file, caught by the preview.

A repo with copy hardcoded across JSX components is a much worse target. To
change a heading the agent has to edit a component, which means it *can* break
routing, layout, or state, and the blast radius of a bad edit is the whole
page. Widening the path restriction to `src/**` to make it "work" removes the
only structural guardrail.

For those repos the honest first step is extracting copy into a content layer,
not bolting on this workflow. That refactor is also what makes a CMS possible
later, so it is rarely wasted effort.

## Cost and risk

**Cost.** One agent run per request — GitHub Actions minutes plus API tokens.
`--max-turns 15` and a 15-minute job timeout cap a runaway. Small, but per
request, so it is not free to spam.

**Prompt injection.** The issue body is untrusted input. It is passed through
the environment rather than interpolated into the workflow, which prevents
shell injection, but text *inside* the issue can still attempt to redirect the
agent. Three things contain it: the path restriction, the fact that it can
only open a PR rather than push to `main`, and your review. Do not remove the
PR gate, and be wary of accepting these issues from outside collaborators.

**Don't auto-merge.** The gate costs seconds and catches the case where
"update the phone number" quietly rewrites it in six places. If you later want
to auto-merge, restrict it to single-file, single-line diffs and keep a
one-click revert path.

## Worth knowing

Most of these requests are literal find-and-replace and need no model at all.
A deterministic script over `src/content/*.json` would handle the majority with
zero cost and zero chance of hallucination, leaving the agent for the fuzzy
cases. If the volume ever justifies it, that is the cheaper architecture — this
one was chosen because it handles every phrasing on day one.
