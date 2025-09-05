/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useUsers } from "@/hooks/useUsers"
import type { User } from "@/hooks/useUsers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Shield } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

function UsuariosPage() {
  const {
    users,
    loading,
    nextPage,
    prevPage,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
  } = useUsers()

  const { logout } = useAuth()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState<Partial<User & { password: string }>>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    is_staff: false,
    department: "",
    status: "Activo",
    role: "Usuario",
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  // Crear usuario
  const handleAddUser = async () => {
    if (
      newUser.username &&
      newUser.email &&
      newUser.first_name &&
      newUser.last_name &&
      newUser.password
    ) {
      const payload = {
        username: newUser.username,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        phone: newUser.phone || "",
        password: newUser.password,
        is_staff: newUser.role === "Administrador",
      }
      const ok = await addUser(payload)
      if (ok) {
        setNewUser({
          username: "",
          email: "",
          first_name: "",
          last_name: "",
          phone: "",
          password: "",
          is_staff: false,
          department: "",
          status: "Activo",
          role: "Usuario",
        })
        setIsAddDialogOpen(false)
      }
    }
  }

  // Editar usuario
  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setNewUser({
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      password: "",
      is_staff: user.is_staff,
      department: user.department,
      status: user.status,
      role: user.role,
    })
  }

  // Actualizar usuario
  const handleUpdateUser = async () => {
    if (
      editingUser &&
      newUser.username &&
      newUser.email &&
      newUser.first_name &&
      newUser.last_name
    ) {
      const payload: {
        username: string
        email: string
        first_name: string
        last_name: string
        phone: string
        is_staff: boolean
        password?: string
      } = {
        username: newUser.username,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        phone: newUser.phone || "",
        is_staff: newUser.role === "Administrador",
      }
      if (newUser.password) payload.password = newUser.password

      const ok = await updateUser(editingUser.id, payload)
      if (ok) {
        setEditingUser(null)
        setNewUser({
          username: "",
          email: "",
          first_name: "",
          last_name: "",
          phone: "",
          password: "",
          is_staff: false,
          department: "",
          status: "Activo",
          role: "Usuario",
        })
      }
    }
  }

  // Eliminar usuario
  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId)
  }

  const getRoleBadgeVariant = (role: User["role"]) => {
    switch (role) {
      case "Administrador":
        return "default"
      case "Usuario":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-semibold">Sistema de Gestión de Usuarios</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={logout}>Cerrar sesión</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Users Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lista de Usuarios ({users.length})</CardTitle>
                  <CardDescription>Usuarios registrados en el sistema</CardDescription>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-accent hover:bg-accent/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Usuario
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                      <DialogDescription>Complete la información del nuevo usuario del sistema.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="username">Usuario</Label>
                        <Input
                          id="username"
                          value={newUser.username || ""}
                          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                          placeholder="Ingrese el nombre de usuario"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="first_name">Nombre</Label>
                        <Input
                          id="first_name"
                          value={newUser.first_name || ""}
                          onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                          placeholder="Ingrese el nombre"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="last_name">Apellido</Label>
                        <Input
                          id="last_name"
                          value={newUser.last_name || ""}
                          onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                          placeholder="Ingrese el apellido"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email || ""}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          placeholder="usuario@gobierno.gob"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          value={newUser.phone || ""}
                          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                          placeholder="Ingrese el teléfono"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                          id="password"
                          type="password"
                          value={newUser.password || ""}
                          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                          placeholder="Ingrese la contraseña"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="role">Rol</Label>
                        <Select
                          value={newUser.role}
                          onValueChange={(value) => setNewUser({ ...newUser, role: value as User["role"] })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Administrador">Administrador</SelectItem>
                            <SelectItem value="Operador">Operador</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleAddUser} className="bg-accent hover:bg-accent/90">
                        Agregar Usuario
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Apellido</TableHead>
                      <TableHead>Correo Electrónico</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-mono text-sm">{user.id}</TableCell>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Dialog
                              open={editingUser?.id === user.id}
                              onOpenChange={(open) => !open && setEditingUser(null)}
                            >
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Editar Usuario</DialogTitle>
                                  <DialogDescription>Modifique la información del usuario.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-username">Usuario</Label>
                                    <Input
                                      id="edit-username"
                                      value={newUser.username || ""}
                                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-first_name">Nombre</Label>
                                    <Input
                                      id="edit-first_name"
                                      value={newUser.first_name || ""}
                                      onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-last_name">Apellido</Label>
                                    <Input
                                      id="edit-last_name"
                                      value={newUser.last_name || ""}
                                      onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-email">Correo Electrónico</Label>
                                    <Input
                                      id="edit-email"
                                      type="email"
                                      value={newUser.email || ""}
                                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-phone">Teléfono</Label>
                                    <Input
                                      id="edit-phone"
                                      value={newUser.phone || ""}
                                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-password">Contraseña (opcional)</Label>
                                    <Input
                                      id="edit-password"
                                      type="password"
                                      value={newUser.password || ""}
                                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                      placeholder="Dejar en blanco para no cambiar"
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-role">Rol</Label>
                                    <Select
                                      value={newUser.role}
                                      onValueChange={(value) => setNewUser({ ...newUser, role: value as User["role"] })}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Administrador">Administrador</SelectItem>
                                        <SelectItem value="Operador">Operador</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setEditingUser(null)}>
                                    Cancelar
                                  </Button>
                                  <Button onClick={handleUpdateUser} className="bg-accent hover:bg-accent/90">
                                    Guardar Cambios
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive hover:text-destructive bg-transparent"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Se eliminará permanentemente el usuario{" "}
                                    <strong>{user.username}</strong> del sistema.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    Eliminar Usuario
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {loading && <div className="p-4 text-center">Cargando usuarios...</div>}
                {!loading && users.length === 0 && (
                  <div className="p-4 text-center text-muted-foreground">No hay usuarios para mostrar.</div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              disabled={!prevPage}
              onClick={() => prevPage && fetchUsers(prevPage)}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              disabled={!nextPage}
              onClick={() => nextPage && fetchUsers(nextPage)}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UsuariosPage