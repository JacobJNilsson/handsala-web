---
title: The pipeline is not the work
author: Jacob Nilsson
excerpt: For years I built analytics tools, and the pipelines that fed them. The pipeline was never the expensive part. The change was. Knyta is my attempt to make the change cheap again.
coverImage: /images/knyta.webp
tags:
  - knyta
  - data-ingestion
  - ai-agents
  - building-in-public
---

For a few years I built analytics tools, and I built the pipelines that fed them. Data arrived from APIs, from CSV exports, and from spreadsheets. Moving that data was the largest time sink in the company. The analytics work was what I got to do when the pipelines were quiet.

I am now building an ingestion engine called Knyta, which is Swedish for to tie a knot. It reads the files other people send you and writes them into your database. This post is about why.

## Where the time went

At my first job I built a CSV ingestion tool, to buy the developers their time back. You wrote the mapping in a config file. You pointed the tool at an S3 bucket. If a file matched the config, the rows landed in our system. After that, the tool ran without us.

The files still changed. A customer renamed a column, or added one, or moved one. But our support team owned that config, and they could correct it themselves. The fix took minutes, and it never reached a developer. We were happy with that tool for a long time.

We also kept someone on call for the API pipelines. The pipelines were fine. The providers moved. An endpoint went down for an hour. A token expired. A field changed type, or a list became an object. One large provider changed a response shape overnight, then changed it back the next morning. Every one of those events needed a developer, who read the logs, edited the code, deployed it, and backfilled the gap. The end user only saw a number that was wrong for a day.

Two systems, one difference. When a CSV changed, the support team fixed it and I never heard about it. When an API changed, an engineer got a phone call. The pipeline was never the expensive part. The change was.

I left that company before language models became useful. But I already knew what I wanted: a system that reads the logs and the file. It finds what changed, and it absorbs the noise before the noise reaches me.

## Ingestion is the slow part now

Building the frontend got cheap. Agents made it cheaper still. The data behind it did not get cheaper at all, and the data is where the value is. Every app I want to build is worth something only because it joins sources that were never meant to meet. Getting that data in, and keeping it coming in, took more of my evenings than the app itself.

About a year ago I started to think an agent could do that work. My first attempt generated a pipeline with one prompt, then patched it with more generated prompts until the output looked right. Agents that write files were not common yet. It produced something, but I could not tell you what it would do tomorrow.

## How it works

The structure I settled on splits the work in two. The agent writes the pipeline once, and a human reviews it. Plain deterministic code then runs that pipeline every day after. The agent works with typed inputs and typed outputs, explicit state, and a small set of actions. It does not hold a connection to production.

## What breaks in real files

I test Knyta against my own money. I kept a Google Sheet that tracked my net worth across several banks. Some banks give a clean CSV. Others give a PDF the sheet cannot read. So I built a proper frontend for it. That gave me a tracker I use, and a real workload for the engine.

One clean CSV was easy. Then I pointed the engine at the rest of my files.

- Ten PDF statements from one bank, all in the same layout. Half contain real text. The other half are images of text.
- Spreadsheets with several tables on a single sheet.
- Blocks that a person reads as a table, and that a parser reads as loose cells.

The engine reads those files. The danger is a wrong read that looks right. It must not write last month's balances into this month's rows. It must not put a loan in the assets column. It must not decide on its own that a new column is close enough to an old one. Each of those mistakes is quiet, and a quiet mistake in a finance table is worse than a crash.

The harder questions are not about parsing at all. Two files arrive from the same bank: are they one dataset, or two? A file lands before the data that gives it meaning: ingest it now, or wait? A config file cannot express those judgements. That is the part I want an agent for.

## Untrusted input

One evening I worked through what an attacker could reach, and stopped at the CHECK expression on a database column. What if a user attempts prompt injection there? The schema is text. My agent reads the schema. Therefore the schema is untrusted input. I had never thought of a column constraint as an attack surface. Now the engine refuses to interpret an expression it cannot reduce, and Postgres enforces it instead.

The next step is other people's files, and that changes the problem. My own PDF is a workload. A stranger's PDF is untrusted input. The surface for injection is large, and I do not expect to find every part of it. So the system assumes that an injection lands, and it limits what a successful one can reach.

## What Knyta does today

I am running Knyta locally to feed the wealth tracker. It takes those files and writes them into Postgres. That is the whole scope today. It does not read from APIs yet, and Postgres is the only destination.

The end goal is a self-serve tool. It is too early for that, so I run it as a white-glove service. I build your pipeline with you, and you review the data before it lands. Nothing new reaches your database without your approval. That may relax as the engine earns trust, but not yet.

That old CSV tool worked because it ran without us, and because the people closest to the customer could correct it in minutes. Knyta aims at the same result for much messier input. When a sender changes the shape, Knyta works out the correction and asks you to approve it. Nobody edits a script at 23:00.

I am taking on a small number of pipelines now. If files arrive in a shape you do not control, write to me at [jacob@handsala.com](mailto:jacob@handsala.com). There is more at [knyta.net](https://knyta.net).
