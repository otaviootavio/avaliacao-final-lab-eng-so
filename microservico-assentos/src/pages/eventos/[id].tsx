import { NextPage, GetServerSideProps } from 'next';

interface EventDetails {
    eventoId: string;
    assentos: string[];
}

interface Props {
    eventDetails: EventDetails;
}

const EventDetailsPage: NextPage<Props> = ({ eventDetails }) => {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold my-4">Event Details</h1>
            <h2 className="text-xl my-2">Event ID: {eventDetails.eventoId}</h2>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {eventDetails.assentos.map((seat, index) => (
                    <div key={index} className="flex items-center justify-center h-12 bg-green-500 text-white font-bold">
                        {seat}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const response = await fetch(`http://localhost:3000/api/assentos/${id}`);
    const eventDetails: EventDetails = await response.json();

    return {
        props: {
            eventDetails
        },
    };
};

export default EventDetailsPage;
