"use client";


import { Post, PostCategory } from '@/types/dummyTypes';
import React from 'react';

interface PostListProps {
    posts: Post[];
    onEdit: (post: Post) => void;
    onDelete: (id: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onEdit }) => {
    if (posts.length === 0) {
        return (
            <div className="bg-white rounded-3xl border border-slate-200 p-20 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                </div>
                <p className="font-bold text-slate-400">No content available</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <div className="p-5">
                        <div className="flex justify-between items-center mb-3">
                            <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-1 rounded ${getCategoryStyles(post.category)}`}>
                                {post.category}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold">{post.date}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-800 mb-2 leading-tight line-clamp-1">{post.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">{post.content}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-emerald-800 flex items-center justify-center text-[10px] text-white font-bold">{post.author[0]}</div>
                                <span className="text-xs text-slate-600 font-medium">{post.author}</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => onEdit(post)} className="text-emerald-700 hover:bg-emerald-50 p-2 rounded-lg transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const getCategoryStyles = (category: PostCategory) => {
    switch (category) {
        case PostCategory.HADITH: return 'bg-emerald-100 text-emerald-800';
        case PostCategory.FIQH: return 'bg-amber-100 text-amber-800';
        case PostCategory.ARTICLE: return 'bg-blue-100 text-blue-800';
        default: return 'bg-slate-100 text-slate-800';
    }
};

export default PostList;
