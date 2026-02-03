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
> 
> - **Skills** (`.cursor/skills/`): Task-specific instructions
>   - `create-component/` - Create a new component with full structure
>   - `generate-tests/` - Generate unit tests for components
>   - `create-storybook-docs/` - Create Storybook stories and documentation
>   - `check-accessibility/` - Verify accessibility compliance
>   - `run-quality-checks/` - Run all quality checks (lint, typecheck, tests)
> 
> - **Subagents** (`.cursor/agents/`): Specialized agents for complex tasks
>   - `component-reviewer.md` - Review components for compliance
>   - `refactoring-assistant.md` - Assist with component refactoring
> 
> ## Cross-Platform Compatibility
> 
> For **Claude Code** compatibility, symlinks are available:
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
