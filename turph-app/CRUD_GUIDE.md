# CRUD Operations Guide

Your networking app now has **full CRUD (Create, Read, Update, Delete)** functionality for all entities!

## 🎯 Quick Start

### Creating New Records

Every view has an **"Add [Entity]" button** in the top-right corner:

- **Add Person** - Opens person form
- **Add Company** - Opens company form  
- **Add Event** - Opens event form
- **Add Interaction** - Opens interaction form

### Editing Records

**Two ways to edit:**

1. **Click anywhere on a card** - Opens edit form
2. **Click the three-dot menu (⋮)** → Select "Edit"

### Deleting Records

1. Click the **three-dot menu (⋮)** on any card
2. Select **"Delete"**
3. Confirm in the dialog (safety check!)

---

## 👥 People Management

### Creating a Person

**Required Fields:**
- Name *

**Optional Fields:**
- Email
- Phone
- Title
- Company (dropdown of existing companies)
- Location
- LinkedIn URL
- Tags (comma-separated, e.g., "Boston, AI, Leadership")
- Notes (free-form text for context)

**Example:**
```
Name: John Smith
Email: john.smith@example.com
Title: CTO
Company: TechVentures Inc (select from dropdown)
Tags: Boston, AI, Founder
Notes: Met at Mass Innovation Nights, interested in ML consulting
```

### Editing a Person

- Click on any person card
- Update any fields
- Click "Update"
- Data refreshes automatically

### Deleting a Person

- Click three-dot menu
- Select "Delete"
- Confirm deletion
- ⚠️ **Warning:** This also deletes all their interactions!

---

## 🏢 Company Management

### Creating a Company

**Required Fields:**
- Company Name *

**Optional Fields:**
- Industry
- Location
- Website (full URL)
- LinkedIn URL
- Tags (comma-separated)
- Description

**Example:**
```
Name: Boston AI Labs
Industry: Artificial Intelligence
Location: Cambridge, MA
Website: https://bostonailabs.example.com
Tags: AI, Research, Boston
Description: Research lab focused on enterprise AI applications
```

### Linking People to Companies

When creating/editing a person, select the company from the dropdown. The company card will automatically show the contact count.

---

## 🗓️ Event Management

### Creating an Event

**Required Fields:**
- Event Name *

**Optional Fields:**
- Event Type (Networking, Conference, Workshop, Meetup, Other)
- Priority Tier (Tier 1/2/3)
- Organization/Host
- Location
- Start Date & Time (datetime picker)
- End Date & Time
- Recurrence (One Time, Daily, Weekly, Monthly)
- Cost (enter "0" for free events)
- Event URL
- Tags
- Description

**Example:**
```
Name: Boston AI Networking Night
Type: Networking
Tier: Tier 1 (High Priority)
Organization: Boston AI Meetup
Location: Cambridge Innovation Center
Start: 2026-03-15 18:00
Cost: 0
Tags: AI, Networking, Cambridge
Description: Monthly networking event for AI professionals in Boston
```

### Event Filtering

The Events view shows **upcoming events only** by default. Past events are hidden but remain in the database.

---

## 💬 Interaction Management

### Logging an Interaction

**Required Fields:**
- Person * (select from dropdown)
- Type * (Meeting, Call, Email, Message, Other)
- Date & Time *

**Optional Fields:**
- Notes (highly recommended!)

**Example:**
```
Person: Sarah Johnson
Type: Meeting
Date: 2026-02-04 14:00
Notes: Discussed ML ops consulting opportunity. She's expanding their team in Q2. Follow up in March about specific project needs.
```

### Interaction Types & Icons

- ☕ **Meeting** - In-person or virtual meetings
- 📞 **Call** - Phone calls
- ✉️ **Email** - Email correspondence
- 💬 **Message** - LinkedIn, Slack, text messages
- 📝 **Other** - Any other interaction type

### Best Practices

- Log interactions **immediately** after they happen
- Include **actionable notes** (next steps, follow-ups)
- Reference specific topics discussed
- Note any commitments or promises made

