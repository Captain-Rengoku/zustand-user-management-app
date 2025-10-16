export type User = {
    id: string;
    name: string;
    location: {
        city: string;
        state: string;
        street: {
            number?: number;
            name: string;
        };
    };
    email: string;
    phone: string;
}