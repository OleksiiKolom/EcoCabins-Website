import { deleteAsync } from 'del'; // Видалення файлів

// Завдання для видалення файлів
export const reset = () => {
	return deleteAsync(['dist'])
}