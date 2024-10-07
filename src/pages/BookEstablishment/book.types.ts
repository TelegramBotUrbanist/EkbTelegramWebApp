export interface TableCardProps {
    id: number;
    title: string;
    locationDescription: string;
    occupiedDates: Date[];
    description: string;
    capacity: number;
    occupiedPeriods?: Array<{ occupiedFrom: string; occupiedTo: string }>;
    imgs: Array<{ id: number; title: string; imageUrl: string }>;
}