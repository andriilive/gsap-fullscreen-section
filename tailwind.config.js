module.exports = {
  mode: "jit",
  corePlugins: {
    container: false
  },
  content: [
      "./views/**/*.twig",
      "./assets/scripts/**/*.{js,jsx}",
      "./src/**/*.{html,js}"
  ],
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '25px',
          paddingRight: '25px',
          '@screen tel-lg': {
            maxWidth: '456px',
            paddingLeft: 0,
            paddingRight: 0,
          },
          '@screen tab': {
            maxWidth: '643px',
            paddingLeft: 0,
            paddingRight: 0,
          },
          '@screen tab-lg': {
            maxWidth: '792px',
            paddingLeft: 0,
            paddingRight: 0,
          },
          '@screen lap': {
            maxWidth: '961px',
            paddingLeft: 0,
            paddingRight: 0,
          },
          '@screen hd': {
            maxWidth: '1436px',
          },
        }
      })
    },
    require('@tailwindcss/typography'),
  ],
  theme: {
    fontFamily: {
      DEFAULT: ['semplicitapro', 'Helvetica', 'Arial', 'sans-serif',  'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
    },
    borderRadius: {
      none: '0px',
      xs: '6px',
      sm: '10px',
      DEFAULT: '15px',
      md: '25px',
      full: '9999px',
    },
    boxShadow: {
      sm: '0px 2px 4px var(--shadow-color, rgba(0, 0, 0, 0.075))',
      DEFAULT: '0px 8px 16px var(--shadow-color, rgba(0, 0, 0, 0.15))',
      lg: '0px 16px 48px var(--shadow-color, rgba(0, 0, 0, 0.175))',
      inner: 'inset 0 2px 4px 0 var(--shadow-color, rgba(0, 0, 0, 0.06))',
      none: 'none',
    },
    colors: {
      transparent : 'transparent',
      'off-white': '#F7F8FB',
      white: '#FFF',
      black: '#000',
      brand: {
        primary: '#8F5DE7',
        bright: '#7345cf',
        dark: '#2C225C',
        blue: '#5A91DD',
        'gradient-1': '#644FA1'
      },
      accent: {
        DEFAULT : '#00EACD',
        bright : '#00EACD',
        muted : '#34B6D7',
        blue : '#68CCFF',
        'dark-blue' : '#342768'
      },
      grey: {
        DEFAULT: '#ADABC1',
        'blue-1': '#91A7C4',
        'blue-2': '#C4D0E1',
        'blue-3': '#D5DEE9',
        'blue-4': '#E6EBF2',
        'blue-5': '#F7F8FB',
      },
      status: {
        danger : '#ff0030'
      }
    },
    screens: {
      'tel': {'max': '575px'},
      'tel-lg': '576px', // tel-xl
      tab: '768px', // tab
      'tab-lg': '992px', // tab-xl
      lap: '1200px', // lap
      hd: '1600px', //
      ultra: '2500px', //
    },
    lineHeight: {
      1 : '1',
      '1.2' : '1.2',
      '1.5' : '1.5',
      2 : '2',
      16: '16px',
      18: '18px',
      20: '20px',
      24: '24px',
      22: '22px',
      26: '26px',
      28: '28px',
      32: '32px',
      36: '36px',
      40: '40px',
      44: '44px',
      48: '48px',
    },
    fontSize: {
      6: '6px',
      8: '8px',
      10: '10px',
      12: '12px',
      13: '13px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      24: '24px',
      32: '32px',
      36: '36px',
      40: '40px',
      44: '44px',
      60: '60px',
      100: '100px'
    },
    spacing: {
      'custom': 'var(--spacing)',
      DEFAULT: '8px',
      px: '1px',
      0: '0px',
      4: '4px',
      12: '12px',
      14: '14px',
      16: '16px',
      24: '24px',
      28: '28px',
      32: '32px',
      40: '40px',
      44: '44px',
      48: '48px',
      56: '56px',
      64: '64px',
      72: '72px',
      80: '80px',
      88: '88px',
      104: '104px',
      118: '118px',
      130: '130px',
      144: '144px',
      165: '165px',
      180: '180px',
      200: '200px',
      242: '242px',
    },
    extend: {
      borderRadius: {
        DEFAULT: '10px',
        half: '4px'
      },
      minHeight: {
        30: '30px',
        160: '160px',
        480: '480px',
        768: '768px',
      },
      maxHeight: {
        44: '44px',
        32: '32px',
        '4/12': '30%',
        '7/12': '60%'
      },
      minWidth: {
        'custom' : 'var(--min-w)',
      },
      maxWidth: {
        'custom' : 'var(--max-w)',
        220: '220px',
        250: '250px',
        290: '290px',
        320: '320px',
        400: '400px',
        460: '460px',
        520: '520px',
        640: '640px',
        800: '750px',
        '10/12': '83%',
        '11/12': '90%'
      }
    },
  }
}
