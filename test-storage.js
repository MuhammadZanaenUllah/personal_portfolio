const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  console.log('URL:', supabaseUrl ? 'Present' : 'Missing')
  console.log('Service Key:', supabaseServiceKey ? 'Present' : 'Missing')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function testStorage() {
  try {
    console.log('Testing Supabase storage connection...')
    
    // List buckets
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('Error listing buckets:', listError)
      return
    }
    
    console.log('Available buckets:', buckets?.map(b => b.name) || [])
    
    // Check if images bucket exists
    const imagesBucket = buckets?.find(b => b.name === 'images')
    
    if (!imagesBucket) {
      console.log('Images bucket not found, attempting to create...')
      
      const { error: createError } = await supabase.storage.createBucket('images', {
        public: true,
        allowedMimeTypes: ['image/*'],
        fileSizeLimit: 5242880 // 5MB
      })
      
      if (createError) {
        console.error('Error creating bucket:', createError)
      } else {
        console.log('Images bucket created successfully!')
      }
    } else {
      console.log('Images bucket exists:', imagesBucket)
    }
    
  } catch (error) {
    console.error('Storage test failed:', error)
  }
}

testStorage()