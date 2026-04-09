---
title: Quick Start
---

# Quick Start

This page describes the fastest way to fetch the source code, build
`RamRyder`, prepare the runtime image, and launch a VM instance for basic
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

Make sure all submodules are available before building. Inside `ramryder` folder, follow the instructions below.

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
Before starting resource manager, use `elesticmm.conf` to configure memory resource on the server. Please refer to [configure guide](/memx-ramryder/config) for details.

```
./src/resource_manager
```

### Get VM image
We prepared a clean VM image (Ubuntu). You could use this clean image (**[Download Link](https://drive.google.com/file/d/1DASrFSRzh7dV2UX0fINgHhx10W13yZdz/view?usp=sharing)**) or use your own image.

```bash
tar -xf nvcloud-image-clean.tar.xz
```
Then refer to `readme.txt` inside the package for login information.

### Launch the VM
Please refer to [configure guide](/memx-ramryder/config) to customize `run-vm.sh` for your VM before launching the VM. 
```bash
run-vm.sh
```

### Install kernel
Log into VM and follow [MemX OS - build](/memx-os/build) to install kernel.