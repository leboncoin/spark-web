# Cursor AI Configuration

This directory contains the AI agent configuration for the Spark UI project, structured to work with both **Cursor** and **Claude Code**.

## Structure

### Rules (`.cursor/rules/`)
Always-applied rules that provide context about the project:
- `project-overview.md` - Project architecture and overview
- `component-guidelines.md` - Component development standards
- `code-style.md` - Code conventions and workflow
- `accessibility-standards.md` - WCAG 2.1 AA compliance standards

### Skills (`.cursor/skills/`)
Reusable, task-specific instructions that agents can invoke:
- `create-component/` - Create a new component with full structure
- `generate-tests/` - Generate unit tests for components
- `create-storybook-docs/` - Create Storybook stories and documentation
- `check-accessibility/` - Verify accessibility compliance
- `run-quality-checks/` - Run all quality checks (lint, typecheck, tests)

### Subagents (`.cursor/agents/`)
Specialized agents for complex tasks:
- `component-reviewer.md` - Review components for compliance
- `refactoring-assistant.md` - Assist with component refactoring

## Cross-Platform Compatibility

For **Claude Code** compatibility, symlinks are created in `.claude/`:
- `.claude/skills/` → symlinked to `.cursor/skills/`
- `.claude/agents/` → symlinked to `.cursor/agents/`

**Note**: Claude Code doesn't support Rules in the same way, so `.claude/rules/` is not created. The `AGENTS.md` file serves as a universal fallback for all platforms.

## Usage

- **In Cursor**: Skills are automatically discovered and can be invoked with `/skill-name`
- **In Claude Code**: Skills in `.claude/skills/` are automatically available
- **Universal**: `AGENTS.md` provides a comprehensive reference for any AI agent
