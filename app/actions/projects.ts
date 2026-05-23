'use server'; 
  
import { revalidatePath } from 'next/cache'; 
import { prisma } from '../../lib/prisma'; 
  
export async function addProject(formData: FormData) { 
  const name = formData.get('name') as string; 
  const color = formData.get('color') as string || '#3498db'; 
  await prisma.project.create({ data: { name, color } }); 
  revalidatePath('/dashboard'); 
}

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.project.delete({ where: { id: Number(id) } });
  revalidatePath('/dashboard');
}

export async function renameProject(id: number, name: string) {
  await prisma.project.update({ where: { id }, data: { name } });
  revalidatePath('/dashboard');
  revalidatePath(`/projects/${id}`);
}