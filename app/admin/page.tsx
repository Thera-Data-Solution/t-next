import { CalendarEvent, Post, PostCategory, PostStatus, User } from "@/types/dummyTypes";
import IndexClient from "./client";

export default function Page() {
    const INITIAL_POSTS: Post[] = [
        { id: '1', title: 'Keutamaan Menuntut Ilmu', content: 'Rasulullah SAW bersabda...', category: PostCategory.HADITH, status: PostStatus.PUBLISHED, author: 'Ustadz Ahmad', date: '2023-11-20' },
        { id: '2', title: 'Adab Makan & Minum', content: 'Biasakanlah makan dengan tangan kanan...', category: PostCategory.FIQH, status: PostStatus.DRAFT, author: 'Ustadz Admin', date: '2023-11-21' },
    ];

    const INITIAL_USERS: User[] = [
        { id: 'u1', name: 'Ustadz Ahmad', email: 'ahmad@nurul.com', role: 'Ustadz', status: 'Active' },
        { id: 'u2', name: 'Admin Utama', email: 'admin@nurul.com', role: 'Super Admin', status: 'Active' },
    ];

    const INITIAL_EVENTS: CalendarEvent[] = [
        { id: 'e1', title: 'Kajian Rutin Malam Jumat', date: '2023-11-24', time: '18:30', location: 'Masjid Utama', speaker: 'Ustadz Ahmad' },
    ];

    return(
        <IndexClient posts={INITIAL_POSTS} users={INITIAL_USERS} events={INITIAL_EVENTS} />
    )
}