Known Limitations for Beta Users

Single-instance cron - For multi-instance deploys, set ENABLE_CRON_SCHEDULER=false on all but one instance
No automated tests - Manual QA required before releases
Console-based logging - No Sentry/error tracking yet (structured logs are in place for future integration)
~280 integrations - Via MCP/Activepieces (vs 6,000 for Zapier)

Competitive Differentiators

MCP support - None of the competitors have this
WASM plugins - Extensibility via Extism stack
Modern - Bun, React 19, GraphQL
Self-hostable - Unlike Zapier/Make

Recommended Post-Launch Priorities

Add Sentry for basic error tracking
Add integration tests for auth + workflow execution
Implement distributed cron locking (Redis)
Build execution logs UI for debugging workflows

Bottom line: Ship it. The foundation is solid for beta users who expect some rough edges.