---
title: Overview
---

# Hardware Support

MemX currently supports multiple memory device types, including DIMM, CXL device, PMem. We also plan to support CXL Pool and HBM in the near future.

## Why hardware-specific setup is needed

Both RamRyder and RAMOS use a software-defined memory model. To let software manage memory at the channel level, each device type needs its own hardware-specific setup so
that per-channel memory devices are exposed to the software layer.

Different device classes use different mechanisms, firmware models, and host
enumeration paths. As a result, the setup steps are not identical across DIMM,
PMem, and CXL expanders.

## Setup guides

Use the following guides for the corresponding hardware:

- [DIMM](/hardware-support/dimm)
- [CXL](/hardware-support/cxl)
- [PMem](/hardware-support/pmem)

