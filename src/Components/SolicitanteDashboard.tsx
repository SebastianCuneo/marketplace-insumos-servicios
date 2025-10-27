import { useState } from 'react';
import { Card } from './ui/card.tsx';
import { Button } from './ui/button.tsx';
import { Badge } from './ui/badge.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs.tsx';
import { Plus, Package, Clock, CheckCircle, FileText } from 'lucide-react';
import { Servicio } from '../types';
import { mockServicios } from '../data/mockData.ts';
import React from 'react';

interface SolicitanteDashboardProps {
  onPublicarServicio: () => void;
  onVerDetalle: (servicio: Servicio) => void;
}

export function SolicitanteDashboard({ onPublicarServicio, onVerDetalle }: SolicitanteDashboardProps) {
  const [servicios] = useState<Servicio[]>(mockServicios);

  const getEstadoBadge = (estado: string) => {
    const styles = {
      publicado: 'bg-blue-100 text-blue-700',
      asignado: 'bg-yellow-100 text-yellow-700',
      completado: 'bg-green-100 text-green-700',
      borrador: 'bg-gray-100 text-gray-700',
    };
    return styles[estado as keyof typeof styles] || styles.publicado;
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'publicado':
        return <Package className="w-4 h-4" />;
      case 'asignado':
        return <Clock className="w-4 h-4" />;
      case 'completado':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const filtrarServicios = (estado: string) => {
    if (estado === 'todos') return servicios;
    return servicios.filter(s => s.estado === estado);
  };

  const ServicioCard = ({ servicio }: { servicio: Servicio }) => (
    <Card
      className="p-4 hover:shadow-md transition-shadow cursor-pointer rounded-lg"
      onClick={() => onVerDetalle(servicio)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="mb-1">{servicio.titulo}</h3>
          <p className="text-sm text-gray-500">{servicio.categoria}</p>
        </div>
        <Badge className={`${getEstadoBadge(servicio.estado)} flex items-center gap-1`}>
          {getEstadoIcon(servicio.estado)}
          {servicio.estado.charAt(0).toUpperCase() + servicio.estado.slice(1)}
        </Badge>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>📍 {servicio.ciudad}</span>
          <span>📅 {new Date(servicio.fecha).toLocaleDateString('es-ES')}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t">
          <span>{servicio.insumos.length} insumos requeridos</span>
          {servicio.estado === 'publicado' && (
            <span className="text-[#2D7CF6]">Ver cotizaciones →</span>
          )}
          {servicio.estado === 'asignado' && (
            <span className="text-green-600">✓ Cotización seleccionada</span>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 pb-20">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl mb-1">Mis Servicios</h1>
            <p className="text-gray-500">Gestiona tus solicitudes y cotizaciones</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-[#2D7CF6]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Publicados</p>
                <p className="text-2xl">{servicios.filter(s => s.estado === 'publicado').length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">En progreso</p>
                <p className="text-2xl">{servicios.filter(s => s.estado === 'asignado').length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completados</p>
                <p className="text-2xl">{servicios.filter(s => s.estado === 'completado').length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Services List */}
        <Tabs defaultValue="todos" className="space-y-4">
          <TabsList className="bg-white rounded-lg">
            <TabsTrigger value="todos" className="rounded-lg">Todos</TabsTrigger>
            <TabsTrigger value="publicado" className="rounded-lg">Publicados</TabsTrigger>
            <TabsTrigger value="asignado" className="rounded-lg">Asignados</TabsTrigger>
            <TabsTrigger value="completado" className="rounded-lg">Completados</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="space-y-4">
            {filtrarServicios('todos').map(servicio => (
              <ServicioCard key={servicio.id} servicio={servicio} />
            ))}
          </TabsContent>

          <TabsContent value="publicado" className="space-y-4">
            {filtrarServicios('publicado').map(servicio => (
              <ServicioCard key={servicio.id} servicio={servicio} />
            ))}
          </TabsContent>

          <TabsContent value="asignado" className="space-y-4">
            {filtrarServicios('asignado').map(servicio => (
              <ServicioCard key={servicio.id} servicio={servicio} />
            ))}
          </TabsContent>

          <TabsContent value="completado" className="space-y-4">
            {filtrarServicios('completado').length === 0 ? (
              <Card className="p-12 text-center rounded-lg">
                <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Aún no tienes servicios completados</p>
              </Card>
            ) : (
              filtrarServicios('completado').map(servicio => (
                <ServicioCard key={servicio.id} servicio={servicio} />
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Floating Action Button */}
        <Button
          onClick={onPublicarServicio}
          className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-[#2D7CF6] hover:bg-[#1e5fd4] shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
