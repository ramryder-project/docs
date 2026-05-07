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
      label: 'Getting Started',
      items: [
        'getting-started/overview',
        'getting-started/resource-manager-setup',
        'getting-started/virtual-machine-setup',
        'getting-started/kernel-installation',
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
