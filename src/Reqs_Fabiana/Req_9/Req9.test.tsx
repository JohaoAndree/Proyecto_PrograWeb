import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import backend from '../../api/axios';
import Req9 from './Req9';

// Mock the backend API
vi.mock('../../api/axios', () => {
    return {
        default: {
            get: vi.fn(),
        }
    };
});

// Avoid IntersectionObserver errors in jsdom
beforeEach(() => {
    window.IntersectionObserver = vi.fn().mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null
    });
});

const mockJuego = {
    id: 99,
    nombre: "Juego de Test",
    precio: 49.99,
    descuento: null,
    imagen: "/imagenes/test.jpg",
    descripcion: "Descripción de prueba",
    estaOferta: false,
    estado: true,
    masVendido: false,
    categoriaId: 1,
    categoria: { id: 1, nombre: "Acción" },
    calificaciones: [],
    plataformas: []
};

describe('Req9 (Catálogo de Juegos) - Integración con backend', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('debería mostrar el estado de carga y luego renderizar los juegos del backend', async () => {
        // Configuramos el mock para devolver el juego
        (backend.get as any).mockResolvedValueOnce({
            data: [mockJuego]
        });

        render(
            <MemoryRouter>
                <Req9 />
            </MemoryRouter>
        );

        // Verifica que muestre "Cargando catálogo..."
        expect(screen.getByText(/Cargando catálogo de juegos\.\.\./i)).toBeDefined();

        // Esperar a que la petición resuelva y se renderice el juego
        await waitFor(() => {
            expect(screen.getByText("Juego de Test")).toBeDefined();
        });

        // Verificar que el backend fue llamado con la URL correcta
        expect(backend.get).toHaveBeenCalledWith(
            '/api/juegos',
            expect.objectContaining({ signal: expect.any(AbortSignal) })
        );
    });

});
