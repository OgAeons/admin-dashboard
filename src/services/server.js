import { createServer, Model, Factory, hasMany } from 'miragejs';

export function makeServer() {
  createServer({
    models: {
      user: Model.extend({
        roles: hasMany(), 
      }),
      role: Model.extend({
        users: hasMany(), 
      }),
    },

    factories: {
      user: Factory.extend({
        name(i) {
          return `User ${i + 1}`;
        },
        email(i) {
          return `user${i + 1}@example.com`;
        },
        projects() {
          return Math.floor(Math.random() * 10) + 1;
        },
        expiration() {
          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 365)); 
          return futureDate.toISOString().split('T')[0]; 
        },
        afterCreate(user, server) {
          const allRoles = server.schema.roles.all().models;
          const assignedRoles = allRoles
            .sort(() => Math.random() - 0.5) 
            .slice(0, Math.floor(Math.random() * allRoles.length) + 1);

          assignedRoles.forEach((role) => {
            user.roles.add(role);
            role.users.add(user);
          });
        },
      }),
      role: Factory.extend({
        name(i) {
          const roleNames = ['admin', 'member', 'moderator', 'editor', 'viewer', 'guest'];
          return roleNames[i % roleNames.length]; 
        },
      }),
    },

    seeds(server) {
      const roles = ['admin', 'member', 'moderator', 'editor', 'viewer', 'guest'];
      roles.forEach((roleName) => server.create('role', { name: roleName }));

      server.createList('user', 20);
    },

    routes() {
      this.namespace = 'api'; 

      this.get('/users', (schema) => {
        return schema.users.all().models.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles.models.map((role) => role.name), 
          projects: user.projects, 
          expiration: user.expiration, 
        }));
      });

      this.get('/roles', (schema) => {
        return schema.roles.all().models.map((role) => ({
          id: role.id,
          name: role.name,
          users: role.users.models.map((user) => user.name), 
        }));
      });

      this.put('/users/:id', (schema, request) => {
        const { id } = request.params;
        const attrs = JSON.parse(request.requestBody);
        const user = schema.users.find(id);

        if (attrs.roleIds) {
          user.roles.models.forEach((role) => user.roles.remove(role)); 
          attrs.roleIds.forEach((roleId) => {
            const role = schema.roles.find(roleId);
            user.roles.add(role);
          });
        }

        user.update(attrs);
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles.models.map((role) => role.name), 
        };
      });

      this.delete('/users/:id', (schema, request) => {
        const { id } = request.params;
        schema.users.find(id).destroy();
        return { id };
      });
    },
  });
}