---

## 🔄 Data Flow

### After Creating/Editing/Deleting

1. **Form closes automatically**
2. **Data refreshes** from database
3. **UI updates** with new data
4. **No page reload** required!

### Real-time Updates

- All views use React hooks
- Data fetches from `/api/*` endpoints
- Changes persist to PlanetScale immediately
- Multiple users can work simultaneously

---

## 🎨 Form Features

### Smart Dropdowns

- **Company Selector** (Person form) - Shows all companies
- **Person Selector** (Interaction form) - Shows name + title
- **Type Selectors** - Predefined options for consistency

### Tag System

- Enter tags as **comma-separated values**
- Example: `Boston, AI, Leadership`
- Displays as colorful badges
- Searchable (future feature)

### Date/Time Pickers

- HTML5 datetime-local input
- Browser-native picker
- Stores in ISO 8601 format
- Displays in readable format (e.g., "Feb 25, 2026")

### Text Areas

- **Notes** fields support multi-line text
- **Description** fields for longer content
- Auto-expanding
- Preserves formatting

---

## ⚠️ Important Notes

### Deleting Records

**Cascading deletes:**
- Deleting a **Person** deletes their **Interactions**
- Deleting a **Company** un-links associated **People** (doesn't delete them)
- Deleting an **Event** is safe (no cascading)

**Cannot undo!** Always confirm before deleting.

### Required vs Optional Fields

- Fields marked with `*` are **required**
- Forms won't submit without required fields
- All other fields are optional

### Data Validation

- **Email** fields validate format
- **URL** fields validate format (must start with http:// or https://)
- **Date** fields use browser validation
- **Tags** auto-trim whitespace

---

## 🚀 Quick Workflows

### Adding a New Contact from an Event

1. Go to **Events** view
2. Find the event you attended
3. Click **People** view
4. Click **"Add Person"**
5. Fill in their details
6. Click **"Add Interaction"**
7. Log your conversation

### Tracking a Company

1. Go to **Companies** view
2. Click **"Add Company"**
3. Fill in company details
4. Go to **People** view
5. Add/edit contacts at that company
6. Select the company from dropdown

### Preparing for an Event

1. Go to **Events** view
2. Click **"Add Event"**
3. Enter event details
4. Set tier (1 = must attend, 2 = should attend, 3 = nice to have)
5. Add to your calendar (external link)

### Following Up After a Meeting

1. Go to **Interactions** view
2. Click **"Add Interaction"**
3. Select the person
4. Type: "Meeting"
5. Date: When it happened
6. Notes: What you discussed + next steps

---

## 💡 Pro Tips

1. **Use Tags Consistently** - Decide on a tag taxonomy (e.g., always use "AI" not "Artificial Intelligence")
2. **Add Notes Immediately** - Details fade fast; log interactions within 24 hours
3. **Set Event Tiers** - Use Tier 1 for must-attend events to prioritize
4. **Link People to Companies** - Makes it easier to see your network by organization
5. **Include Follow-up Dates** - Note when to reconnect (future feature will remind you)

---

## 🐛 Troubleshooting

### Form Won't Submit
- Check all required fields (marked with *)
- Validate email/URL format
- Check browser console for errors

### Data Not Updating
- Click the "Try Again" button if you see an error
- Check your internet connection
- Verify the API is running (should be automatic)

### Dropdown is Empty
- **No companies?** Create one first in Companies view
- **No people?** Create one first in People view

### Delete Button Not Working
- Confirm you really want to delete in the dialog
- Check browser console for errors
- Some deletes may fail if data is linked (check relationships)

---

## 🎯 What's Next?

Current CRUD functionality is **complete**! Future enhancements:

- [ ] Search across all entities
- [ ] Bulk operations
- [ ] Export to CSV
- [ ] Duplicate detection
- [ ] Relationship visualization
- [ ] Automated reminders
- [ ] LinkedIn integration

Your networking system is fully operational! 🚀
