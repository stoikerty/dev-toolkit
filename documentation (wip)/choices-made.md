# Choices made in this project

## Universal Usage
Pre-Rendering & Server-rendering is central to `dev-toolkit`. By default pre-rendering is enabled, because of the massive performance gains that can be achieved using it. If you only use server-rendering on a per-request basis, you can disable pre-rendering entirely [using `dev-toolkit.config.js`](#link-extending).

Server-rendering itself is a complicated topic since any of the code used on the client can and will also be run on the server. Doing so introduces a great amount of moving parts and in order for any starting point to be truly useful, the essential parts of the server-rendering aspect [are exposed in different ways](#link-how-it-works).

## Simplicity
Although universal usage...

## Usefulness

## Reducing or eliminating lock-in

## Prescribed by dev-toolkit
- universal usage

## Prescribed by template starting points
- src/client - all client-related files
- src/server - all server-related files
- src/settings.js - relevant application-wide settings

## Philosophy
- aim is to be very flexible and customizeable
- allow for many different usages within a company
- pre-rendering is first-class citizen
- rendering of dynamic-pages splittable
- only necessary configuration
- small api-surface
- tested
- css-in-js without removing boilerplate

## The future
- make it easy to use your own boilerplate
- create typescript template
- template with react-router
- template with redux

---

- mention specific examples for each section to improve usefulness
