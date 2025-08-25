import { getProjects } from '@/lib/supabase';
import ProjectsClient from './ProjectsClient';

// ISR: Revalidate every 3600 seconds (1 hour) for dynamic project updates
export const revalidate = 3600;

async function getProjectsPageData() {
  try {
    const projects = await getProjects();
    return { projects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { projects: [] };
  }
}

export default async function Projects() {
  const { projects } = await getProjectsPageData();

  return (
    <ProjectsClient projects={projects} />
  );
}