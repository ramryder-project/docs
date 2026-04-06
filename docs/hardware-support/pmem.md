---
title: PMem
---

# PMem

This page documents a PMem configuration workflow for `RamRyder`.

`RamRyder` uses a software-defined memory model. To let software manage memory
at the memory-channel level, the PMem devices under each channel need to be
exposed to the host as separate devices instead of staying hidden behind the
default interleaved AppDirect layout.

## Goal

The target setup is:

- remove the current interleaved AppDirect goal
- switch PMem to `AppDirectNotInterleaved`
- expose PMem more directly at the channel or region level
- let `RamRyder` take over device management and later allocation in software

This setup is intended for systems where memory placement and allocation are
managed by software rather than by the default hardware interleaving policy.

## Inspect the current topology

Run these commands first and save the output:

```bash
sudo ipmctl show -topology
sudo ipmctl show -region
sudo ipmctl show -goal
sudo ipmctl show -memoryresources
```

Before changing the goal, confirm:

- the current region `SocketID`, `ISetID`, and `PersistentMemoryType`
- whether the platform supports an `AppDirectNotInterleaved` goal directly

## Warning

This procedure removes the current PMem namespace configuration and may erase
existing PMem data.

## Reconfigure PMem

Disable and destroy the current namespace:

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

## Verify the new layout

After reboot, check whether the PMem configuration has been split into
independent regions or DIMM-level regions as expected:

```bash
ndctl list -RDu
```

## Create namespaces per region

Create a namespace for each region. For example:

```bash
sudo ndctl create-namespace --region=region0 --mode=devdax
sudo ndctl create-namespace --region=region1 --mode=devdax
```

Repeat the same pattern for the remaining regions.

## Final verification

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
