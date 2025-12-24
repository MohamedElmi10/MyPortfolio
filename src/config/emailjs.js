// EmailJS Configuration
// Get these values from https://www.emailjs.com/
// 
// IMPORTANT: EmailJS will send emails TO your Gmail account (mohamed.elmiefc@gmail.com)
// You need to connect your Gmail account to EmailJS so it can send emails on your behalf
//
// Steps to set up:
// 1. Create a free account at https://www.emailjs.com/
// 2. Go to "Email Services" and click "Add New Service"
// 3. Choose "Gmail" and connect your Gmail account (mohamed.elmiefc@gmail.com)
//    - This will allow EmailJS to send emails using your Gmail account
// 4. Copy the Service ID (e.g., "service_xxxxx")
// 5. Go to "Email Templates" and create a new template with:
//    - Subject: "New Contact Form Message from {{from_name}}"
//    - Content (use these EXACT variable names):
//      
//      Name: {{from_name}}
//      Email: {{from_email}}
//      Message: {{message}}
//      
//      OR alternatively:
//      Name: {{user_name}}
//      Email: {{user_email}}
//      Message: {{message}}
//      
//    - To Email: mohamed.elmiefc@gmail.com (your email)
//    - Make sure the variable names in your template match: {{from_name}}, {{from_email}}, {{message}}
// 6. Copy the Template ID (e.g., "template_xxxxx")
// 7. Go to Account > API Keys and copy your Public Key
// 8. Replace the values below with your actual credentials

export const EMAILJS_CONFIG = {
  SERVICE_ID: "service_a9clfah", // Replace with your EmailJS Service ID (from step 4)
  TEMPLATE_ID: "template_nlppbql", // Replace with your EmailJS Template ID (from step 6)
  PUBLIC_KEY: "74HxurzuFzxCXJvux", // Replace with your EmailJS Public Key (from step 7)
  // Your emails will be sent to: mohamed.elmiefc@gmail.com
};

