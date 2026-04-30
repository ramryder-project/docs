---
title: Overview
---

# Hardware Support

MemX currently supports multiple memory device types, including DIMM, PMem,
and CXL memory devices. We also plan to support CXL pool memory and HBM in the
future.

## Why hardware-specific setup is needed

Both RamRyder and RAMOS use a software-defined memory model. To let software manage memory at the channel level, each device type needs its own hardware-specific setup so
that per-channel memory devices are exposed to the software layer.

Different device classes use different mechanisms, firmware models, BIOS
requirements, and host enumeration paths. As a result, the setup steps are not
identical across DIMM, PMem, and CXL memory.

## Setup guides

Use the following guides for the corresponding hardware:

- [DIMM](/hardware-support/dimm): disable hardware interleaving, calculate
  per-channel physical address boundaries, reserve memory with `memmap`, and
  reconfigure the resulting namespaces as `devdax` devices.
- [PMem](/hardware-support/pmem): switch PMem from the default interleaved
  AppDirect layout to `AppDirectNotInterleaved`, then create per-region
  `devdax` namespaces for software management.
- [CXL](/hardware-support/cxl): understand how Linux exposes CXL memory in
  Device DAX or System RAM mode, and follow upstream tooling guidance to
  convert CXL devices into a DAX-usable form when needed.
