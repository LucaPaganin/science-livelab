# Physics/Math Lesson Integration Task

## Context
I have an existing Next.js repository containing physics and math lesson notes organized by topic (not by lesson). The content is in MDX files located in `content/topics/`.

## Your Task
Analyze the attached lesson materials (transcript/PDF) and help me integrate them into the existing repository WITHOUT creating duplicates.

## Process

### Step 1: Content Analysis

1. Read the attached lesson materials
2. Extract all distinct topics/concepts covered
3. For each topic, identify:
    - Main concept name
    - Key equations/formulas
    - Examples provided
    - Prerequisites/related concepts

### Step 2: Overlap Detection

1. Check `content/topics/` directory for existing topic files
2. Read `content/metadata.json` to see topic index
3. For each extracted topic, determine:
    - **NEW**: Topic doesn't exist yet → create new MDX file
    - **OVERLAP**: Topic exists → identify what's new vs redundant
    - **COMPLEMENT**: Different angle on existing topic → suggest integration

### Step 3: Integration Recommendations
For each topic, provide:
- Suggested filename (e.g., `thermodynamics-entropy.mdx`)
- Whether to CREATE NEW or UPDATE EXISTING
- If updating: specific sections to add (with source lesson annotation)
- Preserve alternative explanations using collapsible sections

### Step 4: Generate Content
Create or update MDX files with:
- Frontmatter (title, topics, source lessons, date)
- LaTeX equations using `$...$` or `$$...$$`
- Collapsible sections for alternative explanations
- Proper heading hierarchy

## Output Format
Provide:
1. Summary table of topics found and actions (NEW/UPDATE/SKIP)
2. MDX file content for new topics
3. Specific additions for existing topics (marked with <!-- From Lesson X -->)
4. Updated metadata.json if new topics added

## Current Repository State
- Existing topics are in: `content/topics/`
- Metadata index is in: `content/metadata.json`
- Check these before making recommendations

Transcript is at