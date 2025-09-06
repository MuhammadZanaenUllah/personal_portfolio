import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    const bucket = searchParams.get('bucket') || 'images'

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 })
    }

    // Extract file path from URL
    const urlParts = url.split('/')
    const fileName = urlParts[urlParts.length - 1]
    
    console.log(`Deleting file: ${fileName} from bucket: ${bucket}`)
    
    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([fileName])

    if (error) {
      console.error('Error deleting image:', error)
      return NextResponse.json(
        { error: `Delete failed: ${error.message}` },
        { status: 500 }
      )
    }

    console.log('Delete successful')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}