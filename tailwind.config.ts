import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1565C0',
          'detail-header': '#1A3A4A',
          card: '#1E3040',
        },
        placeholder: '#F2F2F2',
      },
      boxShadow: {
        header: '0 1px 3px rgba(0, 0, 0, 0.12)',
        card: '0 2px 6px rgba(0, 0, 0, 0.10)',
      },
      borderRadius: {
        pill: '20px',
      },
    },
  },
}
