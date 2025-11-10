# 🧩 FileUpload

## 🎯 User Story
> As a **web application developer**,  
> I want **a flexible and accessible FileUpload component to handle file selection, validation, and display**,  
> so that **users can upload files with a consistent user experience that meets accessibility standards**.

---

## ✅ Acceptance Criteria

| ID | Criterion | Status |
|----|----------|--------|
| AC1 | The component displays a trigger (button) that opens the file selection dialog. | ✅ |
| AC2 | The component supports a dropzone mode with drag & drop for file selection. | ✅ |
| AC3 | The `multiple` prop allows selecting a single file (`multiple={false}`) or multiple files (`multiple={true}`, default). | ✅ |
| AC4 | The `accept` prop filters accepted file types (MIME types and extensions). | ✅ |
| AC5 | The `maxFiles` prop limits the number of files that can be uploaded. | ✅ |
| AC6 | The `maxFileSize` and `minFileSize` props validate file sizes in bytes. | ✅ |
| AC7 | Rejected files are stored in a separate state (`rejectedFiles`) with their error codes. | ✅ |
| AC8 | Each rejected file can have multiple error codes (e.g., `FILE_INVALID_TYPE` + `TOO_MANY_FILES`). | ✅ |
| AC9 | The component exposes `FileUpload.Context` to access `acceptedFiles`, `rejectedFiles`, `formatFileSize`, and `locale`. | ✅ |
| AC10 | The component provides `FileUpload.AcceptedFile` to display an accepted file with name, size, and delete button. | ✅ |
| AC11 | The component provides `FileUpload.RejectedFile` with a mandatory `renderError` prop to customize error messages. | ✅ |
| AC12 | The `disabled` prop prevents all interactions (add, remove, modify). | ✅ |
| AC13 | The `readOnly` prop prevents modifications while maintaining a more subtle style than `disabled`. | ✅ |
| AC14 | The `defaultValue` prop allows initializing the component with existing files. | ✅ |
| AC15 | The `onFilesChange` callback is called whenever the accepted files list is modified. | ✅ |
| AC16 | The `onMaxFilesReached` callback is called when the file limit is reached. | ✅ |
| AC17 | The `onFileSizeError` callback is called with the file and error code when a size error occurs. | ✅ |
| AC18 | The `locale` prop allows formatting file sizes according to the locale (default: browser locale or 'en'). | ✅ |
| AC19 | The component detects duplicate files (comparison by name and size) and rejects them with the `FILE_EXISTS` code. | ✅ |
| AC20 | The `FileUpload.Item` component allows creating custom items for files. | ✅ |
| AC21 | The `FileUpload.PreviewImage` component allows displaying an image preview. | ✅ |
| AC22 | The `FileUpload.Trigger` component can be customized with `asChild` to use another component. | ✅ |
| AC23 | The `FileUpload.Dropzone` component displays a drop zone with visual feedback. | ✅ |
| AC24 | Visual focus respects WCAG standards for accessibility. | ✅ |
| AC25 | The component supports keyboard navigation (Tab, Enter, Escape). | ✅ |
| AC26 | Files are formatted with `formatFileSize` which uses `Intl.NumberFormat` for localization. | ✅ |
| AC27 | The component correctly manages synchronous states of `files` and `rejectedFiles` without `setTimeout`. | ✅ |
| AC28 | The component supports controlled mode via `defaultValue` (uncontrolled) and `onFilesChange` (controlled). | ☐ |
| AC29 | The component displays a progress indicator during upload. | ☐ |
| AC30 | The component allows canceling an upload in progress. | ☐ |
| AC31 | The component displays previews for PDF, videos, and other file types. | ☐ |
| AC32 | The component allows renaming a file. | ☐ |
| AC33 | The component allows reordering files via drag & drop. | ☐ |
| AC34 | The component displays custom metadata for each file. | ☐ |
| AC35 | The component provides a `FileUpload.HelpText` component to display instructions. | ☐ |
| AC36 | The component provides a `FileUpload.ErrorText` component to display global errors. | ☐ |
| AC37 | The component supports custom validation via a `validate` prop. | ☐ |
| AC38 | The component allows asynchronous upload with upload queue. | ☐ |
| AC39 | The component supports chunked upload for large files. | ☐ |
| AC40 | The component displays a success state after a successful upload. | ☐ |

---

## 🧪 Use Cases (Stories to Cover)

