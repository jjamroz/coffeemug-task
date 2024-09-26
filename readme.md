# Coffeemug homework task

## Overview

Objective: Create a RESTful API for managing an inventory of products. The API should support
basic CRUD operations and include some business logic for managing stock levels
and creating orders.

Due to lack of time only API tests were implemented to ensure contact viability.

### How to Install

Run `npm install` to install the dependencies.

### How to Configure

Change environment variables in [.env](.env) file

### How to run

Run `npm run start`

### How to run test

1. Ensure that `DB_FILE=test-db.json` in [.env](.env) file. You can use different db file, but then you need to adjust [jest-setEnvVars.ts](tests/jest-setEnvVars.ts)
2. Start the server `npm run start`
3. Run test `npm run test`
