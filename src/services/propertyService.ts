import { supabase, Property } from '@/lib/supabase'
import { wildSearchProperties } from '@/lib/wildSearch'

// Property Image type definition
export interface PropertyImage {
  id: string
  property_id: string
  image_url: string
  created_at: string
}

export const propertyService = {
  // Fetch all properties from the properties table
  async getAllProperties(): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Error fetching properties: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getAllProperties:', error)
      throw error
    }
  },

  // Fetch properties by property_type (New, Rental, Resale)
  async getPropertiesByType(propertyType: string): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('property_type', propertyType)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Error fetching properties by type: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getPropertiesByType:', error)
      throw error
    }
  },

  // Fetch properties by usage_type (Residential, Commercial)
  async getPropertiesByUsageType(usageType: string): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('usage_type', usageType)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Error fetching properties by usage type: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getPropertiesByUsageType:', error)
      throw error
    }
  },

  // Get property by ID
  async getPropertyById(id: string): Promise<Property | null> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw new Error(`Error fetching property: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in getPropertyById:', error)
      throw error
    }
  },

  // Add new property
  async addProperty(property: Omit<Property, 'id' | 'created_at'>): Promise<Property> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([property])
        .select()
        .single()

      if (error) {
        throw new Error(`Error adding property: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in addProperty:', error)
      throw error
    }
  },

  // Update property
  async updateProperty(id: string, updates: Partial<Omit<Property, 'id' | 'created_at'>>): Promise<Property> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(`Error updating property: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in updateProperty:', error)
      throw error
    }
  },

  // Delete property
  async deleteProperty(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(`Error deleting property: ${error.message}`)
      }
    } catch (error) {
      console.error('Error in deleteProperty:', error)
      throw error
    }
  },

  // Bulk insert properties (for CSV upload)
  async bulkInsertProperties(properties: Omit<Property, 'id' | 'created_at'>[]): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert(properties)
        .select()

      if (error) {
        throw new Error(`Error bulk inserting properties: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in bulkInsertProperties:', error)
      throw error
    }
  },

  // Upload image to Supabase Storage
  async uploadImage(file: File, propertyId: string): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${propertyId}/${Date.now()}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('listings')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        throw new Error(`Error uploading image: ${error.message}`)
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('listings')
        .getPublicUrl(fileName)

      return urlData.publicUrl
    } catch (error) {
      console.error('Error in uploadImage:', error)
      throw error
    }
  },

  // Save image record to database
  async saveImageRecord(propertyId: string, imageUrl: string): Promise<PropertyImage> {
    try {
      const { data, error } = await supabase
        .from('property_images')
        .insert([{
          property_id: propertyId,
          image_url: imageUrl
        }])
        .select()
        .single()

      if (error) {
        throw new Error(`Error saving image record: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in saveImageRecord:', error)
      throw error
    }
  },

  // Upload multiple images for a property
  async uploadMultipleImages(files: File[], propertyId: string): Promise<PropertyImage[]> {
    try {
      const uploadPromises = files.map(async (file) => {
        const imageUrl = await this.uploadImage(file, propertyId)
        return await this.saveImageRecord(propertyId, imageUrl)
      })

      return await Promise.all(uploadPromises)
    } catch (error) {
      console.error('Error in uploadMultipleImages:', error)
      throw error
    }
  },

  // Get images for a property
  async getPropertyImages(propertyId: string): Promise<PropertyImage[]> {
    try {
      const { data, error } = await supabase
        .from('property_images')
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Error fetching property images: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getPropertyImages:', error)
      throw error
    }
  },

  // Wild search: matches across EVERY field (see src/lib/wildSearch.ts for syntax:
  // multiple words, wildcards * and ?, "exact phrases", -exclusions, typo tolerance).
  async searchProperties(query: string): Promise<Property[]> {
    try {
      const q = (query || '').trim()
      if (!q) return []

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Error searching properties: ${error.message}`)
      }

      return wildSearchProperties((data || []) as Property[], q)
    } catch (error) {
      console.error('Error in searchProperties:', error)
      throw error
    }
  },

  // Get properties by category (primary_category or category_assignments)
  async getPropertiesByCategory(categorySlug: string): Promise<Property[]> {
    try {
      // Query for properties where primary_category matches OR category_assignments array contains the slug
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .or(`primary_category.eq.${categorySlug},category_assignments.cs.{${categorySlug}}`)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Error fetching properties by category: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getPropertiesByCategory:', error)
      throw error
    }
  },

  // Get properties by multiple categories (properties that belong to any of the specified categories)
  async getPropertiesByCategories(categorySlugs: string[]): Promise<Property[]> {
    try {
      if (categorySlugs.length === 0) {
        return []
      }

      // For multiple categories, we'll fetch all and filter in JavaScript for better reliability
      // This ensures we catch properties in primary_category OR category_assignments
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Error fetching properties: ${error.message}`)
      }

      // Filter properties that match any of the specified categories
      const filtered = (data || []).filter(property => {
        const primaryMatch = property.primary_category && categorySlugs.includes(property.primary_category)
        const assignmentsMatch = property.category_assignments && 
          property.category_assignments.some((slug: string) => categorySlugs.includes(slug))
        return primaryMatch || assignmentsMatch
      })

      return filtered
    } catch (error) {
      console.error('Error in getPropertiesByCategories:', error)
      throw error
    }
  },

  // Get properties that belong to ALL specified categories (intersection)
  async getPropertiesByAllCategories(categorySlugs: string[]): Promise<Property[]> {
    try {
      if (categorySlugs.length === 0) {
        return []
      }

      // For intersection, we need to check that category_assignments contains all specified slugs
      // This is more complex and may require filtering in JavaScript for better accuracy
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Error fetching properties: ${error.message}`)
      }

      // Filter properties that have all specified categories in their assignments
      const filtered = (data || []).filter(property => {
        const assignments = property.category_assignments || []
        return categorySlugs.every(slug => 
          assignments.includes(slug) || property.primary_category === slug
        )
      })

      return filtered
    } catch (error) {
      console.error('Error in getPropertiesByAllCategories:', error)
      throw error
    }
  },

  // Delete image
  async deleteImage(imageId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('property_images')
        .delete()
        .eq('id', imageId)

      if (error) {
        throw new Error(`Error deleting image: ${error.message}`)
      }
    } catch (error) {
      console.error('Error in deleteImage:', error)
      throw error
    }
  }
} 
