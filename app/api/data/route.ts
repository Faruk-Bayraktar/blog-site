import { NextResponse } from 'next/server'
import { fetchData } from '@/lib/fetchData'

export async function GET() {
  try {
    const data = await fetchData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}