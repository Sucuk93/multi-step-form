/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary-marine": "var(--color-primary-marine)",
        "primary-purplish": "var(--color-primary-purplish)",
        "primary-pastel": "var(--color-primary-pastel)",
        "primary-light": "var(--color-primary-light)",

        "grey-cool": "var(--color-grey-cool)",
        "grey-light": "var(--color-grey-light)",
        "white-alabaster": "var(--color-white-alabaster)",
        "white-magnolia": "var(--color-white-magnolia)",
        "white-pure": "var(--color-white-pure)",
      },
    },
  },
  plugins: [],
};
