---
title: Configuration
---

# Configuration Guide

This page describes how to configure `RamRyder`, including resource manger and hypervisor (i.e., QEMU).

## Resource manager
Create the resource manager configuration file at `src/elesticmm.conf`.
You can customize it based on the example below. RamRyder also provides the
same example in `src/elasticmm_default.conf`.

```
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

The minimum required configuration is to describe the memory devices available
on your server. Each memory device should be reserved as a DAX device so it can
be managed by software in userspace. Please follow
[hardware support](/hardware-support/overview) to expose different memory
devices as DAX.

For each DAX device, specify its device path under `/dev` and its capacity. Use
different `tier_id` values for devices from different memory tiers or sockets.
Within the same tier, assign a unique `dax_id` to each device.

### `[global]`

This section defines the global configuration for the resource manager.

- `segment_size_mb`: Size of one management segment, in MB.
- `monitor_interval_second`: Monitoring interval, in seconds. The resource manager uses this interval when collecting and uploading runtime memory pressure and dynamic allocation data.

### `[devices]`

Each `dev` entry describes one software-managed DAX device:

- `path`: Device path on the host, for example `/dev/dax0.0`.
- `size_mb`: Usable size of the device, in MB.
- `tier_id`: Memory-tier identifier. Use the same value for devices in the same socket and tier, and different values for devices in different tiers or sockets.
- `dax_id`: Device identifier within the same tier. It should be unique for each DAX device under the same `tier_id`.

### `[clouddb]`

These options control whether RamRyder uploads per-VM runtime memory metrics,
such as capacity, bandwidth, and latency, to CloudDB. RamRyder currently
supports InfluxDB as the backend. With these metrics stored in CloudDB, you can
monitor runtime behavior in dashboards such as Grafana.

In short, to enable this, you need to provide url and token of your influxdb cloud service.

- `enable_clouddb`: Enables or disables CloudDB reporting.
- `influxdb_url`: URL of the InfluxDB service.
- `influxdb_token`: Authentication token used to write metrics to InfluxDB.
- `use_proxy`: Enables or disables proxy access for the remote database connection (deprecated).
- `proxy_addr`: Proxy address used when `use_proxy` is enabled (deprecated).


## QEMU
