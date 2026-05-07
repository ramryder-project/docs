---
title: PMem
---

# PMem

This page documents a PMem configuration workflow for RamRyder.
To let software manage memory at the memory-channel level, the PMem devices under each channel need to be exposed to the host as separate devices instead of staying hidden behind the default interleaved AppDirect layout.

## Goal

The target setup is:

- remove the current interleaved AppDirect goal
- switch PMem to `AppDirectNotInterleaved`
- expose PMem more directly at the channel or region level
- let RamRyder take over device management and later allocation in software

This setup is intended for systems where memory placement and allocation are
managed by software rather than by the default hardware interleaving policy.

## Inspect Hardware Topology

Install system tools:
```bash
sudo apt install ipmctl
```

Check hardware topology:
```bash
sudo ipmctl show -topology
 DimmID | MemoryType                  | Capacity    | PhysicalID| DeviceLocator
================================================================================
 0x0001 | Logical Non-Volatile Device | 126.375 GiB | 0x0026    | CPU1_DIMM_A2
 0x0011 | Logical Non-Volatile Device | 126.375 GiB | 0x0028    | CPU1_DIMM_B2
 0x0021 | Logical Non-Volatile Device | 126.375 GiB | 0x002a    | CPU1_DIMM_C2
 0x0101 | Logical Non-Volatile Device | 126.375 GiB | 0x002c    | CPU1_DIMM_D2
 0x0111 | Logical Non-Volatile Device | 126.375 GiB | 0x002e    | CPU1_DIMM_E2
 0x0121 | Logical Non-Volatile Device | 126.375 GiB | 0x0030    | CPU1_DIMM_F2
 0x1001 | Logical Non-Volatile Device | 126.375 GiB | 0x0032    | CPU2_DIMM_A2
 0x1011 | Logical Non-Volatile Device | 126.375 GiB | 0x0034    | CPU2_DIMM_B2
 0x1021 | Logical Non-Volatile Device | 126.375 GiB | 0x0036    | CPU2_DIMM_C2
 0x1101 | Logical Non-Volatile Device | 126.375 GiB | 0x0038    | CPU2_DIMM_D2
 0x1111 | Logical Non-Volatile Device | 126.375 GiB | 0x003a    | CPU2_DIMM_E2
 0x1121 | Logical Non-Volatile Device | 126.375 GiB | 0x003c    | CPU2_DIMM_F2
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
socket has six memory channels (`A` through `F`). In each channel, one
slot (e.g., `CPU1_DIMM_A1`) is populated with a DDR4 DIMM, and the
other slot (e.g., `CPU1_DIMM_A2`) is populated with a PMem device.

Check current PMem configuration in the system:
```bash
sudo ipmctl show -region
sudo ipmctl show -goal
sudo ipmctl show -memoryresources
```

Before changing the goal, confirm:

- the current region `SocketID`, `ISetID`, and `PersistentMemoryType`
- whether the platform supports an `AppDirectNotInterleaved` goal directly

**Note that this procedure removes the current PMem namespace configuration and may erase existing PMem data.**

## Reconfigure PMem

Check current namespaces and regions:
```bash
ndctl list -RNu
```

Disable and destroy the target namespace:
```bash
sudo ndctl disable-namespace namespace0.0
sudo ndctl destroy-namespace namespace0.0
```

Delete the current PMem goal:

```bash
sudo ipmctl delete -goal
```

Create a non-interleaved AppDirect goal:

```bash
sudo ipmctl create -goal -socket 0x0000 PersistentMemoryType=AppDirectNotInterleaved
```

Notes:

- replace `0x0000` with the target socket id on your system
- with `-socket`, the goal is applied only to the specified socket
- without `-socket`, `ipmctl` may apply the goal to all supported sockets
- on multi-socket systems, it is safer to configure sockets explicitly

Reboot the machine:

```bash
sudo reboot
```

## Verify New Layout

After reboot, check whether the PMem configuration has been split into
independent regions as expected:

```bash
ndctl list -RNu
```

## Create Namespaces

Create a namespace for each region. For example:

```bash
sudo ndctl create-namespace --region=region0 --mode=devdax
sudo ndctl create-namespace --region=region1 --mode=devdax
sudo ndctl create-namespace --region=region2 --mode=devdax
...
```

Repeat the same pattern for the remaining regions.

## Final Verification

After configuration, verify that the expected DAX devices are exposed to the
host:

```bash
ls /dev/dax*
```

Example output:

```bash
/dev/dax0.0  /dev/dax1.0  /dev/dax2.0  /dev/dax3.0  /dev/dax4.0  /dev/dax5.0
```

## Notes

- region names may differ across systems
- namespace names such as `namespace0.0` may also differ
- check the actual hardware layout before applying the commands blindly
- always back up important PMem data before reconfiguration
