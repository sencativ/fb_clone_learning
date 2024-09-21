'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Home, Menu, MessageCircle, Search, User, Users } from 'lucide-react'

type Post = {
  id: number
  author: string
  content: string
  likes: number
  comments: number
  shares: number
  time: string
}

type Comment = {
  author: string
  avatar: string
  content: string
  time: string
}

const initialPosts: Post[] = [
  { id: 1, author: 'Rolfeey', content: 'Nigger. 🏖️', likes: 15, comments: 3, shares: 1, time: '2 hours ago' },
  { id: 2, author: 'Salma', content: 'Lagi kangen seseorang nih inisial Miu', likes: 32, comments: 7, shares: 4, time: '5 hours ago' },
  { id: 3, author: 'Rolfeey', content: 'Fufufafa kontol! 🎉', likes: 32, comments: 7, shares: 4, time: '6 hours ago' },
  { id: 4, author: 'Rolfeey', content: 'Huff main dota jago banget', likes: 11, comments: 6, shares: 1, time: '7 hours ago' },
]

export function Page() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState('')
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({})
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({})
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null)

  const currentUser = {
    name: 'Current User',
    avatar: 'https://github.com/shadcn.png'
  }

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim()) {
      const post: Post = {
        id: posts.length + 1,
        author: currentUser.name,
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        time: 'Just now'
      }
      setPosts([post, ...posts])
      setNewPost('')
    }
  }

  const handleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const handleAddComment = (postId: number, e: React.FormEvent) => {
    e.preventDefault()
    if (newComment[postId]?.trim()) {
      const comment: Comment = {
        author: currentUser.name,
        avatar: currentUser.avatar,
        content: newComment[postId],
        time: new Date().toLocaleTimeString()
      }
      setComments({
        ...comments,
        [postId]: [...(comments[postId] || []), comment]
      })
      setNewComment({ ...newComment, [postId]: '' })
    }
  }

  const toggleCommentBox = (postId: number) => {
    setActiveCommentPostId(activeCommentPostId === postId ? null : postId)
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4Z" fill="url(#paint0_radial)"/>
              <path d="M26.707 29.301H31.97L32.797 24.039H26.707V21.143C26.707 19.433 27.234 17.955 29.231 17.955H32.797V13.299C32.194 13.227 30.812 13.068 28.454 13.068C23.521 13.068 20.518 15.769 20.518 20.569V24.039H15.5V29.301H20.518V43.886C21.654 44.064 22.819 44.158 24.009 44.158C25.199 44.158 26.364 44.064 27.5 43.886V29.301H26.707Z" fill="white"/>
              <defs>
                <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24 24) scale(20)">
                  <stop stopColor="#1877F2"/>
                  <stop offset="1" stopColor="#04A4F4"/>
                </radialGradient>
              </defs>
            </svg>
            <Input className="ml-4 w-64" placeholder="Search Facebook" />
          </div>
          <nav className="flex space-x-4">
            <Button variant="ghost"><Home className="w-5 h-5" /></Button>
            <Button variant="ghost"><Users className="w-5 h-5" /></Button>
            <Button variant="ghost"><MessageCircle className="w-5 h-5" /></Button>
            <Button variant="ghost"><Bell className="w-5 h-5" /></Button>
            <Button variant="ghost"><Menu className="w-5 h-5" /></Button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex">
        {/* Sidebar */}
        <aside className="w-1/4 pr-8">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start"><User className="w-5 h-5 mr-2" /> Profile</Button>
            <Button variant="ghost" className="w-full justify-start"><Users className="w-5 h-5 mr-2" /> Friends</Button>
            <Button variant="ghost" className="w-full justify-start"><MessageCircle className="w-5 h-5 mr-2" /> Messages</Button>
          </nav>
        </aside>

        {/* Posts */}
        <div className="w-1/2 space-y-6">
          {/* Create post */}
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleCreatePost} className="flex items-center">
                <Avatar className="w-10 h-10 mr-4">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                </Avatar>
                <Input
                  className="flex-grow"
                  placeholder="Gimana nih hari ini?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <Button type="submit" className="ml-4">Post</Button>
              </form>
            </CardContent>
          </Card>

          {/* Posts */}
          {posts.map(post => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author}`} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{post.author}</h3>
                    <p className="text-sm text-gray-500">{post.time}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="flex justify-between text-gray-500 text-sm">
                  <Button variant="ghost" onClick={() => handleLike(post.id)}>
                    👍 {post.likes} Likes
                  </Button>
                  <Button variant="ghost" onClick={() => toggleCommentBox(post.id)}>
                    💬 {post.comments} Comments
                  </Button>
                  <Button variant="ghost">
                    ↗️ {post.shares} Shares
                  </Button>
                </div>
                {activeCommentPostId === post.id && (
                  <div className="mt-4">
                    {comments[post.id]?.map((comment, index) => (
                      <div key={index} className="flex items-start space-x-2 mt-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.avatar} />
                          <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="bg-white rounded-lg p-2 shadow-sm flex-grow">
                          <p className="text-sm text-gray-700"><span className="font-bold">{comment.author}</span> {comment.content}</p>
                          <p className="text-xs text-gray-500 text-right">{comment.time}</p>
                        </div>
                      </div>
                    ))}
                    <form onSubmit={(e) => handleAddComment(post.id, e)} className="flex items-center mt-4">
                      <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage src={currentUser.avatar} />
                        <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                      </Avatar>
                      <Input
                        className="flex-grow"
                        placeholder="Add a comment..."
                        value={newComment[post.id] || ''}
                        onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                      />
                      <Button type="submit" className="ml-4">Comment</Button>
                    </form>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Right sidebar */}
        <aside className="w-1/4 pl-8">
          <Card>
            <CardHeader>
              <h3 className="font-bold">Sponsored</h3>
            </CardHeader>
            <CardContent>
              <p>Ad content goes here</p>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  )
}