import { createServer } from 'miragejs'

export function makeServer() {
    createServer({
        routes() {
            this.namespace = 'api'

            this.get('/members', () => {
                return {
                    members: [
                        {
                            id: 1,
                            name: 'Atharva 1',
                            email: 'atharva1@mail.com',
                            projects: 1000,
                            accessExpires: '12 months',
                            role: ['Administrator'],
                            expiration: '2024-06-20',
                        },
                        {
                            id: 2,
                            name: 'Marketing Group',
                            email: 'marketing@mail.com',
                            projects: 999,
                            accessExpires: '3 days',
                            role: 'Administrator',
                            expiration: '2024-06-23',
                        },
                        {
                            id: 3,
                            name: 'Developer Team',
                            email: 'devteam@mail.com',
                            projects: 78,
                            accessExpires: '2 years',
                            role: 'Developer',
                            expiration: '2026-06-20',
                        },
                        {
                            id: 1,
                            name: "John Doe",
                            email: 'devteam@mail.com',
                            role: ["Admin", "Manager"],
                            projects: "Project A",
                            accessExpires: "2024-12-31",
                            expiration: "2024-12-31"
                          },
                          {
                            id: 2,
                            name: "Jane Smith",
                            email: 'devteam@mail.com',
                            role: ["Manager"],
                            projects: "Project B",
                            accessExpires: "2025-01-15",
                            expiration: "2025-01-15"
                          }
                    ],
                }
            })

            this.put('/members/:id', (schema, request) => {
                const { id } = request.params
                const attrs = JSON.parse(request.requestBody)
                return { id, ...attrs }
            })

            this.delete('/members/:id', (schema, request) => {
                const { id } = request.params
                return { id }
            })
        },
    })
}
