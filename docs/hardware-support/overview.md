---
title: Overview
slug: /hardware-support
---

# Hardware Support

`MemX` currently supports multiple memory device types:

- [DIMM](/hardware-support/dimm)
- [PMem](/hardware-support/pmem)
- [CXL](/hardware-support/cxl)

Future support is planned for:

- CXL Pool
- HBM

## Why hardware-specific setup is needed

`MemX` uses a software-defined memory model. To let software manage memory at
the channel level, each device type needs its own hardware-specific setup so
that per-channel memory devices are exposed to the software layer.

Different device classes use different mechanisms, firmware models, and host
enumeration paths. As a result, the setup steps are not identical across DIMM,
PMem, and CXL expanders.

## Per-device setup guides

Use the following guides for the corresponding hardware:

- [DIMM](/hardware-support/dimm)
- [PMem](/hardware-support/pmem)
- [CXL](/hardware-support/cxl)

## Future work

Planned future documentation includes:

- CXL Pool
- HBM
