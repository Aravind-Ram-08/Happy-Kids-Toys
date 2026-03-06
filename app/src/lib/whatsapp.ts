export const WHATSAPP_NUMBER = '919876543210'; // Replace with real number

export function buildWhatsAppUrl(productName: string, price: number): string {
    const message = encodeURIComponent(
        `Hi, I want to order this toy.\nProduct: ${productName}\nPrice: ₹${price}\nPlease share delivery details.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function openWhatsApp(productName: string, price: number) {
    window.open(buildWhatsAppUrl(productName, price), '_blank');
}

export function openWhatsAppGeneral() {
    const message = encodeURIComponent('Hi! I want to enquire about your toys. Please help me.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
}
