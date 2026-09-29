tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], display: ['Space Grotesk', 'system-ui', 'sans-serif'] },
      colors: {
        border: 'hsl(240 3.7% 15.9%)',
        input: 'hsl(240 3.7% 15.9%)',
        ring: 'hsl(45 93% 47%)',
        background: 'hsl(240 10% 3.9%)',
        foreground: 'hsl(0 0% 98%)',
        primary: { DEFAULT: 'hsl(45 93% 47%)', foreground: 'hsl(240 10% 3.9%)' },
        secondary: { DEFAULT: 'hsl(240 3.7% 15.9%)', foreground: 'hsl(0 0% 98%)' },
        destructive: { DEFAULT: 'hsl(0 62.8% 30.6%)', foreground: 'hsl(0 0% 98%)' },
        muted: { DEFAULT: 'hsl(240 3.7% 15.9%)', foreground: 'hsl(240 5% 64.9%)' },
        accent: { DEFAULT: 'hsl(240 3.7% 15.9%)', foreground: 'hsl(0 0% 98%)' },
        card: { DEFAULT: 'hsl(240 10% 3.9%)', foreground: 'hsl(0 0% 98%)' },
      },
      borderRadius: { lg: '0.5rem', md: 'calc(0.5rem - 2px)', sm: 'calc(0.5rem - 4px)' },
    }
  }
}
