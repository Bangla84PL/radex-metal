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
    image: '/images/services/balustrady.jpg',
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
    image: '/images/services/bramy.jpg',
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
    image: '/images/services/ogrodzenia.jpg',
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
    image: '/images/services/jachty.jpg',
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
