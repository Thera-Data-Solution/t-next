"use client";

import PostList from "@/components/postList";
import { StatCard } from "@/components/statCard";
import { Post, PostStatus, User } from "@/types/dummyTypes";

export default function IndexClient({ posts, users, events }: {posts: Post[]; users: User[]; events: {id: string; title: string; date: string; time: string; location: string; speaker: string}[]}) {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Posts" value={posts.length} color="border-emerald-500" />
                <StatCard label="Active Users" value={users.length} color="border-blue-500" />
                <StatCard label="Upcoming Events" value={events.length} color="border-amber-500" />
                <StatCard label="Drafts" value={posts.filter(p => p.status === PostStatus.DRAFT).length} color="border-slate-400" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-800 font-islamic">Recent Articles</h3>
                        <button onClick={() => {}} className="text-emerald-700 text-sm font-bold hover:underline">View All</button>
                    </div>
                    <PostList posts={posts.slice(0, 3)} onEdit={() => {}} onDelete={() => { }} />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 font-islamic">Upcoming Calendar</h3>
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                        {events.map(ev => (
                            <div key={ev.id} className="flex gap-4 items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0 mb-4 last:mb-0">
                                <div className="bg-emerald-50 text-emerald-700 p-2 rounded-xl text-center min-w-[50px]">
                                    <span className="block text-[10px] uppercase font-bold">Nov</span>
                                    <span className="text-lg font-bold leading-none">24</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{ev.title}</p>
                                    <p className="text-[11px] text-slate-500">{ev.time} • {ev.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}