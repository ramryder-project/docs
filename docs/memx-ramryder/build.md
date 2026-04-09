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

```
./src/resource_manager
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
Before launching the VM, follow the [configuration guide](/memx-ramryder/config)
to customize `run-vm.sh` for your environment.
```bash
run-vm.sh
```

### Install kernel
Log in to the VM and follow [MemX OS - build](/memx-os/build) to install the kernel.
