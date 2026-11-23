export const wedding = {
  groom: 'Manojkumar',
  bride: 'Dhanushri',
  names: 'Manojkumar & Dhanushri',
  venue: 'Sri Lakshmi Aandal Maaligai',
  locality: 'Chromepet, Chennai',
  address: 'Chromepet, Chennai, Tamil Nadu, India',
  // TODO: Confirm the Google Maps search result with the venue before sharing.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sri+Lakshmi+Aandal+Maaligai%2C+Chromepet%2C+Chennai%2C+Tamil+Nadu%2C+India',
  reception: { day: '13', month: 'December', year: '2026', time: '6:30 PM onwards' },
  muhurtham: { day: '14', month: 'December', year: '2026', time: '6:30 AM onwards', iso: '2026-12-14T06:30:00+05:30' },
  // Placeholder assets: original illustrations and an original instrumental (Mohanam, veena and tanpura)
  // made for this site. TODO: Replace with the couple's approved artwork and chosen music when ready.
  music: 'music/Anbil-Avan-Bgm.mp3',
  coupleBeach: 'images/couple/couple-beach.svg',
  coupleWedding: 'images/couple/couple-wedding.svg',
  couplePortrait: 'images/couple/couple-portrait.svg',
  motorcycle: 'images/couple/motorcycle.svg',
  // TODO: Replace the decorative scene backgrounds with the final artwork.
  backgrounds: {
    beach: 'images/backgrounds/beach.svg',
    mandapam: 'images/backgrounds/mandapam.svg',
    countryside: 'images/backgrounds/countryside.svg',
    botanical: 'images/backgrounds/botanical.svg',
  },
  mobileBackgrounds: {
    beach: 'images/backgrounds/beach-mobile.svg',
    mandapam: 'images/backgrounds/mandapam-mobile.svg',
    countryside: 'images/backgrounds/countryside-mobile.svg',
    botanical: 'images/backgrounds/botanical-mobile.svg',
  },
};

export const gallery = {
  // Keep the original JPGs and optimized WebP display images together in assets/gallery/.
  entries: [
    { id: '1Q7A0233', image: 'gallery/1Q7A0233.webp', thumbnail: 'gallery/1Q7A0233-thumb.webp',
      caption: 'By the shore', alt: 'Manoj and Dhanushri standing together on a sunny beach',
      displayOrder: 1, orientation: 'portrait' },
    { id: '1Q7A0287', image: 'gallery/1Q7A0287.webp', thumbnail: 'gallery/1Q7A0287-thumb.webp',
      caption: 'A barefoot stroll', alt: 'Manoj and Dhanushri walking barefoot along a sandy beach',
      displayOrder: 6, orientation: 'portrait' },
    { id: '1Q7A0924', image: 'gallery/1Q7A0924.webp', thumbnail: 'gallery/1Q7A0924-thumb.webp',
      caption: 'At the water’s edge', alt: 'Manoj and Dhanushri standing together in shallow surf',
      displayOrder: 15, orientation: 'portrait' },
    { id: '1Q7A1367', image: 'gallery/1Q7A1367.webp', thumbnail: 'gallery/1Q7A1367-thumb.webp',
      caption: 'A tender moment', alt: 'Manoj and Dhanushri sharing a quiet moment on shaded steps',
      displayOrder: 5, orientation: 'portrait' },
    { id: '1Q7A1606', image: 'gallery/1Q7A1606.webp', thumbnail: 'gallery/1Q7A1606-thumb.webp',
      caption: 'Hand in hand', alt: 'Manoj and Dhanushri holding hands over the water',
      displayOrder: 12, orientation: 'portrait' },
    { id: '1Q7A1694', image: 'gallery/1Q7A1694.webp', thumbnail: 'gallery/1Q7A1694-thumb.webp',
      caption: 'By the waterside', alt: 'Manoj and Dhanushri walking beside a pond',
      displayOrder: 7, orientation: 'portrait' },
    { id: '1Q7A1765', image: 'gallery/1Q7A1765.webp', thumbnail: 'gallery/1Q7A1765-thumb.webp',
      caption: 'Along the water', alt: 'Manoj and Dhanushri walking together beside the pond',
      displayOrder: 14, orientation: 'portrait' }
  ],
  watermark: '', // Optional subtle watermark, e.g. 'Manoj & Dhanushri'
};
