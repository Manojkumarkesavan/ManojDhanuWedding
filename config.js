export const wedding = {
 groom: 'K. Manojkumar',
 bride: 'S. V. Dhanushri',
 names: 'Manoj & Dhanushri',
 venue: 'Sri Lakshmi Aandal Maaligai',
 locality: 'Chromepet, Chennai',
 address: 'Chromepet, Chennai, Tamil Nadu, India',
 // TODO: Confirm the Google Maps search result with the venue before sharing.
 mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sri+Lakshmi+Aandal+Maaligai%2C+Chromepet%2C+Chennai%2C+Tamil+Nadu%2C+India',
 reception: { day: '13', month: 'December', year: '2026', time: '6:30 PM onwards' },
 muhurtham: { day: '14', month: 'December', year: '2026', time: '6:30 AM onwards', iso: '2026-12-14T06:30:00+05:30' },
 // TODO: Supply licensed assets under assets/ and set these relative paths.
 music: null, // e.g. 'music/wedding-background.mp3'
 coupleBeach: null, // e.g. 'images/couple/beach.webp'
 coupleWedding: null,
 couplePortrait: null,
 motorcycle: null,
 // TODO: Replace the decorative scene backgrounds with the final artwork.
 backgrounds: {
 beach: 'images/backgrounds/beach.svg',
 mandapam: 'images/backgrounds/mandapam.svg',
 countryside: 'images/backgrounds/countryside.svg',
 botanical: 'images/backgrounds/botanical.svg',
 },
};

export const gallery = {
 categories: [
 { id: 'pre-wedding', label: 'Pre-Wedding' },
 { id: 'couple-portraits', label: 'Couple Portraits' },
 { id: 'candid-moments', label: 'Candid Moments' },
 { id: 'special-memories', label: 'Special Memories' },
 ],
 // TODO: Add supplied photos under assets/gallery/ and configure entries.
 // Example: { id: 'photo-01', image: 'gallery/featured/photo-01.webp',
 // thumbnail: 'gallery/featured/photo-01-thumb.webp', category: 'pre-wedding',
 // caption: 'A moment to remember', alt: 'Manoj and Dhanushri together',
 // featured: true, displayOrder: 1, orientation: 'portrait', width: 1200, height: 1600 }
 entries: [],
 watermark: '', // Optional subtle watermark, e.g. 'Manoj & Dhanushri'
};