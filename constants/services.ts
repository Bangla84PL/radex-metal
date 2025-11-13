import { Service } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'balustrady',
    title: 'Balustrady',
    description: 'Balustrady balkonowe i schodowe ze stali nierdzewnej i węglowej',
    details: [
      'Balustrady balkonowe i schodowe',
      'Stal nierdzewna i stal węglowa',
      'Możliwość montażu szyb',
      'Indywidualne projekty klientów',
    ],
    icon: '/icons/railing.svg',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    order: 1,
  },
  {
    id: 'bramy',
    title: 'Bramy',
    description: 'Bramy przesuwne i uchylne pod indywidualne zamówienie',
    details: [
      'Bramy przesuwne i uchylne',
      'Indywidualne wymiary i projekty',
      'Bogaty wybór wzorów',
      'Możliwość automatyki',
    ],
    icon: '/icons/gate.svg',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    order: 2,
  },
  {
    id: 'ogrodzenia',
    title: 'Ogrodzenia',
    description: 'Kompletny system ogrodzeniowy z bramami i furtkami',
    details: [
      'Wypełnienie drewnem lub blachą',
      'Kowalstwo artystyczne',
      'Kompletny system: bramy, furtki, segmenty, słupki',
      'Ujednolicony wygląd całego ogrodzenia',
    ],
    icon: '/icons/fence.svg',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80',
    order: 3,
  },
  {
    id: 'jachty',
    title: 'Okucia do Jachtów',
    description: 'Profesjonalne okucia ze stali nierdzewnej dla jachtów',
    details: [
      'Okucia ze stali nierdzewnej',
      'Balustrady i uchwyty',
      'Meble i orurowanie',
      'Dostosowane do popularnych jachtów',
    ],
    icon: '/icons/boat.svg',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80',
    order: 4,
  },
];

export const SERVICE_TYPE_LABELS: Record<string, string> = {
  balustrady: 'Balustrady',
  bramy: 'Bramy',
  ogrodzenia: 'Ogrodzenia',
  jachty: 'Jachty motorowe / Okucia',
  konstrukcje: 'Konstrukcje stalowe',
  zbrojenia: 'Zbrojenia budowlane',
  renowacja: 'Renowacja / Rekonstrukcja',
  inne: 'Inne',
};
