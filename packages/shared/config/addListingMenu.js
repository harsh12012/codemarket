const addListingMenu = [
  { label: 'Listing Type', index: 1 },
  { label: 'Address', index: 2 },
  { label: 'Property Type', index: 3 },
  { label: 'Photos', index: 4 },
  { label: 'Features', index: 5 },
  { label: 'Parking Space Type', index: 6 },
  { label: 'Vehicle Size', index: 7 },
  { label: 'Spaces Labeled', index: 8 },
  { label: 'Space Details', index: 9 },
  { label: 'Space Instruction', index: 10 },
  { label: 'Timings', index: 11 },
  { label: 'Notice Time', index: 12 },
  { label: 'Advance booking time', index: 13 },
  { label: 'Max Min Stay Time', index: 14 },
  { label: 'Booking process', index: 15 },
  { label: 'Charge Type', index: 16 },
  { label: 'Pricing', index: 17 }
];

export default addListingMenu;

export const menu = {
  property: {
    title: 'Property (2,3,4,5)',
    subMenu: [
      { label: 'Property Type', index: 2 },
      { label: 'Photos', index: 3 },
      { label: 'Features', index: 4 },
      { label: 'Detail & Instruction', index: 5 }
    ]
  },
  parkingSpaces: {
    title: 'Parking Spaces (6,7,8)',
    subMenu: [
      { label: 'Parking Space Type', index: 6 },
      { label: 'Vehicle Size', index: 7 },
      { label: 'Spaces Labeled', index: 8 }
    ]
  },
  bookingSettings: {
    title: 'Booking Settings (10,11,12,13)',
    subMenu: [
      { label: 'Notice Time', index: 10 },
      { label: 'Advance booking time', index: 11 },
      { label: 'Max Min Stay Time', index: 12 },
      { label: 'Booking process', index: 13 }
    ]
  }
};
