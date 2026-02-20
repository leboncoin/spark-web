# AGENTS.md

> **⚠️ This file has been migrated to the modern structure**
>
> This project now uses Cursor's Rules, Skills, and Subagents structure for better AI agent support:
>
> - **Rules** (`.cursor/rules/`): Always-applied project standards
>   - `project-overview.md` - Project architecture and overview
>   - `component-guidelines.md` - Component development standards
>   - `code-style.md` - Code conventions and workflow
>   - `accessibility-standards.md` - WCAG 2.1 AA compliance standards
> - **Skills** (`.cursor/skills/`): Task-specific instructions
>   - `create-component/` - Create a new component with full structure
>   - `generate-tests/` - Generate unit tests for components
>   - `create-storybook-docs/` - Create Storybook stories and documentation
>   - `check-accessibility/` - Verify accessibility compliance
>   - `run-quality-checks/` - Run all quality checks (lint, typecheck, tests)
> - **Subagents** (`.cursor/agents/`): Specialized agents for complex tasks
>   - `component-reviewer.md` - Review components for compliance
>   - `refactoring-assistant.md` - Assist with component refactoring
>
> ## Cross-Platform Compatibility
>
> For **Claude Code** compatibility, symlinks are available:
>
> - `.claude/skills/` → symlinked to `.cursor/skills/`
> - `.claude/agents/` → symlinked to `.cursor/agents/`
>
> ## Usage
>
> - **In Cursor**: Rules are automatically applied, Skills can be invoked with `/skill-name`
> - **In Claude Code**: Skills in `.claude/skills/` are automatically available
> - **Universal fallback**: This file serves as a reference for tools that look for `AGENTS.md`
>
> See `.cursor/README.md` for more details.

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
