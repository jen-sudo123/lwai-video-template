# Copilot Studio: Connect knowledge and tools (on-screen actions)

On-screen only. The voiceover lives in `copilot-studio-capabilities.script.txt`.
Each step lists the VO line it should sync to (the "cue").

---

## 1. Connect an approved knowledge source

| # | On screen | VO cue |
|---|---|---|
| 1.1 | Show Section 3 of the Build Plan. Highlight **Information**, **Tools/actions**, **Access**. | "Before we open Copilot Studio, go back to Section 3…" |
| 1.2 | Open the existing agent in Copilot Studio. | "So here I'm inside our existing agent…" |
| 1.3 | Select **Build**. | "…on the Build tab." |
| 1.4 | In the configuration panel, find **Knowledge** → click **+ / Add knowledge**. | "I'll find Knowledge and click the plus button…" |
| 1.5 | Under **Featured**, select **SharePoint**. | "For this example, I'll choose SharePoint." |
| 1.6 | Click **Browse items**. | "I'll use Browse items so I can choose the exact demo document." |
| 1.7 | Navigate to the approved SharePoint site and document library. | "I'll navigate to our approved location…" |
| 1.8 | Select only the approved meeting-notes document or folder. | "…select the meeting notes…" |
| 1.9 | Click **Confirm selection**. | "…and confirm the selection." |
| 1.10 | Set name: **Approved Weekly Meeting Notes**. | "Then I'll name the source…" |
| 1.11 | Enter description: *"Contains approved weekly team meeting notes. Use this information to identify commitments, owners, deadlines, and follow-up actions."* | "…describe what it contains and when the agent should use it." |
| 1.12 | Click **Add to agent**. | "Now I'll click Add to agent." |
| 1.13 | Confirm the source appears under **Knowledge**. | "The source appears under Knowledge." |
| 1.14 | Open the source, check status. Wait until **Ready**. | "I'll open it and check that its status is Ready." |
| 1.15 | Save the agent if there are unsaved changes. | (during "Also, notice that I haven't copied…") |
| 1.16 | **Overlay:** YOUR AGENT: Section 3 → Information → Connect your approved source | "For your own workflow, connect only the approved sources…" |

---

## 2. Give the agent a tool

| # | On screen | VO cue |
|---|---|---|
| 2.1 | **Overlay:** YOUR AGENT: Section 3 → Tools/actions → Choose the required capability | "For your agent, look at the 'Tools/actions' field…" |
| 2.2 | On **Build**, find **Tools** in the configuration panel. | "On Build, I'll find Tools…" |
| 2.3 | Click **+ / Add tool**. | "…and click Add tool." |
| 2.4 | Select **SharePoint** (featured connectors, or under **Connectors**). | "I'll choose SharePoint…" |
| 2.5 | Under **Run a single action**, select **Get items**. | "…then under Run a single action, select Get items." |
| 2.6 | Review the operation, click **Add**. | "I'll click Add…" |
| 2.7 | Let connection setup finish. | "…and let Copilot Studio finish setting up the tool." |
| 2.8 | Open the added **Get items** tool. | "Once the tool appears, I'll open it…" |
| 2.9 | Check connection and authentication settings (End user account authentication). | "…check the connection and authentication settings." |
| 2.10 | *If no suitable connection exists:* follow connection setup with the approved work account. | "You may be asked to connect your approved work account instead." |

---

## 3. Configure the tool

| # | On screen | VO cue |
|---|---|---|
| 3.1 | Open the **Get items** tool. | (start of section) |
| 3.2 | **Edit name** → **Read Team Action Tracker**. | "I'll rename the tool 'Read Team Action Tracker'…" |
| 3.3 | **Edit description** → *"Retrieves existing tasks, owners, due dates, and statuses from the Team Action Tracker SharePoint List. Use when comparing meeting commitments with existing actions. This tool only reads records."* | "…and add a description explaining what it retrieves…" |
| 3.4 | On **Inputs**, locate **Site Address**. | "On Inputs, Site Address and List Name initially use Fill with AI." |
| 3.5 | Site Address: **Fill with AI → Custom**; select/enter the approved site URL. | "I'll switch Site Address to Custom…" |
| 3.6 | List Name: **Fill with AI → Custom**; select **Team Action Tracker**. | "Then I'll switch List Name to Custom…" |
| 3.7 | Leave optional and advanced parameters unchanged. | "I'll leave the optional and advanced parameters unchanged…" |
| 3.8 | Click **Done**. | "…click Done…" |
| 3.9 | Click the agent's **Save** button. | "…and save the agent." |
| 3.10 | Reopen the tool; confirm site and list were retained. | "Finally, I'll reopen the tool…" |
| 3.11 | **Overlay table** (alongside the SharePoint settings): | "The important questions are the same…" |

| Configuration decision | My example |
|---|---|
| Which operation? | SharePoint, Get items |
| Which inputs must be fixed? | Site Address and List Name |
| How do I verify it? | Retrieve and check existing tracker records |

---

## 4. Connect the capabilities to your instructions

| # | On screen | VO cue |
|---|---|---|
| 4.1 | Return to **Build**, locate **Instructions**. | "Now I'll connect our instructions…" |
| 4.2 | Find the instruction about retrieving existing tracker records. | "I'll find the step about checking existing commitments…" |
| 4.3 | **Before / after** of that instruction. After: *"Use the configured Read Team Action Tracker tool to retrieve existing commitments before comparing. Its site and list are fixed; do not guess other sources."* | "…and explicitly name Read Team Action Tracker." |
| 4.4 | Find the meeting-notes instruction; reference **Approved Weekly Meeting Notes** by name. | "I'll also name Approved Weekly Meeting Notes…" |
| 4.5 | If the interface supports resource references, use the picker. Otherwise type the exact names in plain text. | "Some Copilot Studio interfaces support a resource picker…" |
| 4.6 | Save the agent. | "I'll save the agent." |

---

## 5. Verify the connection

| # | On screen | VO cue |
|---|---|---|
| 5.1 | Show Section 3 of the Build Plan, highlighting the information source and tool being tested. | "Before testing, go back to Section 3…" |
| 5.2 | **Overlay:** YOUR AGENT: Ask it to use one of the knowledge sources or tools you've connected to complete a small, specific, safe task. Check the result against the original source. | "For each one, ask your agent to perform a small, specific task…" |
| 5.3 | Return to Copilot Studio; confirm no unsaved changes. | "Let's look at my example." |
| 5.4 | **Overlay:** MY EXAMPLE: TEST 1: SHAREPOINT TOOL | "First, I'll test the SharePoint tool." |
| 5.5 | Select **Preview**. Enter: *"Retrieve the existing commitments from the Team Action Tracker. Show the task, owner, due date, and status. Do not change anything."* Send. | "I'll open Preview and ask…" |
| 5.6 | Compare results with the actual SharePoint List. | "Now I can compare the results with the actual tracker." |
| 5.7 | Inspect execution information; check that **Get items** ran. | "So I'll inspect the available execution information…" |
| 5.8 | **Overlay:** MY EXAMPLE: TEST 2: KNOWLEDGE SOURCE | "Next, let's test our knowledge source." |
| 5.9 | Enter: *"Using Approved Weekly Meeting Notes, summarize the commitments recorded in the November 3 demo meeting. Identify the source used."* Send. | "I'll ask the agent to summarize the commitments…" |
| 5.10 | Verify against the meeting notes. | "Again, I'll check the response against the original document…" |
| 5.11 | Show execution information, or the error if a test is blocked. | "If testing is blocked, record the exact error…" |
