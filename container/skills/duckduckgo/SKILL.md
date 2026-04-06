---
name: duckduckgo
description: Search the web using DuckDuckGo — find current information, research topics, get facts and context from any query. Use whenever you need to search the web or gather external information.
allowed-tools: Bash(duckduckgo:*)
---

# Web Search with duckduckgo

## Quick start

```bash
duckduckgo search <query>        # Basic search
duckduckgo fetch <url>           # Fetch content from a URL
```

## Core capabilities

- **Web search** via DuckDuckGo engine
- **Content extraction** - get clean text from URLs (strips navigation, scripts, styles)
- **Pagination support** for long results
- **Region-specific results** for localized queries

## Commands

### Search

```bash
duckduckgo search <query>                    # Basic search with default 10 results
duckduckgo search "latest AI trends"         # Quoted exact phrase search
duckduckgo search --max 20 <query>           # Get up to 20 results
duckduckgo search --region us-en <query>     # Region-specific results
```

**Search tips:**

- Use natural language queries rather than keywords
- Quote phrases for exact matches: "best practices for React"
- More specific queries yield better results: "Python asyncio tutorial beginner" works better than just "asyncio"

### Fetch Content

```bash
duckduckgo fetch <url>                          # Fetch with default 8000 char limit
duckduckgo fetch https://example.com/article    # Extract main content from page
duckduckgo fetch --max-length 16000 <url>       # Get more content (up to 8000+ chars)
duckduckgo fetch --start-index 8000 <url>       # Paginate through long pages
fetch https://example.com/article --start-index 16000  # Continue pagination from different index
```

**What gets stripped:**

- Navigation menus and headers/footers
- Scripts, styles, and other non-content elements
- Ads and recommended links
- Social media widgets

**Returns:** Clean, readable text content perfect for analysis.

## Example: Research task

```bash
# Step 1: Search for current information
duckduckgo search "React performance optimization best practices 2024"

# Step 2: Get detailed content from top results
duckduckgo fetch https://example.com/react-performance-guide
duckduckgo fetch --max-length 16000 https://another-source.com/optimization-tips
```

## Example: Fact-finding

```bash
# Find current data or facts
duckduckgo search "latest npm package size benchmarks"
duckduckgo fetch <url-from-results>  # Extract the specific metrics you need
```

## Region support

Available regions include:

- `us-en` - USA/English (default)
- `uk-en` - UK/English
- `de-de` - Germany/German
- `fr-fr` - France/French
- `jp-ja` - Japan/Japanese
- `cn-zh` - China/Chinese
- `wt-wt` - Worldwide/no region

Example:

```bash
duckduckgo search --region uk-en "banking regulations UK"
duckduckgo search --region de-de "elektroauto 2024"
```

## Comparison with agent-browser

| duckduckgo                              | agent-browser                                |
| --------------------------------------- | -------------------------------------------- |
| Fast text search results                | Full browser automation                      |
| No page rendering needed                | Can interact with JS-heavy sites             |
| Best for research/information gathering | Best for forms, login flows, dynamic content |
| Lower latency                           | Higher fidelity to actual page experience    |

**When to use which:**

- **duckduckgo**: "What's the latest status?", "Find examples of X", "Get facts about Y"
- **agent-browser**: "Log into this app", "Fill out a form", "Test a workflow"
