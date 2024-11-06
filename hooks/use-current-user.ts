import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { UserNextflix } from "@prisma/client";

interface UseCurrentUser {
  currentUser: UserNextflix | null;
  changeCurrentUser: (user: UserNextflix) => void;
}

export const useCurrentUserNextflix = create(
  persist<UseCurrentUser>(
    (set) => ({
      currentUser: null,
      changeCurrentUser: (data: UserNextflix) => {
        set({ currentUser: data });
      },
    }),
    {
      name: "current-user-nextflix",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
