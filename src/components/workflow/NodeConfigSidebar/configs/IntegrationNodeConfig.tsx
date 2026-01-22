import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { AlertCircle, ExternalLink, Loader2, Plug } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { integrationDefinitionOptions } from "@/lib/options/integrations.options";

import type { NodeConfigProps } from "./types";

/**
 * IntegrationNodeConfig provides a user-friendly UI for configuring
 * integration nodes (Shopify, Stripe, etc.) instead of showing raw
 * operation/inputs fields.
 */
export const IntegrationNodeConfig = ({ data, onChange }: NodeConfigProps) => {
  const { workspaceSlug } = useParams({ strict: false });
  const integrationDefinitionId = data.integrationDefinitionId as
    | string
    | undefined;
  const requiresConnection = data.requiresConnection as boolean | undefined;
  const operation = (data.operation as string) || "";
  const inputs = (data.inputs as Record<string, unknown>) || {};

  // Fetch the integration definition to get available actions
  const { data: definitionData, isLoading } = useQuery({
    ...integrationDefinitionOptions({ rowId: integrationDefinitionId || "" }),
    enabled: !!integrationDefinitionId,
  });

  const definition = definitionData?.integrationDefinition;

  // For now, we'll provide a simple but friendly interface
  // In a full implementation, this would show actions from the catalog
  const commonActions = useMemo(() => {
    // Use rowId (e.g., "twilio") - the actual primary key, not the Relay Node ID
    const integrationId = definition?.rowId || integrationDefinitionId;
    if (!integrationId) return [];

    // Map common integration patterns to user-friendly actions
    const actionsByIntegration: Record<
      string,
      { value: string; label: string; description: string }[]
    > = {
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

      // Default actions for any integration
      default: [
        {
          value: "custom",
          label: "Custom Action",
          description: "Configure a custom API call",
        },
      ],
    };

    return actionsByIntegration[integrationId] || actionsByIntegration.default;
  }, [definition?.rowId, integrationDefinitionId]);

  const updateInput = (key: string, value: unknown) => {
    onChange("inputs", { ...inputs, [key]: value });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      {requiresConnection && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950">
          <Plug className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="flex flex-1 items-center justify-between gap-2">
            <span className="text-amber-800 text-sm dark:text-amber-200">
              This integration needs to be connected first.
            </span>
            <Button variant="outline" size="sm" asChild>
              <a
                href={`/workspaces/${workspaceSlug}/integrations?connect=${integrationDefinitionId}&returnTo=${encodeURIComponent(window.location.pathname)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={(data.description as string) || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder={`What should this ${definition?.name || "integration"} step do?`}
          rows={2}
        />
      </div>

      {/* Action Selection */}
      <div className="space-y-2">
        <Label>Action</Label>
        <Select
          value={operation}
          onValueChange={(v) => onChange("operation", v)}
          disabled={requiresConnection}
        >
          <SelectTrigger disabled={requiresConnection}>
            <SelectValue placeholder="Select an action..." />
          </SelectTrigger>
          <SelectContent>
            {commonActions.map((action) => (
              <SelectItem key={action.value} value={action.value}>
                <div className="flex flex-col">
                  <span>{action.label}</span>
                  <span className="text-muted-foreground text-xs">
                    {action.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Inputs based on selected action */}
      {!requiresConnection && operation && operation !== "custom" && (
        <ActionInputs
          integrationId={definition?.rowId || integrationDefinitionId || ""}
          operation={operation}
          inputs={inputs}
          updateInput={updateInput}
        />
      )}

      {/* Custom action shows generic inputs */}
      {!requiresConnection && operation === "custom" && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border bg-muted/50 p-3">
            <AlertCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              For custom actions, refer to the{" "}
              {definition?.docsUrl ? (
                <a
                  href={definition.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  API documentation
                </a>
              ) : (
                "integration's API documentation"
              )}
              .
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endpoint">Endpoint / Method</Label>
            <Input
              id="endpoint"
              value={(inputs.endpoint as string) || ""}
              onChange={(e) => updateInput("endpoint", e.target.value)}
              placeholder="e.g., products/list or /api/orders"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="params">Parameters (JSON)</Label>
            <Textarea
              id="params"
              value={
                typeof inputs.params === "object"
                  ? JSON.stringify(inputs.params, null, 2)
                  : (inputs.params as string) || ""
              }
              onChange={(e) => {
                try {
                  updateInput("params", JSON.parse(e.target.value));
                } catch {
                  updateInput("params", e.target.value);
                }
              }}
              placeholder='{"limit": 10}'
              rows={4}
              className="font-mono text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Render appropriate input fields based on the selected action
 */
const ActionInputs = ({
  integrationId,
  operation,
  inputs,
  updateInput,
}: {
  integrationId: string;
  operation: string;
  inputs: Record<string, unknown>;
  updateInput: (key: string, value: unknown) => void;
}) => {
  // Shopify-specific inputs
  if (integrationId === "shopify") {
    if (operation === "get_product" || operation === "update_product") {
      return (
        <div className="space-y-2">
          <Label htmlFor="product_id">Product ID</Label>
          <Input
            id="product_id"
            value={(inputs.product_id as string) || ""}
            onChange={(e) => updateInput("product_id", e.target.value)}
            placeholder="Enter product ID or use {{variable}}"
          />
        </div>
      );
    }

    if (operation === "get_order") {
      return (
        <div className="space-y-2">
          <Label htmlFor="order_id">Order ID</Label>
          <Input
            id="order_id"
            value={(inputs.order_id as string) || ""}
            onChange={(e) => updateInput("order_id", e.target.value)}
            placeholder="Enter order ID or use {{variable}}"
          />
        </div>
      );
    }

    if (operation === "get_customer") {
      return (
        <div className="space-y-2">
          <Label htmlFor="customer_id">Customer ID</Label>
          <Input
            id="customer_id"
            value={(inputs.customer_id as string) || ""}
            onChange={(e) => updateInput("customer_id", e.target.value)}
            placeholder="Enter customer ID or use {{variable}}"
          />
        </div>
      );
    }

    if (
      operation === "get_products" ||
      operation === "get_orders" ||
      operation === "get_customers"
    ) {
      return (
        <div className="space-y-2">
          <Label htmlFor="limit">Limit (optional)</Label>
          <Input
            id="limit"
            type="number"
            value={(inputs.limit as number) || ""}
            onChange={(e) =>
              updateInput(
                "limit",
                e.target.value
                  ? Number.parseInt(e.target.value, 10)
                  : undefined,
              )
            }
            placeholder="50"
            min={1}
            max={250}
          />
          <p className="text-muted-foreground text-xs">
            Maximum number of items to return (1-250)
          </p>
        </div>
      );
    }

    if (operation === "create_product") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              value={(inputs.title as string) || ""}
              onChange={(e) => updateInput("title", e.target.value)}
              placeholder="Enter product title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body_html">Description (HTML)</Label>
            <Textarea
              id="body_html"
              value={(inputs.body_html as string) || ""}
              onChange={(e) => updateInput("body_html", e.target.value)}
              placeholder="Product description..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vendor">Vendor (optional)</Label>
            <Input
              id="vendor"
              value={(inputs.vendor as string) || ""}
              onChange={(e) => updateInput("vendor", e.target.value)}
              placeholder="Brand name"
            />
          </div>
        </div>
      );
    }
  }

  // Stripe-specific inputs
  if (integrationId === "stripe") {
    if (operation === "create_customer") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={(inputs.email as string) || ""}
              onChange={(e) => updateInput("email", e.target.value)}
              placeholder="customer@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              value={(inputs.name as string) || ""}
              onChange={(e) => updateInput("name", e.target.value)}
              placeholder="Customer name"
            />
          </div>
        </div>
      );
    }

    if (operation === "create_payment_intent") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (cents)</Label>
            <Input
              id="amount"
              type="number"
              value={(inputs.amount as number) || ""}
              onChange={(e) =>
                updateInput("amount", Number.parseInt(e.target.value, 10))
              }
              placeholder="1000 = $10.00"
            />
            <p className="text-muted-foreground text-xs">
              Amount in cents (e.g., 1000 = $10.00)
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={(inputs.currency as string) || "usd"}
              onValueChange={(v) => updateInput("currency", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="gbp">GBP</SelectItem>
                <SelectItem value="cad">CAD</SelectItem>
                <SelectItem value="aud">AUD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }
  }

  // Twilio-specific inputs
  if (integrationId === "twilio") {
    if (operation === "send_sms" || operation === "send_mms") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To Phone Number</Label>
            <Input
              id="to"
              value={(inputs.to as string) || ""}
              onChange={(e) => updateInput("to", e.target.value)}
              placeholder="+1234567890 or {{variable}}"
            />
            <p className="text-muted-foreground text-xs">
              Phone number in E.164 format (e.g., +1234567890)
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="from">From Phone Number</Label>
            <Input
              id="from"
              value={(inputs.from as string) || ""}
              onChange={(e) => updateInput("from", e.target.value)}
              placeholder="+1234567890 (your Twilio number)"
            />
            <p className="text-muted-foreground text-xs">
              Your Twilio phone number
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Message Body</Label>
            <Textarea
              id="body"
              value={(inputs.body as string) || ""}
              onChange={(e) => updateInput("body", e.target.value)}
              placeholder="Enter your message or use {{variable}}"
              rows={3}
            />
          </div>
          {operation === "send_mms" && (
            <div className="space-y-2">
              <Label htmlFor="mediaUrl">Media URL (optional)</Label>
              <Input
                id="mediaUrl"
                value={(inputs.mediaUrl as string) || ""}
                onChange={(e) => updateInput("mediaUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-muted-foreground text-xs">
                URL of the media to attach
              </p>
            </div>
          )}
        </div>
      );
    }

    if (operation === "make_call") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To Phone Number</Label>
            <Input
              id="to"
              value={(inputs.to as string) || ""}
              onChange={(e) => updateInput("to", e.target.value)}
              placeholder="+1234567890 or {{variable}}"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from">From Phone Number</Label>
            <Input
              id="from"
              value={(inputs.from as string) || ""}
              onChange={(e) => updateInput("from", e.target.value)}
              placeholder="+1234567890 (your Twilio number)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">TwiML URL</Label>
            <Input
              id="url"
              value={(inputs.url as string) || ""}
              onChange={(e) => updateInput("url", e.target.value)}
              placeholder="https://example.com/twiml"
            />
            <p className="text-muted-foreground text-xs">
              URL that returns TwiML instructions for the call
            </p>
          </div>
        </div>
      );
    }

    if (operation === "get_message") {
      return (
        <div className="space-y-2">
          <Label htmlFor="messageSid">Message SID</Label>
          <Input
            id="messageSid"
            value={(inputs.messageSid as string) || ""}
            onChange={(e) => updateInput("messageSid", e.target.value)}
            placeholder="SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          />
        </div>
      );
    }

    if (operation === "lookup_phone") {
      return (
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            value={(inputs.phoneNumber as string) || ""}
            onChange={(e) => updateInput("phoneNumber", e.target.value)}
            placeholder="+1234567890"
          />
          <p className="text-muted-foreground text-xs">
            Phone number to look up information for
          </p>
        </div>
      );
    }
  }

  // Slack-specific inputs
  if (integrationId === "slack") {
    if (operation === "send_message") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="channel">Channel</Label>
            <Input
              id="channel"
              value={(inputs.channel as string) || ""}
              onChange={(e) => updateInput("channel", e.target.value)}
              placeholder="#general or C1234567890"
            />
            <p className="text-muted-foreground text-xs">
              Channel name (with #) or channel ID
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Message</Label>
            <Textarea
              id="text"
              value={(inputs.text as string) || ""}
              onChange={(e) => updateInput("text", e.target.value)}
              placeholder="Enter your message or use {{variable}}"
              rows={3}
            />
          </div>
        </div>
      );
    }

    if (operation === "send_dm") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user">User</Label>
            <Input
              id="user"
              value={(inputs.user as string) || ""}
              onChange={(e) => updateInput("user", e.target.value)}
              placeholder="U1234567890 or @username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Message</Label>
            <Textarea
              id="text"
              value={(inputs.text as string) || ""}
              onChange={(e) => updateInput("text", e.target.value)}
              placeholder="Enter your message"
              rows={3}
            />
          </div>
        </div>
      );
    }
  }

  // Discord-specific inputs
  if (integrationId === "discord") {
    if (operation === "send_message") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="channelId">Channel ID</Label>
            <Input
              id="channelId"
              value={(inputs.channelId as string) || ""}
              onChange={(e) => updateInput("channelId", e.target.value)}
              placeholder="123456789012345678"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Message</Label>
            <Textarea
              id="content"
              value={(inputs.content as string) || ""}
              onChange={(e) => updateInput("content", e.target.value)}
              placeholder="Enter your message"
              rows={3}
            />
          </div>
        </div>
      );
    }
  }

  // Email integrations (Resend, SendGrid)
  if (integrationId === "resend" || integrationId === "sendgrid") {
    if (operation === "send_email") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              value={(inputs.to as string) || ""}
              onChange={(e) => updateInput("to", e.target.value)}
              placeholder="recipient@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              value={(inputs.from as string) || ""}
              onChange={(e) => updateInput("from", e.target.value)}
              placeholder="sender@yourdomain.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={(inputs.subject as string) || ""}
              onChange={(e) => updateInput("subject", e.target.value)}
              placeholder="Email subject"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="html">Body (HTML)</Label>
            <Textarea
              id="html"
              value={(inputs.html as string) || ""}
              onChange={(e) => updateInput("html", e.target.value)}
              placeholder="<p>Your email content...</p>"
              rows={4}
            />
          </div>
        </div>
      );
    }
  }

  // AI integrations (OpenAI, Anthropic)
  if (integrationId === "openai" || integrationId === "anthropic") {
    if (operation === "ask_chatgpt" || operation === "ask_claude") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={(inputs.model as string) || ""}
              onChange={(e) => updateInput("model", e.target.value)}
              placeholder={
                integrationId === "openai" ? "gpt-4" : "claude-3-opus-20240229"
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="systemPrompt">System Prompt (optional)</Label>
            <Textarea
              id="systemPrompt"
              value={(inputs.systemPrompt as string) || ""}
              onChange={(e) => updateInput("systemPrompt", e.target.value)}
              placeholder="You are a helpful assistant..."
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userMessage">User Message</Label>
            <Textarea
              id="userMessage"
              value={(inputs.userMessage as string) || ""}
              onChange={(e) => updateInput("userMessage", e.target.value)}
              placeholder="Enter your prompt or use {{variable}}"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxTokens">Max Tokens (optional)</Label>
            <Input
              id="maxTokens"
              type="number"
              value={(inputs.maxTokens as number) || ""}
              onChange={(e) =>
                updateInput(
                  "maxTokens",
                  e.target.value
                    ? Number.parseInt(e.target.value, 10)
                    : undefined,
                )
              }
              placeholder="1024"
            />
          </div>
        </div>
      );
    }
  }

  // GitHub-specific inputs
  if (integrationId === "github") {
    if (operation === "create_issue") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="owner">Repository Owner</Label>
            <Input
              id="owner"
              value={(inputs.owner as string) || ""}
              onChange={(e) => updateInput("owner", e.target.value)}
              placeholder="username or organization"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repo">Repository Name</Label>
            <Input
              id="repo"
              value={(inputs.repo as string) || ""}
              onChange={(e) => updateInput("repo", e.target.value)}
              placeholder="repository-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Issue Title</Label>
            <Input
              id="title"
              value={(inputs.title as string) || ""}
              onChange={(e) => updateInput("title", e.target.value)}
              placeholder="Issue title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="body">Issue Body (optional)</Label>
            <Textarea
              id="body"
              value={(inputs.body as string) || ""}
              onChange={(e) => updateInput("body", e.target.value)}
              placeholder="Describe the issue..."
              rows={4}
            />
          </div>
        </div>
      );
    }

    if (operation === "get_issues" || operation === "get_prs") {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="owner">Repository Owner</Label>
            <Input
              id="owner"
              value={(inputs.owner as string) || ""}
              onChange={(e) => updateInput("owner", e.target.value)}
              placeholder="username or organization"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repo">Repository Name</Label>
            <Input
              id="repo"
              value={(inputs.repo as string) || ""}
              onChange={(e) => updateInput("repo", e.target.value)}
              placeholder="repository-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State (optional)</Label>
            <Select
              value={(inputs.state as string) || "open"}
              onValueChange={(v) => updateInput("state", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }
  }

  // Generic fallback for list operations
  if (operation.startsWith("get_") && operation.endsWith("s")) {
    return (
      <div className="space-y-2">
        <Label htmlFor="limit">Limit (optional)</Label>
        <Input
          id="limit"
          type="number"
          value={(inputs.limit as number) || ""}
          onChange={(e) =>
            updateInput(
              "limit",
              e.target.value ? Number.parseInt(e.target.value, 10) : undefined,
            )
          }
          placeholder="50"
        />
      </div>
    );
  }

  return null;
};
