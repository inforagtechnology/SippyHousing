import { supabase } from '@/lib/supabase'

// Client type definition
export interface Client {
  id: string
  full_name: string
  phone_number: string
  email?: string
  interest_area: string
  message?: string
  created_at: string
}

export const clientService = {
  // Add new client
  async addClient(client: Omit<Client, 'id' | 'created_at'>): Promise<Client> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([client])
        .select()
        .single()

      if (error) {
        throw new Error(`Error adding client: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in addClient:', error)
      throw error
    }
  },

  // Get all clients
  async getAllClients(): Promise<Client[]> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Error fetching clients: ${error.message}`)
      }

      return data || []
    } catch (error) {
      console.error('Error in getAllClients:', error)
      throw error
    }
  },

  // Get client by ID
  async getClientById(id: string): Promise<Client | null> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        throw new Error(`Error fetching client: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in getClientById:', error)
      throw error
    }
  },

  // Update client
  async updateClient(id: string, updates: Partial<Omit<Client, 'id' | 'created_at'>>): Promise<Client> {
    try {
      const { data, error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new Error(`Error updating client: ${error.message}`)
      }

      return data
    } catch (error) {
      console.error('Error in updateClient:', error)
      throw error
    }
  },

  // Delete client
  async deleteClient(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(`Error deleting client: ${error.message}`)
      }
    } catch (error) {
      console.error('Error in deleteClient:', error)
      throw error
    }
  }
} 