# React 19 Optimistic UI Task Management App

A Next.js 15 application demonstrating React 19's `useOptimistic` and `useActionState` hooks for optimistic UI updates, integrated with Syncfusion Data Grid and Next.js Server Actions for secure task management.

## Features

- **React 19 Hooks**: `useOptimistic` for instant UI updates, `useActionState` for form handling
- **Syncfusion Data Grid**: Interactive grid with row selection for viewing and editing tasks
- **Server Actions**: `getTasks()` and `submitTask()` for secure backend operations
- **Task Management**: Create, read, and update tasks with real-time synchronization
- **Optimistic Updates**: Temporary "Saving..." state while server processes, auto-syncs on response

## Tech Stack

- Next.js 15.3.4 | React 19.0.0 | TypeScript 5 | Tailwind CSS 4
- Syncfusion: ej2-react-grids, ej2-react-buttons, ej2-react-inputs, ej2-react-dropdowns

## Prerequisites
Node.js 18.17.0+, 
npm/yarn

## Quick Start

### Install & Run
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Available Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm start` - Run production build
- `npm run lint` - Run ESLint

### Usage
1. **View Tasks** - Grid displays all tasks on page load
2. **Add Task** - Enter name and status in form, click "Add"
3. **Edit Task** - Click grid row to populate form, modify, click "Save"
4. **Delete/Clear** - Click row again to deselect and reset form


## How It Works

## React 19 Hooks
- `useOptimistic` - Instantly updates grid while server processes
- `useActionState` - Manages form submission with server actions

## Server Actions
- `getTasks()` - Fetches initial tasks server-side
- `submitTask()` - Handles create/update with deterministic IDs

## Workflow
1. User submits form → Optimistic update (shows "Saving...")
2. Grid updates instantly with temporary data
3. Server processes and returns updated list
4. UI auto-syncs when response arrives
5. Form resets for next action

## Learning Resources

- [React 19 Docs](https://react.dev)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Syncfusion Grid](https://www.syncfusion.com/react-components/react-data-grid)
- [Tailwind CSS](https://tailwindcss.com/docs)
