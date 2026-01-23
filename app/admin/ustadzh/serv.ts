"use server";

import { prisma } from "@/lib/prisma";

export async function GetAllUstadzh() {
  try {
    const ustadz = await prisma.ustadzh.findMany();
    return ustadz;
  } catch (error) {
    console.error("Error fetching ustadz data:", error);
    throw error;
  }
}


export async function deletUstadzhById(id: string) {
  try {
    await prisma.ustadzh.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error(`Error deleting ustadz with id ${id}:`, error);
    return false;
  }
}

export async function updateUstadzhById(id: string, data: { nama: string; bio: string }) {
  try {
    const updatedUstadzh = await prisma.ustadzh.update({
      where: { id },
      data,
    });
    return updatedUstadzh;
  } catch (error) {
    console.error(`Error updating ustadz with id ${id}:`, error);
    throw error;
  }
}

export async function createUstadzh(data: { nama: string; bio: string }) {
  try {
    const newUstadzh = await prisma.ustadzh.create({
      data,
    });
    return newUstadzh;
  } catch (error) {
    console.error("Error creating new ustadz:", error);
    throw error;
  }
}