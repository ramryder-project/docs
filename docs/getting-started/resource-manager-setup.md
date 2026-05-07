---
title: Resource Manager Setup
---

# Resource Manager Setup

This page describes how to prepare source code, build RamRyder resource-manager
components, configure memory devices, and start the resource manager.

## Get Source Code

```bash
git clone --recurse-submodules git@github.com:ramryder-project/ramryder.git
```

If you already cloned the repository without `--recurse-submodules`, run:

```bash
git submodule update --init --recursive
```

## Build Resource Manager

From the RamRyder directory:

```bash
./scripts/pkgdep.sh
# use --arch-cpu-amd to configure if you run on AMD server. Default: Intel
./configure [--arch-cpu-amd]
make
```

## Configure Hardware Resource

### 1) Configure hardware

RamRyder supports multiple memory hardware types (for example DIMM, PMEM, and
CXL). Before configuring resource manager, first prepare and expose your memory
devices correctly on the host.

For hardware-specific setup steps, see
[Hardware Support Overview](/hardware-support/overview).

### 2) Configure resource manager file

Create `src/elesticmm.conf` (or copy from `src/elasticmm_default.conf`) and
configure your memory devices:

```ini
[global]
# size in MB
segment_size_mb 128
monitor_interval_second 1

[devices]
# the combination of tier id and dev id should be unique
dev path=/dev/dax0.0 size_mb=20480 tier_id=0 dax_id=0
dev path=/dev/dax1.0 size_mb=20480 tier_id=0 dax_id=1

[clouddb]
enable_clouddb false
influxdb_url <url>
influxdb_token <token>
use_proxy false
proxy_addr <proxy addr>
```

The minimum required configuration is the `[devices]` section. Each memory
device should be exposed as a DAX device under `/dev` so it can be managed in
userspace.

For each DAX device:
- use `tier_id=0` for local memory (DIMM)
- use `tier_id=1` for CXL memory
- keep `dax_id` unique within the same `tier_id`

Section details:
- **[global]**: defines the global configuration for resource manager.
  - `segment_size_mb`: size of one management segment (MB).
  - `monitor_interval_second`: monitoring interval (seconds). Resource manager
    uses this interval when collecting and uploading runtime memory pressure
    and dynamic allocation metrics.
- **[devices]**: each `dev` entry describes one software-managed DAX device.
  - `path`: host device path (for example `/dev/dax0.0`).
  - `size_mb`: usable device size in MB.
  - `tier_id`: memory-tier identifier. Use the same value for devices in the
    same socket/tier, and different values for devices in different
    sockets/tiers.
  - `dax_id`: device identifier within one tier and should be unique for each
    DAX device under the same `tier_id`.
- **[clouddb]**: controls whether RamRyder uploads per-VM runtime memory metrics
  (such as capacity, bandwidth, and latency) to CloudDB. RamRyder currently
  supports InfluxDB as the backend, so these metrics can be observed in tools
  such as Grafana dashboards.
  - `enable_clouddb`: enables or disables CloudDB reporting.
  - `influxdb_url`: URL of the InfluxDB service.
  - `influxdb_token`: authentication token used to write metrics.
  - `use_proxy`: enables or disables proxy access for remote DB connection
    (deprecated).
  - `proxy_addr`: proxy address used when `use_proxy` is enabled (deprecated).

## Start Resource Manager

```bash
cd src
sudo ./resource_manager
```

`sudo` is required because resource manager reads host performance counters.
