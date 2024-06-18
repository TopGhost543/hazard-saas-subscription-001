// const { ClientSecretCredential } = require('@azure/identity');
// const { SecretClient } = require('@azure/keyvault-secrets');

// const tenantId = "338c8bc4-9a97-43f1-b127-3a174fdd40f6";
// const clientId = process.env['AZURE_CLIENT_ID'];
// const clientSecret = process.env['AZURE_CLIENT_SECRET'];

// const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

// const vaultName = 'mneu-kv-dev-aicore-001';  
// const url = `https://${vaultName}.vault.azure.net`;  
// const client = new SecretClient(url, credential);  

// const secret = client.getSecret("Test");
// console.log(secret.value);