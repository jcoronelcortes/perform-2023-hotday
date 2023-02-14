#!/bin/bash
lsblk
sudo lvmdiskscan
sudo lvcreate -L 5G -n diegotest LVMVolGroup