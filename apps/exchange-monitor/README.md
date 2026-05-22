# exchange-monitor

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.14. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

### Functionality

1. On start, get all the markets from the database
2. Establish connection with binance for each market
3. Stream the prices of all the markets together at once(every second)
