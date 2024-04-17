import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';


interface Event {
    id: number;
    nome: string;
}

const EventsPage: NextPage = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch('/api/eventos');
            const data: Event[] = await response.json();
            setEvents(data);
        };

        fetchEvents();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-lg font-bold my-4">Eventos</h1>
            <div className="grid md:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="bg-gray-200 p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
                        <Link href={`/eventos/${event.id}`} className="text-lg text-gray-800 hover:text-gray-600">
                            {event.nome}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsPage;
