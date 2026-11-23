export const wedding = {
  groom: 'Manojkumar',
  bride: 'Dhanushri',
  names: 'Manoj & Dhanushri',
  venue: 'Sri Lakshmi Aandal Maaligai',
  locality: 'Chromepet, Chennai',
  address: 'Chromepet, Chennai, Tamil Nadu, India',
  // TODO: Confirm the Google Maps search result with the venue before sharing.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sri+Lakshmi+Aandal+Maaligai%2C+Chromepet%2C+Chennai%2C+Tamil+Nadu%2C+India',
  reception: { day: '13', month: 'December', year: '2026', time: '6:30 PM onwards' },
  muhurtham: { day: '14', month: 'December', year: '2026', time: '6:30 AM onwards', iso: '2026-12-14T06:30:00+05:30' },
  // Placeholder assets: original illustrations and an original instrumental (Mohanam, veena and tanpura)
  // made for this site. TODO: Replace with the couple's approved artwork and chosen music when ready.
  music: 'music/Kalla-Nikkiriye-song-SnapYT.App.mp3',
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
    { id: '1Q7A0233', image: 'gallery/0233.webp', thumbnail: 'gallery/0233-thumb.webp',
      caption: 'By the shore', alt: 'Manoj and Dhanushri standing together on a sunny beach',
      displayOrder: 1, orientation: 'portrait' },
    { id: '1Q7A0924', image: 'gallery/0924.webp', thumbnail: 'gallery/0924-thumb.webp',
      caption: 'A barefoot stroll', alt: 'Manoj and Dhanushri walking barefoot in the surf',
      displayOrder: 2, orientation: 'portrait' },
    { id: '1Q7A1207', image: 'gallery/1207.webp', thumbnail: 'gallery/1207-thumb.webp',
      caption: 'Hand in hand', alt: 'Manoj and Dhanushri walking hand in hand beside a pond, seen from behind',
      displayOrder: 3, orientation: 'portrait' },
    { id: '1Q7A1246', image: 'gallery/1246.webp', thumbnail: 'gallery/1246-thumb.webp',
      caption: 'A tender moment', alt: 'Manoj and Dhanushri sharing a quiet moment seated on stone steps',
      displayOrder: 4, orientation: 'portrait' },
    { id: '1Q7A1606', image: 'gallery/1606.webp', thumbnail: 'gallery/1606-thumb.webp',
      caption: 'A playful splash', alt: 'A close-up of Manoj holding Dhanushri’s foot above the water',
      displayOrder: 5, orientation: 'portrait' },
    { id: '1Q7A1638', image: 'gallery/1638.webp', thumbnail: 'gallery/1638-thumb.webp',
      caption: 'Steps together', alt: 'Manoj and Dhanushri holding hands as they walk down stone steps',
      displayOrder: 6, orientation: 'portrait' },
    { id: '1Q7A0975', image: 'gallery/1Q7A0975.webp', thumbnail: 'gallery/1Q7A0975-thumb.webp',
      caption: 'A seaside surprise', alt: 'Manoj hides a bouquet behind his back as Dhanushri turns toward him beneath a beach umbrella',
      displayOrder: 7, orientation: 'landscape' }
  ],
  watermark: '', // Optional subtle watermark, e.g. 'Manoj & Dhanushri'
};
