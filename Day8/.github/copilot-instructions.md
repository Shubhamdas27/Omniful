<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# EduFlow - Premium College Management System

## Project Overview
This is a modern, premium college management system built with React 18+, TypeScript, and Tailwind CSS. The application features stunning glassmorphism design, smooth animations with Framer Motion, and a role-based dashboard system.

## Tech Stack
- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom animations and glassmorphism effects
- **Animations**: Framer Motion for smooth micro-interactions
- **State Management**: Zustand for lightweight state management
- **Icons**: Lucide React for premium icons
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development

## Design Philosophy
- **Theme**: Modern glassmorphism with gradient overlays and blur effects
- **Color Palette**: Deep purples, electric blues, emerald greens with gold accents
- **Typography**: Clean, premium Inter font with perfect spacing
- **Animations**: Smooth micro-interactions, page transitions, hover effects
- **Layout**: Asymmetrical grids, floating elements, depth with shadows

## Code Standards
1. Use TypeScript for all components and utilities
2. Follow functional components with hooks pattern
3. Use Tailwind CSS classes for styling with custom CSS for complex effects
4. Implement smooth animations with Framer Motion for all interactive elements
5. Use the `cn()` utility function for combining class names
6. Follow glassmorphism design patterns with backdrop-blur effects
7. Implement responsive design with mobile-first approach

## Component Guidelines
- All components should have proper TypeScript interfaces
- Use motion components from Framer Motion for animations
- Implement hover effects and micro-interactions
- Use the predefined gradient classes and color schemes
- Follow the established design patterns for cards, buttons, and forms

## Animation Patterns
- Page transitions: Use slide, fade, and scale effects
- Loading states: Implement skeleton loaders and spinners
- Hover effects: Lift, glow, and subtle transformations
- Form interactions: Focus animations and validation feedback
- Stagger animations for lists and cards

## Role-Based Features
The system supports three user roles:
1. **Student**: Course access, assignments, grades, schedule
2. **Teacher**: Class management, student oversight, grading
3. **Admin**: System administration, user management, reports

## File Structure
- `/src/components/` - Reusable UI components
- `/src/pages/` - Page-level components
- `/src/store/` - Zustand state management
- `/src/lib/` - Utility functions and helpers
- `/src/types/` - TypeScript type definitions (if needed)

When creating new components or features, maintain consistency with the existing premium design and animation patterns.
