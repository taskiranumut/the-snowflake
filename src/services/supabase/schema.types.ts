export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          container_id: number | null
          container_price: number | null
          created_at: string
          end_date: string | null
          extras_price: number | null
          guest_id: number | null
          guests_num: number | null
          has_breakfast: boolean | null
          id: number
          is_paid: boolean | null
          nigths_num: number | null
          observations: string | null
          start_date: string | null
          status: string | null
          total_price: number | null
        }
        Insert: {
          container_id?: number | null
          container_price?: number | null
          created_at?: string
          end_date?: string | null
          extras_price?: number | null
          guest_id?: number | null
          guests_num?: number | null
          has_breakfast?: boolean | null
          id?: number
          is_paid?: boolean | null
          nigths_num?: number | null
          observations?: string | null
          start_date?: string | null
          status?: string | null
          total_price?: number | null
        }
        Update: {
          container_id?: number | null
          container_price?: number | null
          created_at?: string
          end_date?: string | null
          extras_price?: number | null
          guest_id?: number | null
          guests_num?: number | null
          has_breakfast?: boolean | null
          id?: number
          is_paid?: boolean | null
          nigths_num?: number | null
          observations?: string | null
          start_date?: string | null
          status?: string | null
          total_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_container_id_fkey"
            columns: ["container_id"]
            isOneToOne: false
            referencedRelation: "containers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          }
        ]
      }
      containers: {
        Row: {
          created_at: string
          description: string | null
          discount: number | null
          id: number
          image: string | null
          max_capacity: number | null
          name: string | null
          regular_price: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount?: number | null
          id?: number
          image?: string | null
          max_capacity?: number | null
          name?: string | null
          regular_price?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          discount?: number | null
          id?: number
          image?: string | null
          max_capacity?: number | null
          name?: string | null
          regular_price?: number | null
        }
        Relationships: []
      }
      guests: {
        Row: {
          country_flag: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: number
          national_id: string | null
          nationality: string | null
        }
        Insert: {
          country_flag?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: number
          national_id?: string | null
          nationality?: string | null
        }
        Update: {
          country_flag?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: number
          national_id?: string | null
          nationality?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          breakfast_price: number | null
          created_at: string
          id: number
          max_booking_length: number | null
          max_guest_num: number | null
          min_booking_length: number | null
        }
        Insert: {
          breakfast_price?: number | null
          created_at?: string
          id?: number
          max_booking_length?: number | null
          max_guest_num?: number | null
          min_booking_length?: number | null
        }
        Update: {
          breakfast_price?: number | null
          created_at?: string
          id?: number
          max_booking_length?: number | null
          max_guest_num?: number | null
          min_booking_length?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
