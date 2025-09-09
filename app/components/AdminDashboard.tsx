import React, { useState, useEffect } from "react";
import { useAdmin } from "../contexts/AdminContext";
import {
  getPets,
  getCategories,
  addPet,
  updatePet,
  deletePet,
  addCategory,
  type Pet,
  type Category,
} from "../lib/firestore";
import { trackPageView } from "../lib/analytics";

export const AdminDashboard: React.FC = () => {
  const { isAdmin } = useAdmin();
  const [activeTab, setActiveTab] = useState<"pets" | "categories">("pets");
  const [pets, setPets] = useState<Pet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Pet | Category | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      trackPageView("Admin Dashboard");
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [petsData, categoriesData] = await Promise.all([
        getPets(),
        getCategories(),
      ]);
      setPets(petsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Error loading data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPet = async (
    petData: Omit<Pet, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      await addPet(petData);
      await loadData();
      setShowAddModal(false);
      alert("Pet added successfully!");
    } catch (error) {
      console.error("Error adding pet:", error);
      alert("Error adding pet. Please try again.");
    }
  };

  const handleUpdatePet = async (id: string, petData: Partial<Pet>) => {
    try {
      await updatePet(id, petData);
      await loadData();
      setEditingItem(null);
      alert("Pet updated successfully!");
    } catch (error) {
      console.error("Error updating pet:", error);
      alert("Error updating pet. Please try again.");
    }
  };

  const handleDeletePet = async (id: string) => {
    if (confirm("Are you sure you want to delete this pet?")) {
      try {
        await deletePet(id);
        await loadData();
        alert("Pet deleted successfully!");
      } catch (error) {
        console.error("Error deleting pet:", error);
        alert("Error deleting pet. Please try again.");
      }
    }
  };

  const handleAddCategory = async (
    categoryData: Omit<Category, "id" | "createdAt">
  ) => {
    try {
      await addCategory(categoryData);
      await loadData();
      setShowAddModal(false);
      alert("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category. Please try again.");
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-strawberry-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-strawberry-dark mb-4">
            Access Denied
          </h1>
          <p className="text-lg text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-strawberry-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-strawberry-primary mx-auto"></div>
          <p className="text-lg text-gray-600 mt-4">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-strawberry-light">
      {/* Header */}
      <div className="bg-strawberry-gradient shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">
              🍓 Admin Dashboard
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("pets")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "pets"
                    ? "bg-white text-strawberry-primary"
                    : "text-white hover:text-strawberry-accent"
                }`}
              >
                Pets
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === "categories"
                    ? "bg-white text-strawberry-primary"
                    : "text-white hover:text-strawberry-accent"
                }`}
              >
                Categories
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-strawberry-dark">
            Manage {activeTab === "pets" ? "Pets" : "Categories"}
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-strawberry text-lg px-6 py-3"
          >
            + Add {activeTab === "pets" ? "Pet" : "Category"}
          </button>
        </div>

        {/* Pets Table */}
        {activeTab === "pets" && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rarity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pets.map((pet) => (
                    <tr key={pet.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={pet.imageUrl}
                          alt={pet.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {pet.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {pet.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${pet.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            pet.rarity === "Common"
                              ? "bg-gray-100 text-gray-800"
                              : pet.rarity === "Rare"
                                ? "bg-blue-100 text-blue-800"
                                : pet.rarity === "Epic"
                                  ? "bg-purple-100 text-purple-800"
                                  : pet.rarity === "Legendary"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                          }`}
                        >
                          {pet.rarity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pet.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            pet.inStock
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {pet.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setEditingItem(pet)}
                          className="text-strawberry-primary hover:text-strawberry-dark mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => pet.id && handleDeletePet(pet.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories Table */}
        {activeTab === "categories" && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={category.imageUrl}
                          alt={category.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {category.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setEditingItem(category)}
                          className="text-strawberry-primary hover:text-strawberry-dark mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            category.id && deleteCategory(category.id)
                          }
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {(showAddModal || editingItem) && (
          <PetModal
            isOpen={showAddModal || !!editingItem}
            onClose={() => {
              setShowAddModal(false);
              setEditingItem(null);
            }}
            onSave={activeTab === "pets" ? handleAddPet : handleAddCategory}
            onUpdate={activeTab === "pets" ? handleUpdatePet : undefined}
            item={editingItem}
            type={activeTab}
          />
        )}
      </div>
    </div>
  );
};

// Pet/Category Modal Component
interface PetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  onUpdate?: (id: string, data: any) => void;
  item?: Pet | Category | null;
  type: "pets" | "categories";
}

const PetModal: React.FC<PetModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  item,
  type,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    rarity: "Common" as Pet["rarity"],
    category: "",
    imageUrl: "",
    inStock: true,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        price: "price" in item ? item.price : 0,
        rarity: "rarity" in item ? item.rarity : "Common",
        category: "category" in item ? item.category : "",
        imageUrl: item.imageUrl,
        inStock: "inStock" in item ? item.inStock : true,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        rarity: "Common",
        category: "",
        imageUrl: "",
        inStock: true,
      });
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (item && onUpdate) {
      onUpdate(item.id!, formData);
    } else {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          {item ? "Edit" : "Add"} {type === "pets" ? "Pet" : "Category"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-strawberry-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-strawberry-primary"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-strawberry-primary"
              required
            />
          </div>

          {type === "pets" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-strawberry-primary"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rarity
                </label>
                <select
                  value={formData.rarity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rarity: e.target.value as Pet["rarity"],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-strawberry-primary"
                >
                  <option value="Common">Common</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Epic</option>
                  <option value="Legendary">Legendary</option>
                  <option value="Mythic">Mythic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-strawberry-primary"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={(e) =>
                    setFormData({ ...formData, inStock: e.target.checked })
                  }
                  className="h-4 w-4 text-strawberry-primary focus:ring-strawberry-primary border-gray-300 rounded"
                />
                <label
                  htmlFor="inStock"
                  className="ml-2 block text-sm text-gray-700"
                >
                  In Stock
                </label>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button type="submit" className="btn-strawberry px-4 py-2">
              {item ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
