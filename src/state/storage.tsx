import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
    id: 'user_storage',
    encryptionKey: 'some-secret_key'
})

export const mmkvStorage = {
    setItem: (key: string, value: any) => {
        storage.set(key, value)
    },
    getItem: (key: string) => {
        const value = storage.getString(key)
        return value ?? null
    },
    removeItem: (key: string) => {
        storage.delete(key)
    }
}