import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { galleryAPI, uploadAPI } from "@/services/api"
import { useToast } from "@/hooks/use-toast"

interface Category {
  _id: string
  name: string
}

interface GalleryItem {
  _id: string
  title: string
  category: Category
  image: string
  description?: string
  medium?: string
  size?: string
  createdAt: string
}

interface APIResponse<T> {
  success: boolean
  message?: string
  data?: T
  count?: number
}

interface CreateGalleryData {
  title: string
  category: string
  image: string
  description?: string
  medium?: string
  size?: string
}

// Query Keys
export const galleryKeys = {
  all: ["gallery"] as const,
  lists: () => [...galleryKeys.all, "list"] as const,
  list: (categoryId?: string) =>
    [...galleryKeys.lists(), { categoryId }] as const,
  details: () => [...galleryKeys.all, "detail"] as const,
  detail: (id: string) => [...galleryKeys.details(), id] as const,
}

// Get all gallery items
export const useGallery = (categoryId?: string) => {
  return useQuery<APIResponse<GalleryItem[]>>({
    queryKey: galleryKeys.list(categoryId),
    queryFn: () => galleryAPI.getAll(categoryId),
    staleTime: 3 * 60 * 1000, // 3 minutes
  })
}

// Get single gallery item
export const useGalleryItem = (id: string) => {
  return useQuery<APIResponse<GalleryItem>>({
    queryKey: galleryKeys.detail(id),
    queryFn: () => galleryAPI.getById(id),
    enabled: !!id,
  })
}

// Create gallery item (with image upload)
export const useCreateGallery = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({
      data,
      file,
    }: {
      data: Omit<CreateGalleryData, "image">
      file: File
    }) => {
      // Upload image first
      const uploadResponse = await uploadAPI.uploadSingle(file)
      if (!uploadResponse?.success) {
        throw new Error(uploadResponse?.message || "Failed to upload image")
      }

      // Create gallery item with uploaded image URL
      return galleryAPI.create({
        ...data,
        image: uploadResponse?.data?.url,
      })
    },
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: galleryKeys.lists() })
        toast({
          title: "Success",
          description: "Gallery item created successfully",
        })
      } else {
        toast({
          title: "Error",
          description: response?.message || "Failed to create gallery item",
          variant: "destructive",
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to create gallery item",
        variant: "destructive",
      })
    },
  })
}

// Update gallery item
export const useUpdateGallery = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({
      id,
      data,
      file,
    }: {
      id: string
      data: CreateGalleryData
      file?: File
    }) => {
      let imageUrl = data.image

      // Upload new image if provided
      if (file) {
        const uploadResponse = await uploadAPI.uploadSingle(file)
        if (!uploadResponse?.success) {
          throw new Error(uploadResponse?.message || "Failed to upload image")
        }
        imageUrl = uploadResponse?.data?.url
      }

      return galleryAPI.update(id, {
        ...data,
        image: imageUrl,
      })
    },
    onSuccess: (response, variables) => {
      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: galleryKeys.lists() })
        queryClient.invalidateQueries({
          queryKey: galleryKeys.detail(variables?.id),
        })
        toast({
          title: "Success",
          description: "Gallery item updated successfully",
        })
      } else {
        toast({
          title: "Error",
          description: response?.message || "Failed to update gallery item",
          variant: "destructive",
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update gallery item",
        variant: "destructive",
      })
    },
  })
}

// Delete gallery item
export const useDeleteGallery = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (id: string) => galleryAPI.delete(id),
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: galleryKeys.lists() })
        toast({
          title: "Success",
          description: "Gallery item deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: response?.message || "Failed to delete gallery item",
          variant: "destructive",
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete gallery item",
        variant: "destructive",
      })
    },
  })
}

// Upload image only (utility hook)
export const useUploadImage = () => {
  const { toast } = useToast()

  return useMutation({
    mutationFn: (file: File) => uploadAPI.uploadSingle(file),
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to upload image",
        variant: "destructive",
      })
    },
  })
}

