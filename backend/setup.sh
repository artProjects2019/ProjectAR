#!/bin/bash

(cd ../frontend; npm run build)

for file in src/main/resources/static/*;
    do
        rm -rf "$file"
    done

for file in ../frontend/dist/*;
    do
        cp --recursive "$file" src/main/resources/static
    done

mvn clean install