### Implemented Stories
- [x] Default state (Simple trigger)
- [x] Dropzone (Drag & drop zone)
- [x] Trigger + Dropzone combined
- [x] Accepted files with preview
- [x] Error handling (rejected files)
- [x] Disabled state (`disabled`)
- [x] Read-only state (`readOnly`)
- [x] Single file (`multiple={false}`)
- [x] Default files (`defaultValue`)
- [x] Custom rendering with `FileUpload.Context`
- [x] Photo gallery with image preview
- [x] Custom trigger with `asChild`

### Stories to Implement
- [ ] Hover / focus / active state on dropzone
- [ ] Loading state during upload
- [ ] Progress indicator per file
- [ ] Upload cancellation
- [ ] Folder selection
- [ ] PDF preview
- [ ] Video preview
- [ ] Document preview (Word, Excel, etc.)
- [ ] File renaming
- [ ] Reordering via drag & drop
- [ ] Custom metadata
- [ ] Help text
- [ ] Global error text
- [ ] Custom validation
- [ ] Asynchronous upload with queue
- [ ] Chunked upload
- [ ] Success state

---

## 🎨 Design Rules

| Element | Value / Rule |
|----------|----------------|
| **Colors** | Uses Spark UI theme color tokens (`color.neutral`, `color.error`, `color.on-surface`) |
| **Typography** | `text-body-1` for file names, `text-caption` for sizes and errors |
| **Spacing** | `gap-md` between items, `padding-lg` in dropzone |
| **Borders** | `border-radius-md` for items, `border-error` for rejected files |
| **Visual States** | Hover, Focus, Active with theme state tokens |
| **Dropzone** | Dotted border at rest, solid border on hover/drag, slightly colored background on drag |
| **Rejected Files** | Red border (`border-error`), error text in `text-error` |
| **Accepted Files** | Neutral border, file icon, name and size displayed |
| **Responsive** | Adapts to parent width, column layout by default, row layout on desktop |
| **Theme** | Compatible with light / dark via theme tokens |
| **Icons** | Uses Spark UI icons (`Export`, `CvOutline`, etc.) |
| **Preview** | Images with preserved aspect ratio, configurable maximum size |

---

## ⚙️ Technical Rules

| Element | Detail |
|----------|--------|
| **Main Props** | `defaultValue`, `onFilesChange`, `multiple`, `accept`, `maxFiles`, `maxFileSize`, `minFileSize`, `disabled`, `readOnly`, `locale` |
| **Callbacks** | `onFilesChange(files: File[])`, `onMaxFilesReached(maxFiles: number, rejectedCount: number)`, `onFileSizeError(file: File, error: FileUploadFileError)` |
| **Error Types** | `TOO_MANY_FILES`, `FILE_INVALID_TYPE`, `FILE_TOO_LARGE`, `FILE_TOO_SMALL`, `FILE_INVALID`, `FILE_EXISTS` |
| **Child Components** | `FileUpload.Trigger`, `FileUpload.Dropzone`, `FileUpload.Context`, `FileUpload.Item`, `FileUpload.AcceptedFile`, `FileUpload.RejectedFile`, `FileUpload.PreviewImage`, `FileUpload.ItemFileName`, `FileUpload.ItemSizeText`, `FileUpload.ItemDeleteTrigger` |
| **Context API** | `FileUploadContext` exposes: `files`, `rejectedFiles`, `addFiles`, `removeFile`, `clearFiles`, `clearRejectedFiles`, `formatFileSize`, `locale`, `inputRef`, `triggerRef`, `dropzoneRef`, etc. |
| **Allowed Children** | ReactNode in root, render prop in `FileUpload.Context` |
| **Events** | `onChange` on file input, `onDragEnter`, `onDragLeave`, `onDragOver`, `onDrop` on dropzone |
| **Accessibility** | `role="button"` on trigger, `aria-label` on delete buttons, `aria-live` for errors, complete keyboard navigation |
| **Validation** | Synchronous validation of MIME types, sizes, and file count, duplicate detection |
| **Formatting** | `formatFileSize` uses `Intl.NumberFormat` with locale support (en, fr, etc.) |
| **State** | State management with `useState` for `files` and `rejectedFiles`, synchronous update without `setTimeout` |
| **Compatibility** | Works in RTL mode and on mobile, supports modern browsers |
| **Tests** | Unit tests (Vitest), visual tests (Storybook), accessibility tests (axe-core/playwright) |
| **Performance** | No unnecessary re-renders, React batches state updates |
| **TypeScript** | Strict types, exported interfaces for `FileUploadProps`, `RejectedFile`, `FileUploadFileError` |

---

## 🔗 Dependencies & Integrations

