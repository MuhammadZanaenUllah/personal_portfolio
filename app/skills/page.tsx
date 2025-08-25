import { getSkills, getCertifications } from '@/lib/supabase';
import SkillsClient from './SkillsClient';

// SSG: Generate static page at build time
export const revalidate = false // Static generation

// Server-side data fetching for SSG
async function getSkillsPageData() {
  try {
    const [skillsData, certificationsData] = await Promise.all([
      getSkills(),
      getCertifications()
    ]);
    
    return {
      skills: skillsData,
      certifications: certificationsData
    };
  } catch (err) {
    console.error('Error fetching data:', err);
    return {
      skills: [],
      certifications: []
    };
  }
}

export default async function Skills() {
  const { skills, certifications } = await getSkillsPageData();

  // Mock stats for now (can be moved to Supabase later)
  const stats = {
    yearsOfExperience: 5,
    projectsCompleted: 50,
    technologiesMastered: 25,
    clientsSatisfied: 20
  };
  return (
    <SkillsClient 
      skills={skills}
      certifications={certifications}
      stats={stats}
    />
  );
}