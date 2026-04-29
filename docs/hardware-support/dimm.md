---
title: DIMM
---

# DIMM

This page will describe how to expose DIMM-backed memory resources to the
software layer so that MemX can manage them at the channel level.

## Scope

Add the DIMM-specific platform requirements, BIOS settings, enumeration path,
and validation steps here.

## Inspect the current topology
Install system tools:
```bash
sudo apt install ipmctl
```

Check current hardware topology:
```bash
sudo ipmctl show -topology
 DimmID | MemoryType                  | Capacity    | PhysicalID| DeviceLocator
================================================================================
 N/A    | DDR4                        | 16.000 GiB  | 0x0025    | CPU1_DIMM_A1
 N/A    | DDR4                        | 16.000 GiB  | 0x0027    | CPU1_DIMM_B1
 N/A    | DDR4                        | 16.000 GiB  | 0x0029    | CPU1_DIMM_C1
 N/A    | DDR4                        | 16.000 GiB  | 0x002b    | CPU1_DIMM_D1
 N/A    | DDR4                        | 16.000 GiB  | 0x002d    | CPU1_DIMM_E1
 N/A    | DDR4                        | 16.000 GiB  | 0x002f    | CPU1_DIMM_F1
 N/A    | DDR4                        | 16.000 GiB  | 0x0031    | CPU2_DIMM_A1
 N/A    | DDR4                        | 16.000 GiB  | 0x0033    | CPU2_DIMM_B1
 N/A    | DDR4                        | 16.000 GiB  | 0x0035    | CPU2_DIMM_C1
 N/A    | DDR4                        | 16.000 GiB  | 0x0037    | CPU2_DIMM_D1
 N/A    | DDR4                        | 16.000 GiB  | 0x0039    | CPU2_DIMM_E1
 N/A    | DDR4                        | 16.000 GiB  | 0x003b    | CPU2_DIMM_F1
```

In this example, the server has two CPU sockets (`CPU1` and `CPU2`), and each
socket provides six memory channels (`A` through `F`). In each channel, only
one slot is populated with a DDR4 DIMM.
