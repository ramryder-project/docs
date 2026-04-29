import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'overview',
    {
      type: 'category',
      label: 'Hardware Support',
      items: [
        'hardware-support/overview',
        'hardware-support/dimm',
        'hardware-support/pmem',
        'hardware-support/cxl',
      ],
    },
    {
      type: 'category',
      label: 'MemX RamRyder',
      items: [
        'memx-ramryder/overview',
        'memx-ramryder/build',
        'memx-ramryder/config',
      ],
    },
    {
      type: 'category',
      label: 'MemX RAMOS',
      items: [
        'memx-ramos/overview',
        'memx-ramos/build',
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/overview',
      ],
    },
  ],
};

export default sidebars;
