  
  contentful login

contentful login --management-token <management-token>

---
  #contentful space export --config contentful-config.json
  
  To export your Contentful space content schema (content models), you can use the Contentful CLI's space export command with options to include or skip certain parts.

The basic command to export the whole space (including content types, entries, assets, locales, webhooks, roles, editor interfaces) is:

text
contentful space export --space-id YOUR_SPACE_ID --management-token YOUR_MANAGEMENT_API_TOKEN
If you want to specifically export only the content schema (content models) without entries and assets, you can use the option:

text
--skip-content
This skips exporting entries and assets, exporting only content types and other schema related information.

Your command could look like this:

text
contentful space export --space-id YOUR_SPACE_ID --management-token YOUR_MANAGEMENT_API_TOKEN --skip-content
Alternatively, you can use a JSON config file to store these options and run:

text
contentful space export --config your-config.json
where your-config.json contains:

json
{
  "spaceId": "YOUR_SPACE_ID",
  "managementToken": "YOUR_MANAGEMENT_API_TOKEN",
  "skipContent": true
}
Make sure your config file is valid JSON and all keys and values are correct.