---
name: chrome-devtools-storybook
description: Use the chrome-devtools MCP to run browser tests on local Storybook stories by navigating directly to `iframe.html` story URLs instead of the outer docs pages.
---

# Chrome DevTools + Storybook Browser Tests

Use the `project-0-spark-chrome-devtools` MCP server to run browser-level tests and interactions against local Storybook stories. Storybook renders stories inside iframes on the docs pages, so you must always target the underlying `iframe.html` story URL to avoid unnecessary DOM exploration.

## When to Use

- User asks for **browser-based testing** or **visual checks** of a Storybook component
- User mentions **chrome devtools**, **CDP**, **DevTools MCP**, or similar
- User provides a **Storybook URL on `http://localhost:6006`** (or another Storybook host)
- You need to **interact with a specific story** (click, type, focus, keyboard navigation, screenshots, etc.)

## Storybook URL Rules

Storybook has two kinds of URLs:

- **Docs pages** (outer shell with iframes and MDX):  
  `http://localhost:6006/?path=/docs/components-accordion--docs`
- **Story iframes** (what you actually want to test):  
  `http://localhost:6006/iframe.html?id=components-accordion--default&viewMode=story`

**Always navigate chrome-devtools to the iframe URL**, not the docs page.

### Converting docs/story URLs to iframe URLs

1. **Docs page URL** (`?path=/docs/...`):
   - Example: `http://localhost:6006/?path=/docs/components-accordion--docs`
   - Extract the part after `/docs/` and before `--docs` → here: `components-accordion`
   - Build the default story id by appending `--default`:
     - `id=components-accordion--default`
   - Final iframe URL:
     - `http://localhost:6006/iframe.html?id=components-accordion--default&viewMode=story`

2. **Story page URL** (`?path=/story/...`):
   - Example: `http://localhost:6006/?path=/story/components-accordion--with-icon`
   - Extract everything after `/story/` → here: `components-accordion--with-icon`
   - Use this as the `id` directly:
     - `id=components-accordion--with-icon`
   - Final iframe URL:
     - `http://localhost:6006/iframe.html?id=components-accordion--with-icon&viewMode=story`

3. **Other query params**:
   - Always include `viewMode=story` in the iframe URL.
   - If the user provides `globals`, `args`, or other query parameters, append them to the iframe URL as-is.

### Examples

- User URL: `http://localhost:6006/?path=/docs/components-accordion--docs`  
  → Use with chrome-devtools:  
  `http://localhost:6006/iframe.html?id=components-accordion--default&viewMode=story`

- User URL: `http://localhost:6006/?path=/story/components-accordion--with-icon`  
  → Use with chrome-devtools:  
  `http://localhost:6006/iframe.html?id=components-accordion--with-icon&viewMode=story`

## Using the chrome-devtools MCP

1. **Resolve the correct Storybook URL**
   - If the user gives a docs or story URL (`?path=/docs/...` or `?path=/story/...`), **first convert it** to the corresponding `iframe.html` URL as described above.
   - If the user already gives an `iframe.html` URL with an `id` and `viewMode`, use it directly.

2. **Navigate directly to the iframe URL**
   - In your MCP calls to `project-0-spark-chrome-devtools`, **never ask it to search inside the docs page for the story iframe**.
   - Instead, instruct it to open the computed `iframe.html` URL directly. This avoids the extra layer of Storybook UI and speeds up tests.

3. **Run interactions and checks**
   - Once on the iframe URL, interact with the component as if it were a standalone page:
     - Find elements by role, text, or data attributes
     - Perform clicks, keyboard navigation, focus/blur, etc.
     - Take screenshots or inspect DOM/CSS as needed

4. **Assumptions**
   - Storybook is running locally on `http://localhost:6006` unless the user specifies another base URL.
   - Component IDs follow the standard Storybook pattern (`<group>-<component>--<storyName>`).
   - The `--default` story name exists for docs pages when you derive it from `...--docs`.

By always converting to the `iframe.html` URL first, the chrome-devtools MCP avoids wasting time exploring Storybook’s outer docs UI and directly loads the markup for the story under test.

