import { createServer, Model, Factory, hasMany, Response } from 'miragejs';

export function makeServer() {
  return createServer({
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
          const roleNames = ['Owner', 'Admin', 'Moderator', 'Editor', 'Member', 'Viewer', 'Guest'];
          return roleNames[i % roleNames.length];
        },
        permissions() {
          return {
            View: false,
            Edit: false,
            Delete: false,
            Create: false,
            ManageUsers: false,
            ManageRoles: false,
            ManageSettings: false,
            AssignPermissions: false,
            AuditLogsAccess: false,
            ViewReports: false,
            ExportData: false,
            ImportData: false,
            AccessAPI: false,
            ApproveRequests: false,
            MonitorSystem: false,
            ManageProjects: false,
            ViewFinancials: false,
            ApproveLeaves: false,
            AccessHRData: false,
            ManageInventory: false,
            PerformBackups: false,
          };
        },
      }),
    },

    seeds(server) {
      // Load roles and users from localStorage, or create new if not found
      const storedRoles = JSON.parse(localStorage.getItem('roles')) || [];
      storedRoles.forEach((roleData) => {
        server.create('role', roleData);
      });

      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      server.createList('user', storedUsers.length ? storedUsers.length : 20);
    },

    routes() {
      this.namespace = 'api';

      // Role endpoints
      this.get('/roles', (schema) => {
        return schema.roles.all().models.map((role) => ({
          id: role.id,
          name: role.name,
          permissions: role.permissions,
          users: role.users.models.map((user) => ({
            id: user.id,
            name: user.name,
          })),
        }));
      });

      this.post('/roles', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const newRole = schema.roles.create(attrs);

        // Update localStorage after adding a role
        const roles = schema.roles.all().models.map(role => ({
          id: role.id,
          name: role.name,
          permissions: role.permissions
        }));
        localStorage.setItem('roles', JSON.stringify(roles));

        return {
          id: newRole.id,
          name: newRole.name,
          permissions: newRole.permissions,
        };
      });

      this.patch('/roles/:id/permissions', (schema, request) => {
        const { id } = request.params;
        const attrs = JSON.parse(request.requestBody);
        const role = schema.roles.find(id);

        if (!role) {
          return new Response(404, {}, { error: 'Role not found' });
        }

        role.update({ permissions: attrs.permissions });

        // Update localStorage after modifying a role's permissions
        const roles = schema.roles.all().models.map(role => ({
          id: role.id,
          name: role.name,
          permissions: role.permissions
        }));
        localStorage.setItem('roles', JSON.stringify(roles));

        return {
          id: role.id,
          name: role.name,
          permissions: role.permissions, // Return the updated permissions
        };
      });

      this.delete('/roles/:id', (schema, request) => {
        const { id } = request.params;
        const role = schema.roles.find(id);
        if (role) {
          role.destroy();
        }

        // Update localStorage after deleting a role
        const roles = schema.roles.all().models.map(role => ({
          id: role.id,
          name: role.name,
          permissions: role.permissions
        }));
        localStorage.setItem('roles', JSON.stringify(roles));

        return { id };
      });

      // User endpoints
      this.get('/users', (schema) => {
        return schema.users.all().models.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles.models.map((role) => ({
            id: role.id,
            name: role.name,
          })),
          projects: user.projects,
          expiration: user.expiration,
        }));
      });

      this.put('/users/:id', (schema, request) => {
        const { id } = request.params;
        const attrs = JSON.parse(request.requestBody);
        const user = schema.users.find(id);

        if (!user) {
          return new Response(404, {}, { error: 'User not found' });
        }

        if (attrs.roleIds) {
          user.roles.models.forEach((role) => user.roles.remove(role));
          attrs.roleIds.forEach((roleId) => {
            const role = schema.roles.find(roleId);
            if (role) {
              user.roles.add(role);
            }
          });
        }

        user.update(attrs);

        // Update localStorage after modifying a user
        const users = schema.users.all().models.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles.models.map(role => ({
            id: role.id,
            name: role.name,
          })),
        }));
        localStorage.setItem('users', JSON.stringify(users));

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles.models.map((role) => ({
            id: role.id,
            name: role.name,
          })),
        };
      });

      this.delete('/users/:id', (schema, request) => {
        const { id } = request.params;
        const user = schema.users.find(id);
        if (user) {
          user.destroy();
        }

        // Update localStorage after deleting a user
        const users = schema.users.all().models.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles.models.map(role => ({
            id: role.id,
            name: role.name,
          })),
        }));
        localStorage.setItem('users', JSON.stringify(users));

        return { id };
      });

      // New Permissions route
      this.get('/permissions', () => {
        return {
          permissions: [
            'View',
            'Edit',
            'Delete',
            'Create',
            'ManageUsers',
            'ManageRoles',
            'ManageSettings',
            'AssignPermissions',
            'AuditLogsAccess',
            'ViewReports',
            'ExportData',
            'ImportData',
            'AccessAPI',
            'ApproveRequests',
            'MonitorSystem',
            'ManageProjects',
            'ViewFinancials',
            'ApproveLeaves',
            'AccessHRData',
            'ManageInventory',
            'PerformBackups',
          ],
        };
      });
    },
  });
}
