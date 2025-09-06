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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const bucket = formData.get('bucket') as string || 'images'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Check if bucket exists, if not create it
    const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets()
    
    if (listError) {
      console.error('Error listing buckets:', listError)
    }
    
    const bucketExists = buckets?.some(b => b.name === bucket)
    
    if (!bucketExists) {
      console.log(`Creating storage bucket: ${bucket}`)
      const { error: createError } = await supabaseAdmin.storage.createBucket(bucket, {
        public: true,
        allowedMimeTypes: ['image/*'],
        fileSizeLimit: 5242880 // 5MB
      })
      
      if (createError) {
        console.error('Error creating bucket:', createError)
        return NextResponse.json(
          { error: `Failed to create storage bucket: ${createError.message}` },
          { status: 500 }
        )
      }
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${fileName}`

    console.log(`Uploading file: ${fileName} to bucket: ${bucket}`)
    
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, file)

    if (error) {
      console.error('Error uploading image:', error)
      return NextResponse.json(
        { error: `Upload failed: ${error.message}` },
        { status: 500 }
      )
    }

    console.log('Upload successful:', data)

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath)

    console.log('Public URL generated:', publicUrl)
    
    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}