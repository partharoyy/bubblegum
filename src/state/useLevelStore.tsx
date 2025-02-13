import { create } from "zustand"
import {persist, createJSONStorage} from 'zustand/middleware'
import { mmkvStorage } from "./storage"
import { initialLevelData } from "../utils/data"

interface Level {
    id: number
    unlocked: boolean
    completed: boolean
    highScore: number
}

interface LevelStore {
    levels: Level[]
    unlockLevel: (id: number) => void
    completeLevel: (id: number, collectedCandies: number) => void
}

export const useLevelStore = create<LevelStore>()(
    persist(
        (set, get) => ({
            levels: initialLevelData,

            unlockLevel: (id: number) => {
                set((state) => ({
                    ...state,
                    levels: state.levels.map((level) => 
                        level.id === id ? {...level, unlocked: true}: level
                    )
                }))
            },

            completeLevel: (id: number, collectedCandies: number) => {
                set((state) => ({
                    ...state,
                    levels: state.levels.map((level) =>
                        level.id === id ? { ...level, completed: true, highScore: Math.max(level.highScore, collectedCandies)} : level
                    )
                }))
            }
        }),
        {
            name: 'level-storage',
            storage: createJSONStorage(() => mmkvStorage)
        }
    )
)