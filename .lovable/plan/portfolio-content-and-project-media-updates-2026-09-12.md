# Portfolio content and project media updates

## Changes
- Replace em dashes across visible application copy and metadata with standard hyphens or separators.
- Update the resume button, profile role, GitHub link, About copy and metrics, education percentage, and final contact heading.
- Add the uploaded VirtualMate screenshot to its project detail dialog.
- Add styled, fixed-ratio screenshot placeholders to the Image Caption Generator and Homely Hub dialogs for future uploads.
- Keep the current dark technical design and responsive behavior intact.

## Technical details
- Upload `Screenshot_101.png` through the existing project asset flow and import its pointer in the portfolio page.
- Extend project metadata with optional image and placeholder fields, then render the correct media state in the shared project dialog.
- Verify no em dash characters remain in application source, then check the dialog and key page sections on desktop and mobile.
