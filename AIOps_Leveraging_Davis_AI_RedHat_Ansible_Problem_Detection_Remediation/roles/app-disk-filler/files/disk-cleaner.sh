#!/bin/bash
Current=$(du -sh $1)
echo "##### Size before cleaning" + $Current
echo "Clearing files in folder " + $1
rm $1/*
echo "Sucessfullly removed files"
Current=$(du -sh $1)
echo "##### Size after cleaning" + $Current