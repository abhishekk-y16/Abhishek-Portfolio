#!/usr/bin/env node
// ESM entry that calls Vite's Node API using native ESM to avoid the CJS deprecation warning.
import { build } from 'vite'

try {
  await build()
} catch (err) {
  console.error(err)
  process.exit(1)
}
