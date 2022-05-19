# eCommerce-Api

## Table of Contents
* [Overview](#overview)
* [Instructions](#instructions)
* [Description](#description)
* [Usage](#usage)

## Overview
This API listens to GET, POST, DELETE requests from a store front-end and connects to database to change data and response to front-end 

## Instructions
1. npm install
>>To install all packages

2. Create 2 databases, one for developing and one for testing `port 5432`
>> createdb udacity_project_dev

>>createdb udacity_project_test

3. Update database.json file with the info of your 2 created databases

3. Add your own environment variables to .env file

4. Create the database tables for dev environment
>> db-migrate up


## Description
A simple REST API that responses to HTTP requests from a front-end of a store and changes data on database accordingly

## Usage 
* npm run start
>>Compiles TS into JS and starts up the server
* npm run test
>>Compiles TS into JS then test
* npm run build
>>Compiles TS into JS