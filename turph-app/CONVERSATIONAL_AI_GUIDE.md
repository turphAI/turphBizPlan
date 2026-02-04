# Conversational AI Guide

Your networking app now has a **natural language interface** powered by Claude! Manage all your data through conversation.

## 🎯 Quick Start

Open **http://localhost:3001** and use the **left panel** (conversational interface) to interact with your data.

---

## 💬 Example Conversations

### Adding Contacts

**You:** "Add Mike Chen as CTO at TechVentures, met him at the Gen AI meetup"

**AI:** "✅ I've created Mike Chen as CTO at TechVentures Inc and added a note about meeting at the Gen AI meetup. Would you like me to log this as an interaction?"

**You:** "Yes, it was yesterday afternoon"

**AI:** "✅ Logged a meeting interaction with Mike Chen for yesterday afternoon."

---

### Creating Companies

**You:** "Add a company called Boston AI Labs in Cambridge, they do enterprise AI"

**AI:** "✅ Created Boston AI Labs in Cambridge with industry set to enterprise AI."

---

### Logging Interactions

**You:** "I had a call with Sarah Johnson this morning about Q2 project timeline"

**AI:** "✅ Logged a call interaction with Sarah Johnson for this morning with notes about the Q2 project timeline."

---

### Searching Your Network

**You:** "Who works at TechVentures?"

**AI:** "I found 2 people at TechVentures Inc:
- Mike Chen - CTO
- Sarah Johnson - VP of Engineering

Would you like more details about any of them?"

---

### Finding Events

**You:** "Show me upcoming events in Cambridge"

**AI:** "Here are the upcoming events in Cambridge:

1. Boston Generative AI Meetup
   - Date: Feb 25, 2026
   - Location: Cambridge (MIT/Harvard connected)
   - Cost: $22

Would you like me to add any of these to your calendar?"

---

### Updating Information

**You:** "Update Sarah Johnson's title to VP of Engineering and AI"

**AI:** "✅ Updated Sarah Johnson's title to 'VP of Engineering and AI'."

---

### Deleting Records

**You:** "Delete Mike Chen"

**AI:** "⚠️ Are you sure you want to delete Mike Chen? This will also delete all interactions with him. Please confirm."

**You:** "Yes, confirm"

**AI:** "✅ Deleted Mike Chen from your network."

---

## 🛠️ Available Operations

### People Management
- ✅ **Create**: "Add [name] as [title] at [company]"
- ✅ **Search**: "Who works at [company]?" or "Find people tagged with AI"
- ✅ **Update**: "Change [name]'s title to [new title]"
- ✅ **Delete**: "Remove [name]" or "Delete [name]"
- ✅ **Details**: "Tell me about [name]"

### Company Management
- ✅ **Create**: "Add company [name] in [location]"
- ✅ **Search**: "Show me companies in Boston"
- ✅ **Details**: "Tell me about [company]"

### Event Management
- ✅ **Create**: "Add event [name] on [date] at [location]"
- ✅ **Search**: "Show upcoming events" or "What events are in Cambridge?"
- ✅ **Filter**: "Show me tier 1 events"

### Interaction Logging
- ✅ **Create**: "Log a [meeting/call/email] with [name] about [topic]"
- ✅ **History**: "Show my interactions with [name]"
- ✅ **Recent**: "What did I discuss with [name]?"

---

## 🎨 Natural Language Variations

The AI understands many ways to express the same intent:

### Adding People
- "Add Mike Chen as CTO at TechVentures"
- "Create a contact named Mike Chen, he's the CTO at TechVentures"
- "I met Mike Chen, he works at TechVentures as CTO"
- "New person: Mike Chen, CTO, TechVentures"

### Logging Interactions
- "I had coffee with Sarah yesterday"
- "Log a meeting with Sarah Johnson yesterday morning"
- "Met with Sarah yesterday to discuss ML ops"
- "Called Sarah this afternoon"

### Searching
- "Who do I know at TechVentures?"
- "Show me people at TechVentures"
- "List contacts from TechVentures"
- "Find TechVentures employees"

---

## 💡 Pro Tips

### 1. Be Conversational
Don't worry about exact syntax. The AI understands natural language:
- ✅ "I bumped into Mike at the coffee shop yesterday"
- ✅ "Met someone new - Sarah from TechVentures"
- ✅ "Add an event for next Tuesday at MIT"

### 2. Provide Context
The more details you give, the better:
- ✅ "Add Mike Chen as CTO at TechVentures, interested in ML consulting, met at Gen AI meetup, email: mike@techventures.com"
- ❌ "Add Mike"

