const API_BASE_URL = import.meta.env.VITE_API_URL

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("admin_token")
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

// Categories API
export const categoryAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`)
    return response.json()
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`)
    return response.json()
  },

  create: async (data: { name: string }) => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  },

  update: async (id: string, data: { name: string }) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
    return response.json()
  },
}

// Gallery API
export const galleryAPI = {
  getAll: async (categoryId?: string) => {
    const url = categoryId
      ? `${API_BASE_URL}/gallery?category=${categoryId}`
      : `${API_BASE_URL}/gallery`
    const response = await fetch(url)
    return response.json()
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`)
    return response.json()
  },

  create: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  },

  update: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    })
    return response.json()
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    })
    return response.json()
  },
}

// Upload API
export const uploadAPI = {
  uploadSingle: async (file: File) => {
    const token = localStorage.getItem("admin_token")
    const formData = new FormData()
    formData.append("image", file)

    const response = await fetch(`${API_BASE_URL}/upload/single`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    })
    return response.json()
  },

  uploadMultiple: async (files: File[]) => {
    const token = localStorage.getItem("admin_token")
    const formData = new FormData()
    files.forEach((file) => formData.append("images", file))

    const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    })
    return response.json()
  },

  deleteImage: async (imageUrl: string) => {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      body: JSON.stringify({ imageUrl }),
    })
    return response.json()
  },
}
