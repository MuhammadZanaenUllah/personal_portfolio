import { getPersonalInfo } from "@/lib/supabase";
import ContactClient from "./ContactClient";

// Server-side data fetching for SSR
async function getContactPageData() {
  try {
    const personalInfo = await getPersonalInfo();
    
    // Static social links since they're not in the database
    const socialLinks = [
      { name: "GitHub", url: "https://github.com" },
      { name: "LinkedIn", url: "https://linkedin.com" },
      { name: "Twitter", url: "https://twitter.com" },
      { name: "Instagram", url: "https://instagram.com" },
      { name: "YouTube", url: "https://youtube.com" },
      { name: "Dev.to", url: "https://dev.to" },
    ];

    return { personalInfo, socialLinks };
  } catch (error) {
    console.error("Error fetching contact data:", error);
    throw new Error("Failed to load contact information");
  }
}

export default async function Contact() {
  const { personalInfo, socialLinks } = await getContactPageData();

  return (
    <ContactClient 
      personalInfo={personalInfo} 
      socialLinks={socialLinks} 
    />
  );
}
