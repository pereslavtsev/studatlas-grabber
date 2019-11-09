#!/bin/bash
for i in `seq 1 30`;
do
  nc -z localhost 270177 && echo Success && exit 0
  echo -n .
  sleep 1
done
echo Failed waiting for MongoDB && exit 1
