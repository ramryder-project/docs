---
sidebar_position: 1
title: Overview
slug: /
---

# RamRyder Overview

RamRyder is an open-source research platform for next-generation
software-defined memory in the cloud. Our goal is to build
high-performance and resource-efficient memory systems for cloud computing
across a range of scenarios, helping address both the memory wall
and future memory challenges.

RamRyder is a software-defined elastic memory system for cloud virtual
machines. Its core idea is to manage and allocate memory channels in software,
so users can control VM memory capacity and bandwidth based on workload demand.

The system includes a user-space resource manager, a hypervisor extended from
QEMU, and a customized guest kernel based on RAMOS.

## Architecture Components
- **Resource Manager**: controls memory resources and allocation policy on host.
- **QEMU Extension**: provides VM runtime integration for elastic memory.
- **RAMOS Kernel**: guest kernel component used by RamRyder VMs.

## Getting Started
For build and configuration steps, start from
**[Getting Started Overview](/getting-started/overview)**.

## Related Research Papers
- [**[OSDI'26]** Break on Through to the Other Side: Pooling Memory Elastically with RamRyder](https://www.usenix.org/conference/osdi26/presentation/zhou-yanbo)
