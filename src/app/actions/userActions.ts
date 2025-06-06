'use server';

import { memberEditSchema, MemberEditSchema } from '@/lib/schemas/memberEditSchema';
import { Member, Photo } from '@prisma/client';
import { getAuthUserId } from '@/app/actions/authActions';
import { prisma } from '@/lib/prisma';
import { cloudinary } from '@/lib/cloudinary';
import { ActionResult } from '@/lib/types';

export async function updateMemberProfile(
    data: MemberEditSchema,
    nameUpdated?: boolean,
): Promise<ActionResult<Member>> {
    try {
        const userId = await getAuthUserId();

        const validated = memberEditSchema.safeParse(data);

        if (!validated.success) return { status: 'error', error: validated.error.message };

        const { name, description, city, country } = validated.data;

        if (nameUpdated) {
            await prisma.user.update({
                where: { id: userId },
                data: { name },
            });
        }

        const member = await prisma.member.update({
            where: { userId },
            data: {
                name,
                description,
                city,
                country,
            },
        });

        return { status: 'success', data: member };
    } catch (error) {
        console.log(error);

        return { status: 'error', error: 'Something went wrong' };
    }
}

export async function addImage(url: string, publicId: string) {
    try {
        const userId = await getAuthUserId();

        return prisma.member.update({
            where: { userId },
            data: {
                photos: {
                    create: [
                        {
                            url,
                            publicId,
                        },
                    ],
                },
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function setMainImage(photo: Photo) {
    if (!photo.isApproved) throw new Error('Only approved photos can be set to main image');

    try {
        const userId = await getAuthUserId();

        await prisma.user.update({
            where: { id: userId },
            data: { image: photo.url },
        });

        return prisma.member.update({
            where: { userId },
            data: { image: photo.url },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteImage(photo: Photo) {
    try {
        const userId = await getAuthUserId();

        if (photo.publicId) {
            await cloudinary.uploader.destroy(photo.publicId);
        }

        return prisma.member.update({
            where: { userId },
            data: {
                photos: {
                    delete: { id: photo.id },
                },
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserInfoForNav() {
    try {
        const userId = await getAuthUserId();
        if (!userId) {
            console.warn('[getUserInfoForNav] No user ID found from session');
            return null;
        }

        return await prisma.user.findUnique({
            where: { id: userId },
            select: { name: true, image: true },
        });
    } catch (error) {
        console.error('[getUserInfoForNav] Prisma error:', error);
        return null;
    }
}
