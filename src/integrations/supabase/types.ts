export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          additional_notes: string | null
          age: number | null
          application_id: string
          consent_confirmed: boolean
          created_at: string
          cv_path: string | null
          desired_country: string
          education: string | null
          email: string | null
          emergency_contact: string | null
          experience: string | null
          full_name: string
          id: string
          job_category: string
          marital_status: string | null
          passport_status: string | null
          phone: string
          photo_path: string | null
          representative_email: string | null
          representative_name: string | null
          representative_phone: string | null
          representative_relationship: string | null
          status: string | null
          status_note: string | null
          submission_type: string
          updated_at: string
        }
        Insert: {
          additional_notes?: string | null
          age?: number | null
          application_id: string
          consent_confirmed?: boolean
          created_at?: string
          cv_path?: string | null
          desired_country: string
          education?: string | null
          email?: string | null
          emergency_contact?: string | null
          experience?: string | null
          full_name: string
          id?: string
          job_category: string
          marital_status?: string | null
          passport_status?: string | null
          phone: string
          photo_path?: string | null
          representative_email?: string | null
          representative_name?: string | null
          representative_phone?: string | null
          representative_relationship?: string | null
          status?: string | null
          status_note?: string | null
          submission_type?: string
          updated_at?: string
        }
        Update: {
          additional_notes?: string | null
          age?: number | null
          application_id?: string
          consent_confirmed?: boolean
          created_at?: string
          cv_path?: string | null
          desired_country?: string
          education?: string | null
          email?: string | null
          emergency_contact?: string | null
          experience?: string | null
          full_name?: string
          id?: string
          job_category?: string
          marital_status?: string | null
          passport_status?: string | null
          phone?: string
          photo_path?: string | null
          representative_email?: string | null
          representative_name?: string | null
          representative_phone?: string | null
          representative_relationship?: string | null
          status?: string | null
          status_note?: string | null
          submission_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      employer_requests: {
        Row: {
          additional_info: string | null
          company_name: string
          contact_person: string
          country: string
          created_at: string
          email: string
          id: string
          job_category: string | null
          phone: string | null
          start_date: string | null
          status: string | null
          updated_at: string
          workers_needed: number | null
        }
        Insert: {
          additional_info?: string | null
          company_name: string
          contact_person: string
          country: string
          created_at?: string
          email: string
          id?: string
          job_category?: string | null
          phone?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string
          workers_needed?: number | null
        }
        Update: {
          additional_info?: string | null
          company_name?: string
          contact_person?: string
          country?: string
          created_at?: string
          email?: string
          id?: string
          job_category?: string | null
          phone?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string
          workers_needed?: number | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          accommodation: string | null
          benefits: string | null
          category: string
          contract_length: string | null
          country: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          requirements: string | null
          salary_max: number | null
          salary_min: number | null
          title: string
          updated_at: string
        }
        Insert: {
          accommodation?: string | null
          benefits?: string | null
          category: string
          contract_length?: string | null
          country: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          accommodation?: string | null
          benefits?: string | null
          category?: string
          contract_length?: string | null
          country?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
