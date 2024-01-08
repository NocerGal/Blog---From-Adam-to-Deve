export type pageAdminProps = {};

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function pageAdmin() {
  const session = await getServerSession(authOptions);

  const FormSchema = z.object({
    userName: z.string().min(3).max(40),
    urlImage: z.string().url(),
  });

  async function updateUserDatas(formData: FormData) {
    'use server';

    const rawData = {
      name: String(formData.get('userName')),
      image: String(formData.get('urlImage')),
    };

    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: rawData,
    });

    revalidatePath('/admin');
    redirect('/admin');
  }

  return (
    <div>
      <h1 className="mb-4">Settings page</h1>
      <div className="flex gap-4">
        <Card className="flex-1">
          <CardHeader>
            <h3>Your Informations</h3>
          </CardHeader>
        </Card>

        <Card className="flex-[2]">
          <CardHeader>
            <h3>Your posts</h3>
          </CardHeader>
          <CardContent>
            <form action={updateUserDatas}>
              <div className="mb-4">
                <div>
                  <Label htmlFor="userName">Username</Label>
                  <Input
                    defaultValue={session?.user?.name ?? 'Your username'}
                    name="userName"
                    id="userName"
                  />
                </div>
                <div>
                  <Label htmlFor="urlImage">Image</Label>
                  <Input
                    defaultValue={session?.user?.image ?? 'no URL'}
                    name="urlImage"
                    id="urlImage"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-muted rounded-[0.5rem] py-1 px-2 hover:bg-muted-foreground hover:text-foreground"
              >
                Save changes
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
