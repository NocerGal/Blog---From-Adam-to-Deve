export type pageAdminProps = {};

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import Loader from '@/components/ui/loader';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function pageAdmin() {
  const session = await getServerSession(authOptions);

  async function updateUserDatas(formData: FormData) {
    'use server';
    const session = await getServerSession(authOptions);
    const FormSchema = z.object({
      name: z.string().min(3).max(10),
      image: z.string().url(),
    });

    const name = String(formData.get('userName'));
    const image = String(formData.get('urlImage'));

    const safeData = FormSchema.safeParse({
      name,
      image,
    });

    if (!safeData.success) {
      const searchParams = new URLSearchParams();
      searchParams.set(
        'error',
        'Invalid data. Image must be an URL and name must be between 3 and 40 characters.'
      );

      redirect('/admin');
    }

    await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: safeData.data,
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
            <h3>Your posts</h3>
          </CardHeader>
        </Card>

        <Card className="flex-[2]">
          <CardHeader>
            <h3>Your informations</h3>
          </CardHeader>
          <CardContent>
            <form action={updateUserDatas}>
              <div className="mb-4">
                <div className="flex flex-col gap-2">
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
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col text-destructive">
                  <span>Username must be between 3 and 10 characters.</span>
                  <span>Image must be an URL.</span>
                </div>
                <button
                  type="submit"
                  className="bg-muted rounded-[0.5rem] py-1 px-2 hover:bg-muted-foreground hover:text-foreground transition-all"
                >
                  Save changes
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
