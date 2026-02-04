/**
 * Integration action definitions shared across components.
 */

/** Definition of an action available for an integration. */
type IntegrationAction = {
  value: string;
  label: string;
  description: string;
};

/** Default actions for integrations without specific definitions. */
const defaultActions: IntegrationAction[] = [
  {
    value: "custom",
    label: "Custom Action",
    description: "Configure a custom API call",
  },
];

/** All available actions by integration ID. */
const integrationActions: Record<string, IntegrationAction[]> = {
  // E-Commerce
  shopify: [
    {
      value: "get_products",
      label: "Get Products",
      description: "Retrieve a list of products",
    },
    {
      value: "get_product",
      label: "Get Product",
      description: "Get a single product by ID",
    },
    {
      value: "create_product",
      label: "Create Product",
      description: "Add a new product",
    },
    {
      value: "update_product",
      label: "Update Product",
      description: "Update an existing product",
    },
    {
      value: "get_orders",
      label: "Get Orders",
      description: "Retrieve a list of orders",
    },
    {
      value: "get_order",
      label: "Get Order",
      description: "Get a single order by ID",
    },
    {
      value: "create_order",
      label: "Create Order",
      description: "Create a draft order",
    },
    {
      value: "get_customers",
      label: "Get Customers",
      description: "Retrieve a list of customers",
    },
    {
      value: "get_customer",
      label: "Get Customer",
      description: "Get a single customer by ID",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],

  // Payments
  stripe: [
    {
      value: "get_customers",
      label: "Get Customers",
      description: "List all customers",
    },
    {
      value: "get_customer",
      label: "Get Customer",
      description: "Get a customer by ID",
    },
    {
      value: "create_customer",
      label: "Create Customer",
      description: "Add a new customer",
    },
    {
      value: "create_payment_intent",
      label: "Create Payment",
      description: "Start a new payment",
    },
    {
      value: "get_invoices",
      label: "Get Invoices",
      description: "List all invoices",
    },
    {
      value: "create_invoice",
      label: "Create Invoice",
      description: "Create a new invoice",
    },
    {
      value: "get_subscriptions",
      label: "Get Subscriptions",
      description: "List subscriptions",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],

  // SMS / Voice
  twilio: [
    {
      value: "send_sms",
      label: "Send SMS",
      description: "Send a text message",
    },
    {
      value: "send_mms",
      label: "Send MMS",
      description: "Send a multimedia message",
    },
    {
      value: "make_call",
      label: "Make Call",
      description: "Initiate a phone call",
    },
    {
      value: "get_messages",
      label: "Get Messages",
      description: "List recent messages",
    },
    {
      value: "get_message",
      label: "Get Message",
      description: "Get message by SID",
    },
    {
      value: "get_calls",
      label: "Get Calls",
      description: "List recent calls",
    },
    {
      value: "lookup_phone",
      label: "Lookup Phone",
      description: "Look up phone number info",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],

  // Email
  resend: [
    {
      value: "send_email",
      label: "Send Email",
      description: "Send a transactional email",
    },
    {
      value: "send_batch",
      label: "Send Batch",
      description: "Send multiple emails at once",
    },
    {
      value: "get_email",
      label: "Get Email",
      description: "Get email by ID",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  sendgrid: [
    {
      value: "send_email",
      label: "Send Email",
      description: "Send a transactional email",
    },
    {
      value: "send_template",
      label: "Send Template",
      description: "Send email using template",
    },
    {
      value: "get_contacts",
      label: "Get Contacts",
      description: "List marketing contacts",
    },
    {
      value: "add_contact",
      label: "Add Contact",
      description: "Add a marketing contact",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  mailchimp: [
    {
      value: "add_subscriber",
      label: "Add Subscriber",
      description: "Add to mailing list",
    },
    {
      value: "update_subscriber",
      label: "Update Subscriber",
      description: "Update subscriber info",
    },
    {
      value: "get_lists",
      label: "Get Lists",
      description: "Get all mailing lists",
    },
    {
      value: "get_campaigns",
      label: "Get Campaigns",
      description: "List email campaigns",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],

  // Communication
  slack: [
    {
      value: "send_message",
      label: "Send Message",
      description: "Send a message to a channel",
    },
    {
      value: "send_dm",
      label: "Send DM",
      description: "Send a direct message",
    },
    {
      value: "get_channels",
      label: "Get Channels",
      description: "List available channels",
    },
    {
      value: "get_users",
      label: "Get Users",
      description: "List workspace users",
    },
    {
      value: "create_channel",
      label: "Create Channel",
      description: "Create a new channel",
    },
    {
      value: "upload_file",
      label: "Upload File",
      description: "Upload a file to channel",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  discord: [
    {
      value: "send_message",
      label: "Send Message",
      description: "Send a message to a channel",
    },
    {
      value: "send_dm",
      label: "Send DM",
      description: "Send a direct message",
    },
    {
      value: "get_guilds",
      label: "Get Servers",
      description: "List bot's servers",
    },
    {
      value: "get_channels",
      label: "Get Channels",
      description: "List server channels",
    },
    {
      value: "create_channel",
      label: "Create Channel",
      description: "Create a new channel",
    },
    {
      value: "add_reaction",
      label: "Add Reaction",
      description: "Add reaction to message",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  telegram: [
    {
      value: "send_message",
      label: "Send Message",
      description: "Send a text message",
    },
    {
      value: "send_photo",
      label: "Send Photo",
      description: "Send an image",
    },
    {
      value: "send_document",
      label: "Send Document",
      description: "Send a file",
    },
    {
      value: "get_updates",
      label: "Get Updates",
      description: "Get recent messages",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  "microsoft-teams": [
    {
      value: "send_message",
      label: "Send Message",
      description: "Send a message to a channel",
    },
    {
      value: "send_chat",
      label: "Send Chat",
      description: "Send a chat message",
    },
    {
      value: "get_teams",
      label: "Get Teams",
      description: "List available teams",
    },
    {
      value: "get_channels",
      label: "Get Channels",
      description: "List team channels",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],

  // AI
  openai: [
    {
      value: "ask_chatgpt",
      label: "Ask ChatGPT",
      description: "Send a prompt to ChatGPT",
    },
    {
      value: "ask_assistant",
      label: "Ask Assistant",
      description: "Chat with an OpenAI Assistant",
    },
    {
      value: "generate_image",
      label: "Generate Image",
      description: "Generate image with DALL-E",
    },
    {
      value: "vision_prompt",
      label: "Vision Prompt",
      description: "Analyze images with GPT-4 Vision",
    },
    {
      value: "text_to_speech",
      label: "Text to Speech",
      description: "Convert text to spoken audio",
    },
    {
      value: "transcribe_audio",
      label: "Transcribe Audio",
      description: "Transcribe audio with Whisper",
    },
    {
      value: "translate_audio",
      label: "Translate Audio",
      description: "Translate audio to English",
    },
    {
      value: "extract-structured-data",
      label: "Extract Structured Data",
      description: "Extract structured data from text",
    },
    {
      value: "custom_api_call",
      label: "Custom API Call",
      description: "Make a custom OpenAI API call",
    },
  ],
  anthropic: [
    {
      value: "ask_claude",
      label: "Ask Claude",
      description: "Ask Claude anything you want!",
    },
    {
      value: "extract-structured-data",
      label: "Extract Structured Data",
      description: "Extract structured data from text, image or PDF",
    },
    {
      value: "custom_api_call",
      label: "Custom API Call",
      description: "Make a custom Anthropic API call",
    },
  ],
  mistral: [
    {
      value: "create_chat_completion",
      label: "Ask Mistral",
      description: "Ask Mistral anything you want!",
    },
    {
      value: "create_embeddings",
      label: "Create Embeddings",
      description: "Generate text embeddings",
    },
    {
      value: "upload_file",
      label: "Upload File",
      description: "Upload a file for fine-tuning or context",
    },
    {
      value: "list_models",
      label: "List Models",
      description: "List available Mistral AI models",
    },
    {
      value: "custom_api_call",
      label: "Custom API Call",
      description: "Make a custom Mistral API call",
    },
  ],
  groq: [
    {
      value: "ask-ai",
      label: "Ask AI",
      description: "Ask Groq using fast language models",
    },
    {
      value: "transcribe-audio",
      label: "Transcribe Audio",
      description: "Transcribe audio into text",
    },
    {
      value: "translate-audio",
      label: "Translate Audio",
      description: "Translate audio to English",
    },
  ],
  perplexity: [
    {
      value: "ask-ai",
      label: "Ask AI",
      description: "AI-powered search and completion",
    },
  ],
  replicate: [
    {
      value: "run_model",
      label: "Run Model",
      description: "Run a model prediction",
    },
    {
      value: "get_prediction",
      label: "Get Prediction",
      description: "Get prediction status",
    },
    {
      value: "list_models",
      label: "List Models",
      description: "List available models",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],

  // Developer
  github: [
    {
      value: "get_repos",
      label: "Get Repos",
      description: "List repositories",
    },
    {
      value: "get_repo",
      label: "Get Repo",
      description: "Get repository details",
    },
    {
      value: "create_issue",
      label: "Create Issue",
      description: "Create a new issue",
    },
    {
      value: "get_issues",
      label: "Get Issues",
      description: "List repository issues",
    },
    {
      value: "create_pr",
      label: "Create PR",
      description: "Create a pull request",
    },
    {
      value: "get_prs",
      label: "Get PRs",
      description: "List pull requests",
    },
    {
      value: "create_comment",
      label: "Create Comment",
      description: "Add comment to issue/PR",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  linear: [
    {
      value: "create_issue",
      label: "Create Issue",
      description: "Create a new issue",
    },
    {
      value: "get_issues",
      label: "Get Issues",
      description: "List issues",
    },
    {
      value: "update_issue",
      label: "Update Issue",
      description: "Update an issue",
    },
    {
      value: "get_projects",
      label: "Get Projects",
      description: "List projects",
    },
    {
      value: "create_comment",
      label: "Create Comment",
      description: "Add comment to issue",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  jira: [
    {
      value: "create_issue",
      label: "Create Issue",
      description: "Create a new issue",
    },
    {
      value: "get_issues",
      label: "Get Issues",
      description: "Search issues",
    },
    {
      value: "update_issue",
      label: "Update Issue",
      description: "Update an issue",
    },
    {
      value: "get_projects",
      label: "Get Projects",
      description: "List projects",
    },
    {
      value: "add_comment",
      label: "Add Comment",
      description: "Add comment to issue",
    },
    {
      value: "transition_issue",
      label: "Transition Issue",
      description: "Change issue status",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  asana: [
    {
      value: "create_task",
      label: "Create Task",
      description: "Create a new task",
    },
    { value: "get_tasks", label: "Get Tasks", description: "List tasks" },
    {
      value: "update_task",
      label: "Update Task",
      description: "Update a task",
    },
    {
      value: "get_projects",
      label: "Get Projects",
      description: "List projects",
    },
    {
      value: "add_comment",
      label: "Add Comment",
      description: "Add comment to task",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  trello: [
    {
      value: "create_card",
      label: "Create Card",
      description: "Create a new card",
    },
    { value: "get_cards", label: "Get Cards", description: "List cards" },
    {
      value: "update_card",
      label: "Update Card",
      description: "Update a card",
    },
    {
      value: "get_boards",
      label: "Get Boards",
      description: "List boards",
    },
    {
      value: "get_lists",
      label: "Get Lists",
      description: "List board lists",
    },
    {
      value: "move_card",
      label: "Move Card",
      description: "Move card to list",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  clickup: [
    {
      value: "create_task",
      label: "Create Task",
      description: "Create a new task",
    },
    { value: "get_tasks", label: "Get Tasks", description: "List tasks" },
    {
      value: "update_task",
      label: "Update Task",
      description: "Update a task",
    },
    {
      value: "get_spaces",
      label: "Get Spaces",
      description: "List spaces",
    },
    {
      value: "add_comment",
      label: "Add Comment",
      description: "Add comment to task",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  monday: [
    {
      value: "create_item",
      label: "Create Item",
      description: "Create a new item",
    },
    {
      value: "get_items",
      label: "Get Items",
      description: "List board items",
    },
    {
      value: "update_item",
      label: "Update Item",
      description: "Update an item",
    },
    {
      value: "get_boards",
      label: "Get Boards",
      description: "List boards",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],

  // Productivity
  notion: [
    {
      value: "create_page",
      label: "Create Page",
      description: "Create a new page",
    },
    {
      value: "get_page",
      label: "Get Page",
      description: "Get page content",
    },
    {
      value: "update_page",
      label: "Update Page",
      description: "Update page properties",
    },
    {
      value: "query_database",
      label: "Query Database",
      description: "Query a database",
    },
    {
      value: "create_database_item",
      label: "Create Database Item",
      description: "Add item to database",
    },
    {
      value: "search",
      label: "Search",
      description: "Search pages and databases",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  airtable: [
    {
      value: "get_records",
      label: "Get Records",
      description: "List table records",
    },
    {
      value: "get_record",
      label: "Get Record",
      description: "Get a single record",
    },
    {
      value: "create_record",
      label: "Create Record",
      description: "Create a new record",
    },
    {
      value: "update_record",
      label: "Update Record",
      description: "Update a record",
    },
    {
      value: "delete_record",
      label: "Delete Record",
      description: "Delete a record",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  "google-sheets": [
    {
      value: "get_values",
      label: "Get Values",
      description: "Read cell values",
    },
    {
      value: "update_values",
      label: "Update Values",
      description: "Write cell values",
    },
    {
      value: "append_row",
      label: "Append Row",
      description: "Add a new row",
    },
    {
      value: "get_spreadsheet",
      label: "Get Spreadsheet",
      description: "Get spreadsheet info",
    },
    {
      value: "create_sheet",
      label: "Create Sheet",
      description: "Create a new sheet tab",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  "google-drive": [
    {
      value: "list_files",
      label: "List Files",
      description: "List files in folder",
    },
    {
      value: "get_file",
      label: "Get File",
      description: "Get file metadata",
    },
    {
      value: "upload_file",
      label: "Upload File",
      description: "Upload a new file",
    },
    {
      value: "create_folder",
      label: "Create Folder",
      description: "Create a new folder",
    },
    {
      value: "share_file",
      label: "Share File",
      description: "Share file with users",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  "google-calendar": [
    {
      value: "get_events",
      label: "Get Events",
      description: "List calendar events",
    },
    {
      value: "create_event",
      label: "Create Event",
      description: "Create a new event",
    },
    {
      value: "update_event",
      label: "Update Event",
      description: "Update an event",
    },
    {
      value: "delete_event",
      label: "Delete Event",
      description: "Delete an event",
    },
    {
      value: "get_calendars",
      label: "Get Calendars",
      description: "List calendars",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  dropbox: [
    {
      value: "list_files",
      label: "List Files",
      description: "List files in folder",
    },
    {
      value: "get_file",
      label: "Get File",
      description: "Download file content",
    },
    {
      value: "upload_file",
      label: "Upload File",
      description: "Upload a new file",
    },
    {
      value: "create_folder",
      label: "Create Folder",
      description: "Create a new folder",
    },
    {
      value: "share_file",
      label: "Share File",
      description: "Create sharing link",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],

  // CRM / Sales
  hubspot: [
    {
      value: "get_contacts",
      label: "Get Contacts",
      description: "List contacts",
    },
    {
      value: "create_contact",
      label: "Create Contact",
      description: "Create a contact",
    },
    {
      value: "update_contact",
      label: "Update Contact",
      description: "Update a contact",
    },
    { value: "get_deals", label: "Get Deals", description: "List deals" },
    {
      value: "create_deal",
      label: "Create Deal",
      description: "Create a deal",
    },
    {
      value: "get_companies",
      label: "Get Companies",
      description: "List companies",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  salesforce: [
    {
      value: "query",
      label: "SOQL Query",
      description: "Run a SOQL query",
    },
    {
      value: "get_record",
      label: "Get Record",
      description: "Get a record by ID",
    },
    {
      value: "create_record",
      label: "Create Record",
      description: "Create a new record",
    },
    {
      value: "update_record",
      label: "Update Record",
      description: "Update a record",
    },
    {
      value: "delete_record",
      label: "Delete Record",
      description: "Delete a record",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],

  // Support
  zendesk: [
    {
      value: "create_ticket",
      label: "Create Ticket",
      description: "Create a support ticket",
    },
    {
      value: "get_tickets",
      label: "Get Tickets",
      description: "List tickets",
    },
    {
      value: "update_ticket",
      label: "Update Ticket",
      description: "Update a ticket",
    },
    {
      value: "add_comment",
      label: "Add Comment",
      description: "Add ticket comment",
    },
    { value: "get_users", label: "Get Users", description: "List users" },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  intercom: [
    {
      value: "create_contact",
      label: "Create Contact",
      description: "Create a contact",
    },
    {
      value: "get_contacts",
      label: "Get Contacts",
      description: "List contacts",
    },
    {
      value: "send_message",
      label: "Send Message",
      description: "Send in-app message",
    },
    {
      value: "create_conversation",
      label: "Create Conversation",
      description: "Start conversation",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],

  // Infrastructure
  firebase: [
    {
      value: "get_document",
      label: "Get Document",
      description: "Get Firestore document",
    },
    {
      value: "set_document",
      label: "Set Document",
      description: "Set Firestore document",
    },
    {
      value: "query_collection",
      label: "Query Collection",
      description: "Query collection",
    },
    {
      value: "delete_document",
      label: "Delete Document",
      description: "Delete document",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  supabase: [
    { value: "select", label: "Select", description: "Query table data" },
    { value: "insert", label: "Insert", description: "Insert new rows" },
    {
      value: "update",
      label: "Update",
      description: "Update existing rows",
    },
    { value: "delete", label: "Delete", description: "Delete rows" },
    {
      value: "rpc",
      label: "Call Function",
      description: "Call database function",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  "aws-s3": [
    {
      value: "list_objects",
      label: "List Objects",
      description: "List bucket objects",
    },
    {
      value: "get_object",
      label: "Get Object",
      description: "Download object",
    },
    {
      value: "put_object",
      label: "Put Object",
      description: "Upload object",
    },
    {
      value: "delete_object",
      label: "Delete Object",
      description: "Delete object",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  mongodb: [
    { value: "find", label: "Find", description: "Query documents" },
    {
      value: "find_one",
      label: "Find One",
      description: "Get single document",
    },
    {
      value: "insert_one",
      label: "Insert One",
      description: "Insert document",
    },
    {
      value: "update_one",
      label: "Update One",
      description: "Update document",
    },
    {
      value: "delete_one",
      label: "Delete One",
      description: "Delete document",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  postgresql: [
    { value: "query", label: "Query", description: "Execute SQL query" },
    { value: "insert", label: "Insert", description: "Insert rows" },
    { value: "update", label: "Update", description: "Update rows" },
    { value: "delete", label: "Delete", description: "Delete rows" },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],

  // Monitoring
  sentry: [
    {
      value: "get_issues",
      label: "Get Issues",
      description: "List error issues",
    },
    {
      value: "get_events",
      label: "Get Events",
      description: "List error events",
    },
    {
      value: "resolve_issue",
      label: "Resolve Issue",
      description: "Mark issue resolved",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  datadog: [
    {
      value: "query_metrics",
      label: "Query Metrics",
      description: "Query time series",
    },
    {
      value: "create_event",
      label: "Create Event",
      description: "Post custom event",
    },
    {
      value: "get_monitors",
      label: "Get Monitors",
      description: "List monitors",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
  pagerduty: [
    {
      value: "create_incident",
      label: "Create Incident",
      description: "Trigger an incident",
    },
    {
      value: "get_incidents",
      label: "Get Incidents",
      description: "List incidents",
    },
    {
      value: "acknowledge_incident",
      label: "Acknowledge",
      description: "Acknowledge incident",
    },
    {
      value: "resolve_incident",
      label: "Resolve",
      description: "Resolve incident",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],

  // Video / Meetings
  zoom: [
    {
      value: "create_meeting",
      label: "Create Meeting",
      description: "Schedule a meeting",
    },
    {
      value: "get_meetings",
      label: "Get Meetings",
      description: "List meetings",
    },
    {
      value: "get_meeting",
      label: "Get Meeting",
      description: "Get meeting details",
    },
    {
      value: "delete_meeting",
      label: "Delete Meeting",
      description: "Cancel a meeting",
    },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],

  // Smart Home / IoT
  mqtt: [
    {
      value: "publish",
      label: "Publish Message",
      description: "Publish a message to an MQTT topic",
    },
    {
      value: "subscribe",
      label: "Subscribe",
      description: "Subscribe to topic (trigger only)",
    },
    {
      value: "publish_json",
      label: "Publish JSON",
      description: "Publish JSON payload to topic",
    },
    {
      value: "publish_retain",
      label: "Publish Retained",
      description: "Publish retained message",
    },
  ],
  homeassistant: [
    {
      value: "call_service",
      label: "Call Service",
      description: "Call a Home Assistant service",
    },
    {
      value: "get_state",
      label: "Get State",
      description: "Get entity state",
    },
    {
      value: "get_states",
      label: "Get All States",
      description: "Get all entity states",
    },
    {
      value: "set_state",
      label: "Set State",
      description: "Set entity state",
    },
    {
      value: "fire_event",
      label: "Fire Event",
      description: "Fire a custom event",
    },
    {
      value: "turn_on",
      label: "Turn On",
      description: "Turn on a device",
    },
    {
      value: "turn_off",
      label: "Turn Off",
      description: "Turn off a device",
    },
    {
      value: "toggle",
      label: "Toggle",
      description: "Toggle a device on/off",
    },
    {
      value: "set_light",
      label: "Set Light",
      description: "Set light brightness/color",
    },
    {
      value: "set_climate",
      label: "Set Climate",
      description: "Set thermostat/HVAC",
    },
    {
      value: "send_notification",
      label: "Send Notification",
      description: "Send mobile notification",
    },
    {
      value: "run_script",
      label: "Run Script",
      description: "Execute a script",
    },
    {
      value: "trigger_automation",
      label: "Trigger Automation",
      description: "Trigger an automation",
    },
    {
      value: "custom",
      label: "Custom API Call",
      description: "Make a custom API call",
    },
  ],
  nodered: [
    {
      value: "inject",
      label: "Inject",
      description: "Trigger a Node-RED flow via HTTP",
    },
    {
      value: "http_request",
      label: "HTTP Request",
      description: "Call Node-RED HTTP endpoint",
    },
  ],
  philipshue: [
    {
      value: "set_light",
      label: "Set Light",
      description: "Control a light",
    },
    {
      value: "set_group",
      label: "Set Group/Room",
      description: "Control a room or zone",
    },
    {
      value: "set_scene",
      label: "Set Scene",
      description: "Activate a scene",
    },
    {
      value: "get_lights",
      label: "Get Lights",
      description: "List all lights",
    },
    {
      value: "get_sensors",
      label: "Get Sensors",
      description: "List all sensors",
    },
    {
      value: "custom",
      label: "Custom API Call",
      description: "Make a custom API call",
    },
  ],

  // CMS
  wordpress: [
    {
      value: "get_posts",
      label: "Get Posts",
      description: "List blog posts",
    },
    {
      value: "create_post",
      label: "Create Post",
      description: "Create a new post",
    },
    {
      value: "update_post",
      label: "Update Post",
      description: "Update a post",
    },
    { value: "get_pages", label: "Get Pages", description: "List pages" },
    {
      value: "custom",
      label: "Custom Action",
      description: "Configure a custom API call",
    },
  ],
};

/**
 * Get available actions for an integration.
 * @param integrationId - The integration identifier (e.g., "twilio", "shopify").
 * @returns Array of available actions for the integration, or default actions if not found.
 */
const getIntegrationActions = (integrationId: string): IntegrationAction[] => {
  return integrationActions[integrationId] || defaultActions;
};

export { defaultActions, getIntegrationActions, integrationActions };

export type { IntegrationAction };
