"use client"
import { useEffect, useState } from 'react'

export interface Posts {
  id: string
  content: string
}

export default function Home() {
  const [data, setData] = useState<Posts[]>([])

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/data')
        if (!response.ok) {
          console.error('Failed to fetch data:', response.statusText)
          return
        }
        const fetchedData = await response.json()
        setData(fetchedData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    loadData()
  }, [])

  return (
    <div>
      <h1>Posts</h1>
      {data.length > 0 ? (
        <ul>
          {data.map((post) => (
            <li key={post.id}>
              <h2>{post.id}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  )
}