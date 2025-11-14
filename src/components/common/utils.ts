export function cn(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

export async function convertImageToBase64 (file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}