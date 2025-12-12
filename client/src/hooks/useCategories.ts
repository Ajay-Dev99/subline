import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { categoryAPI } from "@/services/api"
import { useToast } from "@/hooks/use-toast"

interface Category {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
}

interface APIResponse<T> {
  success: boolean
  message?: string
  data?: T
}

// Query Keys
export const categoryKeys = {
  all: ["categories"] as const,
  detail: (id: string) => ["categories", id] as const,
}

// Get all categories
export const useCategories = () => {
  return useQuery<APIResponse<Category[]>>({
    queryKey: categoryKeys.all,
    queryFn: categoryAPI.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get single category
export const useCategory = (id: string) => {
  return useQuery<APIResponse<Category>>({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoryAPI.getById(id),
    enabled: !!id,
  })
}

// Create category
export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (data: { name: string }) => categoryAPI.create(data),
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: categoryKeys.all })
        toast({
          title: "Success",
          description: "Category created successfully",
        })
      } else {
        toast({
          title: "Error",
          description: response?.message || "Failed to create category",
          variant: "destructive",
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to create category",
        variant: "destructive",
      })
    },
  })
}

// Update category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      categoryAPI.update(id, data),
    onSuccess: (response, variables) => {
      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: categoryKeys.all })
        queryClient.invalidateQueries({
          queryKey: categoryKeys.detail(variables?.id),
        })
        toast({
          title: "Success",
          description: "Category updated successfully",
        })
      } else {
        toast({
          title: "Error",
          description: response?.message || "Failed to update category",
          variant: "destructive",
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update category",
        variant: "destructive",
      })
    },
  })
}

// Delete category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (id: string) => categoryAPI.delete(id),
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: categoryKeys.all })
        toast({
          title: "Success",
          description: "Category deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: response?.message || "Failed to delete category",
          variant: "destructive",
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete category",
        variant: "destructive",
      })
    },
  })
}
