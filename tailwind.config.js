
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      boxShadow: {
        card: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
  corePlugins: {
    backgroundOpacity: true,
    textOpacity: true,
    borderOpacity: true,
  },
  safelist: [
    'bg-blue-50',
    'bg-blue-100',
    'bg-blue-200',
    'bg-blue-500',
    'bg-blue-600',
    'bg-blue-700',
    'bg-blue-800',
    'bg-gradient-to-r',
    'from-blue-600',
    'to-blue-800',
    'text-blue-200',
    'text-blue-800',
    'border-blue-100',
    'shadow-lg',
    'shadow-md',
    'text-gray-400',
    'text-gray-500',
    'text-gray-800',
    'text-white',
    'opacity-10',
    'border-gray-100',
    'border-gray-200',
    'text-green-600',
    'text-red-500',
    'text-amber-500',
    'text-purple-500',
    'text-blue-500',
    'text-indigo-500'
  ],
};
