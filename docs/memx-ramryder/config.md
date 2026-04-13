---
title: Configuration
---

# Configuration Guide

This page describes how to configure `RamRyder`, including resource manager and hypervisor (i.e., QEMU).

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

To enable this feature, provide the URL and token for your InfluxDB Cloud service.

- `enable_clouddb`: Enables or disables CloudDB reporting.
- `influxdb_url`: URL of the InfluxDB service.
- `influxdb_token`: Authentication token used to write metrics to InfluxDB.
- `use_proxy`: Enables or disables proxy access for the remote database connection (deprecated).
- `proxy_addr`: Proxy address used when `use_proxy` is enabled (deprecated).


## QEMU

`scripts/run-vm.sh` is an example launch script for a RamRyder VM. Follow the
steps below to customize it for your environment.
```bash
#!/bin/bash

# Load common settings
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/common.sh"

# unique ID for each VM
VMID=0
# VM OS image
OSIMGF=$IMGDIR/nvcloud-image-clean.qcow2

NAME=VM-NUMA-$VMID
QMP_SOCK=$SOCK_PATH/qmp-sock-$VMID
QGA_SOCK=$SOCK_PATH/qga-sock-$VMID

# configure cores (please use hyper-thread siblings if enabled)
CPU_SET="0-9,20-29"

# must create VM instance before allocating
create_vm_instance $VMID $CPU_SET
mem0=$(allocate_memory_object 0 0 $VMID 25600)
mem1=$(allocate_memory_object 0 1 $VMID 25600)
mem2=$(allocate_memory_object 0 2 $VMID 25600)
mem3=$(allocate_memory_object 0 3 $VMID 25600)
mem4=$(allocate_memory_object 0 4 $VMID 25600)
mem5=$(allocate_memory_object 0 5 $VMID 25600)
node0=$(allocate_numa_node 0)
node1=$(allocate_numa_node 1)
node2=$(allocate_numa_node 2)
node3=$(allocate_numa_node 3)
node4=$(allocate_numa_node 4)
node5=$(allocate_numa_node 5)

# must use memX as *memdev* id
sudo taskset -c $CPU_SET $QEMU_BIN \
    -name $NAME \
    -enable-kvm \
    -cpu host \
    -smp 20 \
    -m 150G,slots=256,maxmem=1024G \
    $mem0 \
    $mem1 \
    $mem2 \
    $mem3 \
    $mem4 \
    $mem5 \
    $node0,memdev=mem0,cpus=0-19 \
    $node1,memdev=mem1 \
    $node2,memdev=mem2 \
    $node3,memdev=mem3 \
    $node4,memdev=mem4 \
    $node5,memdev=mem5 \
    -device virtio-scsi-pci,id=scsi0 \
    -device scsi-hd,drive=hd0 \
    -drive file=$OSIMGF,if=none,aio=native,cache=none,format=qcow2,id=hd0 \
    -net user,hostfwd=tcp::2806-:22 \
    -net nic,model=virtio \
    -nographic \
    -qmp unix:$QMP_SOCK,server,nowait \
    -chardev socket,path=$QGA_SOCK,server=on,wait=off,id=qga0 \
    -device virtio-serial \
    -device virtserialport,chardev=qga0,name=org.qemu.guest_agent.0 \
    2>&1
```

### Set paths

- Update `VMID` to the VM ID. It should be unique if you run multiple VMs.
```
VMID=0
```

- Update `OSIMGF` to the path of your VM image.
```
OSIMGF=$IMGDIR/nvcloud-image-clean.qcow2
```

### Configure vCPU

- Update `CPU_SET` to the host CPU set used by the VM. If hyper-threading is
  enabled, use sibling threads together.
```
CPU_SET="0-9,20-29"
```

- Update the QEMU `-smp` parameter so it matches the number of CPUs in `CPU_SET`.
```
-smp 20
```

