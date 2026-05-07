---
title: Overview
---

# RamRyder
RamRyder is a software-defined elastic memory system for cloud virtual
machines. Its core idea is to manage and allocate memory channels in software,
allowing users to control the memory capacity and bandwidth of each virtual
machine based on application demands.

The main components of RamRyder include a user-space resource manager, a
hypervisor extended from QEMU, and a guest Linux kernel
([RAMOS](/ramos/overview)). To get started, follow the
[Quick Start](/ramryder/build).
