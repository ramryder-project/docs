---
title: Quick Start
---

# Quick Start

This page describes the fastest way to fetch the source code, build
`RamRyder`, prepare the runtime image, and launch a VM instance for basic
validation.

## Get the Source Code

```bash
git clone --recurse-submodules git@github.com:memx-lab/ramryder.git
```

If you already cloned the repository without `--recurse-submodules`, run:

```bash
git submodule update --init --recursive
```

## Build the Project

Make sure all submodules are available before building.

### Build the Main Project

Compile the main project:

```bash
cd src
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

## Quick Start

### Get the NVSL Cloud Image

Please contact the maintainer (`yaz093@ucsd.edu`) to obtain the image package.
Then refer to `readme.txt` inside the package for login information.

```bash
tar -xf nvcloud-image-clean.tar.xz
```

### Launch the VM Instance

```bash
run-vm.sh
```

## Notes on Submodules

Submodules are not updated automatically when you run `git pull`. After pulling
updates to the main repository, always run:

```bash
git submodule update --recursive
```

To update the submodule to the latest commit, for example from the latest
`main` branch, run:

```bash
cd qemu
git checkout main
git pull origin main
cd ..
git add qemu
git commit -m "Update qemu submodule to latest commit"
git push
```
