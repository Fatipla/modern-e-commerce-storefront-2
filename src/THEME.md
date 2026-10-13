# Theme toggle requirements

If you add a dark/light toggle to this generated app:

- Keep an `isDark` state in the mounted component.
- Mirror that state to `document.documentElement.classList.toggle('dark', isDark)`.
- Give the root screen explicit light and dark colors, for example:
  `className={isDark ? "min-h-screen bg-slate-950 text-slate-100" : "min-h-screen bg-white text-slate-900"}`.
- Tailwind is configured with `darkMode: ['class']`, so `dark:` classes must react to the `dark` class on `<html>`.
