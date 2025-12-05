import TicketCard from "../components/tickets/TicketCard";

// Datos de prueba para maquetar
const mockTickets = [
    {
        id: "1",
        title: "No funciona el ordenador",
        description: "El ordenador no enciende desde esta mañana",
        status: "open" as const,
        priority: "high" as const,
        createdAt: "2025-12-05T10:30:00",
        createdBy: { name: "Juan", surname: "García" },
        office: { id: "1", name: "Madrid - Central" },
    },
    {
        id: "2",
        title: "Problema con el correo",
        description: "No puedo enviar emails desde Outlook",
        status: "assigned" as const,
        priority: "medium" as const,
        createdAt: "2025-12-04T14:20:00",
        createdBy: { name: "María", surname: "López" },
        assignedTo: { name: "Carlos", surname: "Técnico" },
        office: { id: "2", name: "Barcelona - Norte" },
    },
    {
        id: "3",
        title: "Instalación de software",
        description: "Necesito instalar Adobe Photoshop",
        status: "closed" as const,
        priority: "low" as const,
        createdAt: "2025-12-03T09:00:00",
        createdBy: { name: "Ana", surname: "Martínez" },
        assignedTo: { name: "Carlos", surname: "Técnico" },
        office: { id: "1", name: "Madrid - Central" },
    },
];

export default function Tickets() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-main mb-6">
                Tickets
            </h1>
            <div className="flex flex-col gap-4">
                {mockTickets.map((ticket) => (
                    <TicketCard
                        key={ticket.id}
                        {...ticket}
                        onClick={() => console.log("Click en ticket", ticket.id)}
                    />
                ))}
            </div>
        </div>
    );
}
