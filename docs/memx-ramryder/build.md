---
title: Quick Start
---

# Quick Start

This page describes the fastest path to fetch the source code, build
`RamRyder`, prepare a runtime image, and launch a VM instance for basic
validation.

## Get source code

```bash
git clone --recurse-submodules git@github.com:memx-lab/ramryder.git
```

If you already cloned the repository without `--recurse-submodules`, run:

```bash
git submodule update --init --recursive
```

## Build project

Make sure all submodules are available before building. From the `ramryder`
directory, follow the steps below.

### Build resource manager

Install system dependencies:
```bash
./scripts/pkgdep.sh
```

Compile:
```bash
# use --arch-cpu-amd to configure if you run on AMD server. Default: Intel
./configure [--arch-cpu-amd]
make
```

### Build QEMU

```bash
cd qemu
mkdir build
cd build
../configure --enable-kvm --target-list=x86_64-softmmu --enable-slirp
make -j$(nproc)
```

## Run RamRyder

### Start resource manager
Before starting the resource manager, use `elesticmm.conf` to configure the
memory resources on the server. See the [configuration guide](/memx-ramryder/config)
for details.

```bash
cd src
sudo ./resource_manager
Resource Manager RPC Server started. Waiting for client requests...
```
Note that `sudo` is required to resource manager since it needs to read processor performance counter.

### Check resource with client

RamRyder provides a resource manager client. You can use this to check and allocate resource to VMs mannually.
```bash
cd src
./resource_client --help
```

Usage:
```
Usage:
  ./resource_client <command> [arguments]

Query Commands:
  get-mem-info vid=<vm_id>                                     Show memory information for a VM.
  get-mem-pool                                                 Show the current memory pool state.
  get-num-nodes                                                Show the number of available NUMA nodes.
  get-node-info nid=<node_id>                                  Show details for a C-NUMA node.

Memory Management Commands:
  alloc-mem tid=<tid> did=<dev_id> vid=<vm_id> size=<mb>       Allocate memory for a VM.
  free-mem vid=<vm_id> memid=<memdev_id>                       Release an allocated memory device.
  attach-mem memid=<memory_id> vid=<vm_id> nid=<node_id>       Attach memory to a VM on a NUMA node.
  detach-mem memid=<memory_id> vid=<vm_id>                     Detach memory from a VM.

VM Lifecycle Commands:
  create-vm vid=<vm_id> coreset=[start-end,...]                Register a VM and its CPU core set.
  destroy-vm vid=<vm_id>                                       Remove a VM from the manager.
  start-vm vid=<vm_id>                                         Mark a VM as started.
  stop-vm vid=<vm_id>                                          Mark a VM as stopped.

Examples:
  ./resource_client get-mem-info vid=3
  ./resource_client alloc-mem tid=1 did=0 vid=3 size=1024
  ./resource_client create-vm vid=3 coreset=[20-30,50-60]
```

### Get VM image
We provide a clean Ubuntu VM image. You can use this image
(**[download link](https://drive.google.com/file/d/1DASrFSRzh7dV2UX0fINgHhx10W13yZdz/view?usp=sharing)**)
or use your own image.

```bash
tar -xf nvcloud-image-clean.tar.xz
```
Then refer to `readme.txt` inside the package for login information.

### Launch VM
Before launching the VM, follow the [configuration guide](/memx-ramryder/config) to customize `run-vm.sh` for your environment and then launch VM.

```bash
run-vm.sh
```

### Install kernel
Log in to the VM and follow [MemX OS - build](/memx-os/build) to install the kernel.
