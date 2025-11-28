-- AddForeignKey
ALTER TABLE "JadwalKajian" ADD CONSTRAINT "JadwalKajian_ustadzhId_fkey" FOREIGN KEY ("ustadzhId") REFERENCES "Ustadzh"("id") ON DELETE CASCADE ON UPDATE CASCADE;
