import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Chart } from 'chart.js';

interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  birth_date: string;
  roles: string[];
  is_verified: boolean;
  last_login: string;
  is_active: boolean;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  totalUsers: number = 0;
  totalLikes: number = 0;
  totalComments: number = 0;
  totalShares: number = 0;
  avgInteractions: number = 0;

  users: User[] = [];
  filteredUsers: User[] = []; // Lista de usuarios filtrados
  availableRoles: string[] = []; // Lista de roles disponibles
  searchQuery: string = ''; // Valor del campo de búsqueda
  selectedRole: string = ''; // Rol seleccionado en el filtro
  showModal: boolean = false; // Controla la visibilidad del modal

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Carga los datos de los usuarios y las métricas
  loadUsers(): void {
    this.usersService.getUsers().subscribe((data: any) => {
      this.users = data.users || [];
      this.filteredUsers = [...this.users];
      this.totalUsers = data.totalUsers || this.users.length;
      this.totalLikes = data.totalLikes || 0;
      this.totalComments = data.totalComments || 0;
      this.totalShares = data.totalShares || 0;
      this.avgInteractions = data.avgInteractions || 0;

      // Obtiene los roles únicos de los usuarios
      this.availableRoles = [...new Set(this.users.flatMap((user) => user.roles))];
    });
  }

  // Filtra los usuarios basándose en la búsqueda y el filtro de roles
  filterUsers(): void {
    this.filteredUsers = this.users.filter((user) => {
      const matchesSearch =
        !this.searchQuery ||
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesRole =
        !this.selectedRole || user.roles.includes(this.selectedRole);
      return matchesSearch && matchesRole;
    });
  }

  // Elimina un usuario por su ID
  deleteUser(userId: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usersService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter((user) => user.id !== userId);
        this.filteredUsers = this.filteredUsers.filter((user) => user.id !== userId);
        this.totalUsers = this.users.length;
      });
    }
  }

  // Abre el modal del gráfico
  openModal(): void {
    this.showModal = true;
    this.renderChart();
  }

  // Cierra el modal del gráfico
  closeModal(): void {
    this.showModal = false;
  }

  // Renderiza el gráfico (ejemplo con Chart.js)
renderChart(): void {
  const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

  if (ctx && this.totalLikes && this.totalComments && this.totalShares) {
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Likes', 'Comentarios', 'Compartidos'], // Etiquetas de las métricas
        datasets: [
          {
            data: [this.totalLikes, this.totalComments, this.totalShares], // Datos de las métricas
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colores
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top', // Posición de la leyenda
          },
        },
      },
    });
  } else {
    console.error("Datos insuficientes para renderizar la gráfica.");
  }
}
}