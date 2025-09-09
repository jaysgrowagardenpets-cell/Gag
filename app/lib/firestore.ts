import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  type DocumentData,
  type QuerySnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Pet {
  id?: string;
  name: string;
  description: string;
  price: number;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Mythic";
  category: string;
  imageUrl: string;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt?: Date;
}

// Pet CRUD operations
export const getPets = async (): Promise<Pet[]> => {
  try {
    const petsRef = collection(db, "pets");
    const q = query(petsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Pet[];
  } catch (error) {
    console.error("Error getting pets:", error);
    throw error;
  }
};

export const getPet = async (id: string): Promise<Pet | null> => {
  try {
    const petRef = doc(db, "pets", id);
    const petSnap = await getDoc(petRef);

    if (petSnap.exists()) {
      return {
        id: petSnap.id,
        ...petSnap.data(),
        createdAt: petSnap.data().createdAt?.toDate(),
        updatedAt: petSnap.data().updatedAt?.toDate(),
      } as Pet;
    }
    return null;
  } catch (error) {
    console.error("Error getting pet:", error);
    throw error;
  }
};

export const addPet = async (
  pet: Omit<Pet, "id" | "createdAt" | "updatedAt">
): Promise<string> => {
  try {
    const petsRef = collection(db, "pets");
    const now = new Date();

    const docRef = await addDoc(petsRef, {
      ...pet,
      createdAt: now,
      updatedAt: now,
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding pet:", error);
    throw error;
  }
};

export const updatePet = async (
  id: string,
  pet: Partial<Omit<Pet, "id" | "createdAt">>
): Promise<void> => {
  try {
    const petRef = doc(db, "pets", id);

    await updateDoc(petRef, {
      ...pet,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating pet:", error);
    throw error;
  }
};

export const deletePet = async (id: string): Promise<void> => {
  try {
    const petRef = doc(db, "pets", id);
    await deleteDoc(petRef);
  } catch (error) {
    console.error("Error deleting pet:", error);
    throw error;
  }
};

// Category CRUD operations
export const getCategories = async (): Promise<Category[]> => {
  try {
    const categoriesRef = collection(db, "categories");
    const q = query(categoriesRef, orderBy("name", "asc"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as Category[];
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
};

export const addCategory = async (
  category: Omit<Category, "id" | "createdAt">
): Promise<string> => {
  try {
    const categoriesRef = collection(db, "categories");

    const docRef = await addDoc(categoriesRef, {
      ...category,
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const updateCategory = async (
  id: string,
  category: Partial<Omit<Category, "id" | "createdAt">>
): Promise<void> => {
  try {
    const categoryRef = doc(db, "categories", id);

    await updateDoc(categoryRef, {
      ...category,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const categoryRef = doc(db, "categories", id);
    await deleteDoc(categoryRef);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
