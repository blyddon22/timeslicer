module.exports = {
  content: ['./app/**/*.hbs'],
  theme: {
    extend: {
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
        'span-21': 'span 21 / span 21',
        'span-22': 'span 22 / span 22',
        'span-23': 'span 23 / span 23',
        'span-24': 'span 24 / span 24',
        'span-25': 'span 25 / span 25',
        'span-26': 'span 26 / span 26',
        'span-27': 'span 27 / span 27',
        'span-28': 'span 28 / span 28',
        'span-29': 'span 29 / span 29',
        'span-30': 'span 30 / span 30',
        'span-31': 'span 31 / span 31',
        'span-32': 'span 32 / span 32',
        'span-33': 'span 33 / span 33',
        'span-34': 'span 34 / span 34',
        'span-35': 'span 35 / span 35',
        'span-36': 'span 36 / span 36',
        'span-37': 'span 37 / span 37',
        'span-38': 'span 38 / span 38',
        'span-39': 'span 39 / span 39',
        'span-40': 'span 40 / span 40',
        'span-41': 'span 41 / span 41',
        'span-42': 'span 42 / span 42',
        'span-43': 'span 43 / span 43',
        'span-44': 'span 44 / span 44',
        'span-45': 'span 45 / span 45',
        'span-46': 'span 46 / span 46',
        'span-47': 'span 47 / span 47',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

// <p>Max Guests: {{slice.slice.maxGuests}}</p>
// {{#unless slice.slice.canceled}}
//   <button id="occupant-{{idx}}-cancel" {{on "click" (fn this.cancel slice.slice)}}>Cancel</button>
// {{/unless}}
// <button id="occupant-{{idx}}-edit" {{on "click" (fn this.edit slice.slice)}}>Edit</button>
