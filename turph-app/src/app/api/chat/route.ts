import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { tools, executeTool } from '@/lib/ai/tools'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `You are a helpful AI assistant for a Boston networking intelligence app. You help users manage their professional network by tracking:
- People (contacts with their companies, titles, and relationship notes)
- Companies (organizations in the user's network)
- Events (networking events, conferences, meetups in the Boston area)
- Interactions (meetings, calls, emails with contacts)

The user is building a consulting business in Boston and wants to track their networking activities.

When the user asks to add/create something, use the appropriate tools to save it to the database.
When they ask about people, companies, or events, search the database and provide helpful summaries.
Be conversational and proactive - if they mention meeting someone, offer to log the interaction.
If they provide partial information, ask clarifying questions before creating records.

Always confirm successful operations and provide next steps or suggestions.`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array required' },
        { status: 400 }
      )
    }

    // Call Anthropic API with tool use  
    let response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages,
      tools,
    })

    // Handle tool use loop
    while (response.stop_reason === 'tool_use') {
      const toolUseBlock = response.content.find(
        (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use'
      )

      if (!toolUseBlock) break

      // Execute the tool
      const toolResult = await executeTool(toolUseBlock.name, toolUseBlock.input)

      // Continue conversation with tool result
      const newMessages: Anthropic.MessageParam[] = [
        ...messages,
        {
          role: 'assistant',
          content: response.content,
        },
        {
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: toolUseBlock.id,
              content: JSON.stringify(toolResult),
            },
          ],
        },
      ]

      response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: newMessages,
        tools,
      })
    }

    // Extract text response
    const textBlock = response.content.find(
      (block): block is Anthropic.TextBlock => block.type === 'text'
    )

    return NextResponse.json({
      message: textBlock?.text || 'No response generated',
      usage: response.usage,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
