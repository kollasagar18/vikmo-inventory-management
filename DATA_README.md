# VIKMO — Python / Django Intern Assignment

This bundle contains your assignment brief and the data you need.

| File | Purpose |
|---|---|
| `VIKMO_Python_Django_Intern_Assignment.pdf` | The assignment brief. Start here. |
| `catalogue.csv` / `catalogue.json` | Seed your products & inventory (a subset is fine). Same data, two formats. |
| `channel_feed.json` | The mock external sales-channel feed for the **Channel Sync** task. |

All prices are in **INR (₹)**, integers. You write your own loader/import — there is no framework-specific fixture, by design.

## `catalogue.csv` / `catalogue.json` — product catalogue (600 SKUs)

| Field | Type | Notes |
|---|---|---|
| `sku` | string | Unique product code (e.g. `BRK-1042`). |
| `name` | string | Display name, e.g. `Brake Pad Set — Bajaj Pulsar 150`. |
| `category` | string | One of 11 categories. |
| `brand` | string | Part brand. |
| `vehicle_fitment` | string | Make + model (e.g. `KTM Duke 390`) or `Universal`. |
| `price_inr` | integer | Selling price in ₹. |
| `stock` | integer | Units on hand. **Some SKUs are 0 or single-digit** — useful for the insufficient-stock path. |
| `description` | string | Short product blurb. |

## `channel_feed.json` — mock external channel catalogue (200 items)

A supplier/channel product list to sync into your system. **It is deliberately built to exercise reconciliation** — records that already exist locally (some with changed price/stock), a few genuine conflicts, and brand-new products.

| Field | Type | Notes |
|---|---|---|
| `external_id` | string | Stable channel-side ID (e.g. `CH-1042`). Stable across runs — use it for idempotency. |
| `sku` | string | Product SKU. May match a catalogue SKU, or be new (`*-EXT-*`). |
| `name` | string | Channel's product name (may differ slightly in conflict cases). |
| `price` | integer | Channel price in ₹ (may differ from your local price). |
| `stock` | integer | Channel-side stock. |
| `category` | string | Channel category (may differ in conflict cases). |

What's inside: ~170 match existing SKUs (≈45 with a changed price/stock → **update** path; 6 genuine **conflicts**), and 30 brand-new external-only SKUs → **create** path. Re-running the same feed must produce no further changes (**idempotency**).
