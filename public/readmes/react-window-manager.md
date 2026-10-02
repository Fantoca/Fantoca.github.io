# React Window Manager

A reusable layout engine for building desktop-style interfaces in React and Next.js applications.

## Interaction model

Windows can be dragged, resized and snapped into fullscreen, half-screen or quadrant layouts. A preview indicates the destination before a window is docked.

## Workspace features

- Edge docking and configurable tiling zones.
- A reorderable dock for minimized windows.
- Mobile swipe gestures for minimizing windows.
- Persistent workspace state through local storage.
- Keyboard actions for common window operations.
- Spring-based motion for transitions and layout changes.

## Integration

The component is designed to work with React, Next.js and shadcn/ui projects. Zustand manages workspace state while the package keeps window behaviour separate from the content displayed inside each window.

## Engineering focus

The key challenge is coordinating pointer interactions, resizing constraints, stacking order and animated layout changes without making the consuming application responsible for window mechanics.

## Project access

The project is published as an open-source component. Visit the [GitHub repository](https://github.com/Fantocaa/winmgr) for source code and installation details.
