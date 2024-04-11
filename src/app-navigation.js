export default [
  {
    text: 'Aktuálne dáta',
    path: '/home',
    icon: 'home',
  },
  {
    text: 'História',
    icon: 'event',
    items: [
      {
        text: ' Dáta',
        icon: 'folder',
        path: '/data',
      },
      {
        text: 'Grafy',
        icon: 'chart',
        path: '/charts',
      },
    ],
  },
  {
    text: 'Rozdiely dní',
    icon: 'clock',
    items: [
      {
        text: 'Dáta',
        icon: 'folder',
        path: '/month-data',
      },
      {
        text: 'Grafy',
        icon: 'chart',
        path: '/month-charts',
      },
    ],
  },
];
