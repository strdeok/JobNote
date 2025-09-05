import { DocumentTypeWithId } from "@/type/documentType";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DocumentState {
  document: DocumentTypeWithId | null;
  setDocument: (document: DocumentTypeWithId | null) => void;
  clearDocument: () => void;
}

export const useDocumentStore = create<DocumentState>()(
  persist(
    (set) => ({
      document: null,
      setDocument: (document) => set({ document }),
      clearDocument: () => set({ document: null }),
    }),
    {
      name: "document-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
