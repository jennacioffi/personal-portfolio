import type { Project } from '@types';
import projectData from '../../data/projects.json';
import { parseJson } from './parseJson.ts';

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
}

export async function fetchProjects(): Promise<Project[]> {
  return projectData.map((project) => ({
    ...project,
    skills: parseJson(
      project.skills,
      `projects[${project.id}].skills`,
      isStringArray
    ),
  }));
}
