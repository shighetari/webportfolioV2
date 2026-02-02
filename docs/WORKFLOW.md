# Change Tracking Workflow

## When to Update

✅ **Track changes only after:**
- Major task fully completed
- Major refactor verified working
- Feature fully implemented and tested

❌ **Do not track:**
- Work in progress
- Minor tweaks
- Experimental changes

## Update Format

### Quick Entry Template

```markdown
## [Date] - [Task Name]

**Added:**
- file1.ts - description
- file2.tsx - description

**Modified:**
- file3.scss - description
- file4.ts - description

**Removed:**
- old-file.ts - reason

**Verified:**
- [ ] Feature works
- [ ] No errors
- [ ] Tests pass
```

### Example Entry

```markdown
## 2025-10-07 - AI Chatbot with Vercel SDK

**Added:**
- api/chat.ts - Groq API endpoint
- vercel.json - deployment config
- .env - API keys

**Modified:**
- Assistant.tsx - useChat hook
- ChatBox.tsx - streaming support
- _Assistant.scss - enhanced styling

**Removed:**
- AssistantService.ts - deprecated

**Verified:**
- [x] Chatbot responds
- [x] Streaming works
- [x] No TS errors
```

## Process

1. **Complete task** → Test fully
2. **Update CHANGELOG.md** → Add version entry
3. **Commit** → Descriptive message
4. **Done** → Move to next task

## Best Practices

- ✅ Brief descriptions (5-10 words max)
- ✅ File paths for clarity
- ✅ Grouped by type (Added/Modified/Removed)
- ✅ Verification checklist
- ❌ No explanations unless critical
- ❌ No code snippets in tracking
- ❌ No duplicate information

---

**Purpose**: Track progress without bloating context
**Update**: Only on verified completion
**Format**: Concise, structured, scannable
