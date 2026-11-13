# Project Structure

> This project is in early setup. Update this file once the folder structure is established.

## Current Layout

```
content_web/
├── app/
│   ├── layout.tsx      # Root layout, metadata, font
│   ├── page.tsx        # Landing page (thử thách hôm nay)
│   └── globals.css     # Tailwind + global styles
├── components/
│   ├── ChallengeCard.tsx   # Card hiển thị thử thách
│   ├── ParticipantCount.tsx # Số người tham gia (client)
│   └── EmailSignup.tsx     # Form thu thập email
├── lib/
│   └── challenges.ts   # Kho thử thách + logic getTodayChallenge
├── public/
│   └── robots.txt
├── .kiro/steering/
└── package.json / tsconfig.json / tailwind.config.ts
```

## Expected Structure (Giai đoạn 2+)

```
content_web/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components or routes
│   ├── layouts/        # Shared layout wrappers
│   ├── styles/         # Global styles and design tokens
│   ├── lib/            # Utility functions and helpers
│   ├── types/          # Shared TypeScript types/interfaces
│   └── assets/         # Static assets (images, fonts, icons)
├── public/             # Files served as-is (favicon, robots.txt)
├── tests/              # Unit and integration tests
├── .kiro/              # Kiro AI assistant config and steering
├── .gitignore
├── package.json
└── README.md
```

## Conventions

- Group files by feature/domain inside `src/` when the project grows large
- Co-locate test files next to source files (e.g., `Button.test.ts` beside `Button.ts`) or keep them in `tests/`
- Keep components small and single-purpose; extract logic into `lib/`
- Use `index.ts` barrel files sparingly — only at well-defined public API boundaries
- All new top-level directories should be documented here
