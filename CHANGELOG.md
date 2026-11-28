# @omnidotdev/vortex-app

## 0.1.0

### Minor Changes

- [#127](https://github.com/omnidotdev/vortex-app/pull/127) [`d389670`](https://github.com/omnidotdev/vortex-app/commit/d38967069b3f334417fe2ea6a50d98ada738c9c6) Thanks [@coopbri](https://github.com/coopbri)! - Signing in or out of Omni in another app now carries over here

- [#126](https://github.com/omnidotdev/vortex-app/pull/126) [`11ae377`](https://github.com/omnidotdev/vortex-app/commit/11ae377d031d8087dca415104ed9504d823181f0) Thanks [@coopbri](https://github.com/coopbri)! - Links from Vortex to your Omni account (Manage account, workspaces, Upgrade, Manage billing) now open it as the same account you use in Vortex, even when another account is signed in on the browser

- [#116](https://github.com/omnidotdev/vortex-app/pull/116) [`614e3a9`](https://github.com/omnidotdev/vortex-app/commit/614e3a953d52055b56fb1b6d1833fbaa960ff985) Thanks [@coopbri](https://github.com/coopbri)! - AI Agent steps now let you pick a provider and model. Synapse is the default and uses your workspace's Synapse key; choose OpenAI, Anthropic, or another provider to use that provider's key instead.

- [#125](https://github.com/omnidotdev/vortex-app/pull/125) [`65c0cf9`](https://github.com/omnidotdev/vortex-app/commit/65c0cf9665a167351edfb64b474ef1698b1f96e2) Thanks [@coopbri](https://github.com/coopbri)! - Add a workspace switcher to the sidebar, in place of the workspace's name above its navigation. Choosing another workspace keeps you on the same page there (workflows, events, members, settings), or opens the list a single workflow or integration sits in. The menu also lists all workspaces and links to the account hub to create and manage them.

### Patch Changes

- [#110](https://github.com/omnidotdev/vortex-app/pull/110) [`0702eda`](https://github.com/omnidotdev/vortex-app/commit/0702eda9e2f728dbe0d0d73366353e92b7f8d2d1) Thanks [@coopbri](https://github.com/coopbri)! - The Anthropic model picker, demo workflow, and examples now use the current Claude 5.5 models.

- [#129](https://github.com/omnidotdev/vortex-app/pull/129) [`879ecc3`](https://github.com/omnidotdev/vortex-app/commit/879ecc3affa43cce1438d8b3d791eb6940c7d13a) Thanks [@coopbri](https://github.com/coopbri)! - Connect with OAuth works again from the integration dialog. The dialog now requests the provider sign-in link with your session and then opens it, returns you to the page you started from, and explains when your plan's connected-account limit has been reached

- [#112](https://github.com/omnidotdev/vortex-app/pull/112) [`452fd2c`](https://github.com/omnidotdev/vortex-app/commit/452fd2c794a9288b11912171fa2faf10ffcd0615) Thanks [@coopbri](https://github.com/coopbri)! - Buy and manage plans on the Omni account hub. A paid plan on the pricing page now opens the hub's confirm step for that plan and the workspace you pick (or lets the hub ask when you have none yet), and Manage Billing in a workspace's settings opens plan management on the hub; both come back to Vortex. The in-app checkout and billing portal are removed.

- [#129](https://github.com/omnidotdev/vortex-app/pull/129) [`879ecc3`](https://github.com/omnidotdev/vortex-app/commit/879ecc3affa43cce1438d8b3d791eb6940c7d13a) Thanks [@coopbri](https://github.com/coopbri)! - The pricing page no longer shows an Enterprise tier, so it lists only the Free, Pro, and Team plans that are actually offered

- [#117](https://github.com/omnidotdev/vortex-app/pull/117) [`38a27b2`](https://github.com/omnidotdev/vortex-app/commit/38a27b23cce8accae9f0a394828579573db9643d) Thanks [@coopbri](https://github.com/coopbri)! - Stop writing users' email addresses to the logs: a failed sign-in token check logs only the error message, not the user's email and name, by moving to `@omnidotdev/providers` v0.2.0.

- [#115](https://github.com/omnidotdev/vortex-app/pull/115) [`c0782bc`](https://github.com/omnidotdev/vortex-app/commit/c0782bce01c6f4fb87553d5d62d6a56ec5ce9e1f) Thanks [@coopbri](https://github.com/coopbri)! - Fix pages failing to load (HTTP 431) for accounts that belong to many workspaces

- [#122](https://github.com/omnidotdev/vortex-app/pull/122) [`5bcfe3d`](https://github.com/omnidotdev/vortex-app/commit/5bcfe3d4ada5b6047b885229b4fd132d44c262bd) Thanks [@coopbri](https://github.com/coopbri)! - Sign-in session data sent to the browser no longer includes the session token

- [#124](https://github.com/omnidotdev/vortex-app/pull/124) [`76ac2b3`](https://github.com/omnidotdev/vortex-app/commit/76ac2b3e54ea44eb645fa9123c87848bb5a567d1) Thanks [@coopbri](https://github.com/coopbri)! - Your sign-in token now stays out of reach of scripts running on the page, so the session read from the browser no longer carries it

- [#128](https://github.com/omnidotdev/vortex-app/pull/128) [`5a6c0a1`](https://github.com/omnidotdev/vortex-app/commit/5a6c0a1e687557d5f4116f5db3f20d3ce1cfd956) Thanks [@coopbri](https://github.com/coopbri)! - The sign-in buttons on the workspaces page and the pricing cards now start sign-in. They did nothing before, because they looked for server-only configuration in the browser

- [#114](https://github.com/omnidotdev/vortex-app/pull/114) [`082a33c`](https://github.com/omnidotdev/vortex-app/commit/082a33c0b49a314d94da90a1fec4e147d4d24a9c) Thanks [@coopbri](https://github.com/coopbri)! - Scrollable panels (run history, run details, node settings, node picker, version history, integrations, debug pane) now use the shared Omni scroll area, and the live event log on a running workflow can now be scrolled