- Update the QEMU node-0 parameter with the correct vCPU range.
We allocated 20 cores and thus the vCPU should be `0-19`.
```bash
$node0,memdev=mem0,cpus=0-19 
```

### Configure memory

- Check the available memory on each channel by using `resource_client`.
```bash
sudo ./src/resource_client get-mem-pool
Index | Device Path | Size (MB) | Segment (MB) | Used Seg | Total Seg | Node ID | Tier ID | Dax ID
    0 | /dev/dax0.0 |    129024 |          128 |        0 |      1008 |       0 |       0 |      0
    1 | /dev/dax1.0 |    129024 |          128 |        0 |      1008 |       1 |       0 |      1
    2 | /dev/dax2.0 |    129024 |          128 |        0 |      1008 |       2 |       0 |      2
    3 | /dev/dax3.0 |    129024 |          128 |        0 |      1008 |       3 |       0 |      3
    4 | /dev/dax4.0 |    129024 |          128 |        0 |      1008 |       4 |       0 |      4
    5 | /dev/dax5.0 |    129024 |          128 |        0 |      1008 |       5 |       0 |      5
```
Each channel is represented by a unique `Node ID`. In this example, there are
six memory channels in one tier.

- Define all available NUMA nodes for all channels available on the system.
Format: `allocate_numa_node [Node ID]`
```bash
node0=$(allocate_numa_node 0)
node1=$(allocate_numa_node 1)
node2=$(allocate_numa_node 2)
node3=$(allocate_numa_node 3)
node4=$(allocate_numa_node 4)
node5=$(allocate_numa_node 5)
```

- Configure memory-object allocation from the selected channels.

Format: `allocate_memory_object [Tier ID] [Dax ID] [VM ID] [Size in MB]`
```bash
mem0=$(allocate_memory_object 0 0 $VMID 25600)
mem1=$(allocate_memory_object 0 1 $VMID 25600)
mem2=$(allocate_memory_object 0 2 $VMID 25600)
mem3=$(allocate_memory_object 0 3 $VMID 25600)
mem4=$(allocate_memory_object 0 4 $VMID 25600)
mem5=$(allocate_memory_object 0 5 $VMID 25600)
```

In this example, 25 GB is allocated from each channel, for a total of 150 GB.

- Update the QEMU `-m` parameter so it matches the total allocated memory.
Only the `-m xxG` part needs to be updated.
```bash
-m 150G,slots=256,maxmem=1024G \
```

- Add all allocated memory objects to the QEMU parameters.
```bash
$mem0 \
$mem1 \
$mem2 \
$mem3 \
$mem4 \
$mem5 \
```
- Update the QEMU node parameters with all available nodes and their allocated memory objects. 

Note that keep all nodes available on the system in the command line. If no memory object is allocated on a node, remove only `memdev` for that node. `cpus` should stay on
the first node.
```bash
$node0,memdev=mem0,cpus=0-19 \
$node1,memdev=mem1 \
$node2,memdev=mem2 \
$node3,memdev=mem3 \
$node4,memdev=mem4 \
$node5,memdev=mem5 \
```
Because this example allocates memory objects from all channels, every node has
`memdev=memX`.

If you allocate memory only from Node 0 and Node 1 with
`allocate_memory_object`, remove `memdev` from the other nodes, as shown below.

```bash
$node0,memdev=mem0,cpus=0-19 \
$node1,memdev=mem1 \
$node2 \
$node3 \
$node4 \
$node5 \
```

At this point, `run-vm.sh` should be ready. Launch the VM and install the
kernel if this is your first image. Refer to [MemX RAMOS - build](/memx-os/build)
for kernel build instructions. After the kernel is installed in the image, you
can copy that image for other VMs without repeating the installation.

### Note for users
QEMU parameters are complex and are currently best suited for experienced
developers. Contributions that simplify this workflow with higher-level tools,
such as a dedicated CLI, are welcome.

You may also need to update other standard QEMU parameters, for example:
- `-net user,hostfwd=tcp::2806-:22`
