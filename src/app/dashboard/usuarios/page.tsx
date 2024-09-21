"use client";
import { useState, useRef, useEffect } from "react";
import {
  getUsers,
  createUser,
  updateUser,
} from "@/services/dashboard/usuarioService";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";

export default function UsersList() {
  interface User {
    id: number;
    email: string;
    fullName: string;
    role: string;
  }

  /* Create Form */
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      try {
        const response = await createUser(data);
        if (response && response.status === "SUCCESS") {
          setUsers((prevUsers) => [...prevUsers, response.data]);
          closeModal();
          console.log("Create User:", response);
        }
      } catch (error) {
        console.error("Error Creating User: ", error);
      }
    }
  };

  /* Service Call */
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchCatalogItems = async () => {
      try {
        const response = await getUsers();
        if (response && Array.isArray(response.data)) {
          setUsers(response.data);
          // console.log("Users: ", response.data); // TODO: Role it's still missing
        } else {
          console.error("Fetch Error:", response);
        }
      } catch (error) {
        console.error("Error Fetch: ", error);
      }
    };
    fetchCatalogItems();
  }, []);

  /* Modal */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /* Edit User - Selection and Modal */
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
  };

  /* Update Form */
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current && selectedUser) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      try {
        const response = await updateUser(data);
        // if (response && response.status === "SUCCESS") {
        //   setUsers((prevUsers) =>
        //     prevUsers.map((user) =>
        //       user.id === selectedUser.id ? response.data : user
        //     )
        //   );
        //   closeEditModal();
        //   console.log("Update User:", response);
        // }
      } catch (error) {
        console.error("Error Updating User: ", error);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <Button
          onClick={openModal}
          className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Añadir
        </Button>
      </div>
      <Table className="bg-white rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Permisos</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEditModal(user)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                    </svg>
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Usuario</DialogTitle>
          </DialogHeader>
          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                name="fullName"
                id="name"
                placeholder="Nombre del usuario"
              />
            </div>
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                name="email"
                type="email"
                id="email"
                placeholder="Email del usuario"
              />
            </div>
            <div>
              <Label htmlFor="permissions">Permisos</Label>
              <div className="flex space-x-3 items-center text-white">
                <Checkbox id="user" name="role" value="CUSTOMER" />
                <Label htmlFor="user" className="text-gray-900">
                  Usuario
                </Label>
                <Checkbox id="admin" name="role" value="ADMIN" />
                <Label htmlFor="admin" className="text-gray-900">
                  Administrador
                </Label>
              </div>
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="Contraseña"
              />
            </div>
            <DialogFooter>
              <Button onClick={closeModal} variant="outline">
                Cancelar
              </Button>
              <Button type="submit" style={{ color: "white" }}>
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
          </DialogHeader>
          <form ref={formRef} className="space-y-4" onSubmit={handleEditSubmit}>
            <div>
              <Label htmlFor="editName">Nombre Completo</Label>
              <Input
                name="fullName"
                id="editName"
                defaultValue={selectedUser?.fullName}
                placeholder="Nombre del usuario"
              />
            </div>
            <div>
              <Label htmlFor="editEmail">Correo electrónico</Label>
              <Input
                name="email"
                type="email"
                id="editEmail"
                defaultValue={selectedUser?.email}
                placeholder="Email del usuario"
              />
            </div>
            <div>
              <Label htmlFor="editPermissions">Permisos</Label>
              <div className="flex space-x-3 items-center text-white">
                <Checkbox
                  id="editUser"
                  name="role"
                  value="CUSTOMER"
                  defaultChecked={selectedUser?.role === "CUSTOMER"}
                />
                <Label htmlFor="editUser" className="text-gray-900">
                  Usuario
                </Label>
                <Checkbox
                  id="editAdmin"
                  name="role"
                  value="ADMIN"
                  defaultChecked={selectedUser?.role === "ADMIN"}
                />
                <Label htmlFor="editAdmin" className="text-gray-900">
                  Administrador
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={closeEditModal} variant="outline">
                Cancelar
              </Button>
              <Button type="submit" style={{ color: "white" }}>
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
