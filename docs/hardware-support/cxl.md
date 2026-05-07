---
title: CXL
---

# CXL

This page documents a CXL memory configuration workflow for RamRyder.
To let software manage CXL-backed memory at the memory-channel or device level,
the CXL memory exposed to Linux should be brought into a DAX-usable form that
can be mapped and managed explicitly by software.

## Goal

The target setup is:

- identify the current CXL memory mode on the host
- make sure the device is exposed in a DAX-usable form
- allow software to manage the device explicitly instead of treating it only as
  normal system RAM

This setup is intended for systems where memory placement and allocation are
managed by software rather than by default kernel NUMA policies alone.

## Background

On Linux, CXL memory is commonly exposed in one of two modes:

- **Device DAX mode**: the CXL memory appears as a DAX device such as
  `/dev/dax0.0`, which can be accessed directly by software through `mmap`.
- **System RAM mode**: the CXL memory is attached to one or more NUMA nodes and
  behaves like regular system memory from the OS point of view.

For RamRyder-style software-defined memory management, Device DAX mode is often
the more direct representation because the memory can be managed as an explicit
device instead of being merged into general-purpose system RAM.

## Recommended tooling

For detailed CXL provisioning, inspection, and DAX conversion steps, we
recommend following the
[CXL Memory Resource Kit (`cxl-reskit`)](https://github.com/cxl-reskit/cxl-reskit).

In particular, the repository provides practical guidance for:

- examining the current CXL memory configuration
- understanding whether the device is currently in Device DAX mode or System
  RAM mode
- converting between Device DAX and System RAM modes with `daxctl`
- validating the resulting DAX device layout

Relevant sections in the repository include:

- [Using CXL Memory as a DAX Device](https://github.com/cxl-reskit/cxl-reskit)
- [Using CXL Memory as System RAM](https://github.com/cxl-reskit/cxl-reskit)
- [Converting Between Device DAX and System RAM Modes](https://github.com/cxl-reskit/cxl-reskit)

## Guidance for RamRyder users

When preparing CXL memory for RamRyder software, first verify how Linux currently
enumerates the device. If the memory is already exposed as a DAX device, it can
be integrated more directly into the software-managed workflow. If it appears
only as system RAM, follow the `cxl-reskit` guidance to determine whether it
can be reconfigured into Device DAX mode on your platform.

Because BIOS behavior, firmware support, kernel support, and `daxctl`
capabilities vary across platforms, we intentionally do not duplicate the full
step-by-step setup flow here. Please follow the upstream `cxl-reskit`
documentation for the exact commands and validation procedure.