### 3. Ask Follow-up Questions
Have a conversation:
- You: "Show upcoming events"
- AI: [Lists events]
- You: "Tell me more about the first one"
- AI: [Provides details]
- You: "Add it to my calendar"

### 4. Batch Operations
Do multiple things in one message:
- "Add Mike Chen as CTO at TechVentures and log our meeting from yesterday about consulting opportunities"

### 5. Use Tags Naturally
- "Add Sarah, tag her with AI, Boston, and Leadership"
- "Find people tagged with Founder"

---

## 🤖 How It Works

### AI Tools
The assistant has access to 10 database tools:

1. **create_person** - Add new contacts
2. **create_company** - Add companies
3. **create_event** - Add events
4. **create_interaction** - Log interactions
5. **search_people** - Find contacts
6. **search_companies** - Find companies
7. **search_events** - Find events
8. **get_person_interactions** - View interaction history
9. **update_person** - Modify contact details
10. **delete_person** - Remove contacts

### Smart Features

**Auto-linking Companies:**
- When you add a person with a company name, the AI finds or creates the company automatically

**Fuzzy Name Matching:**
- "Update Sarah" works even if her full name is "Sarah Johnson"
- "Show interactions with Mike" finds "Mike Chen"

**Context Awareness:**
- Remembers conversation history
- Understands pronouns ("Tell me more about her")
- Follows up on previous requests

**Data Validation:**
- Asks for required information if missing
- Confirms destructive operations (deletes)
- Provides helpful error messages

---

## 🎯 Use Cases

### Post-Event Networking
```
You: I just came from Boston AI Meetup

AI: Great! Would you like to log any new contacts?

You: Yes, I met:
     - Sarah Johnson, VP at TechVentures, interested in consulting
     - Mike Chen, CTO at Boston AI Labs, wants to collaborate on ML project
     - John Smith, Founder at StartupX, looking for advisors

AI: ✅ I've added all three contacts with their details. Would you like me to log interactions for any of them?

You: Log meetings with all three, it was today from 6-8pm

AI: ✅ Logged meeting interactions for all three contacts.
```

### Weekly Planning
```
You: What events are happening this week in Boston?

AI: [Lists 5 events]

You: Which ones are tier 1?

AI: [Highlights 2 high-priority events]

You: Who should I try to meet at the first one?

AI: [Suggests contacts who might attend]
```

### Follow-up Management
```
You: Who do I need to follow up with?

AI: [Lists people you haven't contacted recently]

You: Log a call with Sarah about the Q2 project

AI: ✅ Logged call. Would you like me to set a reminder for the next follow-up?
```

---

## ⚠️ Important Notes

### Data Safety
- The AI will **ask for confirmation** before deleting anything
- Deletions are **permanent** - be careful!
- The AI operates on **your behalf** with full database access

### Privacy
- All conversations stay in your browser session
- No data is sent to third parties beyond Anthropic (for AI processing)
- Your networking data remains in your PlanetScale database

### Limitations
- AI can make mistakes - always review critical data
- For complex edits, you can still use the forms in the right panel
- Bulk operations are best done via API or forms

---

## 🚀 Next Steps

Now that you have conversational AI:

1. **Test it out** - Try adding a few contacts naturally
2. **Import your existing network** - "Add [person] at [company]" for each contact
3. **Log past interactions** - Catch up on recent meetings
4. **Plan future events** - Add events you're attending
5. **Query your network** - "Who do I know in AI?" or "Show Boston contacts"

The conversational interface is now your **primary way** to manage networking data. Forms in the right panel are for review and complex edits only!

---

## 🐛 Troubleshooting

### AI Not Responding
- Check that `ANTHROPIC_API_KEY` is set in `.env`
- Look at browser console for errors
- Try refreshing the page

### Wrong Results
- Be more specific in your request
- Provide full names if there are duplicates
- Ask the AI to confirm before executing

### Can't Find Records
- Use fuzzy search: "Find someone named Sarah"
- Check if the name is spelled correctly
- Ask: "Show me all people" to browse

---

## 💬 Example Prompts to Try Now

Copy and paste these into the chat:

```
Add Alex Rodriguez as Senior AI Engineer at MIT, email alex@mit.edu, tags: AI, Research, Boston
```

```
Log a coffee meeting with Sarah Johnson yesterday morning. We discussed ML consulting opportunities for Q2.
```

```
Show me all upcoming events in Cambridge
```

```
Who do I know that works in AI?
```

```
What interactions have I had with Sarah Johnson?
```

```
Update Mike Chen's email to mike.chen@techventures.com
```

Your networking system is now conversational! 🎉
