import prisma from '@/lib/prisma';

import { FormEvent } from 'react';

export async function createPost(e: FormEvent) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const postTitle = form.querySelector('#postTitle') as HTMLInputElement;
  const postDescription = form.querySelector(
    '#postDescription'
  ) as HTMLInputElement;
  const textarea = form.querySelector('textarea') as HTMLTextAreaElement;

  if (!textarea || !postTitle || !postDescription) {
    alert('Error: textarea or/and title input not found');
    return;
  }

  const titleValue = postTitle.value;
  const descriptionValue = postDescription.value;
  const textValue = textarea.value;

  await prisma.post.create({
    data: {
      title: titleValue,
      postDescription: descriptionValue,
      content: textValue,
      createdAt: new Date(),
      published: false,
    },
  });
}
