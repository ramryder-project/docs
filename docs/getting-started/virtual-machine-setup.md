---
title: Virtual Machine Setup
---

# Virtual Machine Setup

This page describes how to build QEMU, prepare VM images, and manage VM
lifecycle with `ramryder_cli`.

## Build QEMU
If you already cloned the RamRyder repository without `--recurse-submodules`, run following command to get QEMU submodule:
```bash
git submodule update --init --recursive
```

From the RamRyder directory:
```bash
cd qemu
mkdir -p build
cd build
../configure --enable-kvm --target-list=x86_64-softmmu --enable-slirp
make -j$(nproc)
cd ../..
```

## Get VM Image

We provide a clean Ubuntu VM image. You can use this image
(**[download link](https://drive.google.com/file/d/1DASrFSRzh7dV2UX0fINgHhx10W13yZdz/view?usp=sharing)**)
or use your own image.

```bash
tar -xf nvcloud-image-clean.tar.xz
```

Then refer to `readme.txt` inside the package for login information.

## Manage VM

All VM operations are managed by `admin/ramryder_cli`. You can use
`ramryder_cli` to query resource allocations, allocate resources, and create
VMs.

```bash
cd /path/to/ramryder
./admin/ramryder_cli --help
```

### 1) Query resource status

Memory pool:

```bash
./admin/ramryder_cli query --type mempool
```

VM allocation status:

```bash
./admin/ramryder_cli query --type vm
```

### 2) Create VM

Create a VM with local memory (DIMM):

```bash
./admin/ramryder_cli create-vm \
  --cpu-set 0-9,20-29 \
  --memory 150G \
  --channels 6
```

Create a VM with DIMM + CXL memory:

```bash
./admin/ramryder_cli create-vm \
  --cpu-set 0-9,20-29 \
  --memory 100G \
  --channels 4 \
  --cxl-memory 50G \
  --cxl-channels 2
```

Note:
- `--channels`: number of local-memory channels (DIMM, tier 0) assigned to the VM.
  Use this together with `--memory` when you want to attach local memory.
- `--cxl-channels`: number of CXL-memory channels (tier 1) assigned to the VM.
  Use this together with `--cxl-memory`.
- `--memory` is optional for `attach-mem` (default `0M`), so CXL-only attach is supported.
- More channels can provide higher bandwidth potential, but also consume more channel resources in the pool.
- `--memory/--channels` are for local memory (DIMM, tier 0).
- `--cxl-memory/--cxl-channels` are for CXL memory (tier 1).
- memory size supports `M` or `G` units (for example `1024M`, `150G`).
- default SSH forwarding port is `2806 + VMID`.
- if that port is occupied, CLI chooses another available port.
- vCPU pinning is enabled by default; disable with `--disable-vcpu-pin`.

Dry-run example:

`--dry-run` is used to validate a VM plan before actual launch. It runs through
resource-allocation and command-construction logic so you can verify settings
and resource availability, then exits without keeping a running VM.

```bash
./admin/ramryder_cli create-vm \
  --cpu-set 0-9,20-29 \
  --memory 150G \
  --channels 6 \
  --dry-run
```

### 3) Dynamically add memory to a running VM

Add DIMM memory from new channels:

```bash
./admin/ramryder_cli attach-mem \
  --vmid 0 \
  --memory 20G \
  --channels 2
```

Add DIMM memory only from channels already allocated to this VM (i.g., no extra channels):

```bash
./admin/ramryder_cli attach-mem \
  --vmid 0 \
  --memory 10G \
  --channels 0
```

Add CXL memory from new channels:

```bash
./admin/ramryder_cli attach-mem \
  --vmid 0 \
  --cxl-memory 20G \
  --cxl-channels 2
```

`attach-mem` prints allocated `memid` values. Keep them for detach operations.

### 4) Dynamically remove memory

```bash
./admin/ramryder_cli detach-mem --vmid 0 --memid 3
```

### 5) Destroy VM

```bash
./admin/ramryder_cli destroy-vm --vmid 0
```

This command kills the VM process and releases all resource-manager allocations.

## Update Guest Kernel

After VM is ready, log into VM and then follow [Kernel Installation](/getting-started/kernel-installation) to update guest kernel.