### Internal Dependencies
- **Icon** - To display icons in trigger and items
- **IconButton** - For delete buttons
- **Button** - For trigger (optional with `asChild`)
- **Tag** - For labels in stories (demo only)
- **TextLink** - For links in dropzone (demo only)

### Utilities
- **utils.ts** - `validateFileAccept`, `validateFileSize`, `formatFileSize`, `getDefaultLocale`
- **useRenderSlot.tsx** - For polymorphism with `asChild`

### Theme Tokens
- `color.neutral`, `color.error`, `color.on-surface`
- `spacing.sm`, `spacing.md`, `spacing.lg`
- `border-radius-md`
- `text-body-1`, `text-caption`, `text-subhead`

### Documentation
- Design documentation: [Figma - FileUpload](https://www.figma.com/design/0QchRdipAVuvVoDfTjLrgQ/Spark-Component-Specs?node-id=59809-7264&t=W6FxPCamO7mFQu07-4)
- Developer documentation: [Storybook - FileUpload](https://sparkui.vercel.app/?path=/story/experimental-fileupload--default)
- ARIA Pattern: [WAI-ARIA File Upload Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/file-upload/)

---

## 🧭 Notes & TODO

### Recent Implementations
- [x] Removed `setTimeout(0)` for `rejectedFiles` update - now synchronous
- [x] Refactored `FileUpload.FilesPreview` to `FileUpload.Context` with `FileUpload.AcceptedFile` and `FileUpload.RejectedFile`
- [x] Added mandatory `renderError` prop on `FileUpload.RejectedFile` to customize error messages
- [x] Added locale support for file size formatting
- [x] Duplicate file detection by name and size
- [x] Support for multiple error codes per rejected file

### Priority Improvements
- [ ] Add progress indicator for asynchronous uploads
- [ ] Implement upload cancellation
- [ ] Create `FileUpload.HelpText` and `FileUpload.ErrorText` components
- [ ] Add custom validation via `validate` prop
- [ ] Implement PDF and video previews
- [ ] Add folder selection support
- [ ] Create stories for all missing use cases

### Technical Improvements
- [ ] Optimize performance for large file lists (virtualization)
- [ ] Add lazy loading for image previews
- [ ] Implement automatic cleanup of object URLs
- [ ] Add E2E tests with Playwright for drag & drop interactions
- [ ] Improve unit test coverage (currently ~60 tests)

### UX Improvements
- [ ] Add animations for state transitions (hover, drag, drop)
- [ ] Improve visual feedback during drag & drop
- [ ] Add tooltips for validation errors
- [ ] Implement retry system for failed uploads
- [ ] Add ability to reorder files via drag & drop

### Accessibility Improvements
- [ ] Add `aria-describedby` to link errors to fields
- [ ] Implement `aria-live` to announce state changes
- [ ] Add keyboard instructions in help text
- [ ] Improve focus management when deleting files
- [ ] Add screen reader support for progress states

### Integrations
- [ ] Document integration patterns with forms

### Documentation
- [ ] Add more examples in MDX documentation
- [ ] Create migration guide from other file upload components
- [ ] Document advanced usage patterns
- [ ] Add examples of complete customization

---

## 📋 Validation Checklist

### Basic Features
- [x] File selection via button
- [x] File selection via drag & drop
- [x] Single/multiple files support
- [x] File type validation
- [x] File size validation
- [x] File count limit
- [x] Duplicate detection
- [x] Accepted files display
- [x] Rejected files display with errors
- [x] File deletion
- [x] Disabled and readOnly states

### Child Components
- [x] `FileUpload.Trigger`
- [x] `FileUpload.Dropzone`
- [x] `FileUpload.Context`
- [x] `FileUpload.Item`
- [x] `FileUpload.AcceptedFile`
- [x] `FileUpload.RejectedFile`
- [x] `FileUpload.PreviewImage`
- [x] `FileUpload.ItemFileName`
- [x] `FileUpload.ItemSizeText`
- [x] `FileUpload.ItemDeleteTrigger`

### Accessibility
- [x] Keyboard navigation
- [x] Visible focus
- [x] Appropriate ARIA labels
- [x] Screen reader support
- [ ] ARIA live announcements for state changes
- [ ] Keyboard instructions in help text

### Tests
- [x] Unit tests (Vitest)
- [x] Accessibility tests (axe-core)
- [x] Storybook stories
- [ ] E2E tests (Playwright)
- [ ] Performance tests

### Documentation
- [x] MDX documentation
- [x] API Reference
- [x] Usage examples
- [ ] Migration guide
- [ ] Integration patterns
